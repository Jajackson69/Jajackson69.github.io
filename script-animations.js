// Animations supplémentaires
document.addEventListener('DOMContentLoaded', function() {
  
  // Animation du gradient hero
  const hero = document.querySelector('.hero');
  let hue = 0;
  
  function updateGradient() {
    hue = (hue + 0.5) % 360;
    hero.style.background = `
      linear-gradient(
        -45deg, 
        hsla(${hue}, 70%, 60%, 0.95), 
        hsla(${(hue + 60) % 360}, 70%, 60%, 0.95), 
        hsla(${(hue + 120) % 360}, 70%, 60%, 0.95), 
        hsla(${(hue + 180) % 360}, 70%, 60%, 0.95)
      )
    `;
    requestAnimationFrame(updateGradient);
  }
  
  // Démarrer l'animation (optionnel - peut être intensif)
  // updateGradient();
  
  // Effet de particules interactives
  const particlesContainer = document.querySelector('.particles-background');
  
  function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 5 + 2}px;
      height: ${Math.random() * 5 + 2}px;
      background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
      border-radius: 50%;
      pointer-events: none;
      left: ${x}px;
      top: ${y}px;
      z-index: 1;
    `;
    
    particlesContainer.appendChild(particle);
    
    // Animation
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 2 + 1;
    const distance = Math.random() * 100 + 50;
    
    let currentX = 0;
    let currentY = 0;
    let opacity = 1;
    
    function animate() {
      currentX += Math.cos(angle) * speed;
      currentY += Math.sin(angle) * speed;
      opacity -= 0.02;
      
      particle.style.transform = `translate(${currentX}px, ${currentY}px)`;
      particle.style.opacity = opacity;
      
      if (opacity > 0 && 
          Math.abs(currentX) < distance && 
          Math.abs(currentY) < distance) {
        requestAnimationFrame(animate);
      } else {
        particle.remove();
      }
    }
    
    animate();
  }
  
  // Créer des particules au survol
  document.addEventListener('mousemove', function(e) {
    if (Math.random() > 0.7) { // 30% de chance
      createParticle(e.clientX, e.clientY);
    }
  });
  
  // Effet de scroll progressif
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #4f46e5, #6366f1);
    z-index: 9999;
    transition: width 0.1s;
  `;
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + "%";
  });
});