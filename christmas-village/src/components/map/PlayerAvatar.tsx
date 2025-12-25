import type { Vec2 } from "../../model/world";

type PlayerAvatarProps = {
  position: Vec2;
};

export function PlayerAvatar({ position }: PlayerAvatarProps) {
  return (
    <circle
      cx={position.x}
      cy={position.y}
      r={8}
      fill="#ff6b6b"
      stroke="#fff"
      strokeWidth={2}
      style={{ pointerEvents: "none" }}
    />
  );
}

