import { Field, Form } from "react-final-form";
import PropTypes from "prop-types";
import "./AddBlogForm.scss";
import ImageDnD from "../ImageDnD/ImageDnD";
import Button from "../Button/Button";
import SelectBox from "../SelectBox/SelectBox";

const AddBlogForm = ({
  setIsAddBlogFormOpen,
  blogDetails,
  onSubmit,
  files,
  setFiles,
}) => {
  if (blogDetails) console.log(blogDetails);

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

                <ImageDnD input={input} files={files} setFiles={setFiles} />
                <img src={blogDetails?.imagePreview} />

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
