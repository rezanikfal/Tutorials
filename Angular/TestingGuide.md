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

