import PropTypes from "prop-types";
import "../styles/components/DCheckbox.scss";

const DCheckbox = ({
  isChecked = false,
  disabled = false,
  label = "",
  density = "default",
  onChange,
}) => {
  // 處理 checkbox 改變事件
  const handleChange = (e) => {
    if (!disabled && onChange) {
      onChange(e.target.checked);
    }
  };

  // 組合 class names
  const checkboxClasses = [
    "d-checkbox",
    `d-checkbox--density-${density}`,
    disabled ? "d-checkbox--disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={checkboxClasses}>
      <span className="d-checkbox__input-wrapper">
        <input
          type="checkbox"
          className="d-checkbox__input"
          checked={isChecked}
          disabled={disabled}
          onChange={handleChange}
        />
        <span className="d-checkbox__checkmark"></span>
      </span>
      {label && <span className="d-checkbox__label">{label}</span>}
    </label>
  );
};

DCheckbox.propTypes = {
  isChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  density: PropTypes.oneOf(["default", "comfortable", "compact"]),
  onChange: PropTypes.func,
};

export default DCheckbox;
