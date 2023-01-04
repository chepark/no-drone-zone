import React from "react";
import ViolatorRow from "./ViolatorRow";

const ViolatorTable = ({ violators }) => {
  return (
    <div className="border-solid border-2 border-black">
      <table>
        <thead>
          <tr style={{ backgroundColor: "#ccc" }}>
            <th>Name</th>
            <th>Phone number</th>
            <th>Email</th>
            <th>Closest Distance</th>
            <th>Last Seen</th>
          </tr>
        </thead>
        <tbody>
          {/* {violators.map((violator) => (
            <ViolatorRow key={violator.id} />
          ))} */}
        </tbody>
      </table>
    </div>
  );
};
export default ViolatorTable;
