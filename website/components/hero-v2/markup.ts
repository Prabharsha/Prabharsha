/* Static markup for the v2 hero. Authored in-repo (no user input), rendered once. */
const markup = `<div class="hv2-collage" aria-hidden="true">
      <div class="hv2-tile" style="--x:2vw;--y:3.5vh" data-depth="1"><div class="hv2-screen"><div class="hv2-mock hv2-m-dash"><i class="hv2-rail"></i><div class="hv2-pane"><p class="hv2-ttl">Settlements <span>LKR · today</span></p><div class="hv2-kpis"><b><small>Volume</small>4.82M</b><b><small>Success</small>99.2%</b><b><small>Pending</small>128</b></div><div class="hv2-bars"><u style="--h:38%"></u><u style="--h:52%"></u><u style="--h:44%"></u><u style="--h:71%"></u><u style="--h:60%"></u><u style="--h:86%"></u><u style="--h:68%"></u><u style="--h:92%"></u></div></div></div></div></div>
      <div class="hv2-tile" style="--x:26vw;--y:1vh" data-depth="2"><div class="hv2-screen"><div class="hv2-mock hv2-m-code"><p class="hv2-tabs">SettlementApi.java</p><pre><i class="hv2-k">@RestController</i>
<i class="hv2-k">class</i> <i class="hv2-t">SettlementApi</i> {
  <i class="hv2-k">@GetMapping</i>(<i class="hv2-s">"/v1/settlements"</i>)
  <i class="hv2-t">Page</i>&lt;<i class="hv2-t">Settlement</i>&gt; list(<i class="hv2-t">Pageable</i> p) {
    <i class="hv2-k">return</i> service.findAll(p);
  }
}</pre></div></div></div>
      <div class="hv2-tile" style="--x:52vw;--y:5vh" data-depth="1"><div class="hv2-screen"><div class="hv2-mock hv2-m-rbac"><p class="hv2-ttl">Roles &amp; permissions</p><table><thead><tr><th>Role</th><th>View</th><th>Edit</th><th>Approve</th></tr></thead><tbody><tr><td>Admin</td><td><s class="hv2-y"></s></td><td><s class="hv2-y"></s></td><td><s class="hv2-y"></s></td></tr><tr><td>Analyst</td><td><s class="hv2-y"></s></td><td><s class="hv2-y"></s></td><td><s></s></td></tr><tr><td>Support</td><td><s class="hv2-y"></s></td><td><s></s></td><td><s></s></td></tr></tbody></table></div></div></div>
      <div class="hv2-tile" style="--x:78vw;--y:2vh" data-depth="2"><div class="hv2-screen"><div class="hv2-mock hv2-m-mon"><p class="hv2-ttl">Cluster health <span>last 24h</span></p><svg viewBox="0 0 100 40" preserveAspectRatio="none"><polygon points="0,40 0,30 10,26 20,28 30,18 40,22 50,12 60,16 70,8 80,14 90,6 100,10 100,40"/><polyline points="0,30 10,26 20,28 30,18 40,22 50,12 60,16 70,8 80,14 90,6 100,10"/></svg><div class="hv2-pills"><span class="hv2-ok">api-01</span><span class="hv2-ok">db-02</span><span class="hv2-warn">queue 2.1s</span></div></div></div></div>
      <div class="hv2-tile" style="--x:-4vw;--y:36vh" data-depth="3"><div class="hv2-screen"><div class="hv2-mock hv2-m-phone"><div class="hv2-ph"><small>Balance</small><b class="hv2-bal">LKR 12,450</b><div class="hv2-row"><span>Grocer</span><em>−2,180</em></div><div class="hv2-row"><span>Fuel</span><em>−6,400</em></div><div class="hv2-row"><span>Salary</span><em>+85,000</em></div></div></div></div></div>
      <div class="hv2-tile" style="--x:83vw;--y:34vh" data-depth="3"><div class="hv2-screen"><div class="hv2-mock hv2-m-event"><div class="hv2-art"></div><div class="hv2-info"><p class="hv2-t">Colombo Dev Meetup</p><p class="hv2-d">Sat 14 Nov · Main Hall</p><div class="hv2-seats"><u></u><u class="hv2-x"></u><u></u><u></u><u class="hv2-x"></u><u class="hv2-x"></u><u></u><u></u><u></u><u class="hv2-x"></u><u></u><u></u><u class="hv2-x"></u><u></u><u></u><u></u><u class="hv2-x"></u><u></u><u></u><u></u><u></u><u class="hv2-x"></u><u></u><u></u><u></u><u></u><u class="hv2-x"></u><u></u></div></div></div></div></div>
      <div class="hv2-tile" style="--x:5vw;--y:68vh" data-depth="2"><div class="hv2-screen"><div class="hv2-mock hv2-m-term"><span class="hv2-dim">~/payments-service</span>
$ ./deploy.sh --env prod
✔ build passed
✔ migrations applied
✔ health checks green
$ _</div></div></div>
      <div class="hv2-tile" style="--x:29vw;--y:71vh" data-depth="1"><div class="hv2-screen"><div class="hv2-mock hv2-m-dash hv2-light"><i class="hv2-rail"></i><div class="hv2-pane"><p class="hv2-ttl">Merchants <span>this week</span></p><div class="hv2-kpis"><b><small>Active</small>1,284</b><b><small>New</small>+36</b><b><small>Churn</small>0.8%</b></div><div class="hv2-bars"><u style="--h:30%"></u><u style="--h:44%"></u><u style="--h:40%"></u><u style="--h:62%"></u><u style="--h:58%"></u><u style="--h:75%"></u><u style="--h:70%"></u><u style="--h:88%"></u></div></div></div></div></div>
      <div class="hv2-tile" style="--x:55vw;--y:69vh" data-depth="3"><div class="hv2-screen"><div class="hv2-mock hv2-m-code"><p class="hv2-tabs">useSettlements.ts</p><pre><i class="hv2-k">export function</i> <i class="hv2-t">useSettlements</i>() {
  <i class="hv2-k">const</i> { data } = <i class="hv2-t">useQuery</i>({
    queryKey: [<i class="hv2-s">"settlements"</i>],
    queryFn: fetchSettlements,
  });
  <i class="hv2-k">return</i> data ?? [];
}</pre></div></div></div>
      <div class="hv2-tile" style="--x:79vw;--y:70vh" data-depth="2"><div class="hv2-screen"><div class="hv2-mock hv2-m-rbac"><p class="hv2-ttl">Audit log <span style="opacity:.5;font-weight:400">today</span></p><table><tbody><tr><td>Role updated</td><td>admin</td><td>09:12</td></tr><tr><td>Export created</td><td>analyst</td><td>09:40</td></tr><tr><td>Login</td><td>support</td><td>10:05</td></tr><tr><td>Approval</td><td>admin</td><td>10:31</td></tr></tbody></table></div></div></div>
    </div>

    <div class="hv2-card">
      <div class="hv2-chrome" aria-hidden="true"><i></i><i></i><i></i><span>~/prabharsha/portfolio/hero.tsx</span></div>
      <div class="hv2-stage">
        <div class="hv2-bg-wrap"><div class="hv2-stage-bg"></div></div>
        <div class="hv2-glow" aria-hidden="true"></div>
        <h1 class="hv2-headline" id="hero-heading"><span class="hv2-hl-line"><span>Engineering the</span></span><span class="hv2-hl-line"><span>systems behind</span></span><span class="hv2-hl-line"><span>money.</span></span></h1>
        <div class="hv2-subject-wrap">
          <img class="hv2-subject" src="/images/hero-subject.webp" width="722" height="2144" alt="3D illustrated portrait of Prabharsha in sunglasses and a black t-shirt, hand in pocket" decoding="async" fetchpriority="high">
        </div>
        <div class="hv2-ui">
                <p class="hv2-meta hv2-meta--top"><strong>Fintech engineering</strong>Java · Spring Boot · React</p>
        <p class="hv2-meta hv2-meta--bottom"><strong>Software Engineer</strong>Colombo, Sri Lanka</p>
        <p class="hv2-hint">Scroll</p>
        </div>
      </div>
    </div>`;

export default markup;
