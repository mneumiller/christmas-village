import { useState } from "react";
import type { Shop } from "../../model/shop";
import type { Gift } from "../../model/gift";
import type { ShoppingBag } from "../../model/shoppingBag";
import { ShoppingBagPanel } from "../ui/ShoppingBag";

type ShopViewProps = {
  shop: Shop;
  gifts: Gift[];
  onExit: () => void;
  onAddToBag: (gift: Gift) => void;
  shoppingBag: ShoppingBag;
  onRemoveFromBag: (giftId: string) => void;
};

export function ShopView({ shop, gifts, onExit, onAddToBag, shoppingBag, onRemoveFromBag }: ShopViewProps) {
  const [addedGiftId, setAddedGiftId] = useState<string | null>(null);

  const handleAddToBag = (gift: Gift) => {
    onAddToBag(gift);
    setAddedGiftId(gift.id);
    // Clear the success message after 2 seconds
    setTimeout(() => setAddedGiftId(null), 2000);
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 24, marginTop: 24 }}>
      <div>
        <div style={{ padding: 16, border: "1px solid #ddd", borderRadius: 8, backgroundColor: "#f9f9f9" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ margin: 0, color: "#333" }}>{shop.name}</h2>
            <button 
              onClick={onExit}
              style={{ padding: "8px 16px", cursor: "pointer", backgroundColor: "#0066cc", color: "white", border: "none", borderRadius: 4 }}
            >
              Exit Shop (ESC)
            </button>
          </div>
          <p style={{ color: "#666", fontSize: 14 }}>District: {shop.district}</p>
        </div>
        <ShoppingBagPanel bag={shoppingBag} onRemoveItem={onRemoveFromBag} />
      </div>

      <div>
        {gifts.length > 0 ? (
          <div style={{ padding: 16, border: "1px solid #ddd", borderRadius: 8, backgroundColor: "#f9f9f9" }}>
            <h3 style={{ fontSize: 16, marginBottom: 16, color: "#333" }}>Available Gifts:</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {gifts.map((gift) => {
                const isAdded = addedGiftId === gift.id;
                return (
                  <div
                    key={gift.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 12,
                      border: isAdded ? "2px solid #4CAF50" : "1px solid #ddd",
                      borderRadius: 4,
                      backgroundColor: isAdded ? "#e8f5e9" : "white",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: "bold", marginBottom: 4 }}>
                        <a 
                          href={gift.url.toString()} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          style={{ color: "#0066cc", textDecoration: "none" }}
                        >
                          {gift.title}
                        </a>
                      </div>
                      <div style={{ fontSize: 12, color: "#666" }}>
                        {gift.tags.join(", ")}
                        {gift.priceUsd && ` • $${gift.priceUsd.toFixed(2)}`}
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddToBag(gift)}
                      style={{
                        padding: "8px 16px",
                        cursor: "pointer",
                        backgroundColor: isAdded ? "#4CAF50" : "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: 4,
                        fontWeight: "bold",
                        minWidth: 120,
                        transition: "all 0.3s ease",
                      }}
                    >
                      {isAdded ? "✓ Added!" : "Add to Bag"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div style={{ padding: 16, border: "1px solid #ddd", borderRadius: 8, backgroundColor: "#f9f9f9" }}>
            <p style={{ color: "#666" }}>No gifts available in this shop.</p>
          </div>
        )}
      </div>
    </div>
  );
}

