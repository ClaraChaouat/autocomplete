import { renderHook } from "@testing-library/react";
import { useOnClickOutside } from "./useOnClickOutside";
import "@testing-library/jest-dom";

describe("useOnClickOutside", () => {
  it("calls handler when clicking outside", () => {
    const handler = jest.fn();
    const ref = { current: document.createElement("div") };
    document.body.appendChild(ref.current);

    renderHook(() => useOnClickOutside(ref, handler));

    const outsideClick = new MouseEvent("mousedown", {
      bubbles: true,
      cancelable: true,
    });
    document.body.dispatchEvent(outsideClick);

    expect(handler).toHaveBeenCalled();
  });
});
