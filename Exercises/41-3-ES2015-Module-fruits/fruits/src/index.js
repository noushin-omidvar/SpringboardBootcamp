import fruits from "./foods";
import { choice, remove } from "./helpers";

// Choose a random fruit
const randomFruit = choice(fruits);

// Log messages using the randomly chosen fruit
console.log(`I'd like one ${randomFruit}, please.`);
console.log(`Here you go: ${randomFruit}`);
console.log("Delicious! May I have another?");

// Remove the chosen fruit from the array
remove(fruits, randomFruit);

// Log the remaining fruits count
console.log(`I'm sorry, we're all out. We have ${fruits.length} fruits left.`);
