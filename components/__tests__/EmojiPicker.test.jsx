import React from "react";
import { Text } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import EmojiPicker from "../EmojiPicker";

jest.mock("@expo/vector-icons/MaterialIcons", () => "MaterialIcons");

describe("EmojiPicker", () => {
  it("renders correctly when visible", () => {
    const { getByText, getByTestId, debug } = render(
      <EmojiPicker isVisible={true} onClose={() => {}}>
        <Text testID="child">Child content</Text>
      </EmojiPicker>
    );
    expect(getByText("Choose a sticker")).toBeTruthy();
    expect(getByTestId("child")).toBeTruthy();
  });

  it("does not render when not visible", () => {
    const { queryByText, queryByTestId } = render(
      <EmojiPicker isVisible={false} onClose={() => {}}>
        <Text testID="child">Child content</Text>
      </EmojiPicker>
    );
    expect(queryByText("Choose a sticker")).toBeNull();
    expect(queryByTestId("child")).toBeNull();
  });

  it('calls onClose when close button is pressed', () => {
    const onCloseMock = jest.fn();
    const { getByRole } = render(
      <EmojiPicker isVisible={true} onClose={onCloseMock}>
        <Text>Child content</Text>
      </EmojiPicker>
    );
    fireEvent.press(getByRole("button"));
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("matches snapshot when visible", () => {
    const { toJSON } = render(
      <EmojiPicker isVisible={true} onClose={() => {}}>
        <Text>Child content</Text>
      </EmojiPicker>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("matches snapshot when not visible", () => {
    const { toJSON } = render(
      <EmojiPicker isVisible={false} onClose={() => {}}>
        <Text>Child content</Text>
      </EmojiPicker>
    );
    expect(toJSON()).toMatchSnapshot();
  });
});