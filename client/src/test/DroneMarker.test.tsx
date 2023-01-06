import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { pilotDataMock } from "./mocks/eventSourceMock";
import DroneMarker from "../components/DroneMarker";

describe("DroneMarker component", () => {
  it("Should show the corresponding pilot name and distance, when mouse over on a drone marker.", async () => {
    render(<DroneMarker violator={pilotDataMock[0]} colorCode="#0048BA" />);

    expect(screen.queryByTestId("name-text")).toBeNull();
    expect(screen.queryByTestId("distance-text")).toBeNull();

    const droneMarker = screen.getByTestId("drone-marker");
    userEvent.hover(droneMarker);

    // Wait for pilot name and distance after the hover event.
    // https://stackoverflow.com/a/69537974/18850353
    await waitFor(() => {
      screen.getByTestId("name-text");
      screen.getByTestId("distance-text");
    });

    expect(screen.getByText("Bernard Walker")).toBeVisible();
    expect(screen.getByText("28.64 m")).toBeVisible();
  });
});
