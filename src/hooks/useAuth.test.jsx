import { useSelector } from "react-redux";
import useAuth from "./useAuth";
import { afterEach, describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";

vi.mock("react-redux", () => ({
  useSelector: vi.fn(),
}));

describe("should render useAuth properly", () => {
  afterEach(() => {
    useSelector.mockClear();
  });

  const useSelectorMock = useSelector.mockImplementation((selector) =>
    selector({
      auth: {
        authUser: { username: "testuser" },
        success: true,
        error: "",
        errorMessage: "",
      },
    })
  );

  it("returns correct authUser, success, error, and errorMessage", () => {
    // const authUser = { username: "testuser" };
    // const success = true;
    // const error = false;
    // const errorMessage = "";

    // useSelector.mockReturnValue({ authUser, success, error, errorMessage });

    const { result } = renderHook(() => useAuth());

    const mockData = useSelectorMock.mock.results[0].value;

    const authUser = mockData.authUser;
    const success = mockData.success;
    const error = mockData.error;
    const errorMessage = mockData.errorMessage;

    expect(result.current.authUser).toBe(authUser);
    expect(result.current.success).toEqual(success);
    expect(result.current.error).toEqual(error);
    expect(result.current.errorMessage).toEqual(errorMessage);
  });
});
