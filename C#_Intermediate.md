## Constructor
If we don't use Constructor in a class, C# compiler creates one to initialize all fields with their default values.
### Constructor Overloading
It means using multiple Constructor with different signature.
- It makes initialization of the class easier.
- Using ```: this()``` we can call the default or parameterless constructor.
```csharp
public class Customer
{
    public int Id;
    public string Name;
    public List<Order> Orders;
    public Customer()
    {
        Orders = new List<Order>();
    }
    public Customer(int id)
    : this()
    {
        this.Id = id;
    }
}
```
### Object Initializer
To avoid creating multiple Constructor to handle initializing an object.
```csharp
public class Person
{
    public int Id;
    public string FirstName;
    public string LastName;
    public DateTime Birthdate;
    }
```
```csharp
static void Main(string[] args)
{
    var person = new Person
    {
        FirstName = "Reza",
        LastName = "Nikfal"
    };
}
```
## Methods
Using one overload on the other and handle the exception using __Defensive Programming__.
```csharp
public void Move(int x, int y)
{
    this.X = x;
    this.Y = y;
}
public void Move(Point newLocation)
{
    if (newLocation == null)
    {
        throw new ArgumentNullException("newLocation");
    }
    Move(newLocation.X, newLocation.Y);
}
```
## Fields
- We can initialize _orders_ directly as follows or using constructor.
- Adding __readonly__ to make sure this field will be initialized just once.
```csharp
    public class Customer
    {
public int Id;
public string name;
public readonly List<order> orders = new List<order>();

public Customer(int id)
{
    Id = id;
}

public Customer(int id, string name) : this(id)
{
    this.name = name;
}     
```



<img src="./Pics/NamespaceCSharp.JPG" width="700">
