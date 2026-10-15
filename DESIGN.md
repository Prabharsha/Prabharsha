---
name: Prabharsha Portfolio
description: A warm, restrained personal studio for engineering work and human personality.
colors:
  paper: "#f3f2ee"
  charcoal: "#242723"
  orange: "#ad4822"
  quiet: "#62645d"
  rule: "#d5d6ce"
  dark-accent: "#ea946a"
  dark-muted: "#bfc2b8"
  dark-rule: "#54594f"
  tag-text: "#d0d3c9"
  tag-rule: "#60655a"
  experience-surface: "#e7e8df"
typography:
  display:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(3rem, 6.4vw, 6rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-.04em"
  headline:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(2.4rem, 4.3vw, 4.3rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-.04em"
  title:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(1.7rem, 2.6vw, 2.6rem)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-.04em"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "16px"
    lineHeight: 1.65
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "12px"
    lineHeight: 1.65
  emphasis:
    fontFamily: "Fraunces, Georgia, serif"
    fontWeight: 400
rounded:
  button: "4px"
  focus: "2px"
  dot: "50%"
spacing:
  icon-gap: "12px"
  content-gap: "24px"
  grid-gap: "32px"
  section-desktop: "110px"
  section-tablet: "85px"
  section-mobile: "68px"
components:
  button-primary:
    backgroundColor: "{colors.charcoal}"
    textColor: "{colors.paper}"
    rounded: "{rounded.button}"
    padding: "14px 24px"
  button-primary-hover:
    backgroundColor: "{colors.orange}"
  button-primary-mobile:
    padding: "13px 18px"
  text-link:
    textColor: "{colors.charcoal}"
  project-disclosure:
    backgroundColor: "{colors.charcoal}"
    textColor: "{colors.paper}"
    padding: "30px 0"
  project-disclosure-mobile:
    padding: "22px 0"
  icon-control:
    width: "44px"
    height: "44px"
---

# Design System: Prabharsha Portfolio

## Overview

**Creative North Star: "An engineer's personal studio"**

Warm paper, dark ink, burnt orange and restrained serif emphasis support a professional, personal portfolio. Broad open sections give engineering content room to breathe; thin rules organize repeated material. Supplied portraits and a coffee animation bring the person into the same visual language as the work.

This document records the implementation in `website/app/portfolio.css`, `website/components/Portfolio.tsx` and the font setup in `website/app/layout.tsx`. It is a source inspection, not a claim of rendered visual verification. The existing legacy stylesheet and components remain outside this specification; their presence does not establish additional portfolio tokens. The surface composition is recorded separately in `.impeccable/surface-briefs/portfolio.md`.

**Key Characteristics:**

- Warm neutral surfaces with a dark work section.
- Confident Inter headings with selective italic Fraunces accents.
- Open layouts, understated controls and ruled native disclosures.
- Purposeful motion that respects reduced-motion preferences.

## Colors

The palette pairs warm neutrals with orange emphasis; the dark section uses its own lighter accent and secondary text.

### Primary

- **Orange:** Emphasized words, identity punctuation, primary-button hover and light-surface focus outlines.
- **Dark accent:** Emphasis, project hover and focus outlines on charcoal.

### Neutral

- **Paper / charcoal:** Main background and text, reversed for the work section and primary action.
- **Quiet / rule:** Secondary copy and dividers on light surfaces.
- **Dark muted / dark rule:** Secondary copy and project separators on dark surfaces.
- **Tag text / tag rule:** Understated technology labels with bottom borders.
- **Experience surface:** A pale tonal change for career content.

**The Surface Contrast Rule.** Carry the dark section's lighter text, accent and focus treatment together when using its charcoal background.

## Typography

**Display and body font:** Inter, sans-serif. **Emphasis font:** Fraunces, Georgia, serif, in italic for emphasized words. Both are loaded through Next.js font variables with swap behavior. JetBrains Mono remains loaded by the layout but is not a designated role in this portfolio.

The frontmatter records the shared heading scale. Headings use balanced wrapping and compact tracking; paragraphs retain generous line height. Individual sections tune their titles to fit the content rather than forcing every heading to the same size.

- Hero introduction: 18px with 1.7 line height, maximum width 430px; tablet 16px; mobile 15px with 1.65 line height and maximum width 440px.
- Project descriptions: 15px with 1.75 line height and maximum width 65ch; mobile 14px.
- Text actions: 14px, weight 500. Small metadata usually uses 12px. Career periods use tabular numerals.
- Mobile display: `clamp(2.8rem, 10.9vw, 4.7rem)`. Mobile project disclosure titles use 23px and allow long words to wrap.
- Contact headline: `clamp(3rem, 6.5vw, 6rem)`; mobile `clamp(2.4rem, 9.5vw, 4rem)`.

## Layout

The main container is `min(1280px, calc(100% - 112px))`, centered. Section padding follows the frontmatter's desktop, tablet and mobile spacing. The sticky header is 88px tall; anchor scroll padding is 100px.

Desktop uses unequal two-column grids: hero and introduction 1.15:1, featured project 1.1:1, about media 1.65:1, practice 1:1.3 and experience 1:1.2. Skills use three columns. Long text remains bounded instead of filling the whole viewport.

- At **max-width 1000px**, container width becomes `calc(100% - 64px)`; navigation and content gaps tighten, including 36px for the featured project and 60px for practice and experience.
- At **max-width 700px**, container width becomes `calc(100% - 40px)`; header height is 72px and scroll padding is 86px. Navigation becomes a disclosure. Main grids stack, skills retain two columns, and hero copy precedes the portrait. The compact portrait frame is 350px tall; the image is 355px. The casual photo is 52% wide and right aligned. Contact details stack and the footer wraps.
- At **min-width 1600px**, hero minimum height is 780px and portrait image height is 670px.

## Elevation & Depth

The portfolio declares no box-shadow vocabulary. Depth comes from changing surface tones, thin dividing rules, imagery and scale. The header is an opaque paper surface with a bottom border; it does not use blur. The avatar uses multiply blending to sit on the page. Its entrance moves up from 24px while saturation increases over 1.2 seconds with `cubic-bezier(.16,1,.3,1)`.

## Shapes

Panels and imagery are rectangular. Only primary buttons have a small corner radius; focus outlines use the separate focus radius. The status indicator is a 6px circle. Tags are text with bottom rules, not pills. Standard interactive icon controls occupy 44px squares. Borders are generally 1px rather than shadow-based boundaries.

## Components

### Buttons and text actions

The primary action is charcoal on paper, at least 54px high, with the frontmatter padding. Hover changes its background to orange and translates it up 2px over .25s. Mobile minimum height is 50px. Text actions have a 44px minimum height, current-color bottom rule and 12px icon gap; their arrows move 3px right and up on hover. These transforms are supplementary to text labels.

All portfolio focus-visible targets receive a 2px orange outline offset by 6px; the dark section substitutes its lighter accent. Disabled buttons use .5 opacity and a default cursor. The skip link becomes visible on focus.

### Navigation

The sticky header pairs a bold wordmark, section links and an external résumé link. Desktop links reveal a 1px orange underline on hover or keyboard focus with a .25s transition. At the mobile breakpoint, a labeled 44px menu button exposes an in-flow navigation region. Its expanded state and controlled region are programmatically identified. Escape closes it and returns focus to the trigger; selecting a link closes it. It is not a modal menu.

### Project disclosures and technology labels

Project rows use native `details` and `summary`, preserving keyboard disclosure behavior. A plus becomes a minus when open; rows are separated by dark rules. Hover changes the title to the dark accent. Open content arrives over .35s ease-out, moving from -6px and .6 opacity. Description, technologies and an optional source link remain ordinary content below the summary. The separate all-work button exposes three additional projects and reports expanded state.

Technology labels wrap naturally with an 8px row gap and 15px column gap. They are descriptive labels, not filter controls.

### Media and motion

The coffee video is muted, looping and inline, with an 8:5 crop, poster and `preload="none"`. Automatic play is attempted when its intersection reaches 20%, only if motion is allowed, the document is visible and the user has not manually paused. It pauses offscreen and when the document is hidden. Reduced-motion preference changes pause it; explicit play remains available to the user. The caption contains a labeled 44px play/pause control; a failed playback disables it with an unavailable label.

Reduced motion disables portfolio animations and transitions and sets scrolling to auto. No meaning depends on animation. Photos retain descriptive alternative text.

### Contact actions

The large contact title and email open mail. The 44px copy control reports success through a live status message, resets after 2500ms and shows a manual-copy message on failure. Social and résumé links open externally with appropriate relationship attributes. There is no contact form or input-field style in the current system.

## Do's and Don'ts

- **Do** preserve the warm paper, charcoal and orange relationship and the lighter accent on dark surfaces.
- **Do** use ruled content, bounded paragraphs and restrained serif emphasis.
- **Do** retain keyboard focus, native disclosure behavior, visible media controls and reduced-motion support.
- **Do** preserve the supplied personal imagery and truthful project and career content.
- **Don't** infer new portfolio tokens from retained legacy components or the unused mono font.
- **Don't** turn descriptive technology labels into interactive pills without a real interaction.
- **Don't** hide content or required interaction behind motion.

### Skills and project interaction revision
Skills now precede projects directly after the hero, followed by About and Experience. Actual photos are excluded; avatar and coffee animation remain. Skill category buttons use aria-pressed and replace a live technology stage with a 400 ms transition and 35 ms item stagger. Project filter buttons update an always-readable project gallery with a 500 ms entrance and 45 ms item stagger; total delay stays below 300 ms. Work descriptions and code links are visible without disclosures. Desktop uses a two-column gallery; mobile at 700 px uses one column and wrapping controls. Reduced motion disables spatial animations; native button state and status announcements preserve feedback.
