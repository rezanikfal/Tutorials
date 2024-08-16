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
  - The AfterContent hooks concern _ContentChildren_, the child components that Angular projected into the component. Children usually to be projected at some \<ng-content> element of a component.
  - This method is called only __once__ during the component’s lifecycle, after the first ngDoCheck.
- ngAfterContentChecked()
  - This method is called once during the component’s lifecycle after ngAfterContentInit and then after __every__ subsequent ngDoCheck.
- ngAfterViewInit()
  - The AfterView hooks concern _ViewChildren_, the child components whose element tags appear within the component's template.
  - This method is called only __once__ during the component’s lifecycle, after ngAfterContentChecked. after Angular has already composed the component’s views 
  - This hook is quite useful when you need to load content on your view that depends on its view’s components.
- ngAfterViewChecked()
  - This method is called once after ngAfterViewInit and then after __every__ subsequent ngAfterContentChecked. 
- ngOnDestroy()
  - Lastly, this method is called only __once__ during the component’s lifecycle, right before Angular destroy it. 
  - you should put all your cleanup logic for that component. 
  - Remove any localstorage information and, unsubscribe observables/detach event handlers/stop timers, etc. to avoid __memory leaks__.
