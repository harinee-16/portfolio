/* Fills links from data-href and hides anything still containing [PLACEHOLDER] text,
   so unfinished fields never show on the live site. */
(function () {
  "use strict";

  const hasPlaceholder = (s) => /\[[^\]]+\]/.test(s || "");

  // 1. Resolve data-href links; hide the link if still a placeholder
  document.querySelectorAll("[data-href]").forEach((el) => {
    const href = el.getAttribute("data-href");
    if (hasPlaceholder(href)) {
      el.hidden = true;
    } else {
      el.setAttribute("href", href);
    }
  });

  // 2. Hide any [data-fill] block that still has placeholder text
  document.querySelectorAll("[data-fill]").forEach((el) => {
    const unresolvedLink = el.matches("[data-href]") && el.hidden;
    if (unresolvedLink || hasPlaceholder(el.textContent)) el.hidden = true;
  });

  // 3. Hide a contact/project link row if all of its links are hidden
  document.querySelectorAll(".proj-card__links").forEach((row) => {
    if (![...row.children].some((c) => !c.hidden)) row.hidden = true;
  });
})();