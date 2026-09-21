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
## HTTP/API status codes.

| Status | Your idea 
|---|---|
| **200 OK** | Request succeeded. Common for `GET`, but can also be used for successful `PUT`, `PATCH`, `POST`, etc. May include a response body. 
| **201 Created** | A new resource was successfully created, usually after `POST`. Often returns the created resource and/or its location. 
| **204 No Content** | Request **succeeded**, but the server intentionally returns **no response body**. Common after `DELETE` or an update where nothing needs to be returned. It does **not normally mean data was not found**. 
| **400 Bad Request** | The server received the request, but something about the request is invalid: malformed JSON, missing required fields, invalid values, etc. 
| **401 Unauthorized** | Really means **not authenticated** or authentication is invalid/expired. The client may then redirect to login, but the HTTP status itself does not perform the redirect. 
| **403 Forbidden** | Server knows who you are, but you are not allowed to perform that action/access that resource. 
| **404 Not Found** | Usually means the **resource or endpoint cannot be found**, not simply that the payload is wrong. Example: `GET /users/999` where user 999 doesn't exist. 
| **409 Conflict** | Request conflicts with the current state of the resource. Example: trying to create an account with an email that already exists. 
| **500 Internal Server Error** | Unexpected server-side failure. Your request may be perfectly valid, but the server crashes or encounters an unhandled error. 
| **503 Service Unavailable** | Server/service is temporarily unavailable, often because of maintenance, overload, or a dependent service being down. 
