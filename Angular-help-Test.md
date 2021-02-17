## Testing Framework
### Jasmin
- Open source testing for JS.
- It is a Behavior Driven Development testing (BDD)
- BDD focuses on more on Behavior of code instead of Implementation. So if you change the implementation, it still works.

### Karma
- Open source test runner framework for JS.
- Karma can be easily integrated in Angular project and makes it easy to execute test using Angular CLI.

### Arrange / Act / Assert (AAA)
- AAA is common standard for writing the unit test cases.
- __Arrange__: Arrange to setup the unit test case, like creating the objects, initializing/mocking data etc..
- __Act__: Act on your unit test case, meaning execute necessary functionality/methods that needs to be unit tested.
- __Assert__: This part verifies the functionality/method that we are unit testing is giving the result as per expectation.
```JavaScript
describe('Room Reservation', () => {
  it('Testing Room is reserved or not', () => {
    // Arrange
    let custReserve = new CustomerReservationComponent();
    // Act
    let isReserved = custReserve.reserveRoom();
    //Assert
    expect(isReserved).toBeTruthy()
  });
});
```
### Test a Function
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
