function create(title) {
    const data = {
        title: title,
    }
    fetch('/todo', {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }).then(function(response) {
        return response.json();
    }).then(function(json) {
        addToList(json);
    });
}

function update(id) {
    fetch(`/todo/${id}`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({}),
    }).then(function(response) {
        return response.json();
    }).then(function(json) {
        const listitem = document.querySelector(`li[data-todo="${id}"]`);
        listitem.classList.toggle('checked');
    });
}

function del(id) {
    fetch(`/todo/${id}`, {
        method: 'DELETE',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({}),
    }).then(function(response) {
        return response.json();
    }).then(function(json) {
        if (json.message !== 'success') {
            return;
        }
        const listitem = document.querySelector(`li[data-todo="${id}"]`);
        listitem.remove();
    });
}

function addToList(todo) {
    const list = document.querySelector('#todos');
    const item = `<li data-todo="${todo.id}" class="todo ${todo.checked ? 'checked' : ''}">
        <input type="checkbox" class='check' data-todo="${todo.id}" ${todo.checked ? 'checked' : ''}>
        ${todo.title}
        <button data-todo="${todo.id}">Löschen</button>
    </li>`;
    list.insertAdjacentHTML('beforeend', item);

    const box = document.querySelector(`input[data-todo="${todo.id}"]`);
    box.addEventListener('change', function(event) {
        const id = event.target.dataset.todo;
        update(id);
    });

    const deleteBtn = document.querySelector(`button[data-todo="${todo.id}"]`);
    deleteBtn.addEventListener('click', function(event) {
        const id = event.target.dataset.todo;
        del(id);
    });
}

function initView() {
    const form = document.querySelector('#new-todo');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = event.target.title.value;

        event.target.title.value = '';
        create(title);
    });

    fetch('/todo')
        .then(function(response) {
            return response.json();
        }).then(function(todos) {
            for (const todo of todos) {
                addToList(todo);
            }
        });
}

window.onload = function() {
    initView();
}