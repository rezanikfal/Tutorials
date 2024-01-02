## Angular Micro Frontends with Module Federation
- Module Federation enables you to build large-scale applications by dividing them into smaller, independently deployable and developable pieces.
- The idea behind Micro Frontends is **Build once, deploy everywhere**.
## Browser Web APIs
- browser provides a wide range of Web APIs (Application Programming Interfaces) that allow web applications to interact with the browser and the underlying operating system.
- JS as the scripting language plays a crucial role to utilizes these APIs to enhance the functionality of web applications
	- DOM Manipulation APIs (like window)
   	- Network APIs (fetch, XMLHttpRequest)
   	- Storage APIs (Web Storage)
   	- Geolocation API
## npm VS npx
- When you install a package using **npm**, it gets added to a node_modules directory within your project.
- In REACT (```npx create-react-app my-app```), **npx** will download the latest version of create-react-app, use it to create the my-app project, and then discard it.
## DOM Manipulation 
- DOM Manipulation allows you to interact with the Document Object Model (DOM) to dynamically modify HTML and CSS on web pages.
- The DOM is a programming interface provided by web browsers that represents the structure of an HTML or XML document as a tree-like structure.
- DOM Manipulation involves using JavaScript to modify the content, structure, and presentation of web pages in real-time.
- It allows you to create dynamic content that updates without requiring a full page reload.
- Without JavaScript and DOM manipulation, making updates to a web page would typically require a full page reload. This was the early days of the internet.
- This is the foundation for single-page applications (SPAs) and modern web development.
## Scope & Hoisting
### Scope in JavaScript:
- Scope refers to the context in which variables are declared and accessed in a JavaScript program.
- **Global Scope**: Variables declared outside of any function or block have global scope, which means they can be accessed from anywhere in the code.
- **Local Scope:** Variables declared within a function or block have local scope. They are only accessible within that function or block.
### Hoisting in JavaScript:
- Hoisting is a behavior in JavaScript where variable and function declarations are moved to the top of their containing scope during the compilation phase, before the code is executed.
- **Variable Hoisting:** When a variable is declared using the **var** keyword.
- **Function Hoisting:** Function declarations are also hoisted to the top of the scope, making them available for use before the actual declaration in the code. 
```javascript
console.log(x); // Output: undefined
x = 5; // Variable assignment
console.log(x); // Output: 5
var x; // Variable declaration is hoisted
```
- Another sample of Scope & Hoisting
```javascript
myFunction(); // Function declarations are hoisted to the top of their containing scope.

function myFunction() {
  var localVar = "I am a local variable"; // localVar is local to myFunction
  console.log(localVar); // Output: "I am a local variable"
}

console.log(localVar); // Throws an error: localVar is not defined outside of the function's scope
```
- Class won't be hoisted like functions
```javascript
let p1 = new Person();  //ERROR:  Cannot access 'Person' before initialization
class Person { }
----------------------------------
employee(); //Works fine because of hoisting
function employee() { }
```
- Arrow function expressions, like regular function expressions, are not hoisted.
```javascript
greet(); // Throws an error: greet is not a function
var greet = function() {
  console.log("Greetings!");
};
```
```javascript
sayHi(); // Throws an error: Cannot access 'sayHi' before initialization

let sayHi = () => {
  console.log("Hi there!");
};
```
### var - let - const:
- **var** to declare variables, they have function-level scope. This means that variables declared with var are accessible throughout the entire function, including any nested functions or closures.
- On the other hand, if you use **let** or **const** to declare variables within a block (such as a loop or a conditional) inside a function, those variables will have block-level scope.
- To achieve better variable isolation within closures, it's recommended to use **let** or **const** for variable declarations, as they provide more controlled scoping behavior.
```javascript
for(var i=1; i<=5; i++){
setTimeout(function(){console.log(i)},1000)  // 6 6 6 6 6
}
-------------------------
for(let i=1; i<=5; i++){
setTimeout(function(){console.log(i)},1000)  // 1 2 3 4 5
}
```
## Asynchronous functionality in JavaScript
### Callbacks in JavaScript:
- A callback is a function that is passed as an argument to another function and is intended to be executed later, often after an asynchronous operation has completed.
- Note that we pass callback function ```fetchData(handleData)``` **NOT** ```fetchData(handleData())```
```javascript
function fetchData(callback) {
  setTimeout(() => {
    const data = "Fetched data";
    callback(data);
  }, 1000);
}

function handleData(data) {
  console.log("Handling data:", data);
}

fetchData(handleData); // Pass the handleData function as a callback
})
```
- We use the **addEventListener method** to attach the handleClick function as a **callback** to the button's 'click' event.
- Again we pass ```handleClick``` NOT ```handleClick()```
```javascript
// Get a reference to the button element
const button = document.getElementById('myButton');

// Define a click event callback function
function handleClick() {
  alert('Button clicked!');
}

// Attach the click event callback to the button
button.addEventListener('click', handleClick);
```
### Promise:
- The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
- A Promise is in one of these states:
   - pending: initial state, neither fulfilled nor rejected.
   - fulfilled: meaning that the operation was completed successfully.
   - rejected: meaning that the operation failed.
