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
    window.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let tasks = window.tasks;

    let taskActivity = JSON.parse(localStorage.getItem('taskActivity')) || [];

    let editIndex = null;

    // ===== SAVE FUNCTIONS =====
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(window.tasks));
    }

    function saveActivity() {
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

        // FILTERS
        const priorityValue = priorityFilter.value;
        if (priorityValue !== "All") {
            filteredTasks = filteredTasks.filter(t => t.priority === priorityValue);
        }

        const statusValue = statusFilter.value;
        if (statusValue !== "All") {
            filteredTasks = filteredTasks.filter(t =>
                statusValue === "Completed" ? t.completed : !t.completed
            );
        }

        // SORT
        const sortValue = sortSelect.value;
        if (sortValue === "name") {
            filteredTasks.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortValue === "date") {
            filteredTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
        }

        // RENDER
        filteredTasks.forEach((task) => {
            const row = document.createElement('tr');
            if (task.completed) row.classList.add('completed');

            row.innerHTML = `
                <td><div class="task-name-cell">${task.name}</div></td>
                <td><div class="task-desc-cell">${task.desc}</div></td>
                <td>${task.date}</td>
                <td class="priority-${task.priority}">${task.priority}</td>
                <td>${task.completed ? 'Completed' : 'Pending'}</td>
                <td>
                    <button class="task-btn complete-btn">✔</button>
                    <button class="task-btn edit-btn">✏</button>
                    <button class="task-btn delete-btn">🗑</button>
                </td>
            `;

            // COMPLETE
            row.querySelector('.complete-btn').addEventListener('click', () => toggleTaskCompletion(task));
            
            
            // DELETE
            row.querySelector('.delete-btn').addEventListener('click', () => taskDeletion(task));
                
            

            // EDIT (INLINE)
            row.querySelector('.edit-btn').addEventListener('click', () => taskEdit(task, row));

            tableBody.appendChild(row);
        });
    }

    // Button Related Functions:
    function toggleTaskCompletion(task){
                task.completed = !task.completed;

                taskActivity.push(`${task.completed ? 'Completed' : 'Reopened'} task: "${task.name}"`);
                saveActivity();

                saveTasks();
                renderTasks();
                updateSummary();
                document.dispatchEvent(new CustomEvent('tasksUpdated'));
            }

    function taskDeletion(task){
        tasks.splice(tasks.indexOf(task), 1);

        taskActivity.push(`Deleted task: "${task.name}"`);
        saveActivity();

        saveTasks();
        renderTasks();
        updateSummary();
        document.dispatchEvent(new CustomEvent('tasksUpdated'));
    }
    
    function taskEdit(task, row){
        row.innerHTML = `
                    <td><input type="text" value="${task.name}" class="edit-name"></td>
                    <td><input type="text" value="${task.desc}" class="edit-desc"></td>
                    <td><input type="date" value="${task.date}" class="edit-date"></td>
                    <td>
                        <select class="edit-priority">
                            <option ${task.priority === 'High' ? 'selected' : ''}>High</option>
                            <option ${task.priority === 'Medium' ? 'selected' : ''}>Medium</option>
                            <option ${task.priority === 'Low' ? 'selected' : ''}>Low</option>
                        </select>
                    </td>
                    <td>${task.completed ? 'Completed' : 'Pending'}</td>
                    <td>
                        <button class="task-btn save-btn">💾</button>
                        <button class="task-btn cancel-btn">❌</button>
                    </td>
                `;

                // SAVE
                row.querySelector('.save-btn').addEventListener('click', () => {
                    task.name = row.querySelector('.edit-name').value;
                    task.desc = row.querySelector('.edit-desc').value;
                    task.date = row.querySelector('.edit-date').value;
                    task.priority = row.querySelector('.edit-priority').value;

                    taskActivity.push(`Edited task: "${task.name}"`);
                    saveActivity();

                    saveTasks();
                    renderTasks();
                    updateSummary();
                });

                // CANCEL
                row.querySelector('.cancel-btn').addEventListener('click', () => {
                    renderTasks();
                });
    }
    
    // ===== FILTER EVENTS =====
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

        if (editIndex !== null) {
            tasks[editIndex].name = name;
            tasks[editIndex].desc = desc;
            tasks[editIndex].date = date;
            tasks[editIndex].priority = priority;

            taskActivity.push(`Edited task: "${name}`);
            editIndex = null;
        } else {
            tasks.push({ name, desc, date, priority, completed: false });
            taskActivity.push(`Added task: "${name}"`);
        }

        saveActivity();
        saveTasks();
        document.dispatchEvent(new CustomEvent('tasksUpdated'));

        form.reset();
        document.querySelector('#task-form button').textContent = "Add Task";

        renderTasks();
        updateSummary();
    });

    // ===== INITIAL RENDER =====
    renderTasks();
    updateSummary();
});