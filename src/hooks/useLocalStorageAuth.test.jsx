import { beforeEach, describe, expect, it } from "vitest";
import useLocalStorageAuth from "./useLocalStorageAuth";

describe("useLocalStorageAuth", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return true if authUser exists in localStorage", () => {
    const authUser = { username: "testuser", password: "password123" };
    localStorage.setItem("authUser", JSON.stringify(authUser));

    expect(useLocalStorageAuth()).toBe(true);
  });

  it("should return false if authUser does not exist in localStorage", () => {
    expect(useLocalStorageAuth()).toBe(false);
  });

  it("should return false if authUser in localStorage is incomplete", () => {
    const authUser = { username: "testuser" };
    localStorage.setItem("authUser", JSON.stringify(authUser));

    expect(useLocalStorageAuth()).toBe(false);
  });
});
