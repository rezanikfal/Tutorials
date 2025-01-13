## React Redux
- **React Redux** is the official React UI bindings layer for Redux. It lets your React components read data from a **Redux store**, and dispatch **actions** to the store to update state.
- The **Redux Toolkit** package is intended to be the standard way to write Redux logic.
- To install the Redux toolkit:
  `npm install @reduxjs/toolkit react-redux`
### Design Redux Store
- Identify the core features of the application.
- When a content on the screen is changing, we need a `state`.
- Avoid Derived States, derive it using `selectors` instead of storing it.
- Use a **Flat State** Structure (Normalized Form):
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
- **Normalized** Form vs **Denormalized** Form Data Structure
```javascript
// Denormalized
const allData = [
  {
    id: 50,
    name: 'Myra',
    albumes: [
      { id: 1, title: 'Albume #1' },
      { id: 2, title: 'Albume #2' }
    ]
  },
  {
    id: 51,
    name: 'Alex',
    albumes: [
      { id: 3, title: 'Albume #3' },
      { id: 4, title: 'Albume #4' }
    ]
  }
];
```
```javascript
// Normalized (Recommended)
const listOfAlbums = [
  { id: 1, title: 'Album #1', userId: 50 },
  { id: 2, title: 'Album #2', userId: 50 },
  { id: 3, title: 'Album #3', userId: 51 },
  { id: 4, title: 'Album #4', userId: 51 }
]

const listOfUsers = [
   { id: 50, name: 'Myra' },
   { id: 51, name: 'Alex' }
]
```
| **Aspect**          | **Normalized**                     | **Denormalized**                     |
|----------------------|-------------------------------------|---------------------------------------|
| **Structure**        | Data split into entities by `id`.  | Data embedded in a single structure. |
| **Redundancy**       | Low                                | High                                  |
| **Ease of Access**   | Requires lookups                  | Direct                                |
| **Updates**          | Efficient                         | Inefficient                           |
| **Scalability**      | High                              | Low                                   |
| **Use Case**         | Complex relationships             | Simple or independent data            |
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
- **Async Thunk Functions** are older techniques for fetching data.
- **RTK (Redux Toolkit) Query** is seen as the newer and fancier way to fetch data.
#### Reducer Best Practices in React Redux:
- The Redux store expects reducers to return the new state immediately (It is crucial for Redux to detect state changes efficiently.).
- Reducers are pure functions. So they return a value that depends solely on the input (state and action).
- Asynchronous operations should be handled outside the reducer (e.g. Middleware like `redux-thunk`).
#### Create Async Thunks middleware:
```javascript
// store/thunks/fetchUser.js

mport { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const response = await axios.get('http://localhost:3005/users');

  return response.data;
});

export { fetchUsers };
```
- handling the different states of the asynchronous operation (`pending`, `fulfilled`, `rejected`).
```javascript
// store/slices/usersSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from '../thunks/fetchUsers';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const usersReducer = usersSlice.reducer;
```
- Integrating with a Redux store to fetch and display a list of users.
```javascript
// store/components/usersList.js

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store';

function UsersList() {
  const dispatch = useDispatch();
  const { isLoading, data, error } = useSelector((state) => {
    return state.users;
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data...</div>;
  }

  return <div>{data.length}</div>;
}

export default UsersList;
```
- When you dispatch a createAsyncThunk like fetchUsers, it returns a promise that resolves to an action.
- Using `.unwrap()` simplifies error handling (whitout `.unwrap()` both success & error scenarios go to `then()`)
```javascript
dispatch(fetchUsers())
  .unwrap()
  .then((data) => {
    console.log('Fetched data:', data); // Logs the payload
  })
  .catch((error) => {
    console.error('Error fetching data:', error); // Logs the error object
  });
```
### RTK Query
- RTK Query helps manage API calls and state for an application in a structured way.
#### reducerPath
- The `reducerPath` in RTK Query defines the key in the Redux store where the API state is stored.
- You must add its reducer to the store under the specified `reducerPath`.
- It includes multiple states that act behind the scene. like:
```javascript
{
  users: {  // Normal states
    isLoading: false,
    error: null,
    data: [],
  }
  albums: {  // reducerPath, RTK Query states (not visible)
    queries: {},
    mutations: {},
    provided: {},
    subscriptions: {},
    config: {}
  }
}
```
#### baseQuery
- `baseQuery` is the mechanism for handling how requests are made in RTK Query. Use `fetchBaseQuery` for simple REST APIs.
#### endpoints
- The `endpoints(builder)` function is the backbone of an RTK Query API slice.
- It defines the **queries** and **mutations** your application can perform and allows for flexible configurations.
#### API Slice:
- Here is the api slice file (`albumsApi.js`) for **Albumes** data:
```javascript
// store/apis/albumsApi.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

const albumsApi = createApi({
  reducerPath: 'albums',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
  }),
  endpoints(builder) {
    return {
      addAlbum: builder.mutation({
        query: (user) => {
          return {
            url: '/albums',
            method: 'POST',
            body: {
              userId: user.id,
              title: faker.commerce.productName(),
            },
          };
        },
      }),
      fetchAlbums: builder.query({
        query: (user) => {
          return {
            url: '/albums',
            params: {
              userId: user.id,
            },
            method: 'GET',
          };
        },
      }),
    };
  },
});

export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumsApi;
export { albumsApi };
```
#### Setup Redux Store:
- Here is how we integrate the Api Slice with Redux Store:
```javascript
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { usersReducer } from './slices/usersSlice';
import { albumsApi } from './apis/albumsApi';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(albumsApi.middleware);
  },
});

setupListeners(store.dispatch);

export { useFetchAlbumsQuery, useAddAlbumMutation } from './apis/albumsApi';
```
#### RTK Query Hooks:
- Each endpoint defined here is used to generate **hooks** like `useFetchAlbumssQuery` or `useAddAlbumMutation`.
- They are making it easy to integrate these api call operations into React components.
- Notice how the `user` as the dynamic data passed to **queries** and **mutations** to specify which user's albums to fetch or update.
- The `user` will be used in the `query` property of the `endpoints` function in the API Slice.
```javascript
import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store';
import Skeleton from './Skeleton';
import ExpandablePanel from './ExpandablePanel';
import Button from './Button';

function AlbumsList({ user }) {
  const { data, error, isLoading } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();

  const handleAddAlbum = () => {
    addAlbum(user);
  };

  let content;
  if (isLoading) {
    content = <Skeleton times={3} />;
  } else if (error) {
    content = <div>Error loading albums.</div>;
  } else {
    content = data.map((album) => {
      const header = <div>{album.title}</div>;

      return (
        <ExpandablePanel key={album.id} header={header}>
          List of photos in the album
        </ExpandablePanel>
      );
    });
  }

  return (
    <div>
      <div>
        Albums for {user.name}
        <Button onClick={handleAddAlbum}>+ Add Album</Button>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default AlbumsList;
```
#### Queries vs Mutations:
| **Aspect**             | **Queries**                        | **Mutations**                        |
|-------------------------|-------------------------------------|--------------------------------------|
| **Purpose**             | Fetching (reading) data.           | Creating, updating, or deleting data.|
| **HTTP Methods**        | Typically `GET`.                   | Typically `POST`, `PUT`, `DELETE`.   |
| **Caching**             | Automatic caching of responses.    | No automatic caching.                |

