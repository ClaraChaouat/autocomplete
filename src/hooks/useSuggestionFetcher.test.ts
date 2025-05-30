import { renderHook, act, waitFor } from "@testing-library/react";
import { useSuggestionFetcher } from "./useSuggestionFetcher";
import { getSuggestions } from "../helpers/getSuggestions";

jest.mock("../helpers/getSuggestions", () => ({
  getSuggestions: jest.fn(),
}));

jest.useFakeTimers();

describe("useSuggestionFetcher", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return initial state", () => {
    const { result } = renderHook(() => useSuggestionFetcher({ query: "" }));
    expect(result.current.suggestions).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.isOpen).toBe(false);
  });

  it("should set loading and call getSuggestions with valid input", async () => {
    (getSuggestions as jest.Mock).mockResolvedValueOnce([
      { id: 1, name: "Spain" },
    ]);

    const { result } = renderHook(() => useSuggestionFetcher({ query: "spa" }));

    act(() => {
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.suggestions).toEqual([{ id: 1, name: "Spain" }]);
    expect(result.current.error).toBeNull();
    expect(result.current.isOpen).toBe(true);
    expect(getSuggestions).toHaveBeenCalledWith("spa");
  });

  it("should handle error from getSuggestions", async () => {
    (getSuggestions as jest.Mock).mockRejectedValueOnce(new Error("API Down"));
    const { result } = renderHook(() => useSuggestionFetcher({ query: "fra" }));

    act(() => {
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.suggestions).toEqual([]);
    expect(result.current.error).toBe("API Down");
    expect(result.current.isOpen).toBe(false);
  });

  it("should reset state for invalid query", () => {
    const { result } = renderHook(() =>
      useSuggestionFetcher({ query: "123!" })
    );
    expect(result.current.suggestions).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.isOpen).toBe(false);
  });

  it("should limit the number of suggestions by maxSuggestions", async () => {
    (getSuggestions as jest.Mock).mockResolvedValue(
      Array.from({ length: 10 }, (_, i) => ({ id: i, name: `Item${i}` }))
    );
    const { result } = renderHook(() =>
      useSuggestionFetcher({ query: "item", maxSuggestions: 5 })
    );

    act(() => {
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(result.current.suggestions.length).toBe(5);
    });
  });

  it("should allow to set isOpen", () => {
    const { result } = renderHook(() => useSuggestionFetcher({ query: "" }));
    act(() => {
      result.current.setIsOpen(true);
    });
    expect(result.current.isOpen).toBe(true);
  });
});
