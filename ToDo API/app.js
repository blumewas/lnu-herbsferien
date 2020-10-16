// importieren der benötigten Bibliotheken
const fs = require('fs'); // fs ist eine Bibliothek um Dateien zu lesen und zu schreiben
const express = require('express'); // express.js ist eine Bibliothek um REST-Apis zu erstellen.
// Initialisieren einer express-App
const app = express();

const PORT = 3000;
// Array in dem unsere Todos gespeichert werden.
const todos = [];

// einstellen des Body-Parsers, so dass express versteht, was wir dan den body senden
app.use(express.json());
// verwendung der APP als Webserver, über localhost:PORT im Browser wird die index.html angezeigt.
app.use(express.static('public'));

// CREATE
// erstellen einer API-Methode mit der Funktion "PUT"
// der zweite Parameter ist eine Funktion, die die Anfrage und die Antwort
// an den anfragenden Client bearbeitet
app.put('/todo', function(req, res) {
    // Auslesen des body der Anfrage (Daten die der Client mit der Anfrage schickt)
    const body = req.body;
    // Wert der Variable title aus dem body auslesen
    // dieser muss von client mitgesendet werden
    const title = body.title;
    // Erstellen eines neuen Todos mit der Methode createTodo
    const newTodo = createTodo(title);
    saveTodos(); // Speichern der Todos

    res.send(newTodo); // Senden des erstellten Todo an den Client
});

// READ
// API METHODE GET, zum auslesen aller todos
app.get('/todo', function(req, res) {
    // Senden aller Todos an den Client
    res.send(todos);
});

// UPDATE
// erstellen einer API-Methode mit der Funktion "POST"
// der zweite Parameter ist eine Funktion, die die Anfrage und die Antwort
// an den anfragenden Client bearbeitet
app.post('/todo/:id', function(req, res) {
    // auslesen des URL-Parameters id
    const id = req.params.id;

    // Suche des angefragten Todo Elements
    const todo = todos.find(elem => id === elem.id);
    // Ändern des Status unseres Todos
    todo.checked = !todo.checked;

    saveTodos(); // Speichern der Todos
    res.send(todo); // Antwort an Client senden mit dem bearbeiteten TODO
});

// DELETE
// erstellen einer API-Methode mit der Funktion "DELETE"
// der zweite Parameter ist eine Funktion, die die Anfrage und die Antwort
// an den anfragenden Client bearbeitet
app.delete('/todo/:id', function(req, res) {
    // auslesen des URL-Parameters id
    const id = req.params.id;
    // suchen des index des zu löschenden Todos
    const index = todos.findIndex(elem => elem.id == id);
    todos.splice(index, 1); // entfernen eines Elements aus dem Array ab dem gefundenen index (das zulöschende Todo)
    res.send({ message: 'success' }); // Bestättigende Nachricht als Antwort senden
});

// Starten unserer App/API
app.listen(PORT, function() {
    loadTodos(); // Aufruf der Funktion zum laden unserer Todos
    console.log(`App wurde gestartet und läuft auf http://localhost:${PORT}`);
});
// Funktion zur Erstellung eines Todos
// einziges Argument ist der Titel, alle anderen Infos sind mehr oder minder vorbestimmt
function createTodo(title) {
    // neues Todo Objekt inititaliseren
    const newTodo = {
            id: todos.length + 1, // auto-increment der id mit Hilfe der Anzahl der aktuell geladenen Todos
            title: title,
            checked: false,
            date: new Date() // erstellen des Timestamps, an dem das Todo erstellt wird
        }
        // Hinzufügen des Todos in unser Array
    todos.push(newTodo);
    // Rückgabe des erstellten Todos um es weiterzu verarbeiten
    return newTodo;
}
// Speichern der Todos in der Datei todos.json
function saveTodos() {
    // umwandeln unseres Todo-Arrays in einen String
    const todosStr = JSON.stringify(todos);
    // überschreiben des Inhaltes der Datei todos.json mit unserem String
    fs.writeFileSync('./todos.json', todosStr);
    console.log('Saved all Todos successfully!');
}

// Laden der Todos aus der Datei todos.json
function loadTodos() {
    const content = fs.readFileSync('./todos.json');
    // content ist ein Objekt vom Typ Buffer
    // toString() liefert uns den Inhalt im Text-Format
    // JSON.parse macht aus einem String/Text ein JS-Objekt
    const loadedTodos = JSON.parse(content.toString());
    // Hinzufügen unserer geladenen Todos in unser Todos-Array
    for (const loaded of loadedTodos) {
        todos.push(loaded);
    }
    // Ausgabe Anzahl der geladenen Todos
    console.log(`Loaded ${todos.length} Todos!`);
}