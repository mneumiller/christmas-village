// Example API utility functions for calling the backend

const API_BASE_URL = '/api'; // Uses Vite proxy in dev, or set to full URL in production

export async function fetchShops() {
  const response = await fetch(`${API_BASE_URL}/shops`);
  if (!response.ok) {
    throw new Error('Failed to fetch shops');
  }
  return response.json();
}

export async function fetchGifts() {
  const response = await fetch(`${API_BASE_URL}/gifts`);
  if (!response.ok) {
    throw new Error('Failed to fetch gifts');
  }
  return response.json();
}

export async function fetchGiftsByShop(shopId: string) {
  const response = await fetch(`${API_BASE_URL}/shops/${shopId}/gifts`);
  if (!response.ok) {
    throw new Error(`Failed to fetch gifts for shop ${shopId}`);
  }
  return response.json();
}

// Character and Quest APIs
export async function fetchCharacters() {
  const response = await fetch(`${API_BASE_URL}/characters`);
  if (!response.ok) {
    throw new Error('Failed to fetch characters');
  }
  return response.json();
}

export async function fetchCharacter(characterId: string) {
  const response = await fetch(`${API_BASE_URL}/characters/${characterId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch character ${characterId}`);
  }
  return response.json();
}

export async function fetchCharacterQuest(characterId: string) {
  const response = await fetch(`${API_BASE_URL}/characters/${characterId}/quest`);
  if (!response.ok) {
    throw new Error(`Failed to fetch quest for character ${characterId}`);
  }
  return response.json();
}

export async function completeQuest(characterId: string, giftId: string) {
  const response = await fetch(`${API_BASE_URL}/characters/${characterId}/complete-quest`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ giftId }),
  });
  if (!response.ok) {
    throw new Error(`Failed to complete quest for character ${characterId}`);
  }
  return response.json();
}

