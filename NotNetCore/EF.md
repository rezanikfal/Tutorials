### Folders Structure
```
C# Solution
    - EF Project
        - Models
        - DataAccess
        - Migrations
```
### Models
Create a c# class for each table:
```csharp
namespace EFDataAccessLibrary.Models
{
    public class Address
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(200)]
        public string StreetAddress { get; set; }
        [Required]
        [MaxLength(100)]
        public string City { get; set; }
        [Required]
        [MaxLength(50)]
        public string State { get; set; }
        [Required]
        [MaxLength(10)]
        [Column(TypeName ="varchar(10)")]
        public string ZipCode { get; set; }
    }
}
----------------------------------------
namespace EFDataAccessLibrary.Models
{
    public class Email
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(200)]
        public string EmailAddress { get; set; }
    }
}
----------------------------------------
namespace EFDataAccessLibrary.Models
{
    public class Person
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }
        [Required]
        public int Age { get; set; }
        public List<Address> Addresses { get; set; } = new List<Address>();
        public List<Email> EmailAddresses { get; set; } = new List<Email>();
    }
}
```
### DataAccess
To create data **Context**:
```csharp
namespace EFDataAccessLibrary.DataAccess
{
    public class PeopleContext:DbContext
    {
        public PeopleContext(DbContextOptions options) : base(options) { }
        public DbSet<Person> People { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Email> EmailAddresses { get; set; }
    }
}
```
### Startup.cs
```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddDbContext<PeopleContext>(options =>
    {
        options.UseSqlServer(Configuration.GetConnectionString("Default"));
    });
    services.AddRazorPages();
}
```
### appsettings.json
```json
{
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "Default": "Data Source=den1.mssql8.gear.host; Persist Security Info=True; Database=reza1; User ID=reza1;Password=Kl0Sc?bZc0!8"
  }
}
```
### Setting up Entity Framework
Right click on **Dependencies** and click on **Manage Nuget Packages**. Then install:
- Microsoft.EntityFrameworkCore.SqlServer
- Microsoft.EntityFrameworkCore.Tools

Run Migration:
- dfsdfsd
- dfsdfsd




