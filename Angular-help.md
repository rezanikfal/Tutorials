## Naming Convention  
`ng g c PageList`  
- It generates `page-list.component.ts` or `css` or `html`  

`ng g s wikipedia`  
- It generates `wikipedia.service.ts`
## New Project without Test
- ng new angular-tour-of-heroes --skip-tests 
## New Module with routeing
- ng g m landing-page --routing=true
##  A Fresh Start:
- code -r . + Dest. Foldeer: `code -r .\udemy-course\`
##  Apply style to same components in the parent component but the first one:
```css
:host:not(:first-of-type){  
Display: block;  
margin-top: 20px;
}
```
## Access to the component HTML content:
```javascript
import { Component, OnInit, ElementRef } from '@angular/core';

export class Mod1Comp1Component implements OnInit {
  constructor(private el:ElementRef){}
  
  ngOnInit(): void {
    console.log(this.el.nativeElement);
  }
}
```
## Pass Data from parent to child using INPUT:
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
  pages = [];

  constructor(private wikipedia: WikipediaService) {}

  onTerm(term: string) {
    this.wikipedia.search(term).subscribe((response: any) => {
      this.pages = response.query.search;
    });
  }
}
```
```html
<app-page-list [pages]="pages"></app-page-list>
```

## Pass Data from child to parent using OUTPUT:
### Child (app-modal):
```javascript
import { Component, OnInit, Output, EventEmitter} from '@angular/core';
export class ModalComponent implements OnInit {
  @Output() close = new EventEmitter();
  
  onCloseClick() {
    this.close.emit();
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
<app-modal (close)="onClick()" *ngIf="modalOpen"></app-modal>
```
# RxJS:
## Http Call Details using RxJS (Angular 9):
Sample API call: <https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=Nelson%20Mandela&utf8=&format=json>
### app.module.ts:
```javascript
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```
### Service:
```javascript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface WikipediaResponse{
  query: {
    search: {
      title: string;
      snippet: string;
      pageid: number;
    }[];
  }  
}

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {
  constructor(private http: HttpClient) {}

  public search(term: string) {
    return this.http.get<WikipediaResponse>('https://en.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        format: 'json',
        list: 'search',
        utf8: '1',
        srsearch: term,
        origin: '*'
      }
    })
    .pipe(pluck('query', 'search'));
  }
}
```
### Component without RxJS Pluck:
```javascript
import { Component, Injectable, ReflectiveInjector } from '@angular/core';
import { WikipediaService } from './wikipedia.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pages = [];

  constructor(private wikipedia: WikipediaService) {}

  onTerm(term: string) {
    this.wikipedia.search(term).subscribe((response: any) => {
      this.pages = response.query.search;
    });
  }
}
```
### Component with RxJS Pluck:
```javascript
  onTerm(term: string) {
    this.wikipedia.search(term).subscribe((pages) => {
      this.pages = pages;
    });
  }
}
```
## mergeMap VS switchMap:
- *mergeMap* is best used when you wish to flatten an inner observable. It hijacks the value flowing through pipes and creates a new Observable.
- Using *switchMap* each inner subscription is completed when the source emits, allowing only one active inner subscription.

```javascript
import { Component, OnInit } from '@angular/core';
import { timer, Observable, of } from 'rxjs';
import { mergeMap, switchMap, tap } from 'rxjs/operators';


@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.css']
})
export class Comp1Component implements OnInit {

  constructor() { }

  ngOnInit(): void {

    new Observable((observer) => {
      observer.next(10)
      observer.next(20)
      observer.next(30)
    }).pipe(
      mergeMap((val: number) => timer(val * 100)),
      tap((val) => console.log(val))
    ).subscribe(()=>{})
  }
}
```
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


