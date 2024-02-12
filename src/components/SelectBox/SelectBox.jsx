import Select from "react-select";

const customStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    height: "28px",
  }),

  indicatorSeparator: () => null,
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    let backgroundColor, color, cursor;

    if (isDisabled) {
      backgroundColor = undefined;
      color = "#ccc";
      cursor = "not-allowed";
    } else if (isSelected) {
      backgroundColor = data.color;
      color = "white";
      cursor = "default";
    } else if (isFocused) {
      backgroundColor = "white";
      color = "black";
      cursor = "default";
    } else {
      backgroundColor = undefined;
      color = "black";
      cursor = "default";
    }

    return {
      ...styles,
      backgroundColor,
      color,
      cursor,
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
    bottom: "50%",
    left: "90%",
    ":hover": {
      backgroundColor: "#E30B59",
      color: "white",
    },
  }),
};

export const tags = [
  { value: "technology", label: "Technology" },
  { value: "poetry", label: "Poetry" },
  { value: "flims", label: "Flims" },
  { value: "world politics", label: "World Politics" },
];

const SelectBox = ({ input }) => {
  return (
    <Select {...input} options={tags} isMulti styles={customStyles}></Select>
  );
};

export default SelectBox;
