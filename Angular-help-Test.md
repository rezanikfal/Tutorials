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
### Test Types
- __Unit Test,__ Tests the logic of the model
- __Integration Test,__ Tests the integration of the model with its template

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
## Test Services using SpyOn method
Using SpyOn method we can change a method on a class so that:
- Change the implementation of the method
- if the mothod has been called
- return a different value
- throw an error
```JavaScript
export class TodosComponent implements OnInit {
  todos: any[] = [];
  message;
  constructor(private service: TodoService) { }

  ngOnInit(): void {
    this.service.getTodos().subscribe(t => this.todos.push(t));
  }

  add() { 
    var newTodo = { title: '... ' };
    this.service.add(newTodo).subscribe(
      t => this.todos.push(t),
      err => this.message = err);
  }

  delete(id) {
    if (confirm('Are you sure?'))
      this.service.delete(id).subscribe();
  } 
}
```
```JavaScript
import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';
import { EMPTY, of, throwError } from 'rxjs';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService(null)
    component = new TodosComponent(service)
  });
```
### Test ngOnInit
```JavaScript
  it('should set todos property with the item returned from the server', () => {
    spyOn(service, "getTodos").and.callFake(() => {
      return of(1, 2, 3)
    })

    component.ngOnInit()
    expect(component.todos.length).toBeGreaterThan(0);
    expect(component.todos.length).toBe(3);
    expect(component.todos).toEqual([1, 2, 3]);
  });
```
### Test calling the server
```JavaScript
  it('should call the server to save the changes when new item is added', () => {
    let spy = spyOn(service, "add").and.callFake(t => {
      return EMPTY
    })
    component.add()
    expect(spy).toHaveBeenCalled()
  });
```
### Test returning data by a function in the service
```JavaScript
  it('should add the new todo returned from the server', () => {
    let todo = { id: 1 }
    // let spy = spyOn(service, "add").and.callFake(t => {
    //   return of(todo)
    // })
    spyOn(service, "add").and.returnValue(of(todo))
    component.add()
    expect(component.todos).toContain(todo)
    expect(component.todos.indexOf(todo)).toBeGreaterThan(-1)
  });
```
### Test returning Error Message by a function in the service
```JavaScript
  it('should set the message property if server returns error', () => {
    let error = 'Error from the server'
    spyOn(service, "add").and.returnValue(throwError(error))
    component.add()  
    expect(component.message).toBe(error)
  });
```
### Put Spy on the Confirmation Window (Test Delete method)
```JavaScript
  it('should call the server to delete a todo if the user confirms', () => {
    spyOn(window, "confirm").and.returnValue(true)
    let spy = spyOn(service, "delete").and.returnValue(EMPTY)
    component.delete(1)  
    expect(spy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalledWith(1)
  });

  it('should NOT call the server to delete a todo if the user cancels', () => {
    spyOn(window, "confirm").and.returnValue(false)
    let spy = spyOn(service, "delete").and.returnValue(EMPTY)
    component.delete(1)  
    expect(spy).not.toHaveBeenCalled()
    expect(spy).not.toHaveBeenCalledWith(1)
  });
});
```
## Integration Test
- You cannot create an instance of the model like before. Angular does it for you.
- We use Integration Test when we need to test any kind of __binding__ (i.e. Property, Event, style, and Class binding).
### Model
```JavaScript
export class VoterComponent {
  @Input() othersVote = 0;
  @Input() myVote = 0;

  @Output() vote = new EventEmitter();

  upVote() {
    if (this.myVote == 1)
      return;
    this.myVote++;
    this.vote.emit({ myVote: this.myVote });
  }
  
  downVote() {
    if (this.myVote == -1)
      return;
    this.myVote--;
    this.vote.emit({ myVote: this.myVote });
  }

  get totalVotes() {
    return this.othersVote + this.myVote;
  }
}
```
### Markup
```htm
<div class="voter">
    <i 
        class="glyphicon glyphicon-menu-up vote-button"
        [class.highlighted]="myVote == 1" 
        (click)="upVote()"></i>
        
    <span class="vote-count">{{ totalVotes }}</span>
    
    <i 
        class="glyphicon glyphicon-menu-down vote-button"
        [class.highlighted]="myVote == -1" 
        (click)="downVote()"></i>
</div>
```
### Property and Class Binding
```JavaScript
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { VoterComponent } from './voter.component';

describe('VoterComponent', () => {
  let component: VoterComponent;
  let fixture: ComponentFixture<VoterComponent>;
```
- Create a dynamic testing module:
```JavaScript
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ VoterComponent ]
    })
```
- Creating  __Component fixture__ which is a wrapper around the component instance. 
  - Using Fixture we have access to the component __Model & Template__.
  - We can create the component class instance.
  - Get DOM Element using ```debugElement``` or ```nativeElement```
  - Run Change Detection manually
  - Get Injected dependencies.
```JavaScript
    fixture = TestBed.createComponent(VoterComponent);
    component = fixture.componentInstance;
  });
```
- ```fixture.debugElement.query()``` takes a __predicate__. A predicate is a function that takes one item as input and returns either true or false based on whether the item satisfies some condition.
- Using __By__ class we Predicates for use with DebugElement's query functions.
```JavaScript
  it('should render total vote', () => {
    component.othersVote = 20
    component.myVote = 1
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.vote-count'))
    let el: HTMLElement = de.nativeElement

    expect(el.innerText).toBe(String(21));
  });
```
- Also we have access to the classes directly from ```fixture.debugElement```
```JavaScript
  it('should highlight the upvote button if I have upvoted', () => {
    component.myVote = 1
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.glyphicon-menu-up'))

    expect(de.classes['highlighted']).toBeTruthy();
  });
});
```
- Test click event handler
```JavaScript
  it('should increase total vote when I click the upvote button', () => {

    let button = fixture.debugElement.query(By.css('.glyphicon-menu-up'))
    button.triggerEventHandler('click', null)
    expect(component.totalVotes).toBe(1);
  });
});
```
