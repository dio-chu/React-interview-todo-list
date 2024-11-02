import PropTypes from "prop-types";
import DModal from "./DModal";
import DButton from "../DButton";
import "../styles/modals/DCommonModal.scss";

const DCommonModal = ({
  title = "",
  onConfirm,
  onCancel,
  showFooter = true,
  confirmText = "",
  cancelText = "",
  ...modalProps
}) => {
  // 檢查是否需要顯示任何按鈕
  const showConfirmButton = confirmText !== "";
  const showCancelButton = cancelText !== "";

  return (
    <DModal {...modalProps}>
      <div className="d-common-modal">
        <div className="d-common-modal__header">
          <h2 className="d-common-modal__title">{title}</h2>
          <button
            className="d-common-modal__close"
            onClick={modalProps.onClose}
          >
            ✕
          </button>
        </div>
        <div className="d-common-modal__content">{modalProps.children}</div>
        {showFooter && (
          <div className="d-common-modal__footer">
            {showCancelButton && (
              <DButton
                label={cancelText}
                onClick={onCancel || modalProps.onClose}
              />
            )}
            {showConfirmButton && (
              <DButton label={confirmText} onClick={onConfirm} />
            )}
          </div>
        )}
      </div>
    </DModal>
  );
};

const commonModalPropTypes = {
  title: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  showFooter: PropTypes.bool,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
};

DCommonModal.propTypes = {
  ...DModal.propTypes,
  ...commonModalPropTypes,
};

export default DCommonModal;
