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
