export const INTERVIEW_STATUS = {
  ALL: "all",
  SCHEDULED: "scheduled",
  COMPLETED: "completed",
};

export const INTERVIEW_STATUS_FILTERS = [
  {
    id: "1",
    value: INTERVIEW_STATUS.ALL,
    label: "全部",
  },
  {
    id: "2",
    value: INTERVIEW_STATUS.SCHEDULED,
    label: "已安排面試",
  },
  {
    id: "3",
    value: INTERVIEW_STATUS.COMPLETED,
    label: "已有結果",
  },
];

export const INTERVIEW_RESULT = {
  NONE: "none",
  NOT_ADMITTED: "not_admitted",
  ADMITTED: "admitted",
  GHOST: "ghost",
};

export const INTERVIEW_RESULT_OPTIONS = [
  {
    id: "1",
    value: INTERVIEW_RESULT.NONE,
    label: "等待面試",
  },
  {
    id: "2",
    value: INTERVIEW_RESULT.NOT_ADMITTED,
    label: "未錄取",
  },
  {
    id: "3",
    value: INTERVIEW_RESULT.ADMITTED,
    label: "錄取",
  },
  {
    id: "4",
    value: INTERVIEW_RESULT.GHOST,
    label: "無聲卡",
  },
];
