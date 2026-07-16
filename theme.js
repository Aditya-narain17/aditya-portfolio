(function () {
  var root = document.documentElement;
  var STORAGE_KEY = "theme";

  function applyStoredTheme() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "dark" || stored === "light") {
      root.setAttribute("data-theme", stored);
    }
  }

  function currentTheme() {
    var explicit = root.getAttribute("data-theme");
    if (explicit) return explicit;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function updateToggleLabel(btn) {
    var theme = currentTheme();
    var icon = btn.querySelector(".icon");
    var label = btn.querySelector(".label");
    if (theme === "dark") {
      icon.textContent = "☀️";
      label.textContent = "Light mode";
      btn.setAttribute("aria-pressed", "true");
    } else {
      icon.textContent = "🌙";
      label.textContent = "Dark mode";
      btn.setAttribute("aria-pressed", "false");
    }
  }

  applyStoredTheme();

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;

    updateToggleLabel(btn);

    btn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem(STORAGE_KEY, next);
      updateToggleLabel(btn);
    });
  });
})();