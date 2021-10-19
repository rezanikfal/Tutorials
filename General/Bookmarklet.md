## Get data as text and append to URL as query string
```javascript
javascript: (() => {
const url = 'http://www.unt.edu';
let person = prompt("Please enter your name:", "Harry Potter");
if (location.href !== url) return (location.href = url+'?name='+person)})();
```
