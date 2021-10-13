# NgRx Tutorial 

- For Each module we can create a Store and register the store on `appName.module.ts`
- Store includs the following folders: 
  - `counter.actions.ts`
  - `counter.reducer.ts`
  - `counter.selectors.ts`
  - `counter.state.ts`

## Store Elements Sample Code

1- `counter.state.ts`:

By default it includs the **State Interface** & **Initial State**.

```javascript
export interface CounterState {
  counter: number,
  channelName:string
}
export const initialState = {
  counter: 0,
  channelName:'Reza from Citi'
}    
```

2- `counter.actions.ts`

- Any Component tells give me something or update something. It is **Actions** (with or without Data):

```javascript
import { createAction, props } from '@ngrx/store'

export const increment = createAction('increment')
export const customIncrement = createAction('customincrement', props<{ count: number }>())
```

- **ES6** Format:

```javascript
import { createAction } from '@ngrx/store'

export const increment = createAction('increment')
export const customIncrement = createAction('customincrement', (count: number)=>({count}))
```

3- `counter.reducer.ts`

Adding the business logic for each Actions:

```javascript
import { createReducer, on } from '@ngrx/store'
import { customIncrement, increment } from './counter.actions'
import { initialState } from './counter.store'

const _counterReducer = createReducer(
  initialState,
  on(increment, (state) => {
    return {
      ...state,
      counter: state.counter + 1,
    }
  }),
  on(customIncrement, (state, action) => {
    return {
      ...state,
      counter: state.counter + action.count,
    }
  })
)

export function counterReducer(state, action) {
  return _counterReducer(state, action)
}
```