/* AISG Dashboards — design-led public-safe portal.
 * The role switcher and workspace list are demonstration navigation only.
 * Production access must be enforced by Microsoft identity + authorised data APIs.
 */
const workspaces = [
  {
    id: "my-learners", title: "My Learners", category: "Teaching & Learning",
    description: "A connected view of academic progress, learner experience and classroom evidence.",
    icon: "learners", mode: "demo",
    features: ["Faculty", "Student view", "Learning evidence"],
    prototype: "https://edtechevans.github.io/mylearners/",
    prototypeLabel: "Open fictional My Learners demo"
  },
  {
    id: "growth", title: "Growth & Reflection", category: "Professional Learning",
    description: "Bring professional goals, observation evidence and meaningful reflection together.",
    icon: "growth", mode: "planned",
    features: ["Observations", "Growth goals", "Reflect"],
    prototype: "https://edtechevans.github.io/growthandreflection/",
    prototypeLabel: "Open fictional Reflect demo"
  },
  {
    id: "climate", title: "Climate & Wellbeing", category: "Community Experience",
    description: "Explore the experiences, belonging and wellbeing of our AISG community.",
    icon: "climate", mode: "restricted",
    features: ["Students", "Faculty", "Caregivers"]
  },
  {
    id: "leaders", title: "Learning Leaders", category: "Leadership",
    description: "Bring learning and student experience patterns into sharper focus for school leaders.",
    icon: "leaders", mode: "demo",
    features: ["School overview", "Divisions", "Follow-up"],
    prototype: "https://edtechevans.github.io/mylearners/",
    prototypeLabel: "Open fictional Leaders demo"
  },
  {
    id: "sss", title: "Student Support", category: "Student Support Services",
    description: "Connect learner strengths, support planning and collaborative next steps.",
    icon: "support", mode: "demo",
    features: ["Learner profiles", "Reviews", "Support plans"],
    prototype: "https://edtechevans.github.io/mylearners/",
    prototypeLabel: "Open fictional Student Support demo"
  },
  {
    id: "board", title: "Board", category: "Governance",
    description: "Strategic indicators and long-term trends to inform thoughtful oversight.",
    icon: "board", mode: "planned",
    features: ["Learning", "Growth", "Community"]
  }
];

