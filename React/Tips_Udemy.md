## Use state to control input value :
```javascript
import { useState } from "react";

function SearchBar({ onSubmit }) {
    const [term, setTerm] = useState('')
    
    const handleChange = (e) => {
        setTerm(e.target.value);
    }
    return (
        <div>
           <input value={term} onChange={handleChange} />
        </div>
    );
}

export default SearchBar;
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
