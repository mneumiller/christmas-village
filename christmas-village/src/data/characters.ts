import type { Character } from "../model/character";
import philImage from "../assets/phil.png";
import melissaImage from "../assets/melissa.png";

export const characters: Character[] = [
  {
    id: "phil",
    name: "Phil",
    position: { x: 500, y: 300 },
    preferences: {
      likedTags: ["unique", "handmade", "artisan"],
      dislikedTags: ["bears"],
    },
    quest: {
      id: "quest-phil-1",
      characterId: "phil",
      title: "Something Unique",
      description: "I don't need gifts! But if you want to get me something, I love the Packers but never buy NFL gear.",
      requiredTags: ["experiences", "nfl", "food"],
      status: "active",
    },
    image: philImage,
    size: 100,
  },
  {
    id: "melissa",
    name: "Melissa",
    position: { x: 400, y: 300 },
    preferences: {
      likedTags: ["birds", "nature"],
    },
    quest: {
      id: "quest-melissa-1",
      characterId: "melissa",
      title: "Something for the Birds",
      description: "I love birds and nature! I'm looking for something that celebrates our feathered friends or the great outdoors.",
      requiredTags: ["birds", "nature"],
      status: "active",
    },
    image: melissaImage,
    size: 100,
  },
  // Add more characters here as needed
  // {
  //   id: "santa",
  //   name: "Santa Claus",
  //   position: { x: 300, y: 300 },
  //   preferences: {
  //     likedTags: ["holiday", "christmas", "winter", "handmade"],
  //     dislikedTags: ["summer", "beach"],
  //   },
  //   quest: {
  //     id: "quest-santa-1",
  //     characterId: "santa",
  //     title: "Find a Handmade Gift",
  //     description: "I'm looking for something special that was made by hand. Check the Christmas Market!",
  //     requiredTags: ["handmade"],
  //     status: "active",
  //   },
  // },
];

