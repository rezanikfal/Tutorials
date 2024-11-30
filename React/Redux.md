## React Redux
- **React Redux** is the official React UI bindings layer for Redux. It lets your React components read data from a **Redux store**, and dispatch **actions** to the store to update state.
- The **Redux Toolkit** package is intended to be the standard way to write Redux logic.
- To install the Redux toolkit:
  `npm install @reduxjs/toolkit react-redux`
### Design Redux Store
- Identify the core features of the application.
- When a content on the screen is changing, we need a `state`.
- Avoid Derived States, derive it using `selectors` instead of storing it.
- Use a **Flat State** Structure:
```javascript
// Nested State (Bad)
const state = {
  user: {
    profile: {
      name: 'John',
      age: 30,
    },
    settings: {
      theme: 'dark',
      notifications: true,
    },
  },
};
```
```javascript
// Flat State (Good)
const state = {
  userProfile: {
    name: 'John',
    age: 30,
  },
  userSettings: {
    theme: 'dark',
    notifications: true,
  },
};
```
- Group similar state changes together (e.g., all task-related actions in the tasks slice).
- Consider creating slices for each domain (Group).
### Project structure
```javascript
├── public/
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── components/
│   │   ├── MoviePlaylist.jsx
│   │   ├── SongPlaylist.jsx
│   │
│   ├── data/
│   │   ├── index.js
│   │
│   ├── store/
│   │   ├── slices/
│   │   │   ├── moviesSlice.js
│   │   │   ├── songsSlice.js
│   │   ├── actions.js
│   │   ├── index.js
├── package.json
```
#### index.js (store):
- Redux Toolkit provides a function called `configureStore` that simplifies store configuration.
- We make use of `index.js` in store to Centralize Exports for Better Organization.
- After combining the reducers, `configureStore` passes the resulting root reducer to Redux's `createStore` function (under the hood) to create the `store`.
```javascript
import { configureStore } from "@reduxjs/toolkit";
import { songsReducer, addSong, removeSong } from "./slices/songsSlice";
import { moviesReducer, addMovie, removeMovie } from "./slices/moviesSlice";
import { reset } from "./actions";

const store = configureStore({
  reducer: {
    songs: songsReducer,
    movies: moviesReducer
  }
});

export { store, reset, addSong, removeSong, addMovie, removeMovie };
```
- The key `songs` will be used in the **Redux store**, and its corresponding state will be managed by the `songsReducer` or `songSlice.reducer`.
- The key `songs`is **NOT** related to the **slice name**. Slice name will be used for action creators.
- Store will be like this:
```javascript
  {
    songs: [song1, song2, song3],
    movies: [movie1, movie2, movie3, movie4]
  }
```
#### App.js (Parent Component):
```javascript
import "./styles.css";
import { useDispatch } from "react-redux";
import MoviePlaylist from "./components/MoviePlaylist";
import SongPlaylist from "./components/SongPlaylist";
import { reset } from "./store";

export default function App() {
  const dispatch = useDispatch();

  const handleResetClick = () => {
    dispatch(reset());
  };

  return (
    <div className="container is-fluid">
      <button onClick={() => handleResetClick()} className="button is-danger">
        Reset Both Playlists
      </button>
      <hr />
      <MoviePlaylist />
      <hr />
      <SongPlaylist />
    </div>
  );
}
```
#### SongPlaylist.jsx (Child Component)::
- The `useSelector` hook allows components to read data from the Redux store.
- The `useDispatch` hook is used to send actions to the Redux store.
```javascript
import { useDispatch, useSelector } from "react-redux";
import { createRandomSong } from "../data";
import { addSong, removeSong } from "../store";

function SongPlaylist() {
  const dispatch = useDispatch();
  const songPlaylist = useSelector((state) => {
    return state.songs;
  });

  const handleSongAdd = (song) => {
    dispatch(addSong(song));
  };
  const handleSongRemove = (song) => {
    dispatch(removeSong(song));
  };

  const renderedSongs = songPlaylist.map((song) => {
    return (
      <li key={song}>
        {song}
        <button onClick={() => handleSongRemove(song)} className="button is-danger">X</button>
      </li>
    );
  });

  return (
    <div className="content">
      <div className="table-header">
        <h3 className="subtitle is-3">Song Playlist</h3>
        <div className="buttons">
          <button onClick={() => handleSongAdd(createRandomSong())} className="button is-link">Add</button>
        </div>
      </div>
      <ul>{renderedSongs}</ul>
    </div>
  );
}

export default SongPlaylist;
```
- **Slices** are the core of Redux Toolkit. A slice manages a specific part of the state and automatically generates **actions** and **reducers**.
- **reducer function** vs **action creator**:
  - `addSong` is a reducer function
  - Redux Toolkit also automatically generates an **action creator** with the same name.
  - Here is how we export action creators: `export const { addSong, removeSong } = songsSlice.actions;`
  - When you call `addSong('New Song')`, it creates and returns an action object. 
  - `dispatch` sends the action object (created by addSong('New Song')) to the Redux store.
