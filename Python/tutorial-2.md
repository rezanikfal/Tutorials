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
