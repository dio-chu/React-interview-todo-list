// src/constants/interviewFormModal.js
export const INTERVIEW_MODAL_MODE = {
  CREATE: "create",
  EDIT: "edit",
};

export const INTERVIEW_MODAL_TITLE = (t) => ({
  [INTERVIEW_MODAL_MODE.CREATE]: t("interview.add"),
  [INTERVIEW_MODAL_MODE.EDIT]: t("interview.edit"),
});
