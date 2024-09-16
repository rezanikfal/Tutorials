### Two ways to create Regular Expression:
- Literal Syntax
- Constructor
```javascript
    let myRegex_Constructor = new RegExp('Hello');
    let answer = myRegex_Constructor.test('Hello');

    let myRegex_Literal = /World/;
    let answer2 = myRegex_Literal.test('ello');
    console.log(answer); // true
    console.log(answer2); // false
```
