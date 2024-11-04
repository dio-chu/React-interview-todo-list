// hook
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// component
import DButton from "../components/DButton";
import DSelect from "../components/DSelect";
import DTextField from "../components/DTextField";
import DDataTable from "../components/DDataTable";
import DIconButton from "../components/DIconButton";
import DCommonModal from "../components/modals/DCommonModal";
import InterviewFormModal from "./components/InterviewFormModal";

// constant
import { TABLE_HEADERS } from "../constants/tableHeaders";
import {
  INTERVIEW_STATUS,
  INTERVIEW_STATUS_FILTERS,
  INTERVIEW_RESULT_OPTIONS,
} from "../constants/interviewStatus";
import { INTERVIEW_MODAL_MODE } from "../constants/interviewFormModal";

// redux actions and selectors
import {
  addInterview,
  updateInterview,
  deleteInterviews,
  setSelectedStatus,
  setSearchText,
  updateSelectedItems,
  selectInterviews,
  selectSelectedItems,
  selectSelectedStatus,
  selectSearchText,
} from "../store/interviewsSlice";

// style
import "../styles/pages/TodoPage.scss";
import { FaPlus, FaSearch, FaTrash, FaPencilAlt } from "react-icons/fa";

const TodoPage = () => {
  const dispatch = useDispatch();

  // Redux state
  const interviews = useSelector(selectInterviews);
  const selectedItems = useSelector(selectSelectedItems);
  const selectedStatus = useSelector(selectSelectedStatus);
  const searchText = useSelector(selectSearchText);

  // modal 相關的 state 保持本地管理
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(INTERVIEW_MODAL_MODE.CREATE);
  const [formData, setFormData] = useState({
    companyName: "",
    position: "",
    status: "",
    interviewDate: "",
  });

  // Modal handlers
  const onClickNewInterview = () => {
    setModalMode(INTERVIEW_MODAL_MODE.CREATE);
    setFormData({
      companyName: "",
      position: "",
      status: "",
      interviewDate: "",
    });
    setIsFormModalOpen(true);
  };

  const onClickEditInterview = (id) => {
    const editItem = interviews.find((item) => item.id === id);
    setModalMode(INTERVIEW_MODAL_MODE.EDIT);
    setFormData(editItem);
    setIsFormModalOpen(true);
  };

  const onFormModalClose = () => {
    setIsFormModalOpen(false);
  };

  const onFormModalExited = () => {
    setFormData({
      companyName: "",
      position: "",
      status: "",
      interviewDate: "",
    });
  };

  const onFormModalSubmit = (formData) => {
    if (modalMode === INTERVIEW_MODAL_MODE.CREATE) {
      dispatch(addInterview(formData));
    } else {
      dispatch(
        updateInterview({
          id: formData.id,
          ...formData,
        })
      );
    }
    onFormModalClose();
  };

  const onDeleteModalConfirm = () => {
    dispatch(deleteInterviews(Array.from(selectedItems)));
    setIsDeleteModalOpen(false);
  };

  const onClickDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const onDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  // Filter and search handlers
  const onStatusChange = (value) => {
    dispatch(setSelectedStatus(value));
  };

  const onSearchChange = (e) => {
    dispatch(setSearchText(e.target.value));
  };

  // Checkbox handlers
  const onHeaderCheckboxChange = (checked) => {
    dispatch(
      updateSelectedItems({
        checked,
        itemIds: interviews.map((item) => item.id),
      })
    );
  };

  const onItemCheckboxChange = (checked, item) => {
    dispatch(
      updateSelectedItems({
        checked,
        itemIds: item.id,
      })
    );
  };

  const renderCell = (key, item) => {
    if (key === "edit") {
      return (
        <DIconButton
          size="small"
          disabled={!item.edit}
          onClick={() => onClickEditInterview(item.id)}
          icon={<FaPencilAlt style={{ color: "#1976d2" }} />}
        />
      );
    }
    if (key === "status") {
      const statusOption = INTERVIEW_RESULT_OPTIONS.find(
        (option) => option.value === item[key]
      );
      return statusOption ? statusOption.label : "未知狀態";
    }
    return item[key];
  };

  const searchIcon = <FaSearch style={{ color: "#1976d2" }} />;

  return (
    <div className="todo-page">
      <div className="todo-page__header">
        <DButton
          label="新增面試"
          onClick={onClickNewInterview}
          startIcon={<FaPlus />}
        />
      </div>

      <div className="todo-page__filters">
        <DSelect
          value={selectedStatus}
          options={INTERVIEW_STATUS_FILTERS}
          onChange={onStatusChange}
        />
        <DTextField
          value={searchText}
          onChange={onSearchChange}
          prependInnerIcon={searchIcon}
          placeholder="請輸入欲搜尋內容"
          width="300px"
        />
      </div>

      <div className="todo-page__table-wrapper">
        <div className="todo-page__table-actions">
          {selectedItems.size > 0 && (
            <DButton
              label="刪除"
              onClick={onClickDelete}
              density="compact"
              startIcon={<FaTrash />}
              variant="error"
            />
          )}
        </div>
        <DDataTable
          headers={TABLE_HEADERS}
          items={interviews}
          showCheckbox
          onHeaderCheckboxChange={onHeaderCheckboxChange}
          onItemCheckboxChange={onItemCheckboxChange}
          renderCell={renderCell}
          isHeaderChecked={selectedItems.size === interviews.length}
          getIsItemChecked={(item) => selectedItems.has(item.id)}
        />
      </div>

      <InterviewFormModal
        isShow={isFormModalOpen}
        mode={modalMode}
        formData={formData}
        onFormDataChange={setFormData}
        onClose={onFormModalClose}
        onSubmit={onFormModalSubmit}
        onExited={onFormModalExited}
      />

      <DCommonModal
        isShow={isDeleteModalOpen}
        title="確認刪除？"
        confirmText="確認"
        onClose={onDeleteModalClose}
        onConfirm={onDeleteModalConfirm}
      >
        刪除的履歷將無法恢復
      </DCommonModal>
    </div>
  );
};

export default TodoPage;
