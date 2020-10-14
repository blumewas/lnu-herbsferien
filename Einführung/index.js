let str = "Hallo LNU!"; // Deklaration einer Variablen
// Einfache Ausgabe des Wertes einer Variablen über die Konsole
console.log(str);

// Deklaration einer Funktion
// Die Funktion gibt den Wert der Variable String aus.
function printStr() {
    // Einfache Ausgabe
    console.log(str);
}
printStr(); // Aufruf der Funktion

let num1 = 1; // Deklaration einer Variable mit veränderbaren Wert
const num2 = 3; // Deklaration einer Variable mit konstantem Wert

// Deklaration einer Funktion mit Parametern
// Parameter 'summand2' hat einen Default-/Standard-Wert
function printSum(summand1, summand2 = 15) {
    // If Abfrage ob ein Wert in 'summand1' übergeben wird
    if (summand1 === undefined) {
        console.log(num2 + summand2); // Ausgabe wenn kein Wert übergeben wird
    } else {
        console.log(summand1 + summand2); // Ausgabe wenn ein Wert übergeben wird
    }
}

printSum(10); // Ausgabe: 25
printSum(10, 50); // Ausgabe: 60
printSum(); // Ausgabe: 18

// Weitere Funktion mit einem Parameter
function greet(greeting) {
    if (greeting === undefined) { // Abfrage 1: Test ob Wert übergeben wird
        // Ausgabe wenn kein Wert übergeben wird
        console.log('Hallo Welt!');
    } else if (greeting === 'JS') { // Abfrage 2: Wenn Abfrage 1 falsch ist
        // Ausgabe wenn der Wert 'JS' übergeben wird
        console.log('JS ist toll!');
    } else {
        // Ausgaben wenn obere Bedingungen falsch sind.
        // eher schlecht ist Variablen mit Strings über + zu verketten
        console.log('Hallo ' + greeting + '!');
        // Gut ist Template-Strings zu benutzen um Variablen in Strings auszugeben
        console.log(`Hallo ${greeting}!`);
    }
}
greet('Kurs'); // Ausgabe: 'Hallo Kurs!' 2-mal

// Deklaration eines Arrays
// Ein Array ist ein Sammlung von Elementen
const arr = [1, 2, 'Hallo'];

// Die Werte können über ihren Index abgefragt werden.
// Der Index startet bei 0 und wird immer um 1 erhöht
console.log(arr[0]); // Ausgabe: 1
console.log(arr[1]); // Ausgabe: 2
console.log(arr[2]); // Ausgabe: Hallo
console.log(arr[3]); // Ausgabe: undefined, da kein Wert zugewiesen wurde

arr[3] = 4; // Hinzufügen eines Wertes an die Stelle 3
console.log(arr[3]); // Ausgabe: 4

arr[1] = 100; // Neu zu Weisung des Wertes an der Stelle 1
console.log(arr[1]); // Ausgabe: 1

arr.push(50); // Hinzufügen eines Wertes an das Ende
console.log(arr[4]); // Ausgabe: 50
console.log(arr); // Ausgabe: [1, 100, 'Hallo', 4, 50]
console.log(arr.length); // Ausgabe: 5, Länge des Arrays

// Funktion um Schleifen zu erklären
function printArr() {
    console.log('Gebe Array aus:');
    // Iteration des Arrays über eine for-Schleife mit Zählvariable
    for (let i = 0; i < arr.length; i++) {
        const elem = arr[i];
        console.log(elem);
    }
    // Equivalent zur obigen Schleife mit forof
    // elem nimmt genau einmal den Wert jedes Elementes im Array an
    for (const elem of arr) {
        console.log(elem);
    }
    // Analog zur forof ist forin. Allerdings nimmt index genau einmal den Wert jedes Indizes an
    for (const index in arr) {
        console.log(`Am Index ${index} steht der Wert ${arr[index]}`);
    }
}

