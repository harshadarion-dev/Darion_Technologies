document.addEventListener('DOMContentLoaded', () => {
    // Select the hamburger button and the navigation menu
    const hamburger = document.querySelector('.ibm-masthead-hamburger');
    const nav = document.querySelector('.ibm-masthead-nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('is-open');
        });
    }

    // Optional: close menu if a user clicks outside the header
    document.addEventListener('click', (event) => {
        const header = document.querySelector('.ibm-masthead');
        if (nav && nav.classList.contains('is-open') && !header.contains(event.target)) {
            nav.classList.remove('is-open');
        }
    });
});
