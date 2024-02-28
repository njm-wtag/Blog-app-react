import { beforeEach, describe, expect, it } from "vitest";
import authenticateUser from "./authUtils";

describe("authenticateUser", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should return authenticated user if credentials match an existing user", () => {
    const existingUsers = [
      { username: "user1", password: "password1" },
      { username: "user2", password: "password2" },
    ];
    localStorage.setItem("users", JSON.stringify(existingUsers));
    const credentials = { username: "user1", password: "password1" };
    expect(authenticateUser(credentials)).toEqual(existingUsers[0]);
  });

  it("should return undefined if credentials do not match any existing user", () => {
    const existingUsers = [
      { username: "user1", password: "password1" },
      { username: "user2", password: "password2" },
    ];
    localStorage.setItem("users", JSON.stringify(existingUsers));

    const credentials = { username: "nonexistent", password: "password123" };
    expect(authenticateUser(credentials)).toBeUndefined();
  });

  it("returns undefined if there are no existing users in localStorage", () => {
    const credentials = { username: "user1", password: "password1" };
    expect(authenticateUser(credentials)).toBeUndefined();
  });
});
