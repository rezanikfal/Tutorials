## Types
- We can create arrays with different types.
```javascript
const mixed : (string|boolean)[] = []
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
- A shorthand way of declaring and initializing class properties to create objects using classes is using the access modifier directly in the constructor parameters.:
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
