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

* Created with (Python Virtual Environment):

```bash
python -m venv venv
```

* Activate (Windows):

```bash
venv\Scripts\activate
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
# Python Collections

## Core Collections Overview
The three core mutable, ordered (except `set`) collections for storing data in Python.

| Collection | Mutable? | Ordered? | Unique? | Key Use Case |
|------------|----------|----------|---------|--------------|
| **List** `[]` | ✅ Yes | ✅ Yes | ❌ No | Ordered sequences, preserving insertion order |
| **Dictionary** `{}` | ✅ Yes | ✅ (Python 3.7+) | Keys: ✅, Values: ❌ | Key-value lookups, fast access by key |
| **Set** `{}` | ✅ Yes | ❌ No | ✅ Yes | Membership testing, removing duplicates |

---

## LISTS (`list`): Ordered Sequences

### Core Operations & Methods

| Method/Operation | Syntax Example | Returns | Time Complexity |
|------------------|----------------|---------|-----------------|
| **Create** | `list1 = [1, 2, 3]`<br>`list2 = list("abc")` | New list | O(n) |
| **Access** | `list1[0]`<br>`list1[-1]` (last) | Element | O(1) |
| **Slice** | `list1[1:3]`<br>`list1[::2]` (every 2nd) | New list | O(k) |
| **Append** | `list1.append(4)` | `None` | O(1) |
| **Extend** | `list1.extend([5, 6])` | `None` | O(k) |
| **Insert** | `list1.insert(1, "x")` | `None` | O(n) |
| **Remove** | `list1.remove(2)` (value) | `None` | O(n) |
| **Pop** | `list1.pop()` (last)<br>`list1.pop(1)` (index) | Element | O(1)/O(n) |
| **Index** | `list1.index(3)` | First index | O(n) |
| **Count** | `list1.count(2)` | Count | O(n) |
| **Sort** | `list1.sort()` (in-place)<br>`sorted(list1)` (new) | `None`/New list | O(n log n) |
| **Reverse** | `list1.reverse()` (in-place) | `None` | O(n) |
| **Length** | `len(list1)` | Integer | O(1) |
| **Membership** | `3 in list1` | Boolean | O(n) |
| **Copy** | `list2 = list1.copy()`<br>`list2 = list1[:]` | Shallow copy | O(n) |

### Key Patterns
```python
# List Comprehension (powerful creation/filtering)
squares = [x**2 for x in range(10)]  # [0, 1, 4, ..., 81]
evens = [x for x in range(10) if x % 2 == 0]  # [0, 2, 4, 6, 8]

# Iteration with index
for i, value in enumerate(my_list):
    print(f"Index {i}: {value}")

# Zipping multiple lists
names = ["Alice", "Bob"]
scores = [85, 92]
for name, score in zip(names, scores):
    print(f"{name}: {score}")
```

---

## DICTIONARIES (`dict`): Key-Value Maps

### Core Operations & Methods

| Method/Operation | Syntax Example | Returns | Time Complexity |
|------------------|----------------|---------|-----------------|
| **Create** | `dict1 = {"a": 1, "b": 2}`<br>`dict2 = dict(a=1, b=2)` | New dict | O(n) |
| **Access** | `dict1["a"]` | Value | O(1) |
| **Get (safe)** | `dict1.get("c", "default")` | Value/default | O(1) |
| **Set/Update** | `dict1["c"] = 3`<br>`dict1.update({"d": 4})` | `None` | O(1) |
| **Keys** | `dict1.keys()` | View of keys | O(1) |
| **Values** | `dict1.values()` | View of values | O(1) |
| **Items** | `dict1.items()` | View of (k, v) pairs | O(1) |
| **Pop** | `dict1.pop("a")` | Removed value | O(1) |
| **Pop Item** | `dict1.popitem()` (last) | (key, value) | O(1) |
| **Check Key** | `"a" in dict1` | Boolean | O(1) |
| **Clear** | `dict1.clear()` | `None` | O(1) |
| **Copy** | `dict2 = dict1.copy()` | Shallow copy | O(n) |
| **Length** | `len(dict1)` | Integer | O(1) |

### Key Patterns
```python
# Dictionary Comprehension
square_dict = {x: x**2 for x in range(5)}  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# Safe key access with default
value = my_dict.get("missing_key", "default_value")

