## Angular Testing
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
  beforeAll(() => {
    console.log('Called before all specs are run');
  });
});
```
