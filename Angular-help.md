## New Project without Test
- ng new angular-tour-of-heroes --skip-tests 
## New Module with routeing
- ng g m landing-page --routing=true
##  A Fresh Start:
- code -r . + Dest. Foldeer: `code -r .\udemy-course\`
##  Apply style to same components in the parent component but the first one:
```css
:host:not(:first-of-type){  
Display: block;  
margin-top: 20px;
}
```
## Access to the component HTML content:
```javascript
import { Component, OnInit, ElementRef } from '@angular/core';

export class Mod1Comp1Component implements OnInit {
  constructor(private el:ElementRef){}
  
  ngOnInit(): void {
    console.log(this.el.nativeElement);
  }
}
```
