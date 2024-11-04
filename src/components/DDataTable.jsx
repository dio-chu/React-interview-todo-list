import PropTypes from "prop-types";
import DCheckbox from "./DCheckbox";
import "../styles/components/DDataTable.scss";

const DDataTable = ({
  headers = [],
  items = [],
  itemKey = "id",
  showCheckbox = false,
  onHeaderCheckboxChange = () => {},
  onItemCheckboxChange = () => {},
  renderCell, // 用於自定義單元格渲染
  isHeaderChecked = false,
  getIsItemChecked = () => false,
  getIsItemCheckboxDisabled = () => false,
}) => {
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
              <th key={header.key}>{header.title}</th>
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
};

export default DDataTable;
