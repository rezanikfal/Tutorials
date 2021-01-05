## Jasmin
- Open source testing for JS.
- It is a Behavior Driven Development testing (BDD)
- BDD focuses on more on Behavior of code instead of Implementation. So if you change the implementation, it still works.

## Karma
- Open source test runner framework for JS.
- Karma can be easily integrated in Angular project and makes it easy to execute test using Angular CLI.

## Test a Function
```JavaScript
export function Addition(num1: number, num2: number) {
  return num1 + num2;
}
```
```JavaScript
import { Addition } from "./Func1"

describe('Testing addition', ()=>{
    it('Testing addition function', ()=>{
        expect(Addition(12,33)).toBe(45)
    })
})
```
### Other Assertions
```JavaScript
const testTest = 'Browser application bundle generation complete'
const testTest2 = 'Hello World'
const array1 = ['1',2,3]
expect(testTest).toContain('a')
expect(testTest).toMatch(/[A-Z]/)
expect(testTest2).toEqual('Hello World')
expect(testTest2).not.toEqual('Hello World1')
expect(array1).toEqual(['1',2,3])
expect(array1).toContain('1')
```
## Exclude Test (In two levels)
```JavaScript
xdescribe('Testing addition', ()=>{
    xit('Testing addition function', ()=>{
        expect(Addition(12,33)).toBe(55)
    })
    it('Testing addition function', ()=>{
        expect(Addition(12,33)).toBe(45)
    })
})
```