- The ```then``` and ```catch``` methods are used to handle the two possible outcomes of a promise: fulfillment and rejection. The then method is called when the promise is fulfilled, and the catch method is called when the promise is rejected.
- They provide a structured way to write code that deals with asynchronous tasks, like fetching data from a server, reading files, or any operation that doesn't immediately produce a result.
-  ```then``` takes one or two callback functions as arguments, 
   - First callback functions: when the Promise is resolved successfully.
   - Second callback functions (optional): It is executed when the Promise is rejected (an error occurs).
- The  ```catch``` method is used to handle the rejection of a Promise. It takes a single callback function as its argument.
- The  ```finally``` attach a callback that will be executed regardless of whether the promise is resolved or rejected. IT does NOT return anything
- ```then``` and ```catch``` return new promises, which allows you to chain them together and create a sequence of asynchronous operations.
```javascript
function newFunc(val) {
  return new Promise((res, rej) => {
    if (val > 10) {
      res("Success");
    } else {
      rej("err");
    }
  });
}

newFunc(5)
  .then((x) => console.log(x))
  .catch((x) => console.log(x)); //err
```
### async/await:
- **async/await** is a pair of keywords in JavaScript that simplify the process of working with asynchronous code, particularly Promises.
   - To use ```await```, you need to declare a function as ```async```.
   - We use await keyword to pause execution until a Promise is resolved.
   - For Error Handling, You can use regular try and catch blocks.
   - You can also use ```Promise.all``` to run multiple asynchronous tasks in parallel
