import { useSelector } from "react-redux";
import { afterEach, describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import usePaginate from "./usePaginate";

vi.mock("react-redux", () => ({
  useSelector: vi.fn(),
}));

describe("usePaginate", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return pagination values from state", () => {
    const mockPagination = {
      blogsPerPageInHome: 10,
      blogsPerPageInProfile: 5,
      currentProfilePage: 2,
      currentHomePage: 1,
    };

    useSelector.mockImplementation((selector) =>
      selector({ pagination: mockPagination })
    );

    const { result } = renderHook(() => usePaginate());

    expect(result.current).toEqual(mockPagination);
  });
});
