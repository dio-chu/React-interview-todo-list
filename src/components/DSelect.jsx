import PropTypes from "prop-types";
import "../styles/components/DSelect.scss";

/**
 * DSelect Component
 * @author dio-chu
 * @description 橫向的選擇組 組件
 * @example
 * <DSelect options={selectData} value={selected} onChange={handleSelectChange} />
 */
const DSelect = ({ options = [], value, onChange = () => {}, name }) => {
  const handleClick = (value) => {
    onChange(value);
  };

  return (
    <div className="d-select">
      {options.map((option) => (
        <button
          key={option.id || option.value}
          className={`d-select__option ${
            option.value === value ? "d-select__option--selected" : ""
          }`}
          onClick={() => handleClick(option.value)}
          type="button"
          name={name}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

DSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
};

export default DSelect;
