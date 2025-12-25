import { useEffect } from "react";
import type { Vec2 } from "../model/world";

type UseKeyboardControlsProps = {
  mode: "world" | "shop";
  currentPosition: Vec2;
  onMove: (position: Vec2) => void;
  onExitShop: () => void;
  bounds: { width: number; height: number };
};

export function useKeyboardControls({
  mode,
  currentPosition,
  onMove,
  onExitShop,
  bounds,
}: UseKeyboardControlsProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (mode === "shop") {
        if (e.key === "Escape") {
          onExitShop();
        }
        return;
      }

      const baseSpeed = 5;
      const speed = (e.metaKey || e.shiftKey) ? baseSpeed * 5 : baseSpeed; // Command or Shift key increases speed 5x
      let newPosition: Vec2 | null = null;

      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        newPosition = { ...currentPosition, y: Math.max(0, currentPosition.y - speed) };
      } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
        newPosition = { ...currentPosition, y: Math.min(bounds.height, currentPosition.y + speed) };
      } else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        newPosition = { ...currentPosition, x: Math.max(0, currentPosition.x - speed) };
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        newPosition = { ...currentPosition, x: Math.min(bounds.width, currentPosition.x + speed) };
      }

      if (newPosition) {
        onMove(newPosition);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mode, currentPosition, onMove, onExitShop, bounds]);
}

