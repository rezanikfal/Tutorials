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
## box-sizing
- **box-sizing: border-box**;
- The width and height properties include the padding and border, but not the margin.
- By default **box-sizing : content-box**, the width and height properties only apply to the content of the element. This means that any padding or border you add to the element will increase its total size
## Create / Edit SVG
- Go to [Boxy SVG](https://boxy-svg.com/app "Boxy SVG").
- Create a path using ```Cubic Bezier```.
- Replace the inside code ```d="M19 3H5a2 2 0 0 0-2 2v1...``` with the existing SVG that you wish to edit.
- make some changes using ```Edit``` and ```Transform``` tools.
Example:
- Existing:
```html
<svg viewBox="-3 -3 30 30" id="tracking" preserveAspectRatio="xMidYMid meet"
  [ngStyle]="{fill:trackingTabActive?'#8AB4F8':'#ffffff'}">
  <g viewBox="-3 -3 30 30">
    <path id="cartesian"
    d="M19 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 16H5V5h14v14z"></path>
  </g>
</svg>
```
- Edited:
```html
<svg viewBox="-3 -3 30 30" id="tracking" preserveAspectRatio="xMidYMid meet"
  [ngStyle]="{fill:trackingTabActive?'#8AB4F8':'#ffffff'}">
  <g viewBox="-3 -3 30 30">
    <path id="cartesian"
    d="M19 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm0 16H5V5h14v14z"></path>
    <path id="cartesian" 
    d="M 6.654 13.927 L 10.052 10.621 L 12.147 12.446 L 15.644 8.945 L 17.257 10.63 L 12.112 15.658 L 9.917 13.671 L 8.173 15.433 L 6.654 13.927 Z"></path>
  </g>
</svg>
```
### Snapshot of the SVG
<img src="../Pics/SVG.png" width="300">

### CSS absolute / relative Units
- **px** (Pixels): This is the most commonly used unit. One pixel is a single dot on a screen.
- **em**: This unit is also relative to the font size of the parent element.
- **rem** (Root EM): Similar to em, but it's always relative to the font size of the root element (usually the ```<html>``` tag),
- By default the font size in in browsers is 16px so rem = 16px
