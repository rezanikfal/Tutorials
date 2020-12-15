## Create Custom Pipe:
### Typescript (Pipe)
```ng generate pipe Pipe-Name```
```javascript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimOutletName'
})
export class TrimOutletNamePipe implements PipeTransform {
  transform(title: string, outletName: string): any {
    return title.replace(` - ${outletName}`, '');
  }
}
```
### Html (Component)
```html
<h3>World News</h3>
<div class="list-group">
  <a
    *ngFor="let article of articles"
    class="list-group-item list-group-item-action"
    [href]="article.url"
    target="_blank"
  >
    {{ article.title | trimOutletName: article.source.name }}
  </a>
</div>
```
