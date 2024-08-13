## How the Angular app runs
-  run ```ng serve``` or ```ng build```.
    - **ng serve** is primarily used during development to run the Angular application locally.
    - **ng build** is used to compile the Angular application into static files that can be deployed to a production server
-  The CLI loads the configuration files (e.g., ```angular.json```, ```tsconfig.json```) to understand the structure and settings of the project.
-  TypeScript Compilation, Angular compiles the HTML and TypeScript, CLI uses Webpack to bundle all the JavaScript, HTML, CSSto be served by a web server.
-  Production build (```ng build --prod```) does additional optimizations occur, such as minification, tree shaking (removing unused code).
-  The project is then served locally, and you can view the application in your web browser (usually at http://localhost:4200 by default).
-  Once the application is loaded in the browser, Angular bootstraps the **root** module and **injects dependencies** as needed.
    - Angular looks for the root module, usually defined in the ```main.ts``` file using the ```platformBrowserDynamic().bootstrapModule(AppModule)``` method.
    - Services that are provided in the root module (```providedIn: 'root'```) are singleton services, meaning they are instantiated once and shared across the entire application.
    - The root module contains a root component (usually ```AppComponent```). Angular starts with this component and recursively initializes and renders its child components
    - Change Detection, Event Binding, Rendering ->Application Ready
    -  After bootstrapping, the application starts interacting with the user, handling events, making HTTP requests, and updating the view as necessary.
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
- To apply CSS on the component host. Here is the component html.
- ```:host``` allows you to explicitly target the component's **root** element and apply styles directly to it.
- 
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
    console.log(this.el.nativeElement); // access to the root
    console.log(this.el.nativeElement.querySelector('p')); //Access to p tag
  }
}
```
Using ```ViewChild``` we can access to the element in the component or directive 
```javascript
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

export class MyComp1Component implements AfterViewInit {
  @ViewChild('rez') rez!: ElementRef;

  ngAfterViewInit() {
    console.log(this.rez.nativeElement); // Logs the <p> element
  }
}
```
- By injecting ```ElementRef``` into a component or directive, you're getting direct access to the DOM.
- So ```ElementRef``` access is available as soon as the component is instantiated.
- ```ViewChild``` requires the Angular view to be fully initialized before it can find the references which happens during the ```ngAfterView```.
- After getting access we can update the html element from .ts file:
```javascript
import { Component, ElementRef, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';

export class MyComp1Component implements AfterViewInit {
  @ViewChild('rez') rez!: ElementRef;
  constructor(private renderer: Renderer2) {}
  ngAfterViewInit() {
    const pElement = this.rez.nativeElement;
    pElement.style.color = 'blue';
    this.renderer.setStyle(pElement, 'margin-top', '50px');
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
## polyfills.ts in Angular project:
- In general some cross-browser compatibility issues can be resolved by using **polyfills**. Polyfills are JavaScript libraries that enable modern features on older browsers.
- In **Angular**, polyfills are used to provide support for features that are not available in certain browsers in Angular project, while TypeScript is a superset of JavaScript that provide additional features such as type checking that make Angular development more powerful and efficient.

## angular.json in Angular project:
- A configuration file in an Angular project that defines various settings for the **Angular CLI** .
- It contains the configurations for the different build targets, test targets, and serve targets, **assets**, and global styles and scripts.

## main.ts in Angular project:
- It is the main entry point for the application. It is responsible for bootstrapping the root module (usually named "AppModule") of the application.
- It's the first file that gets executed when your application is launched.

## environment.ts in Angular project:
- It used to store configuration settings that are specific to a certain environment, such as development, staging, or production. 
- Each environment file exports an object that contains the configuration settings for that environment. For example, it can contain API endpoints, feature flags, and other settings that are specific to that environment.
- During development, Angular CLI uses environment.ts by default. When you build your application for production using the ng build --prod command, Angular CLI uses environment.prod.ts (a separate file) instead.
```javascript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api', // Example API endpoint for development
  // Other environment-specific configuration variables
};

// environment.prod.ts

export const environment = {
  production: true,
  apiUrl: 'https://production-api.example.com', // Example production API endpoint
  // Other production-specific configuration variables
};
```
## tsconfig.json in Angular project:
- It is used to configure the TypeScript compiler. It specifies how TypeScript files should be compiled into JavaScript and provides various options for the compilation process.
- Source map files are used to map the code written in a higher-level language (such as TypeScript) to its equivalent code in a lower-level language (such as JavaScript). This mapping allows developers to debug their code using the original source files, rather than the compiled output(It should be disabled with Prod app).
```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "es2015",
    "moduleResolution": "node",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "lib": ["es2018", "dom"],
    "noImplicitAny": false,
    "suppressImplicitAnyIndexErrors": true,
    "typeRoots": [
      "node_modules/@types"
    ],
    "baseUrl": "./src",
    "paths": {
      "@app/*": ["app/*"]
    }
  },
```
## @ViewChild vs @ViewChildrent:
- In Angular, both decorators are used to access elements in a template.
- @ViewChildren is used to access multiple elements in the template and returns a QueryList.
- It  matches the specified component, directive or **template reference variable**.

