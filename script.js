// Progress Bars Animation
function animateProgressBars() {
  const progressBars = document.querySelectorAll(".progress-fill");

  if (progressBars.length === 0) return;

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

  progressBars.forEach((bar) => {
    observer.observe(bar);
  });
}

document.addEventListener("DOMContentLoaded", animateProgressBars);

// DARK MODE TOGGLE
function initDarkMode() {
  const btn = document.getElementById("theme-toggle-btn");
  const icon = btn.querySelector(".theme-icon");
  const text = btn.querySelector(".theme-text");

  // Always start in light mode — no saved preference check

  // Toggle on click
  btn.addEventListener("click", function () {
    const isDark = document.body.classList.toggle("dark-mode");

    if (isDark) {
      icon.textContent = "☀️";
      text.textContent = "Light Mode";
    } else {
      icon.textContent = "🌙";
      text.textContent = "Dark Mode";
    }
  });
}

document.addEventListener("DOMContentLoaded", initDarkMode);

// HAMBURGER MENU
function initHamburger() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  if (!hamburger || !navLinks) return;

  hamburger.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    hamburger.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", isOpen);
  });

  // Close menu when a nav link is clicked
  navLinks.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove("open");
      hamburger.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });
}

document.addEventListener("DOMContentLoaded", initHamburger);

// SCROLL ANIMATIONS
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    "main section, .card, .page-link",
  );

  if (animatedElements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(element);
  });
}

document.addEventListener("DOMContentLoaded", initScrollAnimations);
