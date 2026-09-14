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
- **Given an integer array `nums` and an integer `k`, return the `k` most frequent elements.**
```
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
```
```javascript
const nums = [1, 1, 1, 2, 2, 3, 3, 3, 3, 3, 3]
const k = 2

function mostFrequent(num: number[], k: number): number[] {

    const map = new Map()

    num.forEach(x => {
        if (!map.has(x)) map.set(x, 0)
        map.set(x, map.get(x) + 1)
    })

    const result = [...map].sort((a, b) => b[1] - a[1])
    return result.slice(0, k).map(x=>x[0])

}

console.log(mostFrequent(nums, k))
```
- **Rotate the image by 90 degrees clockwise.**
```
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]
Matrix ->Transpose ->Reverse
```
```javascript
const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
const output = [
    [7, 4, 1],
    [8, 5, 2],
    [9, 6, 3]
]

function rotateImage(matrix: number[][]): number[][]{

const result = matrix.map((x,i)=>(x.map((y,j)=>matrix[j][i]).reverse()))


return result
}

console.log(rotateImage(matrix))
```
- **Rotate the image by 90 degrees clockwise in-place (do not use extra matrix).**
```
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]
Matrix ->Transpose ->Reverse
```
```javascript
const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
const output = [
    [7, 4, 1],
    [8, 5, 2],
    [9, 6, 3]
]

function rotateImage(matrix: number[][]): number[][] {

    const n = matrix.length

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {

            let temp = matrix[i][j]
            matrix[i][j] = matrix[j][i]
            matrix[j][i] = temp
        }
    }

    for (let i = 0; i < n; i++) {
        matrix[i].reverse()
    }

    return matrix
}

console.log(rotateImage(matrix))
```
- **Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target.**
```
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
```
```javascript
const nums = [2, 7, 11, 15]
const target = 9

function findTarget(nums: number[], target: number): number[] {

    const map = new Map<number, number>()

    for (let i = 0; i < nums.length; i++) {

        const needed = target - nums[i]

        if (map.has(needed)) {
            return [map.get(needed)!, i]
        } else {
            map.set(nums[i], i)
        }

    }
    return []

}

console.log(findTarget(nums, target))
```
- **Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.**
```
Input: s = "anagram", t = "nagaram"
Output: true

Input: s = "rat", t = "car"
Output: false
```
```javascript
const s = "anagram"
const t = "nagaram"

function validAnagram(str1: string, str2: string): boolean {

    if (str1.length !== str2.length) return false

    const map = new Map<string, number>()

    for (let char of str1) {
        map.set(char, (map.get(char) || 0) + 1)
    }

    for (let char of str2) {
        map.set(char, (map.get(char) || 0) - 1)
    }

    if ([...map.values()].every(x => x === 0)) return true

    return false

}

console.log(validAnagram(s, t))
```
- **Given a string `s`, return the number of unique characters in it**
```
Input: s = "pwwkew"
Output: 4
Explanation: The unique characters are 'p', 'w', 'k', and 'e'.
```
```javascript
const s = "abcabcbb"

function longestSubstring(str1: string): number {

    const set = new Set<string>()

    for (let char of str1) {

        if (!set.has(char)) set.add(char)
    }

    return set.size
}

console.log(longestSubstring(s))
```
