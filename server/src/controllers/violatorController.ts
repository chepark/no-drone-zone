import { Request, Response } from "express";
import { PilotStorage } from "../services/PilotStorage.services.js";

export const violatorController = async (req: Request, res: Response) => {
  const violators = await PilotStorage.getAllPilots();

  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  res.writeHead(200, headers);

  //   const data = `data:${JSON.stringify(violators)}\n\n`;
  //   res.write(data);

  setInterval(async () => {
    const violators = await PilotStorage.getAllPilots();
    const data = `data:${JSON.stringify(violators)}\n\n`;
    res.write(data);
  }, 2000);
};
