## Create Custom Pipe:
They are a simple way to transform values in an Angular template.
### Angular CLI for Pipe:
```ng generate pipe Pipe-Name```
- A brand new custom pipe:
  - ```value: unknown``` means the input value of pipe
  - ``` ...args: unknown[]``` means unlimited extra parameters
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
### Use Date Pipe in Angular Component:
- We should add the ```Pipe``` to the ```providers: [DatePipe]``` array. That is the old way of creating an injectable (before Angular 6).
- ```app.module.ts```:
```javascript
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    AngularpipeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
- We should import and inject the pipe and use the ```transform``` method to apply the Pipe:
```javascript
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-angularpipe',
  templateUrl: './angularpipe.component.html',
  styleUrls: ['./angularpipe.component.scss']
})
export class AngularpipeComponent implements OnInit {

  datePipeString : string;

  constructor(private datePipe: DatePipe) { 
    this.datePipeString = datePipe.transform(Date.now(),'yyyy-MM-dd');
    console.log(this.datePipeString);
    //2019-07-22
  }
}
```
### Two ways for creating an Injectable:
To create a service all we need to do is create a class
```javascript
export class VoteService {}
```
And register it in providers array of **@NgModule**
```javascript
import {VoteService} from './vote.service';
...
@NgModule({
  imports:      [ BrowserModule],
  declarations: [ AppComponent],
  bootstrap:    [ AppComponent],
  providers: [VoteService]
})
```
```javascript
import { Injectable } from '@angular/core';
@Injectable() 
export class VoteService { }
```
- The second way (more preferred in Angular 6) is to use **@Injectable** decorator and specify **providedIn** property
- **No** need to register to the **providers array of @NgModule**
```javascript
import { Injectable } from '@angular/core';
@Injectable({   
  providedIn: 'root', 
}) 
export class VoteService { }
```
‘root’ means that we want provide the service at the root level (AppModule)
