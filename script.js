/*Script containing dark mode functionality and button*/
document.addEventListener('DOMContentLoaded', () => {
    
    const toggle = document.querySelector('#dark-mode-toggle'); // select the dark mode button
    const body = document.querySelector('body');                // select the body element

    //Load saved preference from localStorage
    const darkModeEnabled = localStorage.getItem('darkMode') === 'enabled';
    if (darkModeEnabled) {
        body.classList.add('dark-mode');
        toggle.checked = true; // mark checkbox as on
    } 

    // Handle toggle change
    toggle.addEventListener('change', () => {
        body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
    });
});
