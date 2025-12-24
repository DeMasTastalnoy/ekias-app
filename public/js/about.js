// Простая анимация элементов таймлайна при появлении в зоне видимости
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('[data-timeline] .timeline-item');

  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('show'));
    return;
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('show');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(el => obs.observe(el));
});
