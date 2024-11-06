// hook
import { useState, useEffect } from "react";

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
  INTERVIEW_COLORS,
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
  setSearchText,
  selectSearchText,
  setSelectedStatus,
  selectSelectedStatus,
  selectFilteredInterviews,
  TABLE_HEADERS,
} from "../store/interviewSlice";

const TodoPage = () => {
  const dispatch = useDispatch();
  // redux modal
  const { formModal, deleteModal } = useSelector((state) => state.modals);

  // redux interview
  const interviews = useSelector(selectAllInterviews);
  const searchText = useSelector(selectSearchText);
  const selectedStatus = useSelector(selectSelectedStatus);
  const filteredInterviews = useSelector(selectFilteredInterviews);

  // checkbox
  const [selectedItems, setSelectedItems] = useState(new Set());
  useEffect(() => {
    setSelectedItems(new Set());
  }, [selectedStatus, searchText]);

  // Form Modal Actions
  const formModalActions = {
    openForCreate: () => {
      dispatch(openFormModalForCreate());
    },
    openForEdit: (id) => {
      const interview = interviews.find((item) => item.id === id);
      dispatch(openFormModalForEdit(interview));
    },
    close: () => {
      dispatch(closeFormModal());
    },
    reset: () => {
      dispatch(resetFormData());
    },
    submit: (formData) => {
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
    },
    updateData: (data) => {
      dispatch(updateFormData(data));
    },
  };

  // Delete Modal Actions
  const deleteModalActions = {
    open: () => {
      dispatch(openDeleteModal());
    },
    close: () => {
      dispatch(closeDeleteModal());
    },
    confirm: () => {
      dispatch(deleteInterviews(Array.from(selectedItems)));
      dispatch(closeDeleteModal());
      setSelectedItems(new Set());
    },
  };

  // filter DSelect&DTextField
  const onStatusChange = (value) => {
    dispatch(setSelectedStatus(value));
  };

  const onSearchChange = (e) => {
    dispatch(setSearchText(e.target.value));
  };

  // checkbox
  const onHeaderCheckboxChange = (checked) => {
    if (checked) {
      setSelectedItems(new Set(filteredInterviews.map((item) => item.id)));
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
          onClick={() => formModalActions.openForEdit(item.id)}
          icon={<FaPencilAlt style={{ color: "#1976d2" }} />}
        />
      );
    }
    if (key === "status") {
      const statusOption = INTERVIEW_RESULT_OPTIONS.find(
        (option) => option.value === item[key]
      );
      return statusOption ? (
        <span
          style={{
            color: INTERVIEW_COLORS[item[key]],
          }}
        >
          {statusOption.label}
        </span>
      ) : (
        "未知狀態"
      );
    }
    return item[key];
  };

  return (
    <div className="todo-page">
      <div className="todo-page__header">
        <DButton
          label="新增面試"
          onClick={formModalActions.openForCreate}
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
          prependInnerIcon={<FaSearch style={{ color: "#1976d2" }} />}
          placeholder="請輸入欲搜尋內容"
          width="300px"
        />
      </div>

      <div className="todo-page__table-wrapper">
        <div className="todo-page__table-actions">
          {selectedItems.size > 0 && (
            <DButton
              label="刪除"
              onClick={deleteModalActions.open}
              density="compact"
              startIcon={<FaTrash />}
            />
          )}
        </div>
        <DDataTable
          headers={TABLE_HEADERS}
          items={filteredInterviews}
          showCheckbox
          onHeaderCheckboxChange={onHeaderCheckboxChange}
          onItemCheckboxChange={onItemCheckboxChange}
          renderCell={renderCell}
          isHeaderChecked={selectedItems.size === filteredInterviews.length}
          getIsItemChecked={(item) => selectedItems.has(item.id)}
        />
      </div>

      <InterviewFormModal
        isShow={formModal.isOpen}
        mode={formModal.mode}
        formData={formModal.formData}
        onFormDataChange={formModalActions.updateData}
        isPersistent
        onClose={formModalActions.close}
        onSubmit={formModalActions.submit}
        onExited={formModalActions.reset}
      />

      <DCommonModal
        isShow={deleteModal.isOpen}
        title="確認刪除？"
        confirmText="確認"
        onClose={deleteModalActions.close}
        onConfirm={deleteModalActions.confirm}
      >
        刪除的履歷將無法恢復
      </DCommonModal>
    </div>
  );
};

export default TodoPage;
