function startCounter(el) {
  if (el.dataset.animated === "true") return;
  el.dataset.animated = "true";

  const target = Number(el.dataset.target || 0);
  const duration = Number(el.dataset.duration || 2000);
  const start = performance.now();

  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const value = Math.floor(p * target);
    el.textContent = value;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function startCountersIn(container) {
  container.querySelectorAll(".counter").forEach(startCounter);
}

document.addEventListener("DOMContentLoaded", () => {
  const stats = document.getElementById("stats");
  if (!stats) return;

  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCountersIn(stats);
          io.unobserve(stats);
        }
      });
    },
    { threshold: 0.25 }
  );

  io.observe(stats);

  const r = stats.getBoundingClientRect();
  if (r.top < window.innerHeight && r.bottom > 0) {
    startCountersIn(stats);
    io.unobserve(stats);
  }
});

document.addEventListener("aos:in", e => {
  if (e.detail && (e.detail.id === "stats" || e.detail.querySelector?.(".counter"))) {
    const container = e.detail.id === "stats" ? e.detail : document.getElementById("stats");
    if (container) startCountersIn(container);
  }
});