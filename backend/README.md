# Christmas Village Backend

A simple Express.js backend server for the Christmas Village app.

## Setup

1. Install dependencies:
```bash
npm install
```

## Running

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm run build
npm start
```

The server will run on `http://localhost:3001`

## API Endpoints

- `GET /api/health` - Health check endpoint
- `GET /api/shops` - Get all shops
- `GET /api/gifts` - Get all gifts
- `GET /api/shops/:shopId/gifts` - Get gifts for a specific shop

## Adding New Endpoints

Edit `src/server.ts` to add new API routes.

