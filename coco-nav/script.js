const navButtons = Array.from(
  document.querySelectorAll(".nav-item[data-target]")
);
const sections = Array.from(document.querySelectorAll("main section"));
const progressCircle = document.querySelector(".progress .indicator");
const circleLength = progressCircle?.getTotalLength?.() ?? 314;

if (progressCircle) {
  progressCircle.style.strokeDasharray = circleLength;
  progressCircle.style.strokeDashoffset = circleLength;
}

const setActiveNav = (targetId) => {
  navButtons.forEach((button) => {
    const matches = button.dataset.target === `#${targetId}`;
    button.classList.toggle("is-active", matches);
    button.setAttribute("aria-current", matches ? "true" : "false");
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        entry.target.classList.add("is-visible");
        setActiveNav(sectionId);
        if (progressCircle) {
          const progressValue = parseFloat(entry.target.dataset.progress ?? "0");
          const offset = circleLength - circleLength * progressValue;
          progressCircle.style.strokeDashoffset = offset;
        }
      } else {
        entry.target.classList.remove("is-visible");
      }
    });
  },
  {
    threshold: 0.6,
  }
);

sections.forEach((section) => observer.observe(section));

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetSection = document.querySelector(button.dataset.target);
    targetSection?.scrollIntoView({ behavior: "smooth" });
  });
});

window.addEventListener("scroll", () => {
  if (!progressCircle) return;
  const scrollTop = window.scrollY;
  const scrollHeight = document.body.scrollHeight - innerHeight;
  const progress = scrollHeight ? Math.min(scrollTop / scrollHeight, 1) : 0;
  progressCircle.style.strokeDashoffset =
    circleLength - circleLength * progress;
});
