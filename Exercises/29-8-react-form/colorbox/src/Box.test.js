import { render, screen } from "@testing-library/react";
import Box from "./Box";

test("renders Box component", () => {
  const props = {
    id: "box-id",
    color: "blue",
    width: 200,
    height: 200,
    removeBox: jest.fn(),
  };
  const result = render(<Box {...props} />);

  // Smoke Test
  expect(screen.getByText("X")).toBeInTheDocument();

  // Snapshot Test
  const box = result.container.querySelector("#box-id");
  expect(box).toMatchSnapshot();
});
