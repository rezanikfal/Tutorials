Here is a highly structured, clear, and comprehensive NgRx study guide tailored for your interview prep. It condenses all your notes into quick-fire concepts, core definitions, and code patterns that interviewers love to hear.

---

## 1. Redux Principles & Core Concepts

When an interviewer asks, *"What is Redux/NgRx and why do we use it?"*, hit them with these three principles:

1. **Single Source of Truth:** The entire application state is stored in a single, read-only object tree inside the **Store**.
2. **State is Read-Only:** You can never mutate the state directly. The only way to change it is to dispatch an **Action**.
3. **Changes via Pure Functions:** State transitions are handled by **Reducers**, which are pure functions (they return a brand-new state object without modifying the old one).

### Key Terms Cheat Sheet

* **Store:** Store is just a single, plain JavaScript object.
We often refer to this object as the **State Tree** because it can have nested branches (representing different features of your app), but at its core, it is just a standard JS object.
```javascript
{
  // "cState" is the key we assigned in AppModule / StoreModule
  cState: { 
    myCount: 12,
    channelName: 'Reza from Citi'
  },
  userState: {
    name: 'John Doe',
    age: 30
  }
}

```
* **Action:** A plain JavaScript object representing a unique event. It has a `type` and an optional `payload`.
If you define an action with properties (associated data) using `props`:

```typescript
export const resetTo = createAction(
  '[Counter] Reset To', 
  props<{ value: number }>()
);

```

Calling `resetTo({ value: 10 })` produces this plain JavaScript object:

```json
{
  "type": "[Counter] Reset To",
  "value": 10
}

```
* **Reducer:** A pure function that takes the `currentState` and an `action`, and returns a `newState` using immutable updates (e.g., the spread operator `...`).
* **Selector:** A query for the store. Selectors "slice" and memoize state for performance (no re-calculations if inputs don't change).
* **Effects:** Side-effect handlers (using RxJS). They listen for actions, perform external/async tasks (like HTTP calls or listening to window events), and dispatch new actions.

---

## 2. NgRx Architecture Flow

This is how data flows in a unidirectional loop:

```
[ Component / UI ] --(Dispatches Action)--> [ Action ] 
       ^                                         │
       │ (Subscribed via Selectors)              ▼
[ New State ] <--(Updates Store)--- [ Reducers / Effects ]

```

---

## 3. Pure vs. Impure Functions

Interviewers frequently test your JavaScript fundamentals with this distinction:

### Pure Functions

* Always return the same output for the same input.
* Have **no side effects** (don't mutate external state, don't log to console, don't write to DB).
* *Example:*
```typescript
const add = (a, b) => a + b; // Pure

```



### Impure Functions

* Produce different results or trigger side effects.
* Include HTTP calls, `Math.random()`, `Date.now()`, or direct state mutation.
* *Example:*
```typescript
const addAndLog = (a, b) => { 
  console.log(a + b); // Impure: Side effect (writing to console/DOM)
};

```



---

## 4. Components: Smart vs. Dumb

| Feature | Smart Components (Containers) | Dumb Components (Presentational) |
| --- | --- | --- |
| **State Awareness** | Knows about the NgRx Store & state | Has no knowledge of the Store or state |
| **Logic** | Contains business logic | Only handles UI presentation |
| **Data Flow** | Selects state from store & dispatches actions | Receives data via `@Input()`, emits events via `@Output()` |
| **Change Detection** | Often default | Can use highly performant `OnPush` change detection |

---

## 5. NgRx Code Implementation Quick-Reference

### Step 1: Define State (`counter.state.ts`)

```typescript
export interface CounterState {
  myCount: number;
}
export const initialState: CounterState = {
  myCount: 0
};

```

### Step 2: Define Actions (`counter.actions.ts`)

```typescript
import { createAction, props } from '@ngrx/store';

export const increment = createAction('[Counter] Increment');
export const resetTo = createAction('[Counter] Reset To', props<{ value: number }>());

```

### Step 3: Define Reducer (`counter.reducer.ts`)

```typescript
import { createReducer, on } from '@ngrx/store';
import { increment, resetTo } from './counter.actions';
import { initialState } from './counter.state';

export const counterReducer = createReducer(
  initialState,
  on(increment, (state) => ({ ...state, myCount: state.myCount + 1 })),
  on(resetTo, (state, { value }) => ({ ...state, myCount: value }))
);

```

### Step 4: Write Selectors (`counter.selectors.ts`)

```typescript
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CounterState } from './counter.state';

export const selectCounterState = createFeatureSelector<CounterState>('cState');
export const selectMyCount = createSelector(
  selectCounterState,
  (state) => state.myCount
);

```

### Step 5: Dispatch & Select in Component (`counter.component.ts`)

```typescript
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { increment, resetTo } from './store/counter.actions';
import { selectMyCount } from './store/counter.selectors';

@Component({
  selector: 'app-counter',
  template: `
    <p>Count: {{ count$ | async }}</p>
    <button (click)="onIncrement()">+</button>
  `
})
export class CounterComponent implements OnInit {
  count$: Observable<number>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.count$ = this.store.select(selectMyCount);
  }

  onIncrement() {
    this.store.dispatch(increment());
  }
}

```

---

## 6. Advanced Patterns: RxJS Search & Generic Interfaces

### RxJS Search Pipeline (Best Practice)

To avoid spamming an API on keypress, use this declarative pipeline:

```typescript
this.results$ = this.searchControl.valueChanges.pipe(
  map(val => val.trim()),
  debounceTime(200),           // Wait for user to stop typing
  distinctUntilChanged(),      // Avoid duplicate calls
  filter(val => val !== ''),   // Don't search empty strings
  switchMap(val => this.apiService.search(val).pipe(
    retry(3),                  // Robustness against minor network blips
    startWith([])              // Emit empty array instantly on start
  ))
);

```

### Generic CRUD Action Interface

Useful for scaling state architecture across multiple domains without duplicating interfaces:

```typescript
export interface CRUDAction<T> {
  action: 'add' | 'update' | 'delete';
  data: T;
}

```
