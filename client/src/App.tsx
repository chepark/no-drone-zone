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

  console.log(violators.length);
  return (
    <div className="App">
      <div className="flex flex-col justify-between items-bottom">
        <h1 className="text-left text-2xl font-bold">BirdNest</h1>
        <h2 className="text-left">
          Pilot and Drone Tracking System to Protect Endangered Birds, Great
          Crested Grebe
        </h2>
      </div>

      <main className="mt-8 container mx-auto">
        <div className="grid md:grid-cols-2 gap-6 grid-cols-1">
          <CoordinatePlane violators={violators} />
          <ViolatorList violators={violators} />
        </div>
      </main>
    </div>
  );
}

export default App;