# Looping through items
for key, value in my_dict.items():
    print(f"{key}: {value}")

# Merging dictionaries (Python 3.9+)
dict1 = {"a": 1}
dict2 = {"b": 2}
merged = dict1 | dict2  # {'a': 1, 'b': 2}

# Default dictionary (from collections)
from collections import defaultdict
count_dict = defaultdict(int)  # Missing keys return 0
count_dict["a"] += 1  # No KeyError
```

---

## SETS (`set`): Unique Collections

### Core Operations & Methods

| Method/Operation | Syntax Example | Returns | Time Complexity |
|------------------|----------------|---------|-----------------|
| **Create** | `set1 = {1, 2, 3}`<br>`set2 = set([1, 2, 2, 3])` | New set | O(n) |
| **Add** | `set1.add(4)` | `None` | O(1) |
| **Remove** | `set1.remove(2)` (error if missing) | `None` | O(1) |
| **Discard** | `set1.discard(5)` (no error) | `None` | O(1) |
| **Pop** | `set1.pop()` (arbitrary) | Element | O(1) |
| **Union** | `set1 | set2`<br>`set1.union(set2)` | New set | O(len(s1)+len(s2)) |
| **Intersection** | `set1 & set2`<br>`set1.intersection(set2)` | New set | O(min(len(s1), len(s2))) |
| **Difference** | `set1 - set2`<br>`set1.difference(set2)` | New set | O(len(s1)) |
| **Symmetric Diff** | `set1 ^ set2`<br>`set1.symmetric_difference(set2)` | New set | O(len(s1)+len(s2)) |
| **Subset** | `set1 <= set2`<br>`set1.issubset(set2)` | Boolean | O(len(s1)) |
| **Superset** | `set1 >= set2`<br>`set1.issuperset(set2)` | Boolean | O(len(s2)) |
| **Membership** | `3 in set1` | Boolean | O(1) |
| **Length** | `len(set1)` | Integer | O(1) |
| **Clear** | `set1.clear()` | `None` | O(1) |
| **Copy** | `set2 = set1.copy()` | Shallow copy | O(n) |

### Key Patterns
```python
# Set Comprehension
unique_squares = {x**2 for x in [1, -1, 2, -2, 3]}  # {1, 4, 9}

# Removing duplicates from a list
unique_list = list(set(duplicate_list))  # Order not preserved!

# Common set operations
A = {1, 2, 3}
B = {3, 4, 5}
print(A | B)  # Union: {1, 2, 3, 4, 5}
print(A & B)  # Intersection: {3}
print(A - B)  # Difference (in A not B): {1, 2}
print(A ^ B)  # Symmetric diff (in one but not both): {1, 2, 4, 5}

# Frozen sets (immutable)
immutable_set = frozenset([1, 2, 3])
```

## Quick Decision Guide

### When to use each:

- **Use a LIST when:**
  - You need ordered elements
  - You need to access elements by position/index
  - You have duplicate values
  - Example: Shopping cart items, log entries, sorted data

- **Use a DICTIONARY when:**
  - You need to associate keys with values
  - You need fast lookups by a unique identifier
  - You're counting or grouping items
  - Example: User profiles (id → data), word frequency counts

- **Use a SET when:**
  - You need to ensure uniqueness
  - You need fast membership testing
  - You're doing mathematical set operations
  - Example: Tags, unique visitors, removing duplicates
  - 
# `with` Statement
## Core Purpose
Use `with` to **automatically manage resources** that need **cleanup** (closing, releasing, committing). It ensures cleanup happens even if errors occur.

## When to Use It (Practical Scenarios)

| Resource Type | Why Use `with` | Example |
|--------------|----------------|---------|
| **Files** | Auto-closes file (even on errors) | `with open('file.txt') as f: data = f.read()` |
| **Database Connections** | Auto-closes connection & handles transactions | `with sqlite3.connect('db.db') as conn: ...` |
| **Locks (Threading)** | Auto-releases lock to prevent deadlocks | `with threading.Lock(): # critical code` |
| **Network Connections** | Auto-closes sockets/connections | `with socket.socket() as s: s.connect(...)` |
| **Temporary Files/Dirs** | Auto-deletes temp resources | `with tempfile.TemporaryFile() as tmp: ...` |

