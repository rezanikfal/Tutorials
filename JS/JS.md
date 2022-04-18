## DOM
### Query selector
```javascript
var element = document.querySelector('li .name');  // First element
var element = document.querySelectorAll('li .name');  // All elements array
console.log(element.forEach(x=>console.log('REZA',x.innerHTML)));
```
```javascript
var elementALl = document.querySelectorAll('li .name');  // All elements array
elementALl.forEach(x => {
    bookContent = x.textContent // Get text content
    bookContent +=' (book)'   // Append a string to the original DOM i.e. The Wise Man's Fear (book)
    console.log(bookContent)
```
```javascript
var books = document.querySelector('#book-list'); 
books.innerHTML = '<h1>The list of Books</h1>' // Replace the whole DOM element with a new one
books.innerHTML += '<h2>Reza Nikfal</h2>' // Append the new DOM element
```
### HTML Nodes
Almost everything in HTML page is a Node like elements, attributes, ... with different [types](https://www.w3schools.com/jsref/prop_node_nodetype.asp#midcontentadcontainer)
```javascript
const banner = document.getElementById('page-banner')

console.log(banner.nodeType);  // Node Type (i.e. 1 which is an Element)
console.log(banner.nodeName); // Node Name (i.e. DIV)
console.log(banner.hasChildNodes());


const clonedBanner = banner.cloneNode(true) // true = deep clone (the element as well as children)
const eachBook = document.querySelector('#book-list ul')
eachBook.innerHTML += clonedBanner.innerHTML

const bookList = document.querySelector('#book-list')
console.log(bookList.parentElement); // Parent Node or Element
console.log(bookList.children); // Child Node
console.log(bookList.nextElementSibling.innerHTML); // Next Sibling Node (inner HTML)
console.log(bookList.previousElementSibling); // last Sibling Node (inner HTML)
bookList.previousElementSibling.querySelector('p').innerHTML += '</br>REZA'  // Update p tag
```
## Variables
### Declaration VS Definition
```javascript
var a; //Declaration
a = 12; //Definition
```
### undefined
- ```undefined``` is a type that has just one value which is ```undefined```
- After Declaration, the variable is ```undefined``` and after Definition it holds another type.
### null
- ```null``` is also a type that has just one value which is ```null```
- It looks like N/A in a form. In other words, havinf no value for a variable.
### typeof
Since the variable type in JS is inconstsnt, we can use ```typeof``` anytime we need the var type:
```javascript
var a;
console.log(typeof(a)) // undefined
a = 12;
console.log(typeof(a)) // number
a = 'Reza';
console.log(typeof(a)) // string
```
### Hoisting
Before running, JS first checks all the code and variables. So if you derive variables after initializing, it works fine.
```javascript
a = 12;
console.log(a);
var a;
```
## Object
In JS we create objects directly and there is no ```class``` concept.
### Access to Propertits
- To access the properties, we can use ```.``` or ```[]``` notation.
- The bracket notation is for properties with **invalid** name or with **Variable** name.
```javascript
var myObj = {
  "prop1": "Reza",
  "prop2": 123,
  "prop3": true,
  "1":"one"
}
console.log(myObj.prop1)
console.log(myObj["prop1"])

var myProperty = "prop3"
console.log(myObj["1"])        //Invalid prop name
console.log(myObj[myProperty]) //variable prop name
```
### Comparing Objects
```obj1 === obj2``` is ```true``` if both objects point to the same location in the memory.
```javascript
var myObj = {
  prop1: 'Reza',
  prop2: 123,
};
var myObj3 = {
  prop1: 'Reza',
  prop2: 123,
};
var myObj2 = myObj;

console.log(myObj === myObj2); //true
console.log(myObj === myObj3); //false
```
### Delete Properties
```javascript
var myObj = {
  prop1: 'Reza',
  prop2: 123,
};
delete myObj.prop1

console.log(myObj); //{ prop2:123 }
```
### Array
- In JS **array is an object** with number properties.
- Since numbers are invlid prop name we have to access the prop using ```[]``` notation. 
- ```length``` is another property alog with the number props in array.
```javascript
var Arr1 = ['Reza','Matt', 'Andrew']
Arr1[5]='Fariba'
Arr1['foo']='Maneli'
console.log(Arr1)
console.log(Arr1.length)
```
- **length** does not count the ```foo``` property. ```foo``` is part of object but it is ignored as part of the array.
- Console:
```
["Reza", "Matt", "Andrew", empty × 2, "Fariba", foo: "Maneli"]
0: "Reza"
1: "Matt"
2: "Andrew"
5: "Fariba"
foo: "Maneli"
length: 6
```
## Function
- **function declration** is the common way of creating functions.
```javascript
function foo() {
  console.log("Hello");
}
foo()
```
- **Anonymous function expression** is assigning functions to a variable.
```javascript
var f = function () {
  console.log("Hello");
};
f()
```
## For ... of
Creates a loop iterating over iterable objects, including: built-in String, Array, array-like objects
```javascript
const iterable = 'boo';

for (const value of iterable) {
  console.log(value);
}
// "b"
// "o"
// "o"
```
