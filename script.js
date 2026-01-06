document.addEventListener('DOMContentLoaded',function(){
  const nav=document.getElementById('nav');
  const toggle=document.getElementById('navToggle');
  toggle.addEventListener('click',()=>nav.classList.toggle('open'));

  // Close mobile nav when a link is clicked
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',function(e){
      const href=this.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        const el=document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
      }
    });
  });

  // Navbar active state: mark clicked nav link as active (black)
  const navLinks = document.querySelectorAll('.nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Set active link from hash on load / hash change
  const setActiveFromHash = () => {
    const hash = window.location.hash || '#projects';
    navLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === hash);
    });
  };
  setActiveFromHash();
  window.addEventListener('hashchange', setActiveFromHash);

  // Simple contact form handler
  const form=document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const data=new FormData(form);
      const name=data.get('name');
      const email=data.get('email');
      // Basic feedback - replace with backend integration when available
      alert(`Thanks ${name}! I will reply to ${email} soon.`);
      form.reset();
    });
  }

  // Get In Touch button: reveal and copy email
  const getBtn = document.getElementById('getInTouch');
  const emailEl = document.getElementById('emailReveal');
  if(getBtn && emailEl){
    getBtn.addEventListener('click', async (e) => {
      const email = emailEl.getAttribute('data-email') || emailEl.textContent.trim();
      // reveal the email visually
      emailEl.classList.add('visible');
      // copy to clipboard if available
      try{
        if(navigator.clipboard && navigator.clipboard.writeText){
          await navigator.clipboard.writeText(email);
        } else {
          const ta = document.createElement('textarea');
          ta.value = email;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }
        // show copied state on button
        getBtn.classList.add('copied');
        const orig = getBtn.innerHTML;
        getBtn.innerHTML = 'Copied ✓';
        setTimeout(()=>{
          getBtn.classList.remove('copied');
          getBtn.innerHTML = orig;
        },2000);
      }catch(err){
        console.error('copy failed', err);
      }
    });
  }
});
