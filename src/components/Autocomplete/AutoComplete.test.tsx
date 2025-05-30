import React, { createRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Autocomplete from "./Autocomplete";
import type { AutocompleteProps, SuggestionItem } from "../../types/suggestion";

const buildProps = (
  over: Partial<AutocompleteProps> = {}
): AutocompleteProps => ({
  value: "",
  suggestions: [],
  isOpen: false,
  isLoading: false,
  error: undefined,
  activeIndex: -1,
  inputRef:
    createRef<HTMLInputElement>() as React.RefObject<HTMLInputElement | null>,
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
    render(<Autocomplete {...buildProps()} />);

    expect(screen.getByText("Country")).toBeInTheDocument(); // label text
    expect(screen.getByRole("combobox")).toBeInTheDocument(); // input
  });

  it("invokes onSelect when a suggestion is clicked", () => {
    const suggestions: SuggestionItem[] = [{ id: 1, name: "Spain" }];
    const onSelect = jest.fn();

    render(
      <Autocomplete
        {...buildProps({
          value: "spa",
          isOpen: true,
          suggestions,
          onSelect,
        })}
      />
    );

    fireEvent.click(screen.getAllByRole("option")[0]);
    expect(onSelect).toHaveBeenCalledWith(suggestions[0]);
  });

  it("displays the loading message when isLoading is true", () => {
    render(<Autocomplete {...buildProps({ isLoading: true })} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('shows "No results found" when dropdown is open with no suggestions', () => {
    render(<Autocomplete {...buildProps({ isOpen: true })} />);
    expect(screen.getByText(/no results/i)).toBeInTheDocument();
  });

  it('sets aria-selected="true" on the activeIndex item', () => {
    const suggestions: SuggestionItem[] = [
      { id: 1, name: "Spain" },
      { id: 2, name: "Sweden" },
    ];

    render(
      <Autocomplete
        {...buildProps({
          value: "s",
          isOpen: true,
          suggestions,
          activeIndex: 1,
        })}
      />
    );

    const items = screen.getAllByRole("option");
    expect(items[1]).toHaveAttribute("aria-selected", "true");
    expect(items[0]).toHaveAttribute("aria-selected", "false");
  });

  it("calls onChange each time the user types", () => {
    const onChange = jest.fn();
    render(<Autocomplete {...buildProps({ onChange })} />);

    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "a" } });
    expect(onChange).toHaveBeenCalledWith("a");
  });
});
