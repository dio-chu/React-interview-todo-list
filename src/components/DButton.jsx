import PropTypes from "prop-types";
import "./styles/DButton.scss";

const DButton = ({
  size = "medium",
  label = "",
  disabled = false,
  appendIcon = "",
  density = "default",
  onClick,
}) => {
  const buttonClasses = [
    "d-button",
    `d-button--size-${size}`,
    `d-button--density-${density}`,
    disabled ? "d-button--disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={buttonClasses} disabled={disabled} onClick={onClick}>
      <span className="d-button__label">{label}</span>
      {appendIcon && <span className="d-button__icon">{appendIcon}</span>}
    </button>
  );
};

DButton.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  label: PropTypes.string,
  disabled: PropTypes.bool,
  appendIcon: PropTypes.node,
  density: PropTypes.oneOf(["default", "comfortable", "compact"]),
  onClick: PropTypes.func,
};

export default DButton;
