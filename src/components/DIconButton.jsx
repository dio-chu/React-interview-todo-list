import PropTypes from "prop-types";
import "../styles/components/DIconButton.scss";

const DIconButton = ({ size = "medium", disabled = false, icon, onClick }) => {
  const buttonClasses = [
    "d-icon-button",
    `d-icon-button--size-${size}`,
    disabled ? "d-icon-button--disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={buttonClasses} disabled={disabled} onClick={onClick}>
      <span className="d-icon-button__icon">{icon}</span>
    </button>
  );
};

DIconButton.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  disabled: PropTypes.bool,
  icon: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default DIconButton;
