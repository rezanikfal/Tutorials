## Style Guide
There are common conventions within the Angular community for naming and styling your code. Some of these conventions are created by Google, other by the community. They are not required but they are requested in order to keep a consistent naming and styling convention across not only this project, but all Angular projects.
 ### Naming Cases
 #### camelCase
- variableNames (This should be used for the vast majority of variables)
- functionNames
- objectProperties
- functionParameters/functionArguments
- _angularServiceInjections (what you name a service when you inject it. Notice the underscore at the beginning noting that it is a service)
- observableObjects$ (notice the dollar at the end notifying that it is an observable)
#### PascalCase
- AllClassNames (this includes components, services, pipes, directives, etc.)
- ModuleNames
- InterfaceNames
#### snake_case
- GLOBAL_CONSTANT_VARIABLES
- ENUM_VALUES (techincaly the a global constant but handled differently)
#### kebab-case
- component-selectors
- css-styles
- directory-names (this is automatically handled when using the Angular CLI)
### Styling Conventions
#### Indentation
- The convention that I have found in the long running religious battle of "tabs vs. spaces" is that Javscript uses two spaces for each indentation.
- I only ask that things be consistent across all files (of similar types) in the same project.
- Keep the indentation consistent based on the level of code. What this means is you should keep all variables, statements, functions, etc. that are at the same level of scope at the same amount of indentation with one level of scope higher being one LESS indentation level.
#### Semi-colons
- In Javascript, semi-colons are optional however it is a poor practice to ignore them. PLEASE put them at the end of each statement and each declaration.
#### <u>TYPE</u>Script Types
- TypeScript provides complex ways of giving a type to ALL pieces of data, whether it is a simple variable or a complex data structure. The "any" type is available but should not be used outside of special circumstances.
- TypeScript provides a String class but use the string type instead (notice the difference in capitalization) as Sonar has a preference and flags all of these. The same goes for all wrapper classes for primitive types: Number, Boolean, etc.
#### Linting
- There is a VS Code plugin called Prettier. It helps with a lot of these issue.
- There is a linter within VS Code that should be turned on that warns you of any stylistic no-no's in your code.
- Listen to the linter. It is there for a reason.
- The linter is stronger on .ts and .js files than with .css, .scss, and .html files but it can find some issues, especially ones that would cause compilation to fail.
#### Avoid Writing Unreadable Code
- Ternary operators can be great for condesing a simple if else into one line however they can be very dangerous in terms of readability. If you EVER have to double nest a ternary operation, you should refactor it and take a different approach.
- If you write something and come back the next day and have issues understanding it, this is a serious indicator that you should.
#### Attention to Detail
- Most of this can be summarized by simply paying attention to the rest of the code, not just the parts you wrote.
- This code cleanliness is not only for you, it is for the other people on your team and anyone else that nees to debug or maintain the code when you aren't around.
- It is NOT expected to be perfect, just try to stay consistent.
- The following examples should compile and do their job but there is more to computer science and software development that just "getting it to run" but also making it easier for future people to read it and interact with.
- Be aware that the code you are writing will be used by everyone on the team.
### Style Examples:
##### Acceptable Example #1:
```ts
/*
* Takes in a string for a customer name and an array of CustomerAccount type and returns the first CustomerAccount where the
* customerName field matches in the desired string.
*
 * @param {string} customerName - Customer name to be used for searching.
* @param {CustomerAccount[]} customerArray - Array of CustomerAccount type to be searched through.
* @return {CustomerAccount} - Account which first matches the customerName field. If not found, returns undefined.
*/
function getCustomerByName(customerName: string, customerArray: CustomerAccount[]): CustomerAccount {
  return customerArray.find((item: CustomerAccount) => {
    return item.customerName === inputString;
  });
}
```
- This example Uses proper naming conventions for the function, parameters, and variables.
- Function is commented.
- Uses consistent indentation between levels of scope.
- All of the statements have a semi-colon after them.
- The input and return types of the function are typed.
- Uses an arrow function to condense function (this could be condensed further but I wanted to show the scope indentation).
- Utilizes built in array functions.
- String comparison is using the <u>triple equals</u> comparison.
##### Acceptable Example #2:
```ts
export interface CustomerAccount {
  customerAddress: string;
  customerAge: number;
  customerName: string;
  customerPhone: PhoneNumber;
}
```
- Name of interface uses proper PascalCase.
- Properties use proper camelCase.
- customerPhone has a different type which can be defined elsewhere to be reused in other interfaces instead of a single use object.
##### Poor Code Example #1:
```ts
function Some_Function(input1, y: any) {
var ReturnValue = {}
for (var i = 0; i < any.length; i = i + 1)
{
  var TEMP = any[i];
  if (TEMP.customerName == input1) {
    return temp
  }
}
```
- The naming case for the function and variables does not follow set convention.
- Inconsistent indentation that does not follow the scope level.
- Inputs are not properly typed (what does the structure of the `y` parameter look like?).
- Poor naming of variables and parameters.
- Names of variables do not describe what the purpose of that variable or function does. Please use reasonable names. This is sometimes hard but a variable named `y` does not help other programmers to maintain the code. One reasonable exception is when simple stepping through the indexes of an array and a foreach loop is not possible.
- `ReturnValue` variable is not used.
- The `var` keyword should not be used at all. Use `let` or `const` instead based on if the value will be reassigned.
- No semi-colons are used aside from the for loop where they are required.
- `i = i + 1` should be condensed to `i++`. Over-condensing should be avoided but this is a case where someone reading the code should understand this syntax.
- No explicit return value if the desired match is not found. Some compilers will actually give an error as not all paths will result in a return value. In this case, will it be null? Undefined? Empty Array? Void? Documentation would alleviate that confusiuon if that is the expected result (please accomodate for it properly in the code).
##### Poor Code Example #3:
```ts
function SomeFunction(inputString: string, arr: any[]) {
var returnValue = {};
for (var i = 0; i < any.length; i = i + 1) {
  var TEMP: string = any[i];
  if (TEMP.customerName == input1) {
    returnValue = TEMP
    break;
  }
}
return returnValue;
}
```
- Indentation issues.
- Naming convention issues.
- `arr` argument is now known to be an array but the underlying structure of that array object is still unknown.
- `TEMP` could be avoided easily but more importantly the linter will not like assigning a type and a value at the same time.
  - If you assign data to it in the same line that you are assigning it, the type is already implied.
  - The linter does not like this so one way or the other, not both at once.
- Unless you are in a switch statement or are running something that intends to be run indefinately, avoid the `break` command.
- Inconsistent indentation based on scope.
- Function return type should be declared.
##### Poor Code Example #4:
```ts
export interface AccountResponse {
accountId: String;
  accountValue1: string;
  AccountValue2: string;
  paymentUrl: string;
  paymentURL: string;
}
```
- Inconsistent indentation.
- Inconsistent naming style (one uses PascalCase instead of camelCase).
- Duplicate keys where the only difference is capitalization. This is VERY BAD practice and can result in a LOT of bugs and confusion. This issue exists in our current system and we need to do our part to minimize it.
##### Poor Code Example #5:
```ts
export interface CustomerAccount {
  customerAddress: string;
  customerAge: number;
  customerName: string;
  customerPhone: {
    area_code: string;
    country_code: '1';
    number: string;
  };
}
```
- This example is similar to one above but instead of the PhoneNumber interface it creates its own non-reusable type.
- Uses a literal for `country_code` instead of string. There could possibly be a use case for this but probably not something we would use.
- Some properties are using snake_case instead of camelCase.
