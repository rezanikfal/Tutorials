## Fundamentals
<img src="./Pics/CSharp1.JPG" width="400"> <img src="./Pics/CSharp2.JPG" width="400">  
### namespaces
-  The .NET classes use namespaces to organize its many classes.
-  declaring my own namespaces can help control the scope of class and method names in larger programming projects.
<img src="./Pics/NamespaceCSharp.JPG" width="700">

### Variables / Constants
- Variable: a name given to a storage location in memory. It is written Camel Case like ```int myName``` 
- Constant: an immutable value. It is written Pascal Case like ```const int MyName```
### Primitive Types
- C# is a statically-typed, strongly-typed language. That means all variables must be declared to be of a specific type.
- When we compile C# data types, the compiler translate them to equivalent .NET type.
- C# keywords are always __Lowercase__.
- Each C# Types or Keywords maps to a type in .NET framework (like ```int``` to ```Int32```)
<img src="./Pics/PrimitiveTypes.JPG" width="600">  

- ```double``` is the default datatype that C# uses for real numbers. So if we declare a float or decimal, we should say that to the compiler explicitly:
```csharp
float number = 1.2f;
decimal number = 1.2m;
```

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
### String VS Char
- ```string (C#) or String (.Net)``` is Class. It is Non-Primitive type like Array, Enum, Class.
- ```char (C#) or Char (.Net)``` is Structure. It is Primitive type like int, float, ....
### Format String
```csharp
Console.WriteLine("{0} {1}", byte. MinValue, byte. MaxValue);
```
## Class vs Object
- __Class__ is a type or blueprin from which we create __Object__. It is an __instance__ of the class.
<img src="./Pics/ClassObjectCSharp.JPG" width="500">

- When we run the program, the __Objects__ are talking to each other to provide functionality.
- To create class we need __Access Modifier__ + __class keyword__ + __Identifier or class name__.
- Inside a class we might have __Variable or Field__ as well as __Method or Function__
```csharp
public class Person
{
    public string Name;
    public void Introduce()
    {
        Console.WriteLine("Hi, my name is" + Name);
    }
}
```
### Create Object
It is like __Primitive__ types but we have to allocate memory for the object using __new__ operator.
```csharp
int number; //No need to allocate memory for Primitive types
Person person = new Person();
```
When we use [ ] in declaration, behind the scene, the Array class gets called. So we need to allocate memory and initialize like classes. Also there is a shortcut to assign values to an array.
```csharp
int[] number = new int[3] {1,2,3}
```
### Static Modifier
- If we add the __Static Modifier__ to the __add Method__ in calculate class we can access it directly from class and no need to create an instance.
- We __cannot__ access the Static methods from the objects.
- It means there is only __one__ instance from the Static class in memory.
```csharp
class Calculator
{
    public static int add(int a, int b)
    {
        return a + b;
    }
}
```
- Look at ```Console``` class in System namespace. the ```WriteLine``` method has defined as __Static__.
```csharp
Console.WriteLine("Reza Nikfal");
```
 - We don't need to create an instance of  ```Console``` class to make use of it.
 - There are just one __Console__ in the application and having several instances of Console doesn't make sence.












### DateTime & TimeSpan
```using System;``` means importing the __System Namespace__. A namespace is a container for related classes.
