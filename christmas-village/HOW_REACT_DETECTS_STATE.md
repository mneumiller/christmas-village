# How React Detects State Changes - The Magic Explained

## The Secret: React Tracks State Internally

When you call `useState`, React doesn't just give you a variable. It creates a **tracking system**.

## What Really Happens

### Step 1: useState Creates a "Subscription"

```typescript
// When you write this:
const [world, setWorld] = useState({ mode: "world" });

// React internally does something like:
// 1. Creates a storage slot for this component
// 2. Stores the initial value: { mode: "world" }
// 3. Creates a special setWorld function that:
//    - Updates the stored value
//    - Marks the component as "dirty" (needs re-render)
//    - Schedules a re-render
```

### Step 2: The Setter Function is Special

```typescript
// This isn't just a regular function:
setWorld(newValue);

// React's internal setWorld does:
function setWorld(newValue) {
  // 1. Update the stored value
  internalStateStorage[componentId] = newValue;
  
  // 2. Mark component as needing update
  markComponentForUpdate(componentId);
  
  // 3. Schedule a re-render
  scheduleRender();
}
```

## Visual Flow

```
You call: setWorld({ mode: "shop" })
    ↓
React's setWorld function runs
    ↓
1. Updates internal storage
2. Marks component as "dirty"
3. Adds to re-render queue
    ↓
React's scheduler picks it up
    ↓
React re-runs your component function
    ↓
Component returns new JSX
    ↓
React compares old vs new JSX (diffing)
    ↓
Updates only what changed in the DOM
```

## Why Direct Assignment Doesn't Work

```typescript
// ❌ This doesn't work:
world.mode = "shop";

// Why? Because:
// 1. You're modifying the object directly
// 2. React has no way to know you did this
// 3. React's internal storage still has the old value
// 4. No component is marked as "dirty"
// 5. No re-render is scheduled
// 6. Screen doesn't update!
```

React can't "watch" every variable. It only knows about changes when you use the setter function.

## React's Internal Tracking System

Think of it like a library system:

```typescript
// React maintains something like this internally:
const componentStates = {
  "App-123": {
    world: { mode: "world", player: { position: { x: 100, y: 200 } } },
    selectedShopId: undefined
  },
  "VillageMap-456": {
    hoveredShopId: undefined
  }
};

// When you call setWorld:
setWorld(newValue);
// React updates: componentStates["App-123"].world = newValue
// And marks "App-123" as needing a re-render
```

## Real Example from Your Code

### When you press Arrow Right:

```typescript
// 1. useKeyboardControls detects keypress
if (e.key === "ArrowRight") {
  newPosition = { x: currentPosition.x + 5, y: currentPosition.y };
  onMove(newPosition);  // This calls updatePlayerPosition
}

// 2. updatePlayerPosition runs (line 28-33 in useWorldState.ts)
updatePlayerPosition({ x: 105, y: 200 });

// 3. Inside updatePlayerPosition:
setWorld((prev) => ({
  ...prev,
  player: { position: { x: 105, y: 200 } }
}));

// 4. React's setWorld:
//    - Updates internal storage
//    - Sees the value changed (old: x:100, new: x:105)
//    - Marks component as "dirty"
//    - Schedules re-render

// 5. React re-renders:
//    - Re-runs useWorldState() hook
//    - Returns new world object with updated position
//    - Re-runs App component
//    - Re-runs VillageMap with new playerPosition prop
//    - Avatar circle moves to new position
```

## React's Reconciliation (The Diffing Process)

After state changes, React doesn't rebuild everything. It's smart:

```typescript
// Before state change:
<div>
  <circle cx={100} cy={200} />  // Avatar at x:100
</div>

// After setWorld updates position to x:105:
<div>
  <circle cx={105} cy={200} />  // Avatar at x:105
</div>

// React compares:
// - Same <div>? Yes, keep it
// - Same <circle>? Yes, but cx changed
// - Only update: cx="100" → cx="105"
// - DOM update: Only the cx attribute changes!
```

## Batching Updates

React is smart about multiple state updates:

```typescript
// If you do this:
setWorld({ ...world, mode: "shop" });
setSelectedShopId("nflshop");

// React doesn't re-render twice!
// Instead:
// 1. Both updates are queued
// 2. React batches them together
// 3. One re-render happens with both changes
```

## The Component Lifecycle

```
Component First Renders
    ↓
useState creates state + setter
    ↓
Component returns JSX
    ↓
[User interacts - clicks, types, etc.]
    ↓
Setter function called (setWorld, setSelectedShopId, etc.)
    ↓
React detects state change
    ↓
Component marked for re-render
    ↓
React re-runs component function
    ↓
New JSX returned
    ↓
React compares old vs new (diffing)
    ↓
DOM updated (only changed parts)
    ↓
Screen updates!
```

## Key Insight: React is Reactive

The name "React" comes from this: React **reacts** to state changes.

```typescript
// React = "Reactive"
// When state changes → React reacts → UI updates
```

## Why Hooks Must Be Called in Order

React tracks state by the **order** hooks are called:

```typescript
function App() {
  const [world, setWorld] = useState(...);      // Hook #1
  const [selectedShopId, setSelectedShopId] = useState(...);  // Hook #2
  
  // React tracks:
  // - First useState call = state slot #1
  // - Second useState call = state slot #2
}
```

This is why you can't call hooks conditionally - React needs the same order every render!

## Summary

**How React detects state changes:**

1. **useState creates a tracking system** - React stores state internally
2. **Setter functions are special** - They update storage AND mark component as dirty
3. **React schedules re-renders** - When state changes, component is queued
4. **React re-runs component** - Component function executes again
5. **React diffs the output** - Compares old JSX vs new JSX
6. **DOM updates efficiently** - Only changed parts are updated

**The magic:** React can't read your mind. It only knows about changes when you use the setter function. That's why you must use `setWorld()` instead of `world.mode = "shop"`.

