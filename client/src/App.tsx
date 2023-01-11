import React, { useState, useEffect } from "react";
import "./App.css";
import CoordinatePlane from "./components/CoordinatePlane.js";
import ViolatorList from "./components/ViolatorList.js";
import { ViolatorData } from "./lib/types";

function App() {
  const [violators, setViolators] = useState<[] | ViolatorData[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   * Open a connectioni to the server
   * to begin receiving streaming data.
   */
  useEffect(() => {
    const host = window.location.host;
    const events = new EventSource(`http://${host}/api/violators`);
    events.onopen = () => {
      setLoading(false);
    };

    events.onmessage = (e) => {
      const parsedData: ViolatorData[] = JSON.parse(e.data);
      setViolators(parsedData);
    };

    // set error handler for loading section.
    events.onerror = (e) => {
      console.log("Error in Event Source: ", e);
      events.close();
    };

    return () => {
      events.close();
    };
  }, []);

  return (
    <div className="App">
      <div className="flex flex-col justify-between items-bottom bg-indigo-700 pt-4 pl-4">
        <h1 className="text-left text-2xl font-bold text-white">BirdNest</h1>
        <div className="text-left text-lg mt-2 mb-5 text-white">
          Pilot and Drone Tracking System to Protect Endangered Birds, Great
          Crested Grebe
        </div>
      </div>

      <main className="mt-8 container mx-auto">
        <div className="grid md:grid-cols-2 gap-6 grid-cols-1">
          <CoordinatePlane violators={violators} />
          {loading ? <div>...loading</div> : null}
          <ViolatorList violators={violators} />
        </div>
      </main>
    </div>
  );
}

export default App;
