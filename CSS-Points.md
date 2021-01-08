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
<img src="./Pics/SVG.png" width="300">
