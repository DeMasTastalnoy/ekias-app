document.addEventListener('click', (e) => {
  const link = e.target.closest('.report-open');
  if (!link) return;

  e.preventDefault();
  console.log('[REPORT OPEN]', link.dataset.report);
  // позже тут будет переход на BI / или открытие отчета
});
