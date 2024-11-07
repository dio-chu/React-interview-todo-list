// src/constants/interviewStatus.js
export const INTERVIEW_STATUS = {
  ALL: "all",
  SCHEDULED: "scheduled",
  COMPLETED: "completed",
};

export const INTERVIEW_RESULT = {
  NONE: "none",
  NOT_ADMITTED: "not_admitted",
  ADMITTED: "admitted",
  GHOST: "ghost",
};

export const INTERVIEW_COLORS = {
  admitted: "#007EE2",
  not_admitted: "#D82222",
  none: "#00A096",
  ghost: "#8F8F8F",
};

// 保持原本的名稱，但改為函數形式
export const INTERVIEW_STATUS_FILTERS = (t) => [
  {
    id: "1",
    value: INTERVIEW_STATUS.ALL,
    label: t("status.all"),
  },
  {
    id: "2",
    value: INTERVIEW_STATUS.SCHEDULED,
    label: t("status.scheduled"),
  },
  {
    id: "3",
    value: INTERVIEW_STATUS.COMPLETED,
    label: t("status.completed"),
  },
];

export const INTERVIEW_RESULT_OPTIONS = (t) => [
  {
    id: "1",
    value: INTERVIEW_RESULT.NONE,
    label: t("status.none"),
  },
  {
    id: "2",
    value: INTERVIEW_RESULT.NOT_ADMITTED,
    label: t("status.notAdmitted"),
  },
  {
    id: "3",
    value: INTERVIEW_RESULT.ADMITTED,
    label: t("status.admitted"),
  },
  {
    id: "4",
    value: INTERVIEW_RESULT.GHOST,
    label: t("status.ghost"),
  },
];
