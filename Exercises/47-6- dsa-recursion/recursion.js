/** product: calculate the product of an array of numbers. */

function product(nums, i = 0) {
  if (i === nums.length) return 1;
  return nums[i] * product(nums, (i = i + 1));
}

/** longest: return the length of the longest word in an array of words. */

function longest(words, idx = 0, longestSoFar = 0) {
  if (idx === words.length) return longestSoFar;
  longestSoFar = Math.max(words[idx].length, longestSoFar);
  return longest(words, idx + 1, longestSoFar);
}

/** everyOther: return a string with every other letter. */

function everyOther(str, idx = 0, newStr = "") {
  if (idx >= str.length) {
    return newStr;
  }

  newStr += str[idx];
  return everyOther(str, idx + 2, newStr);
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str, idx = 0, palindrome = true) {
  //base
  if (idx === str.length) return palindrome;

  palindrome = str[idx] === str[str.length - idx - 1];
  if (!palindrome) return palindrome;
  return isPalindrome(str, idx + 1);
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val, idx = 0) {
  //base
  if (arr[idx] === val) return idx;
  if (idx === arr.length) return -1;

  return findIndex(arr, val, idx + 1);
}

/** revString: return a copy of a string, but in reverse. */

function revString(str, idx = 0, reversedStr = "") {
  if (idx === str.length) return reversedStr;
  reversedStr += str[str.length - idx - 1];
  return revString(str, idx + 1, reversedStr);
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
  let arrStr = [];

  // normal case
  for (let key of Object.keys(obj)) {
    if (typeof obj[key] === "string") {
      arrStr.push(obj[key]);
    }

    if (typeof obj[key] == "object") {
      arrStr.push(...gatherStrings(obj[key]));
    }
  }

  return arrStr;
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val, start = 0, end = arr.length - 1) {
  //base
  if (start > end) return -1;

  let mid = Math.floor((start + end) / 2);

  if (arr[mid] === val) {
    return mid;
  } else if (arr[mid] > val) {
    binarySearch(arr, val, start, mid - 1);
  }

  return binarySearch(arr, val, mid + 1, end);
}

function realSize(arrays, count = 0) {
  for (let elm of arrays) {
    if (typeof elm === "number") {
      count++;
    } else if (Array.isArray(elm)) {
      count = realSize(elm, count);
    }
  }
  return count;
}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch,
  realSize,
};
