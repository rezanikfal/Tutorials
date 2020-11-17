## Naming Convention
`ng g c PageList`  
- It generates `page-list.component.ts` or `css` or `html`  
`ng g s wikipedia`  
- It generates `wikipedia.service.ts`
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
## Pass Data from child to parent using OUTPUT:
### Child (app-modal):
```javascript
import { Component, OnInit, Output, EventEmitter} from '@angular/core';
export class ModalComponent implements OnInit {
  @Output() close = new EventEmitter();
  
  onCloseClick() {
    this.close.emit();
  }
}
```
```html
<div (click)="onCloseClick()"></div>
```
### Parent:
```javascript
export class ModsHomeComponent implements OnInit {
  modalOpen = false;
  onClick() {
    this.modalOpen = !this.modalOpen;
  }
}
```
```html
<app-modal (close)="onClick()" *ngIf="modalOpen"></app-modal>
```
