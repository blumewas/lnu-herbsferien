const fs = require('fs');
const express = require('express');
const app = express();

const PORT = 3000;
const todos = [];

app.use(express.json());
app.use(express.static('public'));

// CREATE
app.put('/todo', function(req, res) {
    const body = req.body;

    const title = body.title;

    const newTodo = createTodo(title);
    saveTodos();

    res.send(newTodo);
});

// READ
app.get('/todo', function(req, res) {
    res.send(todos);
});

// UPDATE
app.post('/todo/:id', function(req, res) {
    const id = req.params.id;

    const todo = todos.find(elem => id === elem.id);
    todo.checked = !todo.checked;

    saveTodos();
    res.send(todo);
});

// DELETE
app.delete('/todo', function(req, res) {
    res.send('Hallo Welt!')
});

app.listen(PORT, function() {
    loadTodos();
    console.log(`App wurde gestartet und läuft auf http://localhost:${PORT}`);
});

function createTodo(title) {
    const newTodo = {
        id: todos.length + 1,
        title: title,
        checked: false,
        date: new Date()
    }
    todos.push(newTodo);
    return newTodo;
}

function saveTodos() {
    const todosStr = JSON.stringify(todos);

    fs.writeFileSync('./todos.json', todosStr);
    console.log('Saved all Todos successfully!');
}

function loadTodos() {
    const content = fs.readFileSync('./todos.json');

    const loadedTodos = JSON.parse(content.toString());

    for (const loaded of loadedTodos) {
        todos.push(loaded);
    }

    console.log(`Loaded ${todos.length} Todos!`);
}