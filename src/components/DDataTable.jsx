import PropTypes from "prop-types";
import DCheckbox from "./DCheckbox";
import {
  TiArrowUnsorted,
  TiArrowSortedUp,
  TiArrowSortedDown,
} from "react-icons/ti";
import "../styles/components/DDataTable.scss";

const DDataTable = ({
  headers = [],
  items = [],
  itemKey = "id",
  showCheckbox = false,
  onHeaderCheckboxChange = () => {},
  onItemCheckboxChange = () => {},
  renderCell,
  isHeaderChecked = false,
  getIsItemChecked = () => false,
  getIsItemCheckboxDisabled = () => false,
  onSort = () => {},
  sortConfig = { key: "", direction: "" },
}) => {
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    onSort(key, direction);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <TiArrowUnsorted />;
    }
    return sortConfig.direction === "asc" ? (
      <TiArrowSortedUp />
    ) : (
      <TiArrowSortedDown />
    );
  };

  return (
    <div className="d-data-table">
      <table>
        <thead>
          <tr>
            {showCheckbox && (
              <th className="d-data-table__checkbox-column">
                <DCheckbox
                  isChecked={isHeaderChecked}
                  onChange={onHeaderCheckboxChange}
                  density="compact"
                />
              </th>
            )}
            {headers.map((header) => (
              <th
                key={header.key}
                onClick={() => header.key !== "edit" && handleSort(header.key)}
                className={
                  header.key !== "edit" ? "d-data-table__sortable-header" : ""
                }
              >
                {header.title}
                {header.key !== "edit" && (
                  <span className="d-data-table__sort-icon">
                    {getSortIcon(header.key)}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item[itemKey]}>
              {showCheckbox && (
                <td className="d-data-table__checkbox-column">
                  <DCheckbox
                    isChecked={getIsItemChecked(item)}
                    onChange={(checked) => onItemCheckboxChange(checked, item)}
                    disabled={getIsItemCheckboxDisabled(item)}
                    density="compact"
                  />
                </td>
              )}
              {headers.map((header) => (
                <td key={`${item[itemKey]}-${header.key}`}>
                  {renderCell ? renderCell(header.key, item) : item[header.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

DDataTable.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
  items: PropTypes.arrayOf(PropTypes.object),
  itemKey: PropTypes.string,
  showCheckbox: PropTypes.bool,
  onHeaderCheckboxChange: PropTypes.func,
  onItemCheckboxChange: PropTypes.func,
  renderCell: PropTypes.func,
  isHeaderChecked: PropTypes.bool,
  getIsItemChecked: PropTypes.func,
  getIsItemCheckboxDisabled: PropTypes.func,
  onSort: PropTypes.func,
  sortConfig: PropTypes.shape({
    key: PropTypes.string,
    direction: PropTypes.string,
  }),
};

export default DDataTable;
