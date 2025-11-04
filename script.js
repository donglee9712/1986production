const navPill = document.querySelector('.nav-pill');
const navLinks = document.querySelectorAll('.nav-pill__link');
const indicator = document.querySelector('.nav-pill__indicator');

const moveIndicator = (target) => {
  if (!navPill || !indicator || !target) return;

  const targetRect = target.getBoundingClientRect();
  const parentRect = navPill.getBoundingClientRect();
  const offsetX = targetRect.left - parentRect.left;

  indicator.style.setProperty('--indicator-width', `${targetRect.width}px`);
  indicator.style.setProperty('--indicator-x', `${offsetX}px`);
  indicator.style.setProperty('--indicator-opacity', '1');
};

const setActiveLink = (link) => {
  navLinks.forEach((other) => other.classList.remove('is-active'));
  link.classList.add('is-active');
  moveIndicator(link);
};

if (navLinks.length) {
  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      setActiveLink(link);
    });
  });

  const initiallyActive = document.querySelector('.nav-pill__link.is-active') || navLinks[0];
  setActiveLink(initiallyActive);

  window.addEventListener('resize', () => {
    const currentActive = document.querySelector('.nav-pill__link.is-active');
    if (currentActive) {
      moveIndicator(currentActive);
    }
  });
}
