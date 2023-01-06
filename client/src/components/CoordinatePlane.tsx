import React from "react";
import { Nest } from "../assets/Nest";
import { ViolatorData } from "../lib/types";
import DroneMarker from "./DroneMarker";
import colorData from "../data/colors.json";

/**
 * Component that renders a plane to mark locations of drones
 * that invaded the No Drone Zone.
 *
 * @param param0
 * @returns
 */

const CoordinatePlane = ({ violators }: { violators: ViolatorData[] }) => {
  // generate a linearly spaced vector in the interval of 50
  const ticks = Array.from(Array(11), (_, i) => 50 * (i - 5));

  // get the size of the parent element
  const parentElement = React.useRef<any>(null);
  const [size, setSize] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    if (parentElement.current) {
      setSize({
        width: parentElement.current.offsetWidth,
        height: parentElement.current.offsetHeight,
      });
    }
  }, []);

  // calculate the scaling factor based on the size of the parent element
  const scale = Math.min(size.width, size.height) / 500;

  return (
    <div
      className="flex flex-col items-center"
      ref={parentElement}
      style={{ width: "100%", height: "100%", overflow: "hidden" }}
    >
      <div>
        <svg width="500" height="500" transform={`scale(${scale})`}>
          {/* draw the X and Y axis */}
          <line x1="0" y1="250" x2="500" y2="250" stroke="#000" />
          <line x1="250" y1="0" x2="250" y2="500" stroke="#000" />

          {/* create the grid */}
          {ticks.map((tick) => (
            <React.Fragment key={tick}>
              <line
                x1={250 + tick}
                y1="0"
                x2={250 + tick}
                y2="500"
                stroke="#ccc"
              />
              <line
                x1="0"
                y1={250 + tick}
                x2="500"
                y2={250 + tick}
                stroke="#ccc"
              />
            </React.Fragment>
          ))}

          {/* mark the nest */}
          <Nest />
          <text
            x="250"
            y="130"
            fontSize="12"
            fill="#FFCCCB"
            textAnchor="middle"
            dominantBaseline="central"
          >
            No Drone Zone
          </text>
          <circle
            cx="250"
            cy="250"
            r="100"
            stroke="#FFCCCB"
            strokeWidth="1"
            fill="none"
          />
          <text
            x="250"
            y="260"
            fontSize="12"
            textAnchor="middle"
            dominantBaseline="central"
          >
            Nest (250, 250)
          </text>

          {/* mark the points on drones */}
          {violators.map((violator, index) => {
            const { pilotId } = violator;
            const colorCode = colorData[index].hex;

            return (
              <DroneMarker
                key={pilotId}
                violator={violator}
                colorCode={colorCode}
              />
            );
          })}
        </svg>
      </div>
      <div className="text-black mt-10">
        Hover on a point to see a pilot name and distance from the nest.
      </div>
    </div>
  );
};

export default CoordinatePlane;
