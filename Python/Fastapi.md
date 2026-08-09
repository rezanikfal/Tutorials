# FastAPI / Python — Running Notes

## Day 1 — Setup with `uv`
- `uv` replaces `pip` + `venv` + `pip-tools` — modern, fast (Rust-based), unified.
```bash
uv init my-project          # creates pyproject.toml (modern standard, replaces requirements.txt)
uv add fastapi              # add a dependency
uv add --dev uvicorn[standard] ruff  # dev-only dependencies
uv run uvicorn main:app --reload    # runs the app — uv manages the venv automatically, no manual activate
```
- **`ruff`** = modern linter + formatter, replaces flake8 + black + isort combined. Rust-based, much faster.
```bash
uv run ruff check .    # lint
uv run ruff format .   # format
```
- `/docs` — FastAPI auto-generates interactive Swagger UI documentation for free, zero config. Use this to test endpoints without needing a frontend.

## Type hints (Python's version of TypeScript types)
```python
def get_name() -> str: ...
def get_count() -> int: ...
def get_todos() -> list[str]: ...          # like TS string[]
def get_user() -> dict[str, str]: ...      # like TS Record<string, string>
def get_optional() -> str | None: ...      # like TS string | null
def get_coords() -> tuple[float, float]: ... # FIXED length/order — like TS [number, number]
def get_many() -> tuple[int, ...]: ...     # variable-length tuple of same type (still immutable, unlike list)
```
- `list` = variable length, same type, mutable. `tuple` = fixed length, can mix types, immutable.
- Not required by Python itself, but FastAPI **uses type hints at runtime** — for validation, serialization, and auto-generating `/docs`. This is the key difference from TS, where types are erased at compile time.

## Decorators (`@app.get(...)`)
- Same mechanism as Angular's `@Component`/`@Injectable` — attaches metadata/behavior to what follows.
- `app.get("/")` is a **decorator factory**: it's called first (with the path), returns the actual decorator function, which is then called with the route-handler function.
```python
@app.get("/")
def read_root(): ...

# equivalent to:
decorator = app.get("/")       # returns a function
read_root = decorator(read_root)  # that function is called with read_root
```
- Same closure pattern as an Angular validator factory (`minAgeValidator(18)`) — the path is "remembered" via closure, applied later to whatever function is decorated.

## Pydantic models (Python's version of a TS interface, but with runtime teeth)
```python
from pydantic import BaseModel

class Todo(BaseModel):
    id: int
    title: str
    completed: bool

class TodoCreate(BaseModel):
    title: str
    completed: bool = False  # default value
```
- Use **separate models for input vs output** (e.g. `TodoCreate` has no `id` — server assigns it) — standard REST API design practice.
- When used as a function parameter, FastAPI automatically parses the request body as JSON and validates it against the model — no manual `if 'title' not in data` checks needed.
- Invalid input → FastAPI automatically returns `422 Unprocessable Entity` with a clear error, **before your function body even runs**.

## Building endpoints
```python
from fastapi import FastAPI
from models import Todo, TodoCreate

app = FastAPI(title="Todo API", version="0.1.0")

todos_db: list[Todo] = [
    Todo(id=1, title="Learn FastAPI", completed=False),
]

@app.get("/todos", response_model=list[Todo])
def get_todos() -> list[Todo]:
    return todos_db

@app.post("/todos", response_model=Todo, status_code=201)
def create_todo(todo: TodoCreate) -> Todo:
    new_id = max((t.id for t in todos_db), default=0) + 1
    new_todo = Todo(id=new_id, title=todo.title, completed=todo.completed)
    todos_db.append(new_todo)
    return new_todo
```
- `response_model=` tells FastAPI the exact output shape — auto-serializes, validates, and documents it in `/docs`.
- REST status codes worth knowing: `200` = general success, `201` = created (POST), `204` = success with no content (common for DELETE).

## Gotcha: `max()` on an empty sequence throws
```python
max([todo.id for todo in todos_db])              # ❌ ValueError if todos_db is empty
max((t.id for t in todos_db), default=0) + 1     # ✅ safe — defaults to 0 if empty
```
Same category of bug as the empty-array percentage/`NaN` issue from JS practice — always guard aggregate operations (`max`, `min`, average, etc.) against empty collections.

