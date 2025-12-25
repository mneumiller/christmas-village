# christmas-village

## Quick Start

### Running the Frontend
```bash
cd christmas-village
npm install
npm run dev
```

### Running the Backend
```bash
cd backend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` (Vite default)
The backend runs on `http://localhost:3001`

The frontend is configured to proxy `/api` requests to the backend automatically.

## UX flow

- Start in Village map with a movable avatar.
- Move around the 2D world (click-to-move in V1, keyboard in V2).
- When near a shop door, show prompt: "Enter {Shop}".
- Entering switches to Shop view (gift shelf + shortlist).
- Exiting returns to the world at the shop door.
- Gates move between maps (e.g., Main Street -> Sports Row).

V1 Explore: 2D world, click-to-move

Fastest way to get the vibe without building physics.

State you need

playerPos: { x, y }

mode: "world" | "shop"

selectedShopId?: ShopId

Map rules

Buildings are rectangles (you already have them).

Each building has a “door” point (add one):

door: { x, y }

“Near door” = distance threshold (e.g., 20px)

UX

In world mode:

click anywhere → set playerPos to that point

if near a door → show “Press E to enter Uncommon Goods”

pressing E sets mode="shop" and selectedShopId=...

In shop mode:

show shop panel

“Exit” button returns to world, player stays at door

This gives you “walking through a place” immediately.

V2 Explore: keyboard movement

Add:

WASD movement

basic collision with building rectangles (optional at first)

camera/panning (only if the map is bigger than the viewport)

V3 Explore: multiple maps + gates

Add “gates” on the edges that teleport you to another map:

gate: bounds + destinationMapId + spawnPoint

Now it becomes district exploration.