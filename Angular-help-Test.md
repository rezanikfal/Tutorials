## Test Structure
- __Arrange__ all necessary pre-conditions and inputs
- __Act__ on the object or class under test
- __Assert__ that the expected results have occured
## Test a Pipe
```javascript
import { StrengthPipe } from "./strength.pipe";

describe("StrengthPipe", () => {
  it("should display weak if strength is 5", () => {
    let pipe = new StrengthPipe();
    expect(pipe.transform(5)).toEqual("5 (weak)");
  });
  it("should display weak if strength is 5", () => {
    let pipe = new StrengthPipe();
    expect(pipe.transform(16)).toEqual("16 (strong)");
  });
});
```
