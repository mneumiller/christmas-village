import type { Gift } from "../model/gift";
import type { Character } from "../model/character";
import { giftMatchesQuest } from "./questMatching";

export type GiftEvaluation = {
  rating: "excellent" | "good" | "okay" | "poor";
  message: string;
  matchesQuest: boolean;
};

/**
 * Evaluate a gift based on character preferences
 */
export function evaluateGift(gift: Gift, character: Character): GiftEvaluation {
  const { preferences, quest } = character;
  
  // Check if it matches the quest
  const matchesQuest = quest 
    ? giftMatchesQuest(gift, quest)
    : false;

  // Count how many liked tags match
  const likedTagMatches = preferences.likedTags.filter(tag =>
    gift.tags.some(giftTag => giftTag.toLowerCase() === tag.toLowerCase())
  ).length;

  // Check for disliked tags
  const hasDislikedTag = preferences.dislikedTags && preferences.dislikedTags.some(tag =>
    gift.tags.some(giftTag => giftTag.toLowerCase() === tag.toLowerCase())
  );

  // Check price (if character has a max price preference)
  const priceOk = !preferences.maxPrice || !gift.priceUsd || gift.priceUsd <= preferences.maxPrice;

  // Determine rating - DISLIKES TRUMP EVERYTHING
  let rating: GiftEvaluation["rating"];
  let message: string;

  if (hasDislikedTag) {
    // Dislikes override everything - even if it matches quest or has liked tags
    rating = "poor";
    const dislikedTag = preferences.dislikedTags?.find(tag => 
      gift.tags.some(gt => gt.toLowerCase() === tag.toLowerCase())
    );
    message = `Oh no... I really don't like ${dislikedTag} items. I appreciate the thought, but this isn't for me at all.`;
  } else if (matchesQuest && likedTagMatches >= 2) {
    rating = "excellent";
    message = "Wow! This is perfect! Exactly what I was looking for. Thank you so much!";
  } else if (matchesQuest) {
    rating = "good";
    message = "This is great! It matches what I need. Thank you!";
  } else if (likedTagMatches >= 2) {
    rating = "good";
    message = "I really like this! It's not exactly what I asked for, but I appreciate it!";
  } else if (likedTagMatches === 1) {
    rating = "okay";
    message = "Thanks! It's nice, though not quite what I had in mind.";
  } else if (!priceOk) {
    rating = "poor";
    message = "Oh, this is a bit too expensive for me. I appreciate the thought though.";
  } else {
    rating = "okay";
    message = "Thanks, but this isn't really my style. I appreciate the effort though.";
  }

  return { rating, message, matchesQuest };
}

