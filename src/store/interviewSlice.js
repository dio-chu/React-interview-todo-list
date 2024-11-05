import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { INTERVIEW_RESULT } from "../constants/interviewStatus";

export const TABLE_HEADERS = [
  { key: "edit", title: "編輯" },
  { key: "companyName", title: "公司名稱" },
  { key: "position", title: "面試職位" },
  { key: "status", title: "狀態" },
  { key: "interviewDate", title: "面試日期" },
  { key: "updateDate", title: "更新日期" },
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
      edit: false,
      companyName: "創新數位有限公司",
      position: "資深前端開發者",
      status: "admitted",
      interviewDate: "2024-11-10",
      updateDate: "2024-10-30",
    },
  ],
  searchText: "",
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
  },
});

// Selectors
export const selectAllInterviews = (state) => state.interviews.interviews;
export const selectSearchText = (state) => state.interviews.searchText;

export const selectFilteredInterviews = (state) => {
  const interviews = selectAllInterviews(state);
  const searchText = selectSearchText(state).toLowerCase();

  return searchText.trim()
    ? interviews.filter(
        (interview) =>
          interview.companyName.toLowerCase().includes(searchText) ||
          interview.position.toLowerCase().includes(searchText) ||
          interview.interviewDate.includes(searchText)
      )
    : interviews;
};

export const {
  addInterview,
  updateInterview,
  deleteInterviews,
  setSearchText,
} = interviewSlice.actions;

export default interviewSlice.reducer;
