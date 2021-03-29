### var VS let
**var** is valid in the nearest function. **let** is valid in the current block.
### Type Assertion
- It does not change the type of variable in memory. It just says the type to Typescript.
- In this case without type Assertion, you don't get **IntelliSense**.
```Javascript
let message
message 'abc'
let endsWithC (<string>message).endsWith("c')
let alternativeWay = (message as string).endsWith('c')
```
