document.addEventListener('DOMContentLoaded', () => {
  // Hamburger menu toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true' || false;
    hamburger.setAttribute('aria-expanded', !expanded);
    navLinks.classList.toggle('active');
  });

  // Scroll-triggered animations
  const fadeElements = document.querySelectorAll('.fact-paragraph, .info-paragraph, .tagline');

  const scrollHandler = () => {
    fadeElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add('fade-in-up');
      }
    });
  };

  window.addEventListener('scroll', scrollHandler);
  scrollHandler(); // Trigger on load in case elements are in view

  // Parallax effect on background
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    document.body.style.backgroundPosition = `center ${scrollY * 0.3}px`;
  });

  // Typing animation for main headline with orange color on "IS A SILENT POLLUTER"
  const mainHeadline = document.getElementById('main-headline');
  const fullText = mainHeadline.getAttribute('data-text');
  mainHeadline.innerHTML = ''; // Clear existing content

  const phraseToHighlight = "IS A SILENT POLLUTER";
  const typingSpeed = 100; // milliseconds per character

  let currentIndex = 0;
  let currentCharIndex = 0;
  let isHighlighting = false;
  let highlightSpan = null;

  function type() {
    if (currentIndex < fullText.length) {
      const currentChar = fullText.charAt(currentIndex);

      // Check if we are at the start of the phrase to highlight
      if (!isHighlighting && fullText.substring(currentIndex).startsWith(phraseToHighlight)) {
        isHighlighting = true;
        highlightSpan = document.createElement('span');
        highlightSpan.className = 'orange-highlight glow';
        mainHeadline.appendChild(highlightSpan);
      }

      if (isHighlighting) {
        highlightSpan.textContent += currentChar;
        currentCharIndex++;
        if (currentCharIndex === phraseToHighlight.length) {
          // Stop glowing for 3 seconds after typing the phrase
          highlightSpan.classList.remove('glow');
          setTimeout(() => {
            highlightSpan.classList.add('glow');
          }, 3000);
          isHighlighting = false;
          highlightSpan = null;
          currentCharIndex = 0;
          // Make sure main headline is fully visible after typing
          mainHeadline.style.opacity = '1';
          // Animate subheadline fade-in after typing completes
          gsap.to('#subheadline', {opacity: 1, y: 0, duration: 1, ease: "power1.out"});
        }
      } else {
        // Append currentChar as a text node to preserve spaces
        if (currentChar === ' ') {
          mainHeadline.appendChild(document.createTextNode('\u00A0'));
        } else {
          mainHeadline.appendChild(document.createTextNode(currentChar));
        }
      }

      currentIndex++;
      setTimeout(type, typingSpeed);
    }
  }

  type();
});
