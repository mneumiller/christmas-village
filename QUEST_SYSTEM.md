# Quest System Overview

## How It Works

Characters in the village have quests to find Christmas presents. Each character has:
- **Preferences**: What they like/dislike (tags, price limits)
- **Quest**: A specific task to find a gift matching certain criteria
- **Position**: Where they appear on the map

## Data Models

### Character
```typescript
{
  id: string;
  name: string;
  position: { x, y };
  preferences: {
    likedTags: string[];
    dislikedTags?: string[];
    maxPrice?: number;
  };
  quest?: Quest;
}
```

### Quest
```typescript
{
  id: string;
  characterId: string;
  title: string;
  description: string;
  requiredTags: string[];      // Gift must have at least one
  excludedTags?: string[];      // Gift must NOT have any
  maxPrice?: number;
  status: "active" | "completed" | "failed";
  completedGiftId?: string;
}
```

## Matching Logic

The system uses `giftMatchesQuest()` to check if a gift satisfies a quest:
1. Gift must have at least one `requiredTag`
2. Gift must NOT have any `excludedTags`
3. Gift price must be within `maxPrice` (if specified)

## Components

1. **CharacterMarker** - Shows characters on the map with quest indicators
2. **QuestDialog** - Dialog that appears when you interact with a character
3. **questMatching.ts** - Utility functions for matching gifts to quests

## Backend API

- `GET /api/characters` - Get all characters
- `GET /api/characters/:id` - Get specific character
- `GET /api/characters/:id/quest` - Get character's quest
- `POST /api/characters/:id/complete-quest` - Complete a quest with a gift

## Example Characters

1. **Santa Claus** - Wants handmade gifts
2. **Jingle the Elf** - Wants NFL/football items (max $50)
3. **Rudolph** - Wants winter accessories

## Next Steps

To integrate this into your app:

1. Add characters to the map in `VillageMap.tsx`
2. Handle character interactions (E key when nearby)
3. Show `QuestDialog` when talking to characters
4. Update quest status when gifts are selected
5. Show quest progress/completion in the UI

