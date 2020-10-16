// Method um ein Todo zu unserer Liste hinzuzufügen
function showTodo(todo) {
    const list = document.querySelector('#todos');
    const item = `<li data-todo="${todo.id}" class="todo ${todo.checked ? 'checked' : ''}">
        <input type="checkbox" class='check' data-todo="${todo.id}" ${todo.checked ? 'checked' : ''}>
        ${todo.title}
        <button data-todo="${todo.id}">Löschen</button>
    </li>`;
    list.insertAdjacentHTML('beforeend', item); // honzufügen des Elementes zur Website

    // Hinzufügen eines Eventlisteners, wenn eine checkbox ausgewählt wird
    const box = document.querySelector(`input[data-todo="${todo.id}"]`);
    box.addEventListener('change', function(event) {
        const id = event.target.dataset.todo; // Auslesen des wertes der id, der Wert wird in data-todo gespeichert
        update(id); // Aufruf der Methode um den Status des Todos zu togglen
    });

    // Auswahl des delete Buttons, des die Methode zum löschen des servers aufruft
    const deleteBtn = document.querySelector(`button[data-todo="${todo.id}"]`);
    deleteBtn.addEventListener('click', function(event) {
        const id = event.target.dataset.todo; // Auslesen des wertes der id, der Wert wird in data-todo gespeichert
        del(id); // Aufurf der Methode zum löschen
    });
}

// Erstellen eines neuen Todos
function create(title) {
    const data = {
        title: title,
    };
    // Anfrage an den Server erstellen
    fetch('/todo', {
        method: 'PUT',
        body: JSON.stringify(data), // der Body der Anfrage, der von der API/dem Server bearbeitet werden sollte
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(function(response) {
        return response.json();
    }).then(function(todo) {
        showTodo(todo); // Hinzufügen des todos auf die Seite
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
        const listitem = document.querySelector(`li[data-todo="${id}"]`); // Auswahl des Listeneintrags
        listitem.classList.toggle('checked'); // hinzufügen des Klasse zu einem listitem um das Todo zu markieren, wenn das Häkchen gesetzt ist.
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
        // Abbruch, sollte die Nachricht nicht success sein, die der Server an uns schickt
        if (json.message !== 'success') {
            return;
        }
        const listitem = document.querySelector(`li[data-todo="${id}"]`); // Auswahl des Listeneintrags
        listitem.remove(); // Löschen des Elements aus der Liste
    });
}

// Aufruf aller todos
function showAll() {
    // Anfrage an den Server
    fetch('/todo')
        .then(function(response) {
            return response.json(); // Die Antwort des Servers auf die Anfrage
        }).then(function(todos) {
            // for-Schleife für jedes geladene Todo
            for (const todo of todos) {
                showTodo(todo);
            }
        });
}
// Methode zum Initialisieren der Website
function initView() {
    showAll();

    const form = document.querySelector('#createForm');
    // const form = document.getElementById('createForm');
    // Hinzufügen eines Event-Listeners, zu dem Formular
    // das Event wird ausgelöst, wenn der OK-Button gedrückt wird oder Enter gedrückt wird, wenn der Cursor im Input-Element ist
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // verhindern des neu ladens der Website wenn das Formular abgeschickt wird

        const target = event.target; // auswählen des Formulars um Infos auszulesen
        const title = target.title.value; // Auslesen des Titels
        target.title.value = ''; // clearen des Inputs

        create(title); // Aufruf der Methode zum erstellen des Todos
    });
}
// Aufruf der Methode initView, wenn die Seite fertig geladen ist
window.onload = initView;