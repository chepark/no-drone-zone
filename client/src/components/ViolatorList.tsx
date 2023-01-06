import React from "react";
import { ViolatorData } from "../lib/types";
import ViolatorItem from "./ViolatorItem";
import colorData from "../data/colors.json";
import useWindowSize from "../hooks/useWindowSize";

/**
 * Renders all pilots information.
 * @param
 * @returns
 */
const ViolatorList = ({ violators }: { violators: ViolatorData[] }) => {
  const { innerHeight } = useWindowSize();

  return (
    <div
      className="flex flex-col w-auto"
      style={{ height: `${innerHeight - 200}px` }}
    >
      <ul className="flex flex-col flex-1 gap-y-4 overflow-y-scroll">
        {violators.map((violator: ViolatorData, index: number) => {
          const colorCode = colorData[index].hex;

          return (
            <ViolatorItem
              violator={violator}
              colorCode={colorCode}
              key={violator.pilotId}
            />
          );
        })}
      </ul>
    </div>
  );
};
export default ViolatorList;
