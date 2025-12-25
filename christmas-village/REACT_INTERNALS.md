# How React Actually Detects State Changes - Implementation Details

## React's Internal Architecture

### 1. The Fiber Tree

React uses a data structure called a **Fiber** for each component:

```javascript
// Simplified Fiber structure
const fiber = {
  // Component info
  type: App,  // The component function
  stateNode: ...,  // The DOM node (if any)
  
  // State storage
  memoizedState: null,  // Where hooks store their state!
  
  // Linked list structure
  child: null,  // First child component
  sibling: null,  // Next sibling component
  return: null,  // Parent component
  
  // Update tracking
  updateQueue: null,  // Queue of state updates
  flags: 0,  // Flags like "needs update", "needs deletion"
};
```

### 2. How useState Actually Works

When you call `useState`, React:

```javascript
// Simplified React internals
let currentlyRenderingFiber = null;
let workInProgressHook = null;

function useState(initialValue) {
  // 1. Get the current fiber (component being rendered)
  const fiber = currentlyRenderingFiber;
  
  // 2. Check if this is first render or update
  if (fiber.memoizedState === null) {
    // First render: Create hook object
    const hook = {
      memoizedState: initialValue,  // Store the state value
      baseState: initialValue,
      queue: null,  // Queue for updates
      next: null,   // Next hook in linked list
    };
    
    fiber.memoizedState = hook;
    workInProgressHook = hook;
  } else {
    // Update: Get existing hook from linked list
    workInProgressHook = fiber.memoizedState;
  }
  
  // 3. Create setter function
  const setState = (newValue) => {
    // Create update object
    const update = {
      action: newValue,  // The new state value
      next: null,
    };
    
    // Add to update queue
    if (workInProgressHook.queue === null) {
      workInProgressHook.queue = update;
    } else {
      // Append to queue
      let last = workInProgressHook.queue;
      while (last.next !== null) {
        last = last.next;
      }
      last.next = update;
    }
    
    // Mark fiber as needing update
    fiber.flags |= Update;  // Binary flag: "needs update"
    
    // Schedule re-render
    scheduleUpdateOnFiber(fiber);
  };
  
  // 4. Process any pending updates
  let baseState = workInProgressHook.baseState;
  let queue = workInProgressHook.queue;
  
  if (queue !== null) {
    // Process all queued updates
    let update = queue;
    do {
      const action = update.action;
      baseState = typeof action === 'function' 
        ? action(baseState) 
        : action;
      update = update.next;
    } while (update !== null);
    
    workInProgressHook.memoizedState = baseState;
    workInProgressHook.baseState = baseState;
    workInProgressHook.queue = null;
  }
  
  return [workInProgressHook.memoizedState, setState];
}
```

### 3. The Update Queue System

React uses a **linked list** to queue state updates:

```javascript
// When you call setState multiple times:
setWorld({ mode: "shop" });
setWorld({ mode: "world" });

// React creates a queue:
hook.queue = {
  action: { mode: "shop" },
  next: {
    action: { mode: "world" },
    next: null
  }
};

// During re-render, React processes the queue:
// 1. Apply first update: { mode: "shop" }
// 2. Apply second update: { mode: "world" }
// 3. Final state: { mode: "world" }
```

### 4. How React Tracks Which Components Need Updates

React uses **flags** (binary markers) on fibers:

```javascript
// Fiber flags (simplified)
const Update = 0b0000000000000000001;  // Binary: 1
const Placement = 0b0000000000000000010;  // Binary: 2
const Deletion = 0b0000000000000000100;  // Binary: 4

// When setState is called:
fiber.flags |= Update;  // Sets the "Update" bit to 1

// React can check:
if (fiber.flags & Update) {
  // This component needs to re-render!
}
```

### 5. The Scheduler

React uses a **scheduler** to batch and prioritize updates:

```javascript
// Simplified scheduler
const taskQueue = [];
let isScheduled = false;

function scheduleUpdateOnFiber(fiber) {
  // Mark fiber as needing update
  fiber.flags |= Update;
  
  // Add to task queue
  taskQueue.push(fiber);
  
  // Schedule work if not already scheduled
  if (!isScheduled) {
    isScheduled = true;
    scheduleCallback(performWork);
  }
}

function performWork() {
  while (taskQueue.length > 0) {
    const fiber = taskQueue.shift();
    renderFiber(fiber);  // Re-render the component
  }
  isScheduled = false;
}
```

### 6. The Reconciliation Process

When React re-renders, it uses **diffing**:

```javascript
// Simplified reconciliation
function reconcileChildren(currentFiber, newChildren) {
  let oldChild = currentFiber.child;
  let newChild = newChildren;
  
  while (oldChild !== null && newChild !== null) {
    // Compare old vs new
    if (oldChild.type === newChild.type) {
      // Same type - update in place
      updateFiber(oldChild, newChild.props);
    } else {
      // Different type - replace
      replaceFiber(oldChild, newChild);
    }
    
    oldChild = oldChild.sibling;
    newChild = newChild.sibling;
  }
}
```

