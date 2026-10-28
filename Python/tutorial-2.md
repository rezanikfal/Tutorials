## 0. Python tricks
### enumerate()
**`enumerate()` returns a lazy iterator, not a list.**

```python
names = ["Alex", "Sara", "John"]
answer = enumerate(names)

print(answer)        # <enumerate object at 0x...>  (address varies)
print(list(answer))  # [(0, 'Alex'), (1, 'Sara'), (2, 'John')]
```

- `enumerate(iterable, start=0)` yields `(index, item)` tuples on demand.
- Printing it shows the object repr, not its contents.
- **It's a one-shot iterator:** after you consume it once (e.g. `list(answer)`), it's exhausted and a second pass returns `[]`.
- Typical usage is a direct loop:

```python
for i, name in enumerate(names):
    print(i, name)
```
### Pydantic model

Create a Pydantic model named `ChatRequest` with:

- `message`: a string with a minimum length of 1 and maximum length of 4000.
- `history`: a list of strings, defaulting to an empty list.

Instantiate it with `message="Hello"` and print the object.
```python
from typing import Literal

from pydantic import BaseModel, Field

class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str

class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=4000)
    history: list[ChatMessage] = Field(default_factory=list)

result = ChatRequest(message="hello")

print(result)
```
## 1. Project Overview

The goal is to build an AI application using:

- **Angular** — Frontend
- **FastAPI** — Python backend
- **Pydantic** — Request validation and data models
- **AI Model API** — Generate AI responses (not connected yet)

### Application flow

```text
Angular
   |
   | HTTP POST request
   v
FastAPI
   |
   | Validate request
   |
   | Build messages payload
   |
   | Call AI Model (Next Step)
   |
   | Receive AI response
   v
FastAPI
   |
   | Return JSON response
   v
Angular
```

---

## 2. Create the Python Project

Create a new project folder:

```text
ai-fastapi-new
```

Initialize the project using `uv`:

```bash
uv init --python 3.14
```

This creates the basic Python project structure.

### Install FastAPI

```bash
uv add "fastapi[standard]"
```

FastAPI provides the backend framework.

The standard installation includes Uvicorn, which runs the application server.

### Run the application

```bash
uv run fastapi dev main.py
```

This starts the development server.

FastAPI provides an interactive API documentation page:

```text
http://127.0.0.1:8000/docs
```

The `/docs` page allows testing API endpoints directly from the browser.

---

## 3. FastAPI Application

The main application is defined in `main.py`.

```python
from fastapi import FastAPI

app = FastAPI()
```

`FastAPI()` creates the application instance.

The `app` object is used to define API endpoints.

### GET endpoint

```python
@app.get("/")
def home():
    return {"message": "2nd Ai learning project"}
```

This endpoint returns a JSON response.

Example:

```json
{
  "message": "2nd Ai learning project"
}
```

---

## 4. Pydantic Models

Pydantic models define the structure of incoming request data.

FastAPI uses these models to validate JSON requests automatically.

### ChatMessage

```python
from typing import Literal

from pydantic import BaseModel


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str
```

This model represents one message in the conversation history.

Example:

```json
{
  "role": "user",
  "content": "What is Python?"
}
```

### Fields

| Field | Description |
|---|---|
| `role` | Identifies who sent the message |
| `content` | Contains the message text |

The `Literal` type restricts the role to:

```python
"user"
"assistant"
```

Other role values will fail validation.

---

## 5. ChatRequest Model

The frontend sends a chat request to FastAPI.

```python
from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    message: str = Field(
        min_length=1,
        max_length=4000
    )

    name: str | None = None

    history: list[ChatMessage] = Field(
        default_factory=list
    )
```

### Fields

| Field | Description |
|---|---|
| `message` | Current user message |
| `name` | Optional name |
| `history` | Previous conversation messages |

### Message validation

```python
message: str = Field(
    min_length=1,
    max_length=4000
)
```

The message must contain at least one character and cannot exceed 4000 characters.

### Optional name

```python
name: str | None = None
```

The name can be a string or `None`.

If omitted, its default value is `None`.

### Conversation history

```python
history: list[ChatMessage] = Field(
    default_factory=list
)
```

The history contains a list of `ChatMessage` objects.

`default_factory=list` creates a new empty list when history is not provided.

This avoids using one shared mutable list as the default.

---

## 6. Angular Request Payload

Angular sends a POST request to the backend.

Example JSON:

