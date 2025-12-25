import type { Vec2 } from "../../model/world";
import playerImage from "../../assets/me.png";

type PlayerAvatarProps = {
  position: Vec2;
};

const PLAYER_SIZE = 100;

export function PlayerAvatar({ position }: PlayerAvatarProps) {
  return (
    <image
      x={position.x - PLAYER_SIZE / 2}
      y={position.y - PLAYER_SIZE / 2}
      width={PLAYER_SIZE}
      height={PLAYER_SIZE}
      href={playerImage}
      preserveAspectRatio="xMidYMid meet"
      style={{ pointerEvents: "none" }}
    />
  );
}

