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
- Both ```path: ''``` and ```path: '/'``` represent the base URL of your application.
- ```Path: '\'``` is not valid.
### PathMatch
The default path-match strategy is **prefix**, which means that the router checks URL elements from the left to see if the URL matches a specified path.You can specify the path-match strategy __full__ to make sure that the path covers the whole unconsumed URL.

### HTTP POST
```javascript
post(url: string, 
     body: any, 
     options: { 
        headers?: HttpHeaders | { [header: string]: string | string[]; }; 
        observe?: "body|events|response|"; 
        params?: HttpParams | { [param: string]: string | string[]; }; 
        reportProgress?: boolean; 
        responseType: "arraybuffer|json|blob|text"; 
        withCredentials?: boolean; 
     }
): Observable
```
- headers : use this to send the HTTP Headers along with the request
- params: set query strings / URL parameters
- observe: This option determines the return type.
- responseType: The value of responseType determines how the response is parsed.
- reportProgress: Whether this request should be made in a way that exposes progress events.
- withCredentials: Whether this request should be sent with outgoing credentials (cookies).

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
### Programmatic Navigation
- Injecting the _Router_ service and make use of it to navigate to another URL
- The ```navigate``` method is used for navigating based on a provided array of commands or a URL string.
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
```javascript
navigateWithParams() {
  this.router.navigate(['/']);
}

navigateWithParams() {
  this.router.navigate(['/user', 123], { queryParams: { name: 'John' } });
}

navigateWithParams() {
  this.router.navigateByUrl('/user/123?name=John');
}
```
### RouterLink
- the ```routerLink``` directive is used to create links to different views in your application.
- ```href``` is a standard HTML attribute, it triggers a full-page reload, and it is typically used for static links.
- ```routerLink``` performs navigation within your Angular application. This is handling navigation within a single-page application (SPA) built with Angula.
```html
<!-- Simple Navigation -->
<a routerLink="/home">Home</a>

<!-- Navigate to a route with a parameter like /user/123 -->
<a [routerLink]="['/user', userId]">User Details</a>

<!-- Navigate to a route with query parameters like /user?term=angular -->
<a routerLink="/search" [queryParams]="{ term: 'angular' }">Search</a>

<!-- Apply a CSS class when it is active -->
<a routerLink="/home" routerLinkActive="active-link">Home</a>

<!-- Navigate relative to the current route -->
<a routerLink="./child">Child Component</a>
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
### Get information from a route/Get Id/Snapshot/Relative route:
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
ngOnInit() {
  const heroId = this.route.snapshot.paramMap.get('id');
  this.hero$ = this.service.getHero(heroId);
}
goToItems() {
  this.router.navigate(['items'], { relativeTo: this.route });
}
```
### Resolver:
- A resolver is a **service** that pre-fetches some data before the route is activated.
- Resolvers are used to ensure that the required data for a component is available before the component is displayed.

```javascript
// resolver.service.ts
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class MyResolver implements Resolve<any> {
  constructor(private dataService: DataService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    // You can perform any data-fetching logic here
    return this.dataService.getData();
  }
}
```
```javascript
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyComponent } from './my.component';
import { MyResolver } from './resolver.service';

const routes: Routes = [
  {
    path: 'my-route',
    component: MyComponent,
    resolve: {
      resolvedData: MyResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```
```javascript
// my.component.ts
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my',
  template: '<div>{{ resolvedData | json }}</div>'
})
export class MyComponent {
  constructor(private route: ActivatedRoute) {
    // Access the resolved data from the route
    this.route.data.subscribe(data => {
      this.resolvedData = data.resolvedData;
    });
  }
}
```
