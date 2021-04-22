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

### Run **Migration**:
- Add-Migration initialMigration
- Update-Database

### Inject ```PeopleContext``` to Seed Database or Make a Query:
```csharp
namespace EFBestPractices.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;
        private readonly PeopleContext _db;

        public IndexModel(ILogger<IndexModel> logger, PeopleContext db)
        {
            _logger = logger;
            _db = db;
        }

        public void OnGet()
        {
            LoadSampleData();
            var people = _db.People.Where(x=>x.Age>20).ToList();
        }

        private void LoadSampleData()
        {
            if (_db.People.Count()==0)
            {
                string file = System.IO.File.ReadAllText("generated.json");
                var people = JsonSerializer.Deserialize<List<Person>>(file);
                _db.AddRange(people);
                _db.SaveChanges();
            }
        }
    }
}
```
### Creating a Model for an Existing Database
After installing EF Core, run this:
```
PM> Scaffold-DbContext "CONNECTION STRING" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models
```
####  Matching the model and the database schema
- Create the first migration
- Comment out the **contents** of the Up method prior to applying the migration to the database.
- Update-Database
