## Routes and Paths
```javascript
{ path: 'my/path/', component: MyComponent }
{ path: 'products', pathMatch: 'full', component: ProductListComponent} 
{ path: '',  redirectTo: '/products', pathMatch: 'full' }
{ path: '**', component: WildcardComponent }
```
### PathMatch
The default path-match strategy is 'prefix', which means that the router checks URL elements from the left to see if the URL matches a specified path.You can specify the path-match strategy 'full' to make sure that the path covers the whole unconsumed URL.
### Lazy Loading
Lazy loading speeds up application load time by splitting the application into multiple bundles and loading them on demand.
```javascript
[{
  path: 'lazy',
  loadChildren: () => import('./lazy-route/lazy.module').then(mod => mod.LazyModule),
}];
```
### RedirectTo
Instead of duplicating path, just redirect to the home path. Make sure pathMatch is full otherwise it redirects for all other paths
```javascript
{ path: '',  redirectTo: '/home', pathMatch: 'full' }
{ path: '/home', component: home }
```