```javascript
  const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomNumber = Math.random();
      if (randomNumber > 0.5) {
        resolve(randomNumber); // Fulfilled with the random number
      } else {
        reject(new Error("Random number is too low")); // Rejected with an error
      }
    }, 1000);
  });
  
  myPromise
    .then(result => {
      console.log("Fulfilled:", result);  //Fulfilled: 0.7706461373710447
    })
    .catch(error => {
      console.error("Rejected:", error);  // Rejected: Error: Random number is too low
    });
    .finally(() => {
      console.log("Finally block executed"); // Outputs "Finally block executed" regardless of resolution or rejection
  });

//OR removing catch

  myPromise
    .then(result => {
      console.log("Fulfilled:", result);
    }, error => {
      console.error("Rejected:", error);
    });

//OR async/await

async function fetchData() {
  try {
    const result = await myPromise;
    console.log("Fulfilled:", result);
  } catch (error) {
    console.error("Rejected:", error);
  } 
}

fetchData();
```
### AJAX & Fetch:
- **AJAX** stands for Asynchronous JavaScript and XML, is a technique used in web development to make asynchronous requests and update parts of a web page without requiring a full page reload.
- fetch is a built-in web API **function** in JavaScript that allows you to make network requests.
- It returns a **Promise** that resolves to the Response object.
- fetch function only rejects the Promise when there's a network error. It won't reject the Promise for HTTP error statuses (like 404 or 500).
- fetch internaly uses ```XMLHttpRequest``` to make a API call.
- ```XMLHttpRequest``` (often abbreviated as **XHR**) is a **browser**-based API in JavaScript that allows you to make HTTP or HTTPS requests to retrieve data from a web server and send data to it.
```javascript
fetch(url)
  .then(response => {
    // Check if the response status is OK (200)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the response body as JSON
  })
  .then(data => {
    // Process the data received from the server
    console.log(data);
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Fetch error:', error);
  });

//OR async/await

async function fetchData(url) {
  try {
    const response = await fetch(url);

    // Check if the response status is OK (200)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json(); // Parse the response body as JSON
    console.log(data); // Process the data received from the server
  } catch (error) {
    console.error('Fetch error:', error); // Handle any errors that occurred during the fetch
  }
}

fetchData(url);

```
### Event Listeners:
- For asynchronous operations related to user interactions (e.g., button clicks), you often use event listeners to handle the events and perform actions asynchronously.
- Inside the callback function, you can perform various asynchronous actions, such as making network requests (using fetch)
```javascript
const button = document.getElementById('myButton');

button.addEventListener('click', async () => {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('An error occurred:', error);
  }
});
```
## Methods/Properties
- Check if a var is number: ```typeof(x) == "number"```
- ```B.sort()``` is from Small to big, to reverse it use ```B.sort().reverse()```
- Print the current web page: ```window.print()```
- Check if an elements is in an array: ```outcome.includes(x)```
- Fix to 4 digits: ```(1.65).toFixed(4) // 1.6500```
- The Math.ceil() static method always rounds up: ```Math.ceil(-7.004) // -7```
- he Math.floor() static method always rounds down: ```Math.floor(5.95) // 5```
- The Math.round() static method returns the value of a number rounded to the nearest integer: ```Math.round(5.95), Math.round(5.5), Math.round(5.05) // 6 6 5```
- Create random number between 0-199 (including 0 & 199): ```Math.floor((Math.random()*200))```
- Get e letter in a string: ```myLetter = 'Reza Nikfal'.charAt(6).toUpperCase() //I```
- Convert ['a', 'reza', 15] to "a,reza,15": ```['a', "reza", 15].toString()```
- **FKT** rule, Filter Keeps True!
- **lorem**22 creates dummy text with 22 words in **VsCode**. It works in JS & HTMl
- **Remove Duplicates** from an array:
```javascript
const noDuplicate = arr.filter((x,i)=>{
    return arr.indexOf(x) == i
})
```
- The **substring()** method returns the part of the string (substring is all **lower case**):
- Using **slice()** to add a new elements to an array at any index:
```javascript
const colors = ['red', 'green'];
const index = 1
const updatedColors = [
  ...colors.slice(0, index),
  'blue',
  ...colors.slice(index),
];

  //[ 'red', 'blue', 'green' ]
```
- The **slice()** method returns the part of an array/string - **The Second Number is not included in both methods**:
```javascript
const str = 'Mozilla';
console.log(str.substring(1, 3)); // expected output: "oz"
})
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
console.log(animals.slice(2, 4)); // expected output: Array ["camel", "duck"]
```
- Using **slice()** to create a shallow copy of the array because it is Reference Type (Non-Primitive):
```javascript
const numbers = [1, 2, 10, 8, 3, 5];
const numbers2 = numbers.slice().sort((a, b) => a - b);

console.log(numbers); /[1, 2, 10, 8, 3, 5]
console.log(numbers2); /[1, 2, 3, 5, 8, 10]
```
- Create all substrings using **slice()** :
```javascript
const myStr = "abqzwtolcbtrst"
stringLength = myStr.length;
for (let index = 0; index < stringLength; index++) {
  for (let i = 1; i < stringLength + 1; i++) {
    subStr = myStr.slice(index, i);
  }
}
```
- The **some()** to check if there are ```id:1``` at least in one object in the array of objects:
- The **find()** to return the object member with ```id:2```:
```javascript
const allProducts = [
    {
        "name": "apple",
        "price": 1,
        "id": 1,
        "prics": null
    },
    {
        "name": "orange",
        "price": 2,
        "id": 2
    },
    {
        "name": "banana",
        "price": 3,
        "id": 3
    }
]

 if (allProducts.some((x) => x.id == 1)) { ...} //true
product = allProducts.find((p) => p.id == 2); // {name: 'orange', price: 2, id: 2}
```
- **Alternative to Break on ForEach loop**
- ```every()``` will stop iterating the moment the callback function returns **false**.
- ```some()``` will stop iterating the moment the callback function returns **true**.
```javascript
const array = [1, 2, 3, 4, 5];

array.some((element, index) => {
  if (element === 3) return true; // Stops iterating when element is 3
  console.log(element);
  return false;
});
```
- The **flat()** method creates a new array with all sub-array elements:
```javascript
var A = [1, [2], [3, [[4]]],[5,6]]
console.log(A.flat(2)); //[1, 2, 3, [4], 5, 6]
console.log(A.flat(Infinity)); //[1, 2, 3, 4, 5, 6]
```
- The **Array.from** generates a sequence of numbers using this trick:
```javascript
Array.from({ length: 5 }, (v, i) => i).map(x=>console.log(x))
```
- The **trim()** removes extra white spaces from both sides of a string
```javascript
const Str = "  Reza NNikf   www  "
console.log(Str.trim())    //Reza NNikf   www
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
- **sort()** function converts numbers to string before sorting
```javascript
let BB = [1,2,3,22,5,6,7,89,3]
var sort1 = BB.sort() // [1,2,22,3,3,5,6,7,89] Sorts as string
var sort1 = BB.sort((a,b)=>a-b)) // [1,2,3,3,5,6,7,22,89]
var sort1 = BB.sort((a,b)=>b-a)) // [89,22,7,6,5,3,3,2,1]
```
- If the functions creates random + or - numbers, it scrambles the array:
```javascript
arr.sort(()=>Math.random()-0.5)
```
- **reduce()** function is used to process an array and return a **single value**.
```javascript
const A  = [2,3,4,3,4,5,6,7,6,5,76,7,9,7,6,4]
A.reduce((acc, x, i)=>i==A.length-1?(x+acc)/(i+1):x+acc,0) // 9.625
```
- It iterates over each element of the array and accumulates a final result.
```javascript
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);
console.log(sum); // Output: 15
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
### Optional chaining operator (?) 
- ```myObject?.list``` means that the ```list``` property will be accessed from myObject only if myObject **is not** null or undefined
- If myObject **is** null or undefined, then it will not attempt to access list and will return **undefined** instead.
- In this example, it return myObject?.list. If myObject is **null** or **undefined**, It will return the default value:
```javascript
```myObject?.list``` || 'Select an Item'
```
## DOM
### querySelector (Return Nodes)
- Nodes represent various parts of an HTML document, such as elements, attributes, text, comments,...
- The Node interface is the primary building block in the DOM
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

