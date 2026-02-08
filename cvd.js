const sections = document.querySelectorAll("[id]");
const navLinks = document.querySelectorAll(".nav-sidebar__link");
const refLinks = document.querySelectorAll(".ref-link");
const statisticalRefsSection = document.getElementById(
  "statistical-references",
);

function highlightActiveSection() {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  if (statisticalRefsSection) {
    const statsTop = statisticalRefsSection.offsetTop - 100;
    if (window.scrollY >= statsTop - statisticalRefsSection.clientHeight / 3) {
      current = "statistical-references";
    }
  }

  // Update URL hash without triggering scroll
  if (current && window.location.hash !== `#${current}`) {
    history.replaceState(null, null, `#${current}`);
  }

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

let scrollTimeout;
window.addEventListener("scroll", () => {
  if (scrollTimeout) {
    window.cancelAnimationFrame(scrollTimeout);
  }
  scrollTimeout = window.requestAnimationFrame(() => {
    highlightActiveSection();
  });
});

highlightActiveSection();
