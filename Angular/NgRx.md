# Redux Structure
<img src="../Pics/redux1.PNG" width="950">
<img src="../Pics/redux3.PNG" width="600">
<img src="../Pics/redux2.PNG" width="800">

### Redux terms:
- **Action:** It is used to decide how to change data in the Redux Store
- **Distpatch:** Takes an actions and forwards it on to all the different **Reducers**.
- **Reducer:** Get the **Action** that might have data (Action **Payload**) and the most recent set of data, return updated data that could be same as the current.
- **Store:** A repository that contains all the recent data. To Create the **Store** we should take the **Reducrers**, wire them up and create a coherent unit to accept actions. 
- Redux by comparing the Old and new state can understand the state change status. That is why reducer does not touch the current state. It creates a copy of the current **mutable** state and returns it to the store.

## Immutability in JS
JS is not a good language for Immutability. **Arrays** and **objects** are mutable in JS:

```javascript
const a = ["a", "f", "y", "r", "b"];
console.log(a);  //["a", "f", "y", "r", "b"];
const b =a.sort();
console.log(a);  //["a", "b", "f", "r", "y"]
```
```javascript
const a = ["a", "f", "y", "r", "b"];
console.log(a);  //["a", "f", "y", "r", "b"];
const b =[...a].sort();
console.log(a);  //["a", "f", "y", "r", "b"];
```

Functions like **map**, **slice**, **filter** are non-destructive as well.
```javascript
const a = ["a", "f", "y", "r", "b"];
const c = a.map(data=>data).sort()
console.log(c);  //["a", "b", "f", "r", "y"];
console.log(a);  //["a", "f", "y", "r", "b"];
```

Objects Immutability.
```javascript
const state = {
name: 'Jon Snow',
occupation: 'Lord Commander',
skills: [] // knows nothing...
}
const newState = {
...state,
occupation: 'King in the North',
skills: [...state.skills, 'Fighting', 'Test']
};

console.log(newState)
//{
//  name:"Jon Snow",
//  occupation:"King in the North",
//  skills:[
//    "Fighting",
//    "Test"
//    ]
//}
```
## Smart vs Dumb Component
- Smart: Know about state, business ligic and how to manage the state 
- Dumb: Don't know about state (stateless) & business logic. Dumb components only responsibility is to present something to the DOM.
## Pure and Impure functions in JS
When the function **changes the state** or produces **different results** each time, it is Impure:
### Pure
```javascript
function add(a, b) {
    const total = a + b;
    return total;
}
console.log(add(1, 3));
```
### Impure
The first function changes the state. Note that, even logging something on the console renders a new thing on the screen. That is part of the application state. We are triggering a **Side Effect**. Side effects means an external source that you don't know about 100%. Like make a http call. Maybe return data, maybe error!
```javascript
function add(a, b) {
    const total = a + b;
    console.log(total);
}

function subtractWithRandom(a, b) {
    const rnd = Math.random();
    const total = a - b - rnd;
    return total;
}
```
## Add routing to a Module
We can easily add routing to a module without a new **routing.ts** file:
### Before Routing
```javascript
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter/counter.component';
import { PostsComponent } from './posts/posts/posts.component';
import { HeaderComponent } from './header/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    PostsComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
### After Routing
```javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter/counter.component';
import { PostsComponent } from './posts/posts/posts.component';
import { HeaderComponent } from './header/header/header.component';

