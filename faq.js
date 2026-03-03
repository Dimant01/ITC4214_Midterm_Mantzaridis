document.addEventListener('DOMContentLoaded', () => {
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
    
    // Daily visitor counter
    const today = new Date().toISOString().slice(0, 10); // e.g., "2026-03-03"
    const lastVisit = localStorage.getItem('faqVisitorsDate');

    let count;
    if (lastVisit === today) {
        // Same day → continue counting
        count = parseInt(localStorage.getItem('faqVisitors')) || 0;
    } else {
        // New day → reset count
        count = 0;
    }
    // Increment count for this visit
    count += 1;
    // Save back to localStorage
    localStorage.setItem('faqVisitors', count);
    localStorage.setItem('faqVisitorsDate', today);
    // Update the displayed count
    document.querySelector('#visitor-count').textContent = count;
    
    // Helpful button logic
    const helpfulButtons = document.querySelectorAll('.faq-like');

    helpfulButtons.forEach(btn => {
        const faqItem = btn.closest('.faq-item');
        const faqId = faqItem.dataset.id;
        const countSpan = btn.querySelector('.like-count');

        // Load previous count from localStorage
        let likeCount = parseInt(localStorage.getItem(`faq-like-${faqId}`)) || 0;
        countSpan.textContent = likeCount;

        btn.addEventListener('click', () => {
            likeCount += 1;
            countSpan.textContent = likeCount;
            localStorage.setItem(`faq-like-${faqId}`, likeCount);
        });
    });
});
    
