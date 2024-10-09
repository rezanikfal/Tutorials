## Angular Testing
### Create Module based project in Angular 17
```ng new project-name --no-standalone```
## Testing Concepts
- A **headless** environments allow tests to be run programmatically without opening a visible browser window.
- If you are testing server-side logic in a Node.js application, Karma is typically not necessary (Headless Testing).
-  **Jasmine** provides the syntax and structure for writing tests and making assertions
- **Karma** takes over browser and ensures that your tests interact with real browser APIs. It allows you to run your tests in multiple browsers and provides detailed reports.
## Jasmin
- Jasmine is a BDD (Behavior Driven Development) 
- In BDD Test are written in non-technical language so everyone can understand it easily.
- BDD manly focus on the testing the behavior of code rather than implementation.
- To run Jasmin individually, we should create a HTML file and add the .js and spec.js files as scripts to that and run it.
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Simple Calculator Testing</title>

    <link rel="shortcut icon" type="image/png" href="lib/jasmine_favicon.png" />
    <link rel="stylesheet" href="lib/jasmine.css" />

    <script src="lib/jasmine.js"></script>
    <script src="lib/jasmine-html.js"></script>
    <script src="lib/boot0.js"></script>
    <!-- optional: include a file here that configures the Jasmine env -->
    <script src="lib/boot1.js"></script>

    <!-- include source files here... -->
    <script type="text/javascript" src="calculator.js"></script>
    <script type="text/javascript" src="main.js"></script>
    <script type="text/javascript" src="CustomMatcher.js"></script>

    <!-- include spec files here... -->
    <script type="text/javascript" src="calculator.spec.js"></script>
    <script type="text/javascript" src="main.spec.js"></script>
  </head>

  <body></body>
</html>
```
## Karma
- Karma is a test runner for JavaScript that is often used for running unit tests in a dev.
- Why Karma:
  - Karma integrates seamlessly with Continuous Integration (CI) tools like Jenkins.
  - Developers can run tests automatically whenever code changes (watch mode).
  - Karma can run tests in multiple real browsers (e.g., Chrome, Firefox, Safari).
  - It also supports headless browsers (like Headless Chrome). Headless means no graphical interface.
  - Karma can be configured to generate code coverage reports.
### Test Types
#### Isolated Unit Tests
- To test individual components, services, or functions in isolation (typically without dependencies).
- Uses mocks, stubs, or spies to replace dependencies
#### Shallow Integration Tests
- To test components with a minimal level of integration, often involving the component's template(without rendering child components).
- Angular’s ```TestBed``` is the tool for Shallow testing.
- We should create the module for Shallow and Deep test
#### Deep Integration Tests
- To test the interaction between multiple components, services, and modules..
- Angular’s ```TestBed``` is the tool for this.
### Mock Types
- **Dummy**: Passing a null or a simple object to fulfill a method signature requirement (When the parameter’s value is irrelevant).
- **Stub**: A method that always returns a fixed value (predefined responses without complex logic).
- **Spy**: A method that verifies how many times it was called and with which parameters (When you need to verify interactions (calls, parameters, etc.)).
### Matchers
- Constructor function for testing:
```JavaScript
function Calculator() {
  this.total = 0;
}

Calculator.prototype.add = function (number) {
  return (this.total += number);
};
Calculator.prototype.subtract = function (number) {
  return (this.total -= number);
};
Calculator.prototype.multiply = function (number) {
  return (this.total *= number);
};
Calculator.prototype.divide = function (number) {
  if (number === 0) {
    throw new Error('number cannot be zero');
  }
  return (this.total /= number);
};
```
#### toBe
- expect the actual value to be === to the expected value.
```JavaScript
  it("should multiply number with the total", function () {
    //TODO: Expectations
    const calculator = new Calculator();
    calculator.total = 10;
    calculator.multiply(2);
    expect(calculator.total).toBe(20);
  });
```
