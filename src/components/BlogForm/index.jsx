import { useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import PropTypes from "prop-types";
import Button from "components/Button";
import SelectBox from "components/SelectBox";
import { convertToBase64 } from "utils/helpers";
import { blogFormValidation } from "utils/blogFormValidation";
import "./blogForm.scss";

const BlogForm = ({ setIsAddBlogFormOpen, blogDetails, onSubmit }) => {
  const [imagePreview, setImagePreview] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = async (e, input) => {
    const newSelectedImage = await convertToBase64(e.target.files[0]);
    setSelectedImage(newSelectedImage);
    input.onChange(newSelectedImage);
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
      validate={(values) => blogFormValidation(values)}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div className="form-group-wrapper">
            <Field name="title">
              {({ input, meta }) => (
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input id="title" {...input} type="text" />
                  {meta.error && <span>{meta.error}</span>}
                </div>
              )}
            </Field>

            <Field name="tags" component="select" isMulti>
              {({ input, meta }) => (
                <div className="form-group">
                  <label htmlFor="tags">Tags</label>
                  <SelectBox id="tags" input={input} />
                  {meta.error && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
          </div>
          <Field name="bannerImage">
            {({ meta, input }) => (
              <div className="form-group">
                <label htmlFor="banner-image">Banner Image</label>
                <input
                  id="banner-image"
                  type="file"
                  onChange={(e) => handleImageChange(e, input)}
                />
                {imagePreview && (blogDetails || selectedImage) && (
                  <img
                    src={
                      selectedImage ? selectedImage : blogDetails?.bannerImage
                    }
                    alt="banner-image"
                  />
                )}
                {meta.error && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="body">
            {({ input, meta }) => (
              <div className="form-group">
                <label htmlFor="body">Blog Body</label>
                <textarea id="body" {...input} type="text" />
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
              onClickHandler={() => setIsAddBlogFormOpen(false)}
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
