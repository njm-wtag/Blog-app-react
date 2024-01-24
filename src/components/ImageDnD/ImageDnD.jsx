import { useEffect, useMemo } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import "./ImageDnD.scss";

const ImageDnD = ({ input, files, setFiles }) => {
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

  useEffect(() => {
    () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const style = useMemo(
    () => ({
      container: true,
    }),
    []
  );

  return (
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
                  className="image-preview"
                  alt={file.name}
                />
                <button onClick={removeFile(file)}>Remove File</button>
              </div>
            ))}
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default ImageDnD;