## Key Benefits
1. **No more forgetting to close resources**
2. **Cleaner, shorter code** (removes `try-finally` blocks)
3. **Exception-safe** (cleanup happens even during crashes)

### File Operations (Most Common)
```python
# READING files
with open('data.txt', 'r') as file:
    content = file.read()
    # Process content here
# File auto-closed here

# WRITING files
with open('output.txt', 'w') as file:
    file.write('Hello World')
    # No need to call file.close()

# MULTIPLE files at once
with open('input.txt', 'r') as src, open('copy.txt', 'w') as dst:
    dst.write(src.read())
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

For reading, writing, and creating files in Python, the core tool is the built-in `open()` function, along with the methods of **file objects** it returns. This is not a module you import, but a fundamental Python operation.

## Reading, Writing & Creating Files
The built-in `open()` function is used to create, read from, and write to files on your computer. It returns a **file object** which provides methods to interact with the file's content. The key to all operations is the **mode** in which you open the file (e.g., read `'r'`, write `'w'`, append `'a'`).

### Key Modes & File Object Methods
This table summarizes the primary modes for the `open()` function and the most common methods used on the resulting file object.

| Operation | File Mode | Primary Purpose | Key Methods & Notes |
| :--- | :--- | :--- | :--- |
| **Reading** | `'r'` | **Read** text from an existing file (default mode). | `.read()`, `.readline()`, `.readlines()`, **Iteration** |
| **Writing** | `'w'` | **Write** text to a file. **Creates** the file if it doesn't exist. **Overwrites** the file if it exists. | `.write()`, `.writelines()` |
| **Appending** | `'a'` | **Append** text to the end of a file. **Creates** the file if it doesn't exist. | `.write()`, `.writelines()` |
| **Binary Mode** | `'rb'`, `'wb'`, `'ab'` | Work with non-text files (images, videos, etc.). | Use with `'b'` (e.g., `'wb'` for writing binary). |

### Common Patterns & Examples
Here are the most essential patterns for working with files, demonstrating how the modes and methods from the table are used.

*   **Reading an Entire File**: Use the `'r'` mode.
    ```python
    with open('notes.txt', 'r') as file:
        content = file.read()  # Reads the entire file as a single string
        # OR: lines = file.readlines()  # Reads all lines into a list
    print(content)
    ```

*   **Reading Line by Line**: Efficient for large files. The `with` statement ensures the file is properly closed.
    ```python
    with open('data.log', 'r') as file:
        for line in file:  # Iterates over each line
            print(f"Line: {line.strip()}")  # .strip() removes trailing newline
    ```

*   **Writing/Creating a File**: Use the `'w'` mode. **Caution: This will erase an existing file with the same name.**
    ```python
    with open('report.txt', 'w') as file:
        file.write("Final Report\n")
        file.write("============\n")
        file.writelines(["Line 1\n", "Line 2\n"])  # Writes a list of strings
    ```

*   **Appending to a File**: Use the `'a'` mode to add to the end.
    ```python
    with open('log.txt', 'a') as file:
        file.write("New log entry at 10:00 AM\n")
    ```

*   **Creating/Checking with `os.path`**: Often used alongside file operations to check for a file's existence.
    ```python
    import os.path
    filename = 'config.json'
    if not os.path.exists(filename):
        # Create the file with initial content if it doesn't exist
        with open(filename, 'w') as file:
            file.write('{}')  # Write an empty JSON object
        print(f"Created {filename}")
    else:
        print(f"{filename} already exists.")
    ```

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

### Tips
1.  **Time Zone Awareness**: The basic `datetime` objects are "naive" (no timezone). For timezone-aware operations, use the `pytz` library or Python 3.9+'s `zoneinfo`.
2.  **Format Codes**: Keep a reference for `strftime` directives (e.g., `%Y`=4-digit year, `%m`=month, `%d`=day, `%H`=24-hour).
3.  **Use Case**: Briefly state the purpose, like "calculates user's subscription end date" or "logs event timestamps in ISO format."

Certainly. Here is the updated summary focusing on the key tools and common meta-characters.

## Python `re` Module (regular expressions)
The Python `re` module provides support for **regular expressions**, which are powerful sequences of characters that define **search patterns**. They are essential for complex string searching, validation, and manipulation tasks that are difficult or impossible with basic string methods.

### 🔧 Key Functions & Patterns with Examples
The module revolves around a few core functions. This table summarizes the main tools:

| Function | Primary Purpose | Simple Example |
| :--- | :--- | :--- |
| **`re.search()`** | Scan a string for the **first** location where the pattern matches. | `re.search(r'\d+', "Order 123")` |
| **`re.findall()`** | Find **all** non-overlapping matches, returning a list of strings. | `re.findall(r'\d+', "1a22b333")` → `['1', '22', '333']` |
| **`re.sub()`** | **Replace** all matches with a specified string. | `re.sub(r'\s+', '-', "hello world")` → `"hello-world"` |
| **`re.compile()`** | **Compile** a pattern for repeated use, improving efficiency. | `pattern = re.compile(r'\d{3}')` |
| **`re.split()`** | **Split** a string by the pattern matches. | `re.split(r'\s+', "split on spaces")` → `['split', 'on', 'spaces']` |

### Common Meta-Characters & Symbols
To build the patterns used by the functions above, you use special meta-characters. This table lists the most common ones:

| Meta-Character | Purpose | Example Pattern | Example Match |
| :--- | :--- | :--- | :--- |
| **`.`** | Matches any single character (except newline). | `r"b.t"` | "bat", "bit", "but" |
| **`\d`** | Matches any digit (0-9). | `r"\d\d"` | "42", "07" |
| **`\w`** | Matches any alphanumeric character or underscore. | `r"\w+"` | "hello", "user_1" |
| **`\s`** | Matches any whitespace character. | `r"hello\sworld"` | "hello world" |
| **`[]`** | Matches any **one** character inside the brackets. | `r"[aeiou]"` | Any vowel: "a", "e" |
| **`[^]`** | Matches any **one** character **NOT** inside the brackets. | `r"[^0-9]"` | Any non-digit: "a", "-" |
| **`*`** | Matches 0 or more repetitions of the preceding element. | `r"co*l"` | "cl", "col", "cool" |
| **`+`** | Matches 1 or more repetitions of the preceding element. | `r"co+l"` | "col", "cool" |
| **`?`** | Matches 0 or 1 repetitions of the preceding element. | `r"colou?r"` | "color", "colour" |
| **`{}`** | Matches an explicit number of repetitions. | `r"\d{3}"` | Exactly 3 digits: "123" |
| **`^`** | Matches the start of a string. | `r"^Hello"` | "Hello" at the start. |
| **`$`** | Matches the end of a string. | `r"end$"` | "end" at the end. |
| **`\|`** | Acts as an OR operator. | `r"cat\|dog"` | "cat" or "dog" |
| **`()`** | Groups patterns and captures the matched text. | `r"(\d{3})-(\d{3})"` | Captures area code and number separately. |
I will provide a summary for Python's **`math`** and **`random`** modules, following the same concise table format you prefer.

## Python `math` Module
The Python `math` module provides access to mathematical functions defined by the C standard. It is essential for advanced **mathematical operations**, **constants**, and **trigonometric calculations**.

### Key Functions & Constants (`math` Module)
This table summarizes the most commonly used functions and constants from the `math` module.

| Category | Function/Constant | Primary Purpose | Simple Example |
| :--- | :--- | :--- | :--- |
| **Numeric Operations** | `math.ceil(x)` | Return the **ceiling** of *x* (smallest integer ≥ *x*). | `math.ceil(4.2)` → `5` |
| | `math.floor(x)` | Return the **floor** of *x* (largest integer ≤ *x*). | `math.floor(4.9)` → `4` |
| | `math.pow(x, y)` | Return *x* raised to the power *y* (`x**y`). | `math.pow(2, 3)` → `8.0` |
| | `math.sqrt(x)` | Return the **square root** of *x*. | `math.sqrt(9)` → `3.0` |
| | `math.fabs(x)` | Return the **absolute value** of *x* as a float. | `math.fabs(-7.5)` → `7.5` |
| **Logarithms & Constants** | `math.log(x[, base])` | Return the **logarithm** of *x* to the given `base` (natural log by default). | `math.log(10)` ≈ `2.302` |
| | `math.pi` | The mathematical constant **π** (≈ 3.14159). | `math.pi * (r**2)` |
| | `math.e` | The mathematical constant **e** (≈ 2.71828). | `math.e ** x` |
| **Trigonometry (radians)** | `math.sin(x)` | Return the **sine** of *x* radians. | `math.sin(math.pi/2)` → `1.0` |
| | `math.cos(x)` | Return the **cosine** of *x* radians. | `math.cos(math.pi)` → `-1.0` |
| | `math.degrees(x)` | Convert angle *x* from **radians to degrees**. | `math.degrees(math.pi)` → `180.0` |
| | `math.radians(x)` | Convert angle *x* from **degrees to radians**. | `math.radians(180)` → `π` |

## Python `random` Module
The Python `random` module implements pseudo-random number generators for various distributions. It is used for **simulations**, **games**, **random sampling**, and **shuffling**.

### Key Functions (`random` Module)
This table summarizes the most commonly used functions from the `random` module.

| Category | Function | Primary Purpose | Simple Example |
| :--- | :--- | :--- | :--- |
| **Basic Random Values** | `random.random()` | Return a random **float** between `0.0` and `1.0`. | `0.6572...` |
| | `random.uniform(a, b)` | Return a random **float** between *a* and *b* (inclusive). | `random.uniform(5, 10)` → `7.384...` |
| | `random.randint(a, b)` | Return a random **integer** between *a* and *b* (inclusive). | `random.randint(1, 6)` → `4` |
| **Sequences & Choices** | `random.choice(seq)` | Return a random **element** from a non-empty sequence. | `random.choice(['a','b','c'])` → `'b'` |
| | `random.choices(pop, k)` | Return a **list** of *k* random elements with replacement. | `random.choices([1,2], k=3)` → `[1, 1, 2]` |
| | `random.sample(pop, k)` | Return a **list** of *k* **unique** elements without replacement. | `random.sample(range(10), 3)` → `[7, 2, 4]` |
| | `random.shuffle(seq)` | **Shuffle** a mutable sequence *in place*. | `shuffle(my_list)` |
| **Distributions** | `random.gauss(mu, sigma)` | Return a random float from a **Gaussian (normal) distribution**. | `random.gauss(0, 1)` |
Here is the requested summary for the Python `os` module in the same structured table format.

## Python `os` Module
The Python `os` module provides a portable way to use operating system-dependent functionality. It allows scripts to interact with the file system, environment, and system processes, essential for tasks like file management and system operations.

### Key Functions (`os` Module)
This table summarizes the most commonly used functions from the `os` module, grouped by their primary purpose.

| Category | Function / Submodule | Primary Purpose | Simple Example |
| :--- | :--- | :--- | :--- |
| **Path Manipulation** | **`os.path`** | **Submodule** for common pathname manipulations. | `os.path.join('dir', 'file.txt')` |
| | `os.path.join(a, b, ...)` | Join path components intelligently for the OS. | `os.path.join('home', 'docs')` → `'home/docs'` |
| | `os.path.exists(path)` | Check if a **path exists**. | `os.path.exists('myfile.txt')` → `True` |
| | `os.path.getsize(path)` | Get the **size of a file** in bytes. | `os.path.getsize('data.log')` → `1024` |
| **Directory Operations** | `os.getcwd()` | Get the **current working directory** path. | `os.getcwd()` → `'/home/user'` |
| | `os.chdir(path)` | **Change** the current working directory. | `os.chdir('../new_dir')` |
| | `os.listdir(path='.')` | **List** all files and directories in `path`. | `os.listdir('.')` → `['a.txt', 'folder']` |
| | `os.mkdir(path)` | **Create a new directory**. | `os.mkdir('new_folder')` |
| | `os.rmdir(path)` | **Remove an empty directory**. | `os.rmdir('old_folder')` |
| **File Operations** | `os.rename(src, dst)` | **Rename (move)** a file or directory. | `os.rename('old.txt', 'new.txt')` |
| | `os.remove(path)` | **Delete a file**. | `os.remove('temp.txt')` |
| **System & Environment** | `os.environ` | A **dictionary** of the user's environment variables. | `os.environ.get('HOME')` |
| | `os.system(command)` | **Execute a shell command** string. | `os.system('ls -la')` |

This format provides a concise, at-a-glance reference for the essential tools in the `os` module. If you'd like a similar table for the `os.path` submodule specifically or examples combining these functions, feel free to ask.
Here is a structured overview of web scraping in Python, covering the key libraries, the general process, and important considerations.

## Web Scraping in Python
Web scraping is the **automated process of extracting data from websites**. In Python, it primarily involves using libraries to fetch web pages (like making a browser request) and then parse the HTML/XML content to locate and extract the specific data you need.

### The Essential Toolkit
Modern Python web scraping typically relies on these core libraries. This table summarizes their primary roles.

| Library | Primary Purpose & Role | Key Analogy |
| :--- | :--- | :--- |
| **`requests`** | **Fetches** raw HTML content from a URL. It's the part that "goes to the website and gets the page." | The **browser** that requests the page. |
| **`BeautifulSoup` (from `bs4`)** | **Parses** and navigates the messy HTML structure. It lets you search for and extract data by tags, classes, IDs, etc. | The **eye and brain** that reads the page and finds the relevant information. |
| **`lxml`** | A powerful alternative parser for `BeautifulSoup`, known for being very **fast**. | A specialized, high-speed **reading assistant**. |
| **`Selenium`** | **Automates a real web browser**. Essential for scraping **JavaScript-heavy** sites where content is loaded dynamically. | A **robot controlling a browser**, clicking buttons and waiting for pages to load. |

### The Standard Scraping Workflow
A typical scraping project follows these logical steps:

1.  **Inspect the Target**: Use your browser's **Developer Tools** (F12) to examine the page's HTML structure and find the patterns (tags, CSS classes) that hold your target data.
2.  **Fetch the Page**: Use `requests.get(url)` to download the HTML.
3.  **Parse the HTML**: Load the HTML into `BeautifulSoup` to create a searchable "soup" object.
4.  **Locate & Extract Data**: Use `soup` methods like `.find()`, `.find_all()`, and CSS selectors (`.select()`) to get the specific elements.
5.  **Clean & Store Data**: Process the extracted text (e.g., strip whitespace, convert numbers) and save it to a file (CSV, JSON) or database.

### A Concrete Code Example
Here is a minimal, complete example scraping book titles and prices from a hypothetical book list:

```python
import requests
from bs4 import BeautifulSoup

