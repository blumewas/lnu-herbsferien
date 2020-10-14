const express = require('express');
const app = express();

const PORT = 3000;
const todos = [{
        id: 1,
        title: 'ToDo 1',
        checked: false,
        date: new Date(),
    },
    {
        id: 2,
        title: 'ToDo 2',
        checked: true,
        date: new Date(),
    }
];

app.use(express.json());
app.use(express.static('public'));

// CREATE
app.put('/todo', function(req, res) {
    const body = req.body;
    const new_todo = {
        id: todos.length + 1,
        title: body.title,
        checked: false,
        date: new Date(),
    }
    todos.push(new_todo);
    res.send(new_todo);
});

// READ
app.get('/todo', function(req, res) {
    res.send(todos);
});

// UPDATE
app.post('/todo/:id', function(req, res) {
    const id = req.params.id;

    const todo = todos.find(elem => elem.id == id);
    todo.checked = !todo.checked;

    res.send({ message: 'success', todo: todo });
});

// DELETE
app.delete('/todo/:id', function(req, res) {
    const id = req.params.id;

    const index = todos.findIndex(elem => elem.id == id);
    todos.splice(index, 1);
    res.send({ message: 'success' })
});

app.listen(PORT, function() {
    console.log(`App wurde gestartet und läuft auf http://localhost:${PORT}`);
});