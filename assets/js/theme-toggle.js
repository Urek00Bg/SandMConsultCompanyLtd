const htmlEl = document.documentElement;
const toggleBtn = document.getElementById("theme-toggle");
const toggleIcon = toggleBtn?.querySelector("i");

// Load saved theme
if (toggleBtn && localStorage.getItem("theme")) {
  const savedTheme = localStorage.getItem("theme");
  htmlEl.setAttribute("data-bs-theme", savedTheme);
  toggleIcon.className = savedTheme === "dark" ? "bi bi-sun-fill" : "bi bi-moon-stars";
}

// Toggle theme on click
toggleBtn?.addEventListener("click", () => {
  const currentTheme = htmlEl.getAttribute("data-bs-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  htmlEl.setAttribute("data-bs-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  // Update icon only
  toggleIcon.className = newTheme === "dark" ? "bi bi-sun-fill" : "bi bi-moon-stars";
});