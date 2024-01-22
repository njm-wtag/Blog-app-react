import { useEffect, useMemo, useState } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import { Field, Form } from "react-final-form";
import Select from "react-select";
import "./AddBlogForm.scss";
import { useSelector } from "react-redux";

const img = {
  display: "block",
  width: "auto",
  maxHeight: "4rem",
};

const baseStyle = {
  height: "10rem",
  padding: "1rem",
  borderRadius: 2,
  borderColor: "#E8E8EA",
  borderStyle: "dashed",
  backgroundColor: "#FFFFFF",
  color: "#bdbdbd",
};

const customStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    height: "32px",
  }),
  indicatorSeparator: () => null,
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? "white"
        : undefined,
      color: isDisabled ? "#ccc" : isSelected ? "white" : "black",

      cursor: isDisabled ? "not-allowed" : "default",
    };
  },
  multiValue: (styles) => {
    return {
      ...styles,
      backgroundColor: "#EAEAF3",
      padding: "0 6px",
      margin: "0 16px",
      position: "relative",
    };
  },

  multiValueRemove: (styles) => ({
    ...styles,
    backgroundColor: "#E30B59",
    color: "white",
    borderRadius: "25px",
    position: "absolute",
    top: -5,
    right: -15,
    ":hover": {
      backgroundColor: "#E30B59",
      color: "white",
    },
  }),
};

const options = [
  { value: "technology", label: "Technology" },
  { value: "poetry", label: "Poetry" },
  { value: "flims", label: "Flims" },
  { value: "world politics", label: "World Politics" },
];

const AddBlogForm = () => {
  const { authUser } = useSelector((state) => state.auth);
  const onSubmit = async (values) => {
    console.log(values);

    let imagePreview = await convertToBase64(files[0]);
    values.imagePreview = imagePreview;
    values.author = authUser;
    const existingBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const newBlog = [...existingBlogs, values];
    localStorage.setItem("blogs", JSON.stringify(newBlog));
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
  const [files, setFiles] = useState([]);
  const { open } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const removeFile = (file) => () => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const style = useMemo(
    () => ({
      ...baseStyle,
    }),
    []
  );

  return (
    <Form
      onSubmit={onSubmit}
      //   validate={validate}
      //   initialValues={initialValues}
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

                    <Select
                      {...input}
                      options={options}
                      isMulti
                      styles={customStyles}
                    ></Select>
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

                <Dropzone onDrop={(file) => input.onChange(file)}>
                  {({ getRootProps, getInputProps }) => (
                    <section className="container" onClick={open}>
                      <div {...getRootProps({ style })}>
                        <input {...getInputProps()} type="file" />
                        <p>
                          Drop your image here, or
                          <span> browse</span>
                        </p>

                        {files.map((file) => (
                          <div key={file.name}>
                            <img
                              src={file.preview}
                              style={img}
                              alt={file.name}
                            />

                            <button onClick={removeFile(file)}>
                              Remove File
                            </button>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </Dropzone>

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

          <div>
            <button
              type="submit"
              // disabled={submitting || pristine}
            >
              Submit
            </button>
          </div>
        </form>
      )}
    />
  );
};

export default AddBlogForm;
