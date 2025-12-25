import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Example API routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running!' });
});

// Example: Get shops (you can move this from frontend data later)
app.get('/api/shops', (req, res) => {
  res.json({
    shops: [
      {
        id: "uncommongoods",
        name: "Uncommon Goods",
        district: "WorkshopLane",
      },
      {
        id: "nflshop",
        name: "NFL Shop",
        district: "SportsRow",
      }
    ]
  });
});

// Example: Get gifts
app.get('/api/gifts', (req, res) => {
  res.json({
    gifts: [
      {
        id: "packers-hoodie",
        title: "Packers Hoodie",
        shopId: "nflshop",
        url: "https://www.nflshop.com/",
        tags: ["nfl", "clothing", "football"]
      }
    ]
  });
});

// Example: Get gifts by shop
app.get('/api/shops/:shopId/gifts', (req, res) => {
  const { shopId } = req.params;
  // In a real app, you'd query a database here
  res.json({
    gifts: shopId === "nflshop" ? [
      {
        id: "packers-hoodie",
        title: "Packers Hoodie",
        shopId: "nflshop",
        url: "https://www.nflshop.com/",
        tags: ["nfl", "clothing", "football"]
      }
    ] : []
  });
});

// Characters and Quests API
app.get('/api/characters', (req, res) => {
  res.json({
    characters: [
      {
        id: "santa",
        name: "Santa Claus",
        position: { x: 300, y: 300 },
        preferences: {
          likedTags: ["holiday", "christmas", "winter", "handmade"],
          dislikedTags: ["summer", "beach"],
        },
        quest: {
          id: "quest-santa-1",
          characterId: "santa",
          title: "Find a Handmade Gift",
          description: "I'm looking for something special that was made by hand. Check the Christmas Market!",
          requiredTags: ["handmade"],
          status: "active",
        },
      },
      {
        id: "elf",
        name: "Jingle the Elf",
        position: { x: 400, y: 200 },
        preferences: {
          likedTags: ["sports", "nfl", "football"],
          maxPrice: 50,
        },
        quest: {
          id: "quest-elf-1",
          characterId: "elf",
          title: "Football Fan Gift",
          description: "I need a gift for my friend who loves football! Something from the NFL shop would be perfect.",
          requiredTags: ["nfl", "football"],
          status: "active",
        },
      },
    ]
  });
});

app.get('/api/characters/:characterId', (req, res) => {
  const { characterId } = req.params;
  // In a real app, query database
  res.json({
    character: {
      id: characterId,
      name: "Character Name",
      // ... full character data
    }
  });
});

app.get('/api/characters/:characterId/quest', (req, res) => {
  const { characterId } = req.params;
  // Return the active quest for this character
  res.json({
    quest: {
      id: `quest-${characterId}-1`,
      characterId,
      title: "Find a Gift",
      description: "Help me find the perfect gift!",
      requiredTags: ["handmade"],
      status: "active",
    }
  });
});

// Complete a quest by giving a gift to a character
app.post('/api/characters/:characterId/complete-quest', (req, res) => {
  const { characterId } = req.params;
  const { giftId } = req.body;
  
  // In a real app, you'd:
  // 1. Verify the gift matches the quest requirements
  // 2. Update the quest status to "completed"
  // 3. Store which gift was used
  
  res.json({
    success: true,
    quest: {
      id: `quest-${characterId}-1`,
      characterId,
      status: "completed",
      completedGiftId: giftId,
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
});

