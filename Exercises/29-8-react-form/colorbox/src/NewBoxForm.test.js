// NewBoxForm.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NewBoxForm from "./NewBoxForm";

test("renders NewBoxForm component", () => {
  render(<NewBoxForm />);

  // Smoke Test
  expect(screen.getByText("Add New Box")).toBeInTheDocument();
});

test("submits form and adds a Box", () => {
  const addBoxMock = jest.fn();
  render(<NewBoxForm addBox={addBoxMock} />);

  // Fill and submit the form
  fireEvent.change(screen.getByLabelText("Color:"), {
    target: { value: "green" },
  });
  fireEvent.change(screen.getByLabelText("Height:"), {
    target: { value: "150" },
  });
  fireEvent.change(screen.getByLabelText("Width:"), {
    target: { value: "150" },
  });
  fireEvent.click(screen.getByText("Add!"));

  // Ensure addBox function is called with the form data
  expect(addBoxMock).toHaveBeenCalledWith({
    color: "green",
    height: "150",
    width: "150",
  });
});
