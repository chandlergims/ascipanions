import { catFrames, dogFrames, squirrelFrames, birdFrames, misotopeFrames } from './asciiArt';

export interface LibraryAnimal {
  id: number;
  name: string;
  level: string;
  ascii: string;
  color: string;
  type: 'cat' | 'dog' | 'squirrel' | 'bird' | 'misotope';
}

export const createLibraryAnimals = (frame: number): LibraryAnimal[] => [
  // Cats (by rarity)
  {
    id: 1,
    name: "White Cat",
    level: "Common",
    ascii: catFrames[frame % catFrames.length],
    color: "text-white",
    type: "cat"
  },
  {
    id: 2,
    name: "Blue Cat",
    level: "Common",
    ascii: catFrames[frame % catFrames.length],
    color: "text-blue-400",
    type: "cat"
  },
  {
    id: 3,
    name: "Green Cat",
    level: "Uncommon",
    ascii: catFrames[frame % catFrames.length],
    color: "text-green-400",
    type: "cat"
  },
  {
    id: 4,
    name: "Purple Cat",
    level: "Rare",
    ascii: catFrames[frame % catFrames.length],
    color: "text-purple-400",
    type: "cat"
  },
  {
    id: 5,
    name: "Golden Cat",
    level: "Epic",
    ascii: catFrames[frame % catFrames.length],
    color: "text-yellow-400",
    type: "cat"
  },
  {
    id: 6,
    name: "Pink Cat",
    level: "Legendary",
    ascii: catFrames[frame % catFrames.length],
    color: "text-pink-400",
    type: "cat"
  },
  // Dogs (by rarity)
  {
    id: 7,
    name: "White Dog",
    level: "Common",
    ascii: dogFrames[frame % dogFrames.length],
    color: "text-white",
    type: "dog"
  },
  {
    id: 8,
    name: "Blue Dog",
    level: "Common",
    ascii: dogFrames[frame % dogFrames.length],
    color: "text-blue-400",
    type: "dog"
  },
  {
    id: 9,
    name: "Green Dog",
    level: "Uncommon",
    ascii: dogFrames[frame % dogFrames.length],
    color: "text-green-400",
    type: "dog"
  },
  {
    id: 10,
    name: "Purple Dog",
    level: "Rare",
    ascii: dogFrames[frame % dogFrames.length],
    color: "text-purple-400",
    type: "dog"
  },
  {
    id: 11,
    name: "Golden Dog",
    level: "Epic",
    ascii: dogFrames[frame % dogFrames.length],
    color: "text-yellow-400",
    type: "dog"
  },
  {
    id: 12,
    name: "Pink Dog",
    level: "Legendary",
    ascii: dogFrames[frame % dogFrames.length],
    color: "text-pink-400",
    type: "dog"
  },
  // Squirrels (by rarity)
  {
    id: 13,
    name: "White Squirrel",
    level: "Common",
    ascii: squirrelFrames[frame % squirrelFrames.length],
    color: "text-white",
    type: "squirrel"
  },
  {
    id: 14,
    name: "Blue Squirrel",
    level: "Common",
    ascii: squirrelFrames[frame % squirrelFrames.length],
    color: "text-blue-400",
    type: "squirrel"
  },
  {
    id: 15,
    name: "Green Squirrel",
    level: "Uncommon",
    ascii: squirrelFrames[frame % squirrelFrames.length],
    color: "text-green-400",
    type: "squirrel"
  },
  {
    id: 16,
    name: "Purple Squirrel",
    level: "Rare",
    ascii: squirrelFrames[frame % squirrelFrames.length],
    color: "text-purple-400",
    type: "squirrel"
  },
  {
    id: 17,
    name: "Golden Squirrel",
    level: "Epic",
    ascii: squirrelFrames[frame % squirrelFrames.length],
    color: "text-yellow-400",
    type: "squirrel"
  },
  {
    id: 18,
    name: "Pink Squirrel",
    level: "Legendary",
    ascii: squirrelFrames[frame % squirrelFrames.length],
    color: "text-pink-400",
    type: "squirrel"
  },
  // Birds (by rarity)
  {
    id: 19,
    name: "White Bird",
    level: "Common",
    ascii: birdFrames[frame % birdFrames.length],
    color: "text-white",
    type: "bird"
  },
  {
    id: 20,
    name: "Blue Bird",
    level: "Common",
    ascii: birdFrames[frame % birdFrames.length],
    color: "text-blue-400",
    type: "bird"
  },
  {
    id: 21,
    name: "Green Bird",
    level: "Uncommon",
    ascii: birdFrames[frame % birdFrames.length],
    color: "text-green-400",
    type: "bird"
  },
  {
    id: 22,
    name: "Purple Bird",
    level: "Rare",
    ascii: birdFrames[frame % birdFrames.length],
    color: "text-purple-400",
    type: "bird"
  },
  {
    id: 23,
    name: "Golden Bird",
    level: "Epic",
    ascii: birdFrames[frame % birdFrames.length],
    color: "text-yellow-400",
    type: "bird"
  },
  {
    id: 24,
    name: "Pink Bird",
    level: "Legendary",
    ascii: birdFrames[frame % birdFrames.length],
    color: "text-pink-400",
    type: "bird"
  },
  // Misotope (by rarity)
  {
    id: 25,
    name: "White Misotope",
    level: "Common",
    ascii: misotopeFrames[frame % misotopeFrames.length],
    color: "text-white",
    type: "misotope"
  },
  {
    id: 26,
    name: "Blue Misotope",
    level: "Common",
    ascii: misotopeFrames[frame % misotopeFrames.length],
    color: "text-blue-400",
    type: "misotope"
  },
  {
    id: 27,
    name: "Green Misotope",
    level: "Uncommon",
    ascii: misotopeFrames[frame % misotopeFrames.length],
    color: "text-green-400",
    type: "misotope"
  },
  {
    id: 28,
    name: "Purple Misotope",
    level: "Rare",
    ascii: misotopeFrames[frame % misotopeFrames.length],
    color: "text-purple-400",
    type: "misotope"
  },
  {
    id: 29,
    name: "Golden Misotope",
    level: "Epic",
    ascii: misotopeFrames[frame % misotopeFrames.length],
    color: "text-yellow-400",
    type: "misotope"
  },
  {
    id: 30,
    name: "Pink Misotope",
    level: "Legendary",
    ascii: misotopeFrames[frame % misotopeFrames.length],
    color: "text-pink-400",
    type: "misotope"
  }
];
