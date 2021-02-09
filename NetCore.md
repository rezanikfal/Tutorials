## After installation in VS-Code
### Problem with globalization [(Link)](https://docs.microsoft.com/en-us/dotnet/core/run-time-config/globalization)
dotnet run does not work. (This also happend when I installed __AutoMapper__) 
In `PROJECT_NAME/bin/Debug/netcoreapp3.1/PROJECT_NAME.runtimeconfig.json` make the following change:
```yaml
{
  "runtimeOptions": {
    "tfm": "netcoreapp3.1",
    "framework": {
      "name": "Microsoft.AspNetCore.App",
      "version": "3.1.0"
    },
    "configProperties": {
      "System.GC.Server": true,
      "System.Globalization.Invariant": true
    }
  }
}
```
### Error with C# Extension [(Link)](https://stackoverflow.com/a/54359872/6227809")
Omnisharp can't find .NET SDK when open any C sharp project ...   
For Ubuntu & Snap use this instead:
```javascript
$ sudo ln -s /snap/dotnet-sdk/current/dotnet /usr/local/bin/
```
For Windows:
- try setting the "omnisharp.path" option in the VS Code settings to "latest"
## Udemy Course (.NET Core 3.1 Jumpstart)
### Controller:
- It should be pretty simple, just forward data to the service and result to the client.
- To to so we __Inject__ necessary services to the controller to make use of it.
<img src="./Pics/ControllerService.png" width="550"> 

### DTO (Data Transfer Object) vs Model
- We use DTOs to __comunication between client & server__.
- __Model__ maps to the database (Representation of database table).
- We remove some elements of model in DTO that we don't need to show to the user.

