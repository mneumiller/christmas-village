# Understanding React State - A Simple Guide

## The Core Concept

**State = Data that can change, and when it changes, React automatically updates the screen**

## Example 1: Simple Counter

```javascript
function Counter() {
  // Create state: [currentValue, functionToUpdateIt] = useState(startingValue)
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Add 1</button>
    </div>
  );
}
```

**What happens:**
1. Component renders with `count = 0`
2. User clicks button → `setCount(1)` is called
3. React sees state changed → **automatically re-renders** the component
4. Screen shows `Count: 1`

## Example 2: From Your Code - Selected Shop

```javascript
// Line 12 in App.tsx
const [selectedShopId, setSelectedShopId] = useState<ShopId | undefined>();

// This means:
// - selectedShopId starts as undefined (no shop selected)
// - setSelectedShopId is the function to change it
```

**When you click a shop:**
```javascript
// Line 26 in App.tsx
setSelectedShopId(shopId);  // Changes state → React re-renders → UI updates!
```

## Example 3: From Your Code - World State

```javascript
// In useWorldState.ts, line 6-10
const [world, setWorld] = useState<WorldState>({
  mapId: "village",
  player: { position: { x: 100, y: 200 } },
  mode: "world",
});
```

**This stores:**
- Player position (x, y coordinates)
- Current mode ("world" or "shop")
- Which shop you're in (if any)

**When you move the player:**
```javascript
// Line 28-33 in useWorldState.ts
const updatePlayerPosition = (position) => {
  setWorld((prev) => ({
    ...prev,  // Keep everything else the same
    player: { position },  // Only update the position
  }));
};
```

**What happens:**
1. `updatePlayerPosition({ x: 150, y: 200 })` is called
2. `setWorld` updates the state
3. React re-renders components that use `world.player.position`
4. Avatar moves on screen!

## Key Rules

### 1. Always use the setter function
```javascript
// ❌ WRONG - Don't modify directly
world.mode = "shop";  // React won't know it changed!

// ✅ RIGHT - Use setWorld
setWorld(prev => ({ ...prev, mode: "shop" }));
```

### 2. State changes trigger re-renders
```javascript
// When this runs:
setSelectedShopId("nflshop");

// React automatically:
// 1. Updates selectedShopId
// 2. Re-runs the component function
// 3. Updates the screen
```

### 3. State persists between re-renders
```javascript
function App() {
  const [count, setCount] = useState(0);
  
  // Even though the function runs again, count keeps its value!
  // It doesn't reset to 0 each time
}
```

## Visual Flow

```
User Action (click, keypress)
    ↓
State Update (setCount, setWorld, etc.)
    ↓
React Detects Change
    ↓
Component Re-renders
    ↓
Screen Updates
```

## In Your Christmas Village App

**State Flow:**
1. **Player moves** → `updatePlayerPosition()` → `world.player.position` changes
2. **React sees change** → Re-renders `VillageMap`
3. **Avatar moves** on screen!

4. **User presses E near shop** → `enterShop()` → `world.mode` changes to "shop"
5. **React sees change** → Re-renders `App`
6. **Screen switches** from `WorldView` to `ShopView`!

## Common Confusion Points

### "Why not just use a regular variable?"
```javascript
// ❌ This doesn't work
let count = 0;
const increment = () => { count++; };  // Screen won't update!

// ✅ This works
const [count, setCount] = useState(0);
const increment = () => { setCount(count + 1); };  // Screen updates!
```

### "Why do I need the setter function?"
React needs to know when state changes so it can re-render. Direct assignment doesn't tell React.

### "What's the difference between state and props?"
- **State**: Data owned by this component, can change
- **Props**: Data passed FROM parent component, read-only

```javascript
// State - owned here, can change
const [playerX, setPlayerX] = useState(100);

// Props - passed from parent, can't change directly
function VillageMap({ playerPosition }) {
  // playerPosition comes from parent, we just use it
}
```