- **List comprehension `[...]` vs generator expression `(...)`:** list comprehension builds the full list in memory first; generator yields values lazily, one at a time. Negligible difference for small data, but generators avoid building large throwaway intermediate lists.

---
# FastAPI / Python — Day 4: Connecting to PostgreSQL (via Supabase)

- **Supabase** = free hosted Postgres — no local Docker/install needed. It's a real Postgres database; everything about SQLAlchemy/queries applies normally, only the *hosting* differs.
- Get connection string from: Supabase dashboard → Project Settings → Database → Connection string (URI format).

## Connection string driver suffix
```
postgresql://...            → generic standard URI (what Supabase's website gives you) — defaults to psycopg2 in SQLAlchemy
postgresql+psycopg://...    → explicitly use psycopg (v3, modern, has native async support)
postgresql+psycopg2://...   → explicitly use psycopg2 (older, mature, sync-only)
```
- Supabase (and any hosting provider) gives the **plain, universal** `postgresql://` format — the `+driver` suffix is SQLAlchemy-specific, added manually based on which Python driver is installed.
- If `psycopg2` is installed → plain `postgresql://` works fine (SQLAlchemy's default). If using `psycopg` (v3) → must explicitly add `+psycopg`.
- `psycopg2`: older, no async, extremely mature/stable. `psycopg` (v3): newer, native async support, actively developed. Either is fine for a sync FastAPI app; `psycopg` matters more if you need async DB calls later.

## `@` in the connection string
```
postgresql+psycopg://[user]:[password]@[host]:[port]/[database]
```
- The `@` separating credentials from host is required syntax. If the **password itself** contains `@` (or `#`, `%`, `/`, `:`), it must be URL-encoded (`@` → `%40`) or parsing breaks.
- Safer: use `urllib.parse.quote_plus(password)` to auto-encode instead of doing it by hand.

## Two model types, kept separate on purpose
```python
# Pydantic — API input/output shape
class Todo(BaseModel):
    id: int
    title: str
    completed: bool

# SQLAlchemy — actual DB table structure
class TodoDB(Base):
    __tablename__ = "todos"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    completed = Column(Boolean, default=False)
```
Pydantic validates API data; SQLAlchemy maps to DB rows. Keeping them separate lets API shape and DB schema evolve independently — standard practice.

## FastAPI dependency injection for DB sessions
```python
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/todos", response_model=list[Todo])
def get_todos(db: Session = Depends(get_db)) -> list[Todo]:
    return db.query(TodoDB).all()
```
- `Depends(get_db)` = same concept as Angular's `inject(SomeService)` — declare a dependency, framework provides it.
- `yield` here means "give the endpoint this session, then close it after, even on error" — prevents connection leaks.

## `text()` — for raw SQL
```python
from sqlalchemy import text
result = conn.execute(text("SELECT version();"))
```
- SQLAlchemy 2.0+ requires raw SQL strings to be wrapped in `text()` — a safety guardrail against accidental SQL injection (forces you to be deliberate about "this is literal SQL").
- Never use f-string interpolation into SQL (`f"...{value}"` → injection risk). Use named parameters instead:
```python
conn.execute(text("SELECT * FROM todos WHERE completed = :status"), {"status": True})
```
- Normal app code should prefer the **ORM style** instead of raw SQL: `db.query(TodoDB).filter(TodoDB.completed == True).all()` — safer (auto-escaped), more Pythonic. `text()` is mainly for diagnostics or SQL the ORM can't easily express.

## Reading query results — `fetchone()` / `fetchall()`
```python
result = conn.execute(text("SELECT version();"))
row = result.fetchone()   # next single row (tuple-like), even 1 column → row[0] for the value
```
- `fetchone()` — one row (or `None` if exhausted). `fetchall()` — all remaining rows as a list. `fetchmany(n)` — next n rows (batch processing).
- `result` behaves like an iterator/cursor — each `fetchone()` call advances to the next row, doesn't repeat the same one. Same mental model as a JS generator's `.next()`.

## `max()` gotcha (from Day 3, still relevant)
```python
max((t.id for t in todos_db), default=0) + 1   # safe — default= avoids crashing on empty sequence
```
