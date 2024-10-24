### Introduction
- In terms of Jasmine, a test consists of one or more `suites`.
- A suite is declared with a `describe` block:
```JavaScript
describe('Suite description', () => {
  /* … */
});
```
- `describe` is a function that takes two parameters.
  - A string with a human-readable name.
  - A function containing the suite definition.
- describe blocks can be nested to structure big suites
```JavaScript
describe('Suite description', () => {
  describe('One aspect', () => {
    /* … */
  });
  describe('Another aspect', () => {
    /* … */
  });
});
```
- Each `suit` consists of one or more `specifications` or short, `specs`.
- A `spec` is declared with an `it` block:
```JavaScript
describe('Suite description', () => {
  it('Spec description', () => {
    /* … */
  });
  /* … more specs …  */
});
```
- testing code typically consists of three phases: `Arrange`, `Act` and `Assert`.
- `it('resets the count', /* … */)` for the `CounterComponent`:
- **Arrange**:
  - Create an instance of CounterComponent.
  - Render the Component into the document.
- **Act**:
  - Find and focus the reset input field.
  - Enter the text “5”.
  - Find and click the “Reset” button.
- **Assert**:
  - Expect that the displayed count now reads “5”.
- In Behavior-Driven Development (BDD), the three phases of a test are called `Given, When and Then`.
- toBe (compare the actual value) vs toEqual (deep equality of two objects):
```JavaScript
// Fails, the two objects are not identical
expect({ name: 'Linda' }).toBe({ name: 'Linda' });

// Passes, the two objects are not identical but deeply equal
expect({ name: 'Linda' }).toEqual({ name: 'Linda' });
```
- Jasmine provides four functions: `beforeEach`, `afterEach`, `beforeAll` and `afterAll` for **Repetitive Setup**:
```JavaScript
describe('Suite description', () => {
  afterEach(() => {
    console.log('Called after each spec is run');
  });

  it('Spec 1', () => {
    console.log('Spec 1');
  });
});
```
- if you want Jasmine to run only this test suite and skip all others, change `describe` to `fdescribe`:
- If you want Jasmine to run only one spec, change `it` to `fit`:
```JavaScript
fdescribe('Example spec', () => {
  it('one spec', () => { /* … */ });
  it('another spec', () => { /* … */ });
});
```
```JavaScript
describe('Example spec', () => {
  fit('one spec', () => { /* … */ });
  it('another spec', () => { /* … */ });
});
```
### Faking dependencies
- You need to decide between an integration test and a unit test.
  - The integration test includes (“integrates”) the dependencies.
  - the unit test replaces the dependencies with fakes in order to isolate the code under test.
