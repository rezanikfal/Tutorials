```
/project-root
│
├── /controllers                 # Handle request/response logic for routes
│   └── bootcamps.js
│
├── /routes                      # Define endpoints and connect them to controllers
│   └── bootcamps.js
│
├── /middleware                  # Middleware functions (auth, error handling, logging)
│   ├── auth.js
│   └── errorHandler.js
│   └── validate.js              # Validate using validationResult(req)
│
├── /models                      # Database models (Mongoose, Sequelize, etc.)
│   └── Bootcamp.js
│
├── /utils                       # Helper functions (e.g., error response, token generation)
│   ├── errorResponse.js
│   └── sendEmail.js
│
├── /config                      # Configuration files (DB connection, environment settings)
│   └── db.js
│
├── /services                    # Business logic that doesn't fit in controllers (e.g., payment processing)
│   └── paymentService.js
│
├── /public                      # Static files (images, CSS, client-side JavaScript)
│   └── index.html
│
├── /views                       # Server-side rendered templates (if using a template engine like EJS, Pug)
│   └── index.ejs
│
├── /tests                       # Unit and integration tests
│   └── bootcamp.test.js
│
├── /logs                        # Application logs (if using logging libraries like Winston)
│   └── error.log
│
├── /docs                        # API documentation (Swagger/OpenAPI specs)
│   └── api-docs.json
│
├── app.js                       # Main application file (sets up Express app and middleware)
├── server.js                    # Entry point (connects to DB, starts server)
├── package.json                # Project metadata and dependencies
└── .env                         # Environment variables
```
