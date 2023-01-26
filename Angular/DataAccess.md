## Naming Convention  
`ng g c PageList`  
- It generates `page-list.component.ts` and `css` and `html`  

`ng g s wikipedia`  
- It generates `wikipedia.service.ts`
## New Project without Test
- ng new angular-tour-of-heroes --skip-tests 
## New Module with routeing
- ng g m landing-page --routing
##  A Fresh Start:
- code -r . + Dest. Foldeer: `code -r .\udemy-course\`
##  Apply style to same components in the parent component but the first one:
```css
:host:not(:first-of-type){  
Display: block;  
margin-top: 20px;
}
```
### :host
To apply CSS on the component host. Here is the component html:
```htm
<div>
    <h1>Test</h1>
    <p>By injecting the ElementRef in the component, we have access to the DOM elements.</p>
</div>
```
Here is the shadow DOM that we can access using Chrome Inspection tool (```app-root``` is the component selector):
```htm
<app-root _nghost-lpg-c40="" ng-version="11.1.2">
   <div _ngcontent-lpg-c40="">
      <h1 _ngcontent-lpg-c40="">Test</h1>
      <p _ngcontent-lpg-c40="">By injecting the ElementRef in the component, we have access to the DOM elements.</p>
   </div>
</app-root>
```
When we apply a css on ```:host```, it will be applied on ```<app-root>``` tag.
## Access to the component HTML content:
By injecting the ```ElementRef``` in the component, we have access to the DOM elements. 
```javascript
import { Component, OnInit, ElementRef } from '@angular/core';

export class Mod1Comp1Component implements OnInit {
  constructor(private el:ElementRef){}
  
  ngOnInit(): void {
    console.log(this.el.nativeElement);
  }
}
```
## Pass Data from parent to child using INPUT directive:
### Child:
```javascript
import { Component, OnInit, Input } from '@angular/core';

export class PageListComponent implements OnInit {
  @Input() pages = [];
}
```
```html
<table class="table is-striped">
  <thead>
    <tr>
      <th>Title</th>
      <th>Word Count</th>
      <th>Snippet</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let page of pages">
      <td>{{ page.title }}</td>
      <td>{{ page.wordcount }}</td>
      <td>{{ page.snippet }}</td>
    </tr>
  </tbody>
</table>
```
### Parent:
```javascript
export class AppComponent {
  currentItem = [];

  constructor(private wikipedia: WikipediaService) {}

  onTerm(term: string) {
    this.wikipedia.search(term).subscribe((response: any) => {
      this.currentItem = response.query.search;
    });
  }
}
```
```html
<app-page-list [pages]="currentItem"></app-page-list>
```

## Pass Data from child to parent using OUTPUT directive:
### Child (app-modal):
```javascript
import { Component, OnInit, Output, EventEmitter} from '@angular/core';
export class ModalComponent implements OnInit {
  @Output() close = new EventEmitter();
  
  onCloseClick() {
    this.close.emit('TEST');
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
<app-modal (close)="onClick($event)" *ngIf="modalOpen"></app-modal>
```

## @ViewChild, access to the child component from parent:
In the following sample we run a function in child component from parent:
### Child (app-modal):
```javascript
export class ChildComponent {
  public childMethod() {
    console.log('Child method called');
  }
}
```
### Parent:
```html
<app-child #child></app-child>
```
```javascript
import { Component, ViewChild } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  // ...
})
export class ParentComponent {
  @ViewChild(ChildComponent, {static: false}) child: ChildComponent;

  public parentMethod() {
    this.child.childMethod();
  }
}
```
