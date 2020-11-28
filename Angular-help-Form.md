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
```html
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
```html
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
```html
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
