### index.js:
- When you have an ```index.js``` file inside a folder, it serves as the default entry point for that folder.
- So for this structure:
```javascript
- store
 - slices
  - cars.js
  - form.js
 - index.js
 ```
- We can import everything on ```index.js``` from ```store``` folder 
```javascript
import { store } from "../store" == import { store } from "../store/index"
```
