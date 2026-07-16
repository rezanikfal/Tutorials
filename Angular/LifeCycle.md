## Angular Life Cycle Hooks
The components have their whole lifecycle managed by Angular, from creation to destruction. Lifecycle hooks allow us to act in key moments.
## List of hooks
- ngOnChanges()  
  - The ```ngOnChanges``` lifecycle hook is specifically designed to respond to changes in ```@Input``` properties.
  - ```SimpleChanges``` is an Angular interface that represents the collection of changes to the input properties of a component. 
```javascript
import { Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-my-comp2',
  templateUrl: './my-comp2.component.html',
  styleUrl: './my-comp2.component.scss',
})
export class MyComp2Component implements OnInit, OnChanges {
  @Input() var1!: number;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['var1'].currentValue);
    console.log(changes['var1'].previousValue);
    console.log(changes['var1'].firstChange); //Property
    console.log(changes['var1'].isFirstChange()); //Method same as property
  }
}
```
- ngOnInit()  
  - This method is called only __once__ during the component lifecycle, after the first ```ngOnChanges``` call. At this point, within this method, you can have access not only to data-bound properties but also the component’s input properties.
  - Constructor is best left to be used for dependency injection and our initialization logic should be put on ```ngOnInit```.
  - Here is typically used to:
      - Fetching Data from a Service
      - Initial Setup or Configuration (like create ```FormGroups```)
      - Subscribing to Observables
      - Handling Route Parameters
      - Initializing Data from Inputs
      - **NOT** heavy Computation
      - **NOT** DOM Manipulation (it should be done in ```ngAfterViewInit``` if really needed)
- ngDoCheck()
  -  It detects changes that Angular can’t or won’t detect. It is called in **every** change detection, immediately after the ```ngOnChanges``` and ```ngOnInit``` hooks.this hook is really costly.It is called **when change detection run**s.
  -  Since ```ngDoCheck``` doesn't automatically provide previous and current values, you have to manually store the previous state of any variables
```javascript
export class MyComponent implements DoCheck {
  myVar: string = 'Initial Value';
  previousMyVar: string = '';  // Property to store the previous value

  ngDoCheck() {
    // Custom change detection logic
    if (this.myVar !== this.previousMyVar) {
      console.log('myVar changed from', this.previousMyVar, 'to', this.myVar);
      // Update the previous value
      this.previousMyVar = this.myVar;

      // Perform any other actions needed when myVar changes
    }
  }
}
```
- ngAfterContentInit()
  - The ```ngAfterContentInit``` lifecycle hook in Angular is a method that is invoked once after Angular has completed initializing all the content projected into the component.
  - This method is called only **once** during the component’s lifecycle, after the first ```ngDoCheck```.
  - ```{ static: true }``` The query is resolved during the component's initialization phase, before Angular's change detection runs. ```{ static: false }``` is after change detection.
 ```javascript
// Parent
import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `
    <app-child>
      <p #projectedContent>This is some projected content!</p>
    </app-child>
  `
})
export class ParentComponent {}
```
```javascript
// Child
import { Component, AfterContentInit, ContentChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <div>
      <ng-content></ng-content> <!-- This is where the content from the parent is projected -->
    </div>
  `
})
export class ChildComponent implements AfterContentInit {

  @ContentChild('projectedContent', { static: true }) content: ElementRef;

  ngAfterContentInit() {
    console.log('ngAfterContentInit - Projected content is initialized');
    // Access the projected content
    console.log(this.content.nativeElement.textContent); // Outputs: This is some projected content!
  }
}
```
- ng-content
  - The child component uses ```<ng-content>``` to act as a placeholder for this content.
  - If the child component has multiple areas where dynamic content might be inserted, you can use the ```select``` attribute in ```<ng-content>``` to specify which content should go where.
  - If no content is passed from the parent for a particular ```<ng-content>``` block, the child component will simply ignore that block
```html
<div class="card">
  <div class="card-header">
    <ng-content select="[card-header]"></ng-content>
</div>
------------------------------
<app-card>
  <div card-header>
    My Card Header
  </div>
...
<app-card>
```
**Simplest form — one slot, no `select`:**
```typescript
// card.component.ts
@Component({
  selector: 'app-card',
  template: `<div class="card"><ng-content></ng-content></div>`
})
export class CardComponent {}
```
```html
<app-card>
  <p>Anything goes here</p>
  <button>Even a button</button>
</app-card>
```
Everything between `<app-card>` and `</app-card>` gets projected into wherever `<ng-content>` sits in the card's own template. This is exactly how your `ButtonComponent` used `<ng-content />` earlier to let the label text be whatever the consumer wants, instead of hardcoding "Click me".

**Multiple named slots — your example, explained fully:**
```typescript
@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <div class="card-header">
        <ng-content select="[card-header]"></ng-content>
      </div>
      <div class="card-body">
        <ng-content select="[card-body]"></ng-content>
      </div>
      <div class="card-footer">
        <ng-content select="[card-footer]"></ng-content>
      </div>
    </div>
  `
})
export class CardComponent {}
```
```html
<app-card>
  <div card-header>My Card Header</div>
  <div card-body>Main content goes here</div>
  <div card-footer>Footer actions</div>
</app-card>
```
The `select` attribute is a **CSS selector**, not a special Angular-only syntax — it's matching against attributes/classes/tags on the projected content, same rules as any CSS selector.

**`select` can match different things, worth knowing the variety:**
```html
<ng-content select="[card-header]"></ng-content>  <!-- matches by attribute -->
<ng-content select=".header-class"></ng-content>   <!-- matches by CSS class -->
<ng-content select="app-icon"></ng-content>         <!-- matches by tag/element type -->
```
**One-line summary for the interview:**
> "`ng-content` is Angular's content projection mechanism — it lets a parent pass actual markup into designated slots inside a child's template, rather than just data via `@Input()`. Named slots via the `select` attribute (a real CSS selector) let a component expose multiple distinct insertion points, which is the standard pattern for building flexible, reusable layout components like cards, modals, or panels in a component library."

- ngAfterContentChecked()
  -  ```ngAfterContentChecked``` is used to respond to changes in the projected content.
- ngAfterViewInit()
  - The ```ngAfterViewInit``` lifecycle hook in Angular is called once after the component's view, and its child views, have been fully initialized..
  - This method is called only **once** during the component’s lifecycle, after ```ngAfterContentChecked```. after Angular has already composed the component’s views 
  - This hook is called once after the component's view (including its child components' views) has been fully initialized.
```javascript
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `
    <div #myDiv>Content in the view</div>
  `
})
export class ExampleComponent implements AfterViewInit {

  @ViewChild('myDiv', { static: false }) myDiv: ElementRef;

  ngAfterViewInit() {
    console.log('Div content:', this.myDiv.nativeElement.textContent);
    this.myDiv.nativeElement.style.color = 'blue';
  }
}
```
- ngAfterViewChecked()
  - This method is called once after ngAfterViewInit and then after __every__ subsequent ngAfterContentChecked.
  - It is called after every change detection cycle for the component's view and its child views.
- ngOnDestroy()
  - Lastly, this method is called only __once__ during the component’s lifecycle, right before Angular destroy it. 
  - you should put all your cleanup logic for that component. 
  - Remove any localstorage information and, unsubscribe observables/detach event handlers/stop timers, etc. to avoid __memory leaks__.
