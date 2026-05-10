const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const terminalForm = document.querySelector("#terminalForm");
const terminalInput = document.querySelector("#terminalInput");
const terminalOutput = document.querySelector("#terminalOutput");
const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");

const terminalReplies = {
  help: "Komandos: mission, archive, status, clear.",
  mission: "Misija paruošta: sukurk vieną kortelę, pridėk stilių ir patikrink mobilų vaizdą.",
  archive: "Archyvas atidarytas: web startas, kodo logika, saugumo bazė.",
  status: "Sistema aktyvi. Signalas stabilus. Mokymosi režimas įjungtas."
};

function addTerminalLine(author, text) {
  const line = document.createElement("p");
  const label = document.createElement("span");

  label.textContent = author;
  line.append(label, ` ${text}`);
  terminalOutput.appendChild(line);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

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

terminalForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const command = terminalInput.value.trim().toLowerCase();
  if (!command) return;

  addTerminalLine("tu", command);
  terminalInput.value = "";

  if (command === "clear") {
    terminalOutput.innerHTML = "";
    addTerminalLine("system", "Ekranas išvalytas. Įvesk help, jei reikia komandų.");
    return;
  }

  addTerminalLine("system", terminalReplies[command] || "Komanda neatpažinta. Įvesk help.");
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(contactForm);
  const name = data.get("name").toString().trim();

  formStatus.textContent = `${name}, žinutė paruošta. Prijungus serverį ji būtų išsiųsta.`;
  contactForm.reset();
});
