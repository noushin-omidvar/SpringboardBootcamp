import { render, screen } from "@testing-library/react";
import App from "./App";

//smoke test
it("renders without crashing", function () {
  render(<App />);
});
