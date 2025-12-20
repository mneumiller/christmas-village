import type { Shop } from "../model/shop";

type Props = {
    shops: Shop[];
    selectedShopId?: Shop["id"];
    onSelect: (id: Shop["id"]) => void;
  };

export function VillageMap(
    { shops, selectedShopId, onSelect }: Props
) {

    return (
        <svg width={700} height={320} style={{ border: "1px solid #ddd", borderRadius: 8 }}>
            {shops.map((shop) => {
                const isSelected = shop.id === selectedShopId;

                return (
                    <g key={shop.id} onClick={() => onSelect(shop.id)} style={{ cursor: "pointer" }}>
                        <rect
                        x={shop.building.x}
                        y={shop.building.y}
                        width={shop.building.width}
                        height={shop.building.height}
                        stroke="black"
                        fill={isSelected ? "#ddd" : "white"}
                        />
                        <text x={shop.building.x} y={shop.building.y - 8} fontSize={12}>
                        {shop.name}
                        </text>
                    </g>
                )
            })}
        </svg>
    )
}