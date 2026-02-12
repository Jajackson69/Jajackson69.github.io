// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
  
  // ===== SCROLL ANIMATIONS =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Animation supplémentaire pour les cartes
        if (entry.target.classList.contains('project-card') || entry.target.classList.contains('exp-card')) {
          entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
        }
      }
    });
  }, observerOptions);

  // Observe all
  document.querySelectorAll('.fade-in-section, .project-card, .exp-card, .category').forEach(element => {
    observer.observe(element);
  });

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile window if open
        if (window.innerWidth <= 768) {
          const mobileMenu = document.querySelector('.mobile-menu');
          if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
          }
        }
      }
    });
  });

  // ===== PARALLAX EFFECT =====
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const particles = document.querySelector('.particles-background');
    if (particles) {
      particles.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    // Sections animations on scroll
    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight * 0.75) {
        section.classList.add('visible');
      }
    });
  });

  // ===== FORM SUBMISSION =====
  const contactForm = document.getElementById('messageForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get formular values
      const name = this.querySelector('input[type="text"]').value;
      const email = this.querySelector('input[type="email"]').value;
      const message = this.querySelector('textarea').value;
      
      // Animation
      const submitBtn = this.querySelector('.submit-btn');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      //SEND
      setTimeout(() => {
        // Success
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
          <i class="fas fa-check-circle"></i>
          <div>
            <h4>Message Sent!</h4>
            <p>Thank you ${name}, I'll get back to you soon.</p>
          </div>
        `;
        successMessage.style.cssText = `
          background: rgba(79, 70, 229, 0.1);
          border: 1px solid rgba(79, 70, 229, 0.3);
          border-radius: 12px;
          padding: 20px;
          margin-top: 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          animation: fade-in 0.5s ease;
        `;
        
        // Replace formular by this message
        contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
        contactForm.style.display = 'none';
        
        // 5SECS
        setTimeout(() => {
          contactForm.reset();
          contactForm.style.display = 'flex';
          successMessage.remove();
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 5000);
      }, 1500);
    });
  }

  // ===== ANIMATION OF SKILLS =====
  const skillTags = document.querySelectorAll('.skill-tag');
  skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // ===== BACK TO TOP =====
  const backToTopBtn = document.querySelector('.footer-links a');
  if (backToTopBtn && backToTopBtn.textContent.includes('Back to Top')) {
    backToTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ===== BUTTONS ANIMATIONS =====
  const buttons = document.querySelectorAll('a, button');
  buttons.forEach(button => {
    button.addEventListener('mousedown', function() {
      this.style.transform = 'scale(0.95)';
    });
    
    button.addEventListener('mouseup', function() {
      this.style.transform = '';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });

  // ===== CARDS HOVER ANIMATION =====
  const cards = document.querySelectorAll('.project-card, .exp-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateY = (x - centerX) / 25;
      const rotateX = (centerY - y) / 25;
      
      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // ===== GESTION DU RESPONSIVE =====
  function handleResponsive() {
    // Adjust animation on mobile
    const experienceTrack = document.querySelector('.experience-track');
    if (experienceTrack && window.innerWidth <= 576) {
      experienceTrack.style.animationDuration = '60s';
    } else if (experienceTrack) {
      experienceTrack.style.animationDuration = '40s';
    }
  }

  // Initialise resize & listen to it
  handleResponsive();
  window.addEventListener('resize', handleResponsive);

  // ===== INITIALISATION =====
  console.log('Portfolio loaded successfully!');
});