import React, { createRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchField from "./SearchField";

const baseProps = {
  value: "",
  onChange: jest.fn(),
  onKeyDown: jest.fn(),
  inputRef:
    createRef<HTMLInputElement>() as React.RefObject<HTMLInputElement | null>,
  placeholder: "Search…",
  ariaLabel: "Country search",
  error: null,
  className: "",
  isOpen: false,
  suggestions: [{ id: 1, name: "Spain" }],
  activeIndex: -1,
};

describe("SearchField", () => {
  it("renders an input with correct value and placeholder", () => {
    render(<SearchField {...baseProps} value="spa" />);

    const input = screen.getByRole("combobox");
    expect(input).toHaveValue("spa");
    expect(input).toHaveAttribute("placeholder", "Search…");
  });

  it("fires onChange and onKeyDown callbacks", () => {
    const onChange = jest.fn();
    const onKeyDown = jest.fn();

    render(
      <SearchField {...baseProps} onChange={onChange} onKeyDown={onKeyDown} />
    );

    const input = screen.getByRole("combobox");

    fireEvent.change(input, { target: { value: "s" } });
    expect(onChange).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  it("sets aria-activedescendant when list is open and activeIndex ≥ 0", () => {
    render(
      <SearchField
        {...baseProps}
        isOpen
        activeIndex={0}
        value="s"
        suggestions={[{ id: 1, name: "Spain" }]}
      />
    );

    const input = screen.getByRole("combobox");
    expect(input).toHaveAttribute("aria-activedescendant", "option-1");
    expect(input).toHaveAttribute("aria-expanded", "true");
  });

  it("displays error text and sets aria-invalid", () => {
    render(<SearchField {...baseProps} error="Invalid input" />);

    expect(screen.getByText("Invalid input")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });
});
