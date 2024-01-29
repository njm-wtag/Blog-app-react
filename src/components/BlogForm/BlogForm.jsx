import { Field, Form } from "react-final-form";
import PropTypes from "prop-types";
import "./BlogForm.scss";
import Button from "../Button/Button";
import SelectBox from "../SelectBox/SelectBox";
import { useEffect, useState } from "react";
import { convertToBase64 } from "../../utils/base64Image";

const BlogForm = ({ setIsAddBlogFormOpen, blogDetails, onSubmit }) => {
  const [imagePreview, setImagePreview] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setImagePreview(
      selectedImage !== null || Boolean(blogDetails?.bannerImage)
    );
  }, [selectedImage, blogDetails?.bannerImage]);

  return (
    <Form
      initialValues={blogDetails ? blogDetails : null}
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
                <input
                  type="file"
                  onChange={async (e) => {
                    const newSelectedImage = await convertToBase64(
                      e.target.files[0]
                    );
                    setSelectedImage(newSelectedImage);
                    input.onChange(newSelectedImage);
                  }}
                />
                {(blogDetails || selectedImage) && (
                  <img
                    className="author-about__details__image"
                    src={
                      selectedImage ? selectedImage : blogDetails.bannerImage
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

BlogForm.propTypes = {
  setIsAddBlogFormOpen: PropTypes.func,
};

export default BlogForm;
