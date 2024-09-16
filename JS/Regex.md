### Two ways to create Regular Expression:
- Literal Syntax
- Constructor
### Regex methods:
- test
- exec
```javascript
    let myRegex_Constructor = new RegExp('Hello');
    let answer = myRegex_Constructor.test('Hello');

    let myRegex_Literal = /World/;
    let answer2 = myRegex_Literal.test('ello');
    console.log(answer); // true
    console.log(answer2); // false

    const regex = /apples/;
    const str = 'There are 100 apples and 50 oranges.';

    let match = regex.exec(str);
    console.log(match); //['apples', index: 14, input: 'There are 100 apples and 50 oranges.', groups: undefined]
```
### String methods:
- `match()` : returns an array of all occurrences of the word.
- `search()` : returns the position of the match - first occurrences.
- `replace()` : replaces all occurrences.
- `split()` : splits the string text of substrings.
```javascript
const text = "JavaScript is awesome. JavaScript is versatile.";
const regex = /JavaScript/g; // Regular expression to match the word "JavaScript" globally

const matches = text.match(regex);
console.log(matches); // Output: ["JavaScript", "JavaScript"]

const index = text.search(regex);
console.log(index); // Output: 0

const newText = text.replace(regex, 'TypeScript');
console.log(newText); // Output: "TypeScript is awesome. TypeScript is versatile."

const languages = text.split(regex);
console.log(languages); // ['', ' is awesome. ', ' is versatile.']
```
### g and i flags:
- `g` : The `g` flag stands for "global" and is used to search for all matches in the string.
- `i` : It ignores case and it is used to make the regex **case-insensitive**.
```javascript
const text = "Hello world! Hello everyone!";
const regex = /hello/g; // Regex with 'g' flag
const regex = /hello/i; // Regex with 'i' flag

const matches = text.match(regex); // ["Hello", "Hello"]

const matches = text.match(regex); // ["Hello"]

```
