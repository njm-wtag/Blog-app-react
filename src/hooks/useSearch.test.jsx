import { useSelector } from "react-redux";
import { afterEach, describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import useSearch from "./useSearch";

vi.mock("react-redux", () => ({
  useSelector: vi.fn(),
}));

describe("useSearch", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("returns homeQuery and profileQuery from state", () => {
    const mockState = {
      search: {
        homeQuery: "home",
        profileQuery: "profile",
      },
    };

    useSelector.mockImplementation((selector) => selector(mockState));
    const { result } = renderHook(() => useSearch());

    expect(result.current.homeQuery).toBe("home");
    expect(result.current.profileQuery).toBe("profile");
  });
});
