const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#navigation');
function closeNav() { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
toggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeNav(); toggle.focus(); } });
matchMedia('(min-width: 801px)').addEventListener('change', closeNav);
function wireDialog(dialog) {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); } });
}
const privacy = document.querySelector('#privatumas');
wireDialog(privacy);
document.querySelector('#privacy-open').addEventListener('click', event => { event.preventDefault(); privacy.showModal(); });
document.querySelector('#year').textContent = new Date().getFullYear();
const form = document.querySelector('#contactForm');
document.querySelectorAll('[data-inquiry]').forEach(button => button.addEventListener('click', () => {
  const value = button.dataset.inquiry;
  const option = Array.from(form.elements.topic.options).find(item => item.textContent === value);
  form.elements.topic.value = option ? option.value : 'Kompiuterio priežiūra';
  document.querySelector('#kontaktai').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  form.elements.message.focus({ preventScroll: true });
}));
const inquiry = document.querySelector('#inquiry-dialog');
wireDialog(inquiry);
inquiry.querySelector('.dialog-back').addEventListener('click', () => inquiry.close());
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const summary = document.querySelector('#inquiry-summary');
  summary.replaceChildren();
  for (const [key, label] of [['name', 'Vardas'], ['email', 'El. paštas'], ['topic', 'Tema'], ['message', 'Aprašymas']]) {
    const term = document.createElement('dt'); term.textContent = label;
    const value = document.createElement('dd'); value.textContent = form.elements[key].value.trim();
    summary.append(term, value);
  }
  document.querySelector('#formStatus').textContent = 'Peržiūra paruošta. Užklausa neišsiųsta.';
  const subject = 'LBitas užklausa: ' + form.elements.topic.value;
  const body = 'Vardas: ' + form.elements.name.value.trim() + '\nEl. paštas: ' + form.elements.email.value.trim() + '\n\n' + form.elements.message.value.trim();
  document.querySelector('#email-draft').href = 'mailto:LBitasx@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  inquiry.showModal();
});
