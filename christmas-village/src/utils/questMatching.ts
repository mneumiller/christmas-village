import type { Gift } from "../model/gift";
import type { Quest, Character } from "../model/character";

/**
 * Check if a gift matches a quest's requirements
 */
export function giftMatchesQuest(gift: Gift, quest: Quest): boolean {
  // Check if gift has at least one required tag
  const hasRequiredTag = quest.requiredTags.some(tag => 
    gift.tags.some(giftTag => giftTag.toLowerCase() === tag.toLowerCase())
  );

  if (!hasRequiredTag) {
    return false;
  }

  // Check if gift has any excluded tags
  if (quest.excludedTags && quest.excludedTags.length > 0) {
    const hasExcludedTag = quest.excludedTags.some(tag =>
      gift.tags.some(giftTag => giftTag.toLowerCase() === tag.toLowerCase())
    );
    if (hasExcludedTag) {
      return false;
    }
  }

  // Check price limit
  if (quest.maxPrice && gift.priceUsd && gift.priceUsd > quest.maxPrice) {
    return false;
  }

  return true;
}

/**
 * Find all gifts that match a quest
 */
export function findMatchingGifts(gifts: Gift[], quest: Quest): Gift[] {
  return gifts.filter(gift => giftMatchesQuest(gift, quest));
}

/**
 * Check if a gift matches a character's preferences (for recommendations)
 */
export function giftMatchesPreferences(gift: Gift, preferences: Character["preferences"]): boolean {
  // Check if gift has liked tags
  const hasLikedTag = preferences.likedTags.some(tag =>
    gift.tags.some(giftTag => giftTag.toLowerCase() === tag.toLowerCase())
  );

  if (!hasLikedTag) {
    return false;
  }

  // Check if gift has disliked tags
  if (preferences.dislikedTags && preferences.dislikedTags.length > 0) {
    const hasDislikedTag = preferences.dislikedTags.some(tag =>
      gift.tags.some(giftTag => giftTag.toLowerCase() === tag.toLowerCase())
    );
    if (hasDislikedTag) {
      return false;
    }
  }

  // Check price limit
  if (preferences.maxPrice && gift.priceUsd && gift.priceUsd > preferences.maxPrice) {
    return false;
  }

  return true;
}

