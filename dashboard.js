document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('priorityChart').getContext('2d');

    // Function to count tasks by priority
    function getChartData() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const counts = { High: 0, Medium: 0, Low: 0 };

    tasks
        .filter(t => !t.completed) // <-- only pending
        .forEach(t => {
            counts[t.priority] = (counts[t.priority] || 0) + 1;
        });

    return [counts.High, counts.Medium, counts.Low];
}

    // Create the pie chart
    const priorityChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['High', 'Medium', 'Low'],
            datasets: [{
                data: getChartData(),
                backgroundColor: ['#E74C3C', '#F1C40F', '#2ECC71']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });

    // Update chart whenever tasks change (from tasks.js)
    document.addEventListener('tasksUpdated', () => {
        priorityChart.data.datasets[0].data = getChartData();
        priorityChart.update();
    });

    // Listen for localStorage changes from other tabs
    window.addEventListener('storage', () => {
        priorityChart.data.datasets[0].data = getChartData();
        priorityChart.update();
    });

    // Initial render
    priorityChart.data.datasets[0].data = getChartData();
    priorityChart.update();
});