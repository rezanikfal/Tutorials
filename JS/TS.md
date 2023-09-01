## DOM Manipulation 
- DOM Manipulation allows you to interact with the Document Object Model (DOM) to dynamically modify HTML and CSS on web pages.
- The DOM is a programming interface provided by web browsers that represents the structure of an HTML or XML document as a tree-like structure.
- DOM Manipulation involves using JavaScript to modify the content, structure, and presentation of web pages in real-time.
- It allows you to create dynamic content that updates without requiring a full page reload.
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
