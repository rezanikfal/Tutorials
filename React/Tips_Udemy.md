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

## React Project Structure
- **Public**
  - index.html : In React and other SPAs the entry point is typically this HTML file that loads a JavaScript application
- **src**
  - index.js :   ```ReactDOM.render()``` renders the root component of the React application into the specified DOM element.
  -  This is where the virtual DOM is connected to the actual DOM.
  -  <App /> is the root component being rendered, and it's being injected into the HTML element with the id of ```root```.
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return <h1>Hello React</h1>
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
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
- 
### Keys should be applied on the TOP MOST ITEM:
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
## State Update Cheat Sheet :
### Adding Elements to an Array
- You can add elements to the start of an array by using the spread syntax.
```javascript
const [colors, setColors] = useState(['red', 'green']);

const addColor = (colorToAdd) => {
  const updatedColors = [colorToAdd, ...colors];
  setColors(updatedColors);
};
```
- Add elements to the end of an array by reversing the order of elements in ```updatedColors```.
```javascript
const [colors, setColors] = useState(['red', 'green']);

const addColor = (colorToAdd) => {
  // Now 'colorToAdd' will be at the end
  const updatedColors = [...colors, colorToAdd];
  setColors(updatedColors);
};
```
- Elements can be added at any index by using the ```slice``` method available on all arays.
```javascript
const [colors, setColors] = useState(['red', 'green']);

const addColorAtIndex = (colorToAdd, index) => {
  const updatedColors = [
    ...colors.slice(0, index),
    colorToAdd,
    ...colors.slice(index),
  ];
  setColors(updatedColors);
};
```
### Removing Elements From An Array
- Elements can be removed from an array by using the ```filter``` method.
- The ```filter``` method can remove elements by index.
```javascript
const [colors, setColors] = useState(['red', 'green', 'blue']);

const removeColorAtIndex = (indexToRemove) => {
  const updatedColors = colors.filter((color, index) => {
    return index !== indexToRemove;
  });

  setColors(updatedColors);
};
```
- filter can also remove elements by value.
```javascript
const [colors, setColors] = useState(['red', 'green', 'blue']);

const removeValue = (colorToRemove) => {
  const updatedColors = colors.filter((color) => {
    return color !== colorToRemove;
  });

  setColors(updatedColors);
};
```
### Changing Elements
- Objects in an array can be modified by using the ```map``` function.
```javascript
const [books, setBooks] = useState([
  { id: 1, title: 'Sense and Sensibility' },
  { id: 2, title: 'Oliver Twist' },
]);

const changeTitleById = (id, newTitle) => {
  const updatedBooks = books.map((book) => {
    if (book.id === id) {
      return { ...book, title: newTitle };
    }

    return book;
  });

  setBooks(updatedBooks);
};
```
### Changing Properties In Objects
- Properties in an object can be changed or added by using the spread syntax (the ```...```).
```javascript
const [fruit, setFruit] = useState({
  color: 'red',
  name: 'apple',
});

const changeColor = (newColor) => {
  const updatedFruit = {
    ...fruit,
    color: newColor,
  };

  setFruit(updatedFruit);
};
```
### Removing Properties In Objects
- Properties in an object can be removed by using destructuring.
```javascript
const [fruit, setFruit] = useState({
  color: 'red',
  name: 'apple',
});

const removeColor = () => {
  // `rest` is an object with all the properties
  // of fruit except for `color`.
  const { color, ...rest } = fruit;

  setFruit(rest);
};
```
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
## children prop :
- The hard-coded **"children"** props a special prop that allows you to pass components, elements, or data as children to a React component.
- It is the content passed between the opening and closing tags of the component.
```javascript
function App() {
    return <div>
        <div><Button>click me!</Button></div>
    </div>;
}
-----------------------
function Button({children}) {
    return <button>{children}</button>   // {children} = click me!
}

```
## useState, useEffect, useRef , useCallback Hooks :
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
- useRef: Reference a value that's not needed for rendering
- useEffect: To perform side effects including fetching data, updating the DOM, ..
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
- useCallback: Let's say you should make a call at the start of an app. So useEffect is the option.
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
## Create multiple components from list (Using map) :
```javascript
import ImageShow from "./ImageShow";

function ImageList({ images }) {
    const renderedImage = images.map(x => <ImageShow key={x.id} image={x} />)
    return (
        <div>
            <div>{renderedImage}</div>
        </div>
    );
}

export default ImageList;
```
## State Updates cheat sheet:
https://state-updates.vercel.app/

## Create React Typescript boilerplate:
`npx create-react-app my-app --template typescript`
