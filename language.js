(function () {
  const languages = {
    en: {
      label: "English",
      navSchedule: "Schedule",
      navCities: "Host Cities",
      navFormat: "Format",
      navAbout: "About",
      navContact: "Contact",
      navPrivacy: "Privacy Policy",
      homeEyebrow: "Canada, Mexico and United States - June 11-July 19, 2026",
      homeTitle: "World Cup 2026 schedule, city and trip planner",
      homeIntro:
        "Plan match days across 16 host cities with practical schedule tools, stadium notes, time-zone guides and travel checklists built for fans who want fewer tabs open and fewer surprises on match day.",
      exploreSchedule: "Explore schedule",
      browseCities: "Browse cities",
      fanWorkflow: "Fan trip workflow",
      fanTitle: "Turn searches into useful planning pages",
      fanCopy:
        "The best traffic will come from fans with specific intent: where to stay, when a match starts in their time zone, how to reach a stadium and what to do between matches.",
      footer:
        "Independent planning guide. Not affiliated with FIFA. Verify ticketing, match and venue details with official sources before travel.",
    },
    zh: {
      label: "中文",
      navSchedule: "赛程",
      navCities: "主办城市",
      navFormat: "赛制",
      navAbout: "关于",
      navContact: "联系",
      navPrivacy: "隐私政策",
      homeEyebrow: "加拿大、墨西哥、美国 - 2026年6月11日至7月19日",
      homeTitle: "2026 世界杯赛程、城市与旅行规划",
      homeIntro:
        "围绕 16 个主办城市规划比赛日，查询赛程、球场、时区、交通和旅行清单，让球迷少开几个标签页，少踩几个坑。",
      exploreSchedule: "查看赛程",
      browseCities: "浏览城市",
      fanWorkflow: "球迷旅行流程",
      fanTitle: "把搜索需求变成实用规划页面",
      fanCopy:
        "真正有价值的流量来自明确需求：住哪里、比赛在本地几点开始、怎么去球场、两场比赛之间做什么。",
      footer:
        "独立旅行规划指南，与 FIFA 无官方关联。购票、赛程、场馆与出行信息请以官方来源为准。",
    },
    es: {
      label: "Español",
      navSchedule: "Calendario",
      navCities: "Ciudades",
      navFormat: "Formato",
      navAbout: "Acerca de",
      navContact: "Contacto",
      navPrivacy: "Privacidad",
      homeEyebrow: "Canada, Mexico y Estados Unidos - 11 de junio al 19 de julio de 2026",
      homeTitle: "Calendario, ciudades y viaje para el Mundial 2026",
      homeIntro:
        "Planifica partidos en 16 ciudades sede con herramientas de calendario, notas de estadios, zonas horarias y listas de viaje para aficionados.",
      exploreSchedule: "Ver calendario",
      browseCities: "Ver ciudades",
      fanWorkflow: "Plan de viaje",
      fanTitle: "Convierte busquedas en paginas utiles",
      fanCopy:
        "El mejor trafico llega de aficionados con una intencion clara: donde quedarse, a que hora empieza el partido, como llegar al estadio y que hacer entre partidos.",
      footer:
        "Guia independiente. No esta afiliada a FIFA. Verifica entradas, partidos y sedes con fuentes oficiales antes de viajar.",
    },
  };

  const getLang = () => localStorage.getItem("wct_lang") || "en";

  function text(selector, value) {
    const node = document.querySelector(selector);
    if (node && value) node.textContent = value;
  }

  function updateNav(lang) {
    const t = languages[lang];
    document.querySelectorAll(".nav-links a").forEach((link) => {
      const href = link.getAttribute("href") || "";
      if (href.includes("schedule")) link.textContent = t.navSchedule;
      if (href.includes("host-cities")) link.textContent = t.navCities;
      if (href.includes("48-team-format")) link.textContent = t.navFormat;
      if (href.includes("about")) link.textContent = t.navAbout;
    });
  }

  function updateHome(lang) {
    const t = languages[lang];
    text(".hero-copy .eyebrow", t.homeEyebrow);
    text(".hero-copy h1", t.homeTitle);
    text(".hero-copy p:not(.eyebrow)", t.homeIntro);
    text(".hero-actions .primary", t.exploreSchedule);
    text(".hero-actions .secondary", t.browseCities);
    const workflow = document.querySelectorAll(".section-heading .eyebrow");
    workflow.forEach((node) => {
      if (node.textContent.includes("Fan trip") || node.textContent.includes("球迷") || node.textContent.includes("Plan de")) {
        node.textContent = t.fanWorkflow;
      }
    });
    document.querySelectorAll(".section-heading h2").forEach((node) => {
      if (node.textContent.includes("Turn searches") || node.textContent.includes("搜索") || node.textContent.includes("Convierte")) {
        node.textContent = t.fanTitle;
      }
    });
    document.querySelectorAll(".section-heading.split > p").forEach((node) => {
      if (node.textContent.includes("best traffic") || node.textContent.includes("真正有价值") || node.textContent.includes("mejor trafico")) {
        node.textContent = t.fanCopy;
      }
    });
  }

  function updateFooter(lang) {
    const footer = document.querySelector(".footer p");
    if (!footer) return;
    const links = footer.querySelectorAll("a");
    const t = languages[lang];
    footer.childNodes[0].textContent = `${t.footer} `;
    links.forEach((link) => {
      const href = link.getAttribute("href") || "";
      if (href.includes("about")) link.textContent = t.navAbout;
      if (href.includes("contact")) link.textContent = t.navContact;
      if (href.includes("privacy")) link.textContent = t.navPrivacy;
    });
  }

  function setLanguage(lang) {
    localStorage.setItem("wct_lang", lang);
    document.documentElement.lang = lang === "zh" ? "zh-CN" : lang;
    updateNav(lang);
    updateHome(lang);
    updateFooter(lang);
    const select = document.querySelector("#languageSelect");
    if (select) select.value = lang;
  }

  function injectControl() {
    const nav = document.querySelector(".nav");
    if (!nav || document.querySelector("#languageSelect")) return;
    const wrap = document.createElement("label");
    wrap.className = "language-control";
    wrap.innerHTML = `
      <span>Language</span>
      <select id="languageSelect" aria-label="Select language">
        ${Object.entries(languages)
          .map(([code, config]) => `<option value="${code}">${config.label}</option>`)
          .join("")}
      </select>
    `;
    nav.append(wrap);
    wrap.querySelector("select").addEventListener("change", (event) => setLanguage(event.target.value));
  }

  document.addEventListener("DOMContentLoaded", () => {
    injectControl();
    setLanguage(getLang());
  });
})();
