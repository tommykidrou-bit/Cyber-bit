const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(contactForm);
    const name = data.get("name").toString().trim();
    const topic = data.get("topic").toString().trim();

    formStatus.textContent = `${name}, uzklausa apie "${topic}" paruosta. Prijungus forma ji butu issiusta.`;
    contactForm.reset();
  });
}