### Create & Inject Services
We need to create a service class (i.e. `CharacterService`) and an Interface (i.e. `ICharacterService`)  
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
#### Class
We should add the `ICharacterService` interface to `CharacterService` class and implement it:
```csharp
namespace dotnet_rpg.Services.CharacterService
{
    public class CharacterService : ICharacterService
    {
        // Provides data istead of DB
        private static List<Character> characters = new List<Character>{
            new Character(),
            new Character{Id=1,Name = "Sam"}
        };
        public List<Character> AddCharacter(Character newCharacter)
        {
            characters.Add(newCharacter);
            return characters;
        }

        public List<Character> GetAllCharacters()
        {
            return characters;
        }

        public Character GetCharacterById(int id)
        {
            return characters.FirstOrDefault(c => c.Id == id);
        }
    }
}
```
#### Inject Service in the Controller
- Need a __constructor__ to inject the service
- Create a new private field for the service (i.e. `CharacterService`)
- Call proper method of the service for each HTTP call
- Say to the application (i.e. `Startup.cs`) about the implementation for `ICharacterService`
```csharp
namespace dotnet_rpg.Services.CharacterService
{
    public class CharacterService : ICharacterService
    {
        // Provides data istead of DB
        private static List<Character> characters = new List<Character>{
            new Character(),
            new Character{Id=1,Name = "Sam"}
        };
        public List<Character> AddCharacter(Character newCharacter)
        {
            characters.Add(newCharacter);
            return characters;
        }

        public List<Character> GetAllCharacters()
        {
            return characters;
        }

        public Character GetCharacterById(int id)
        {
            return characters.FirstOrDefault(c => c.Id == id);
        }
    }
}
```
#### Startup.cs
```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddControllers();
    services.AddScoped<ICharacterService, CharacterService>();
}
```
### Convert to Async Methods
#### Service Interface (`ICharacterService`)
```csharp
Task<List<Character>> GetAllCharacters();
```
#### Service Class (`CharacterService`)
```csharp
public async Task<List<Character>> AddCharacter(Character newCharacter)
{
    characters.Add(newCharacter);
    return characters;
}
```
#### Controller (`CharacterController`)
```csharp
Task<ServiceResponse<List<Character>>> GetAllCharacters();
```
### Add Wrapper to the respond
We Should update the Service (i.e. `CharacterService`) and Interface (i.e. `ICharacterService`):
#### Wrapper Class
```csharp
namespace dotnet_rpg.Models
{
    public class ServiceResponse<T>
    {
        public T Data { get; set; }
        public bool Success { get; set; } = true;
        public string Message { get; set; } = null;
    }
}
```
#### Interface (`ICharacterService`)
```csharp
[HttpGet("GetAll")]
public async Task<IActionResult> Get()
{
    return Ok(await _characterService.GetAllCharacters());
}
```
#### Service (`CharacterService`)
```csharp
public async Task<ServiceResponse<List<Character>>> AddCharacter(Character newCharacter)
{
    ServiceResponse<List<Character>> serviceResponse = new ServiceResponse<List<Character>>();
    serviceResponse.Data.Add(newCharacter);
    return serviceResponse;
}

public async Task<ServiceResponse<List<Character>>> GetAllCharacters()
{
    ServiceResponse<List<Character>> serviceResponse = new ServiceResponse<List<Character>>();
    serviceResponse.Data = characters;
    return serviceResponse;
}

public async Task<ServiceResponse<Character>> GetCharacterById(int id)
{
    ServiceResponse<Character> serviceResponse = new ServiceResponse<Character>();
    serviceResponse.Data = characters.FirstOrDefault(c => c.Id == id);
    return serviceResponse;
}
```
#### Before Wrapper:
```json
[
    {
        "id": 0,
        "name": "Frodo",
        "hitPoints": 100,
        "strength": 10,
        "defence": 10,
        "intelligence": 10,
        "class": 1
    },
    {
        "id": 1,
        "name": "Sam",
        "hitPoints": 100,
        "strength": 10,
        "defence": 10,
        "intelligence": 10,
        "class": 1
    }
]
```
#### After Wrapper:
```json
{
    "data": [
        {
            "id": 0,
            "name": "Frodo",
            "hitPoints": 100,
            "strength": 10,
            "defence": 10,
            "intelligence": 10,
            "class": 1
        },
        {
            "id": 1,
            "name": "Sam",
            "hitPoints": 100,
            "strength": 10,
            "defence": 10,
            "intelligence": 10,
            "class": 1
        }
    ],
    "success": true,
    "message": null
}
```
### Data Transfer Object (DTO):
- We map certain properties from Model to the DTO to __Receive__ data from the server.
- Also we can use DTOs for creating an object like _character_ and __Send__ it to the server.
```
Project Root
  |_ Dtos
    |_ Character
      |_AddCharacterDto.cs
      |_GetCharacterDto.cs
  |_ Models
    |_ Character.cs
    |_ RpgClass.cs
    |_ ServiceResponse.cs
  |_ AutoMapperProfile.cs
```
- The DTO's structure is like Model
### AutoMapper:
- For installation (with no specific version):  
`$ dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection`  
- Add Service to the `Startup.cs`:
```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddControllers();
    services.AddAutoMapper(typeof(Startup));
    services.AddScoped<ICharacterService, CharacterService>();
}
```
- Add constructor to __Inject__ Mapper to the service (`CharacterService`):
```csharp
private readonly IMapper _mapper;

public CharacterService(IMapper mapper)
{
    _mapper = mapper;
}
```
- Before and after applying AutoMapper
```csharp
return characters.FirstOrDefault(c => c.Id == id);
```
```csharp
serviceResponse.Data = _mapper.Map<GetCharacterDto>(characters.FirstOrDefault(c => c.Id == id));
return serviceResponse;
```
- mapper.Map<`Which type the value should mapped to`>(`Actual object that will be mapped`)
- Add `Mapper` & `ServiceResponse` to the character service (Before and After)
```csharp
public async Task<List<Character>> AddCharacter(Character newCharacter)
{
    characters.Add(newCharacter);
    return characters;
}

public async Task<List<Character>> GetAllCharacters()
{
    return characters;
}

public async Task<Character> GetCharacterById(int id)
{
    return characters.FirstOrDefault(c => c.Id == id);
}
```
```csharp
public async Task<ServiceResponse<List<GetCharacterDto>>> AddCharacter(AddCharacterDto newCharacter)
{
    ServiceResponse<List<GetCharacterDto>> serviceResponse = new ServiceResponse<List<GetCharacterDto>>();
    Character character = _mapper.Map<Character>(newCharacter);
    character.Id = characters.Max(c => c.Id) + 1;
    characters.Add(character);
    serviceResponse.Data = (characters.Select(c => _mapper.Map<GetCharacterDto>(c))).ToList();
    return serviceResponse;
}

public async Task<ServiceResponse<List<GetCharacterDto>>> GetAllCharacters()
{
    ServiceResponse<List<GetCharacterDto>> serviceResponse = new ServiceResponse<List<GetCharacterDto>>();
    serviceResponse.Data = (characters.Select(c => _mapper.Map<GetCharacterDto>(c))).ToList();
    return serviceResponse;
}

public async Task<ServiceResponse<GetCharacterDto>> GetCharacterById(int id)
{
    ServiceResponse<GetCharacterDto> serviceResponse = new ServiceResponse<GetCharacterDto>();
    serviceResponse.Data = _mapper.Map<GetCharacterDto>(characters.FirstOrDefault(c => c.Id == id));
    return serviceResponse;
}}
```
- Add AutoMapper Profile:
```csharp
namespace dotnet_rpg
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Character, GetCharacterDto>();
            CreateMap<AddCharacterDto, Character>();
        }
    }
}
```
