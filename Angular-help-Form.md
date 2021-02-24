# Reactive Forms:
## Form Group/Control:
### app.module.ts:
```javascript
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
### Form Component:
```javascript
import { FormGroup, FormControl } from '@angular/forms';
export class AppCardComponent implements OnInit {
  cardForm = new FormGroup({
    name: new FormControl('')
  });
  ngOnInit(): void {}
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
Using __Getter__ to get a form array to push __formCotrols__ in:   
- Inject form builder:
```javascript
  constructor(private fb: FormBuilder) {}
```
- Create Form Group/Array (using fb or directly):
```javascript
  cardForm = new FormGroup({
    alterEmails: this.fb.array([]),
  });
```
- Create getter:
```javascript
  get alterEmails(){
    return this.cardForm.get('alterEmails') as FormArray
  }
  ```
- Use getter to create Form Controls:
```javascript
  addAlterEmails() {
    this.alterEmails.push(this.fb.control(''));
  }
  ```
### app.module.ts:
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
We use dependency injection to be unified with the Async Custom Validator
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
We have to retuen an __Observable__ from __validate__ method (function)  
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
