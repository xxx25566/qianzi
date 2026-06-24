(() => {
  const topLine = document.getElementById("topLine");
  const nav = document.querySelector(".nav");

  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (topLine) topLine.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;
    if (nav) nav.classList.toggle("is-scrolled", y > 10);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const revealItems = document.querySelectorAll(".reveal, .card, .product-card, .catalog-product, .category-block, .process-step");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("in");
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => {
      item.classList.add("reveal");
      observer.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add("in"));
  }

  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");
  menuBtn?.addEventListener("click", () => {
    const open = navLinks?.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  document.querySelectorAll(".tab[data-filter]").forEach((tab) => {
    tab.addEventListener("click", () => {
      const filter = tab.dataset.filter;
      document.querySelectorAll(".tab[data-filter]").forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      document.querySelectorAll("[data-series]").forEach((block) => {
        block.style.display = filter === "all" || block.dataset.series === filter ? "" : "none";
      });
    });
  });

  const searchIndex = [
    { title: "首页", desc: "千子医疗 妇产科医用卫生材料 母婴护理用品", url: "index.html" },
    { title: "解决方案", desc: "产前护理 产程护理 产后护理 新生儿护理", url: "solutions.html" },
    { title: "产品展示", desc: "医疗用品系列 母婴用品系列 全部产品分类", url: "products.html" },
    { title: "关于我们", desc: "广州千子医疗科技有限公司 公司介绍", url: "about.html" },
    { title: "联系我们", desc: "咨询合作 热线 经销商 医院 月子中心", url: "contact.html" },
    { title: "医疗用品系列", desc: "产检 产前 产中 产程 产后 新生儿 游泳袋 游泳圈", url: "products.html#medical-series" },
    { title: "母婴用品系列", desc: "产妇护垫 医用护理垫 母婴护理包 收腹带 护脐带 防溢乳垫", url: "products.html#mother-baby-series" },
    { title: "孕产妇专用卫生巾", desc: "产前护理 产后护理 医疗用品 母婴用品", url: "products.html" },
    { title: "胎监带", desc: "产检产前护理 胎心监护辅助用品", url: "products.html" },
    { title: "入院待产包", desc: "产前 产程 母婴护理包 经济型 豪华型", url: "products.html" },
    { title: "护理垫", desc: "产前护理 医用护理垫 舒适型 加厚型", url: "products.html" },
    { title: "产床罩", desc: "产中产程护理 医疗卫生材料", url: "products.html" },
    { title: "计量产程垫", desc: "产程护理 计量护理 出血量观察", url: "products.html" },
    { title: "医用护理垫", desc: "医疗用品 母婴用品 60x60 60x90", url: "products.html" },
    { title: "腹带", desc: "产后护理 收腹带 顺产 剖腹产 加强型 纱布", url: "products.html" },
    { title: "产后护理包", desc: "产后护理组合用品", url: "products.html" },
    { title: "产后收腹带", desc: "产后恢复 母婴护理 收腹带", url: "products.html" },
    { title: "护脐带", desc: "新生儿护理 护脐带10条装 碘伏5条装", url: "products.html" },
    { title: "游泳贴", desc: "宝宝游泳贴 防水游泳贴 透气贴", url: "products.html" },
    { title: "游泳袋", desc: "新生儿游泳护理产品", url: "products.html" },
    { title: "游泳圈", desc: "婴儿游泳护理用品", url: "products.html" },
    { title: "产妇护垫", desc: "XL L M S 孕产妇专用护垫", url: "products.html" },
    { title: "母婴护理包", desc: "入院待产包 经济型 豪华型", url: "products.html" },
    { title: "收腹带", desc: "顺产 剖腹产 加强型 纱布收腹带", url: "products.html" },
    { title: "防溢乳垫", desc: "舒适型36片 超柔型36片", url: "products.html" },
    { title: "透气创可贴", desc: "透气贴A型 宝宝护理", url: "products.html" },
    { title: "一次性纸内裤", desc: "一次性纸内裤 弹力网裤 纯棉内裤", url: "products.html" },
    { title: "一次性坐厕纸", desc: "母婴用品 一次性卫生护理", url: "products.html" }
  ];

  const normalize = (text) => (text || "").toLowerCase().replace(/\s+/g, "");

  document.querySelectorAll(".search").forEach((form) => {
    const input = form.querySelector('input[type="search"]');
    const results = form.querySelector(".search-results");

    const renderResults = () => {
      const query = normalize(input?.value);
      if (!query || !results) {
        results?.classList.remove("open");
        if (results) results.innerHTML = "";
        return [];
      }

      const matches = searchIndex
        .filter((item) => normalize(`${item.title}${item.desc}`).includes(query))
        .slice(0, 6);

      results.innerHTML = matches.length
        ? matches.map((item) => `<a href="${item.url}"><strong>${item.title}</strong><small>${item.desc}</small></a>`).join("")
        : "<span>没有找到完全匹配的内容，可进入产品展示页浏览完整分类。</span>";
      results.classList.add("open");
      return matches;
    };

    input?.addEventListener("input", renderResults);
    input?.addEventListener("focus", renderResults);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const matches = renderResults();
      window.location.href = matches[0]?.url || "products.html";
    });

    document.addEventListener("click", (event) => {
      if (!form.contains(event.target)) results?.classList.remove("open");
    });
  });
})();
