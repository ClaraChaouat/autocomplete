import { getSuggestions } from "./getSuggestions";

beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("getSuggestions", () => {
  it("returns empty array for empty query", async () => {
    const results = await getSuggestions("");
    expect(results).toEqual([]);
  });

  it("returns filtered results for valid query", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => [
        { name: { common: "France" } },
        { name: { common: "Spain" } },
      ],
    });

    const results = await getSuggestions("fra");
    expect(
      results.some((item) => item.name.toLowerCase().includes("fra")),
    ).toBe(true);
  });

  it("handles API errors gracefully", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("API Error"));
    await expect(getSuggestions("test")).rejects.toThrow(
      "Failed to fetch suggestions",
    );
  });

  it("handles non-ok response", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    });
    await expect(getSuggestions("test")).rejects.toThrow(
      "API request failed with status 500",
    );
  });

  it("returns empty array for 404", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 404,
      json: async () => ({}),
    });
    const results = await getSuggestions("xxx");
    expect(results).toEqual([]);
  });
});
