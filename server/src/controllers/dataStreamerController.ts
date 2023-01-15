import { Request, Response } from "express";
import { PilotStorage } from "../services/pilotStorage.services.js";

/**
 * Sever-Sent Event (SSE) to stream data to the client.
 * @param req
 * @param res
 */
export const dataStreamer = (req: Request, res: Response, DBIntervalId) => {
  /**
   * Set the response header
   */
  const headers = {
    "Content-Type": "text/event-stream",
    "Access-Control-Allow-Origin": "*",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };

  res.writeHead(200, headers);

  /**
   * Send the violator data every 2 seconds (2000 milliseconds)
   */
  const intervalId = setInterval(async () => {
    const violators = await PilotStorage.getAllPilots();
    const data = `data:${JSON.stringify(violators)}\n\n`;
    res.write(data);
  }, 2000);

  /**
   * End SSE when the client connection is closed.
   */
  res.on("close", () => {
    console.log("Client closed.");
    clearInterval(intervalId);
    clearInterval(DBIntervalId);
    res.end();
  });
};

// Check SSE is working through the terminal.
// curl -H Accept:text/event-stream http://localhost:8000/api/violators/realtime
