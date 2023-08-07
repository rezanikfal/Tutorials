## Call a function outside of the `map`:
- When we pass off the handleClick entirely, it receives event object. **onClick={handleClick}.**
```javascript
function Accordion({ items }) {
    const [expendedIndex, setExpandedIndex] = useState(0)
    const handleEvent = (i) => {setExpandedIndex(i)}

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
    return <button>{children}</button>
}

```
## useState, useEffect, useRef , useCallback Hooks :
- useState: To Handle **States**
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
