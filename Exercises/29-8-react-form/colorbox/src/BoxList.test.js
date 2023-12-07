// BoxList.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BoxList from "./BoxList";

test("renders BoxList component", () => {
  render(<BoxList />);

  // Smoke Test
  expect(screen.getByText("Box List")).toBeInTheDocument();
});

test("adds and removes a Box from BoxList", () => {
  const { container, getByLabelText, getByText, queryByTestId } = render(
    <BoxList />
  );

  // Fill and submit the form to add a box
  fireEvent.change(getByLabelText("Color:"), { target: { value: "red" } });
  fireEvent.change(getByLabelText("Height:"), { target: { value: "100" } });
  fireEvent.change(getByLabelText("Width:"), { target: { value: "100" } });
  fireEvent.click(getByText("Add!"));

  // Ensure box is added
  const box = container.querySelector(".BoxList").firstChild;
  expect(box).toBeInTheDocument();

  // Remove the added box
  fireEvent.click(getByText("X"));

  // Ensure box is removed
  expect(box).not.toBeInTheDocument();
});
