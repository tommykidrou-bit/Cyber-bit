const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('nav');
function closeNav() { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
toggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeNav(); });
const privacy = document.querySelector('#privatumas');
document.querySelector('#privacy-open').addEventListener('click', event => { event.preventDefault(); privacy.showModal(); });
privacy.querySelector('button').addEventListener('click', () => privacy.close());
privacy.addEventListener('click', event => { if (event.target === privacy) privacy.close(); });
document.querySelector('#year').textContent = new Date().getFullYear();
