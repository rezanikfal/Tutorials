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
### Objest
- In JS we create objects directly and there is no ```class``` concept.
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
