# Looping Arrays in JavaScript

>The way I work is by infinitely playing a very simple loop over and over, and then I start layering things

🎵 Washed Out

## Arten von For Loops in JavaScript

In JavaScript gibt es im wesentlichen drei Möglichkeiten Arrays zu durchlaufen und mit den enthaltenen Elementen und Objekten zu arbeiten.

- `for` - der simple for Loop, wie man ihn auch aus anderen Sprachen kennt
- `forEach` - eine Array Funktion, die für jedes Element die übergebene Funktion ausführt
- `for...of` - eine Methode _iterierbare Objekte_ in JavaScript zu durchlaufen

## Beispiele

Im folgenden werden wir als _Array_ folgendes Beispiel verwenden:

```javascript
const students = [
  { 
    name: 'Paul',
    geschlecht: 👦
  },
  { name: 'Christine', geschlecht: 👧 },
  { name:'Max', geschlecht: 👦 }
];
```
Das Array beinhaltet Objekte, welche dem Namen eines Studenten sein Geschlecht zu ordnen. Die Namen sind zufällig gewählt und die Besipiele funktionieren für sämtliche **Größen** des Arrays.

### for
Der Standard for-Loop, welcher wahrscheinlich auch aus anderen Programmiersprachen bekannt ist. Man hat eine Variable vom Typ `Number`, welche bis zu einer Abbruch Bedingung hochgezählt, runtergezählt, verdoppelt, usw.

```javascript
for(let i = 0; i < students.length; i++) {
  const student = students[i];
  console.log(student.name + ' ist ein ' + student.geschlecht);
}
```

Dieser Code gibt nach einander, wer hätte es gedacht folgendes aus:

1. Paul ist ein 👦
2. Christine ist ein 👧
3. Max ist ein 👦

### forEach

`forEach` ist eine Array-Funktion, die für jedes Element im Array eine übergebene Funktion ausführt. Die Benutzung sieht wie folgt aus:

```javascript
students.forEach((el) => {
  console.log(el.name + ' ist ein ' + el.geschlecht);
});
```

Der Code ist deutlich kompakter als beim normalen for-Loop, allerdings auf Kosten der Lesbarkeit. Die Ausgabe ist selbstverständlich die Selbe wie oben. Der Name der Variable, hier `el`, kann natürlich jeder andere gültige Variablenname in JavaScript sein.

### for...of

`for...of` funktioniert ähnlich wie `forEach`, allerdings ähnelt die Schreibweise eher einem normalen for-Loop. 

```javascript
for(const student of students) {
  console.log(student.name + ' ist ein ' + student.geschlecht);
}
```

Diese Variante des for-Loops, ist die, die in der **Vorlesung und Übung** als _Best Practice_ behandelt wurde. `for...of` besitzt eine nennen wir sie kleine Schwester, nämlich `for...in`.

`for...in` iteriert über die Keys eines Objektes. Deswegen ist Vorsicht geboten, denn es gibt keinen _Syntax-Fehler_ während man den Code schreibt, sondern es kommt meist eher zu _Runtime-Fehlern_, die erst bei Ausführung und nach nervigem Debuggen mit `console.log`, die falsche Verwendung aufzeigen.

```javascript
for(const student in students) {
  console.log(student.name + ' ist ein ' + student.geschlecht);
}
```
Die Ausgabe, nur weil ein Keyword sich geändert hat, ist:

1. undefined ist ein undefined
2. undefined ist ein undefined
3. undefined ist ein undefined

Dies ist logisch, da `student` hier immer die Value des aktuellen _Keys_ hat. Bei einem Array also den aktuellen __index__ hat. Gibt man nur `student` mit `console.log` aus, so zeigt sich dies:

1. 0
2. 1
3. 2

#### Gar kein Nutzen für for...in?

So kritisch ist es nun nicht. `for...in` kann zum Beispiel genutzt werden, um die _Key/Value-Pairs_ eines __Objektes__ auszugeben. 

```javascript
const student = { 
  name: 'Paul',
  geschlecht: 👦,
  geboren: 1995
};

for(const key in student) {
  console.log(key + ' hat den Wert ' + student[key]);
}

```

So gibt dieser Code aus:

1. name hat den Wert Paul
2. geschlecht hat den Wert 👦
3. geboren hat den Wert 1995