```json
{
  "message": "How are you?",
  "name": "Sally",
  "history": [
    {
      "role": "user",
      "content": "What is Python?"
    },
    {
      "role": "assistant",
      "content": "Python is a programming language."
    }
  ]
}
```

This JSON is the **frontend request payload**.

It contains:

1. The current message
2. Optional user name
3. Previous conversation history

The frontend does not need to create the AI system message.

The backend creates that message separately.

---

## 7. POST Endpoint

The backend receives the request using a FastAPI POST endpoint.

```python
@app.post("/ai/chat")
def chat(request: ChatRequest):
    return {
        "received_message": request.message,
        "history_count": len(request.history),
        "history": request.history
    }
```

### How it works

```python
@app.post("/ai/chat")
```

Defines a POST endpoint.

```python
request: ChatRequest
```

FastAPI receives the JSON request and validates it against the `ChatRequest` model.

If valid, FastAPI creates a Pydantic object.

The endpoint can access:

```python
request.message
request.name
request.history
```

### Example response

```json
{
  "received_message": "Hey Sally",
  "history_count": 2,
  "history": [
    {
      "role": "user",
      "content": "What is Python?"
    },
    {
      "role": "assistant",
      "content": "Python is a programming language."
    }
  ]
}
```

This endpoint currently returns the received request data.

It does not call an AI model yet.

---

## 8. Pydantic `model_dump()`

`model_dump()` is a Pydantic method.

It converts a Pydantic model into a regular Python dictionary.

Example:

```python
message = ChatMessage(
    role="user",
    content="What is Python?"
)
```

The object contains:

```python
message.role
message.content
```

Calling:

```python
message.model_dump()
```

returns:

```python
{
    "role": "user",
    "content": "What is Python?"
}
```

### Why is this needed?

The AI API expects messages represented as dictionaries.

Our history contains Pydantic objects.

Therefore, we convert each history item into a dictionary before sending it to the AI.

---

## 9. Python List Comprehension

The following expression:

```python
[item.model_dump() for item in request.history]
```

is a Python list comprehension.

It loops through the history and converts each item into a dictionary.

### Example input

```python
history = [
    ChatMessage(
        role="user",
        content="Hello"
    ),
    ChatMessage(
        role="assistant",
        content="Hi!"
    )
]
```

### List comprehension

```python
[item.model_dump() for item in history]
```

### Result

```python
[
    {
        "role": "user",
        "content": "Hello"
    },
    {
        "role": "assistant",
        "content": "Hi!"
    }
]
```

Each Pydantic object becomes a dictionary.

---

## 10. Python `*` Unpacking

Python uses `*` to unpack items from an iterable.

It is similar to the JavaScript spread operator:

```javascript
...history
```

### Python example

```python
history = [10, 20, 30]

result = [1, 2, *history, 4]
```

Result:

```python
[1, 2, 10, 20, 30, 4]
```

Without `*`:

```python
result = [1, 2, history, 4]
```

Result:

```python
[1, 2, [10, 20, 30], 4]
```

The difference:

- `*history` inserts each item individually.
- `history` inserts the entire list as one item.

---

## 11. Constructing the AI Messages Payload

This is the next preparation step before calling the AI model.

```python
messages = [
    {
        "role": "system",
        "content": "You are a helpful assistant."
    },
    *[
        item.model_dump()
        for item in request.history
    ],
    {
        "role": "user",
        "content": request.message
    }
]
```

### What does this do?

The backend creates a new list containing:

1. System instructions
2. Previous conversation history
3. Current user message

### Example

Suppose the request contains:

```python
request.message = "How are you?"
```

And history contains:

```python
[
    ChatMessage(
        role="user",
        content="Hello"
    ),
    ChatMessage(
        role="assistant",
        content="Hi!"
    )
]
```

The resulting `messages` list is:

```python
[
    {
        "role": "system",
        "content": "You are a helpful assistant."
    },
    {
        "role": "user",
        "content": "Hello"
    },
    {
        "role": "assistant",
        "content": "Hi!"
    },
    {
        "role": "user",
        "content": "How are you?"
    }
]
```

### Important

This `messages` list is not the Angular request payload.

It is the **AI model payload**, constructed by the backend.

---

## 12. System, User, and Assistant Roles

### System

```python
{
    "role": "system",
    "content": "You are a helpful assistant."
}
```

Provides instructions for the AI.

### User

```python
{
    "role": "user",
    "content": "How are you?"
}
```

Contains the user's question or message.

### Assistant

