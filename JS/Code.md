- Given a string s consisting of lowercase English letters, return the index of the first non-repeating character.
```javascript
const s = "letttteol"

function norepeat(s: string): number {

    const map = new Map<string,number>()
    for (let char of s) {

        map.set(char, (map.get(char) || 0) + 1)
    }

    const singleChar = [...map].find(x => x[1] === 1)


    return singleChar ? s.indexOf(singleChar[0]) : -1


}

console.log(norepeat(s))
```