const routes:Routes=[
  {
    path:'', component:PostsComponent
  },
  {
    path:'counter', component:CounterComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    PostsComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
### Adding routs to "a" tag
```html
<ul class="navbar-nav">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" href="#" [routerLink]="['/']">Posts</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#" href="#" [routerLink]="['/counter']">Counter</a>
  </li>
</ul>
```
### After Lazy Loading
```javascript
const routes:Routes=[
  {
    path:'', component:PostsComponent
  },
  {
    path: 'counter', 
    loadChildren: () => import('./counter/counter.module').then(m => m.CounterModule)
  }
]

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    HeaderComponent
  ],
```
### Components Folder to Module with routing (for Lazy Loading)
first add the ```counter.module.ts``` to the folder and:
```javascript
import { NgModule } from '@angular/core'
import { CounterComponent } from './counter/counter.component'
import { RouterModule, Routes } from '@angular/router'
import { CommonModule } from '@angular/common'

export const routes: Routes = [
  {
    path: '',
    component: CounterComponent,
  },
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [CounterComponent],
})
export class CounterModule {}
```
# NgRx Introduction
- NgRx is a group of libraries inspired by the Redux pattern. The main purpose of this pattern is to provide a predictable state container, based on three main principles:
  - **Single source of truth**  
    In the case of a redux/ngrx architecture, this means that the state of your whole application is stored in an object tree within a single store.
  - **State is read-only**  
    You are never going to change the state directly instead you are going to dispatch actions.
  - **Changes are made with pure functions**  
    The operation triggered by dispatching an action is going to be a pure function (any function that doesn’t alter input data) called reducers. The reducer function takes an object that represents the “old” state, then creates a brand new object by copying all the old object’s details into a it and **overriding** old properties with new ones.  
    Redux takes a given state (object) and passes it to each reducer in a loop. And it expects a brand new object from the reducer if there are any changes. And it also expects to get the old object back if there are no changes.Redux simply checks whether the old object is the same as the new object by comparing the memory locations of the two objects. So if you mutate the old object’s property inside a reducer, the “new state” and the “old state” will both point to the same object. Hence Redux thinks nothing has changed! So this won’t work.
  - **Change detection**      
    The main benefit is that by binding all our components inputs to state properties we can change the change detection strategy to on push, and this is going to be a boost on performance for the application.
### NgRx process summary:
- **Action Dispatching**: Actions are dispatched to indicate changes in the application.
  - Actions are plain JavaScript objects that describe what happened and are dispatched to the store.
  - An action is an object that has a **type** and an optional **payload**.
  - Actions are the only way to interact with the NgRx store.
```javascript
import { createAction, props } from '@ngrx/store';

export const updateName = createAction(
  '[User] Update Name',
  props<{ name: string }>()
);
```
- **Reducer Execution**: Reducers create a new, immutable state based on the action and the current state.
  - when the updateName action is dispatched, the reducer creates a new state object with the updated name:
```javascript
import { createReducer, on } from '@ngrx/store';
import { updateName } from './user.actions';

export const initialState = {
  user: {
    name: 'John Doe',
    age: 30
  },
  settings: {
    theme: 'dark'
  }
};

const userReducer = createReducer(
  initialState,
  on(updateName, (state, { name }) => ({
    ...state,
    user: {
      ...state.user,
      name: name
    }
  }))
);

export function reducer(state: any, action: any) {
  return userReducer(state, action);
}

``` 
- **State Replacement**: The new state replaces the old state in the NgRx store.
- **State Change Detection**: NgRx detects state changes by comparing the old and new state references.
  - NgRx will notify any components that are subscribed to the affected parts of the state (using selectors).
  -  selectors play a crucial role after state change detection.
  - Selectors allow you to "slice" the state by selecting only the parts of the state that a particular component or service needs:
  - Selectors can be composed from other selectors, allowing you to create complex state selections:
  - Selectors are often **memoized**, meaning that they remember the result of their last execution. So no input change, no re-calculate, more performance.
```javascript
import { createSelector } from '@ngrx/store';

export const selectUser = (state: AppState) => state.user;

export const selectUserName = createSelector(
  selectUser,
  (user) => user.name
);
``` 
```javascript
export const selectUserDetails = createSelector(
  selectUserName,
  selectUserAge,
  (name, age) => ({ name, age })
);

``` 
- **Component Update**: Only components impacted by the state change are re-rendered.
  - In an Angular component, you typically use the select method of the NgRx store to subscribe to a piece of state.
  - The component subscribes to the observable returned by the select method, and this observable emits new values whenever the selected part of the state changes.
```javascript
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserName } from './user.selectors';

@Component({
  selector: 'app-user',
  template: `
    <div>{{ userName$ | async }}</div>
  `
})
export class UserComponent {
  userName$: Observable<string>;

  constructor(private store: Store) {
    this.userName$ = this.store.select(selectUserName);
  }
}
``` 
- **Rendering the UI**: The UI updates to reflect the new state.
### NgRx libraries installation (other elements of the store should be installed individually):
```code
ng add @ngrx/store@latest
```

- NgRx flow:
<img src="https://www.danielcornock.co.uk/assets/images/articles/ngrx-intro/ngrx-flow.png" width="1000" />

## File Structure

- For Each module we can create a Store and register the store on `appName.module.ts`
- Store includs the following folders: 
  - `counter.actions.ts`
  - `counter.reducer.ts`
  - `counter.selectors.ts`
  - `counter.state.ts`
  - `counter.effects.ts`
  
## Store Elements Sample Code

1- `counter.state.ts`:

- By default it includs the **State Interface** & **Initial State**.

```javascript
export interface CounterState {
  myCount: number
  channelName:string
}
export const initialState = {
  myCount: 0,
  channelName:'Reza from Citi'
}    
```

2- `counter.actions.ts`

- Actions express unique events that happen throughout your application.
- Any Component tells give me something or update something. It is **Actions** (with or without Data):

```javascript
import { createAction, props } from '@ngrx/store'

export const Time6 = createAction('[App Page] Time6');
export const Reset = createAction('[App Page] Reset');
export const ResetTo = createAction('[App Page] ResetTo', props<{value: number}>());
```

- **ES6** Format:

```javascript
import { createAction } from '@ngrx/store'

export const increment = createAction('increment')
export const customIncrement = createAction('[App Page] ResetTo', (value: number)=>({value}))
```

3- `counter.reducer.ts`

- Reducers are responsible for handling transitions from one state to the next state in your application.
- Adding the business logic for each Actions:

```javascript
import { createReducer, on } from '@ngrx/store'
import { customIncrement, increment } from './counter.actions'
import { initialState } from './counter.store'

const _counterReducer = createReducer(
  initialState,
  on(Time6, (state) => ({ ...state, myCount: state.myCount * 6 })), //Shorter version
  on(Reset, (state) => ({ ...state, myCount: 0 })),
  on(ResetTo, (state, action) => {
    return {
      ...state,
      myCount: action.value
    }
  })
)

export function counterReducer(state, action) {
  return _counterReducer(state, action)
}
```

4- `app.module.ts`

- Register the reducer on App Module (Assign **counter** as the Reducer Name):

```javascript
import { BrowserModule } from '@angular/platform-browser'
import { StoreModule } from '@ngrx/store'
import { counterReducer } from './counter/store/counter.reducer'

@NgModule({
  declarations: [AppComponent, ....],
  imports: [
    BrowserModule, StoreModule.forRoot({ cState: counterReducer }),
  ],
})
export class AppModule {}
```

- **Lazy Load the NgRx State - app.module** 

```javascript
import { StoreModule } from '@ngrx/store'

@NgModule({
  declarations: [AppComponent, ....],
  imports: [
    StoreModule.forRoot({}),
  ],
})
```

- **Lazy Load the NgRx State - counter.module** 

```javascript
import { StoreModule } from '@ngrx/store'
import { counterReducer } from './counter/store/counter.reducer'

@NgModule({
  declarations: [AppComponent, ....],
  imports: [
    StoreModule.forFeature({ cState: counterReducer }),
  ],
})
```

5- `*.component.ts`

- Dispatching actions / Select states.

```javascript
import { Store } from '@ngrx/store'
import { Reset, ResetTo, Time6 } from '../store/app.action';
import { counterState } from '../store/app.state'

constructor(private store: Store<{ cState: counterState }>) {}

  ngOnInit(): void {
    this.store.select('cState').subscribe((data) => {
      this.counter = data.myCount
    })
  }
  
  onClick(){
    this.store.dispatch(Time6())
  }
  onClickReset(){
    this.store.dispatch(Reset())
  }
  onClickResetTo() {
    this.store.dispatch(ResetTo({ value: +this.binding }))
  }
})
```

6- `counter.selectors.ts`

- Selector is a query of store (getting a slice of store):

```javascript
import { createFeatureSelector, createSelector } from '@ngrx/store'
import { CounterState } from './counter.store'

const getCounterState = createFeatureSelector<counterState>('cState');
export const getCounter = createSelector(
    getCounterState,
    (state: counterState) => state.myCount
);
```

- Component:

```javascript
import { Store } from '@ngrx/store'
import { getCounter } from '../store/app.selectors'
import { counterState } from '../store/app.state'

  constructor(private store: Store<{ cState: counterState }>) {}
  counter: number
  ngOnInit(): void {
    this.store.select(getCounter).subscribe((data) => {
      this.counter = data
    })
  }
```

## NgRx Effects
- Effects provide a powerful model to keep our reducers pure and describe side effect handling in a declarative way using RxJS streams.
- This could be success or the fail action.
### Native events
- Trigger an action whenever the user resizes the browser window.
- Using the **fromEvent** function from RxJS we can easily build up an observable stream of window resizing events. The **debounce** is just cosmetic and makes the stream only emit once when the user has stopped resizing for a certain amount of time.

```javascript
import { fromEvent } from 'rxjs';
// ...
@Effect()
resize$ = fromEvent(window, 'resize').pipe(
  debounceTime(300),
  map(e => new MyWindowResizeAction(e))
);
```
### Fill the store implicitly
- This effect starts working when the book list in our store changes. Using the filter operator it continues the pipeline only when there are no books in the store.
- The key behind this idea is that store selectors like store.pipe(select(mySelector)) also return Observables. Thus, we can build an effect like the one following.

```javascript
import { fromEvent } from 'rxjs';
// ...
@Effect()
getBooks$ = this.store$.pipe(
  select(getAllBooks), // get book list from store
  filter(booksFromStore => booksFromStore.length == 0), // only continue if there are no books
  map(_ => new LoadBooks())
);

// Selector
const getAllBooks = createSelector(getBooksState, state => state.books);
```
## RxJS
- Pipeline for a letter based search call

```htm
<div>
<label>Search reddit.com/r/aww for images containing: </label>
<input [formControll="search" />
</div>
<div class="box" *ngFor="let post of results | async">
<img [src]="post.thumbnail" [alt]="post.title" />
</div> >
```
```javascript
results: Observable<RedditResult[]>;
search: FormControl = new FormControl('');

constructor(ris: RedditImageSearchService) {
  this.results = this.search.valueChanges.pipe(
    map((search) => search.trim()),
    debounceTime(200),
    distinctUntilChanged(),
    filter((search) => search !== ''),
    switchMap((search) =>
      ris.search(search).pipe(
        retry(3),
        startwith([])
      )
    )
  );
}
```
### Generic Interface
- For example for CRUD operation:
```javascript
export interface CRUDAction<T> {
  action: 'add' | 'update' | 'delete';
  data: T;
}

private postCRUDSubject = new Subject<CRUDAction<IPost>>();
addPost(post: IPost) {
  this.postCRUDSubject.next({ action: 'add', data: post })
}
```