```javascript
// Action Object
{
  type: 'song/addSong',  // The action type (slice name/reduce name)
  payload: 'New Song'    // The data you passed to the action creator
}
```
- The Redux store matches the type of the dispatched action `(song/addSong)` with the reducer in the slice.
- The addSong reducer (defined in the reducers object) is executed to update the state
- Redux Toolkit leverages **Immer** for immutable state updates under the hood.
- Since the initialState is a string (**a primitive type**), the reducer must explicitly **return** the new value as the updated state:
```javascript
addMyValue(state, action) {
  return action.payload;
}
```
- if the state is an object(**a reference type**):
```javascript
addMyValue(state, action) {
  // Immer allows you to "mutate" the state directly
  state.value = action.payload;
}
```
```javascript
// Without Immer
addMyValue(state, action) {
  // Without Immer, return a new state object explicitly
  return {
    ...state, // Spread the existing state
    value: action.payload, // Update the specific field
  };
}
```
---

### Summary of Key Differences

| **Action**                  | **With Immer**                              | **Without Immer**                       |
|-----------------------------|---------------------------------------------|-----------------------------------------|
| Modifying an Object Field   | `state.field = value;`                     | `return { ...state, field: value };`   |
| Adding to an Array          | `state.push(value);`                       | `return [...state, value];`            |
| Removing from an Array      | `state.splice(index, 1);`                  | `return state.filter((_, i) => i !== index);` |
| Replacing Primitive State   | `return value;`                            | `return value;`                        |

---
#### songsSlice.js:
```javascript
import { createSlice } from "@reduxjs/toolkit";
import { reset } from "../actions";

const songsSlice = createSlice({
  name: "song",
  initialState: [],
  reducers: {
    addSong(state, action) {
      state.push(action.payload);
    },
    removeSong(state, action) {
      // action.payload === string, the song we want to remove
      const index = state.indexOf(action.payload);
      state.splice(index, 1);
    }
  },
  extraReducers(builder) {
    builder.addCase(reset, (state, action) => {
      return [];
    });
  }
});

export const { addSong, removeSong } = songsSlice.actions;  // Goes to the components to be dispatched
export const songsReducer = songsSlice.reducer;             // Goes to the index.js store
```
- Creating a **standalone action creator** named `reset` using `createAction` that impact more than one sclice.
- To create action with payload we always follow this format:
```javascript
export const reset = createAction("app/reset", (customPayload) => {
  return {
    payload: customPayload, // Attach the custom payload
  };
});
```
- By `dispatch(reset({ reason: "user logged out" }));`:
  - We dispatch a shared action like `reset` in Redux, any slice that has a reducer handling that action (via `extraReducers`) will respond to it.
  - This allows you to trigger updates to multiple states in the store **simultaneously**.
#### actions.js:
```javascript
import { createAction } from "@reduxjs/toolkit";
export const reset = createAction("app/reset"); // No action payload
```
#### main.jsx/index.js (app):
- To provide the Redux store to your React app, wrap your app with the Provider component from React-Redux.
```javascript
import "bulma/css/bulma.css";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```
### Using extraReducer
- An `extraReducer` in Redux Toolkit is a way to handle actions in slices that are not defined within .
- When an action is dispatched in Redux Toolkit, **every** slice in the application receives the action (global nature of Redux actions).
- Only those slices that explicitly handle the action (e.g., in `reducers` or `extraReducers`) will react to it.
- Here is a sample of reacting to action `addCar` from `carsSlice` in `formSlice`.
  - When a user enters a car, by dispathing `addCar` we add the car to selected cars (managed by `carsSlice`).
  - Also we should reset the form (managed by `carsSlice`). We make use of `addCar` action that **already dispatched** to do this. Instead of dispathing `changeName`/`changeCost` actions.
  - So, When we do **multiple dispatch** to handle an event, There is a chance to re-use the main dispatch to cover others. 
```javascript
//FORM Slice
import { createSlice } from '@reduxjs/toolkit';
import { addCar } from './carsSlice';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    name: '',
    cost: 0,
  },
  reducers: {
    changeName(state, action) {
      state.name = action.payload;
    },
    changeCost(state, action) {
      state.cost = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(addCar, (state, action) => {
      state.name = '';
      state.cost = 0;
    });
  },
});

export const { changeName, changeCost } = formSlice.actions;
export const formReducer = formSlice.reducer;
```
```javascript
//CAR Slice
import { createSlice, nanoid } from '@reduxjs/toolkit';

const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    searchTerm: '',
    data: [],
  },
  reducers: {
    changeSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    addCar(state, action) {
      // Assumption:
      // action.payload === { name: 'ab', cost: 140 }
      state.data.push({
        name: action.payload.name,
        cost: action.payload.cost,
        id: nanoid(),
      });
    },
    removeCar(state, action) {
      // Assumption:
      // action.payload === the id of the car we want to remove
      const updated = state.data.filter((car) => {
        return car.id !== action.payload;
      });
      state.data = updated;
    },
  },
});

export const { changeSearchTerm, addCar, removeCar } = carsSlice.actions;
export const carsReducer = carsSlice.reducer;
```
### Async Thunks
#### Reducer Best Practices in React Redux:
- The Redux store expects reducers to return the new state immediately (It is crucial for Redux to detect state changes efficiently.).
- Reducers are pure functions. So they return a value that depends solely on the input (state and action).
- Asynchronous operations should be handled outside the reducer (e.g. Middleware like `redux-thunk`).
