## Virtual Environment (venv)

* **What it is:**
  A self-contained Python environment inside your project. Think of it as a **local workspace** for Python and its packages.

* **Why you need it:**

  * Keeps project dependencies **isolated** (no conflicts with other projects).
  * Lets you install packages **per project**, like `requests` here.

* **System Python vs Virtual Environment**

   * **System Python**: The Python installed globally on your computer. Packages installed here are available everywhere, but it can get messy if you install conflicting packages.
   * **Virtual environment (venv)**: A self-contained Python environment inside your project folder (usually something like `./venv`). It has its **own interpreter** and **its own installed packages**, separate from the system Python.

* **VSCode and the interpreter**

   * When you open a project, VSCode chooses a Python interpreter to run your code.
   * If you create a venv, the interpreter in that venv is usually something like:

     ```
     project_folder\venv\Scripts\python.exe
     ```
   * If VSCode uses that interpreter, it will only see packages installed in that venv.
   * To switch to the current interpreter push F1 in ```Vs-Code -> Python: Select Interpreter``` 

* Created with:

```bash
python -m venv venv
```

* Activate (Windows):

```bash
venv\Scripts\activate
```

* Activate (Mac/Linux):

```bash
source venv/bin/activate
```

* Install dependencies:

```bash
pip install -r requirements.txt
```

* Keeps dependencies **isolated per project**, like `node_modules` in JS.

---

## Project Overview

This project demonstrates a **basic Python package (`app`)** with multiple modules, along with usage of a **3rd-party library (`requests`)** for HTTP requests. It illustrates how to:

* Organize Python files into packages
* Expose functions through `__init__.py`
* Import and use both internal and external modules
* Work within a virtual environment (`venv`)

---

## Project Structure

```
PYTHON_PROJECT/
│
├─ app/                 # Custom package
│  ├─ __init__.py       # Marks folder as package, exposes public API
│  └─ utils.py          # Internal module with helper functions
│
├─ venv/                # Python virtual environment (isolated dependencies)
│
├─ main.py              # Entry point, uses app package and requests library
└─ requirements.txt     # Project dependencies
```

---

## app Package

### `__init__.py`

* Marks `app/` as a package.
* Exposes selected functions for top-level import.

```python
from .utils import print_hi
__all__ = ["print_hi"]
```

* Now users can do:

```python
import app
app.print_hi("Reza")
```

### `utils.py`

Contains reusable functions:

```python
def print_hi(name: str):
    print(f"Hi, {name}!")
```

---

## `main.py`

Entry point of the project. Demonstrates:

1. Using a **3rd-party package (`requests`)**.
2. Using your **custom package (`app`)**.

```python
import requests
import app

# 3rd-party package usage
response = requests.get("https://api.github.com")
print(response.json())

# Custom package usage
app.print_hi("Nikfal")
```

## Dependencies

`requirements.txt` example:

```
requests==2.32.5
```

* Installed via:

```bash
pip install -r requirements.txt
```

* Freeze current environment:

```bash
pip freeze > requirements.txt
```

---

## Key Python Concepts Demonstrated

1. **Packages and Modules**

   * Folder + `__init__.py` → package
   * Single `.py` file → module
   * Absolute imports recommended: `from app.utils import ...`

2. **Exposing Functions**

   * Use `__init__.py` to control top-level API
   * `__all__` can restrict `from app import *`

3. **3rd-party Libraries**

   * Installed via `pip` from PyPI
   * Example: `requests` for HTTP requests

4. **Running the Project**

   * From project root:

```bash
python main.py
```
