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
} from "../constants/interviewStatus";
import { INTERVIEW_MODAL_MODE } from "../constants/interviewFormModal";

// fake data
import { MOCK_INTERVIEWS, TABLE_HEADERS } from "../constants/mockInterviews";

// style
import "../styles/pages/TodoPage.scss";
import { FaPlus, FaSearch, FaTrash, FaPencilAlt } from "react-icons/fa";

const TodoPage = () => {
  // ui
  const [selectedStatus, setSelectedStatus] = useState(INTERVIEW_STATUS.ALL);
  const [searchText, setSearchText] = useState("");
  const [selectedItems, setSelectedItems] = useState(new Set());

  // modal
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(INTERVIEW_MODAL_MODE.CREATE);

  const [formData, setFormData] = useState({
    companyName: "",
    position: "",
    status: "",
    interviewDate: "",
  });

  // 打開 modal 時設置初始數據
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
    const editItem = MOCK_INTERVIEWS.find((item) => item.id === id);
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
    console.log(
      modalMode === INTERVIEW_MODAL_MODE.CREATE
        ? "Create new interview:"
        : "Update interview:",
      formData
    );
    onFormModalClose();
  };

  const onDeleteModalConfirm = () => {
    console.log("Delete selected items:", Array.from(selectedItems));
    setIsDeleteModalOpen(false);
    setSelectedItems(new Set());
  };
  const onClickDelete = () => {
    setIsDeleteModalOpen(true);
  };
  const onDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
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
      setSelectedItems(new Set(MOCK_INTERVIEWS.map((item) => item.id)));
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
      const statusMap = {
        [INTERVIEW_STATUS.SCHEDULED]: "已安排面試",
        [INTERVIEW_STATUS.COMPLETED]: "已有結果",
      };
      return statusMap[item[key]] || item[key];
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
          items={MOCK_INTERVIEWS}
          showCheckbox
          onHeaderCheckboxChange={onHeaderCheckboxChange}
          onItemCheckboxChange={onItemCheckboxChange}
          renderCell={renderCell}
          isHeaderChecked={selectedItems.size === MOCK_INTERVIEWS.length}
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
