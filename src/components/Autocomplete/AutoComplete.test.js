import { jsx as _jsx } from "react/jsx-runtime";
import { createRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Autocomplete from "./Autocomplete";
const buildProps = (over = {}) => ({
  value: "",
  suggestions: [],
  isOpen: false,
  isLoading: false,
  error: undefined,
  activeIndex: -1,
  inputRef: createRef(),
  onChange: jest.fn(),
  onKeyDown: jest.fn(),
  onSelect: jest.fn(),
  label: "Country",
  placeholder: "Search…",
  ariaLabel: "Autocomplete",
  ...over,
});
describe("Autocomplete component", () => {
  it("renders the label text and the input field", () => {
    render(_jsx(Autocomplete, { ...buildProps() }));
    expect(screen.getByText("Country")).toBeInTheDocument(); // label text
    expect(screen.getByRole("combobox")).toBeInTheDocument(); // input
  });
  it("invokes onSelect when a suggestion is clicked", () => {
    const suggestions = [{ id: 1, name: "Spain" }];
    const onSelect = jest.fn();
    render(
      _jsx(Autocomplete, {
        ...buildProps({
          value: "spa",
          isOpen: true,
          suggestions,
          onSelect,
        }),
      }),
    );
    fireEvent.click(screen.getAllByRole("option")[0]);
    expect(onSelect).toHaveBeenCalledWith(suggestions[0]);
  });
  it("displays the loading message when isLoading is true", () => {
    render(_jsx(Autocomplete, { ...buildProps({ isLoading: true }) }));
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
  it('shows "No results found" when dropdown is open with no suggestions', () => {
    render(_jsx(Autocomplete, { ...buildProps({ isOpen: true }) }));
    expect(screen.getByText(/no results/i)).toBeInTheDocument();
  });
  it('sets aria-selected="true" on the activeIndex item', () => {
    const suggestions = [
      { id: 1, name: "Spain" },
      { id: 2, name: "Sweden" },
    ];
    render(
      _jsx(Autocomplete, {
        ...buildProps({
          value: "s",
          isOpen: true,
          suggestions,
          activeIndex: 1,
        }),
      }),
    );
    const items = screen.getAllByRole("option");
    expect(items[1]).toHaveAttribute("aria-selected", "true");
    expect(items[0]).toHaveAttribute("aria-selected", "false");
  });
  it("calls onChange each time the user types", () => {
    const onChange = jest.fn();
    render(_jsx(Autocomplete, { ...buildProps({ onChange }) }));
    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "a" } });
    expect(onChange).toHaveBeenCalledWith("a");
  });
});
