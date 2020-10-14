fetch('/todo')
    .then(function(response) {
        return response.json();
    }).then(function(todos) {
        const list = document.querySelector('#todos');
        for (const todo of todos) {
            const item = `<li>${todo.title}</li>`;
            list.insertAdjacentHTML('beforeend', item);
        }
    });