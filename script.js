// Smooth internal scrolling
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if(!href || href === '#') return;
    e.preventDefault();
    const el = document.querySelector(href);
    if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
    // close mobile nav if open
    const nav = document.getElementById('nav');
    if(nav.classList.contains('show')){
      nav.classList.remove('show');
      document.getElementById('nav-toggle').setAttribute('aria-expanded','false');
    }
  });
});

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const nav = document.getElementById('nav');
navToggle.addEventListener('click', ()=>{
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('show');
});

// Dark mode toggle with persistence
const darkToggle = document.getElementById('dark-toggle');
const root = document.documentElement;
function applyTheme(dark){
  if(dark) root.classList.add('dark'); else root.classList.remove('dark');
  darkToggle.setAttribute('aria-pressed', String(dark));
}
const saved = localStorage.getItem('theme-dark');
applyTheme(saved === 'true');

darkToggle.addEventListener('click', ()=>{
  const now = root.classList.toggle('dark');
  localStorage.setItem('theme-dark', now);
  darkToggle.setAttribute('aria-pressed', String(now));
});

// set current year
document.getElementById('year').textContent = new Date().getFullYear();

// Animate skill bars when visible
const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.querySelectorAll('.bar-fill').forEach(el=>{
        const w = el.style.width || '0%';
        el.style.width = w; // trigger transition (width already set)
      });
      observer.unobserve(entry.target);
    }
  });
},{threshold:0.25});
document.querySelectorAll('.skills-grid .skill').forEach(s=>observer.observe(s));