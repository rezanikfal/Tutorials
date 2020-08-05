### Aggregate Functions (Max, Min, Sum, Count, Average)  
`int maxValue = Numbers.Where(x => x % 2 == 0).Max();`
- Aggregate Function  
Can be used for calculating `Factorial` and string concat:
```c#
string[] countries = { "India", "Iran", "USA", "UK" };
string maxValue = countries.Aggregate((a, b) => a + "," + b);

Output > India,Iran,USA,UK
```
### Restriction Operators
```c#
List<int> numbers = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
IEnumerable<int> enenNumbers = numbers.Where(x => x % 2 == 0);

foreach (int i in enenNumbers)
{
    Console.WriteLine(i);
};
```
