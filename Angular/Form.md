# Reactive Forms:
## Form Group/Control:
### app.module.ts:
```javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```
### BrowserModule & CommonModule (included)
```javascript
import { BrowserModule } from '@angular/platform-browser';
```
- ```BrowserModule``` A built-in Angular module that is essential for running Angular applications in a web browser to work the DOM, such as bindings, event handling, etc.
- ```CommonModule``` included within ```BrowserModule``` and provides common directives like ```ngIf```, ```ngFor```, ```DatePipe```, etc.
- When you create a new Feature Module as below, no need to the ```BrowserModule```. 
```javascript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class MyMod1Module { }
```
### NgModule
```javascript
import { NgModule } from '@angular/core';
```
- ```NgModule``` is a decorator that marks a class as an Angular module and provides metadata about the module (i.e. declarations, imports, ...).
### Form Component:
```username: new FormControl('Default Value', [ Default Validator], [Custom Validators]),```
```javascript
import { FormGroup, FormControl } from '@angular/forms';
export class AppCardComponent implements OnInit {
cardForm!: FormGroup;

 ngOnInit(): void {
  cardForm = new FormGroup({
    name: new FormControl('')
  });
 }
}
```
```htm
<form [formGroup]="cardForm">
  <input formControlName="name" />
</form>

<div>{{ cardForm.value | json }}</div>
<div>{{ cardForm.valid }}</div>
```
## Access to the Form Control in HTML:
```html
<div>{{ cardForm.controls.name.errors }}</div>
<div>{{ cardForm.get('name').errors }}</div>
```
## Form Control Validation/Error Handling:
```javascript
import { FormGroup, FormControl, Validators } from '@angular/forms';
...
export class AppCardComponent implements OnInit {
  cardForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });
```
```htm
<form [formGroup]="cardForm">
  <input formControlName="name" />
  <ng-container *ngIf="cardForm.controls.name.errors">
    <div *ngIf="cardForm.controls.name.errors.required">Value is required</div>
    <div *ngIf="cardForm.controls.name.errors.minlength">
      Value you entered is
      {{ cardForm.controls.name.errors.minlength.actualLength }} characters
      long, but it must be
      {{ cardForm.controls.name.errors.minlength.requiredLength }} characters.
    </div>
  </ng-container>
</form>>
```
## AbstractControl pristine/dirty/touched/untouched:
- untouched True if control has not lost focus yet.
- touched True if control has lost focus.
- pristine True if user has not interacted with the control yet.
- dirty True if user has already interacted with the control.
```htm
<form [formGroup]="cardForm">
  <input formControlName="name" />
  <ng-container
    *ngIf="
      cardForm.controls.name.dirty &&
      cardForm.controls.name.touched &&
      cardForm.controls.name.errors
    "
  >
    ....
```
## Create *Reusable* Form Controls:
- Create a normal ```formGroup``` with ```FormControl(s)``` in the parent component.
- Create a the reusable ```FormControl``` component with **just the html**.
- The child template includes the type of control (input, radio, ...), error handeling, ... .
- Pass the ```FormControl``` from parent to child as ```@Input``` and use it in the child template. 
### Parent Componenet:
```javascript
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
....
export class CardFormComponent implements OnInit {
  cardForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)])
  });
}
```
```htm
<form [formGroup]="cardForm">
  <app-input [control]="cardForm.get('name')"></app-input>
</form>
```
### Child Componenet (Reusable) + Validation:
```javascript
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
....
export class InputComponent implements OnInit {
  @Input() control: FormControl;
}
```
```htm
<input [formControl]="control" />
<ng-container *ngIf="control.dirty && control.touched && control.errors">
  <div *ngIf="control.errors.required">
    Value is required.
  </div>
  <div *ngIf="control.errors.minlength">
    Value you entered is
    {{ control.errors.minlength.actualLength }}
    characters long, but it must be at least
    {{ control.errors.minlength.requiredLength }}
    characters
  </div>
  <div *ngIf="control.errors.maxlength">
    Value you entered is
    {{ control.errors.maxlength.actualLength }}
    characters long, but it cannot be longer than
    {{ control.errors.maxlength.requiredLength }}
    characters
  </div>
  //regular expression
  <div *ngIf="control.errors.pattern">
    Invalid format
  </div>
</ng-container>
</form>>
```
## RxJS & Forms:
```javascript
  mathForm = new FormGroup(
    {
      a: new FormControl(this.randomNumber()),
      b: new FormControl(this.randomNumber()),
      answer: new FormControl('')
    },
    [MathValidators.addition('answer', 'a', 'b')]
  );
  ```
  __statusChanges__ watches for *Form Status Changes* in terms of Valid or Invalid
  ```javascript
    ngOnInit() {
    this.mathForm.statusChanges
      .pipe(
        filter(value => value === 'VALID'),
        delay(100)
      )
      .subscribe(({ numberSolved, startTime }) => {
        ...
      });
  }

```
  __valueChanges__ watches for *Form Value Changes* and emmits the changed value
  ```javascript
    ngOnInit() {
    this.mathForm.valueChanges
      .pipe(map(({ a, b, answer }) => Math.abs((a + b - answer) / (a + b))))
      .subscribe(value => {
        console.log(value);
      });
  }
```
## Dynamic Forms using FormBuilder/FormArray:  
Lets say we need a form with name and email of the user and nultiple (unknown number) addresses for him. Here is the process:
- Using Getter to get a form array to push **formCotrols** in:   
- Inject  ```FormBuilder```:
```javascript
import { FormBuilder, FormGroup } from '@angular/forms';

export class YourComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [''],           // Single form control
      email: [''],          // Single form control
      addresses: this.fb.array([])  // Form array for multiple addresses
    });
  }

  get addresses() {
    return this.form.get('addresses') as FormArray;
  }
}
```
- You can dynamically add form controls to the FormArray using the push method.:
```javascript
addAddress() {
  const addressGroup = this.fb.group({
    street: [''],
    city: [''],
    state: [''],
    zip: ['']
  });

  this.addresses.push(addressGroup);
}
```
- Here is the ```FormArray``` template (similar form controls for each address):
```javascript
  <div formArrayName="addresses">
    <div *ngFor="let address of addresses.controls; let i = index" [formGroupName]="i">
      <label for="street">Street:</label>
      <input id="street" formControlName="street">

      <label for="city">City:</label>
      <input id="city" formControlName="city">

      <label for="state">State:</label>
      <input id="state" formControlName="state">

      <label for="zip">Zip:</label>
      <input id="zip" formControlName="zip">

      <button type="button" (click)="removeAddress(i)">Remove Address</button>
    </div>
  </div>
  ```
