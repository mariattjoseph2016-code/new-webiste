document.addEventListener('DOMContentLoaded',function(){
  // set current year
  const year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();

  // menu toggle for small screens
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if(toggle && nav){
    toggle.addEventListener('click',()=>{
      nav.classList.toggle('open');
    });
  }

  // simple contact form handler
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const name = form.name.value || 'Friend';
      alert(`Thanks, ${name}! This demo form does not send messages.`);
      form.reset();
    });
  }
});
