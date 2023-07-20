## useState, useEffect, useRef Hooks :
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
