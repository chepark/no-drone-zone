import React from "react";
import { formatDate } from "../lib/dateFormatter";
import { distanceFormatter } from "../lib/distanceFormatter";
import { ViolatorData } from "../lib/types";

const ViolatorItem = ({
  violator,
  colorCode,
}: {
  violator: ViolatorData;
  colorCode: string;
}) => {
  const { name, pilotId, phoneNumber, email, distance, lastSeenAt } = violator;
  const closestDistance = distanceFormatter(distance);
  const formatedDate = formatDate(lastSeenAt);

  return (
    <li className="border border-1 border-gray-300 rounded text-center p-4 pl-10 pr-10  relative">
      <div
        className="rounded-full w-4 h-4 mb-2 absolute top-5 right-5"
        style={{ backgroundColor: `${colorCode}` }}
      ></div>
      <div>▪️ Name: {name}</div>
      <div>▪️ Pilot ID: {pilotId}</div>
      <div>▪️ Phone: {phoneNumber}</div>
      <div>▪️ Email: {email}</div>
      <div>▪️ Closest Distance: {closestDistance} m</div>
      <div>▪️ Last Seen: {formatedDate}</div>
    </li>
  );
};

export default ViolatorItem;
