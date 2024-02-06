import { useState } from "react";
import { useDispatch } from "react-redux";
import { Field, Form } from "react-final-form";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import useAuth from "hooks/useAuth";
import { postBlog } from "features/blogs/blogsSlice";
import ImageDnD from "components/ImageDnD/ImageDnD";
import Button from "components/Button/Button";
import SelectBox from "components/SelectBox/SelectBox";
import "./AddBlogForm.scss";

const AddBlogForm = ({ setIsAddBlogFormOpen }) => {
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const { authUser } = useAuth();

  const onSubmit = async (blog) => {
    blog.id = uuidv4();
    blog.authorId = authUser.id;
    blog.createdAt = new Date().toISOString();
    const imagePreview = await convertToBase64(files[0]);
    blog.imagePreview = imagePreview;
    dispatch(postBlog(blog));
    setIsAddBlogFormOpen(false);
  };

  const convertToBase64 = (file) => {
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

  return (
    <Form
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

                <ImageDnD input={input} files={files} setFiles={setFiles} />

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

AddBlogForm.propTypes = {
  setIsAddBlogFormOpen: PropTypes.func.isRequired,
};

export default AddBlogForm;
