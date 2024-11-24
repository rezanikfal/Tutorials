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
