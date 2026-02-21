// footer.js: stores footer HTML and injects it
const footerHTML = `
<footer class="site-footer">
    <div class="footer-container">
        <!-- Logo and App Name -->
        <div class="footer-logo">
            <img src="Images/Logo.png" alt="Logo" class="logo">
            <span class="footer-title">The Rolling Scones</span>
        </div>

        <!-- Contact Info -->
        <div class="footer-contact">
            <p>© ${new Date().getFullYear()} The Rolling Scones. All rights reserved.</p>
            <p>Email: <a href="mailto:info@therollingscones.com">info@therollingscones.com</a></p>
            <p>
                Follow us: 
                <a href="https://www.facebook.com/therollingscones" target="_blank">Facebook</a> | 
                <a href="https://www.instagram.com/therollingscones" target="_blank">Instagram</a> | 
                <a href="https://twitter.com/therollingscones" target="_blank">Twitter</a>
            </p>
        </div>
    </div>
</footer>
`;

document.addEventListener('DOMContentLoaded', () => {
    const placeholder = document.querySelector('#footer-placeholder');
    if (placeholder) placeholder.innerHTML = footerHTML;
});