`for...in` kann auch genutzt werden, falls das Objekt als `Map` genutzt wird. Allerdings **sollte** man hier den Typ `Map` nutzen, da dieser mit `for...of` funktioniert. Im folgenden Beispiel wird ein der Name als Key genutzt, welcher ein Geschlecht als Value zu geordnet wird.

```javascript
// SO NICHT!!!
const students = { 
  'Paul': 👦,
  'Christine': 👧,
  'Max' 👦 
};

for(const name in students) {
  console.log(name + ' ist ein ' + students[name]);
}
```

Dieser Code erzeugt die gleiche Ausgabe, wie die anderen for-Loops:

1. Paul ist ein 👦
2. Christine ist ein 👧
3. Max ist ein 👦

Das Beispiel, so wie man es machen sollte, mit einer `Map`:

```javascript
// so Macht man das
const students = new Map();

students.set('Paul', 👦);
students.set('Christine', 👧);
students.set('Max', 👦);

for(const [name, geschlecht] of students) {
  console.log(name + ' ist ein ' + geschlecht);
}
```

Die Ausgabe sieht wie folgt aus:

1. Paul ist ein 👦
2. Christine ist ein 👧
3. Max ist ein 👦

Der Vorteil einer `Map`gegenüber einem `Objekt` ist, dass als Key alles verwendet werden kann, so kann in einer `Map` ein `String` als Key verwendet werden, wie in einem `Objekt`. Aber auch eine `Number`, eine `Funktion` oder jedes andere `Objekt`. Aber so viel zu dem Exkurs 😄. [Mehr zu Maps](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Map)

## Destructuring Arrays

Beim Durchlaufen mit `for...of` von _Arrays of Arrays_, kann man mit [Destrukturierenden Zuweisungen](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Operators/Destrukturierende_Zuweisung) arbeiten. Betrachten wir folgende Matrix:

```javascript
const moves = [
  ['e4', 'c5'],
  ['Sf3', 'd6'],
  ['d4', 'Xd4'],
  ['XSd4', 'Sf6'],
  ['Sc3', 'a6'],
  ...
];
```
Das Array stellt nun die Züge einer [Schachpartie](https://www.youtube.com/watch?v=nYcaLG5PYZs) (die komplette Partie ist hinter dem Link) dar. Es gibt sicherlich auch eine bessere oder andere Möglichkeit, mit zum Beispiel _Objekten_, dies ist aber für das Beispiel unwichtig.

Das Array lässt sich mit `for...of` wie jedes andere Array auch durchlaufen.

```javascript
for(const move of moves) {
  console.log('Weiß zieht ' + move[0] + '; Schwarz erwiedert ' + move[1]);
}
```
Die Ausgabe ist relativ logisch:
1. Weiß zieht e4; Schwarz erwiedert c5
2. Weiß zieht Sf3; Schwarz erwiedert d6
3. Weiß zieht d4; Schwarz erwiedert Xd4
4. Weiß zieht XSd4; Schwarz erwiedert Sf6
5. Weiß zieht Sc3; Schwarz erwiedert a6
6. ...

Durch _Destrukturierende Zuweisungen_ lassen sich Werte in einem `Array`, Variablen zu weisen. 

```javascript
const move = ['e4', 'c5'];

const [weiss, schwarz] = move;
console.log('Weiß zieht ' + weiss + '; Schwarz erwiedert ' + schwarz);
```

Die Ausgabe sieht nun aus wie oben _"Weiß zieht e4; Schwarz erwiedert c5"_.

Das obige Beispiel sieht mit der Modifikation wie folgt aus:

```javascript
for(const [weiss, schwarz] of moves) {
  console.log('Weiß zieht ' + weiss + '; Schwarz erwiedert ' + schwarz);
}
```
Die Ausgabe ist die selbige, für die Folständigkeit sei sie noch einmal aufgeführt:
1. Weiß zieht e4; Schwarz erwiedert c5
2. Weiß zieht Sf3; Schwarz erwiedert d6
3. Weiß zieht d4; Schwarz erwiedert Xd4
4. Weiß zieht XSd4; Schwarz erwiedert Sf6
5. Weiß zieht Sc3; Schwarz erwiedert a6
6. ...

To be continued...