```javascript
<h1>
  <div class="myhOne">Some content</div>
</h1>

const hh = document.querySelectorAll('h1 .myhOne ')
------------------------------------------------------
<h1 class="myhOne">Some content</h1>

const hh = document.querySelectorAll('h1.myhOne ')
```
### getElementsBy ... (Return HTMLCollection)
- Almost everything in HTML page is a Node like elements, attributes, ... with different [types](https://www.w3schools.com/jsref/prop_node_nodetype.asp#midcontentadcontainer)
- HTMLElement represents an HTML element, such as `<div>, <p>, <a>`, and other HTML tags.
- HTMLElement provides properties and methods specific to HTML elements, such as innerHTML, style, getAttribute(), setAttribute(), and more.
```javascript
const banner = document.getElementById('page-banner')
const banner = document.getElementsByClassName('myClass')
const banner = document.getElementsByTagName('p')
const banner = document.getElementsByName('myInputName')

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
- A closure gives you access to an outer function's scope from an inner function. So basically after execution of the outer function, the inner function can remember the scope (e.g. if there are any variables in the outer function the inner function can access them)
```javascript
function adder(a) {
  return function (b) {
    return a + b
  }
}
add5 = adder(5)
console.log(add5(10)) //15
```
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
- It looks like N/A in a form. In other words, having no value for a variable.
### typeof
Since the variable type in JS is inconstsnt, we can use ```typeof``` anytime we need the var type:
```javascript
var a;
console.log(typeof(a)) // undefined
a = 12;
console.log(typeof(a)) // number
a = 'Reza';
console.log(typeof(a)) // string
a = null;
console.log(typeof(a)) // object
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
```javascript
var foo = 10;  
foo == 10 && doSomething(); // is the same thing as if (foo == 10) doSomething(); 
foo == 5 || doSomething(); // is the same thing as if (foo != 5) doSomething();
```
# Object
## ES6 and object literal
-  Using space and variable as object key:
```javascript
let In = "last name";
let person = {
    "first name": "Chandler",
    [In]: "Bing"
};
console.log(person["first name"]); //"Chandler" (cannot use person.first name)
```
-  In ES6 there is 2 shortcuts for object properties and functions **(Notice the function)**:
```javascript
let firstname = "Chandler";
let lastname = "Bings";
let age = 55;

//ES-5
let person = {
    firstname: firstname,
    lastname: lastname,
    isSenior: function () {
        return age > 30
    }
};

//ES-6
let person = {
    firstname,
    lastname,
    isSenior() {
        return age > 30
    }
};
```
## "This" keyword
-  In JavaScript, the value of the this keyword refers to the context within which a function is executed. It can be thought of as the "owner" or the "container" of the current function's scope.
-  Using an arrow function, retains the context of this from the surrounding scope.
```javascript
var obj = {
    id: 1,
    printId: ()=>{
        console.log(this); // Window object
    }
};
obj.printId()
```
```javascript
var obj = {
    id: 10,
    printId: function () {
        console.log(this.id); // 10
    }
};

obj.printId()
```
```javascript
function globalFunction() {
    console.log(this); // Window object
  }
  
  globalFunction();
```
## Object Oriented Programming in JS
In JavaScript, objects are a fundamental concept used to store and organize data and functionality. An object can contain both properties (data) and methods (functions) that operate on that data. This combination of data and functions makes objects a versatile way to model real-world entities in code.
1.  **Objects**: Objects are instances of classes or instances created using constructor functions. They can hold both properties (data) and methods (functions) that operate on the data.
- When using an **object literal** to create objects in JavaScript, you do not need to use a constructor function (person1). An object literal is a way to define and initialize an object all at once, using curly braces.
- We can create objects using constructor function and methods using prototype (Person1)
- We can create objects using using class (Person2)
2.  **Functions as Methods**: Functions can be added to objects as methods. These methods can access and modify the object's properties. When a method is called on an object, the object becomes the context (referred to as 'this') within the method.
- Function: A function is a self-contained block of code that performs a specific task. It can be defined globally or within a specific scope, and it can take parameters and return values. When you define a **function as part of an object**, it becomes a method of that object.
- Method: A method is a function that is associated with an object or a class. When a function is defined within the context of a class or an object instance, it's often referred to as a method. Methods are used to define the behavior or actions that an object or class can perform.
    
3.  **Classes**: Classes are a way to define blueprints for creating objects with specific properties and methods. They encapsulate the object's structure and behavior. Classes can include constructor methods, instance methods, and static methods. **Function inside class** is indeed a method of the class.
```javascript
const person1 = {
    name: 'Reza',
    lastName: 'Nikfal',
    age: 23,
    addAge: function () {
        this.age++
    }
}
person1.addAge()
console.log(person1.age);

function Person1(name, lastName, age) {
    this.name = name,
    this.lastName = lastName,
    this.age = age
}
Person.prototype.addAge = function () {
    this.age++
}

class Person2 {
    constructor(name, lastName, age) {
       this.name = name,
       this.lastName = lastName,
       this.age = age
    }
    addAge() {
        this.age++;
    }

//Basically methods looks like the ES6 version of JS functions in Objects:
//  addAge:function() {
//      this.age++;
//  }

//So this one works as well:
    addAge = function() {
        this.age++;
    }
}
const person2 = new Person1('Reza', 'Nik', 44)
const person2 = new Person2('Reza', 'Nik', 44)
person2.addAge(4)
console.log(person2.age);
```
### 3 types of methods in class
```javascript
class Person {
    constructor(name) {  // constructor methos which is called during object creation
        this.pName = name
    }
    static myMethod(test) {  //Can be directly called with the help of class not the object
        console.log("Hello" + test);
    }
    greet() {  // prototype method that can be called with each object
        console.log(this.pName);
    }
}

const p1 = new Person("Reza")
Person.myMethod(" Ali") // no need to an inatance of class (object)
p1.greet()
console.log(typeof (p1));  // Class creats an object
```
## JS object & JSON
- Serialization and deserialization of JSON. It is converting a object into a JSON and vice versa.
- Serialization involves converting a data structure into a format that can be easily stored or transmitted like a string.
- ```JSON.stringify()``` in JavaScript, is serializing the data from an object (which exists in memory as a complex data structure) into a format that can be easily saved to a file (JSON).
```javascript
var person = {name :'Saad', age : 26, department : {ID : 15, name : "R&D"} }; 
var stringFromPerson = JSON.stringify(person); 
// stringFromPerson is equal to "{"name":"Saad","age":26,"department":{"ID":15,"name":"R&D"}}"   */ 
var personFromString = JSON.parse(stringFromPerson);  
// personFromString is equal to person object
```
- Loop through an object
```javascript
const person1 = {
  name: 'Alice',
  age: 30,
  profession: 'Engineer'
};

for (var key in person1) {  
console.log(key ,',',person1[key]) 
}
// name , Alice
// age , 30
// profession , Engineer
```
- In JavaScript, an object is a composite data type that allows you to store and organize related data and functions together.
- Object is a container that encloses data & behavior together.
- Objects are key-value pairs, where each key is a property name and each value can be any data type, including other objects or functions.
- In JS we create objects directly and there is no ```class``` concept.
- Objects can be created using object literals or constructors.
```javascript
//creating Objects using Object data type.
var myCar = new Object()
myCar.color = 'red'
myCar.age = 5
myCar.used = true
myCar.myMethod = function () {
    console.log('REZA')
}

//Shorthand for creating Objects (using an object literal)
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
### Remove / Change properties in an object
```javascript
const fruit ={
  color: 'red',
  name: 'apple',
}
const updatedFruit = {
 ...fruit,
 color: 'newColor',
};
console.log(updatedFruit)  // { color: 'newColor', name: 'apple' }
```
```javascript
const fruit ={
  color: 'red',
  name: 'apple',
}
const { color, ...rest } = fruit;
console.log(rest)   // { name: 'apple' }
```
### Spread vs Rest operators
- Both have the same (...) sign
- Rest means convert individual elements to an array in function declaration.
- Spread means convert an array of elements to individual elements in function call.
```javascript
let displayColors = function (message, ...colors){
console.log(colors);  //  (Rest) ['Orange', 'Yellow', 'Indigo']
}

let colorArray = ['Orange', 'Yellow', 'Indigo'];
displayColors ("my Message", ...colorArray) // (Spread) displayColors (message, 'Orange', 'Yellow', 'Indigo')
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
### Loop through Properties / Values:
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
var newK = Object.keys(student);
console.log(newK); //['name', 'sclass', 'myFucn']
//----------------------------------
console.log(Object.keys(student)); //['name', 'sclass', 'myFucn']
console.log(Object.keys(student).toString()); //'name', 'sclass', 'myFucn'
console.log(Object.keys(student).lenght); // 3
```
```javascript
const person1 = {
  name: 'Alice',
  age: 30,
  profession: 'Engineer'
}; 
console.log(Object.values(person1)) //[ 'Alice', 30, 'Engineer' ]
```
### Prototypes:
- The prototype is an object from which the current object inherits properties and methods. 
- JavaScript first checks if that property or method exists directly on the object. If it doesn't, JavaScript looks up the prototype chain to find the property or method on the prototype of the object.
- **Memory Efficiency**:
	- When you define a method directly within a constructor, every instance created by that constructor will have its own copy of the method. This can consume a lot of memory.
	- By placing methods on the prototype, all instances share a single copy of the method in memory
```javascript
// NO prototype
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.fullName = function() {return this.firstName + " " + this.lastName;};
}

