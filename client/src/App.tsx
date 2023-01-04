import React, { useState, useEffect } from "react";

import "./App.css";
import CoordinatePlane from "./components/CoordinatePlane.js";
import ViolatorTable from "./components/ViolatorTable.js";
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
      <h1>Project BirdNest</h1>
      <h2>Who bothers the endangered bird specy, Great crested grebe?</h2>
      <main className="grid grid-cols-2">
        <CoordinatePlane violators={violators} />
        <ViolatorTable violators={violators} />
      </main>
    </div>
  );
}

export default App;
