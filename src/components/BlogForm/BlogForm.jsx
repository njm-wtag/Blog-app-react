import { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import PropTypes from "prop-types";
import Button from "components/Button/Button";
import SelectBox from "components/SelectBox/SelectBox";
import { convertToBase64 } from "utils/helpers";
import "./BlogForm.scss";

const BlogForm = ({ setIsAddBlogFormOpen, blogDetails, onSubmit }) => {
  const [imagePreview, setImagePreview] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = async (e) => {
    try {
      const newSelectedImage = await convertToBase64(e.target.files[0]);
      setSelectedImage(newSelectedImage);
      input.onChange(newSelectedImage);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    setImagePreview(
      selectedImage !== null || Boolean(blogDetails?.bannerImage)
    );
  }, [selectedImage, blogDetails?.bannerImage]);

  return (
    <Form
      initialValues={blogDetails || null}
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className="title-tags-form-container">
            <div className="title-tags-form-container__field">
              <Field name="title">
                {({ input, meta }) => (
                  <div>
                    <label>Title</label>

                    <input {...input} type="text" />
                    {meta.error && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
            </div>
            <div className="title-tags-form-container__field">
              <Field name="tags" component={"select"} isMulti>
                {({ input, meta }) => (
                  <div>
                    <label>Tags</label>
                    <SelectBox input={input} />
                    {meta.error && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
            </div>
          </div>
          <Field name="bannerImage">
            {({ meta, input }) => (
              <div className="form-container__field">
                <label>Banner Image</label>
                <input type="file" onChange={(e) => handleImageChange(e)} />
                {(blogDetails || selectedImage) && (
                  <img
                    className="author-about__details__image"
                    src={
                      selectedImage ? selectedImage : blogDetails?.bannerImage
                    }
                  />
                )}

                {meta.error && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="body">
            {({ input, meta }) => (
              <div className="form-container__field">
                <label>Blog Body</label>
                <textarea {...input} type="text" />
                {meta.error && <span>{meta.error}</span>}
              </div>
            )}
          </Field>

          <div className="form__buttons">
            <Button type={"submit"} className="submit-button">
              Submit
            </Button>
            <Button
              type={"button"}
              onclickHandler={() => setIsAddBlogFormOpen(false)}
              className="cancel-button"
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    />
  );
};

BlogForm.defaultProps = {
  setIsAddBlogFormOpen: () => {},
  blogDetails: {},
};

BlogForm.propTypes = {
  setIsAddBlogFormOpen: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  blogDetails: PropTypes.shape({
    authorId: PropTypes.string,
    bannerImage: PropTypes.string,
    createdAt: PropTypes.string,
    tags: PropTypes.array,
    title: PropTypes.string,
  }),
};

export default BlogForm;
