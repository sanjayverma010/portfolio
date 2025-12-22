// src/utils/scrollUtils.js
export const initScrollAnimations = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.feature-card, .project-card').forEach(card => {
    observer.observe(card);
  });
};

export const typewriterEffect = (element, text, speed = 100) => {
  let i = 0;
  element.textContent = '';
  
  const typeInterval = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typeInterval);
    }
  }, speed);
};

export const initFloatingIcons = () => {
  const icons = document.querySelectorAll('.floating-icon');
  icons.forEach((icon, index) => {
    icon.style.animationDelay = `${index * 1.5}s`;
  });
};

export const smoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
};