- `test doubles`, `stubs(stubbing)`, `mocks(mocking)`, and **fakes** or **faking** are similar terms.
- Dependency is a **function** ➔ the fake must have the same **parameters** and **return** value.
- Dependency is a **object** ➔ the fake must have the same **methods** and **properties**.
- The fake needs to be **equivalent to the original** as far as the code under test is concerned.
- The biggest **danger** of creating a fake is that it does not properly mimic the original and gets out of sync later when the original is changed.
- To prevent any possible divergence, we can use TypeScript to enforce that the fake has a **matching type**.
### Testing Components
#### TestBed
- Angular team provides the TestBed to ease unit testing. It comes with a testing Module that is configured like normal Modules.
```JavaScript
TestBed.configureTestingModule({
  imports: [ /*… */ ],
  declarations: [ /*… */ ],
  providers: [ /*… */ ],
});
```
- Testing a single **component**. It should be compiled after declaration in the Testing Module:
```JavaScript
TestBed
  .configureTestingModule({
    declarations: [CounterComponent],
  })
  .compileComponents();
```
- The **ComponentFixture** holds the Component and provides an interface to both the **Component** instance and the **rendered DOM**.
- beforeEach is marked as an **async** function. It is because compileComponents is an asynchronous operation.
- In testing code, we have to trigger the **change detection** manually.
```JavaScript
describe('CounterComponent', () => {
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    fixture.detectChanges();
  });

  it('…', () => {
    /* … */
  });
});
```
#### fixture
- The fixture references the Component instance via the **componentInstance**.
- It is mainly used to set **Inputs** and subscribe to **Outputs**, for example:
```JavaScript
// This is a ComponentFixture<CounterComponent>
const component = fixture.componentInstance;
// Set Input
component.startCount = 10;
// Subscribe to Output
component.countChange.subscribe((count) => {
  /* … */
});
```
- The fixture’s **debugElement** property returns the Component’s host element.
- The **DebugElement** offers handy properties like properties, attributes, classes and styles to examine the DOM element itself.
```JavaScript
const { debugElement } = fixture;
const { nativeElement } = debugElement;
console.log(nativeElement.tagName);
console.log(nativeElement.textContent);
console.log(nativeElement.innerHTML);
```
- Every **DebugElement** features the methods **query** and **queryAll** for finding descendant elements (using `By.css('…')`)
#### Test ids
- The test ids help to find the element by a feature that never changes and that bears no additional meaning.
```htm
<button (click)="increment()" data-testid="increment-button">+</button>
```
```JavaScript
const incrementButton = debugElement.query(
  By.css('[data-testid="increment-button"]')
);
```
#### Triggering event handlers
- `DebugElement` has a useful method for firing events: `triggerEventHandler`.
- Test that click inceriments the count:
```JavaScript
  it('increments the count', () => {
    // Act
    const incrementButton = debugElement.query(
      By.css('[data-testid="increment-button"]')
    );
    incrementButton.triggerEventHandler('click', null);
    // Re-render the Component
    fixture.detectChanges();

    // Assert
    const countOutput = debugElement.query(
      By.css('[data-testid="count"]')
    );
    expect(countOutput.nativeElement.textContent).toBe('1');
  });
```
- `dispatchEvent` is a native DOM API method that you use to manually dispatch events (such as `click`, `input`, etc.) on a DOM element.
- `triggerEventHandler` is used in **unit testing** to trigger an event directly on an Angular without needing the full overhead of a real DOM event.
#### Test input element:
![image](https://github.com/user-attachments/assets/7cb8ac09-8fec-4d5c-b803-e2e34e6a2f35)
```htm
<h1>
  Count is: <span data-testid="value-result">{{ count }}</span>
</h1>

<button data-testid="increment-button" (click)="onClick()">Add One</button>
<div>
  <input data-testid="reset-input" type="number" />
  <button data-testid="reset-button" (click)="onReset()">Reset</button>
</div>
```
```JavaScript
  it('resets the count', () => {
    const resetValue = 123;

    const resetInput = fixture.debugElement.query(
      By.css('[data-testid="reset-input"]')
    ).nativeElement;

    const btn = fixture.debugElement.query(
      By.css('[data-testid="reset-button"]')
    );

    resetInput.value = resetValue;
    resetInput.dispatchEvent(new Event('input'));

    btn.triggerEventHandler('click', null);
    fixture.detectChanges();

    const result = fixture.debugElement.query(
      By.css('[data-testid="value-result"]')
    ).nativeElement.textContent;
    console.log(btn);

    expect(Number(result)).toBe(resetValue);
  });
```
//Testing Components with children//
### Testing Components with children
- A unit test of `ParentComponent` does not render its children.
  - We need to test that the template contains the children.
  - Also, we need to check that `ParentComponent` and its children are wired up correctly using `Inputs` and `Outputs`.
#### NO_ERRORS_SCHEMA:
- By default, Angular expects to know and validate all elements and attributes in a component's template, such as standard HTML elements or Angular components/directives.
- When you use `NO_ERRORS_SCHEMA`, Angular will ignore those errors, allowing you to include custom elements (like web components).
```htm
<!-- app.component.html -->
<app-simple-counter></app-simple-counter>
```
```JavaScript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('app component', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be renderted', () => {
    expect(component).toBeTruthy();
  });
});
```
- Check if the parent renders the child.
```JavaScript
  it('renders the simple counter', () => {
    const simpleCounter = fixture.debugElement.query(
      By.css('app-simple-counter')
    );
    expect(simpleCounter).toBeTruthy();
  });
```
- Check if the parent passes the `Input` value to the child:
```htm
<!-- app.component.html -->
<app-simple-counter [testValue]="myValue"></app-simple-counter>
```
```JavaScript
  it('passes a start count', () => {
    const simpleCounter = fixture.debugElement.query(
      By.css('app-simple-counter')
    );
    expect(simpleCounter.properties['testValue']).toBe(111);
  });
```
- Check if the parent receives the `Output` value from the child:
- `toHaveBeenCalledWith` works just with spys. A spy allows you to monitor and verify whether the `console.log` function is called and with what arguments.
- Spy provides:   **Avoiding Side Effects** / **Control Over the Function** / **Test Isolation**
```htm
<!-- app.component.html -->
<app-simple-counter (countChange)="onCountChange($event)" [testValue]="myValue"></app-simple-counter>
```
```JavaScript
export class SimpleCounterComponent implements OnInit {
  @Output() countChange = new EventEmitter();
  count = 10;

  ngOnInit() {
    this.countChange.emit('REZA');
  }
-------------------------------------------------------
// app.component.ts
  onCountChange(count: any): void {
    console.log('countChange event from CounterComponent', count);
  }
```
```JavaScript
  it('gets the outpu value from child', () => {
    spyOn(console, 'log');
    const simpleCounter = fixture.debugElement.query(
      By.css('app-simple-counter')
    );
    const name = 'Maneli';
    simpleCounter.triggerEventHandler('countChange', name);
    expect(console.log).toHaveBeenCalledWith(
      'countChange event from CounterComponent',
      name
    );
  });
```
