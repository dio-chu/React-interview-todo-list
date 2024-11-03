// hook
import { useState } from "react";

// component
import DButton from "../components/DButton";
import DCheckbox from "../components/DCheckbox";
import DSelect from "../components/DSelect";
import DTextField from "../components/DTextField";
import DDataTable from "../components/DDataTable";

import {
  INTERVIEW_STATUS,
  INTERVIEW_STATUS_OPTIONS,
} from "../constants/interviewStatus";
import { MOCK_INTERVIEWS, TABLE_HEADERS } from "../constants/mockInterviews";

import "./styles/TodoPage.scss";
import { FaPlus, FaSearch, FaTrash } from "react-icons/fa";

const TodoPage = () => {
  const [selectedStatus, setSelectedStatus] = useState(INTERVIEW_STATUS.ALL);
  const [searchText, setSearchText] = useState("");
  const [selectedItems, setSelectedItems] = useState(new Set());

  const handleNewInterview = () => {
    console.log("New interview button clicked!");
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleHeaderCheckboxChange = (checked) => {
    if (checked) {
      setSelectedItems(new Set(MOCK_INTERVIEWS.map((item) => item.id)));
    } else {
      setSelectedItems(new Set());
    }
  };

  const handleItemCheckboxChange = (checked, item) => {
    const newSelected = new Set(selectedItems);
    if (checked) {
      newSelected.add(item.id);
    } else {
      newSelected.delete(item.id);
    }
    setSelectedItems(newSelected);
  };

  const handleDelete = () => {
    console.log("Delete selected items:", Array.from(selectedItems));
  };

  const renderCell = (key, item) => {
    if (key === "status") {
      const statusMap = {
        [INTERVIEW_STATUS.SCHEDULED]: "已安排面試",
        [INTERVIEW_STATUS.COMPLETED]: "已有結果",
      };
      return statusMap[item[key]] || item[key];
    }
    return item[key];
  };

  const searchIcon = <FaSearch style={{ color: "#666", fontSize: "16px" }} />;

  return (
    <div className="todo-page">
      <div className="todo-page__header">
        <DButton
          label="新增面試"
          onClick={handleNewInterview}
          startIcon={<FaPlus />}
        />
      </div>

      <div className="todo-page__filters">
        <DSelect
          options={INTERVIEW_STATUS_OPTIONS}
          selectedValue={selectedStatus}
          onChange={handleStatusChange}
        />
        <DTextField
          value={searchText}
          onChange={handleSearchChange}
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
              onClick={handleDelete}
              density="compact"
              startIcon={<FaTrash />}
              variant="error"
            />
          )}
        </div>
        <DDataTable
          headers={TABLE_HEADERS}
          items={MOCK_INTERVIEWS}
          showCheckbox={true}
          onHeaderCheckboxChange={handleHeaderCheckboxChange}
          onItemCheckboxChange={handleItemCheckboxChange}
          renderCell={renderCell}
          isHeaderChecked={selectedItems.size === MOCK_INTERVIEWS.length}
          getIsItemChecked={(item) => selectedItems.has(item.id)}
        />
      </div>
    </div>
  );
};

export default TodoPage;
