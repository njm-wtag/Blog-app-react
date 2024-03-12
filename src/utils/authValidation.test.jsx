import { describe, expect, it } from "vitest";
import authValidation from "./authValidation";

describe("authValidation", () => {
  it("should validate input values for login form", () => {
    const values = {
      username: "testuser",
      password: "password123",
    };
    const isRegisterForm = false;
    const errors = authValidation(values, isRegisterForm);
    expect(errors).toEqual({});
  });

  it("should validate input values for login form when any required field is missing", () => {
    const values = {
      password: "password123",
    };
    const isRegisterForm = false;
    const errors = authValidation(values, isRegisterForm);
    expect(errors).toEqual({
      username: "User name is required",
    });
  });

  it("should validate input values for register form", () => {
    const values = {
      firstname: "John",
      lastname: "Doe",
      email: "john@example.com",
      username: "johndoe",
      password: "password123",
    };
    const isRegisterForm = true;
    const errors = authValidation(values, isRegisterForm);
    expect(errors).toEqual({});
  });

  it("should validate input values for register form when required fields are missing", () => {
    const values = {
      email: "john@example.com",
      password: "password123",
    };
    const isRegisterForm = true;
    const errors = authValidation(values, isRegisterForm);
    expect(errors).toEqual({
      firstname: "First name is required",
      lastname: "Last name is required",
      username: "User name is required",
    });
  });

  it("should validate input values for register form when email is invalid", () => {
    const values = {
      firstname: "John",
      lastname: "Doe",
      email: "johndoe@",
      username: "johndoe",
      password: "password123",
    };
    const isRegisterForm = true;
    const errors = authValidation(values, isRegisterForm);
    expect(errors).toEqual({
      email: "Invalid email address",
    });
  });

  it("should validate input values for register form when password is too short", () => {
    const values = {
      firstname: "John",
      lastname: "Doe",
      email: "john@example.com",
      username: "johndoe",
      password: "abcd",
    };
    const isRegisterForm = true;
    const errors = authValidation(values, isRegisterForm);
    expect(errors).toEqual({
      password: "Password must be at least 8 characters",
    });
  });
});
