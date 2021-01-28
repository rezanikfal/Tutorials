### withCredentials
Adding this option object kepps the cookie even you refresh the page
```javascript
  signup(credentials: SignupCredentials) {
    return this.http
      .post<SignupResponse>(`${this.rootUrl}/auth/signup`, credentials, {
        withCredentials: true
      })
      .pipe(
        tap(() => {
          this.signedin$.next(true);
        })
      );
  }
  ```
 ### HTTP Interceptor
- We can use Interceptor to automate the _withCredentials_ adding process
- By default _HttpClient_ does not store any Cookie and dump it after getting respond from server. Using __Interceptor__ we can control the request / response and keep the Cookies in this case.

