// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card');
  const images = document.querySelectorAll('.card-image');
  const navbar = document.getElementById('navbar');
  const loadingSpinner = document.getElementById('loading-spinner');
  const navLinks = document.querySelectorAll('.nav-links li a');
  const buttons = document.querySelectorAll('.see-products-btn');

  // Intersection Observer for fade-in and slide-up animation
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const delay = card.getAttribute('data-aos-delay') || 0;
        setTimeout(() => {
          card.classList.add('animate');
        }, delay);
        observer.unobserve(card);
      }
    });
  }, observerOptions);

  cards.forEach(card => {
    observer.observe(card);
  });

  // Parallax effect on card images
  window.addEventListener('scroll', () => {
    images.forEach(image => {
      const rect = image.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate parallax offset (max 15px)
        const offset = (windowHeight - rect.top) / windowHeight * 15;
        image.style.transform = `translateY(${offset}px) scale(1.05)`;
      } else {
        image.style.transform = 'translateY(0) scale(1)';
      }
    });

    // Navbar background and shadow toggle on scroll
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Navbar link underline animation on hover (handled by CSS)

  // Button hover and ripple effect
  buttons.forEach(button => {
    button.addEventListener('click', e => {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      button.appendChild(ripple);

      const maxDim = Math.max(button.clientWidth, button.clientHeight);
      ripple.style.width = ripple.style.height = maxDim + 'px';

      const rect = button.getBoundingClientRect();
      ripple.style.left = e.clientX - rect.left - maxDim / 2 + 'px';
      ripple.style.top = e.clientY - rect.top - maxDim / 2 + 'px';

      ripple.addEventListener('animationend', () => {
        ripple.remove();
      });
    });
  });

  // Loading spinner fade out on window load
  window.addEventListener('load', () => {
    if (loadingSpinner) {
      loadingSpinner.classList.add('hidden');
      setTimeout(() => {
        loadingSpinner.style.display = 'none';
      }, 500);
    }
  });
});
