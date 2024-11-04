// src/store/interviewsSlice.js
import { createSlice, createSelector } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

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
  ],
  selectedStatus: "all",
  searchText: "",
  // 改用陣列來存儲選中的項目
  selectedItems: [],
};

const interviewSlice = createSlice({
  name: "interviews",
  initialState,
  reducers: {
    addInterview: (state, action) => {
      const newInterview = {
        ...action.payload,
        id: uuidv4(),
        edit: true,
        status: "none",
        updateDate: new Date().toISOString().split("T")[0],
      };
      state.interviews.push(newInterview);
    },
    updateInterview: (state, action) => {
      const index = state.interviews.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.interviews[index] = {
          ...action.payload,
          updateDate: new Date().toISOString().split("T")[0],
        };
      }
    },
    deleteInterviews: (state, action) => {
      state.interviews = state.interviews.filter(
        (interview) => !action.payload.includes(interview.id)
      );
      state.selectedItems = [];
    },
    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    updateSelectedItems: (state, action) => {
      const { checked, itemIds } = action.payload;

      if (Array.isArray(itemIds)) {
        if (checked) {
          // 添加所有項目，避免重複
          const newItems = itemIds.filter(
            (id) => !state.selectedItems.includes(id)
          );
          state.selectedItems.push(...newItems);
        } else {
          // 移除所有指定的項目
          state.selectedItems = state.selectedItems.filter(
            (id) => !itemIds.includes(id)
          );
        }
      } else {
        if (checked) {
          // 添加單個項目
          if (!state.selectedItems.includes(itemIds)) {
            state.selectedItems.push(itemIds);
          }
        } else {
          // 移除單個項目
          state.selectedItems = state.selectedItems.filter(
            (id) => id !== itemIds
          );
        }
      }
    },
  },
});

// Selectors
export const selectInterviews = (state) => state.interviews.interviews;
export const selectSelectedStatus = (state) => state.interviews.selectedStatus;
export const selectSearchText = (state) => state.interviews.searchText;

// 將選中項目轉換為 Set
export const selectSelectedItems = createSelector(
  (state) => state.interviews.selectedItems,
  (selectedItems) => new Set(selectedItems)
);

export const {
  addInterview,
  updateInterview,
  deleteInterviews,
  setSelectedStatus,
  setSearchText,
  updateSelectedItems,
} = interviewSlice.actions;

export default interviewSlice.reducer;
