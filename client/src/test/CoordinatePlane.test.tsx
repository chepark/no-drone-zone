import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { pilotDataMock } from "./mocks/eventSourceMock";
import CoordinatePlane from "../components/CoordinatePlane";

describe("CoordinatePlane component", () => {
  it("Should display three drone markers.", () => {
    render(<CoordinatePlane violators={pilotDataMock} />);

    const droneMarker = screen.getAllByTestId("drone-marker");
    expect(droneMarker).toHaveLength(3);
  });
});
