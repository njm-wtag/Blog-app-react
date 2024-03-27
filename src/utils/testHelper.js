export const mockAuthUser = {
  firstname: "John",
  lastname: "Doe",
  profileImage: null,
  subtitle: "Subtitle",
  about: "About me",
};

export const mockAuthUserWithProfileImage = {
  firstname: "John",
  lastname: "Doe",
  username: "johndoe",
  subtitle: "Software Engineer",
  about: "Lorem ipsum dolor sit amet",
  profileImage: "profile.jpg",
};

export const mockBlogs = [
  {
    id: "1",
    authorId: "author1",
    bannerImage: "banner1.jpg",
    createdAt: "2024-02-28T12:00:00.000Z",
    tags: [{ value: "technology", label: "Technology" }],
    title: "Sample Blog 1",
  },
  {
    id: "2",
    authorId: "author2",
    bannerImage: "banner2.jpg",
    createdAt: "2024-02-28T12:00:00.000Z",
    tags: [{ value: "flim", label: "Flim" }],
    title: "Sample Blog 2",
  },
  {
    id: "3",
    authorId: "author1",
    bannerImage: "banner3.jpg",
    createdAt: "2024-03-05T12:00:00.000Z",
    tags: [{ value: "technology", label: "Technology" }],
    title: "Sample Blog 3",
  },
];

export const mockUsers = [
  {
    id: "author1",
    username: "John Doe",
  },
  {
    id: "author2",
    username: "James Smith",
  },
];

export const mockTags = [
  { value: "technology", label: "Technology" },
  { value: "poetry", label: "Poetry" },
  { value: "flims", label: "Flims" },
  { value: "world politics", label: "World Politics" },
];
