async function fetchTodos() {
    const response = await fetch('/todos');
    todos = await response.json();
    renderTodos();
}

async function addTodo() {
    const input = document.getElementById('todo-input');
    const todoText = input.value.trim();

    if (todoText !== '') {
        const todo = {
            id: Date.now(),
            text: todoText,
            completed: false
        };

        const response = await fetch('/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        });

        if (response.ok) {
            todos.push(await response.json());
            input.value = '';
            renderTodos();
        }
    }
}

async function toggleComplete(id) {
    const todo = todos.find(todo => todo.id === id);
    todo.completed = !todo.completed;

    const response = await fetch(`/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
    });

    if (response.ok) {
        renderTodos();
    }
}

async function editTodo(id) {
    const newTodoText = prompt('Edit the todo:', todos.find(todo => todo.id === id).text);

    if (newTodoText !== null && newTodoText.trim() !== '') {
        const todo = todos.find(todo => todo.id === id);
        todo.text = newTodoText;

        const response = await fetch(`/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        });

        if (response.ok) {
            renderTodos();
        }
    }
}

async function deleteTodo(id) {
    const response = await fetch(`/todos/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        todos = todos.filter(todo => todo.id !== id);
        renderTodos();
    }
}

function renderTodos() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = todo.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${todo.text}</span>
            <button class="complete" onclick="toggleComplete(${todo.id})">Complete</button>
            <button class="edit" onclick="editTodo(${todo.id})">Edit</button>
            <button class="delete" onclick="deleteTodo(${todo.id})">Delete</button>
        `;
        todoList.appendChild(li);
    });
}

// Fetch and display todos when the page loads
fetchTodos();
