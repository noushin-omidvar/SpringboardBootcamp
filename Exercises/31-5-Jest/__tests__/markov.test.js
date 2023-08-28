const MarkovMachine = require("../markov.js");

describe("MarkovMachine", () => {
  describe("constructor", () => {
    test("should split and store words without HTML tags", () => {
      const text = "<p>The cat in the hat.</p> A sunny day.";
      const markovMachine = new MarkovMachine(text);
      expect(markovMachine.words).toEqual([
        "The",
        "cat",
        "in",
        "the",
        "hat.",
        "A",
        "sunny",
        "day.",
      ]);
    });

    test("should create markov chains", () => {
      const text = "the cat in the hat";
      const markovMachine = new MarkovMachine(text);
      const expectedChains = {
        the: ["cat", "hat"],
        cat: ["in"],
        in: ["the"],
        hat: [undefined],
      };
      expect(markovMachine.makeChains()).toEqual(expectedChains);
    });
  });

  describe("makeText", () => {
    test("should generate random text", () => {
      const text = "The cat in the hat.";
      const markovMachine = new MarkovMachine(text);
      const randomText = markovMachine.makeText(10);
      expect(randomText).toBeTruthy();
    });

    test("should throw error if no suitable starting words found", () => {
      const emptyMachine = new MarkovMachine("");
      expect(() => emptyMachine.makeText()).toThrow(
        "No suitable starting words found."
      );
    });
  });
});
