import PropTypes from "prop-types";
import "../styles/components/DTextField.scss";

/**
 * DSelect DTextField
 * @author dio-chu
 * @description 輸入input 組件
 */

const DTextField = ({
  value = "",
  onChange,
  appendInnerIcon,
  prependInnerIcon,
  errorMessages = [],
  placeholder,
  width = "100%",
  backgroundColor,
  color,
  ...inputProps
}) => {
  const containerStyle = {
    width: width || "100%",
    "--input-background": backgroundColor,
    "--input-color": color,
  };

  const hasError = Array.isArray(errorMessages) && errorMessages.length > 0;

  return (
    <div className="d-text-field" style={containerStyle}>
      <div
        className={`d-text-field__input-wrapper ${
          hasError ? "d-text-field__input-wrapper--error" : ""
        }`}
      >
        {prependInnerIcon && (
          <div className="d-text-field__icon d-text-field__icon--prepend">
            {prependInnerIcon}
          </div>
        )}

        <input
          type="text"
          className="d-text-field__input"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          {...inputProps}
        />

        {appendInnerIcon && (
          <div className="d-text-field__icon d-text-field__icon--append">
            {appendInnerIcon}
          </div>
        )}
      </div>

      {hasError && (
        <div className="d-text-field__error-messages">
          {errorMessages.map((error, index) => (
            <div key={index} className="d-text-field__error-message">
              {error}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

DTextField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  appendInnerIcon: PropTypes.node,
  prependInnerIcon: PropTypes.node,
  errorMessages: PropTypes.arrayOf(PropTypes.string),
  placeholder: PropTypes.string,
  width: PropTypes.string,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
};

export default DTextField;
