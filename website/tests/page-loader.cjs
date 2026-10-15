// Run against a local dev server with Playwright available (installed or on NODE_PATH).
const assert = require("node:assert/strict");
const { mkdir } = require("node:fs/promises");
const { chromium } = require("playwright");

const baseURL = process.env.TEST_URL || "http://127.0.0.1:3000";
const output = ".next/loader-checks";

(async () => {
  await mkdir(output, { recursive: true });
  const browser = await chromium.launch({ headless: true, channel: process.env.PLAYWRIGHT_CHANNEL || undefined });
  const errors = [];
  const open = async (options = {}, path = "/", setup) => {
    const page = await browser.newPage(options);
    page.on("pageerror", error => errors.push(error.message));
    if (setup) await setup(page);
    await page.goto(baseURL + path, { waitUntil: "domcontentloaded" });
    return page;
  };
  const active = page => page.waitForFunction(() => document.querySelector(".portfolio")?.inert === true, null, { timeout: 7000 });
  const released = async page => {
    await page.waitForFunction(() => document.querySelector(".page-loader")?.hidden === true, null, { timeout: 7000 });
    assert.equal(await page.locator(".portfolio").evaluate(el => el.inert), false);
    assert.notEqual(await page.evaluate(() => document.documentElement.style.overflow), "hidden");
  };

  try {
    for (const [name, viewport] of [["desktop", { width: 1440, height: 900 }], ["mobile", { width: 390, height: 844 }]]) {
      const page = await open({ viewport });
      await active(page);
      await page.waitForTimeout(900);
      await page.screenshot({ path: `${output}/${name}-loading.png` });
      const nameBox = await page.locator(".loader-name").boundingBox();
      assert.ok(nameBox.x >= 0 && nameBox.x + nameBox.width <= viewport.width, "Loader name fits viewport");
      await page.waitForTimeout(900);
      await page.screenshot({ path: `${output}/${name}-opening.png` });
      await released(page);
      await page.screenshot({ path: `${output}/${name}-revealed.png` });
      await page.mouse.wheel(0, 600);
      await page.waitForFunction(() => window.scrollY > 0);
      assert.equal(await page.locator(".loader-skip").isVisible(), false);
      await page.close();
    }

    const keyboard = await open();
    await active(keyboard);
    await keyboard.keyboard.press("Tab");
    assert.equal(await keyboard.locator(".loader-skip").evaluate(el => el === document.activeElement), true);
    await keyboard.keyboard.press("Enter");
    await released(keyboard);
    assert.equal(await keyboard.locator(".skip-link").evaluate(el => el === document.activeElement), true);
    await keyboard.close();

    const escape = await open();
    await active(escape);
    await escape.keyboard.press("Escape");
    await released(escape);
    await escape.close();

    const reduced = await open({ reducedMotion: "reduce" });
    await released(reduced);
    assert.equal(await reduced.locator(".page-loader").isVisible(), false);
    assert.equal(await reduced.locator(".hv2-subject").evaluate(el => getComputedStyle(el).opacity), "1");
    await reduced.close();

    const noJS = await open({ javaScriptEnabled: false });
    assert.equal(await noJS.locator(".page-loader").isVisible(), false);
    assert.equal(await noJS.locator(".wordmark").isVisible(), true);
    await noJS.close();

    const deepLink = await open({}, "/#contact");
    await released(deepLink);
    await deepLink.close();

    const slow = await open({}, "/", page => page.route("**/images/hero-subject.webp", async route => {
      await new Promise(resolve => setTimeout(resolve, 6000));
      await route.abort();
    }));
    await active(slow);
    await released(slow);
    await slow.close();

    let resumeScripts;
    const heldScripts = new Promise(resolve => { resumeScripts = resolve; });
    const late = await open({}, "/", page => page.route("**/_next/static/**/*.js", async route => {
      await heldScripts;
      await route.continue();
    }));
    await late.locator(".page-loader").waitFor({ state: "hidden", timeout: 7000 });
    await late.evaluate(() => {
      window.loaderLocks = 0;
      new MutationObserver(records => {
        window.loaderLocks += records.filter(record => record.target.inert).length;
      }).observe(document.querySelector(".portfolio"), { attributes: true, attributeFilter: ["inert"] });
    });
    resumeScripts();
    await released(late);
    assert.equal(await late.evaluate(() => window.loaderLocks), 0, "Late hydration must not relock the visible page");
    await late.close();
    assert.deepEqual(errors, [], "No browser runtime errors");
    console.log("PASS: desktop, mobile, scrolling, keyboard skip, Escape, reduced motion, no JavaScript, deep link, slow image, late hydration.");
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
