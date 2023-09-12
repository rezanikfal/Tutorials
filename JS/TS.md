## Types
- We can create arrays with different types.
```javascript
const mixed : (string|boolean)[] = []
```
## enum Types
- enums cannot be defined inside a class.
- An enum, short for enumeration, is a way to represent a set of named constants.
- You can assign a value to it or not:
```javascript
enum Direction {
    Up,
    Down,
    Left,
    Right
}

console.log(Direction.Up);    // Output: 0
console.log(Direction.Down);  // Output: 1
console.log(Direction.Left);  // Output: 2
console.log(Direction.Right); // Output: 3
```
```javascript
enum LogLevel {
    Error = "ERROR",
    Warning = "WARNING",
    Info = "INFO",
    Debug = "DEBUG"
}
console.log(LogLevel.Info); // Output: INFO
```
## tsconfig.json
- It is a configuration file used in TypeScript projects to specify compiler options and settings for TypeScript code.
- To create just ```project_Folder> tsc --init```
```javascript
{
  "compilerOptions": {
    "target": "ES6",
    "module": "CommonJS",
    "strict": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "esModuleInterop": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}
```
## non-null assertion operator (!) 
- Adding an exclamation mark (!) at the end of a variable is used to assert that a variable is non-null and not undefined.
```javascript
let someValue: string | undefined = "Hello, TypeScript";

// This will result in a compilation error because someValue might be undefined.
console.log(someValue.length);

// To assert that someValue is not undefined, you can use the non-null assertion operator.
console.log(someValue!.length); // No compilation error
```
## Access modifier (public, private, read only): 
- Default behavior of object elements is **public**.
- We can access **readonly** from the inside and outside of the class but not change it.
- A **shorthand** way of declaring and initializing class properties to create objects using classes is using the access modifier directly in the constructor parameters.:
```javascript
class Invoice {
  client: string;
  details: string;
  amount: number;

  constructor(c: string, d: string, a: number){
    this.client = c;
    this.details = d;
    this.amount = a;
  }
```
```javascript
class Invoice {
  constructor(
    readonly client: string, 
    private details: string, 
    public amount: number
  ){}
}
```
## Interface
- We use Interface to enforce a certain structure within **classes** or **objects**.
- Interface with **objects**:
```javascript
export interface IsPerson {
  name: string;
  age?: number;
  speak(a: string): void;
  spend(a: number): number;
}

const me: IsPerson = {
  name: 'shaun',
  //age: 30,
  speak(text: string): void {
    console.log(text);
  },
  spend(amount: number): number {
    console.log('I spent ', amount);
    return amount;
  },
};
```
- Class is a blue print of an object. When it ```implements``` an interface, it must have all of the interface properties and methods.
- Interface with **classes**:
```javascript
interface HasFormatter {
  amount: number;
  format(): string;
}

class Invoice implements HasFormatter {
  constructor(
    readonly client: string, 
    private details: string, 
    public amount: number, //removing this field and format method, causes error because of the interface
  ){}

  format() {  
    return `${this.client} owes £${this.amount} for ${this.details}`;
  }
}

let docOne: HasFormatter;
docOne = new Invoice('yoshi', 'web work', 250);
```
## Generics \<T\>
- It allow you to create reusable and flexible functions, classes, and interfaces..
- Generics with **Interface**:
```javascript
interface Box<T> {
  value: T;
}

// Create instances of the Box interface with different types
const stringBox: Box<string> = { value: "Hello" };
const numberBox: Box<number> = { value: 42 };
const booleanBox: Box<boolean> = { value: true };
```
- This allows you to create **classes** that can work with a variety of data types:
```javascript
class Box<T> {
  constructor(public value: T) {}

  getValue(): T {
    return this.value;
  }
}

const stringBox = new Box<string>("Hello");
const numberBox = new Box<number>(42);

console.log(stringBox.getValue()); // Output: Hello
console.log(numberBox.getValue()); // Output: 42
```
- This allows you to write **functions** that can operate on a variety of data types:
```javascript
function identity<T>(arg: T): T {
  return arg;
}

let output = identity("hello"); // output is of type 'string'
let output2 = identity(42);     // output2 is of type 'number'
```