import React, { useState } from "react";
import { distanceFormatter } from "../lib/distanceFormatter";
import { ViolatorData } from "../lib/types";

const DroneMarker = ({
  violator,
  colorCode,
}: {
  violator: ViolatorData;
  colorCode: string;
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const { positionX, positionY, name, distance } = violator;
  const closestDistance = distanceFormatter(distance);

  const markerHandler = () => {
    setShowTooltip((prev) => !prev);
  };

  return (
    <>
      <svg>
        <circle
          className="cursor-pointer"
          onMouseOver={markerHandler}
          onMouseOut={markerHandler}
          cx={positionX}
          cy={positionY}
          r="5"
          fill={colorCode}
          data-testid="drone-marker"
        />
      </svg>

      {showTooltip && (
        <svg>
          <text
            x={`450`}
            y={`450`}
            fill="#000"
            fontSize="14"
            textAnchor="end"
            dominantBaseline="auto"
            data-testid="name-text"
          >
            {name}
          </text>
          <text
            x={`450`}
            y={`470`}
            fill="#000"
            fontSize="14"
            textAnchor="end"
            dominantBaseline="auto"
            data-testid="distance-text"
          >
            {closestDistance} m
          </text>
        </svg>
      )}
    </>
  );
};

export default DroneMarker;
