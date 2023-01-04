import React, { useState, useEffect } from "react";

import "./App.css";
import CoordinatePlane from "./components/CoordinatePlane.js";
import ViolatorList from "./components/ViolatorList.js";
import { SERVER_SENT_EVENT_URL } from "./constants/constants";
import { ViolatorData } from "./lib/types";

function App() {
  const [violators, setViolators] = useState<[] | ViolatorData[]>([]);

  useEffect(() => {
    const events = new EventSource(SERVER_SENT_EVENT_URL);
    events.onmessage = (e) => {
      const parsedData: ViolatorData[] = JSON.parse(e.data);

      setViolators(parsedData);
    };
  }, []);

  return (
    <div className="App border-solid border-2 border-indigo-800 container">
      <h1 className="text-left text-2xl font-bold">BirdNest</h1>
      <h2 className="text-left">
        Pilot and Drone Tracking System to Protect Endangered Birds, Great
        Crested Grebe
      </h2>
      <main className="grid grid-cols-2">
        <CoordinatePlane violators={violators} />
        <ViolatorList violators={violators} />
      </main>
    </div>
  );
}

export default App;
