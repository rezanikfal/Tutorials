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

### `main.py`

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
## Python Generator

A **generator** is a function or expression that returns values **one at a time** using `yield`, instead of creating all values at once.

**Why use it?**

* Saves memory
* Efficient for large or continuous data

**Example:**

```python
def count_up(n):
    for i in range(n):
        yield i

for x in count_up(3):
    print(x)
```

Output:

```
0
1
2
```

**Key idea:**
Each `yield` pauses the function and resumes on the next request.

**One-line takeaway:**

> Generators produce values lazily, only when needed.
## Python Decorator

A **decorator** is a function that **adds extra behavior** to another function **without changing its code**.

**Why use it?**

* Reuse logic (logging, timing, auth, etc.)
* Keep code clean and readable

**Example:**

```python
def my_decorator(func):
    def wrapper():
        print("Before function")
        func()
        print("After function")
    return wrapper

@my_decorator
def say_hello():
    print("Hello")

say_hello()
```

Output:

```
Before function
Hello
After function
```

**Key idea:**
The decorator wraps the original function and runs code **before and/or after** it.

**One-line takeaway:**

> Decorators modify function behavior without modifying the function itself.
## Collections module

### Counter

`Counter` is a **subclass of `dict`** designed for **counting hashable objects**.
Each unique element becomes a key, and its frequency becomes the value.

**Common uses:**

* Counting items in a list
* Counting characters in a string
* Counting words in text

**Example:**

```python
from collections import Counter

c = Counter([1, 1, 2, 3])
# Counter({1: 2, 2: 1, 3: 1})
```

### Useful `Counter` Methods & Patterns

* `most_common(n)` → get the `n` most frequent elements
* `sum(c.values())` → total number of counted items
* `list(c)` / `set(c)` → unique elements
* `dict(c)` → convert to a regular dictionary
* `c.items()` → `(element, count)` pairs
* `c.clear()` → reset all counts
* `c += Counter()` → remove zero or negative counts
  
## list of the other key collections types:

* `defaultdict` – dictionary with default values for missing keys
* `deque` – double-ended queue for fast appends/pops at both ends
* `namedtuple` – lightweight, immutable objects with named fields
* `ChainMap` – combines multiple dictionaries into a single view
* `OrderedDict` – dictionary that remembers insertion order
* `UserDict` – wrapper for creating custom dictionary-like objects
* `UserList` – wrapper for creating custom list-like objects
* `UserString` – wrapper for creating custom string-like objects
I've reviewed the linked notebook. It's a tutorial on Python's `datetime` module, a standard library for handling dates, times, and intervals. Here is a clear and useful summary for your documentation.

## datetime Module
The Python `datetime` module provides classes (`date`, `time`, `datetime`, `timedelta`, `tzinfo`) for manipulating dates and times with simplicity and precision. It's essential for tasks like parsing strings, performing arithmetic with dates, and formatting output.

### Key Classes & Functions with Examples
The notebook explains the module's main components through practical examples. This table summarizes the core objects and their common uses:

| Class/Object | Primary Purpose | Simple Example |
| :--- | :--- | :--- |
| **`datetime.datetime`** | Combine date and time information. | `datetime.now()` # Current local datetime |
| **`datetime.date`** | Work with dates (year, month, day). | `date.today()` # Get today's date |
| **`datetime.time`** | Work with time independent of date. | `time(12, 30, 0)` # Represents 12:30 PM |
| **`datetime.timedelta`** | Represent a duration or difference. | `timedelta(days=5)` # A span of 5 days |
| **`strftime()` & `strptime()`** | **Format** datetime as string / **Parse** string into datetime. | See section below. |

### Common Operations & Patterns
Here are the key patterns and operations demonstrated, which are useful for real-world applications:

*   **Getting Current Date and Time**: Use `datetime.now()` for the full timestamp or `date.today()` for just the date.
*   **Creating Specific Dates/Times**: Instantiate objects directly.
    ```python
    from datetime import datetime
    my_birthday = datetime(year=1990, month=12, day=25, hour=14, minute=30)
    ```
*   **Performing Date Arithmetic**: Use `timedelta` for calculations.
    ```python
    from datetime import timedelta
    today = date.today()
    one_week_later = today + timedelta(weeks=1)
    five_days_ago = today - timedelta(days=5)
    ```
*   **Formatting (`strftime`) and Parsing (`strptime`)**: This is crucial for input/output.
    ```python
    # Format a datetime object into a readable string
    now = datetime.now()
    formatted_string = now.strftime("%B %d, %Y at %I:%M %p") # e.g., "January 07, 2026 at 11:45 AM"

    # Parse a string into a datetime object
    date_string = "2024-07-04"
    parsed_date = datetime.strptime(date_string, "%Y-%m-%d")
    ```

### Documentation Tips
When documenting code that uses `datetime`, consider noting:
1.  **Time Zone Awareness**: The basic `datetime` objects are "naive" (no timezone). For timezone-aware operations, use the `pytz` library or Python 3.9+'s `zoneinfo`.
2.  **Format Codes**: Keep a reference for `strftime` directives (e.g., `%Y`=4-digit year, `%m`=month, `%d`=day, `%H`=24-hour).
3.  **Use Case**: Briefly state the purpose, like "calculates user's subscription end date" or "logs event timestamps in ISO format."

I hope this structured summary with examples is helpful for your documentation. Would you like a similar breakdown of another Python module?
