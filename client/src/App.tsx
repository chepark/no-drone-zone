import React, { useState, useEffect } from "react";

import "./App.css";
import CoordinatePlane from "./components/CoordinatePlane";
import ViolatorTable from "./components/ViolatorTable";
import { SERVER_SENT_EVENT_URL } from "./constants/constants";

function App() {
  useEffect(() => {
    const events = new EventSource(SERVER_SENT_EVENT_URL);
    events.onmessage = (e) => {
      const parsedData = JSON.parse(e.data);
      console.log(parsedData);
    };
  }, []);

  return (
    <div className="App border-solid border-2 border-indigo-800 container">
      <h1>Project BirdNest</h1>
      <h2>Who bothers the endangered bird specy, Great crested grebe?</h2>
      <main className="grid grid-cols-2">
        <CoordinatePlane />
        <ViolatorTable />
      </main>
    </div>
  );
}

export default App;
