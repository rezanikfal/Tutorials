## Folders Structure
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
