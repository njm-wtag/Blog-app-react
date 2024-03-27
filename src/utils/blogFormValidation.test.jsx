import { describe, expect, it } from "vitest";
import { blogFormValidation } from "./blogFormValidation";

describe("blogFormValidation", () => {
  it("validates input values and returns no errors when all fields are present", () => {
    const values = {
      title: "Test Title",
      tags: ["tag1", "tag2"],
      bannerImage: "banner.jpg",
      body: "Test body content",
    };
    const errors = blogFormValidation(values);
    expect(errors).toEqual({});
  });

  it("validates input values and returns errors when all fields are missing", () => {
    const values = {};
    const errors = blogFormValidation(values);
    expect(errors).toEqual({
      title: "Title is required",
      tags: "Tags are required",
      bannerImage: "Banner Image is required",
      body: "Blog Body is required",
    });
  });

  it("validates input values and returns errors when title is missing", () => {
    const values = {
      tags: ["tag1", "tag2"],
      bannerImage: "banner.jpg",
      body: "Test body content",
    };
    const errors = blogFormValidation(values);
    expect(errors).toEqual({
      title: "Title is required",
    });
  });

  it("validates input values and returns errors when tags are empty", () => {
    const values = {
      title: "Test Title",
      tags: [],
      bannerImage: "banner.jpg",
      body: "Test body content",
    };
    const errors = blogFormValidation(values);
    expect(errors).toEqual({
      tags: "Tags are required",
    });
  });

  it("validates input values and returns errors when bannerImage is missing", () => {
    const values = {
      title: "Test Title",
      tags: ["tag1", "tag2"],
      body: "Test body content",
    };
    const errors = blogFormValidation(values);
    expect(errors).toEqual({
      bannerImage: "Banner Image is required",
    });
  });

  it("validates input values and returns errors when body is missing", () => {
    const values = {
      title: "Test Title",
      tags: ["tag1", "tag2"],
      bannerImage: "banner.jpg",
    };
    const errors = blogFormValidation(values);
    expect(errors).toEqual({
      body: "Blog Body is required",
    });
  });
});
