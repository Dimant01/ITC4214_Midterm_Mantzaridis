/*Script containing dark mode functionality and button*/
document.addEventListener('DOMContentLoaded', () => {
    
    const toggle = document.querySelector('#dark-mode-toggle'); // select the dark mode button
    const body = document.querySelector('body');                // select the body element

    //Load saved preference from localStorage
    const darkModeEnabled = localStorage.getItem('darkMode') === 'enabled';
    if (darkModeEnabled) {
        body.classList.add('dark-mode');
        toggle.textContent = '☀ Light Mode';
    } else {
        toggle.textContent = '🌙 Dark Mode';
    }

    //Handle dark mode toggle click
    toggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');

        toggle.textContent = isDark ? '☀ Light Mode' : '🌙 Dark Mode';
    });
});
