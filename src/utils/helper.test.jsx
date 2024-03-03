import { describe, expect, it } from "vitest";
import { convertToBase64 } from "./helpers";

describe("helper function", () => {
  it("should return base64 string", async () => {
    const file = new File([""], "file");

    await expect(convertToBase64(file)).resolves.toContain("data:application");
  });

  it("should fail with an error", async () => {
    await expect(convertToBase64({})).rejects.toThrowError();
  });
});
