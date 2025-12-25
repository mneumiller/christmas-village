# Code Organization

## New Structure

The codebase has been refactored for better organization and maintainability.

### 📁 Directory Structure

```
src/
├── components/          # React components
│   ├── map/            # Map rendering components
│   │   ├── VillageMap.tsx         # Main map component
│   │   ├── ShopMarker.tsx         # Shop rendering
│   │   ├── CharacterMarker.tsx    # Character rendering
│   │   ├── PlayerAvatar.tsx       # Player dot rendering
│   │   └── InteractionPrompt.tsx # "Press E" prompts
│   ├── views/          # Full screen views
│   │   ├── WorldView.tsx          # World view container
│   │   └── ShopView.tsx           # Shop view screen
│   └── ui/             # UI components & dialogs
│       ├── QuestDialog.tsx        # Quest dialog modal
│       └── ControlsPanel.tsx      # Controls info panel
│
├── hooks/              # Custom React hooks
│   ├── useDarkMode.ts         # Dark mode detection
│   ├── useInteractions.ts     # Nearby shop/character detection
│   ├── useKeyboardControls.ts # Keyboard input handling
│   └── useWorldState.ts       # World state management
│
├── utils/              # Utility functions
│   ├── api.ts                 # Backend API calls
│   ├── math.ts                # Math utilities (distance, etc.)
│   ├── questMatching.ts       # Quest/gift matching logic
│   └── shop.ts                # Shop-related utilities
│
├── constants.ts        # Game constants (distances, sizes, etc.)
├── model/              # TypeScript type definitions
└── data/               # Static data (shops, characters, gifts)
```

## Key Improvements

### 1. **Separated Concerns**
- **VillageMap.tsx**: Reduced from 308 lines to ~120 lines
- Shop rendering logic → `ShopMarker.tsx`
- Character rendering → `CharacterMarker.tsx`
- Player rendering → `PlayerAvatar.tsx`
- Interaction prompts → `InteractionPrompt.tsx`

### 2. **Reusable Components**
- `ShopMarker` handles both image and non-image shops
- `InteractionPrompt` reusable for any interaction message
- Components are self-contained and testable

### 3. **Extracted Utilities**
- Math functions → `utils/math.ts`
- Shop utilities → `utils/shop.ts`
- All constants → `constants.ts`

### 4. **Custom Hooks**
- `useDarkMode` - Centralized dark mode detection
- `useInteractions` - Nearby detection logic
- Makes components cleaner and logic reusable

### 5. **Better Type Safety**
- All components have proper TypeScript types
- Utilities are typed
- No `any` types

## Benefits

✅ **Easier to maintain** - Each file has a single responsibility  
✅ **Easier to test** - Small, focused functions  
✅ **Easier to extend** - Add new shops/characters without touching core logic  
✅ **Better readability** - Clear structure, less nesting  
✅ **Reusable code** - Components and utilities can be reused  

## Adding New Features

### Add a new shop with image:
1. Add image to `assets/`
2. Add to `SHOP_IMAGES` mapping in `components/map/VillageMap.tsx`
3. Add shop data to `data/shops.ts`

### Add a new character:
1. Add character data to `data/characters.ts`
2. `components/map/CharacterMarker` will automatically render it

### Add a new utility:
1. Create file in `utils/` folder
2. Export functions
3. Import where needed

