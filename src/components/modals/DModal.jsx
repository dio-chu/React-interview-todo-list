import { useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
import "../../styles/components/modals/DModal.scss";

const DModal = ({
  isShow = false,
  minWidth = "300px",
  minHeight = "200px",
  width = "auto",
  height = "auto",
  isBackdropClick = true,
  isPersistent = false,
  children,
  onClose,
  onExited,
}) => {
  const nodeRef = useRef(null);
  const handleBackdropClick = useCallback(
    (e) => {
      if (e.target.classList.contains("d-modal__backdrop") && isBackdropClick) {
        if (isPersistent) {
          const content = e.currentTarget.querySelector(".d-modal__content");
          content.classList.add("d-modal__content--shake");
          setTimeout(() => {
            content.classList.remove("d-modal__content--shake");
          }, 300);
        } else {
          onClose?.();
        }
      }
    },
    [isBackdropClick, isPersistent, onClose]
  );

  useEffect(() => {
    if (isShow) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isShow]);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isShow}
      timeout={300}
      classNames="d-modal"
      unmountOnExit
      onExited={onExited}
    >
      <div ref={nodeRef} className="d-modal" onClick={handleBackdropClick}>
        <div className="d-modal__backdrop"></div>
        <div
          className="d-modal__content"
          style={{
            minWidth,
            minHeight,
            width,
            height,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </CSSTransition>
  );
};

DModal.propTypes = {
  isShow: PropTypes.bool,
  minWidth: PropTypes.string,
  minHeight: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  isBackdropClick: PropTypes.bool,
  isPersistent: PropTypes.bool,
  children: PropTypes.node,
  onClose: PropTypes.func,
  onExited: PropTypes.func,
};

export default DModal;
