## @let
- `@let` a cleaner, more powerful way to create local template variables directly in the templates.
```htm
@if (user) {
  @let fullName = user.firstName + ' ' + user.lastName;
  <h2>Hello, {{ fullName }}</h2>
  <p>Email: {{ user.email }}</p>
}
```
## @for
- `@for` It’s a modern, faster, and cleaner replacement for the old *ngFor directive.
- `@empty` is an Optional fallback block when the array is empty.
- The `track` keyword specifies the identity.
```htm
@for (user of users; track user.id; let i = $index) {
  <!-- template here -->
} @empty {
  <!-- optional empty block -->
}
```
