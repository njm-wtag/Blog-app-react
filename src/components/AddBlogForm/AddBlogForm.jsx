import { useState } from "react";
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import "./AddBlogForm.scss";
import { postBlog } from "../../features/blogs/blogsSlice";
import ImageDnD from "../ImageDnD/ImageDnD";
import Button from "../Button/Button";
import SelectBox from "../SelectBox/SelectBox";

const AddBlogForm = ({ setIsAddBlogFormOpen }) => {
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.auth);

  const onSubmit = async (blog) => {
    blog.id = Date.now();
    blog.author = authUser;
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

AddBlogForm.propTypes = {
  setIsAddBlogFormOpen: PropTypes.func,
};

export default AddBlogForm;
