## React Redux
- **React Redux** is the official React UI bindings layer for Redux. It lets your React components read data from a **Redux store**, and dispatch **actions** to the store to update state.
- The **Redux Toolkit** package is intended to be the standard way to write Redux logic.
- To install the Redux toolkit:
  `npm install @reduxjs/toolkit react-redux`
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
#### index.js (app):
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
