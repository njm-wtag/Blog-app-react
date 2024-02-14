import { mockAuthors, mockCategories } from "../data/mockData";

export const getCategoryById = (categoryId) => {
  return mockCategories?.find((category) => category.id === categoryId);
};

export const getAuthorById = (authorId) => {
  return mockAuthors?.find((author) => author.id === authorId);
};

export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};
