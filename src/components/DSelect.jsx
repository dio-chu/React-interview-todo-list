import PropTypes from "prop-types";
import "./styles/DSelect.scss";

/**
 * DSelect Component
 * @author dio-chu
 * @description
 * @example
 * <DSelect options={selectData} selectedValue={selected} onChange={handleSelectChange} />
 */
const DSelect = ({ options, selectedValue, onChange }) => {
  const updateValue = (value) => {
    onChange(value);
  };

  return (
    <div className="d-select">
      {options.map((option) => (
        <button
          key={option.id}
          className={`d-select__option ${
            option.value === selectedValue ? "d-select__option--selected" : ""
          }`}
          onClick={() => updateValue(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

// Prop Types for type checking
DSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

DSelect.defaultProps = {
  selectedValue: "",
};

export default DSelect;
