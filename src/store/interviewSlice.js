import { createSlice, createSelector } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import {
  INTERVIEW_RESULT,
  INTERVIEW_STATUS,
} from "../constants/interviewStatus";

export const TABLE_HEADERS = (t) => [
  { key: "edit", title: t("table.edit") },
  { key: "companyName", title: t("table.companyName") },
  { key: "position", title: t("table.position") },
  { key: "status", title: t("table.status") },
  { key: "interviewDate", title: t("table.interviewDate") },
  { key: "updateDate", title: t("table.updateDate") },
];

const initialState = {
  interviews: [
    {
      id: "1",
      edit: true,
      companyName: "科技股份有限公司",
      position: "前端工程師",
      status: "none",
      interviewDate: "2024-11-15",
      updateDate: "2024-11-01",
    },
    {
      id: "2",
      edit: true,
      companyName: "創新數位有限公司",
      position: "資深前端開發者",
      status: "admitted",
      interviewDate: "2024-11-10",
      updateDate: "2024-10-30",
    },
    {
      id: "3",
      edit: true,
      companyName: "網路應用開發公司",
      position: "React 開發工程師",
      status: "not_admitted",
      interviewDate: "2024-11-05",
      updateDate: "2024-11-07",
    },
    {
      id: "4",
      edit: true,
      companyName: "雲端服務科技",
      position: "全端工程師",
      status: "ghost",
      interviewDate: "2024-10-25",
      updateDate: "2024-11-08",
    },
    {
      id: "5",
      edit: true,
      companyName: "智慧物聯網公司",
      position: "前端技術主管",
      status: "none",
      interviewDate: "2024-11-20",
      updateDate: "2024-11-02",
    },
    {
      id: "6",
      edit: true,
      companyName: "電子商務集團",
      position: "UI/前端工程師",
      status: "admitted",
      interviewDate: "2024-10-28",
      updateDate: "2024-11-03",
    },
  ],
  searchText: "",
  selectedStatus: INTERVIEW_STATUS.ALL,
};

const matchesStatusFilter = (interviewStatus, filterStatus) => {
  switch (filterStatus) {
    case INTERVIEW_STATUS.ALL:
      return true;
    case INTERVIEW_STATUS.SCHEDULED:
      return interviewStatus === INTERVIEW_RESULT.NONE;
    case INTERVIEW_STATUS.COMPLETED:
      return interviewStatus !== INTERVIEW_RESULT.NONE;
    default:
      return false;
  }
};

export const interviewSlice = createSlice({
  name: "interviews",
  initialState,
  reducers: {
    addInterview: (state, action) => {
      const currentDate = new Date().toISOString().split("T")[0];
      const newInterview = {
        ...action.payload,
        id: uuidv4(),
        edit: true,
        status: action.payload.status || INTERVIEW_RESULT.NONE,
        updateDate: currentDate,
      };
      state.interviews.push(newInterview);
    },
    updateInterview: (state, action) => {
      const currentDate = new Date().toISOString().split("T")[0];
      const index = state.interviews.findIndex(
        (interview) => interview.id === action.payload.id
      );
      if (index !== -1) {
        state.interviews[index] = {
          ...state.interviews[index],
          ...action.payload,
          updateDate: currentDate,
        };
      }
    },
    deleteInterviews: (state, action) => {
      const idsToDelete = action.payload;
      state.interviews = state.interviews.filter(
        (interview) => !idsToDelete.includes(interview.id)
      );
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },
  },
});

// Selectors
export const selectAllInterviews = (state) => state.interviews.interviews;
export const selectSearchText = (state) => state.interviews.searchText;
export const selectSelectedStatus = (state) => state.interviews.selectedStatus; // 修改選擇器名稱

export const selectStatusFilteredInterviews = createSelector(
  [selectAllInterviews, selectSelectedStatus],
  (interviews, selectedStatus) => {
    return interviews.filter((interview) =>
      matchesStatusFilter(interview.status, selectedStatus)
    );
  }
);

export const selectFilteredInterviews = createSelector(
  [selectStatusFilteredInterviews, selectSearchText],
  (statusFilteredInterviews, searchText) => {
    if (!searchText.trim()) {
      return statusFilteredInterviews;
    }

    const searchLower = searchText.toLowerCase();
    return statusFilteredInterviews.filter((interview) => {
      return (
        interview.companyName.toLowerCase().includes(searchLower) ||
        interview.position.toLowerCase().includes(searchLower) ||
        interview.interviewDate.includes(searchText)
      );
    });
  }
);

export const {
  addInterview,
  updateInterview,
  deleteInterviews,
  setSearchText,
  setSelectedStatus,
} = interviewSlice.actions;

export default interviewSlice.reducer;
