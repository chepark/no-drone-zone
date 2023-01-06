import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ViolatorList from "../components/ViolatorList";
import { pilotDataMock } from "./mocks/eventSourceMock";

describe("ViolatorList component", () => {
  render(<ViolatorList violators={pilotDataMock} />);
  it("Should render the same number of violator information as the violators data length.", () => {
    const name = screen.getAllByText(/name/i);
    expect(name).toHaveLength(3);

    const phone = screen.getAllByText(/phone/i);
    expect(phone).toHaveLength(3);

    const email = screen.getAllByText(/email/i);
    expect(email).toHaveLength(3);

    const lastSeen = screen.getAllByText(/last seen/i);
    expect(lastSeen).toHaveLength(3);

    const distance = screen.getAllByText(/distance/i);
    expect(distance).toHaveLength(3);
  });
});
