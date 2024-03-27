import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ButtonContainer from ".";

describe("ButtonContainer component", () => {
  const mockSetIsAddBlogFormOpen = vi.fn();
  const mockSetIsEditProfileFormOpen = vi.fn();
  const user = userEvent.setup();

  it("should call setIsAddBlogFormOpen when add blog button is clicked", async () => {
    render(
      <ButtonContainer
        setIsAddBlogFormOpen={mockSetIsAddBlogFormOpen}
        setIsEditProfileFormOpen={mockSetIsEditProfileFormOpen}
      />
    );
    const buttons = screen.queryAllByRole("button");
    const addBlogButton = buttons.find((button) =>
      button.classList.contains("button-container_add-blog")
    );

    await user.click(addBlogButton);

    expect(mockSetIsAddBlogFormOpen).toHaveBeenCalled();
  });

  it("should call setIsEditProfileFormOpen when edit profile button is clicked", async () => {
    render(
      <ButtonContainer
        setIsAddBlogFormOpen={mockSetIsAddBlogFormOpen}
        setIsEditProfileFormOpen={mockSetIsEditProfileFormOpen}
      />
    );
    const buttons = screen.queryAllByRole("button");
    const editProfileButton = buttons.find((button) =>
      button.classList.contains("button-container_edit-profile")
    );

    await user.click(editProfileButton);

    expect(mockSetIsEditProfileFormOpen).toHaveBeenCalled();
  });
});
