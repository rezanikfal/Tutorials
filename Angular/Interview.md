- **WebSocket** is bidirectional, a full-duplex protocol that is used in the same scenario of client-server communication, unlike HTTP it starts from ws:// or wss://. ... When the connection is established and alive the communication takes place using the same connection channel until it is terminated.
- **Realtime** Data Handling: **WebSocket** is a protocol that enables two-way persistent communication channels over TCP connections. It's used in apps that benefit from fast, real-time communication, such as chat, dashboard, and game apps. ASP.NET Core **SignalR** is a library that simplifies adding real-time web functionality to apps. It uses WebSockets. Here is the Angular side:
 - ```npm install @aspnet/signalr```
```Javascript
import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { ChartModel } from '../_interfaces/chartmodel.model';
@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  public data: ChartModel[];
  private hubConnection: signalR.HubConnection;
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/chart')
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection:
        + err))
  }
  public addTransferChartDataListener() => {
  this.hubConnection.on('transferchartdata', (data) => {
    this.data = data;
    console.log(data);
  });  
}
```
- State represents every single piece of data in your application. This means that everything that is rendered on the screen. All of the data of our application as well as any configuration information.
- Reactive programming: Our application reacts to the changes of states in the application.
- The main objectives of decorators is to add some metadata to the __class__ that will tell Angular 4 how to process a __class__. @NgModule (root module - imports –> Modules & Declarations -> Components), @Component , @Injectable
- Ahead-of-time (AOT) compilation: With AOT, the compiler runs at the build time. render the application immediately
- Just-in-time (JIT) compilation: This is a standard developviment approach which compiles our Typescript and html files in the browser at runtime (Default ng serve or build).
- Template reference variables -> <input #reza ...
## Decorators — metadata, applied to classes/properties/methods

A decorator is a **function that attaches metadata** to a class, property, method, or parameter. It doesn't change what the code *does* at runtime by itself — it tells Angular (or TypeScript) how to interpret that piece of code.

```typescript
@Component({...})   // class decorator — tells Angular "this class is a component"
@Injectable({...})  // class decorator — "this class can be injected"
@NgModule({...})    // class decorator — "this class defines a module"

@Input() name!: string;   // property decorator — "this property receives data from a parent"
@Output() clicked = new EventEmitter(); // property decorator — "this property emits events"

@HostListener('click', ['$event']) // method decorator — "call this method on a DOM event"
onClick(e: Event) {}
```

**Mental model:** decorators are **descriptive labels** — they tell Angular's compiler/runtime what role a class or member plays. `@Component` doesn't render anything itself; it just says "here's the config Angular needs to treat this class as a component."

## Directives — behavior/logic applied to DOM elements

A directive is a **class that attaches behavior to a DOM element** — it can modify the element's appearance, behavior, or structure. There are three kinds:

**1. Component** — technically a directive with a template (the most common kind you build):
```typescript
@Component({ selector: 'app-user-card', template: '...' })
export class UserCardComponent {}
```

**2. Attribute directive** — changes appearance/behavior of an existing element, no template of its own:
```typescript
@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);

  @HostListener('mouseenter')
  onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', 'yellow');
  }
}
```
```html
<p appHighlight>Hover over me</p>
```

**3. Structural directive** — changes the DOM's actual structure (adds/removes elements):
```typescript
*ngIf, *ngFor, *ngSwitch // classic examples — though @if/@for/@switch now replace most use cases
```
```html
<p *ngIf="isVisible">Shown conditionally</p>
```

## The key relationship — how they connect

**Every directive (and component) is *built using* the `@Directive` (or `@Component`) decorator.** The decorator is what registers the class as a directive in the first place — without it, it's just a plain TypeScript class Angular knows nothing about.

```typescript
@Directive({          // ← decorator: registers this class as a directive
  selector: '[appHighlight]'
})
export class HighlightDirective {  // ← the directive itself: the class + its behavior
  // logic here
}
```
- Services encapsulates business logic and separates them from UI concerns
- Pure pipes are stateless that flow input date without remembering
- Impure pipes are those which can manage the state of the data (Async)
- **Pure pipe (default):** only re-runs when the input **reference** changes — a new object/array, or a primitive value change. If you mutate an array/object in place (same reference), Angular won't re-run the pipe, even though the data changed.
- **Impure pipe:** re-runs on **every change detection cycle**, regardless of whether the input reference changed — useful when the pipe needs to react to internal state changes Angular can't detect via reference (e.g. `AsyncPipe`, which needs to check if the Observable/Promise emitted something new).

