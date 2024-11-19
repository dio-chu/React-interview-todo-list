import PropTypes from "prop-types";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import DCommonModal from "../../components/modals/DCommonModal";
import DTextField from "../../components/DTextField";
import DSelect from "../../components/DSelect";
import { INTERVIEW_RESULT_OPTIONS } from "../../constants/interviewStatus";
import {
  INTERVIEW_MODAL_MODE,
  INTERVIEW_MODAL_TITLE,
} from "../../constants/interviewFormModal";
import "../../styles/pages/InterviewFormModal.scss";

import { useTranslation } from "react-i18next";

const InterviewFormModal = ({
  mode = INTERVIEW_MODAL_MODE.CREATE,
  onSubmit,
  formData,
  ...modalProps
}) => {
  const { t } = useTranslation();
  const statusOptions = INTERVIEW_RESULT_OPTIONS(t);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      companyName: "",
      position: "",
      interviewDate: "",
      status: formData.status,
    },
  });

  useEffect(() => {
    reset(formData);
  }, [formData, reset]);

  const onFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <DCommonModal
      {...modalProps}
      title={INTERVIEW_MODAL_TITLE(t)[mode]}
      confirmText={t("common.save")}
      onConfirm={handleSubmit(onFormSubmit)}
      width="520px"
    >
      <div className="interview-form">
        <div className="interview-form__field">
          <label className="interview-form__label">
            {t("interview.company")}
          </label>
          <Controller
            name="companyName"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <DTextField
                value={value}
                onChange={onChange}
                placeholder={t("interview.companyPlaceholder")}
                width="350px"
                errorMessages={
                  errors.companyName ? [t("vaildation.required")] : []
                }
              />
            )}
          />
        </div>

        <div className="interview-form__field">
          <label className="interview-form__label">
            {t("interview.position")}
          </label>
          <Controller
            name="position"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <DTextField
                value={value}
                onChange={onChange}
                placeholder={t("interview.positionPlaceholder")}
                width="350px"
                errorMessages={
                  errors.position ? [t("vaildation.required")] : []
                }
              />
            )}
          />
        </div>

        {mode === INTERVIEW_MODAL_MODE.EDIT && (
          <div className="interview-form__field">
            <label className="interview-form__label">
              {t("interview.status")}
            </label>
            <Controller
              name="status"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DSelect
                  value={value}
                  onChange={onChange}
                  options={statusOptions}
                  width="350px"
                />
              )}
            />
          </div>
        )}

        <div className="interview-form__field">
          <label className="interview-form__label">{t("interview.date")}</label>
          <Controller
            name="interviewDate"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <DTextField
                value={value}
                onChange={onChange}
                type="date"
                width="350px"
                errorMessages={
                  errors.interviewDate ? [t("vaildation.required")] : []
                }
              />
            )}
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

  onSubmit: PropTypes.func.isRequired,
  ...DCommonModal.propTypes,
};

export default InterviewFormModal;
