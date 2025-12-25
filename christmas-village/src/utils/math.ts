import type { Vec2 } from "../model/world";

export function getDistance(pos1: Vec2, pos2: Vec2): number {
  const dx = pos1.x - pos2.x;
  const dy = pos1.y - pos2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

