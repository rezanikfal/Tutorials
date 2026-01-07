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
