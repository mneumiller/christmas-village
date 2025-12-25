import type { ShoppingBag } from "../../model/shoppingBag";
import type { Gift } from "../../model/gift";
import { getBagTotal, getBagItemCount } from "../../model/shoppingBag";

type ShoppingBagProps = {
  bag: ShoppingBag;
  onRemoveItem: (giftId: string) => void;
};

export function ShoppingBagPanel({ bag, onRemoveItem }: ShoppingBagProps) {
  const total = getBagTotal(bag);
  const itemCount = getBagItemCount(bag);

  return (
    <div
      style={{
        padding: 16,
        border: "1px solid #ddd",
        borderRadius: 8,
        backgroundColor: "#f9f9f9",
        marginTop: 24,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h3 style={{ margin: 0, color: "#333" }}>🛍️ Shopping Bag</h3>
        <span style={{ fontSize: 14, color: "#666", fontWeight: "bold" }}>
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </span>
      </div>

      {bag.items.length === 0 ? (
        <p style={{ color: "#666", fontStyle: "italic", margin: 0 }}>
          Your bag is empty. Start shopping!
        </p>
      ) : (
        <>
          <div style={{ marginBottom: 12 }}>
            {bag.items.map((item) => (
              <div
                key={item.gift.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 0",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "bold", fontSize: 14, color: "#333" }}>
                    {item.gift.title}
                    {item.quantity > 1 && (
                      <span style={{ color: "#666", fontWeight: "normal", marginLeft: 8 }}>
                        ×{item.quantity}
                      </span>
                    )}
                  </div>
                  {item.gift.priceUsd && (
                    <div style={{ fontSize: 12, color: "#666" }}>
                      ${item.gift.priceUsd.toFixed(2)} each
                    </div>
                  )}
                </div>
                <button
                  onClick={() => onRemoveItem(item.gift.id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#ff6b6b",
                    cursor: "pointer",
                    fontSize: 18,
                    padding: "4px 8px",
                  }}
                  title="Remove from bag"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div
            style={{
              paddingTop: 12,
              borderTop: "2px solid #ddd",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </>
      )}
    </div>
  );
}

