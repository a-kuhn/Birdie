import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import Flashcard from "../Flashcard";

const bird = {
  imageUrl: "https://example.com/bird.jpg",
  famComName: "Family Common Name",
  comName: "Common Name",
  sciName: "Scientific Name",
};

describe("Flashcard", () => {
  it("should display the front of the card correctly", () => {
    const { getByTestId } = render(
      <Flashcard bird={bird} birdIdx={0} totalBirdCount={5} />
    );

    expect(getByTestId("front-card-count").props.children).toStrictEqual([
      "bird ",
      1,
      "/",
      5,
    ]);
    expect(getByTestId("front-image")).toHaveProp("source", {
      uri: "https://example.com/bird.jpg",
    });
  });

  it("should display the back of the card correctly when flipped", () => {
    const { getByTestId } = render(
      <Flashcard bird={bird} birdIdx={0} totalBirdCount={5} />
    );

    act(() => fireEvent.press(getByTestId("flip-button")));

    expect(getByTestId("back-card-count").props.children).toStrictEqual([
      "bird ",
      1,
      "/",
      5,
    ]);
    expect(getByTestId("fam-com-name").props.children).toBe(
      "Family Common Name"
    );
    expect(getByTestId("com-name").props.children).toBe("Common Name");
    expect(getByTestId("latin-name").props.children).toBe("Scientific Name");
    expect(getByTestId("back-image")).toHaveProp("source", {
      uri: "https://example.com/bird.jpg",
    });
  });

  it("should flip the card on press", () => {
    const { getByTestId } = render(
      <Flashcard bird={bird} birdIdx={0} totalBirdCount={5} />
    );

    const flipButton = getByTestId("flip-button");
    const frontCard = getByTestId("front-card");
    const backCard = getByTestId("back-card");

    // Initially, the front card should be visible and the back card should be hidden
    expect(frontCard).toHaveStyle({ opacity: 1 });
    expect(backCard).toHaveStyle({ opacity: 0 });

    act(() => fireEvent.press(flipButton));

    // After flipping, the front card should be hidden and the back card should be visible
    expect(frontCard).toHaveStyle({ opacity: 0 });
    expect(backCard).toHaveStyle({ opacity: 1 });

    act(() => fireEvent.press(flipButton));

    // After flipping again, the front card should be visible and the back card should be hidden
    expect(frontCard).toHaveStyle({ opacity: 1 });
    expect(backCard).toHaveStyle({ opacity: 0 });
  });
});
