## Methods/Properties
- Check if a var is number: ```typeof(x) == "number"```
- ```B.sort()``` is from Small to big, to reverse it use ```B.sort().reverse()```
- Print the current web page: ```window.print()```
- Check if an elements is in an array: ```outcome.includes(x)```
- Fix to 4 digits: ```(1.65).toFixed(4) // 1.6500```
- Create random number between 0-199 (including 0 & 199): ```Math.floor((Math.random()*200))```
- Get e letter in a string: ```myLetter = 'Reza Nikfal'.charAt(6).toUpperCase() //I```
- Convert ['a', 'reza', 15] to "a,reza,15": ```['a', "reza", 15].toString()```
- **FKT** rule, Filter Keeps True!
- **Remove Duplicates** from an array:
```javascript
const noDuplicate = arr.filter((x,i)=>{
    return arr.indexOf(x) == i
})
```
- The **substring()** method returns the part of the string (substring is all **lower case**):
- The **slice()** method returns the part of an array/string - **The Second Number is not included in both methods**:
```javascript
const str = 'Mozilla';
console.log(str.substring(1, 3)); // expected output: "oz"
})
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
console.log(animals.slice(2, 4)); // expected output: Array ["camel", "duck"]
```
- The **flat()** method creates a new array with all sub-array elements:
```javascript
var A = [1, [2], [3, [[4]]],[5,6]]
console.log(A.flat(2)); //[1, 2, 3, [4], 5, 6]
console.log(A.flat(Infinity)); //[1, 2, 3, 4, 5, 6]
```
- The **chatAt()** method returns the exact character:
```javascript
let myFirst = 'js string exercises'
let var1 = myFirst.split(' ').map(x=>x.charAt(0).toUpperCase()+x.slice(1)).join(' ')
console.log(var1) // Js String Exercises
```
- Intersect or Deferenciate array A and B:
```javascript
console.log(A.filter(x=>B.includes(x))); // Intersection
console.log(A.filter(x=>!B.includes(x))); // A-B
console.log(A.filter(x=>!B.includes(x)).concat(B.filter(x=>!A.includes(x))); // Symmetric difference
```
- Sort an object based a field (title), Case Insensitive:
```javascript
var library = [ 
{ author: 'Bill Gates', title: 'The Road Ahead', libraryID: 1254},
{ author: 'Steve Jobs', title: 'Walter Isaacson', libraryID: 4264},
{ author: 'Suzanne Collins', title: 'Mockingjay: The Final Book of The Hunger Games', libraryID: 3245}
];
console.log(library.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1));
console.log('asd'<'ssd'); //true
array.sort((a,b)=> Value) // if Value>0 => b,a,... | if Value<0 => a,b,... | if Value=0 => Original order 
```
- Sort an string array based on the elements length:
```javascript
let mySt = ['go', 'google', 'googthfhg','googlehdiusghcdkjasbgci', 'googthfh']
var longest = mySt.reduce((a, b)=>a.length > b.length ? a : b) // Loop through the array, Each time stores the function result in b
var longest2 = mySt.sort((a,b)=> b.length-a.length) //return a - b => ascending , return b - a => decending (for Numbers)
```
- Sort a number array:
```javascript
let BB = [1,2,3,22,5,6,7,89,3]
var sort1 = BB.sort() // [1,2,22,3,3,5,6,7,89] Sorts as string
var sort1 = BB.sort((a,b)=>a-b)) // [1,2,3,3,5,6,7,22,89]
var sort1 = BB.sort((a,b)=>b-a)) // [89,22,7,6,5,3,3,2,1]
```
### Date object 
```javascript
let pastDay= new Date(2000,1,1,20,11,28)
let currentDay= new Date()
console.log(pastDay.getTime()); //949457488000
console.log(currentDay.getHours()); //1
console.log(pastDay); //Tue Feb 01 2000 20:11:28 GMT-0600 (Central Standard Time)
```
- Create a clock on console
```javascript
setInterval(_=>{
    now = new Date
    console.log(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`);
}, 1000)
```
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
### Event listener
Assign an event including an event [type](https://www.w3schools.com/jsref/dom_obj_event.asp) and **Callback Function**
```javascript
const header = document.querySelector('#book-list h2')
header.addEventListener('click', (e) => {
    console.log('fired!');
})
// Delete the element once click on the button
const deleteKey = document.querySelectorAll('#book-list .delete')
Array.from(deleteKey).forEach(element => {   //Convert to JS array
    element.addEventListener('click', (e) => {
        e.target.parentElement.remove()  //Remove the whole element including button
    })

})
```
## Variables
### Closure
Unlike other programming languages, in JS, you have access to variable in outer scope:
```javascript
function greet(name) {
  return function() {
    console.log("Hello, " + name + "!");
  };
}

