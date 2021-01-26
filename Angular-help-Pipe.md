## Create Custom Pipe:
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
## Async Pipes:
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
