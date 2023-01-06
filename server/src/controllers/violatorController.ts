import express, { Request, Response } from "express";
import { PilotStorage } from "../services/PilotStorage.services.js";

/**
 * Process the route request coming to the path "/api/violators/realtime".
 *
 * The controller uses Server-Sent Events (SSE).
 * It streams data to the client every 2 seconds (=2000 milliseconds).
 *
 *
 * @param {express.Request} req - Request object sent from the client.
 * @param {express.Response} res - Response object to send to the client.
 */

export const violatorController = async (req: Request, res: Response) => {
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

// Check SSE is working through the terminal.
// curl -H Accept:text/event-stream http://localhost:8000/api/violators/realtime