// With prototype
function Person2(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person2.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

const person1 = new Person1("John", "Doe");
const person2 = new Person2("Jane", "Smith");

console.log(person1.fullName()); // Outputs: "John Doe"
console.log(person2.fullName()); // Outputs: "Jane Smith"
```
## Array / String
- Truncate an array using length:
```javascript
var myArray = [12 , 222 , 1000 , 124 , 98 , 10 ];  
myArray.length = 4; // [12 , 222 , 1000 , 124]
```
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
function showArgumentsBetter(...args) {
  console.log(args);
}
showArgumentsBetter('apple', 'banana', 'cherry');   //[ 'apple', 'banana', 'cherry' ]
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
## Get the max or the min in an array of numbers
```javascript
var  numbers = [5, 458 , 120 , -215 , 228 , 400 , 122205, -85411]; 
var maxInNumbers = Math.max(...numbers);  //122205
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
- Every time an event occurs on an element in the DOM, it has the potential to propagate or "bubble" up through the parent elements in the hierarchy, triggering event handlers on those parent elements.
- You can prevent it by using a method called **stopPropagation()** on the event object.
```html
<body>
  <table id="outside">
    <tr>
      <td id="t1">one</td> //If click here : Click on inside t1
    </tr>
    <tr>
      <td id="t2">two</td> //If click here : Click on inside t2  Outside event
    </tr>
  </table>
</body>
```
```javascript
const el = document.getElementById("outside");
const e2 = document.getElementById("t1");
const e3 = document.getElementById("t2");

el.addEventListener("click", outsideFunc);
e2.addEventListener("click", insideFunc);
e3.addEventListener("click", insideFunc2);

function insideFunc(e){
  e.stopPropagation()
  console.log('Click on inside t1')
}

function insideFunc2(){
  console.log('Click on inside t2')
}

function outsideFunc() {
console.log('Outside event')
}
```
## SetInterval vs setTimeout  
setTimeout runs the code/function once after the timeout. setInterval runs the code/function repeatedly, with the length of the timeout between each repeat.
```javascript
var intervalID = setInterval(alert, 1000); // Will alert every second.
// clearInterval(intervalID); // Will clear the timer.

setTimeout(alert, 1000); // Will alert once, after a second.
```
## Primitive and Objects 
- **Primitive Types** in JavaScript are the most basic data types that represent single values. 
- **Non-primitive** types, also known as composite types, are more complex data structures that can hold multiple values.
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
## Create a JS object key from a variable
To use a variable as an object key, just put it in []:
```javascript
a = 'test'
c={[a]:'Reza'}
console.log(c); // {test:'Reza'}
```
## Wrap the object keys with "":
Here are some cases where you should wrap the object keys:
```javascript
const myObject = {
  'first-name': 'John',
  '1': 'One',
  'class': 'Computer Science',
  'last name': 'Doe',
};
```
## Create a JS for loop inline
To generate an array with a number of elements just to use the index:
```javascript
const time = 6
const boxes = Array(time).fill(0).map((_,i)=>i)
console.log(boxes); // [0, 1, 2, 3, 4, 5]
```
## pre Element
It is similar to p tag (paregraph element). However the outcome text font looks like code.
```html
<pre>This is a piece of code</pre>
<p>This is a piece of code</p>
```
<pre>This is a piece of code</pre>
<p>This is a piece of code</p>

## Number()
- How to make sure just one variable out of multiple is true?
- Number(undefined) is **NaN** so we have to convert it to boolean using **"!!"**
```javascript
const A = true
const B = undefined
const C = false
const D = true
const sum = Number(A) + Number(!!B) + Number(C) + Number(D)  // 1+0+0+1
outcome = sum==1 ? true : false   // false
```

## String()
- It converts anything to string
- We can use (+'') instead:
```javascript
String(undefined)   //'undefined'
null + ''           // 'null'
1+''                //'1'
```
## Nullish coalescing operator(??)
- If **someValue** is neither **null** nor **undefined**, the operator returns **someValue**.
- Otherwise the operator returns the **defaultValue**.
- the Nullish coalescing operator (??) specifically checks for **null or undefined**.
- It does **NOT** work for other falsy values like false, 0, '' or NaN.
```javascript
const result = someValue ?? defaultValue;
```
## JavaScript `||` and `&&` operators
- `||` evaluates expressions from left to right and returns the value of the first truthy expression it encounters. If all expressions are falsy, it returns the value of the **last expression**..
- `&&` operator evaluates expressions from left to right and returns the value of the first falsy expression it encounters. If all expressions are truthy, it returns the value of the **last expression**.
```javascript
true && "Hello" && 42 && "";    // ""
null || "Hello" || 42 || "";    // "Hello"
```
## Form + input
- If we wrap a input tag in HTML with ```<form>```, by enter key it submits the input value as query string to the URL and refreshes the page.
- For the following it refreshes the page with this: ```myapp.com?email=XXXXXX & password=XXXX```
```html
<form>
<input name = "email" />
<input name = "password" />
<button> Submit <button />
</form>
```
