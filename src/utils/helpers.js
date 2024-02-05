import { mockAuthors, mockCategories } from "../data/mockData";

export const getCategoryById = (categoryId) => {
  return mockCategories?.find((category) => category.id === categoryId);
};

export const getAuthorById = (authorId) => {
  return mockAuthors?.find((author) => author.id === authorId);
};
