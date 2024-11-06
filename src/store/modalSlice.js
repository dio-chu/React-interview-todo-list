import { createSlice } from "@reduxjs/toolkit";
import { INTERVIEW_MODAL_MODE } from "../constants/interviewFormModal";
import { INTERVIEW_RESULT } from "../constants/interviewStatus";

const initialFormData = {
  companyName: "",
  position: "",
  status: INTERVIEW_RESULT.NONE,
  interviewDate: "",
};

const initialState = {
  formModal: {
    isOpen: false,
    mode: INTERVIEW_MODAL_MODE.CREATE,
    formData: initialFormData,
  },
  deleteModal: {
    isOpen: false,
  },
};

export const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openFormModalForCreate: (state) => {
      state.formModal.isOpen = true;
      state.formModal.mode = INTERVIEW_MODAL_MODE.CREATE;
      state.formModal.formData = initialFormData;
    },
    openFormModalForEdit: (state, action) => {
      state.formModal.isOpen = true;
      state.formModal.mode = INTERVIEW_MODAL_MODE.EDIT;
      state.formModal.formData = action.payload;
    },
    closeFormModal: (state) => {
      state.formModal.isOpen = false;
    },
    resetFormData: (state) => {
      state.formModal.formData = initialFormData;
    },
    updateFormData: (state, action) => {
      state.formModal.formData = action.payload;
    },
    openDeleteModal: (state) => {
      state.deleteModal.isOpen = true;
    },
    closeDeleteModal: (state) => {
      state.deleteModal.isOpen = false;
    },
  },
});

export const {
  openFormModalForCreate,
  openFormModalForEdit,
  closeFormModal,
  resetFormData,
  updateFormData,
  openDeleteModal,
  closeDeleteModal,
} = modalSlice.actions;

export default modalSlice.reducer;
