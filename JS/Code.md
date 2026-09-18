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
- **Given a string s, find the length of the longest substring without repeating characters (Sliding Window).**
```
Input: s = "abcabcbb"
Output: 3
Explanation: "abc" is the longest substring without repeating characters.
```
```javascript
const s = "pwwkew"

function longestSubstring(str1: string): number {

    let left = 0
    let maxLen = 0
    const strArray = str1.split("")

    const set = new Set<string>()

    for (let right = 0; right < strArray.length; right++) {

        while (set.has(strArray[right])) {
            set.delete(strArray[left])
            left++
        }
        set.add(strArray[right])
        maxLen = Math.max(maxLen, right - left + 1)

    }
    return maxLen
}
```
- **Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.**

```
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
```
```javascript
const grid = [
    ["1", "1", "0", "0", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "0", "1", "1"]
]

function islands(grid: string[][]): number {

    if (!grid || grid.length === 0) return 0

    const rows = grid.length
    const cols = grid[0].length
    let count = 0

    function dfs(i: number, j: number) {

        if (i < 0 || i >= rows || j < 0 || j >= cols || grid[i][j] === '0') return
        grid[i][j] = '0'

        dfs(i + 1, j)
        dfs(i - 1, j)
        dfs(i, j + 1)
        dfs(i, j - 1)
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {

            if (grid[i][j] === '1') {
                count++
                dfs(i, j)
            }

        }
    }
    return count
}

console.log(islands(grid))
```
- **You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.**

```
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.

Input: prices = [7,6,4,3,1]
Output: 0
Explanation: No profit can be made.
```
```javascript
function maxProfit(prices: number[]): number {
  if (prices.length === 0) return 0;

  let minPrice = Infinity;
  let maxProfit = 0;

  for (const price of prices) {
    if (price < minPrice) {
      minPrice = price;
    }

    const profit = price - minPrice;
    if (profit > maxProfit) {
      maxProfit = profit;
    }
  }

  return maxProfit;
}
```
- **Longest consecutive sequence**

```
Input: prices = [100, 4, 200, 1, 3, 2]
Output: 4
Explanation: because 1,2,3,4.
```
```javascript
const nums = [100, 4, 200, 1, 3, 2,]

function longestConsecutive(input) {

    let maxLength = 0
    const set = new Set(input)

    for (const x of set) {

        if (set.has(x - 1)) continue
        let len = 1
        let cur = x

        while (set.has(cur + 1)) {
            len++
            cur++
        }

        if (len > maxLength) maxLength = len
    }

    return maxLength

}

console.log(longestConsecutive(nums))
```
