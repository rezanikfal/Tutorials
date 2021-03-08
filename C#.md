## Fundamentals
<img src="./Pics/CSharp1.JPG" width="400"> <img src="./Pics/CSharp2.JPG" width="400">  
### Using Statement
```using System;``` means importing the __System Namespace__. A namespace is a container for related classes.
### Variables / Constants
- Variable: a name given to a storage location in memory. It is written Camel Case like ```int myName``` 
- Constant: an immutable value. It is written Pascal Case like ```const int MyName```
## Primitive Types (in .NET and Mapped type in C#) 
<img src="./Pics/PrimitiveTypes.JPG" width="400"> <img src="./Pics/CSharp2.JPG" width="400">  
### Type Conversion
- Implicit (```int``` covers ```byte``` range)
```csharp
byte b = 1;
int i = b;
```
- Explicit
```csharp
// Won't Compile
int i = 1;
byte b = i;

//Needs Explicit Conversion to Compile
int i = 1;
byte b = (byte)i;
```
- Between non-compatible types
```csharp
// Won't Compile
string s = "1";
int i = (int)s;

// Needs non-compatible Conversion to Compile
string s = "1";

// Convert Class is part of Dot Net Framework and is defined in System Namespace.
// Int32 is a Dot Net Framework Type which Maps to the C# int type.
int i = Convert.ToInt32(s);

// All premetive types in C# have Parse Method.
int j = int.Parse(s);
```

















### DateTime & TimeSpan
```using System;``` means importing the __System Namespace__. A namespace is a container for related classes.
### String
```using System;``` means importing the __System Namespace__. A namespace is a container for related classes.
