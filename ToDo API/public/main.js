function showTodo(todo) {
    const list = document.querySelector('#todos');
    const item = `<li>${todo.title}</li>`;
    list.insertAdjacentHTML('beforeend', item);
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

        console.log('HI');
    });
}

window.onload = initView;