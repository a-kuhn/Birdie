import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Button from "../Button";

describe("Button component", () => {
  it("renders correctly with default theme", () => {
    const { getByText, getByTestId, toJSON } = render(
      <Button label="Click me" onPress={() => {}} />
    );
    expect(getByText("Click me")).toBeTruthy();
    expect(getByTestId("default-theme")).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it("renders correctly with primary theme", () => {
    const { getByText, getByTestId, toJSON } = render(
      <Button label="Click me" theme="primary" onPress={() => {}} />
    );
    expect(getByText("Click me")).toBeTruthy();
    expect(getByTestId("primary-theme")).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it("calls the onPress function when pressed", () => {
    const onPressMock = jest.fn();
    const { getByText, toJSON } = render(
      <Button label="Click me" onPress={onPressMock} />
    );
    fireEvent.press(getByText("Click me"));
    expect(onPressMock).toHaveBeenCalled();
    expect(toJSON()).toMatchSnapshot();
  });
});
