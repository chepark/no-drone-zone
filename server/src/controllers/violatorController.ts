import { Request, Response } from "express";
import { PilotStorage } from "../services/PilotStorage.services.js";

export const violatorController = async (req: Request, res: Response) => {
  // testing
  //curl -H Accept:text/event-stream http://localhost:8000/api/violators/realtime

  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  res.writeHead(200, headers);

  setInterval(async () => {
    const violators = await PilotStorage.getAllPilots();
    const data = `data:${JSON.stringify(violators)}\n\n`;
    res.write(data);
  }, 2000);
};
