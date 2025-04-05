// Animation Utilities
document.addEventListener('DOMContentLoaded', function() {
  // Animate elements when they come into view
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.classList.add('animated');
      }
    });
  };
  
  // Initial check
  animateOnScroll();
  
  // Check on scroll
  window.addEventListener('scroll', animateOnScroll);
  
  // Add hover effects to buttons
  const buttons = document.querySelectorAll('.btn, .nav-link, .social-icon');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
  
  // Add ripple effect to buttons
  const rippleButtons = document.querySelectorAll('.btn-ripple');
  rippleButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;
      
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

// GSAP animations (if GSAP is loaded)
if (typeof gsap !== 'undefined') {
  gsap.registerEffect({
    name: "fadeIn",
    effect: (targets, config) => {
      return gsap.from(targets, {
        opacity: 0,
        duration: config.duration,
        ease: "power2.out"
      });
    },
    defaults: { duration: 1 }
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    gsap.effects.fadeIn(".header", { duration: 1.2 });
    gsap.effects.fadeIn(".navigation", { duration: 1, delay: 0.3 });
  });
}
