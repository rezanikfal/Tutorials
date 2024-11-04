### Request-Response cycle
- **Client** sends a request to a server, and the server processes this request and sends back a **response**.
- **Request** can include methods like `GET`, `POST`, `PUT`, or `DELETE`, as well as **headers** and any required **data** (in the case of a `POST` or `PUT`).
### Status Codes
- Outcome of an HTTP request. For clients to understand if a request was successful or if there was an issue.
  - **2xx** Success Codes: Indicate the request was **successful**.
  - **3xx** Redirection Codes: Indicate **further actions need** to be taken by the client.
  - **4xx** Client Error Codes: Indicate an error from the **client**'s side.
  - **5xx** Server Error Codes: Indicate an error on the **server**’s side.
### Tokens
- Tokens are used for **authentication** and **authorization** in web applications, especially in **REST APIs**.
- Tokens help secure resources and verify the **identity** of users making requests to the server.
- How Tokens Work:
  - **Authentication**: When a user logs in, the server verifies their credentials.
  - **Token Generation**: If the credentials are valid, the server generates a token (JSON Web Token - JWT) and sends it back to the client.
  - **Token Usage**: The client stores the token (often in `localStorage`) and includes it in the headers of subsequent requests.
  - **Token Validation**: When the server receives a request, it checks the token for validity (Is it expired or is it tampered)
  - **Access Control:** If the token is valid, the server allows access to the requested resource.