const icons = {
  learners: '<circle cx="8.8" cy="8" r="3.2"/><path d="M2.5 20v-1.9a5.5 5.5 0 0 1 5.5-5.5h1.6a5.5 5.5 0 0 1 5.5 5.5V20"/><path d="M17.3 5a3.2 3.2 0 0 1 0 6.2M17.2 14a4.5 4.5 0 0 1 4.3 4.5V20"/>',
  growth: '<path d="M4 20V10.5m6 9.5V15m6 5V9m4 11H2"/><path d="m4.2 7.8 5-4.6 4.3 3.5 6.3-5"/><path d="M15.7 1.7H20v4.2"/>',
  climate: '<path d="M20.5 5.4a5.4 5.4 0 0 0-7.7 0L12 6.2l-.8-.8a5.4 5.4 0 1 0-7.7 7.7L12 21.2l8.5-8.1a5.4 5.4 0 0 0 0-7.7Z"/>',
  leaders: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 15.5V12m5 3.5v-7m5 7v-4"/><path d="M6 8h2"/>',
  support: '<path d="M12 22s8-3.8 8-10V5.5L12 2 4 5.5V12c0 6.2 8 10 8 10Z"/><path d="M12 7v10M7 12h10"/>',
  board: '<rect x="3" y="3" width="18" height="18" rx="2.5"/><path d="M8 15V11m4 4V7m4 8v-3"/><path d="M7 18h10"/>',
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  chevron: '<path d="m9 6 6 6-6 6"/>',
  lock: '<rect x="4" y="10" width="16" height="12" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  sparkle: '<path d="m12 2 2.1 6.9L21 11l-6.9 2.1L12 20l-2.1-6.9L3 11l6.9-2.1L12 2Z"/>',
  home: '<path d="m3 11 9-8 9 8v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-9Z"/><path d="M9 21v-7h6v7"/>'
};
function svg(name, size = 24) {
  return '<svg aria-hidden="true" width="' + size + '" height="' + size +
    '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' +
    icons[name] + '</svg>';
}
const path = id => id ? "#/workspace/" + id : "#/";
function currentWorkspace() {
  const match = (location.hash || "").match(/^#\/workspace\/([a-z-]+)$/);
  return match ? workspaces.find(x => x.id === match[1]) : null;
}
function status(x) {
  return x.mode === "demo" ? "Fictional demo" : x.mode === "restricted" ? "Secure migration" : "Integration planned";
}
function card(x, index) {
  return '<a class="tile" href="' + path(x.id) + '" style="--card-delay:' + (index * 55) + 'ms">' +
    '<div class="tile-head"><div class="tile-icon">' + svg(x.icon, 26) + '</div>' +
    '<span class="tile-status ' + x.mode + '"><span class="status-dot"></span>' + status(x) + '</span></div>' +
    '<div class="tile-category">' + x.category + '</div><h3>' + x.title + '</h3><p>' + x.description + '</p>' +
    '<div class="tile-bottom"><span>Explore dashboard</span>' + svg("arrow", 17) + '</div></a>';
}
function home() {
  return '<div class="home-view">' +
    '<section class="welcome" aria-label="Welcome to AISG Dashboards">' +
    '<div class="welcome-brand"><img src="assets/aisg-logo.webp" alt="AISG — American International School of Guangzhou"></div>' +
    '<div class="welcome-copy"><span class="overline"><span class="red-mark"></span>WELCOME TO YOUR WORKSPACE</span>' +
    '<h1>AISG <span>Dashboards</span></h1>' +
    '<p>Everything in one place. Explore the learning, growth and community insights that help us make informed decisions across AISG.</p>' +
    '<div class="welcome-meta"><span class="meta-line"></span>Engagement for All</div></div>' +
    '</section>' +
    '<section id="workspaces" class="workspaces" aria-label="Your dashboards">' +
    '<div class="section-heading"><div><span class="section-label">EXPLORE AISG</span><h2>Your dashboards</h2>' +
    '<p>Choose a workspace to explore its tools and insights.</p></div>' +
    '<span class="count">SIX CONNECTED WORKSPACES <span class="count-number">06</span></span></div>' +
    '<div class="tile-grid">' + workspaces.map(card).join("") + '</div></section>' +
    '<section class="lower-grid" aria-label="Portal information">' +
    '<article class="announcement"><div class="announcement-icon">' + svg("sparkle", 24) + '</div><div>' +
    '<span class="section-label">PLATFORM UPDATE</span><h3>One school. One place to explore.</h3>' +
    '<p>We are gradually bringing our dashboards together. The shared experience is ready to explore, while existing applications are migrated and tested.</p>' +
    '</div></article><article class="access-note"><div class="announcement-icon">' + svg("lock", 24) + '</div><div>' +
    '<span class="section-label">ABOUT ACCESS</span><h3>Built for thoughtful, secure access.</h3>' +
    '<p>This public prototype uses fictional demonstrations. Live dashboards will be shown only to authorised colleagues after secure sign-in and data permissions are implemented.</p>' +
    '</div></article></section></div>';
}
function detail(x) {
  const readyText = x.mode === "restricted"
    ? "This workspace is not connected to the public portal. AISG-approved Microsoft authentication and server-enforced data access are required before migration."
    : x.mode === "demo"
      ? "The current example uses fictional data. Its existing screens will be integrated into this platform in stages."
      : "The existing analytics and views will be migrated after their data and access requirements have been reviewed.";
  const link = x.prototype
    ? '<a class="prototype-link" href="' + x.prototype + '" rel="noopener noreferrer" target="_blank">' +
      x.prototypeLabel + svg("arrow", 17) + '</a>'
    : '';
  return '<div class="detail-view">' +
    '<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="#/">' + svg("home", 16) + ' All dashboards</a>' +
    svg("chevron", 14) + '<span>' + x.title + '</span></nav>' +
    '<section class="detail-intro"><div class="detail-icon">' + svg(x.icon, 32) + '</div>' +
    '<div class="detail-intro-text"><span class="section-label">' + x.category.toUpperCase() +
    '</span><h1>' + x.title + '</h1><p>' + x.description + '</p></div>' +
    '<span class="tile-status ' + x.mode + '"><span class="status-dot"></span>' + status(x) + '</span></section>' +
    '<div class="detail-layout"><section class="detail-main"><span class="section-label">YOUR WORKSPACE</span>' +
    '<h2>One connected experience</h2><p>As we bring the original dashboards into AISG Dashboards, this area will provide a seamless view without sending you to an unrelated application.</p>' +
    '<div class="feature-row">' + x.features.map(y => '<span>' + y + '</span>').join("") + '</div>' +
    '<div class="integration-placeholder">' + svg(x.icon, 32) + '<strong>Integration in progress</strong>' +
    '<p>Existing dashboard content has not been copied into this portal yet.</p></div></section>' +
    '<aside class="detail-aside"><span class="section-label">CURRENT STATUS</span><h2>' + status(x) +
    '</h2><p>' + readyText + '</p>' + link +
    '<p class="link-note">Existing prototypes open in a separate tab until their screens are integrated. These links do not provide secure access.</p>' +
    '</aside></div></div>';
}
function shell(view, selected) {
  return '<div class="site-shell">' +
    '<header class="topbar"><div class="topbar-inner">' +
    '<a class="topbar-brand" href="#/" aria-label="AISG Dashboards home"><span class="brand-aisg">AISG</span><span class="brand-rule"></span><span class="brand-dashboard">Dashboards</span></a>' +
    '<div class="topbar-controls"><a class="overview-link ' + (!selected ? 'current' : '') + '" href="#/">' + svg("home", 17) + '<span>Overview</span></a>' +
    '<label class="switch-label" for="switch">Dashboard</label><select id="switch" aria-label="Switch dashboard">' +
    '<option value="">All dashboards</option>' +
    workspaces.map(y => '<option value="' + y.id + '" ' + (selected?.id === y.id ? 'selected' : '') + '>' + y.title + '</option>').join("") +
    '</select><span class="preview-state">DESIGN PREVIEW</span></div></div></header>' +
    '<main id="main" class="main-content">' + view + '</main>' +
    '<footer class="site-footer"><span>© AISG · Engagement for All</span><span>Prototype environment · No confidential records</span></footer></div>';
}
function render() {
  const selected = currentWorkspace();
  document.getElementById("app").innerHTML = shell(selected ? detail(selected) : home(), selected);
  document.getElementById("switch").addEventListener("change", e => { location.hash = path(e.target.value); });
  document.title = (selected ? selected.title + " · " : "") + "AISG Dashboards";
}
addEventListener("hashchange", render);
render();