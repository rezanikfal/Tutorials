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
from pydantic import BaseModel, Field

class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=4000)
    history: list[str] = Field(default_factory=list)

result = ChatRequest(message="hello")

print(result)
```
