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

## beforeEach / afterEach
```JavaScript
export class CustomerReservationComponent {
  hotelRoomCap = 30;
  customersCount = 10;

  registerCustomer() {
    return ++this.customersCount;
  }

  unRegisterCustomer() {
    return --this.customersCount;
  }
}
```
```JavaScript
describe('Rgister Customer', () => {
  
  it('Should register and add one', () => {
    let customerService = new CustomerReservationComponent();

    let custCount = customerService.registerCustomer();
    expect(custCount).toEqual(11);
  });

  it('Should register and add one', () => {
    let customerService = new CustomerReservationComponent();

    let custCount = customerService.unRegisterCustomer();
    expect(custCount).toEqual(9);
  });
});
```
If the number of the tests rises, we cannot creat an instance of the object for every single test

```JavaScript
describe('Rgister Customer', () => {
  let customerService: CustomerReservationComponent;
  beforeEach(() => {
    customerService = new CustomerReservationComponent();
  });

  it('Should register and add one', () => {
    // let customerService = new CustomerReservationComponent();

    let custCount = customerService.registerCustomer();
    expect(custCount).toEqual(11);
  });

  it('Should register and add one', () => {
    // let customerService = new CustomerReservationComponent();

    let custCount = customerService.unRegisterCustomer();
    expect(custCount).toEqual(9);
  });
});
```
- __beforeEach__ is for initialization and setting up the pre-reqiesits for each test
- __afterEach__ is for make variables null, or removing the initialization.
- __beforeAll / afterAll__ is executed before/After All tests only once.
