import { afterEach, describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useSelector } from "react-redux";
import useRegister from "./useRegister";

vi.mock("react-redux", () => ({
  useSelector: vi.fn(),
}));

describe("should render useRegister hook properly", () => {
  afterEach(() => {
    useSelector.mockClear();
  });

  it("returns register users, success, error state", () => {
    const users = [
      {
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@example.com",
        username: "johndoe",
        password: "password123",
      },
    ];
    const success = true;
    const error = false;

    useSelector.mockReturnValue({ users, success, error });

    const { result } = renderHook(() => useRegister());

    expect(result.current.users).toBe(users);
    expect(result.current.success).toEqual(success);
    expect(result.current.error).toEqual(error);
  });
});
