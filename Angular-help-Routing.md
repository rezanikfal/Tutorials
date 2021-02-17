## Routes and Paths
```javascript
{ path: 'my/path/', component: MyComponent }
{ path: 'products', pathMatch: 'full', component: ProductListComponent} 
{ path: '',  redirectTo: '/products', pathMatch: 'full' }
{ path: '**', component: WildcardComponent }
```
### PathMatch
The default path-match strategy is 'prefix', which means that the router checks URL elements from the left to see if the URL matches a specified path.You can specify the path-match strategy __full__ to make sure that the path covers the whole unconsumed URL.
### Lazy Loading
Lazy loading speeds up application load time by splitting the application into multiple bundles and loading them on demand.
```javascript
[{ path: 'my/path/', component: MyComponent },
{
  path: 'lazy',
  loadChildren: () => import('./lazy-route/lazy.module').then(mod => mod.LazyModule),
}];
```
#### Lazy loading in Email Client App
<img src="./Pics/LazyLoad.png" width="550">   

inbox-routing.module.ts:  
```javascript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule {}
```

app-routing.module.ts:  
```javascript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'inbox',
    loadChildren: () =>
      import('./inbox/inbox.module').then(mod => mod.InboxModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```
### RedirectTo
Instead of duplicating path, just redirect to the home path. Make sure pathMatch is full otherwise it redirects for all other paths
```javascript
{ path: '',  redirectTo: '/home', pathMatch: 'full' }
{ path: '/home', component: home }
```
### RouterLink VS HTML href
_routerLinkActive_ applies a class  on the activated link (like making the activated link BOLD). Since the link is "/" it applies to all routes so we should us _routerLinkActiveOptions_ as follows:
```htm
<a
  class="ui item"
  routerLink="/"
  [routerLinkActiveOptions]="{ exact: true }"
  routerLinkActive="active"
>
  Sign In
</a>
<a class="ui item" routerLink="/signup" routerLinkActive="active">
  Sign Up
</a>
```
### Programmatic Navigation
Injecting the _Router_ service and make use of it to navigate to another URL:
```javascript
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.signout().subscribe(() => {
      this.router.navigateByUrl('/');
    });
  }
}

```
### Guard
A class that we implement to restrict access to some routes inside your application. Inside the guard we decide about accessing the user to a route. it returns __Boolean__. there are 3 types (a single guard can implement all three types simultaneously):
- __canActivate__: User can visit this route
- __canActivateChild__: User can visit this child route
- __canLoad__: User can load this __lazily-loaded__ module and access the routes inside of it

To generate guard using CLI:   
```ng g guard auth/Auth```  
Using __canLoad__ Guard in __app-routing.module.ts__ for lazily-loaded Inbox Module:
```javascript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'inbox',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./inbox/inbox.module').then(mod => mod.InboxModule)
  }
];
```
