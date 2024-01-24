import Select from "react-select";

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

const SelectBox = ({ input }) => {
  return (
    <Select {...input} options={options} isMulti styles={customStyles}></Select>
  );
};

export default SelectBox;