const greetJohn = greet("John");
const greetEmily = greet("Emily");

greetJohn(); // Output: Hello, John!
greetEmily(); // Output: Hello, Emily!
```
- The closures allow the inner function to remember and access the name variable, creating personalized greetings for different names even after the outer greet function has completed execution.
- In this example, we have a greet function that takes a name parameter and returns an inner function. The inner function, when invoked, logs a greeting message to the console using the name parameter from its enclosing scope. We create two closures, greetJohn and greetEmily, by invoking the greet function with different names.
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
### JS Boolean
```javascript
"", 0, -0, NaN, null, undefined //false
" ", [], {} //true
```
### && and || rules
```javascript
0 || 0 || null || 1  //1 --Returns the first truty value if no truty value exist, it returns the last value 
'A' && 'L' && 1 && 0 && null  //0 --Returns the first falsy value if no falsy value exist, it returns the last value
```
## Object
Object is a container that encloses data & behavior together.
In JS we create objects directly and there is no ```class``` concept.
```javascript
//creating Objects using Object data type.
var myCar = new Object()
myCar.color = 'red'
myCar.age = 5
myCar.used = true
myCar.myMethod = function () {
    console.log('REZA')
}

//Shorthand for creating Objects 
var myCar2 = {
    color: 'red',
    age: 5,
    used: true,
    myMethod: function () {
        console.log('REZA');
    }
}

//If the object key has special characters like -, @, [, etc. we have to format it as 'objectKey'.
const myObject = {
    'reza-12':true,
    nik_fal:12,
    fal:'test'
}
```
### Constructor Function
- We use this function to create an **object** 
- In the normal situation it will be like this:
```javascript
function bike(name, age) {
    myObj = {};  // In common with all similar functions
    myObj.name = name;
    myObj.age = age;
    return myObj  // In common with all similar functions
}

let bik1 = bike('Reza', 34)
```
### Object & array rest properties
```javascript
const primes = [2, 3, 5, 7, 11];
const [first, second, ...rest] = primes;
console.log(first); // 2
console.log(second); // 3
console.log(rest); // [5, 7, 11]
```
```javascript
const person = {
    firstName: 'Sebastian',
    lastName: 'Markbåge',
    country: 'USA',
    state: 'CA',
};
const { firstName, lastName, ...rest } = person;
console.log(firstName); // Sebastian
console.log(lastName); // Markbåge
console.log(rest); // { country: 'USA', state: 'CA' }
```
- JavaScript provided ```new``` keyword. Once you create the object using this keyword, you can omit the **In common** lines (↑).
- Also by convention, the function name starts Capital, it is called Constructor Function.
- We use ```this``` keyword since there is no object declaration in the function.
```javascript
function Bike(name, age) {
    this.name = name;
    this.age = age;
}

let bik1 = new Bike('Reza', 34)
```
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
### Object Destructuring
```javascript
function Bike(name, age){
  this.name = name
  this.age = age
}