# 1. FETCH
url = "https://books.toscrape.com/"
response = requests.get(url)
html = response.content

# 2. PARSE
soup = BeautifulSoup(html, 'html.parser') # 'lxml' is often faster if installed

# 3. LOCATE & EXTRACT (Using browser inspection)
books = []
for book in soup.find_all('article', class_='product_pod'): # Find each book container
    title = book.h3.a['title'] # Navigate the tag structure
    price = book.find('p', class_='price_color').text
    books.append({'title': title, 'price': price})
    print(f"Title: {title}, Price: {price}")

# 4. STORE (using the CSV module)
import csv
with open('books.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=['title', 'price'])
    writer.writeheader()
    writer.writerows(books)
```
## Core Summary: Pillow (PIL) for Image Processing
Pillow (a friendly fork of the Python Imaging Library, PIL) is the standard Python library for **opening, manipulating, and saving many different image file formats**. It provides essential tools for basic image editing, filtering, drawing, and format conversion.

### The Pillow Toolkit: Core Modules & Concepts
Pillow's functionality is organized around a few key objects. This table summarizes the essential components for getting started.

| Component | Primary Purpose & Role | Key Analogy |
| :--- | :--- | :--- |
| **`Image` Module & Object** | The **core module**. The `Image` object represents an image and provides 90% of the methods you'll use (open, save, resize, filter, etc.). | The **main workshop** and the **canvas** you're working on. |
| **`ImageDraw` Module** | Provides 2D graphics support for creating simple shapes, text, and other graphics on top of images. | The set of **drawing tools** (pens, brushes, text). |
| **`ImageFilter` Module** | Contains a set of predefined **filter kernels** (BLUR, CONTOUR, DETAIL, etc.) for applying effects. | A box of **photo filters** or **Instagram-like effects**. |
| **`ImageFont` Module** | Used to load TrueType or OpenType font files, necessary for rendering text with `ImageDraw`. | The **font book** for your text tool. |

### The Standard Image Workflow
Most image processing tasks follow a predictable pattern with Pillow:

1.  **Open an Image**: Create an `Image` object from a file.
2.  **Examine Properties**: Check the image's size, format, and mode.
3.  **Process/Manipulate**: Perform operations like cropping, resizing, filtering, or drawing.
4.  **Save or Display**: Save the result to a new file or show it on screen.

### A Concrete Code Example
Here is a minimal, complete example that demonstrates several common operations:

```python
from PIL import Image, ImageFilter, ImageDraw, ImageFont

# 1. OPEN
image = Image.open('input_photo.jpg')

# 2. EXAMINE
print(f"Size: {image.size}")  # (width, height)
print(f"Format: {image.format}")
print(f"Mode: {image.mode}")  # e.g., 'RGB', 'L' (grayscale)

# 3. PROCESS
# --- Basic Operations ---
image = image.rotate(90)             # Rotate 90 degrees
image = image.resize((800, 600))     # Resize to new dimensions
cropped_image = image.crop((100, 100, 500, 400)) # (left, upper, right, lower)

# --- Apply a Filter ---
blurred_image = image.filter(ImageFilter.GaussianBlur(radius=2))

# --- Draw on the Image ---
draw = ImageDraw.Draw(image)
# Draw a red rectangle outline
draw.rectangle([50, 50, 200, 200], outline="red", width=5)
# Add text (requires a font file, using default here for simplicity)
try:
    font = ImageFont.truetype("arial.ttf", 40)
except:
    font = ImageFont.load_default()
draw.text((300, 300), "Hello Pillow!", fill="blue", font=font)

# 4. SAVE
image.save('processed_image.jpg')  # Pillow determines format from extension
image.save('output.png', 'PNG')    # Explicitly specify format
```

### Essential Operations Reference
For quick documentation, here are the most common `Image` object methods and their syntax.

| Operation | Method / Approach | Example & Notes |
| :--- | :--- | :--- |
| **Open / Create** | `Image.open(filepath)` | `img = Image.open('pic.jpg')` |
| | `Image.new(mode, size, color)` | Creates a new blank image. |
| **Save** | `.save(filepath, format)` | `img.save('new.png', 'PNG')` |
| **Basic Props** | `.size`, `.format`, `.mode` | `width, height = img.size` |
| **Resize** | `.resize((new_width, new_height))` | Maintains aspect ratio if you calculate it. |
| **Crop** | `.crop((left, top, right, bottom))` | The coordinates define a box. |
| **Rotate** | `.rotate(angle, expand=True)` | Use `expand=True` to avoid cropping corners. |
| **Convert** | `.convert(mode)` | `grayscale = img.convert('L')` |
| **Filter** | `.filter(filter_object)` | `from PIL import ImageFilter` <br> `img.filter(ImageFilter.SHARPEN)` |

### Important Considerations
| Consideration | Why It Matters | Good Practice |
| :--- | :--- | :--- |
| **Installation** | It's not part of the standard library. | Install via pip: `pip install Pillow` |
| **Image Modes** | Defines pixel representation ('RGB', 'RGBA', 'L', '1'). | Convert to the correct mode before operations (e.g., `.convert('RGB')`). |
| **Coordinate System** | Origin `(0, 0)` is at the **top-left** corner. X increases to the right, Y increases *downward*. | Important for drawing and cropping. |
| **File Formats** | Pillow supports many formats (JPEG, PNG, GIF, BMP, TIFF, WebP). | Use the correct extension and optional format-specific parameters in `.save()`. |
| **Original Preservation** | Many operations return a new image; they don't modify the original in-place. | Chain operations or assign back: `img = img.rotate(90)` |
