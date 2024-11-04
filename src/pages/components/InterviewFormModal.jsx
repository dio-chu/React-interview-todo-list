import PropTypes from "prop-types";
import DCommonModal from "../../components/modals/DCommonModal";
import DTextField from "../../components/DTextField";
import DSelect from "../../components/DSelect";
import { INTERVIEW_RESULT_OPTIONS } from "../../constants/interviewStatus";
import {
  INTERVIEW_MODAL_MODE,
  INTERVIEW_MODAL_TITLE,
} from "../../constants/interviewFormModal";
import "../../styles/pages/InterviewFormModal.scss";

const InterviewFormModal = ({
  mode = INTERVIEW_MODAL_MODE.CREATE,
  onSubmit,
  formData,
  onFormDataChange,
  ...modalProps
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFormDataChange({ ...formData, [name]: value });
  };

  const handleSelectChange = (value) => {
    onFormDataChange({ ...formData, status: value });
  };

  return (
    <DCommonModal
      {...modalProps}
      title={INTERVIEW_MODAL_TITLE[mode]}
      confirmText="儲存"
      onConfirm={() => onSubmit(formData)}
      width="480px"
    >
      <div className="interview-form">
        <div className="interview-form__field">
          <label className="interview-form__label">公司名稱</label>
          <DTextField
            name="companyName"
            placeholder="請輸入公司名稱"
            value={formData.companyName}
            onChange={handleInputChange}
          />
        </div>

        <div className="interview-form__field">
          <label className="interview-form__label">面試職位</label>
          <DTextField
            name="position"
            placeholder="請輸入面試職位"
            value={formData.position}
            onChange={handleInputChange}
          />
        </div>

        {mode === INTERVIEW_MODAL_MODE.EDIT && (
          <div className="interview-form__field">
            <label className="interview-form__label">面試進度</label>
            <DSelect
              name="status"
              options={INTERVIEW_RESULT_OPTIONS}
              value={formData.status}
              onChange={handleSelectChange}
            />
          </div>
        )}

        <div className="interview-form__field">
          <label className="interview-form__label">面試日期</label>
          <DTextField
            name="interviewDate"
            type="date"
            value={formData.interviewDate}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </DCommonModal>
  );
};

InterviewFormModal.propTypes = {
  mode: PropTypes.oneOf(Object.values(INTERVIEW_MODAL_MODE)),
  formData: PropTypes.shape({
    companyName: PropTypes.string,
    position: PropTypes.string,
    interviewDate: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  onFormDataChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  ...DCommonModal.propTypes,
};

export default InterviewFormModal;
