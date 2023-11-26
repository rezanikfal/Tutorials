### Variables
- In SCSS (Sass), variables are used to store information that you want to reuse throughout your stylesheet.
```css
$primary-color: #3498db;
$font-size: 16px;
$border-radius: 4px;

body {
  background-color: $primary-color;
  font-size: $font-size;
}
```
- Global vs Local variables:
```css
$global-var: #333;

.container {
  $local-var: #f00; // Local variable
  background-color: $local-var; // Accessible within the .container scope
}

.other-element {
  background-color: $local-var; // Error! $local-var is not accessible here
  color: $global-var; // Accessible because $global-var is global
}
```
### Partials 
-  partials are files that contain snippets of CSS or SCSS code meant to be included in other SCSS file.
-  Partial files are typically named with a **leading underscore** (e.g., ```_partial.scss```), and they are not meant to be compiled into standalone CSS files.
-  You should use the imports in order, like first import variable partial and then the other partial that uses the variable. 
```css
// _variables.scss

$primary-color: #3498db;
$font-size: 16px;
```
```css
// styles.scss

@import 'variables';

body {
  background-color: $primary-color;
  font-size: $font-size;
}
```




### CSS Tricks
- ```.class1 > div``` targets a div element that is a **direct** child of an element with the ```class1```.
- ```.class1 div``` targets any div element that is a **descendant** of an element with the ```class1```.
```html
<div class="class1">
  <div>First div</div> <!-- This div is targeted by .class1 > div -->
  <div> <!-- This div is targeted by .class1 > div -->
    <div>Targeted by .class1 div</div> <!-- This div is targeted by .class1 div -->
  </div>
</div>
```
### Create List from ```divs``` (React)
```javascript
export default function SingleItem({ item }) {
    return (
        <div className="item">
            <div>{item.name}</div>
            <div>{item.quantity}</div>
            <div>${item.price}</div>
            <div>${item.price * item.quantity}</div>
            <div className="close">X</div>
        </div>
    )
}
```
```css
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item > div {
  flex: 1;
  text-align: center;
  margin: 0.5rem 0;
}

.item:nth-child(even) {
  background-color: blanchedalmond;
}

.item .close {
  flex: 0.3;
  font-weight: bold;
  cursor: pointer;
}
```
<img src="../Pics/List.jpg" width="550"> 
