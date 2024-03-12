import { afterEach, describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useSelector } from "react-redux";
import useFilter from "./useFilter";

vi.mock("react-redux", () => ({
  useSelector: vi.fn(),
}));

describe("useSearch", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("returns filteredTagsInHome and filteredTagsInProfile from state", () => {
    const mockState = {
      filter: {
        filteredTagsInHome: ["tag1", "tag2"],
        filteredTagsInProfile: ["tag3"],
      },
    };

    useSelector.mockImplementation((selector) => selector(mockState));
    const { result } = renderHook(() => useFilter());

    expect(result.current.filteredTagsInHome).toEqual(["tag1", "tag2"]);
    expect(result.current.filteredTagsInProfile).toEqual(["tag3"]);
  });
});
