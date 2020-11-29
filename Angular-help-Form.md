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