### 7. Hooks Are Stored in a Linked List

React stores hooks in order using a linked list:

```javascript
// First render:
function App() {
  const [world, setWorld] = useState(...);      // Hook #1
  const [shopId, setShopId] = useState(...);    // Hook #2
}

// React creates:
fiber.memoizedState = {
  memoizedState: worldValue,
  next: {
    memoizedState: shopIdValue,
    next: null
  }
};

// On re-render, React walks the list:
let hook = fiber.memoizedState;  // First hook
hook = hook.next;  // Second hook
```

**This is why hooks must be called in the same order!**

### 8. Object Reference Comparison

React uses **reference equality** to detect changes:

```javascript
// React checks: oldState === newState
// If references are the same, React assumes nothing changed

// This is why this doesn't work:
world.mode = "shop";  // Same object reference, React thinks nothing changed

// But this works:
setWorld({ ...world, mode: "shop" });  // New object reference, React detects change
```

### 9. The Actual Detection Mechanism

```javascript
// When setState is called:
function setState(newValue) {
  // 1. Create update object
  const update = { action: newValue, next: null };
  
  // 2. Add to queue
  enqueueUpdate(hook.queue, update);
  
  // 3. Mark fiber
  fiber.flags |= Update;
  
  // 4. Schedule work
  if (fiber === currentlyRenderingFiber) {
    // Update during render - mark for next render
    didScheduleRenderPhaseUpdate = true;
  } else {
    // Update outside render - schedule immediately
    scheduleUpdateOnFiber(fiber);
  }
}

// During render, React processes updates:
function updateFunctionComponent(fiber) {
  // Set current fiber
  currentlyRenderingFiber = fiber;
  
  // Reset hooks
  fiber.memoizedState = null;
  workInProgressHook = null;
  
  // Call component function (this calls useState)
  const children = fiber.type(fiber.props);
  
  // Process hook updates
  let hook = fiber.memoizedState;
  while (hook !== null) {
    if (hook.queue !== null) {
      // Process queued updates
      processUpdateQueue(hook);
    }
    hook = hook.next;
  }
  
  // Reconcile children
  reconcileChildren(fiber, children);
}
```

### 10. Batching Updates

React batches multiple setState calls:

```javascript
// If you call:
setWorld({ mode: "shop" });
setSelectedShopId("nflshop");

// React doesn't render twice. Instead:
// 1. Both updates are queued
// 2. React schedules ONE render
// 3. During that render, both state updates are applied
// 4. Component re-renders once with both changes
```

## The Complete Flow

```
User Action (click, keypress)
    ↓
setState() called
    ↓
1. Create update object
2. Add to hook.queue (linked list)
3. Set fiber.flags |= Update (binary flag)
4. Add fiber to scheduler queue
    ↓
Scheduler picks up fiber
    ↓
React calls component function
    ↓
useState() called again
    ↓
1. Get hook from fiber.memoizedState (linked list)
2. Process hook.queue (apply all updates)
3. Return new state value
    ↓
Component returns new JSX
    ↓
React reconciles (diffs old vs new)
    ↓
Update DOM (only changed parts)
```

## Key Data Structures

1. **Fiber Tree**: Tree of component nodes
2. **Hook Linked List**: Stores hooks in order
3. **Update Queue**: Linked list of state updates
4. **Flags**: Binary markers for what needs updating
5. **Scheduler Queue**: Priority queue of work to do

## Why Direct Mutation Doesn't Work

```javascript
// When you do:
world.mode = "shop";

// React's internal storage still has:
fiber.memoizedState.memoizedState = { mode: "world" }  // Old value!

// React checks:
oldState === newState  // true (same object reference)
// React thinks: "Nothing changed, skip update"

// But when you do:
setWorld({ ...world, mode: "shop" });

// React:
// 1. Creates update object
// 2. Queues it
// 3. Marks fiber for update
// 4. During render, processes queue
// 5. Updates memoizedState with new object
// 6. oldState !== newState (different reference)
// 7. React knows something changed!
```

## Summary: The Actual Mechanism

1. **Storage**: State stored in `fiber.memoizedState` (linked list of hooks)
2. **Updates**: Queued in `hook.queue` (linked list of update objects)
3. **Tracking**: Binary flags on fiber (`fiber.flags |= Update`)
4. **Scheduling**: Fibers added to scheduler queue
5. **Detection**: Reference comparison (`oldState !== newState`)
6. **Processing**: Updates applied during render phase
7. **Reconciliation**: Diffing algorithm compares old vs new JSX

The "magic" is really just:
- Linked lists for storage
- Binary flags for tracking
- Queue system for batching
- Reference comparison for change detection

