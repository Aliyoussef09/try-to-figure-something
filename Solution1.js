// Helper function to check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}

document.addEventListener('DOMContentLoaded', () => {
  const headingLines = document.querySelectorAll('.headings h1');
  const description = document.querySelector('.description');
  const features = document.querySelectorAll('.features-list li');
  const closingLine = document.querySelector('.closing-line');
  const verticalLine = document.querySelector('.vertical-line');

  let headingAnimated = false;
  let descriptionAnimated = false;
  let featuresAnimated = false;
  let closingAnimated = false;

  function animateHeading() {
    headingLines.forEach((line, index) => {
      line.style.animation = `slideUpFadeIn 0.8s ease forwards`;
      line.style.animationDelay = `${index * 0.2}s`;
    });
  }

  function animateDescription() {
    description.style.animation = 'fadeInRight 1s ease forwards';
  }

  function animateFeatures() {
    features.forEach((feature, index) => {
      feature.style.animation = `fadeInLeft 0.8s ease forwards`;
      feature.style.animationDelay = `${index * 0.3}s`;
    });
  }

  function animateClosingLine() {
    closingLine.style.animation = 'zoomInFade 0.7s ease forwards';
  }

  function animateVerticalLineOnScroll() {
    // Extend vertical line height based on scroll progress within the section
    const section = document.querySelector('.smart-home-section');
    const sectionRect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    if (sectionRect.top < windowHeight && sectionRect.bottom > 0) {
      const visibleHeight = Math.min(windowHeight, sectionRect.bottom) - Math.max(0, sectionRect.top);
      const totalHeight = sectionRect.height;
      const progress = visibleHeight / totalHeight;
      const minHeight = 72; // base height in px
      const maxHeight = totalHeight;
      const newHeight = minHeight + (maxHeight - minHeight) * progress;
      verticalLine.style.height = `${newHeight}px`;
    }
  }

  function onScroll() {
    if (!headingAnimated) {
      if (isInViewport(headingLines[0])) {
        animateHeading();
        headingAnimated = true;
      }
    }
    if (!descriptionAnimated) {
      if (isInViewport(description)) {
        animateDescription();
        descriptionAnimated = true;
      }
    }
    if (!featuresAnimated) {
      if (isInViewport(features[0])) {
        animateFeatures();
        featuresAnimated = true;
      }
    }
    if (!closingAnimated) {
      if (isInViewport(closingLine)) {
        animateClosingLine();
        closingAnimated = true;
      }
    }
    animateVerticalLineOnScroll();
  }

  window.addEventListener('scroll', onScroll);
  // Trigger animation check on load
  onScroll();
});