### app.component.ts:
```javascript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // alterEmails: FormArray;
  get alterEmails(){
    return this.cardForm.get('alterEmails') as FormArray
  }

  addAlterEmails() {
    this.alterEmails.push(this.fb.control(''));
  }

  constructor(private fb: FormBuilder) {}

  cardForm = new FormGroup({
    alterEmails: this.fb.array([]),
  });

  ngOnInit(): void {
    // Alternative for Getter
    // this.alterEmails = <FormArray>this.cardForm.get('alterEmails');
  }
}
```
### Form Markup:
```htm
<form [formGroup]="cardForm">
  <button type="button" (click)='addAlterEmails()'>Add Email</button>
  <div formArrayName='alterEmails' *ngFor="let item of alterEmails.controls; let i=index">
    <input type="text" [formControlName] = 'i'>
  </div>
</form>

<div>{{ cardForm.value | json }}</div>
}
```
## Custom Validator (Synchrones):
We use dependency injection to be unified with the Async Custom Validator. ```implements Validator```
### form.component.ts:
```javascript
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatchPassword } from "../validators/match-password";

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent {
  constructor(private mtchPassword:MatchPassword) {}
  authForm = new FormGroup(
    {
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    },
    { validators: [this.mtchPassword.validate] }
  );
}

```
### Validator Class- Make it injectable to inject to the form.ts component (match-password.ts):
```javascript
import { Injectable } from '@angular/core';
import { FormGroup, Validator } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class MatchPassword implements Validator {
  validate(formGroup: FormGroup) {
    if (
      formGroup.get('password').value ===
      formGroup.get('passwordConfirmation').value
    ) {
      return null;
    } else {
      return { passwordDontMatch: true };
    }
  }
}
```
### form.component.html:
```htm
<form [formGroup]="authForm">
  <div>
    <label for="username">Username</label>
    <input formControlName="username" id="username" autocomplete="off" />
  </div>
  {{authForm.get('username').errors|json}}
  <div>
    <label for="password">Password</label>
    <input type="password" formControlName="password" id="password" autocomplete="off" />
  </div>
  {{authForm.get('password').errors|json}}
  <div>
    <label for="passwordConfirmation">Password Confirmation</label>
    <input type="password"  formControlName="passwordConfirmation" id="passwordConfirmation" autocomplete="off" />
  </div>
  {{authForm.get('passwordConfirmation').errors|json}}
</form>
{{authForm.errors|json}}
}
```
## Custom Validator (Asynchrones):
We have to retuen an __Observable__ from __validate__ method (function). ```implements AsyncValidator```
### form.component.ts:
```javascript
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatchPassword } from "../validators/match-password";
import { UniqueUsername } from "../validators/unique-username";

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent {
  constructor(private mtchPassword:MatchPassword, private uniqueUsername:UniqueUsername) {}
  authForm = new FormGroup(
    {
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ], [this.uniqueUsername.validate]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    },
    { validators: [this.mtchPassword.validate] }
  );
}
```
### Validator Class- Make it injectable
Make validate method to function to bind _this_ to the parent class:  
```javascript
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, AsyncValidator } from '@angular/forms';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
  constructor(private http: HttpClient) {}

  validate = (formControl: FormControl) => {
    const { value } = formControl;

    return this.http
      .post<any>('https://api.angular-email.com/auth/username', {
        username: value,
      })
      .pipe(
        map((val) => {
          if (val.available) {
            return null;
          }
        }),
        catchError((err) => {
          if (err.error.username === 'Username in use') {
            return of({ nonUniqueUsername: true });
          } else {
            return of({ noConnection: true });
          }
        })
      );
  };
}
```
### AbstractControl
- This is the base class for FormControl, FormGroup, and FormArray.
- For example it the following sample ```control``` can be any type of form control.
```javascript
validate(control: AbstractControl): ValidationErrors {
  throw new Error('Method not implemented.')
}
```
