### Create React project using ```Vite``` :
- It askes the project name / framework / language while creating the ```vite```:
  - ```npm create vite@4.1.0```
  - ```npm install```
  - ```npm run dev```
### props immutability :
- It ensures that components don't change their props. Change comes from Parent.
- React is designed around the concept of one-way data flow. Data (props) flows down from parent.
- Component remains isolated and more reusable.
- Immutable props allow React to quickly determine if a component needs to re-render.
### React Project Structure
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return <h1>Hello React</h1>
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```
### useState
```javascript
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  const handleInc = () => setCount(count + 1);
  const handleDec = () => setCount(count - 1);
  return (
    <div>
      <h2>This is output: {count}</h2>
      <button onClick={handleInc}>Increment</button>
      <button onClick={handleDec}>Decrement</button>
    </div>
  );
}
```
### Controlled component
- Creating a controlled component in React involves managing the **form** data with **state**
```javascript
import { useState } from "react";

export default function Counter() {
  const [name, setName] = useState("");
  const handleChange = (e) => setName(e.target.value);
  return (
    <div>
      <input type="text" value={name} onChange={(e) => handleChange(e)} />
    </div>
  );
}
```
### CSS Modules
- CSS Modules offer a way to encapsulate styles for individual components in React
- Naming: ```Button.jsx``` ```Button.module.css```
- The actual class name in the DOM will be automatically generated to be unique.
```css
/* Button.module.css */
.button {
  background-color: blue;
  color: white;
  padding: 10px 20px;
}
```
```javascript
import React from 'react';
import styles from './Button.module.css';

const Button = ({ children }) => {
  return <button className={styles.button}>{children}</button>;
};
```
### Global CSS
- We can apply global CSS to ```App.jsx``` (impacts all components):
- Naming: ```App.css```
- Import: ```import "./App.css";```
```css
/* App.css */
body {
  margin: 0;
}
```
```javascript
// App.jsx
import "./App.css";
import PageHeader from "./components/PageHeader/PageHeader";

function App() {
  return (
    <div className="App">
      <PageHeader />
    </div>
  );
}

export default App;
```
### Submit Form - preventDefault
- To set a state (typs is Object), we should use **spread** operator.
```javascript
import { useState } from "react";

export default function InputName() {
  const [name, setName] = useState({ fN: "", lN: "" });

  function changeF(e) {
    setName({ ...name, fN: e.target.value });
  }

  function changeL(e) {
    setName({ ...name, lN: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(name);
  }

  return (
    <div>
      <form>
        <input type="text" onChange={(e) => changeF(e)} value={name.fN} />
        <input type="text" onChange={(e) => changeL(e)} value={name.lN} />
        <button onClick={(e) => handleSubmit(e)}>Submit</button>
      </form>
    </div>
  );
}
```
### axios
- First install the npm library ``` npm install axios ```.
- **making** axios call function and **using** it both are **Async** operations.
```javascript
const getImage = async () => {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    headers: {
      Authorization: "Client-ID JkxjLTDQ3avIKtdEPou4PsUOGcOfMU2-vb21uBkqBDc",
    },
    params: {
      query: "office",
    },
  });
  console.log(response.data.results);
  return response;
};
export default getImage;
```
```javascript
import getImage from "./api/unsplash";

const onSubmit = async (term) => {
  const result = await getImage(term);
  setImages(result.data.results);
};
```
### Send an input term to the parent component
```javascript
//PARENT
function App() {
  const onSubmit = (term) => {
    console.log(term)
  };
  return (
    <>
      <ImageSearch onSubmit={onSubmit} />
    </>
  );
}
```
```javascript
//CHILD
export function ImageSearch({ onSubmit }) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(searchTerm);  //Sending data up to the parent
  }
  function handleChange(e) {
    setSearchTerm(e.target.value);
  }
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input value={searchTerm}  onChange={(e) => handleChange(e)} />
      </form>
    </>
  );
}
```
### ```useRef``` to get a reference from a HTML element
- To create a ref using the ```useRef``` hook from React. Attach this ref to the input element you want to focus.
```javascript
import { useState, useRef } from "react";
....
  const inputRef = useRef(null);
  function handleClick() {
      inputRef.current.focus();
  }