#### isLoading vs isFetching:
-  `isLoading` is `true` **only** during the **first** fetch.
-  `isFetching` is true **whenever** a network request is in progress.
```javascript
const { data, error, isLoading } = useFetchAlbumsQuery(user);
```
### Memoized Selector:
#### Expensive Calculation:
- The selector is always recalculated when the Redux store updates.Even if the inputs to the selector haven't changed.
  - We need memoization for any expensive computation:
```javascript
const state = {
  numbers: Array.from({ length: 100000 }, (_, i) => i + 1), // 1 to 100,000
};
```
- Every time the selector is called, the expensive calculation `reduce` runs again, even if state.numbers hasn’t changed:
```javascript
const selectSumOfSquares = (state) => {
  console.log("Calculating sum of squares...");
  return state.numbers.reduce((sum, num) => sum + num ** 2, 0);
};

const result1 = selectSumOfSquares(state); // Logs: "Calculating sum of squares..."
const result2 = selectSumOfSquares(state); // Logs: "Calculating sum of squares..." again
```
- Memoized Selector
```javascript
import { createSelector } from "@reduxjs/toolkit"

const selectNumbers = (state) => state.numbers;
const selectSumOfSquares = createSelector(
  [selectNumbers],
  (numbers) => {
    console.log("Calculating sum of squares...");
    return numbers.reduce((sum, num) => sum + num ** 2, 0);
  }
);
```
#### Performing transformation:
- React-Redux's useSelector compares the selector's new result with its previous result using **strict equality (===)**.If the result is the same, React skips the component's re-render.
  - If the selector performs any transformation, like **filtering**, **mapping**, or **creating a new object/array**, memoization becomes critical.
  - Because with any store update, you create a new reference variable.
