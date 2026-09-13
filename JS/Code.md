- **Given a string s consisting of lowercase English letters, return the index of the first non-repeating character.**
```
Input: s = "leetcode"
Output: 0

Input: s = "loveleetcode"
Output: 2

Input: s = "aabb"
Output: -1
```
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
- **Given an array of strings strs, group the anagrams together.**
```
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
```
```javascript
const strs = ["eat", "tea", "tan", "ate", "nat", "bat"]

function groupStrings(strs: string[]): string[][] {

    const map = new Map<string, string[]>()

    strs.forEach(x => {
        const sortedStrs = x.split("").sort().join("")

        if (!map.has(sortedStrs)) map.set(sortedStrs, [])

        map.get(sortedStrs)!.push(x)

    })
    return [...map.values()]
}

console.log(groupStrings(strs))
```