printArr(); // Aufruf der Methode

// Objekte sind Sammlungen von Key-Value Paaren
// Sie werden mit {} deklariert
// initiale Werte können innerhalb der {} übergeben werden
const obj = {
    x: 100, // Key ist x, Wert ist 100
    str: 'Hallo', // Key ist str, Wert ist Hallo
};

const x = obj.x; // Auslesen des Wertes von x
console.log(x); // Ausgabe: 100
console.log(obj['x']); // Ausgabe: 100; über [key], kann ebenfalls der Wert an der Stelle ausgelesen werden

// iteration des Objektes mit forin
// key nimmt den Wert aller Keys einmal an
// in diesem Beispiel 'x' und 'str'
for (const key in obj) {
    if (obj.hasOwnProperty(key)) { // Abfrage ob der Key auch vorhanden ist
        // Auslesen des Wertes über [] mit key
        // innerhalb der Klammern dürfen Variablen verwendet werden
        // bei Objekt.Key sind keine Variablen möglich
        const element = obj[key]; // Bsp.: key=str ist die Ausgabe 'Hallo'
        console.log(element);
    }
}

obj.x = 'Hallo du'; // Neu zu weisen des Wertes von x
console.log(obj['x']); // Ausgabe: Hallo du
obj['x'] = 'Hallo ich'; // Neu zuweisen über []
console.log(obj.x); // Ausgabe: Hallo ich

// Beispiel mit Personen
// Erstellen zweier Personen mit gleichen Keys aber unterschiedlichen Werten
const person1 = {
    name: 'Schneider',
    alter: 23,
    arbeit: 'Student'
};
const person2 = {
    name: 'Müller',
    alter: 13,
    arbeit: 'Schüler'
};

// Erstellen eines Arrays mit den zwei Personen
const personen = [person1, person2];
// Iteration des Arrays mit forof
for (const person of personen) {
    console.log(person.name); // Ausgabe: Schneider, Müller
}
// Hinzufügen einer neuen Person zur Liste der Personen über push
personen.push({
    name: 'Schmitz',
    alter: 60,
    arbeit: 'Lehrerin'
});
// Ausgabe aller drei Personen
for (const person of personen) {
    console.log(person);
}
// Modifikation des Alters der Person2
// Die Person2 steht im Array an zweiter Stelle(index: 1)
// Dem Alter kann ein neuer Wert zu gewiesen werden 
personen[1].alter = personen[1].alter + 1;
console.log(personen[1]);
// Equivalent:
person2.alter = person2.alter + 1;
console.log(personen[1]); // Gibt Müller mit Alter 15 aus

// Generator Funktion für Personen um Personen aus einem Template zu erstellen
function createPerson(name, alter, arbeit) {
    if ((typeof name) !== 'string') { // Verifikation das der übergebene Name ein String ist
        // Ansonsten wird ein Fehler Objekt zurückgegeben
        return { message: 'Name muss ein String sein.', error: 'Falscher Typ' };
    }
    // Erstellen eines Person Objektes
    const newPerson = {
        name: name,
        alter: alter,
        arbeit: arbeit
    };
    return newPerson; // Rückgabe am Ende
    // Equivalent
    // return {
    //     name: name,
    //     alter: alter,
    //     arbeit: arbeit
    // };
}
// Erstellen einer Person über die Generator-Funktion
const person3 = createPerson('Schmidt', 70, 'Rentner');
personen.push(person3);
// Ausgabe aller Personen
console.log(personen);
// Erstellen einer Person mit falschem Wert für name
const personErr = createPerson(70, 70, 'Rentner');
console.log(personErr);
// Anderes Beispiel für Funktion mit Rückgabewert
function calc(summand1, summand2) {
    return summand1 + summand2;
}
// summe nimmt den Rückgabewert der Funktion an
const summe = calc(10, 30);
console.log(summe); // Ausgabe: 40