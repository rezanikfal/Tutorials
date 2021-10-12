# NgRx Tutorial 

- For Each module we can create a Store and register the store on `appName.module.ts`
- Store includs the following folders: 
  - `counter.actions.ts`
  - `counter.reducer.ts`
  - `counter.selectors.ts`
  - `counter.state.ts`

## Store Elements Sample Code

1- `counter.state.ts`

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
