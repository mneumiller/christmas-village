import type { Shop } from "../../model/shop";
import type { Vec2 } from "../../model/world";
import { getShopCenter } from "../../utils/shop";

type ShopMarkerProps = {
  shop: Shop;
  isSelected: boolean;
  isHovered: boolean;
  isNearby: boolean;
  isDarkMode: boolean;
  onSelect: (id: Shop["id"]) => void;
  onMouseEnter: (id: Shop["id"]) => void;
  onMouseLeave: () => void;
  shopImage?: string;
};

export function ShopMarker({
  shop,
  isSelected,
  isHovered,
  isNearby,
  isDarkMode,
  onSelect,
  onMouseEnter,
  onMouseLeave,
  shopImage,
}: ShopMarkerProps) {
  const shopCenterX = shop.building.x + shop.building.width / 2;
  const shopTopY = shop.building.y;

  // Render shop with image
  if (shopImage) {
    return (
      <g
        key={shop.id}
        onClick={() => onSelect(shop.id)}
        onMouseEnter={() => onMouseEnter(shop.id)}
        onMouseLeave={onMouseLeave}
        style={{ cursor: "pointer" }}
      >
        {/* Optional border/outline for selected/hovered state */}
        {(isSelected || isHovered || isNearby) && (
          <rect
            x={shop.building.x - 2}
            y={shop.building.y - 2}
            width={shop.building.width + 4}
            height={shop.building.height + 4}
            stroke={isSelected ? "#0066cc" : isHovered ? "#0099ff" : "#00cc00"}
            strokeWidth={isSelected ? 3 : 2}
            fill="none"
            pointerEvents="none"
          />
        )}
        <image
          x={shop.building.x}
          y={shop.building.y}
          width={shop.building.width}
          height={shop.building.height}
          href={shopImage}
          pointerEvents="all"
        />
        <text
          x={shopCenterX}
          y={shopTopY - 8}
          fontSize={11}
          pointerEvents="none"
          fill={isSelected ? "#0066cc" : isNearby ? "#00cc00" : isDarkMode ? "#e0e0e0" : "black"}
          fontWeight={isSelected || isNearby ? "bold" : "normal"}
          textAnchor="middle"
          dominantBaseline="auto"
        >
          {shop.name}
        </text>
      </g>
    );
  }

  // Default rendering for shops without images
  return (
    <g
      key={shop.id}
      onClick={() => onSelect(shop.id)}
      onMouseEnter={() => onMouseEnter(shop.id)}
      onMouseLeave={onMouseLeave}
      style={{ cursor: "pointer" }}
    >
      <rect
        x={shop.building.x}
        y={shop.building.y}
        width={shop.building.width}
        height={shop.building.height}
        stroke={isSelected ? "#0066cc" : isHovered ? "#0099ff" : isNearby ? "#00cc00" : isDarkMode ? "#888" : "black"}
        strokeWidth={isSelected ? 3 : isHovered ? 2 : isNearby ? 2 : 1}
        fill={isSelected ? (isDarkMode ? "#1a3a5a" : "#e6f2ff") : isHovered ? (isDarkMode ? "#1a2a3a" : "#f0f8ff") : isNearby ? (isDarkMode ? "#1a3a1a" : "#f0fff0") : isDarkMode ? "#2a2a2a" : "white"}
        pointerEvents="all"
      />
      <text
        x={shopCenterX}
        y={shopTopY - 8}
        fontSize={11}
        pointerEvents="none"
        fill={isSelected ? "#0066cc" : isNearby ? "#00cc00" : isDarkMode ? "#e0e0e0" : "black"}
        fontWeight={isSelected || isNearby ? "bold" : "normal"}
        textAnchor="middle"
        dominantBaseline="auto"
      >
        {shop.name}
      </text>
    </g>
  );
}

