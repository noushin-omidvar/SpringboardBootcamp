const vowelCount = (str) => {
  vowels = "aeiou";
  onlyVowels = [...str].filter((c) => vowels.includes(c));
  vowelMap = new Map();
  for (let c of onlyVowels) {
    if (vowelMap.has(c)) {
      vowelMap.set(c, vowelMap.get(c) + 1);
    } else {
      vowelMap.set(c, 1);
    }
  }
  return vowelMap;
};
