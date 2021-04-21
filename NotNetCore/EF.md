## Folders Structure
```
C# Solution
    - EF Project
        - Models
        - DataAccess
        - Migrations
```
#### Interface
An interface contains definitions for a group of related functionalities that a class must implement.
- Syntax: Type + Name + Parameter
```csharp
namespace dotnet_rpg.Services.CharacterService
{
    public interface ICharacterService
    {
        List<Character> GetAllCharacters();
        Character  GetCharacterById (int id);
        List<Character>  AddCharacter (Character newCharacter);

    }
}
```
