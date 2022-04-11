## Routes and Paths
To create a module with routing we should run ```ng g m Reza --routing``` the outcome is 2 files as follows in ```reza``` folder:
- ```reza-routing.module.ts```
- ```reza.module.ts```
```javascript
const routes: Routes =
[{ path: 'my/path/', component: MyComponent },
{ path: 'products', pathMatch: 'full', component: ProductListComponent},
{ path: '',  redirectTo: '/products', pathMatch: 'full' },
{ path: '**', component: WildcardComponent }]
```
### PathMatch
The default path-match strategy is **prefix**, which means that the router checks URL elements from the left to see if the URL matches a specified path.You can specify the path-match strategy __full__ to make sure that the path covers the whole unconsumed URL.
### Lazy Loading
Lazy loading speeds up application load time by splitting the application into multiple bundles and loading them on demand.
```javascript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = 
[{ path: 'my/path/', component: MyComponent },
{
  path: 'lazy',
  loadChildren: () => import('./lazy-route/lazy.module').then(mod => mod.LazyModule),
}];
```
#### Lazy loading in Email Client App
<img src="../Pics/LazyLoad.png" width="550">   

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
_routerLinkActive_ applies a class  on the activated link (like making the activated link BOLD). Since the link is "/" it applies to all routes so we should us _routerLinkActiveOptions_ as follows (it looks like __PathMatch:'full'__):
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
      this.router.navigate(['/heroes', { id: heroId }]); ///heres/1
    });
  }
}

```
Also we can rout to a defined rout and params Programmaticly:
```javascript
ngOnInit() {
  this.authService.signout().subscribe(() => {
    this.router.navigate(['/heroes', { id: heroId }]);
  });
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
### Nesting routes:
As your application grows more complex, you may want to create routes that are relative to a component other than your root component. These types of nested routes are called child routes.
```javascript
const routes: Routes = [
  {
    path: 'first-component',
    component: FirstComponent, // this is the component with the <router-outlet> in the template
    children: [
      {
        path: 'child-a', // child route path
        component: ChildAComponent, // child route component that the router renders
      },
      {
        path: 'child-b',
        component: ChildBComponent, // another child route component that the router renders
      },
    ],
  },
];
```
### Get information from a route/Get Id/Relative route:
As your application grows more complex, you may want to create routes that are relative to a component other than your root component. These types of nested routes are called child routes.
```javascript
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
constructor(
  private route: ActivatedRoute,
  private router: Router
) {}
ngOnInit() {
  this.route.queryParams.subscribe(params => {
    this.name = params['name'];
  });
}
ngOnInit() {
  this.heroes$ = this.route.paramMap.pipe(
    switchMap(params => {
      this.selectedId = Number(params.get('id'));
      return this.service.getHeroes();
    })
  );
}
goToItems() {
  this.router.navigate(['items'], { relativeTo: this.route });
}
```
