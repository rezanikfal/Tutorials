## Create Custom Pipe:
They are a simple way to transform values in an Angular template.
### Typescript (Pipe)
```ng generate pipe Pipe-Name```
```javascript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimOutletName'
})
export class TrimOutletNamePipe implements PipeTransform {
  transform(title: string, outletName: string): any {
    return title.replace(` - ${outletName}`, '');
  }
}
```
### Html (Component)
```html
<h3>World News</h3>
<div class="list-group">
  <a
    *ngFor="let article of articles"
    class="list-group-item list-group-item-action"
    [href]="article.url"
    target="_blank"
  >
    {{ article.title | trimOutletName: article.source.name }}
  </a>
</div>
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