```typescript
@Pipe({ name: 'myPipe' }) // pure: true by default
@Pipe({ name: 'myPipe', pure: false }) // impure — opt in explicitly
```

**Why `AsyncPipe` is impure, worth knowing precisely:** the Observable reference itself never changes when it emits — `user$` is still the same Observable object on emission #50 as it was on emission #1. A pure pipe would never notice anything happened. `AsyncPipe` has to be impure so it checks for new emissions on every CD cycle instead of relying on reference equality.
**Where "pure" actually shows its teeth — with an object/array:**
```typescript
@Pipe({ name: 'double' })
export class DoublePipe implements PipeTransform {
  transform(nums: number[]): number[] {
    return nums.map(n => n * 2);
  }
}
```
```typescript
numbers = [1, 2, 3];

addNumber() {
  this.numbers.push(4); // mutates in place — SAME array reference
}
```
```html
{{ numbers | double }} <!-- won't update after addNumber(), because reference didn't change -->
```
The pipe doesn't re-run, because `numbers` is still pointing at the *same* array object — pure pipes only check "is this the same reference as last time," not "did the contents change."

**Fix — replace the array instead of mutating it:**
```typescript
addNumber() {
  this.numbers = [...this.numbers, 4]; // NEW reference — pipe re-runs
}
```
- prevent security threads (external HTML /external urls/API)
- optimize Angular: lazy loading/un-necessary import/AOT compilation/
- NgZone The most common use of this service is to optimize performance when starting a work consisting of one or more asynchronous tasks that don't require UI updates or error handling to be handled by Angular.
```Javascript
export class NgZoneDemo {
  progress: number = 0;
  label: string;

  constructor(private _ngZone: NgZone) {}

  // Loop inside the Angular zone
  // so the UI DOES refresh after each setTimeout cycle
  processWithinAngularZone() {
    this.label = 'inside';
    this.progress = 0;
    this._increaseProgress(() => console.log('Inside Done!'));
  }

  // Loop outside of the Angular zone
  // so the UI DOES NOT refresh after each setTimeout cycle
  processOutsideOfAngularZone() {
    this.label = 'outside';
    this.progress = 0;
    this._ngZone.runOutsideAngular(() => {
      this._increaseProgress(() => {
        // reenter the Angular zone and display done
        this._ngZone.run(() => { console.log('Outside Done!'); });
      });
    });
  }
```
- Access component in other module => put the component name in export array in the component's module - import the component module in the app module or any other destination module & put in the list of imports
- Angular/AngularJS -> Typescript, dependency Injection/Tow Way bounding, Support mobile
- Authentication -> server side validation using JWT(json web token)
- Authorization -> Different level of access
- Different data binding: String Interpolation / Property binding [ngStyle] / event binding (click) / Two way bounding
- SPA is index.html
- Constructor/ngOnChange/ngOnInit/ngOnDestroy
- Memory leak -> de-attach event listener, unsubscrice  observables
- Event Statement -> (event) = "EditProfile()" right side is statement
- Date pipe with parameters: {{ dateObj | date:'shortTime' }} 
- RxJS library for composing async ans callback-based code
- Integration Test -> anywhere we have binding
- @View child - it is vaialable in __AfterViewInit__ life cycle hook:
```htm
<input #nameRef type="text" [(ngModel)]="name">
```
```Javascript
@ViewChild('nameRef') nameElementRef: ElementRef;
...
this.nameElementRef.nativeElement.focus();
```  
- @ViewChild VS @ContentChild: As the name suggests, ```@ContentChild``` and ```@ContentChildren``` queries will return directives existing inside the ```<ng-content></ng-content>``` element of your view, whereas ```@ViewChild``` and ```@ViewChildren``` only look at elements that are on your view template directly. 
- You use the ```<ng-content></ng-content>``` tag as a placeholder for that dynamic content, then when the template is parsed Angular will replace that placeholder tag with your content.
- Using ```ng-template``` you can create comment based on a condition.
```Javascript
<ng-template [ngIf]="shouldSayHello">
 <div class="hello-world">Hello World</div>
</ng-template>
```  
- Test @input for component interaction Use an input property setter to intercept and act upon a value from the parent.
- Component Fixture is a generic class . using that you can access to component instance as well as template
- Arrange, Act and Assert (AAA) Pattern for Testbed you use fixture.component for AA and fixture.debugElement for Assert
- ng g m Module_Name --routing (views-routing.module.ts & views.module.ts ) <router-outlet></router-outlet>
- Angular Universal, an open-source technology that allows a back-end server
- Angular CLI introduced with Angular 2 could be used by developers to generate components, routes, services and pipes via console/terminal commands, together with simple test shells.
- Components. These are the main building blocks of Angular 2, entirely replacing the controllers and scopes of AngularJS
- Angular 4 -> Ahead of Time compilation, Animations
- Angular 5 -> @angular/http (no) @angular/common/http (yes)
- Angular 7 -> ng new / ng add @angular/material /
- Angular 8 -> new syntax to declare the lazy-loading / 
- @angular/http (not working)
- Angular 8 -> new date range picker  June 2020
- ```<a href="/element">Element</a>``` NO
- ```<a href="/">Element</a>``` goes to root URL
- ```<a routerLink="/element" routherLinkActive="active">Element</a>``` YES
- Not found routing rule: {path:"**", component: not-found.component}
- Lazy Loading:
```
{path: 'elements',
loadChildren: ()=>
import('./elements/elements.module').then(m=>m.ElementModule)
```
- ng-template tag to your template, it and everything inside it will be replaced by a comment.
- Protractor: spec file and app.po.ts (page object) get all individual element in page object and test it in spec files
- (citi) Create library in Angular: https://angular.io/guide/creating-libraries
**Create a library in a workspace:**
```bash
ng new my-workspace --no-create-application
ng generate library ui-components
ng generate component button --project=ui-components
```
- `public-api.ts` is the library's contract — only what's exported here is usable by consumers.
```typescript
// public-api.ts
export * from './lib/button/button.component';
```

