# NumPy

## 1. Introduction to NumPy

NumPy is critical for the PyData ecosystem because it is incredibly fast, featuring bindings to C libraries. The primary object is the **NumPy Array**, which comes in two flavors:

* **Vectors:** Strictly 1-D arrays.
* **Matrices:** 2-D arrays (even if they only have one row or column).

### Installation

The recommended way to install NumPy is via the Anaconda distribution:

```bash
conda install numpy

```

---

## 2. Creating Arrays

You can create arrays from existing Python structures or using built-in NumPy functions.

### From Python Lists

* **1-D Array:** `np.array([1, 2, 3])`
* **2-D Matrix:** `np.array([[1, 2, 3], [4, 5, 6]])`

### Built-in Methods

| Method | Description | Example |
| --- | --- | --- |
| `np.arange()` | Evenly spaced values in an interval | `np.arange(0, 11, 2)` |
| `np.zeros()` | Array of zeros (takes a tuple for dimensions) | `np.zeros((5, 5))` |
| `np.ones()` | Array of ones | `np.ones(3)` |
| `np.linspace()` | Specific number of even points between two values | `np.linspace(0, 10, 50)` |
| `np.eye()` | Creates an identity matrix | `np.eye(4)` |

---

## 3. Random Number Generation

NumPy provides a robust `random` module for generating data:

* **`np.random.rand(n)`**: Uniform distribution over $[0, 1)$.
* **`np.random.randn(n)`**: Standard normal distribution (centered around $0$).
* **`np.random.randint(low, high, size)`**: Random integers from low (inclusive) to high (exclusive).

---

## 4. Array Attributes and Methods

Once an array is created, you can inspect or transform it using these key tools:

### Reshaping and Inspection

* **`.reshape(rows, cols)`**: Returns an array with a new shape containing the same data.
* **`.shape`**: An **attribute** that returns the dimensions of the array.
* **`.dtype`**: Returns the data type of the objects within the array (e.g., `int64`).

### Finding Extremes

* **`.max()` / `.min()**`: Returns the highest or lowest value in the array.
* **`.argmax()` / `.argmin()**`: Returns the **index** location of the maximum or minimum value.

---

> **Note:** When using `.reshape()`, ensure that the new dimensions match the original number of elements (e.g., a 25-element vector can become a $5 \times 5$ matrix, but not $5 \times 4$).
> 
