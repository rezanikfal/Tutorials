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