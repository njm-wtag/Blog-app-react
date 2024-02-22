export const blogFormValidation = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = "Title is required";
  }
  if (!values.tags || values.tags.length === 0) {
    errors.tags = "Tags are required";
  }
  if (!values.bannerImage) {
    errors.bannerImage = "Banner Image is required";
  }
  if (!values.body) {
    errors.body = "Blog Body is required";
  }
  return errors;
};
