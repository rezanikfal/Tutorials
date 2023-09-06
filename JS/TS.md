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
## Interface
- We use Interface to enforce a certain structure within classes or objects.
- 
```javascript
let someValue: string | undefined = "Hello, TypeScript";

// This will result in a compilation error because someValue might be undefined.
console.log(someValue.length);

// To assert that someValue is not undefined, you can use the non-null assertion operator.
console.log(someValue!.length); // No compilation error
```
