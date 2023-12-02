import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("works when you click on the right arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).not.toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).toBeInTheDocument();
});

it("works when you click on the left arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).toBeInTheDocument();

  // move backward in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the second image to show, but not the first
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();
});

it("does not display left arrow on first image", () => {
  const { queryByTestId } = render(<Carousel />);
  expect(queryByTestId("left-arrow")).not.toBeInTheDocument();
});

it("displays right arrow on first image", () => {
  const { getByTestId } = render(<Carousel />);
  expect(getByTestId("right-arrow")).toBeInTheDocument();
});

it("does not display right arrow on last image", () => {
  const { queryByTestId, rerender } = render(<Carousel />);

  fireEvent.click(queryByTestId("right-arrow"));
  fireEvent.click(queryByTestId("right-arrow"));

  rerender(<Carousel />);

  expect(queryByTestId("right-arrow")).toBeNull();
});

it("displays left arrow on last image", () => {
  const { getByTestId, rerender } = render(<Carousel />);

  fireEvent.click(getByTestId("right-arrow"));
  fireEvent.click(getByTestId("right-arrow"));

  rerender(<Carousel />);

  expect(getByTestId("left-arrow")).toBeInTheDocument();
});
