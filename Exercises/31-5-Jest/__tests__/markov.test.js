const MarkovMachine = require("../markov.js");

describe("MarkovMachine", () => {
  const sampleText = "the cat in the hat";

  test("constructor should properly split and filter words", () => {
    const markovMachine = new MarkovMachine(sampleText);
    expect(markovMachine.words).toEqual(["the", "cat", "in", "the", "hat"]);
  });

  test("makeChains should create correct markov chains", () => {
    const markovMachine = new MarkovMachine(sampleText);
    const chains = markovMachine.makeChains();
    expect(chains).toEqual({
      the: ["cat", "hat"],
      cat: ["in"],
      in: ["the"],
      hat: [undefined],
    });
  });

  test("makeText should generate random text", () => {
    const markovMachine = new MarkovMachine(sampleText);
    const generatedText = markovMachine.makeText(5); // Generate text with 5 words
    expect(generatedText.split(" ").length).toBe(5);
  });

  test("makeText should generate 100 words by default", () => {
    const markovMachine = new MarkovMachine(sampleText);
    const generatedText = markovMachine.makeText(); // Generate text with default 100 words
    expect(generatedText.split(" ").length).toBe(100);
  });
});
