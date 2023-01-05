import React, { MutableRefObject, useRef, useState } from "react";

const DroneMarker = ({
  name,
  positionX,
  positionY,
  colorCode,
}: {
  name: string;
  positionX: string;
  positionY: string;
  colorCode: string;
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [markerPosition, setMarkerPosition] = useState<{
    x: number;
    y: number;
  }>();
  const markerRef = useRef() as MutableRefObject<SVGCircleElement>;

  const onMarkerHover = () => {
    const rect = markerRef.current.getBoundingClientRect();
    setMarkerPosition({ x: rect.x, y: rect.y });
    setShowTooltip(true);
  };

  return (
    <>
      <svg>
        <circle
          className="cursor-pointer"
          onMouseOver={onMarkerHover}
          onMouseOut={() => setShowTooltip(false)}
          cx={positionX}
          cy={positionY}
          r="5"
          fill={colorCode}
          ref={markerRef}
        />
      </svg>
      {showTooltip && (
        <text
          x={`250`}
          y={`300`}
          fill="#000"
          fontSize="14"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {name}
        </text>
      )}
    </>
  );
};

export default DroneMarker;
