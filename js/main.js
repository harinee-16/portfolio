/* Harinee U.J. — portfolio interactions */
(function () {
  "use strict";

  /* Footer year */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Placeholders: anything still written as [LIKE THIS] is hidden, so unfinished
     fields never appear on the live site. Fill the text in index.html to show it. */
  var hasPlaceholder = function (s) { return /\[[^\]]+\]/.test(s || ""); };

  document.querySelectorAll("[data-href]").forEach(function (el) {
    var href = el.getAttribute("data-href");
    if (hasPlaceholder(href)) { el.hidden = true; } else { el.setAttribute("href", href); }
  });

  document.querySelectorAll("[data-fill]").forEach(function (el) {
    var unresolvedLink = el.hasAttribute("data-href") && el.hidden;
    var innerLink = el.querySelector("[data-href]");
    var unresolvedInner = innerLink && innerLink.hidden;
    if (unresolvedLink || unresolvedInner || hasPlaceholder(el.textContent)) el.hidden = true;
  });

  document.querySelectorAll(".case__links").forEach(function (row) {
    var anyVisible = Array.prototype.some.call(row.children, function (c) { return !c.hidden; });
    if (!anyVisible) row.hidden = true;
  });

  /* Mobile nav */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("navMenu");
  if (toggle && menu) {
    var setOpen = function (open) {
      menu.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    toggle.addEventListener("click", function () { setOpen(!menu.classList.contains("is-open")); });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setOpen(false); });
  }

  /* Highlight the nav link for the section in view */
  var links = document.querySelectorAll('.nav__menu a[href^="#"]');
  var sections = document.querySelectorAll("main section[id]");
  if ("IntersectionObserver" in window && sections.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (l) {
          if (l.getAttribute("href") === "#" + entry.target.id) l.setAttribute("aria-current", "true");
          else l.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { io.observe(s); });
  }
})();