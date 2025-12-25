import { useEffect, useState } from "react";
import type { Character } from "../../model/character";
import type { Gift } from "../../model/gift";
import type { ShoppingBag } from "../../model/shoppingBag";
import { giftMatchesQuest } from "../../utils/questMatching";
import { evaluateGift } from "../../utils/giftEvaluation";

type QuestDialogProps = {
  character: Character;
  shoppingBag: ShoppingBag;
  onClose: () => void;
  onGiveGift: (characterId: string, giftId: string) => void;
};

export function QuestDialog({ character, shoppingBag, onClose, onGiveGift }: QuestDialogProps) {
  const [lastGiftGiven, setLastGiftGiven] = useState<{ gift: Gift; evaluation: ReturnType<typeof evaluateGift> } | null>(null);
  const [questCompleted, setQuestCompleted] = useState(false);

  // Show dialog if quest is active OR if we're showing feedback (even if quest was just completed)
  const shouldShowDialog = character.quest && (character.quest.status === "active" || lastGiftGiven !== null);
  
  if (!shouldShowDialog || !character.quest) {
    return null;
  }

  const quest = character.quest;
  const bagGifts = shoppingBag.items.map(item => item.gift);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleGiveGift = (gift: Gift) => {
    const evalResult = evaluateGift(gift, character);
    setLastGiftGiven({ gift, evaluation: evalResult });
    
    // If it matches the quest, mark it as completed
    if (evalResult.matchesQuest && !questCompleted) {
      setQuestCompleted(true);
      onGiveGift(character.id, gift.id);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: 24,
          borderRadius: 8,
          maxWidth: 500,
          maxHeight: "80vh",
          overflow: "auto",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ margin: 0 }}>{character.name}'s Quest</h2>
          <button 
            onClick={onClose} 
            style={{ 
              background: "none", 
              border: "none", 
              fontSize: 24, 
              cursor: "pointer",
              padding: "4px 8px",
              borderRadius: 4,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f0f0f0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
            title="Close (ESC)"
          >
            ×
          </button>
        </div>
        <div style={{ fontSize: 12, color: "#999", marginBottom: 16 }}>
          Press ESC or click outside to close
        </div>

        {questCompleted && (
          <div style={{ 
            padding: 12, 
            backgroundColor: "#e8f5e9", 
            borderRadius: 4, 
            color: "#2e7d32",
            fontWeight: "bold",
            marginBottom: 16,
            border: "2px solid #4CAF50"
          }}>
            ✓ Quest completed! You can still give more gifts if you'd like.
          </div>
        )}

        {lastGiftGiven && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ 
              padding: 16, 
              borderRadius: 8, 
              backgroundColor: (() => {
                const ratingColors = {
                  excellent: "#4CAF50",
                  good: "#8BC34A",
                  okay: "#FFC107",
                  poor: "#F44336",
                };
                return ratingColors[lastGiftGiven.evaluation.rating] + "20";
              })(),
              border: `2px solid ${(() => {
                const ratingColors = {
                  excellent: "#4CAF50",
                  good: "#8BC34A",
                  okay: "#FFC107",
                  poor: "#F44336",
                };
                return ratingColors[lastGiftGiven.evaluation.rating];
              })()}`,
            }}>
              <div style={{ fontWeight: "bold", color: (() => {
                const ratingColors = {
                  excellent: "#4CAF50",
                  good: "#8BC34A",
                  okay: "#FFC107",
                  poor: "#F44336",
                };
                return ratingColors[lastGiftGiven.evaluation.rating];
              })(), marginBottom: 8 }}>
                {lastGiftGiven.evaluation.rating === "excellent" && "🌟 Excellent!"}
                {lastGiftGiven.evaluation.rating === "good" && "👍 Good!"}
                {lastGiftGiven.evaluation.rating === "okay" && "😐 Okay"}
                {lastGiftGiven.evaluation.rating === "poor" && "😕 Not Great"}
              </div>
              <p style={{ margin: 0, color: "#333", fontSize: 16, lineHeight: 1.5, marginBottom: 8 }}>
                "{lastGiftGiven.evaluation.message}"
              </p>
              <div style={{ fontSize: 14, color: "#666" }}>
                <strong>Gift given:</strong> {lastGiftGiven.gift.title}
              </div>
            </div>
          </div>
        )}

        <div style={{ marginBottom: 16 }}>
          <h3 style={{ marginTop: 0 }}>{quest.title}</h3>
          <p style={{ color: "#666" }}>{quest.description}</p>
        </div>

        <div style={{ marginBottom: 16 }}>
          <strong>Requirements:</strong>
          <ul>
            <li>Must have tags: {quest.requiredTags.join(", ")}</li>
            {quest.excludedTags && quest.excludedTags.length > 0 && (
              <li>Must NOT have: {quest.excludedTags.join(", ")}</li>
            )}
            {quest.maxPrice && <li>Maximum price: ${quest.maxPrice}</li>}
          </ul>
        </div>

        <div>
          <strong>Gifts in Your Bag ({bagGifts.length}):</strong>
          {bagGifts.length > 0 ? (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {bagGifts.map((gift) => {
                const matchesQuest = giftMatchesQuest(gift, quest);
                return (
                  <li
                    key={gift.id}
                    style={{
                      padding: 12,
                      marginBottom: 8,
                      border: matchesQuest ? "2px solid #4CAF50" : "1px solid #ddd",
                      borderRadius: 4,
                      backgroundColor: matchesQuest ? "#e8f5e9" : "white",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: "bold", color: "#333" }}>
                          {gift.title}
                        </div>
                        <div style={{ fontSize: 12, color: "#666" }}>
                          Tags: {gift.tags.join(", ")}
                          {gift.priceUsd && ` • $${gift.priceUsd.toFixed(2)}`}
                        </div>
                      </div>
                      <button
                        onClick={() => handleGiveGift(gift)}
                        style={{
                          padding: "8px 16px",
                          cursor: "pointer",
                          backgroundColor: matchesQuest ? "#4CAF50" : "#0066cc",
                          color: "white",
                          border: "none",
                          borderRadius: 4,
                          fontWeight: "bold",
                          marginLeft: 12,
                        }}
                      >
                        Give Gift
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p style={{ color: "#999", fontStyle: "italic" }}>
              Your bag is empty! Go shopping first, then come back to give me a gift.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

