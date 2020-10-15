const express = require('express');
const app = express();

const PORT = 3000;
const todos = [{
        title: 'ToDo 1',
        checked: false,
        date: new Date(),
    },
    {
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

    const title = body.title;

    const newTodo = createTodo(title);
    res.send(newTodo);
});

// READ
app.get('/todo', function(req, res) {
    res.send(todos);
});

// UPDATE
app.post('/todo', function(req, res) {
    res.send('Hallo Welt!')
});

// DELETE
app.delete('/todo', function(req, res) {
    res.send('Hallo Welt!')
});

app.listen(PORT, function() {
    console.log(`App wurde gestartet und läuft auf http://localhost:${PORT}`);
});

function createTodo(title) {
    const newTodo = {
        title: title,
        checked: false,
        date: new Date()
    }
    todos.push(newTodo);
    return newTodo;
}