```python
{
    "role": "assistant",
    "content": "Hi!"
}
```

Contains a previous AI response.

Conversation history allows the AI model to receive previous messages as context.

---

## 13. Current Implementation Status

### Completed

- Created a new Python project
- Initialized project using `uv`
- Installed FastAPI
- Created FastAPI application
- Created Pydantic `ChatMessage`
- Created Pydantic `ChatRequest`
- Defined GET endpoint
- Defined POST endpoint
- Tested request validation
- Received JSON request payload
- Converted Pydantic objects using `model_dump()`
- Learned Python list comprehension
- Learned Python `*` unpacking
- Constructed the AI messages payload

### Not implemented yet

- AI API client
- API key configuration
- AI model selection
- Calling the AI model
- Extracting the generated answer
- Returning the AI answer to Angular

---

## 14. Next Step: Call the AI Model

The next phase will connect the prepared `messages` list to an AI model.

The planned backend flow:

```python
@app.post("/ai/chat")
async def chat(request: ChatRequest):

    # 1. Construct messages
    messages = [...]

    # 2. Call AI model
    response = await client.chat.completions.create(
        model="your-model",
        messages=messages
    )

    # 3. Extract AI answer
    answer = response.choices[0].message.content

    # 4. Return answer to Angular
    return {
        "response": answer
    }
```
## 1. Current project

A FastAPI endpoint receives a chat request, combines a system instruction with the conversation history and the latest user message, sends the messages to Groq, and returns the assistant's answer.

- **Model used successfully:** `openai/gpt-oss-120b`
- **Environment variable:** `GROQ_API_KEY` is the recommended name for the Groq API key.

## 2. Request models

`ChatMessage` represents one message:

- `role`: `Literal["user", "assistant", "system"]`
- `content`: `str`

`ChatRequest` contains the current message, optional name, and history list.

- The current message has Pydantic validation: minimum length 1, maximum length 100.
- History uses `Field(default_factory=list)`, so it defaults to an empty list.

## 3. Message roles and request flow

- **`system`**: Sets the assistant's behavior, e.g. “You are a helpful assistant.”
- **`user`**: Contains a user's message.
- **`assistant`**: Contains an earlier response from the AI.

Include the system message on every Groq request; it is not automatically remembered between API calls. Keep the system message separate from history. History should contain prior conversation messages.

## 4. Building messages and Pylance typing

The Groq SDK expects a specific message-parameter type. Pylance reported a type mismatch when the list was inferred as `list[dict[str, Any]]`. The working approach used an explicit list annotation and `cast()` for each Pydantic history message:

```python
from typing import cast
from groq.types.chat import ChatCompletionMessageParam

messages: list[ChatCompletionMessageParam] = [
    {"role": "system", "content": "You are a helpful assistant."},
    *[
        cast(ChatCompletionMessageParam, msg.model_dump())
        for msg in request.history
    ],
    {"role": "user", "content": request.message},
]
```

**Note:** `cast()` affects static type checking only; it does not validate or convert the value at runtime. The explicit role-branch helper was discussed as a way to avoid `cast()`, but the cast-based version is the one confirmed to work in this project.

## 5. Calling Groq and returning the answer

```python
response = client.chat.completions.create(
    model="openai/gpt-oss-120b",
    messages=messages,
)

return {"answer": response.choices[0].message.content}
```

Returning only the answer gives the client clean JSON instead of the full completion object.

## 6. Error handling

```python
from fastapi import HTTPException
from groq import GroqError

try:
    response = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=messages,
    )
    return {"answer": response.choices[0].message.content}
except GroqError:
    raise HTTPException(
        status_code=502,
        detail="AI service is temporarily unavailable.",
    )
```

This was tested successfully. A mistaken API key produced a Groq error, and the endpoint handled it.

## 7. Conversation history

History is currently supplied by the client in each request. FastAPI does not automatically store previous messages, and the model does not remember earlier API calls unless their messages are sent again.

Example request body:

```json
{
  "message": "What is my name?",
  "history": [
    {"role": "user", "content": "My name is Alex."},
    {"role": "assistant", "content": "Nice to meet you, Alex!"}
  ]
}
```

The frontend should append each user message and assistant answer to its history and send that history with the next request.

## 8. Keeping history shorter

We discussed this slice:

```python
messages = messages[:1] + messages[-10:]
```

It keeps the first message (the system prompt) plus the last 10 messages. That is up to 11 messages total. In production, make sure the system message is not duplicated and consider keeping complete user/assistant turns together.
