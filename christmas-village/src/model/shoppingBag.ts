import type { Gift } from "./gift";

export type ShoppingBagItem = {
  gift: Gift;
  quantity: number;
  addedAt: Date;
};

export type ShoppingBag = {
  items: ShoppingBagItem[];
};

export function addToBag(bag: ShoppingBag, gift: Gift): ShoppingBag {
  const existingItem = bag.items.find(item => item.gift.id === gift.id);
  
  if (existingItem) {
    // Increase quantity if item already exists
    return {
      items: bag.items.map(item =>
        item.gift.id === gift.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    };
  } else {
    // Add new item
    return {
      items: [...bag.items, { gift, quantity: 1, addedAt: new Date() }],
    };
  }
}

export function removeFromBag(bag: ShoppingBag, giftId: string): ShoppingBag {
  return {
    items: bag.items.filter(item => item.gift.id !== giftId),
  };
}

export function getBagTotal(bag: ShoppingBag): number {
  return bag.items.reduce((total, item) => {
    const itemPrice = item.gift.priceUsd || 0;
    return total + (itemPrice * item.quantity);
  }, 0);
}

export function getBagItemCount(bag: ShoppingBag): number {
  return bag.items.reduce((total, item) => total + item.quantity, 0);
}

