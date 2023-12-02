import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import Coin from "./coin";

describe("Coin Component", () => {
  // Mock Math.random to ensure predictable outcomes for testing
  const mockRandom = jest.spyOn(global.Math, "random");

  afterEach(() => {
    mockRandom.mockRestore();
  });

  it("renders without coin image initially", () => {
    const { queryByAltText } = render(<Coin />);
    const coinImage = queryByAltText("Coin");
    expect(coinImage).toBeNull();
  });

  test("displays correct text after coin flip", async () => {
    const { getByText, getByAltText } = render(<App />);
    const flipButton = getByText("Flip Coin");

    // Ensure the button exists
    expect(flipButton).toBeInTheDocument();

    fireEvent.click(flipButton);

    // Wait for the content to update after the flip
    await waitFor(() => {
      const headsText = getByText((content, element) => {
        return content.startsWith("Out");
      });

      const coinImage = getByAltText("Coin");

      // Check if the text and coin image after the flip are present
      expect(headsText).toBeInTheDocument();
      expect(coinImage).toBeInTheDocument();
    });
  });
});
