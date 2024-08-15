### Cross-Origin Resource Sharing (CORS)
- By default, web browsers enforce the Same-Origin Policy (SOP).
- CORS is a security feature implemented by web browsers that allows or restricts web applications running at one origin (domain) to request resources from a different origin.
### withCredentials
- The ```withCredentials``` option is particularly useful when the backend service requires authentication.
  - To handle CORS, setting withCredentials to true tells the browser to include credentials with requests to a different origin.
  - If your backend uses cookies for authentication or session management, you need ```withCredentials: true```
### HttpHeaders
- HTTP headers are crucial in requests, as they provide the server with information about the client and the nature of the request..
- ```HttpHeaders``` are key-value pairs that provide additional context about the request, such as the content type, authorization credentials, or custom metadata.
```javascript
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor(private http: HttpClient) {}

  sendData(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer your-token-here'
    });

    return this.http.get('https://api.example.com/data', {
      withCredentials: true,
      headers 
    });
  }
}
```
 ### HTTP Interceptor
- We can use Interceptor to automate the _withCredentials_ adding process
- By default _HttpClient_ does not store any Cookie and dump it after getting respond from server. Using __Interceptor__ we can control the request / response and keep the Cookies in this case.
 ### Create Interceptor
- Create a class (i.e. auth-http-interceptor.ts)
```javascript
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEventType
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Modify or log the outgoing request
    const modifiedReq = req.clone({
      withCredentials: true
    });
    return next.handle(modifiedReq)
  }
}
  ```
- Edit app.module.ts
```javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthHttpInterceptor } from './auth/auth-http-interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, AuthModule, HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```
### Control the send/response object
We can differentiate the send request and received response using _HttpEventType_ class:
```javascript
export class AuthHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Modify or log the outgoing request
    const modifiedReq = req.clone({
      withCredentials: true
    });

    return next.handle(modifiedReq).pipe(
      filter(val => val.type === HttpEventType.Sent),
      tap(val => {
        console.log('Sent the request');
      })
    );
  }
}
```
