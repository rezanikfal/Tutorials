### npm vs npx:
- ```npm``` is a package manager to install, manage, and share JS packages.
- ```npx``` is used to execute packages directly from the ```npm``` registry without having to first install them globally or locally.
- Use ```npx``` when you want to run a package as a one-time command like create-react-app.
## Environment Setting
### VS-Code Extensions:
- ESLint
- Material Icon Theme
- Prettier - Code formatter
### VS-Code Settings:
- auto save -> onFocusChange
- default formatter -> Prettier - Code formatter
- format on save -> checked
- ESLint run -> onSave
### Vite
- Vite is a modern build tool and development server for frontend projects. It does
  - On-Demand Compilation
  - Hot Module Replacement (HMR)
  - Optimized Production Builds
- `npm create vite@4.1.0` for creating an react app (you can choose another version).
- When using `Vite` for a React project, the setup is indeed different compared to `Create React App`.
- The extensions must be `.jsx` and `index.js` is replaced by `main.jsx`.
```javascript
my-vite-app/
│
├── index.html
│
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── ...
│
├── public/  (Optional, for static assets)
│   ├── ...
│
├── package.json
└── ...
```
## Serving React Project 
### Developement
- We should run this on the terminal: `npm run dev`
- The app is not bundled or minified like in a production build.
- You see all components and React libs to make the app **Developer-Friendly**, usable by **React DevTools** and **Not Optimized**.
- Sample of files:
```javascript
Network Tab
│
├── localhost (index.html)
├── client
├── main.jsx
├── @react-refresh
├── env.mjs
├── jsx-dev-runtime
├── react.js?v=b4276e97
├── react-dom_client.js?v=b4276e97
├── App.jsx
├── react_jsx-dev-runtime.js?v=b4276e97
├── localhost
├── chunk-CORUIQPR.js?v=b4276e97
├── chunk-6TJCVOLN.js?v=b4276e97
├── ImagesList.jsx
├── SearchBar.jsx
├── searchImage.js
├── SingleImage.jsx
├── axios.js?v=b4276e97
├── Othervite.svg
```
### Production (same progect)
- We should run this on the terminal: `npm run build`.
- To run the Production Version of the App in the browser, you need to preview it using a local web server: `npx vite preview`.
- The build process creates a dist directory containing the production-ready files (one or more JS files)
- Vite processes your application files, **compiles** and **optimizes** the code, and outputs the final assets in the `dist` folder.
- Sample of files:
```javascript
Network Tab (dist folder)
│
├── localhost (index.html)
├── index-888a862b.js
├── Othervite.svg

```
## Pass State/EnevtHandler from parent to child :
- It is a community convension to use `value` and `onChange`:
```javascript
function App() {
    const [selection, setSelection] = useState(null)
    const handleSelection = (option) => setSelection(option)
...
    return <Dropdown options={options} value={selection} onChange={handleSelection} />
-----------------------------------------------------------------------------------------
    // function Dropdown({ options, value, onChange }) { ...
}
```
## Get the control from the browser and put under the State Control :
```javascript
import { useState } from "react";

function SearchBar({ onSubmit }) {
  const [term, setTerm] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSubmit(term);
  };

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input value={term} onChange={handleChange} />
      </form>
    </div>
  );
}

export default SearchBar;
```
### A trick just to get numbers as input value (And upper case) :
```javascript
  const handleChange = (e) => {
    setTerm(e.target.value.replace(/[a-z]/, ""));
  };
```
## Call a function outside of the `map`:
- Passing `index` outside of the map
```javascript
function Accordion({ items }) {
    const [expendedIndex, setExpandedIndex] = useState(0)
    const handleEvent = (i) => {setExpandedIndex(i)}  //Receives the index

    const renderedItems = items.map((item, index) => {
        const isExpanded = expendedIndex === index
        return (
            <div key={item.id}>
                <div style={{ fontWeight: 'bold' }} onClick={() => handleEvent(index)}>{item.label}</div>
                {isExpanded && <div>{item.content}</div>}
            </div>
        )
    })
    return <div>
        {renderedItems}
    </div>
}
```
### Why Keys:
- Lets say we render a big list of elements using ```map```.
- If we use Keys, after any change React just compares the keys before and after update.
- Then React understands what was the change and does a minimal rendering.
- `Keys` should be applied on the TOP MOST ITEM:
```javascript
const renderedImage = images.map(image=>{
<ImageShow key = {image.id}/>
}
```
 ```javascript
const renderedImage = images.map(image=>{
<div key = {image.id}>
   <ImageShow />
</div>
}
```
### CSS File
- You can import a CSS file directly into a component file. This approach ensures that the styles in the CSS file are available **globally**:
 ```javascript
// MyComponent.js
import React from 'react';
import './MyComponent.css'; // Import the CSS file

function MyComponent() {
  return (
    <div className="my-component">
      <h1>Hello, World!</h1>
    </div>
  );
}

export default MyComponent;
```
- **CSS Modules** automatically generate unique class names to ensure styles are scoped locally to the component.
- With CSS Modules we **cannot** use `className={styles.my-component}`.
 ```javascript
// MyComponent.js
import React from 'react';
import styles from './MyComponent.module.css'; // Import the CSS Module

function MyComponent() {
  return (
    <div className={styles.myComponent}>
      <h1 className={styles.heading}>Hello, World!</h1>
    </div>
  );
}

export default MyComponent;
```
 ```css
.myComponent {
  background-color: lightblue;
}

.heading {
  color: darkblue;
}
```
### axios
- We make API calls in your React application using **Axios**
- For `Get` call: `const response = await axiosInstance.post('/users', userData, config);`
- For `Post/Put` call: `const response = await axiosInstance.post('/users', config);`
- `config` is an object like:
 ```javascript
    const config = {
      headers: {
        Authorization: 'Bearer your-token', // Example of adding an Authorization header
        'Custom-Header': 'customValue',     // Any other custom headers
      },
      params: {
        albumId: term, // For query parameters like https://test.com/photos?albumId=11
      },
    };
```
- Sample code:
 ```javascript
const searchImage = async (term) => {
  const imagesObject = await axios.get(
    "https://jsonplaceholder.typicode.com/photos",
    {
      params: {
        albumId: term,
      },
    }
  );

  return imagesObject.data;
};
```
 ```javascript
import { useState } from "react";
import searchImage from "./api/searchImage";

function App() {
  const [searchTermArray, setSearchTermArray] = useState([]);
  const handleSearch = async (term) => {
    const imageArray = await searchImage(term);
    setSearchTermArray(imageArray);
  };
 return ...
```
## State Updates cheat sheet:
https://state-updates.vercel.app
## Event handler paremeter :
- When we pass off the handleClick entirely, it receives event object. **onClick={handleClick}.**
```javascript
  const handleClick = (event) => {
    setExpandedIndex(event.target.value);
  };
    return (
      <div key={item.id}>
        <div onClick={handleClick}>{item.label}</div>
        {isExpanded && <div>{item.content}</div>}
      </div>
    );
```
- When we call handleClick manually, it receives the parameter. **onClick={() => handleClick(index)}.**
```javascript
  const handleClick = (nextIndex) => {
    setExpandedIndex(nextIndex);
  };
    return (
      <div key={item.id}>
        <div onClick={() => handleClick(index)}>{item.label}</div>
        {isExpanded && <div>{item.content}</div>}
      </div>
    );
```
## Design a React project :
- **States** : User sees something on the screen change
- **Event handler**: User committed some action
## Organise a React project :
- **Components** : Reusable react components that shows a handful of elements
- **Page**: Still a react components that not intended to be reused
```javascript
src/  
    ==========
    components
    ==========
        -----
        forms
        -----
            Input.js
            SearchBar.js
        --------
        products
        --------
            ProductShow.js
            ProductList.js
    =====
    pages
    =====
        LoginPage.js
        CartPage.js
```
## Boolean props :
- The following Boolean props are equivalent.
```javascript
<Button primary={true} > test</Button >
<Button primary > test</Button > 
```
- If we remove the prop, it will be considered as _undefined_ but we can handle it as **false**.
```javascript
<Button primary={false} > test</Button >
<Button> test</Button > 
```
## React Portal:
- Used to render a child component into a **different part of the DOM tree** outside of its parent component's hierarchy, while still being part of the React component tree.
```javascript
import React from "react";
import ReactDOM from "react-dom";

function Modal({ children }) {
  // Rendering the children into a DOM node outside the regular hierarchy
  return ReactDOM.createPortal(
    children,
    document.getElementById("modal-root") // The target DOM node
  );
}

function App() {
  return (
    <div>
      <h1>Main App Content</h1>
      <Modal>
        <div className="modal-content">This is a modal rendered via a portal!</div>
      </Modal>
    </div>
  );
}

export default App;
```
```html
<body>
  <div id="root"></div>
  <div id="modal-root"></div> <!-- The portal target -->
</body>
```
## children prop :
- `children`: A special prop that lets you pass any content into a component. Useful for creating flexible and reusable components.
```javascript
function App() {
    return <div>
      <Button>click me!</Button>
    </div>;
}
-----------------------
function Button({children}) {
    return <button>{children}</button>   // {children} = click me!
}
```
- `React.Children.map`: A utility to safely iterate over `children`. It’s similar to `Array.map` but specifically designed for React’s `children`.
- `React.cloneElement`: A method to clone an element and add or modify its props.
```javascript
import React from "react";

function StyledWrapper({ children }) {
  return (
    <div>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, { className: "styled-child", key: index })
      )}
    </div>
  );
}

// Usage
function App() {
  return (
    <StyledWrapper>
      <p>Text 1</p>
      <p>Text 2</p>
    </StyledWrapper>
  );
}

export default App;
```
## useState
- useState: To Handle **States**
### Controlled and uncontrolled components
- a controlled component refers to a component whose behavior is controlled by the **state** of the application.
- In contrast, uncontrolled component is controlled by **DOM**.
```javascript
// Uncontrolled
<div>
    <label>Item Name</label>
    <input type="text" />
</div>

// Controlled
const [name, setName] = useState('');
<div>
    <label>Item Name</label>
    <input type="text" value={name} onChange={e => setName(e.target.value)} />
</div>
```
- **Derived state** refers to state values that are calculated or derived based on the existing state or props.
- No need to create a new state in this situation.
```javascript
function ItemsList({ items }) {
    // Any change on items (state) make a change on the totalPrice (Derived state)
    const totalPrice = items.reduce((acc, item) => acc = acc + item.price * item.quantity, 0)
    return (
        <div>
            <h3>Items List</h3>
            {items.map(x => <SingleItem key={x.id} item={x} />)}
            <div className="total">Total Price: ${totalPrice}</div>
        </div>
    )
}
```
## useEffect
- useEffect: To perform **side effects** including fetching data, updating the DOM, ..
- In programming, a side effect refers to any operation that:
  - Modifies something outside of the current function's scope.
  - Examples include updating the DOM, fetching data from an API, setting a timer, logging to the console, or modifying global variables.
  - Here, handleClick is a side effect because it directly updates the DOM outside of React's control.
