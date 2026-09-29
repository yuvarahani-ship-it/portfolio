document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      document.getElementById('mainMenu').classList.remove('open');
    }
  });
});

// Contact form: opens the visitor's email client with the message pre-filled.
// (This is a static site with no backend, so this is the simplest way for
// messages to actually reach you without setting up a server or a form service.)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cf-name').value;
    const email = document.getElementById('cf-email').value;
    const message = document.getElementById('cf-message').value;
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);
    window.location.href = `mailto:yuvarahani@gmail.com?subject=${subject}&body=${body}`;
  });
}


// ---------- Certificates ----------
// Photos are in the main folder: certificate1.jpeg, certificate2.jpeg ...
// Card order = photo number. Cards with no photo just show the text.
const certificates = [
  { title: "2nd Prize — Fiestaa '26",   sub: "KPR College Hackathon",                    type: "Achievement" },
  { title: "NPTEL — IoT",               sub: "Internet of Things",                       type: "Certification" },
  { title: "NPTEL — Data Analytics",    sub: "Data Analytics with Python",               type: "Certification" },
  { title: "Industrial Visit",          sub: "KGISL Microcollege — Networking Training", type: "Industrial Visit" },
  { title: "Japanese — N4 Level",       sub: "Japanese language course",                 type: "Language" }
];

const certsBox = document.getElementById('certsScroll');
if (certsBox) {
  const exts = ['jpeg', 'jpg', 'png', 'JPG', 'JPEG', 'PNG'];
  certificates.forEach((c, i) => {
    const n = i + 1;
    const num = String(n).padStart(2, '0');
    const card = document.createElement('div');
    card.className = 'cert-card';
    card.innerHTML = `
      <img alt="Certificate ${n}">
      <div class="cert-card-body">
        <p class="num">${num} · ${c.type}</p>
        <h4>${c.title}</h4>
        <p>${c.sub}</p>
      </div>`;
    const img = card.querySelector('img');
    let k = 0;
    img.onerror = () => {
      k++;
      if (k < exts.length) {
        img.src = `certificate${n}.${exts[k]}`;
      } else {
        img.style.display = 'none';
      }
    };
    img.src = `certificate${n}.${exts[0]}`;
    certsBox.appendChild(card);
  });
}