document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#contact-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.querySelector('#name').value.trim();
        const email = document.querySelector('#email').value.trim();
        const subject = document.querySelector('#subject').value.trim();
        const message = document.querySelector('#message').value.trim();

        if (!name || !email || !subject || !message) {
            alert("Please fill in all fields.");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        alert(
            `Thank you for contacting us!\n\n` +
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Subject: ${subject}\n` +
            `Message: ${message}`
        );

        form.reset();
    });
});