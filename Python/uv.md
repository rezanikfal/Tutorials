## 1. Creating a Project

```bash
uv init --package myproject
cd myproject
```

Two layout options:

| Command | Layout | Entry file |
|---|---|---|
| `uv init` or `uv init --app` | Flat layout, no `src/` | `main.py` (arbitrary name) |
| `uv init --package` | `src/` layout, importable package | `__main__.py` (required name) |

`--package` is the right choice when you want the project to be a proper installable/importable package (recommended for real projects).

Resulting structure:
```
myproject/
├── pyproject.toml
├── README.md
├── .python-version
├── uv.lock
├── .venv/
└── src/
    └── myproject/
        └── __init__.py
```

## 2. Virtual Environment

`uv` creates `.venv` automatically on first `uv run` / `uv sync` — no manual step needed. To create explicitly:

```bash
uv venv
```

No manual activation needed either — use `uv run ...` and it handles the venv for you. Or activate manually:
```bash
source .venv/bin/activate   # Linux/macOS
.venv\Scripts\activate      # Windows
```

## 3. Python Version Control

- `uv init` auto-writes a `requires-python` lower bound (e.g. `>=3.12`) into `pyproject.toml` based on the system Python at creation time — so it's never fully "unpinned."
- To pin an **exact** version explicitly:
  ```bash
  uv python pin 3.12
  ```
  This writes `.python-version`. All `uv` commands then use this version, auto-downloading it if missing.
- Useful commands:
  ```bash
  uv python list              # installed + available versions
  uv python install 3.12      # install a version
  uv python find               # see which interpreter uv would pick right now
  uv venv --python 3.12        # one-off version, no pin
  ```
- **Without a pin**, `uv` resolves at run time: PATH Python → previously installed uv Python → latest matching `requires-python`. This can drift across machines/time — pinning makes builds reproducible.

## 4. Managing Dependencies

```bash
uv add requests
uv add --dev pytest ruff
```
Updates `pyproject.toml` + `uv.lock`, installs into `.venv` automatically.

## 5. `__main__.py` vs `main.py`

| File | Used in | How it's triggered |
|---|---|---|
| `__main__.py` | `src` / package layout | `python -m myproject` (Python's built-in mechanism — exact filename required) |
| `main.py` | flat / `--app` layout | `python main.py` (just a conventionally-named script, name is arbitrary) |

**Key idea:** `__main__.py` is purely the **entry point / orchestrator** — it should not contain real business logic. It just imports and calls functions from other modules.

## 6. Module & Package Structure

Terminology:
- **Module** = a single `.py` file
- **Package** = a folder (with `__init__.py`, though technically optional since Python 3.3 via namespace packages — keep it anyway, it's the convention `uv`/tooling expects)
- **Subpackage** = a package nested inside another package

Example with growth:
```
src/myproject/
├── __init__.py          # usually empty, unless re-exporting
├── __main__.py          # entry point only — orchestrates, no logic
├── calculator.py        # module
├── validators.py        # module
├── storage.py           # module
├── routers/             # package (subpackage)
│   ├── __init__.py
│   ├── items.py         # module
│   └── users.py
└── models/               # package
    ├── __init__.py
    └── item.py
```

Import path mirrors folder path:
```python
from myproject.routers.items import get_item
from myproject.calculator import add, subtract
```

## 7. `__init__.py` — Is It Needed?

- Still recommended even though not strictly required (namespace packages exist since Python 3.3).
- Content is optional: leave it **empty** until you actually need `from myproject import something` to work directly.
- Example re-export (only add when needed):
  ```python
  # src/myproject/__init__.py
  from myproject.__main__ import main
  __all__ = ["main"]
  ```

## 8. End-to-End Example (simple logic, no framework)

```python
# src/myproject/calculator.py
def add(a, b):
    return a + b
```

```python
# src/myproject/validators.py
def validate_number(value):
    try:
        return int(value)
    except ValueError:
        raise ValueError(f"'{value}' is not a valid number")
```

```python
# src/myproject/storage.py
def save_result(result):
    with open("history.txt", "a") as f:
        f.write(f"{result}\n")
```

```python
# src/myproject/__main__.py
from myproject.validators import validate_number
from myproject.calculator import add
from myproject.storage import save_result

def main():
    x = validate_number(input("First number: "))
    y = validate_number(input("Second number: "))
    result = add(x, y)
    print(f"{x} + {y} = {result}")
    save_result(result)

if __name__ == "__main__":
    main()
```

Run:
```bash
uv run python -m myproject
```

**Core principle:** only `__main__.py` ever "runs." Every other module just sits there as importable functions until called — same pattern that scales to bigger apps like FastAPI (`app.py` holds the app, `routers/`, `models/` hold logic, `__main__.py` just boots things).

## Project setup
```bash
uv init --package llama
uv python pin 3.12
uv add openai
```

## Final structure
```
llama/
├── pyproject.toml
├── .python-version
└── src/
    └── llama/
        ├── __init__.py   # from llama.ai import main
        ├── ai.py         # main() — orchestrates everything
        ├── chat.py       # OpenAI/Ollama client + ask()
        ├── memory.py     # conversation history
        └── prompts.py    # system prompt templates
```

## Key facts

- **Module** = any `.py` file. **Package** = folder with `__init__.py`.
- **`__main__.py`** — only needed for `python -m llama`. Not needed for `uv run llama` or `from llama import main`. Safe to **omit**.
- **`__init__.py`** — needed to expose `main` for:
  - `[project.scripts]` → `llama = "llama:main"` (powers `uv run llama`)
  - `from llama import main`
- **`__all__`** — only affects `from llama import *` (wildcard). Does NOT hide/restrict direct imports like `from llama import ask`. To keep something internal, simply don't import it into `__init__.py` at all.
- **Internal modules** (`chat.py`, `memory.py`, `prompts.py`) — imported directly by `ai.py` using absolute imports (`from llama.chat import ask`). Never re-exported in `__init__.py` unless deliberately meant to be public.

## Real-world convention
`__init__.py` stays minimal — only the entry point needed for the CLI:
```python
# src/llama/__init__.py
from llama.ai import main

__all__ = ["main"]
```
Libraries (PyPI packages) curate a bigger public API this way; internal apps/CLIs (like `llama`) typically expose just the entry point.

## src/ layout — why
Prevents accidentally importing an uninstalled package during testing/dev. Forces imports to go through the properly installed package, catching packaging bugs early. One project, one package inside `src/` — not for holding multiple projects.
