// hook
import { useState } from "react";

// component
import DButton from "../components/DButton";
import DSelect from "../components/DSelect";
import DTextField from "../components/DTextField";
import DDataTable from "../components/DDataTable";
import DIconButton from "../components/DIconButton";
import DCommonModal from "../components/modals/DCommonModal";
import InterviewFormModal from "./components/InterviewFormModal";

// constant
import {
  INTERVIEW_STATUS,
  INTERVIEW_STATUS_FILTERS,
  INTERVIEW_RESULT_OPTIONS,
} from "../constants/interviewStatus";
import { INTERVIEW_MODAL_MODE } from "../constants/interviewFormModal";

// style
import "../styles/pages/TodoPage.scss";
import { FaPlus, FaSearch, FaTrash, FaPencilAlt } from "react-icons/fa";

// redux
import { useSelector, useDispatch } from "react-redux";
import {
  openFormModalForCreate,
  openFormModalForEdit,
  closeFormModal,
  resetFormData,
  updateFormData,
  openDeleteModal,
  closeDeleteModal,
} from "../store/modalSlice";
import {
  addInterview,
  updateInterview,
  deleteInterviews,
  selectAllInterviews,
  selectInterviewById,
  TABLE_HEADERS,
} from "../store/interviewSlice";

const TodoPage = () => {
  const dispatch = useDispatch();
  // ui
  const [selectedStatus, setSelectedStatus] = useState(INTERVIEW_STATUS.ALL);
  const [searchText, setSearchText] = useState("");
  const [selectedItems, setSelectedItems] = useState(new Set());

  // modal
  const { formModal, deleteModal } = useSelector((state) => state.modals);
  // data table
  const interviews = useSelector(selectAllInterviews);

  // 打開 modal 時設置初始數據
  const onClickNewInterview = () => {
    dispatch(openFormModalForCreate());
  };

  const onClickEditInterview = (id) => {
    const interview = interviews.find((item) => item.id === id);
    dispatch(openFormModalForEdit(interview));
  };

  const onFormModalClose = () => {
    dispatch(closeFormModal());
  };

  const onFormModalExited = () => {
    dispatch(resetFormData());
  };

  const onClickDelete = () => {
    dispatch(openDeleteModal());
  };

  const onDeleteModalClose = () => {
    dispatch(closeDeleteModal());
  };

  const onFormModalSubmit = (formData) => {
    console.log(formData);
    if (formModal.mode === INTERVIEW_MODAL_MODE.CREATE) {
      dispatch(addInterview(formData));
    } else {
      const updateData = {
        ...formData,
        id: formModal.formData.id,
      };
      dispatch(updateInterview(updateData));
    }
    dispatch(closeFormModal());
  };

  const onDeleteModalConfirm = () => {
    dispatch(deleteInterviews(Array.from(selectedItems)));
    dispatch(closeDeleteModal());
    setSelectedItems(new Set());
  };

  // other
  const onStatusChange = (value) => {
    setSelectedStatus(value);
  };

  const onSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const onHeaderCheckboxChange = (checked) => {
    if (checked) {
      setSelectedItems(new Set(interviews.map((item) => item.id)));
    } else {
      setSelectedItems(new Set());
    }
  };

  const onItemCheckboxChange = (checked, item) => {
    const newSelected = new Set(selectedItems);
    if (checked) {
      newSelected.add(item.id);
    } else {
      newSelected.delete(item.id);
    }
    setSelectedItems(newSelected);
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
        isShow={formModal.isOpen}
        mode={formModal.mode}
        formData={formModal.formData}
        onFormDataChange={(data) => dispatch(updateFormData(data))}
        isPersistent
        onClose={onFormModalClose}
        onSubmit={onFormModalSubmit}
        onExited={onFormModalExited}
      />

      <DCommonModal
        isShow={deleteModal.isOpen}
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
