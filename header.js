// header.js: stores the header HTML and injects it
const headerHTML = `
<header class="site-header">
    <div class="header-container">
        <div class="logo-title">
            <img src="images/logo.png" alt="Logo" class="logo">
            <span class="site-title">The Rolling Scones</span>
        </div>

        <!-- Hamburger button -->
        <button class="menu-toggle">☰</button>

        <!-- Navigation -->
        <nav class="nav-links">
            <a href="index.html">Home</a>
            <a href="tasks.html">Tasks</a>
            <a href="about.html">About</a>
            <a href="contact.html">Contact</a>
            <a href="faq.html">FAQ</a>
        </nav>
    </div>
</header>
`;

document.addEventListener('DOMContentLoaded', () => {
    const placeholder = document.querySelector('#header-placeholder');
    if (placeholder) {
        placeholder.innerHTML = headerHTML;

        // Highlight active link
        const links = placeholder.querySelectorAll('.nav-links a');
        links.forEach(link => {
            // Compare just the filename to avoid full URL mismatches
            if (link.getAttribute('href') === window.location.pathname.split('/').pop()) {
                link.classList.add('active');
            }
        });
    }
    const menuToggle = placeholder.querySelector('.menu-toggle');
    const navLinks = placeholder.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    });
    
});