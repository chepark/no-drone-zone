import { describe, it, expect } from "vitest";

import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App component", () => {
  it("Should display the logo.", () => {
    render(<App />);
    const logo = screen.getByText("BirdNest");
    expect(logo).toBeVisible();
  });
});
