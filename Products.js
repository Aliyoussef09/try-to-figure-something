// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card');

    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // Animate cards on scroll
    function animateOnScroll() {
        productCards.forEach(card => {
            if (isInViewport(card)) {
                card.classList.add('visible');
            }
        });
    }

    // Initial check
    animateOnScroll();

    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);
});
