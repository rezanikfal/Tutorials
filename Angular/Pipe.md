## Angular Pipe:
They are a simple way to transform values in an Angular template.
### Default Angular Pipes:
- There are multiple pre-defined pipes including:
  - **DatePipe**: Formats a date value according to locale rules.
  - **UpperCasePipe**: Transforms text to all upper case.
  - **LowerCasePipe**: Transforms text to all lower case.
  - **CurrencyPipe**: Transforms a number to a currency string, formatted according to locale rules.
  - **DecimalPipe**: Transforms a number into a string with a decimal point, formatted according to locale rules.
  - **PercentPipe**: Transforms a number to a percentage string, formatted according to locale rules.
  - **AsyncPipe**: Subscribe and unsubscribe to an asynchronous source such as an observable.
  - **JsonPipe**: Display a component object property to the screen as JSON for debugging. 
```html
myDate = '12/12/1977' 
<p>{{ myDate }}</p>  // 12/12/1977
<p>{{ myDate | date }}</p>  // Dec 12, 1977
<p>{{ myDate | date : "full" }}</p>  // Monday, December 12, 1977 at 12:00:00 AM GMT-06:00
```
### Angular CLI for Custom Pipe:
`ng generate pipe Pipe-Name`
- A brand new custom pipe:
  - `value: unknown` means the input value of pipe
  -  `...args: unknown[]` means unlimited extra parameters
```javascript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'updateString'
})
export class UpdateStringPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
```
- A Simple pipe:
```javascript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'updateString',
})
export class UpdateStringPipe implements PipeTransform {
  transform(value: string, preValue: string, postValue: number): string {
    return `${preValue}-${value}:${postValue}`;
  }
}
```
- How to use in the template :
```html
<p>{{ title | updateString : "My" : 1 }}</p> // My-interview:1
<p>{{ title }}</p> //interview
```
### Make a Pipe Injectable:
- We can make a pipe injectable in Angular to allow it to be used beyond just template
- In other words we can extend its functionality to services, components, or even other pipes.
```javascript
import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'updateString',
})
@Injectable({
  providedIn: 'root',
})
export class UpdateStringPipe implements PipeTransform {
  transform(value: string, preValue: string, postValue: number): string {
    return `${preValue}-${value}:${postValue}`;
  }
}
```
```javascript
export class MyComp1Component implements OnInit {
@Input() title = '';
  constructor(
    private updateString: UpdateStringPipe
  ) {}
  ngOnInit() {
    this.title = this.updateString.transform(this.title, 'My', 1);
  }
```


- The `@Pipe` decorator in Angular essentially registers the class with the DI (Dependency Injection) system similarly to how @Injectable does.
- So for **built-in** and **custom** pipes we can put them in the `providers` array of a component and inject them to the same component:
```javascript
@Component({
  selector: 'app-my-comp1',
  templateUrl: './my-comp1.component.html',
  styleUrl: './my-comp1.component.scss',
  providers: [DatePipe, TimeTwoPipe],
})
  constructor(
    private datePipe: DatePipe,
    private timeTwoPipe: TimeTwoPipe
  ) {}
  ngOnInit() {
    console.log(this.timeTwoPipe.transform(12)); // custom
    console.log(this.datePipe.transform(this.myDate)); // built-in
  }
```
## Async Pipe:
Replacing a regular subscription with __Async__ pipe.
### Before using Async Pipe
  ```javascript
  export class AppComponent {
    signedin = false;
  
    constructor(private authService: AuthService) {}
  
    ngOnInit() {
      this.authService.signedin$.subscribe(signedin => {
        this.signedin = signedin;
      });
    }
  }
  ```
    
  ```htm
    <div class="right menu">
      <ng-container *ngIf="signedin">
        <a class="ui item" routerLink="/inbox" routerLinkActive="active">
          Inbox
        </a>
        <a class="ui item" routerLink="/signout" routerLinkActive="active">
          Sign Out
        </a>
      </ng-container>
   ```
### After using Async Pipe
  ```javascript
  export class AppComponent {
    signedin$: BehaviorSubject<boolean>;
  
    constructor(private authService: AuthService) {
      this.signedin$ = this.authService.signedin$;
    }
  }
  ```
  
  ```htm
    <div class="right menu">
      <ng-container *ngIf="signedin$ | async">
        <a class="ui item" routerLink="/inbox" routerLinkActive="active">
          Inbox
        </a>
        <a class="ui item" routerLink="/signout" routerLinkActive="active">
          Sign Out
        </a>
      </ng-container>
   ```
### Pure (Default) / Impure Pipes:
A pure pipe is only called when Angular detects a change in the value or the parameters passed to a pipe. An impure pipe is called for every change detection cycle no matter whether the value or parameter(s) changes.
  ```javascript
  @Pipe({
      name: 'sort',
      pure: false //true makes it pure and false makes it impure
       })
      export class myPipe implements PipeTransform {

      transform(value: any, args?: any): any {
         //your logic here and return the result
       }
      }
  ```
