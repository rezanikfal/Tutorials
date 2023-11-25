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
