import { useSelector } from "react-redux";
import { afterEach, describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import useBlogs from "./useBlogs";

vi.mock("react-redux", () => ({
  useSelector: vi.fn(),
}));

describe("useBlogs", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return blogs from state", () => {
    const mockBlogs = [
      { id: 1, title: "Blog 1" },
      { id: 2, title: "Blog 2" },
    ];
    useSelector.mockReturnValue({ blogs: mockBlogs });

    const { result } = renderHook(() => useBlogs());

    console.log("Result:", result.current);

    expect(result.current).toEqual(mockBlogs);
  });
});