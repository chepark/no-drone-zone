import { vi } from "vitest";
import { ViolatorData } from "../../lib/types";

export const pilotDataMock: ViolatorData[] = [
  {
    pilotId: "P-05HIvn1avF",
    name: "Bernard Walker",
    phoneNumber: "+210462707446",
    email: "bernard.walker@example.com",
    distance: 28.640283406997,
    lastSeenAt: "2023-01-05 09:30:32",
    positionX: "221.650820999925",
    positionY: "245.92693191135",
  },
  {
    pilotId: "P-06FuwFuMmj",
    name: "Doris Pfeffer",
    phoneNumber: "+210160551339",
    email: "doris.pfeffer@example.com",
    distance: 17.615513159267,
    lastSeenAt: "2023-01-05 09:31:20",
    positionX: "259.320391181206",
    positionY: "264.947796228663",
  },
  {
    pilotId: "P-08ny1bvh9r",
    name: "Jane Sauer",
    phoneNumber: "+210371100776",
    email: "jane.sauer@example.com",
    distance: 8.221828053951,
    lastSeenAt: "2023-01-05 09:30:32",
    positionX: "255.679248368022",
    positionY: "255.945132002156",
  },
];

export const EventSourceMock = vi.fn(() => ({
  onopen: vi.fn(),
  onmessage: vi.fn(() => {
    pilotDataMock;
  }),
  close: vi.fn(),
}));
