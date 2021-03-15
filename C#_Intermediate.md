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





<img src="./Pics/NamespaceCSharp.JPG" width="700">