....
<input ref={inputRef} />
```
### ```useEffect``` hook
- second argmuent is ```[]```: Called after **first** render and never called again .
- second argmuent is nothing: Called after first render and called after **every** rerender.
- second argmuent is ```[counter]```: Called after first render and called after rerenders if ```counter``` variable **changed**.
  
```javascript
function App() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const books = await axios.get("http://localhost:3001/books");
    setBooks(books.data);
  };

  useEffect(() => {fetchBooks()}, []);  //OR
  useEffect(() => fetchBooks, []);
```
### ```children``` prop
- It represents whatever is written **between the opening and closing** tags of a component.
- This is particularly useful for creating generic, reusable components.
- The children prop is automatically provided by React to every component.
  
```javascript
function Card({children}) {
  return <div className="card">{children}</div>;
}
```
```javascript
function App() {
  return (
    <Card>
      <h1>Hello, World!</h1>
      <p>This is inside the card.</p>
    </Card>
  );
}
```
### Organaize React Project
- Best practice is using **Page-Component** style.
- **Page** shows one single page and not intended to be resused.
- **Component** is reuseable in nature, like a button or itemShow component.
```ts
src/
  Components
      forms
        Input.jsx
        SearchBAr.jsx
      products
        ProductShow.jsx
        ProductList.jsx
  pages
        LoginPage.jsx
        CartPage.jsx
        ProductPage.jsx
```
### ```useContext``` hook
- Context provides a way to pass data through the component tree.
- Basic Context:  
```javascript
// PARENT Component

const Counter = () => {

// Define the following states/functions
  const value = {
    count,
    increment,
    decrement,
    reset,
  };

  return (
    <CounterContext.Provider value={value}>
      <ShowCount />
    </CounterContext.Provider>
  );
};

export default Counter;
```
```javascript
// CounterContext.js

import { createContext } from "react";

const CounterContext = createContext(null);
export default CounterContext;
```
```javascript
// CHILD Component

import { useContext } from "react";
import CounterContext from "./CounterContext";

const CounterBtn = () => {
  const { increment,decrement, reset } = useContext(CounterContext);
  return (
    <div>
      <button onClick={() => increment()}>Increment</button>
      <button onClick={() => decrement()}>Decrement</button>
      <button onClick={() => reset()}>Reset</button>
    </div>
  );
};

export default CounterBtn;
```
- Real world Context using custom hook:
```javascript
// PARENT Component
import ShowCount from "./ShowCount";
import { CounterPovider } from "./CounterContext";

const Counter = () => {
  return (
    <CounterPovider>
      <ShowCount />
    </CounterPovider>
  );
};

export default Counter;
```
```javascript
// CounterContext.jsx
import { createContext, useContext, useState } from "react";

export const CounterContext = createContext(null);

export const CounterPovider = ({ children }) => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };
  const reset = () => {
    setCount(0);
  };

  const value = {
    count,
    increment,
    decrement,
    reset,
  };

  return (
    <CounterContext.Provider value={value}>
      {children}
    </CounterContext.Provider>
  );
};

export const useCounter = () => {  // Custom Hook
  const context = useContext(CounterContext);
  return context;
};
```
```javascript
// CHILD Component

import { useContext } from "react";
import CounterContext from "./CounterContext";

const CounterBtn = () => {
  const { increment, decrement, reset } = useCounter();
  return (
    <div>
      <button onClick={() => increment()}>Increment</button>
      <button onClick={() => decrement()}>Decrement</button>
      <button onClick={() => reset()}>Reset</button>
    </div>
  );
};

export default CounterBtn;
```
### Conditional Rendering
- Note that boolean value is ignored on JSX rendering
```javascript
const isExpanded = true;
  return{
 <div>{item.label}</div>
 {isExpanded && <div>{item.content}</div>}
}
```
### Define Event Handler outside of a mapping function
-  It improves performance and maintainability of the React code. 
```javascript
function MyComponent() {
  const handleClick = (nextIndex) => {
    setExpandedIndex(nextIndex)
  };
  const renderedItem =items.map((item, index) => (
        <li key={item.id} onClick={()=>handleClick(index)}>
          {item.name}
        </li>
      ))
  return (
    <ul>
      {renderedItem}
    </ul>
  );
}
```