myBike = new Bike('Reza', 22)
let {name,age} = myBike
console.log(name) // "Reza"
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
### Loop through Properties
```javascript
var student = {
    name : "David Rayy",
    sclass : "VI",
    myFucn:()=>console.log('Reza')
};
for (const key in student) {
console.log(key);
} //name sclass myFucn
//----------------------------------
console.log(Object.keys(student)); //['name', 'sclass', 'myFucn']
console.log(Object.keys(student).toString()); //'name', 'sclass', 'myFucn'
console.log(Object.keys(student).lenght); // 3
```
## Array / String
- In JS **array is an object** with number properties.
- Since numbers are invlid prop name we have to access the prop using ```[]``` notation. 
- ```length``` is another property alog with the number props in array.
```javascript
var myString = 'JavaScript Tutorial For Beginners #24 - Strings'
console.log(myString)

console.log(myString.indexOf('Tu')) // 11
console.log(myString.slice(0, 10))    // "JavaScript"

var tags = "meat, ham, salami, prok, beef, chicken"
console.log(tags.split(', '))    // ["meat", "ham", "salami", "prok", "beef", "chicken"]

var myArray = new Array(1, 2, 3, 4, true, 'str', NaN)
console.log(myArray) //[1, 2, 3, 4, true, "str", NaN]
console.log(myArray.reverse()) //[NaN, "str", true, 4, 3, 2, 1]
console.log(myArray.sort()) //[1, 2, 3, 4, NaN, "str", true]

// Convert any number/base to INT:
console.log(parseInt("111101011001", 2)); //3929

var Arr1 = ['Reza','Matt', 'Andrew']
Arr1[5]='Fariba'
Arr1['foo']='Maneli'
console.log(Arr1)
console.log(Arr1.length)
```
- **length** does not count the ```foo``` property. ```foo``` is part of object but it is ignored as part of the array.
- Console:
```javascript
["Reza", "Matt", "Andrew", empty × 2, "Fariba", foo: "Maneli"]
0: "Reza"
1: "Matt"
2: "Andrew"
5: "Fariba"
foo: "Maneli"
length: 6
```
### splice
The splice() method changes the contents of an array by removing or replacing existing elements.
```javascript
const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
// inserts at index 1
console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, 'May');
// replaces 1 element at index 4
console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "May"]
```
### padStart/End
The padStart() / padEnd() applies padding to the start/end of the string. .
```javascript
const str1 = '5';
console.log(str1.padStart(2, '0'));
// Expected output: "05"
const fullNumber = '2034399002125581';
const last4Digits = fullNumber.slice(-4);
const maskedNumber = last4Digits.padStart(fullNumber.length, '*');
console.log(maskedNumber);
// Expected output: "************5581"
//-----------------------------------------------------------------
const str1 = 'Breaded Mushrooms';
console.log(str1.padEnd(25, '.'));
// Expected output: "Breaded Mushrooms........"
const str2 = '200';
console.log(str2.padEnd(5));
// Expected output: "200  "
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
### Function definition
```javascript
var Foo = Function Bar()
{
return 7;
};
typeof Bar();
```
### The arguments object VS Rest parameters
- The rest parameter syntax allows a function to accept an indefinite number of arguments as an array
- arguments is an array-like object accessible inside functions that contains the values of the arguments passed to that function.
```javascript
function sum(...theArgs) {
  let total = 0;
  for (const arg of theArgs) {
    total += arg;
  }
  return total;
}

console.log(sum(1, 2, 3));
// Expected output: 6
```
```javascript
function func1(a, b, c) {
  console.log(arguments[0]);
  // Expected output: 1

  console.log(arguments[1]);
  // Expected output: 2

  console.log(arguments[2]);
  // Expected output: 3
}

func1(1, 2, 3);
```
The output would be **Reference Error**. A function definition can have only one reference variable as its function name.
## call() method
- You can use call to **chain** constructors functions
- Food & Toy constructor functions, invoke Product, passing **this**, name, and price. 
```javascript
function Product(name, price) {
  this.name = name;
  this.price = price;
}
function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}
function Toy(name, price) {
  Product.call(this, name, price);
  this.category = 'toy';
}
const cheese = new Food('feta', 5);
const fun = new Toy('robot', 40);
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
## Callback Function
A **callback** function is a function that is **passed to another function** as an argument and is executed **after** some operation has been completed. 
```javascript
function modifyArray(arr, callback) {
  arr.push(100);
  callback();
}

var arr = [1, 2, 3, 4, 5];
modifyArray(arr, function() {
  console.log("array has been modified", arr);
});
```
## Check if an Object is Array
```javascript
let test = [1,2,3,4,5]
console.log(Array.isArray(test)) //true
```
## Check if two strings are anagrams 
**Mary** is an anagram of **Army**. 
```javascript
var firstWord = "Mary";
var secondWord = "Army";


var a = firstWord.toLowerCase().split('').sort().join('')
var b = secondWord.toLowerCase().split('').sort().join('')
console.log(a==b);
```
## Event Bubbling  
Once we click on **delete**, if the ```<span>``` has a callback functions, it will be fired. If not the event bubbles up to ```<li>``` element. If it has a callback functions, it will be fired. If not ...
```html
<div id="book-list">
	<h2 class="title">Books to Read</h2>
	<ul>
		<li>
			<span class="name">Name of the Wind</span>
			<span class="delete">delete</span>
		</li>
```
## SetInterval vs setTimeout  
setTimeout runs the code/function once after the timeout. setInterval runs the code/function repeatedly, with the length of the timeout between each repeat.
```javascript
var intervalID = setInterval(alert, 1000); // Will alert every second.
// clearInterval(intervalID); // Will clear the timer.

setTimeout(alert, 1000); // Will alert once, after a second.
```
## Primitive and Objects 
- The primitives are numbers, booleans, strings, symbols, and special values null and undefined
- The second category is objects. Particularly the plain object, arrays, functions, and more — are all objects.
	- If an array is your React State, pushing a new value don't changes the state becase before and after pushing, it points to the same ref of the array.
```javascript
let a = 1;
let b = a;
b = b + 2;
console.log(a); // 1
console.log(b); // 3
```
```javascript
let x = [1];
let y = x;
y.push(2);
console.log(x); // [1, 2]
console.log(y); // [1, 2]
```
