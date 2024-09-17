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
const regex =  new RegExp('hello', 'i'); // Regex with 'i' flag

const matches = text.match(regex); // ["Hello", "Hello"]

const matches = text.match(regex); // ["Hello"]
```
## Meta Characters
### Wild Card (`.`) Dot
- Matches any single character except a newline (\n).
- `/a.b/` matches `a_b`, `a7b`, `a-b`, etc., where "_" can be any character.
### Escaping Meta Characters (`\`)
- `\.` matches a literal period . instead of **any character**.
- `\*` matches a literal asterisk *.
### Control Characters
- `\n`: Matches a newline character.
- `\t`: Matches a tab character.
### Character Sets (`[]`)
- `[ea]`: Matches any one of the characters e or a.
```javascript
const text = "gray is grey!";
const regex = /gr[ea]y/g; // Regex with 'g' flag
const matches = text.match(regex); // ["gray", "grey"]
```
### Character Ranges Using (`-`)
- The hyphen (`-`) meta character is used within square brackets (`[]`) to define a range of characters.
  - `[a-z]` matches any lowercase letter from 'a' to 'z'.
  - `[a-zA-Z0-9]` matches any alphanumeric character (any letter or digit).
  - `[b-f][2-5]` matches `c3` but not `b` or `f6`.
  - `[a\-z]` matches only `a`, `-`, and `z`.
### Excluding Characters Using (`^`)
- At the beginning of a character set ([]) to indicate exclusion of that set of characters.
  - `[^a-z]` matches any character except a lowercase letter from 'a' to 'z'.
  - To match any character except a vowel: `/[^aeiouAEIOU]/`
### Shorthand Character Sets
- `\d` → `[0-9]`
- `\D` → `[^0-9]`
- `\w` → `[a-zA-Z0-9_]`
- `\W` → `[^a-zA-Z0-9_]`
- `\s` → `spaces, tabs, line breaks`
- `\S` → `non-whitespace character`
- `.` → `Matches any character except newline`