```javascript
const selectActiveAccounts = (state) => {
  const accounts = state.accounts.accountsInfo;
  return accounts.filter((account) => account.isActive);
};
```
- Since `.filter()` returns a new array, the reference will always be different, potentially causing unnecessary re-renders in components using useSelector.
- So we memoize the selector using `createSelector`
```javascript
import { createSelector } from "@reduxjs/toolkit"

const selectAccounts = (state) => state.accounts.accountsInfo;
const selectActiveAccounts = createSelector(
  [selectAccounts],
  (accounts) => accounts.filter((account) => account.isActive)
);
``` 
#### Direct Object Selection:
- You don’t need to memoize when the slice of the Redux store is an object and you are directly selecting it without modifications.
- In Redux, on any state update, the reducer returns a new state object while leaving the previous state intact.
```javascript
const state = {
  user: { id: 1, name: "John" },
  settings: { theme: "dark" },
};

// Reducer updates `user` slice only
const newState = {
  ...state,
  user: { ...state.user, name: "Jane" },
};

console.log(state.settings === newState.settings); // true (reference unchanged)
console.log(state.user === newState.user); // false (new object created)
``` 
- In case you transform the API response to a new object using `transformResponse`, the transformed data becomes part of your Redux store.
- It behaves just like any other slice of your Redux state.
- The memoization happens inside the function returned by `createSelector`. It keeps track of:
  - The last input values (`lastInputs`).
  - The last computed result (`lastResult`).
- If no change happens to the input values, the function returned by `createSelector` leverages its memoization mechanism and returns `lastResult`.
- So, `state.complexObject` works exactly the same. even if you drive a property `like state.complexObject.users`. NO need to memoization using `createSelector`.
- If you’re computing derived data (e.g., **filtering**, **mapping**), you should use `createSelector` to memoize the result.
- Because React’s `useSelector` checks for strict equality (===) to determine whether to trigger a re-render.
## Primitive & Reference / Mutable & Immutable
- Primitive Types: Immutable data types like `string`, `number`, `boolean`.
  - Values are stored directly.
  - Comparisons `(===)` check values, not memory references.
```javascript
let a = "REZA";
let b = a;
b = "REZA2"
console.log(a === b); // false
``` 
- Reference Types: Mutable types like `object`, `array`, and `function`.
  - Stored in memory by reference.
  - Comparisons `(===)` check references, not the actual content.
```javascript
let obj1 = { name: "REZA" };
let obj2 = { name: "REZA" };
console.log(obj1 === obj2); // false (different references)
``` 
```javascript
let obj1 = { name: "REZA" };
let obj2 = obj1;
obj2.age = 12
console.log(obj1 === obj2); // true, both are {name: 'REZA', age: 12}
```
### Selectors and immutable stores
- if the selector is directly accessing a slice of state from the Redux store, you generally don’t need to use `createSelector`.
- This is because the Redux store is updated immutably, ensuring that reference equality `(===)` works as expected.
- If you update the Redux store **mutably**, selectors (or any components that rely on the store) won't detect changes because of the same reference.
- a state change is required to **notify** all subscribers (e.g., components using `useSelector` or `connect`) so that they can determine whether their associated selectors need to re-run or not.
- Whenever the store's state is updated (after an action is dispatched and the reducer processes it), React-Redux:
  - Calls the selector function `(state) => state.user` with the updated store state (it re-calculate and returns the new value).
  - React-Redux assumes that reducers return a new state object after every action, even if the new state looks identical to the old state.
  - Without memoization, React-Redux will always execute the selector after every state update, even if the state (or the specific slice of state the selector depends on) is identical.
  - Compares the returned value (state.user) to the value returned during the previous state. The comparison checks if the two values are strictly equal (===).
    - If the value is the same: React-Redux skips re-rendering the connected component.
    - If the value is different: React-Redux triggers a re-render of the connected component.
    - If it is input selector for a Memoized selector (with no UI connection),the Memoized selector gets recalculated in case of any change in the input selector's result.
    - If it is input selector for a Memoized selector (with no UI connection),the Memoized selector returns its previous result in case of no change in the input selector's result.
- Use `createSelector` for calculations, filtering, or other transformations to optimize performance.
- In other words, with any change to the store, all selectors are notified:
  - Direct Selectors: If the slice of the state associated with the selector does not change, React-Redux skips re-rendering because the Redux store updates immutably. The reference remains the same, so the shallow comparison (===) prevents unnecessary updates.
  - Derived Selectors: If the selector returns a reference type (like an object or array), a new reference is created with every store change unless memoization is used. This can cause unnecessary UI re-renders even if the derived data hasn't actually changed.
- To prevent these issues:
  - Memoize Derived Selectors: Use `createSelector` to ensure that if the input state/selectors remain unchanged, the selector returns the previously computed value without recalculating. This prevents unnecessary re-renders by keeping the reference stable.
  - Optimize Heavy Computations: For selectors involving expensive calculations, memoization avoids redundant recomputation, further improving performance. Even if recalculating with the same inputs gives the same output (avoiding re-renders), avoiding the computation altogether saves processing time.
```javascript
import { createSelector } from 'reselect';

// Selector to get all items
const selectItems = (state) => state.items;

// Memoized selector to filter items
const selectFilteredItems = createSelector(
  [selectItems],
  (items) => items.filter((item) => item.isVisible)
);

// Usage in a component
const filteredItems = useSelector(selectFilteredItems);
```
