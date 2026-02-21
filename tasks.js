// ===== TASK MANAGER LOGIC =====
document.addEventListener('DOMContentLoaded', () => {
    // ===== DOM ELEMENTS =====
    const form = document.querySelector('#task-form');
    const tableBody = document.querySelector('#task-table-body');

    const totalEl = document.querySelector('#total-tasks');
    const pendingEl = document.querySelector('#pending-tasks');
    const completedEl = document.querySelector('#completed-tasks');

    const priorityFilter = document.querySelector('#priority-filter');
    const statusFilter = document.querySelector('#status-filter');
    const sortSelect = document.querySelector('#sort-tasks');

    // ===== TASKS & ACTIVITY ARRAYS =====
    window.tasks = JSON.parse(localStorage.getItem('tasks')) || []; // load from localStorage
    let tasks = window.tasks;

    let taskActivity = JSON.parse(localStorage.getItem('taskActivity')) || [];

    // ===== SAVE FUNCTIONS =====
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(window.tasks));
    }

    function saveActivity() {
        // Keep only last 10 entries
        if (taskActivity.length > 10) {
            taskActivity = taskActivity.slice(-10);
        }
        localStorage.setItem('taskActivity', JSON.stringify(taskActivity));
    }

    // ===== UPDATE SUMMARY =====
    function updateSummary() {
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        const pending = total - completed;

        totalEl.textContent = total;
        completedEl.textContent = completed;
        pendingEl.textContent = pending;
    }

    // ===== RENDER TASKS =====
    function renderTasks() {
        tableBody.innerHTML = '';

        let filteredTasks = [...tasks];

        // ----- FILTER by priority -----
        const priorityValue = priorityFilter.value;
        if (priorityValue !== "All") {
            filteredTasks = filteredTasks.filter(t => t.priority === priorityValue);
        }

        // ----- FILTER by status -----
        const statusValue = statusFilter.value;
        if (statusValue !== "All") {
            filteredTasks = filteredTasks.filter(t => statusValue === "Completed" ? t.completed : !t.completed);
        }

        // ----- SORTING -----
        const sortValue = sortSelect.value;
        if (sortValue === "name") {
            filteredTasks.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortValue === "date") {
            filteredTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
        }

        // ----- RENDER ROWS -----
        filteredTasks.forEach((task) => {
            const row = document.createElement('tr');
            if (task.completed) row.classList.add('completed');

            row.innerHTML = `
                <td>${task.name}</td>
                <td>${task.desc}</td>
                <td>${task.date}</td>
                <td class="priority-${task.priority}">${task.priority}</td>
                <td>${task.completed ? 'Completed' : 'Pending'}</td>
                <td>
                    <button class="task-btn complete-btn">✔</button>
                    <button class="task-btn delete-btn">🗑</button>
                </td>
            `;

            // Complete button
            row.querySelector('.complete-btn').addEventListener('click', () => {
                task.completed = !task.completed;

                // Record activity
                taskActivity.push(`${task.completed ? 'Completed' : 'Reopened'} task: "${task.name}"`);
                saveActivity();

                saveTasks();
                renderTasks();
                updateSummary();
                document.dispatchEvent(new CustomEvent('tasksUpdated')); // update dashboard and activity
            });

            // Delete button
            row.querySelector('.delete-btn').addEventListener('click', () => {
                tasks.splice(tasks.indexOf(task), 1);

                // Record activity
                taskActivity.push(`Deleted task: "${task.name}"`);
                saveActivity();

                saveTasks();
                renderTasks();
                updateSummary();
                document.dispatchEvent(new CustomEvent('tasksUpdated')); // update dashboard and activity
            });

            tableBody.appendChild(row);
        });
    }

    // ===== EVENT LISTENERS FOR FILTERS & SORTING =====
    priorityFilter.addEventListener('change', renderTasks);
    statusFilter.addEventListener('change', renderTasks);
    sortSelect.addEventListener('change', renderTasks);

    // ===== ADD TASK =====
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.querySelector('#task-name').value.trim();
        const desc = document.querySelector('#task-desc').value.trim();
        const date = document.querySelector('#task-date').value;
        const priority = document.querySelector('#task-priority').value;

        // Add new task
        tasks.push({ name, desc, date, priority, completed: false });

        // Record activity
        taskActivity.push(`Added task: "${name}"`);
        saveActivity();

        saveTasks();
        document.dispatchEvent(new CustomEvent('tasksUpdated')); // update dashboard and activity

        // Reset form
        form.reset();

        // Update table and summary
        renderTasks();
        updateSummary();
    });

    // ===== INITIAL RENDER =====
    renderTasks();
    updateSummary();
});