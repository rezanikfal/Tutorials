## After installation in VS-Code
### Problem with globalization [(Link)](https://docs.microsoft.com/en-us/dotnet/core/run-time-config/globalization")
dotnet run does not work.  
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
## Udemy Course (.NET Core 3.1 Jumpstart)
### Controller:
- It should be pretty simple, just forward data to the service and result to the client.
- To to so we __Inject__ necessary services to the controller to make use of it.
<img src="./Pics/ControllerService.png" width="550"> 
