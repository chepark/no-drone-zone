import express, { Request, Response } from "express";
import { PilotStorage } from "../services/pilotStorage.services.js";

export const dataStreamer = (req: Request, res: Response) => {
  const headers = {
    "Content-Type": "text/event-stream",
    "Access-Control-Allow-Origin": "*",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };

  res.writeHead(200, headers);

  const intervalId = setInterval(async () => {
    const violators = await PilotStorage.getAllPilots();
    const data = `data:${JSON.stringify(violators)}\n\n`;
    res.write(data);
  }, 2000);

  res.on("close", () => {
    console.log("Client closed.");
    clearInterval(intervalId);
    res.end();
  });
};

// Check SSE is working through the terminal.
// curl -H Accept:text/event-stream http://localhost:8000/api/violators/realtime
