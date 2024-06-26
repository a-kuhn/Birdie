import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import EmojiList from "../EmojiList";

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

describe("EmojiList", () => {
  const mockOnSelect = jest.fn();
  const mockOnCloseModal = jest.fn();

  it("renders correctly with all emojis", () => {
    const { getAllByTestId } = render(
      <EmojiList onSelect={mockOnSelect} onCloseModal={mockOnCloseModal} />
    );

    const images = getAllByTestId(/emoji-image-/);
    expect(images).toHaveLength(6);
  });

  it("calls onSelect and onCloseModal when an emoji is pressed", () => {
    const { getAllByRole } = render(
      <EmojiList onSelect={mockOnSelect} onCloseModal={mockOnCloseModal} />
    );

    const pressable = getAllByRole("button")[0];
    fireEvent.press(pressable);

    expect(mockOnSelect).toHaveBeenCalledWith(expect.any(Number));
    expect(mockOnCloseModal).toHaveBeenCalled();
  });

  it("matches snapshot", () => {
    const { toJSON } = render(
      <EmojiList onSelect={mockOnSelect} onCloseModal={mockOnCloseModal} />
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
