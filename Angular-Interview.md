- The main objectives of decorators is to add some metadata to the __class__ that will tell Angular 4 how to process a __class__. @NgModule (root module - imports –> Modules & Declarations -> Components), @Component , @Injectable
- Ahead-of-time (AOT) compilation: With AOT, the compiler runs at the build time. render the application immediately
- Just-in-time (JIT) compilation: This is a standard developviment approach which compiles our Typescript and html files in the browser at runtime.
- Template reference variables -> <input #reza ...
- An Attribute directive changes the appearance or behavior of a DOM element and extend the power of the HTML by giving it new syntax. (Structural directives -> *ngIf and *ngFor , Attribute directives -> *ngStyle and *ngClass, Components)
- Services encapsulates business logic and separates them from UI concerns
- Pure pipes are stateless that flow input date without remembering
- Impure pipes are those which can manage the state of the data (Async)
- prevent security threads (external HTML /external urls/API)
- optimize Angular: lazy loading/un-necessary import/AOT compilation/
- NgZone exposes a set of Observables that allow us to determine the current status, or stability, of Angular's zone.
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
- Class/Template  binding: <div [class.special]="isSpecial" / [style.color]="color"
- @View child - it is vaialable in __AfterViewInit__ life cycle hook:
```htm
<input #nameRef type="text" [(ngModel)]="name">
```
```Javascript
@ViewChild('nameRef') nameElementRef: ElementRef;
...
this.nameElementRef.nativeElement.focus();
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
- (citi) Multiple Angular Applications (it shares node_modules, main app src, e2e, ...):   
  - main app: ```ng new my-app --routing```
  - Sub Application 1 ``` ng generate application app1 –-routing```
  - Sub Application 2 ``` ng generate application app2 –-routing```
- (citi) Angular Route-Guards to Secure Angular Pages: __Guard__ a class that bans users to access a route: (Stephan 313)
- (citi/Virtusa) Child - Child components relationship -> using __Subject__
- (citi) What is __CommonModule__ ? Exports all the basic Angular directives and pipes, such as NgIf, NgForOf, DecimalPipe, and so on
- (Virtusa) Pure (Default)/Impure Pipes:
  - A pure change is either a change to a primitive input (string, number etc) value. or changed Object reference.
  - Impure pipe executes everytime no matter the source has changed or not. which leads to bad performance.
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
  
