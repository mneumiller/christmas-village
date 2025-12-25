import type { Character } from "../../model/character";
import type { Vec2 } from "../../model/world";
import { INTERACTION_DISTANCE, CHARACTER_SIZE } from "../../constants";
import { getDistance } from "../../utils/math";

type CharacterMarkerProps = {
  character: Character;
  playerPosition: Vec2;
  onInteract: (character: Character) => void;
  isDarkMode: boolean;
};

export function CharacterMarker({ character, playerPosition, onInteract, isDarkMode }: CharacterMarkerProps) {
  const distance = getDistance(playerPosition, character.position);
  const isNearby = distance <= INTERACTION_DISTANCE;
  const hasActiveQuest = character.quest && character.quest.status === "active";
  const size = character.size ?? CHARACTER_SIZE;

  return (
    <>
      {/* Character marker on map */}
      <g
        onClick={() => onInteract(character)}
        onMouseEnter={() => {}}
        style={{ cursor: "pointer" }}
      >
        {/* Quest indicator (exclamation mark) */}
        {hasActiveQuest && (
          <g>
            {/* Background circle */}
            <circle
              cx={character.position.x + size / 2}
              cy={character.position.y - size / 2}
              r={10}
              fill="#FFD700"
              stroke={isDarkMode ? "#fff" : "#000"}
              strokeWidth={2}
            />
            {/* Exclamation mark */}
            <text
              x={character.position.x + size / 2}
              y={character.position.y - size / 2 + 4}
              fontSize={14}
              fill="#000"
              textAnchor="middle"
              fontWeight="bold"
              pointerEvents="none"
            >
              !
            </text>
          </g>
        )}
        
        {/* Character image or fallback circle */}
        {character.image ? (
          <>
            {/* Optional border when nearby */}
            {isNearby && (
              <circle
                cx={character.position.x}
                cy={character.position.y}
                r={size / 2 + 3}
                fill="none"
                stroke="#FFD700"
                strokeWidth={3}
              />
            )}
            <image
              x={character.position.x - size / 2}
              y={character.position.y - size / 2}
              width={size}
              height={size}
              href={character.image}
              preserveAspectRatio="xMidYMid meet"
              pointerEvents="all"
            />
          </>
        ) : (
          <circle
            cx={character.position.x}
            cy={character.position.y}
            r={12}
            fill={hasActiveQuest ? "#4CAF50" : "#9C27B0"}
            stroke={isNearby ? "#FFD700" : isDarkMode ? "#fff" : "#000"}
            strokeWidth={isNearby ? 3 : 2}
          />
        )}
        
        {/* Character name */}
        <text
          x={character.position.x}
          y={character.position.y - size / 2 - 10}
          fontSize={10}
          fill={isDarkMode ? "#e0e0e0" : "black"}
          textAnchor="middle"
          fontWeight="bold"
        >
          {character.name}
        </text>
      </g>
      
      {/* Interaction prompt */}
      {isNearby && hasActiveQuest && (
        <div
          style={{
            position: "absolute",
            top: `${(character.position.y / 450) * 100}%`,
            left: `${(character.position.x / 700) * 100}%`,
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
          Press E to talk to {character.name}
        </div>
      )}
    </>
  );
}

