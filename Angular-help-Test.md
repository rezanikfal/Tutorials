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
## Test a Method / Event Emitter in an Angular Component
If there are several __it__ in a test suit, We can use __befoeEach__ to do someting before each Assertion:
```JavaScript
export class VoteComponent implements OnInit {
  
  totalVotes = 0
  voteChange = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }
  upVote() {
    this.totalVotes++
    this.voteChange.emit(this.totalVotes)
  }
  downVote() {
    this.totalVotes--
  }
}
```
```JavaScript
import { VoteComponent } from './vote.component';

describe('VoteComponent', () => {
  let component: VoteComponent

  beforeEach(() => component = new VoteComponent)

  it('should increment total vote when upvothed', () => {
    component.upVote()
    expect(component.totalVotes).toBe(1);
  });

  it('should decrement total vote when downvothed', () => {
    component.downVote()
    expect(component.totalVotes).toBe(-1);
  });
  it('should decrement total vote when downvothed', () => {
    component.downVote()
    expect(component.totalVotes).toBe(-1);
  });

  it('should raise voteChanged event when upvoted', () => {
    let totalVote=undefined
    component.voteChange.subscribe(tv => totalVote = tv)
    component.upVote()
    expect(totalVote).toBe(1);
    expect(totalVote).not.toBeNull()
  });
});
```
## Test Forms
```JavaScript
export class TodoFormComponent {
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('')
  })
}
```
```JavaScript
import { TodoFormComponent } from './todo-form.component';

describe('TodoFormComponent', () => {

  let formComponent: TodoFormComponent
  beforeEach(() => {
    formComponent = new TodoFormComponent
  })

  it('should create form with two controls', () => {
    expect(formComponent.form.contains('name')).toBeTruthy();
    expect(formComponent.form.contains('email')).toBeTruthy();
  });

  it('should make the name control required', () => {
    let control = formComponent.form.get('name')
    control.setValue('')
    expect(control.valid).toBeFalsy();
  });
});
```
## Test Services by SpyOn method
Using SpyOn methos we can change a method (i.e. getTodos) on a class (i.e. service) as follows:
- Change the implementation of the method
- the mothod has been called
- return a different value
- throw an error
```JavaScript
test
```
