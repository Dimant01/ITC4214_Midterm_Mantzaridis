const questions = document.querySelectorAll('.faq-question');

questions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;

        document.querySelectorAll('.faq-answer').forEach(a => {
            if (a !== answer) {
                a.style.display = 'none';
            }
        });

        answer.style.display =
            answer.style.display === 'block' ? 'none' : 'block';
    });
});