**Build:**
```bash
ng build ui-components   // output goes to dist/ui-components — the actual publishable folder
```

**Consume locally (before publishing):**
- Same workspace → TypeScript path mapping (`tsconfig.json`) auto-wired by CLI.
- Separate project → `npm link` (symlinks the build into another project's `node_modules`, behaves like a real installed package).

### Publishing to npm
1. Package metadata in `projects/ui-components/package.json`:
```json
{
  "name": "@yourname/ui-components",
  "peerDependencies": { "@angular/core": "^19.0.0" }
}
```
   - **Scoped name** (`@yourname/...`) avoids name collisions on the public registry.
   - **`peerDependencies`, not `dependencies`** — Angular libraries never bundle their own `@angular/core`; consumer's own Angular version is used instead.
2. `npm login`
3. Publish from the **built output**, not source:
```bash
cd dist/ui-components
npm publish --access public   // --access public required for scoped packages (default is private/paid)
```
4. Updates: `npm version patch|minor|major` (semver) → rebuild → `npm publish` again.
5. `npm unpublish <pkg> --force` — only allowed within 72 hours, no dependents.

**One-liner:** *"Angular libraries declare `@angular/core` as a peer dependency so consumers use their own Angular version, not a bundled copy — publishing follows standard semver, and scoped packages need `--access public` since npm defaults scoped packages to private."*
- (citi) Multiple Angular Applications (it shares node_modules, main app src, e2e, ...):  
- A multi-project workspace is suitable for an enterprise that uses a single repository and global configuration for all Angular projects. 
  - main app: ```ng new my-app --routing```
  - Sub Application 1 ``` ng generate application app1 –-routing```
  - Sub Application 2 ``` ng generate application app2 –-routing```
- (citi) Angular Route-Guards to Secure Angular Pages: __Guard__ a class that bans users to access a route: (Stephan 313)
- (citi/Virtusa) Child - Child components relationship -> using __Subject__
- (citi) What is __CommonModule__ ? Exports all the basic Angular directives and pipes, such as NgIf, NgForOf, DecimalPipe, and so on
- (Virtusa) Pure (Default)/Impure Pipes:
  - A pure change is either a change to a primitive input (string, number etc) value. or changed Object reference.
  - Impure pipe executes everytime Angular Change detection works no matter the source has changed or not. which leads to bad performance.
  ```javascript
  @Pipe({
      name: 'sort',
      pure: false //true makes it pure and false makes it impure
       })
      export class myPipe implements PipeTransform {

      transform(value: any, args?: any): any {
         //your logic here and return the result
       }
      }
  ```
- Sync __Custom Validator__ (like check Password & Password Confimarion is the same) -Stephan 276
  - Create a Class using CLI
  - Create validate(Form Group Or Control) method in the class and retrun null if OK or an object when it is not Ok (passwords don't match)
  - Apply dependency injection to the class (Stephan 277) 
    - Import {Injectable} from '@angular/core'
    - Add the following decorator: @Injectable({providedIn: 'root'})
  - Inject the custom validator class to the Form-Group __ts__ file to access to matchPassword class, validate method.
  - Add ```{validators: [this.matchPassword.validate]}``` as second parameter of the FormGroup
- Async Pipes (Before):
  ```javascript
  export class AppComponent {
    signedin = false;
  
    constructor(private authService: AuthService) {}
  
    ngOnInit() {
      this.authService.signedin$.subscribe(signedin => {
        this.signedin = signedin;
      });
    }
  }
  ```
    
  ```htm
    <div class="right menu">
      <ng-container *ngIf="signedin">
        <a class="ui item" routerLink="/inbox" routerLinkActive="active">
          Inbox
        </a>
        <a class="ui item" routerLink="/signout" routerLinkActive="active">
          Sign Out
        </a>
      </ng-container>
   ```
- After:
  ```javascript
  export class AppComponent {
    signedin$: BehaviorSubject<boolean>;
  
    constructor(private authService: AuthService) {
      this.signedin$ = this.authService.signedin$;
    }
  }
  ```
  
  ```htm
    <div class="right menu">
      <ng-container *ngIf="signedin$ | async">
        <a class="ui item" routerLink="/inbox" routerLinkActive="active">
          Inbox
        </a>
        <a class="ui item" routerLink="/signout" routerLinkActive="active">
          Sign Out
        </a>
      </ng-container>
   ```
- __Getter__ & __Setter__ VS __Methods__
  - A difference between using a getter or setter and using a standard function is that getters/setters are automatically invoked on assignment. So it looks just like a normal property but behind the scenes you can have extra logic (or checks) to be run just before or after the assignment.
  - So if you decide to add this kind of extra logic to one of the existing object properties that is already being referenced, you can convert it to getter/setter style without altering the rest of the code that has access to that property.
  - This is useful if you want to follow the JavaScript convention of using __methods__ (functions that have been attached to objects) to do things, and use __properties__ (variables that have been attached to objects) to describe things. Or, put differently, you may want methods to mutate the object and getters to describe it.
  - Getter becomes useful when you start needing to do more than one representation of the same data:
  ```javascript
  class Distance { 
    setCentimeters(cm) { 
      this.setMeters(cm / 100); 
    } 

    get centimeters() { 
       return this.meters / 100; 
    } 
  } 
  ```
   - The __set__ syntax binds an object property to a function to be called when there is an attempt to set that property:
  ```javascript
  const language = {
    set current(name) {
      this.log.push(name);
    },
    log: []
  };

  language.current = 'EN';
  language.current = 'FA';

  console.log(language.log);
  // expected output: Array ["EN", "FA"]
  ```
- Planning the Architecture of your Angular App  
  - App Overview: the application goals
  - Development Methodology:  using a waterfall or agile approach
  - Domain Security: The domain security, using rules on the server side and communication with Angular app
  - Services/Communication: How is the app going to talk to the server
  - Data Models: What’s the data from the API
  - Application modules: Each has a structured block of code dedicated to an application domain. Important for using lazy loading.
  - Feature Components: How are our features and how are we structure our component
  - Shared Functionality: What shared functionality (shared module is where we have our reusable components)
  - Third party libraries: Decision about UI libraries like Angular Material or Kendo UI
  - Unit Testing: Are we testing? Budget? Coverage? Built-in CLI lib or something else?
  - End-to-end testing: Are we testing? Budget? Built-in CLI lib or something else? 
- CSS pseudo-class is used to define a special state of an element. Like a:visited, a:hover, a:active  
- **Closures**: The inner function has access to the outer function scope and variables even the the outer function has triggered and you don't have access to its scope from outside anymore.Its like the inner function remembers the scpe of outer function
