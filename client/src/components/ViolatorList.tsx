import React from "react";
import { ViolatorData } from "../lib/types";
import ViolatorItem from "./ViolatorItem";
import colorData from "../data/colors.json";

const ViolatorList = ({ violators }: { violators: ViolatorData[] }) => {
  return (
    <div className="flex flex-col w-auto">
      {/* <h2 className="mb-5 text-xl">Pilot Information</h2> */}
      <ul className="flex flex-col gap-y-4 min-w-fit overflow-y-scroll h-screen">
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
