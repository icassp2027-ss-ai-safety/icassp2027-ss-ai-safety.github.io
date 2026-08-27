const toggle = document.querySelector("[data-nav-toggle]");
const links = document.querySelector("[data-nav-links]");

function setToggleIcon(name) {
  if (!toggle) return;
  const existing = toggle.querySelector("svg, i[data-lucide]");
  const icon = document.createElement("i");
  icon.setAttribute("data-lucide", name);
  icon.setAttribute("aria-hidden", "true");
  if (existing) existing.replaceWith(icon);
  if (window.lucide) window.lucide.createIcons();
}

function setToggleLabel(label) {
  if (!toggle) return;
  toggle.setAttribute("title", label);
  const accessibleLabel = toggle.querySelector(".sr-only");
  if (accessibleLabel) accessibleLabel.textContent = label;
}

function closeNavigation() {
  if (!toggle || !links) return;
  links.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
  setToggleLabel("Open navigation");
  document.body.classList.remove("nav-open");
  setToggleIcon("menu");
}

if (toggle && links) {
  toggle.addEventListener("click", () => {
    const willOpen = toggle.getAttribute("aria-expanded") !== "true";
    links.classList.toggle("is-open", willOpen);
    toggle.setAttribute("aria-expanded", String(willOpen));
    setToggleLabel(willOpen ? "Close navigation" : "Open navigation");
    document.body.classList.toggle("nav-open", willOpen);
    setToggleIcon(willOpen ? "x" : "menu");
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNavigation);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) closeNavigation();
  });
}

window.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) window.lucide.createIcons();
});
