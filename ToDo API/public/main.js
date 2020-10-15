function showTodo(todo) {
    const list = document.querySelector('#todos');
    const item = `<li>${todo.title}</li>`;
    list.insertAdjacentHTML('beforeend', item);
}

function create(title) {
    const data = {
        title: title,
    };

    fetch('/todo', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(function(response) {
        return response.json();
    }).then(function(todo) {
        showTodo(todo);
    });
}

function showAll() {
    fetch('/todo')
        .then(function(response) {
            return response.json();
        }).then(function(todos) {
            for (const todo of todos) {
                showTodo(todo);
            }
        });
}

function initView() {
    showAll();

    const form = document.querySelector('#createForm');
    // const form = document.getElementById('createForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const target = event.target;
        const title = target.title.value;
        target.title.value = '';

        create(title);
    });
}

window.onload = initView;