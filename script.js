// ==================== LOADING OVERLAY ====================
function hideLoadingOverlay() {
  const overlay = document.getElementById("loading-overlay");
  if (overlay) {
    overlay.classList.add("hidden");
    // Optional: remove from DOM after transition to free memory
    setTimeout(() => overlay.remove(), 600);
  }
}
// Hide after everything (images, styles, etc.) is fully loaded
window.addEventListener("load", hideLoadingOverlay);
// Fallback: hide after 3 seconds max, in case something hangs
setTimeout(hideLoadingOverlay, 3000);

// ==================== PROGRESS BARS (skills page) ====================
function animateProgressBars() {
  const progressBars = document.querySelectorAll(".progress-fill");
  if (!progressBars.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute("data-width") || "0";
          entry.target.style.width = width + "%";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  progressBars.forEach((bar) => observer.observe(bar));
}
document.addEventListener("DOMContentLoaded", animateProgressBars);

// ==================== DARK MODE (with localStorage) ====================
function initDarkMode() {
  const btn = document.getElementById("theme-toggle-btn");
  if (!btn) return;
  const icon = btn.querySelector(".theme-icon");
  const text = btn.querySelector(".theme-text");

  // Load saved preference (default to light)
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    icon.textContent = "☀️";
    text.textContent = "Light Mode";
  } else {
    icon.textContent = "🌙";
    text.textContent = "Dark Mode";
  }

  btn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    icon.textContent = isDark ? "☀️" : "🌙";
    text.textContent = isDark ? "Light Mode" : "Dark Mode";
  });
}
document.addEventListener("DOMContentLoaded", initDarkMode);

// ==================== HAMBURGER MENU (mobile) ====================
function initHamburger() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  if (!hamburger || !navLinks) return;

  function closeMenu() {
    navLinks.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  }

  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    hamburger.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", isOpen);
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      closeMenu();
    }
  });
}
document.addEventListener("DOMContentLoaded", initHamburger);

// ==================== SMOOTH SCROLL ANIMATIONS (using CSS classes) ====================
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    "main section, .card, .page-link, .project-card, .timeline-item-current, .skill-item",
  );
  if (!animatedElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // Optional: unobserve after animation to save resources
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -20px 0px" },
  ); // trigger slightly before element enters

  animatedElements.forEach((el) => {
    el.classList.add("fade-up"); // base class (we'll define in CSS)
    observer.observe(el);
  });
}
document.addEventListener("DOMContentLoaded", initScrollAnimations);
