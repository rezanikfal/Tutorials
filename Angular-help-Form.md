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
  <div *ngIf="control.errors.pattern">
    Invalid format
  </div>
</ng-container>
</form>>
```
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
## Custom Validator in FormGroup Level:
```javascript
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
...
export class EquationComponent implements OnInit {
  mathForm = new FormGroup(
    {
      a: new FormControl(this.randomNumber()),
      b: new FormControl(this.randomNumber()),
      answer: new FormControl('')
    },
    [
      (form: AbstractControl) => {
        const { a, b, answer } = form.value;
        if (a + b === parseInt(answer)) {
          return null;
        }

        return { addition: true };
      }
    ]
  );
    get a() {return this.mathForm.value.a;}

  get b() {return this.mathForm.value.b;}

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }
```
```htm
<form [formGroup]="mathForm">
  {{ a }} + {{ b }} =
  <input formControlName="answer" />
</form>
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
