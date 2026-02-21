document.addEventListener('DOMContentLoaded', () => {
    const activityList = document.getElementById('activity-list');

    // Load saved activity from localStorage
    const savedActivity = JSON.parse(localStorage.getItem('taskActivity')) || [];

    // Display activity
    savedActivity.forEach(msg => {
        const li = document.createElement('li');
        li.textContent = msg;
        activityList.prepend(li); // newest on top
    });
});