```javascript
function Example() {
  const handleClick = () => {
    document.getElementById("text").innerText = "Text Updated!";
  };

  return <button onClick={handleClick}>Update Text</button>;
}
```
- To take the control of the DOM element, we should use `useState` as explained before.
```javascript
import { useState, useEffect, useRef } from 'react';
  const ref = useRef<any>();
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm',
    });
  };
  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    if (!ref.current) {
      return;
    }

    const result = await ref.current.transform(input, {
      loader: 'jsx',
      target: 'es2015',
    });

    setCode(result.code);
  };
```
### Cleanup Function
- `useEffect` can return a cleanup function (e.g., subscriptions, event listeners) to prevent memory leaks.
- This cleanup function runs **before** the effect is re-executed on subsequent renders or when the component is unmounted.
```javascript
useEffect(() => {
  const subscription = someService.subscribe(data => {
    // Handle data
  });

  return () => {
    // Cleanup the subscription
    subscription.unsubscribe();
  };
}, []); // Subscribes on mount and unsubscribes on unmount
```
### Dependencies Array:
- If the dependencies array is empty ([]), the effect runs only once after the initial render.
- If the dependencies array contains values, the effect runs whenever any of those values change.
- If there is no dependencies array, the effect runs after every render.
## useCallback
- `useCallback` is used to memoize functions, making them efficient and preventing unnecessary re-renders.
- The callback is only recreated when one of the `dependencies` changes. If you leave the `dependencies` array empty (`[]`), the callback will only be created once.
```javascript
import { useCallback } from 'react';

const memoizedCallback = useCallback(() => {
  // Function logic here
}, [dependencies]);
```
- Let's say you should make a call at the start of an app. So `useEffect` is the option.
- We need to make a call once but **ESLint** complains and asks to put the API call function in the brackets..
```javascript
import { useEffect, useContext } from 'react';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';
import BooksContext from './context/books';

function App() {
  const { fetchBooks } = useContext(BooksContext);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookList />
      <BookCreate />
    </div>
  );
}

export default App;
```
- Infinet API calls -> after each call the state will change -> app re-renders -> new ```fetchBooks()``` -> useEffect runs again, ...
- to fix this we have to use **useCallback** as below to reference always to the first ```fetchBooks()``` not the new ones.
- BEFORE:
```javascript
function Provider({ children }) {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const response = await axios.get('http://localhost:3001/books');
    setBooks(response.data);
  };
```
- AFTER:
```javascript
function Provider({ children }) {
  const [books, setBooks] = useState([]);

  const fetchBooks = useCallback(async () => {
    const response = await axios.get('http://localhost:3001/books');

    setBooks(response.data);
  }, []);
```
## useReducer
- `useReducer` is a React Hook that lets you add a reducer to your component.
- The reducer function that specifies how the state gets updated. It must be **pure**, should take the **state and action as arguments**, and should **return the next state**.
- React will set the next state to the result of calling the `reducer` function you’ve provided with the current `state` and the action you’ve passed to `dispatch`.
```javascript
import { useReducer } from 'react';
import Button from '../components/Button';
import Panel from '../components/Panel';

const INCREMENT_COUNT = 'increment';
const SET_VALUE_TO_ADD = 'change_value_to_add';
const DECREMENT_COUNT = 'decrement';
const ADD_VALUE_TO_COUNT = 'add_value_to_count';

const reducer = (state, action) => {
  switch (action.type) {
    case INCREMENT_COUNT:
      return {
        ...state,
        count: state.count + 1,
      };
    case DECREMENT_COUNT:
      return {
        ...state,
        count: state.count - 1,
      };
    case ADD_VALUE_TO_COUNT:
      return {
        ...state,
        count: state.count + state.valueToAdd,
        valueToAdd: 0,
      };
    case SET_VALUE_TO_ADD:
      return {
        ...state,
        valueToAdd: action.payload,
      };
    default:
      return state;
  }
};

function CounterPage({ initialCount }) {
  // const [count, setCount] = useState(initialCount);
  // const [valueToAdd, setValueToAdd] = useState(0);
  const [state, dispatch] = useReducer(reducer, {
    count: initialCount,
    valueToAdd: 0,
  });
  console.log(state);

  const increment = () => {
    dispatch({
      type: INCREMENT_COUNT,
    });
  };
  const decrement = () => {
    dispatch({
      type: DECREMENT_COUNT,
    });
  };
  const handleChange = (event) => {
    const value = parseInt(event.target.value) || 0;

    dispatch({
      type: SET_VALUE_TO_ADD,
      payload: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch({
      type: ADD_VALUE_TO_COUNT,
    });
  };

  return (
    <Panel className="m-3">
      <h1 className="text-lg">Count is {state.count}</h1>
      <div className="flex flex-row">
        <Button onClick={increment}>Increment</Button>
        <Button onClick={decrement}>Decrement</Button>
      </div>

      <form onSubmit={handleSubmit}>
        <label>Add a lot!</label>
        <input
          value={state.valueToAdd || ''}
          onChange={handleChange}
          type="number"
          className="p-1 m-3 bg-gray-50 border border-gray-300"
        />
        <Button>Add it!</Button>
      </form>
    </Panel>
  );
}

export default CounterPage;
```
## Custom Hook
- A custom hook in React is a **JavaScript function** that uses one or more built-in hooks (like useState, useEffect, etc.) to encapsulate reusable logic.
- It helps to create a code with **Reusability**, **Readability**, and **Separation of Concerns** that means Keeping UI-related logic (e.g., rendering JSX) separated.
- Creating Custom Hook:
```javascript
import { useState, useEffect } from "react";

// Custom Hook
export const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error }; // Return data to consuming components
};
```
- Using Custom Hook:
```javascript
import { useFetchData } from "./hooks/useFetchData";

export default function App() {
  const { data, loading, error } = useFetchData("https://api.example.com/data");
  ...
```
