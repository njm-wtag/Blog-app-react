import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from ".";

describe("Button component", () => {
  it("should render children correctly", () => {
    const { getByText } = render(<Button>Test Button</Button>);
    expect(getByText("Test Button")).toBeTruthy();
  });

  it("should render custom className", () => {
    const { getByText } = render(
      <Button className="custom">Test Button</Button>
    );
    expect(getByText("Test Button")).toHaveClass("custom");
  });

  it("should call onClickHandler when clicked", async () => {
    const onClickMock = vi.fn();
    const { getByText } = render(
      <Button onClickHandler={onClickMock}>Test Button</Button>
    );
    await userEvent.click(getByText("Test Button"));
    expect(onClickMock).toBeCalled();
  });

  it("should render type prop correctly", () => {
    const { getByText } = render(<Button type="submit">Test Button</Button>);
    expect(getByText("Test Button").getAttribute("type")).toEqual("submit");
  });

  it("should render type prop correctly", () => {
    const { getByText } = render(<Button type="button">Test Button</Button>);
    expect(getByText("Test Button").getAttribute("type")).toEqual("button");
  });
});
