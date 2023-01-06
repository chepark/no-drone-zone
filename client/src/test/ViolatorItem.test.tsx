import { render, screen } from "@testing-library/react";
import ViolatorItem from "../components/ViolatorItem";
import { pilotDataMock } from "./mocks/eventSourceMock";

describe("ViolatorItem Component", () => {
  it("Should display unique color marker on each ViolatorItem.", () => {
    render(<ViolatorItem violator={pilotDataMock[0]} colorCode="#0048BA" />);

    const pilotColor = screen.getByTestId("pilot-color");
    expect(pilotColor).toHaveStyle("backgroundColor:'#0048BA'");
  });

  it("Should display the corresponding pilot contact information.", () => {
    const { getByText } = render(
      <ViolatorItem violator={pilotDataMock[0]} colorCode="#0048BA" />
    );

    const name = getByText(
      (_, element) => element?.textContent === "▪️ Name: Bernard Walker"
    );
    expect(name).toBeVisible();

    const pilotId = getByText(
      (_, element) => element?.textContent === "▪️ Pilot ID: P-05HIvn1avF"
    );
    expect(pilotId).toBeVisible();

    const phone = getByText(
      (_, element) => element?.textContent === "▪️ Phone: +210462707446"
    );
    expect(phone).toBeVisible();

    const email = getByText(
      (_, element) =>
        element?.textContent === "▪️ Email: bernard.walker@example.com"
    );
    expect(email).toBeVisible();

    const distance = getByText(
      (_, element) => element?.textContent === "▪️ Closest Distance: 28.64 m"
    );
    expect(distance).toBeVisible();

    const lastSeen = getByText(
      (_, element) =>
        element?.textContent === "▪️ Last Seen: 2023-01-05 09:30:32"
    );
    expect(lastSeen).toBeVisible();
  });
});
