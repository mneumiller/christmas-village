import type { Vec2 } from "./world";

export type Character = {
  id: string;
  name: string;
  position: Vec2; // Where they appear on the map
  preferences: {
    likedTags: string[]; // Gift tags they like (e.g., ["nfl", "clothing"])
    dislikedTags?: string[]; // Gift tags they don't like
    maxPrice?: number; // Maximum price they'd want
  };
  quest?: Quest;
  image?: string; // Optional character image/avatar
  size?: number; // Optional custom size (defaults to CHARACTER_SIZE constant)
};

export type Quest = {
  id: string;
  characterId: string;
  title: string;
  description: string;
  requiredTags: string[]; // Gift must have at least one of these tags
  excludedTags?: string[]; // Gift must NOT have any of these
  maxPrice?: number;
  status: "active" | "completed" | "failed";
  completedGiftId?: string; // Which gift satisfied the quest
};

