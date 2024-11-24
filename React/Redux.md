## React Redux
- **React Redux** is the official React UI bindings layer for Redux. It lets your React components read data from a **Redux store**, and dispatch **actions** to the store to update state.
- The **Redux Toolkit** package is intended to be the standard way to write Redux logic.
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
#### SongPlaylist.jsx (Cild Component)::
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
#### songsSlice.js:
- **Slices** are the core of Redux Toolkit. A slice manages a specific part of the state and automatically generates **actions** and **reducers**.
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

export const { addSong, removeSong } = songsSlice.actions;
export const songsReducer = songsSlice.reducer;
```
#### actions.js:
- Create an actions that impact more than one sclice.
```javascript
import { createAction } from "@reduxjs/toolkit";
export const reset = createAction("app/reset");
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
