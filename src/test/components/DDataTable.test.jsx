import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DDataTable from "../../components/DDataTable";

describe("DDataTable Component", () => {
  // 測試數據
  const mockHeaders = [
    { key: "name", title: "Name" },
    { key: "age", title: "Age" },
    { key: "email", title: "Email" },
  ];

  const mockItems = [
    { id: "1", name: "John Doe", age: 25, email: "john@example.com" },
    { id: "2", name: "Jane Smith", age: 30, email: "jane@example.com" },
  ];

  // 測試基本渲染
  it("renders table with headers and items", () => {
    render(<DDataTable headers={mockHeaders} items={mockItems} />);

    // 檢查表頭
    mockHeaders.forEach((header) => {
      expect(screen.getByText(header.title)).toBeInTheDocument();
    });

    // 檢查數據
    mockItems.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(item.age.toString())).toBeInTheDocument();
      expect(screen.getByText(item.email)).toBeInTheDocument();
    });
  });

  // 測試空數據渲染
  it("renders empty table", () => {
    render(<DDataTable headers={mockHeaders} items={[]} />);

    // 檢查表頭是否存在
    mockHeaders.forEach((header) => {
      expect(screen.getByText(header.title)).toBeInTheDocument();
    });

    // 檢查表體是否為空
    const tbody = document.querySelector("tbody");
    expect(tbody.children).toHaveLength(0);
  });

  // 測試複選框功能
  it("renders checkboxes when showCheckbox is true", () => {
    render(
      <DDataTable headers={mockHeaders} items={mockItems} showCheckbox={true} />
    );

    // 檢查表頭複選框
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes).toHaveLength(mockItems.length + 1); // items + header
  });

  // 測試表頭複選框變更
  it("handles header checkbox change", () => {
    const onHeaderCheckboxChange = vi.fn();
    render(
      <DDataTable
        headers={mockHeaders}
        items={mockItems}
        showCheckbox={true}
        onHeaderCheckboxChange={onHeaderCheckboxChange}
      />
    );

    const headerCheckbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(headerCheckbox);
    expect(onHeaderCheckboxChange).toHaveBeenCalled();
  });

  // 測試行複選框變更
  it("handles item checkbox change", () => {
    const onItemCheckboxChange = vi.fn();
    render(
      <DDataTable
        headers={mockHeaders}
        items={mockItems}
        showCheckbox={true}
        onItemCheckboxChange={onItemCheckboxChange}
      />
    );

    const itemCheckbox = screen.getAllByRole("checkbox")[1];
    fireEvent.click(itemCheckbox);
    expect(onItemCheckboxChange).toHaveBeenCalledWith(true, mockItems[0]);
  });

  // 測試自定義單元格渲染
  it("uses custom cell renderer when provided", () => {
    const renderCell = (key, item) => {
      if (key === "age") return `${item.age} years old`;
      return item[key];
    };

    render(
      <DDataTable
        headers={mockHeaders}
        items={mockItems}
        renderCell={renderCell}
      />
    );

    expect(screen.getByText("25 years old")).toBeInTheDocument();
    expect(screen.getByText("30 years old")).toBeInTheDocument();
  });

  // 測試複選框禁用狀態
  it("handles disabled checkboxes", () => {
    const getIsItemCheckboxDisabled = (item) => item.id === "1";

    render(
      <DDataTable
        headers={mockHeaders}
        items={mockItems}
        showCheckbox={true}
        getIsItemCheckboxDisabled={getIsItemCheckboxDisabled}
      />
    );

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes[1]).toBeDisabled(); // 第一行應該被禁用
    expect(checkboxes[2]).not.toBeDisabled(); // 第二行不應該被禁用
  });

  // 測試選中狀態
  it("reflects checked state correctly", () => {
    const getIsItemChecked = (item) => item.id === "1";

    render(
      <DDataTable
        headers={mockHeaders}
        items={mockItems}
        showCheckbox={true}
        isHeaderChecked={true}
        getIsItemChecked={getIsItemChecked}
      />
    );

    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes[0]).toBeChecked(); // 表頭複選框
    expect(checkboxes[1]).toBeChecked(); // 第一行
    expect(checkboxes[2]).not.toBeChecked(); // 第二行
  });

  // 測試自定義 itemKey
  it("uses custom itemKey for row identification", () => {
    const customItems = [
      { customId: "a1", name: "John" },
      { customId: "a2", name: "Jane" },
    ];

    render(
      <DDataTable
        headers={[{ key: "name", title: "Name" }]}
        items={customItems}
        itemKey="customId"
      />
    );

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
  });

  // 測試樣式類名
  it("applies correct CSS classes", () => {
    render(
      <DDataTable headers={mockHeaders} items={mockItems} showCheckbox={true} />
    );

    expect(screen.getByRole("table").parentElement).toHaveClass("d-data-table");
    const checkboxColumn = screen.getAllByRole("cell")[0];
    expect(checkboxColumn).toHaveClass("d-data-table__checkbox-column");
  });
});
