import { MAP_WIDTH, MAP_HEIGHT } from "../../constants";
import type { Vec2 } from "../../model/world";

type InteractionPromptProps = {
  position: Vec2;
  message: string;
};

export function InteractionPrompt({ position, message }: InteractionPromptProps) {
  return (
    <div
      style={{
        position: "absolute",
        top: `${(position.y / MAP_HEIGHT) * 100}%`,
        left: `${(position.x / MAP_WIDTH) * 100}%`,
        transform: "translate(-50%, -100%)",
        marginTop: -8,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        color: "white",
        padding: "8px 12px",
        borderRadius: 4,
        fontSize: 12,
        pointerEvents: "none",
        whiteSpace: "nowrap",
        zIndex: 10,
      }}
    >
      {message}
    </div>
  );
}

