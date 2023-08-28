/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    const markovChain = {};
    for (let i = 0; i < this.words.length; i++) {
      typeof markovChain[this.words[i]] !== "undefined"
        ? markovChain[this.words[i]].push(this.words[i + 1])
        : (markovChain[this.words[i]] = [this.words[i + 1]]);
    }
    return markovChain;
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let mc = this.makeChains();
    let curr_word = this.words[Math.trunc(Math.random() * this.words.length)];
    let newText = curr_word;
    let count = numWords - 1;
    while (count > 0) {
      let idx = Math.trunc(Math.random() * mc[curr_word].length);
      curr_word =
        typeof mc[curr_word][idx] !== "undefined"
          ? mc[curr_word][idx]
          : this.words[Math.trunc(Math.random() * this.words.length)];
      newText += " " + curr_word;
      count--;
    }
    return newText;
  }
}

module.exports = MarkovMachine;