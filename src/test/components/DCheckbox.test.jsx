import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DCheckbox from "../../components/DCheckbox";

describe("DCheckbox Component", () => {
  // 測試基本渲染
  it("renders with default props", () => {
    render(<DCheckbox />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  // 測試選中狀態
  it("renders in checked state", () => {
    render(<DCheckbox isChecked />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  // 測試標籤文字
  it("displays correct label", () => {
    render(<DCheckbox label="Test Label" />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  // 測試禁用狀態
  it("handles disabled state", () => {
    render(<DCheckbox disabled label="Disabled Checkbox" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDisabled();
    expect(checkbox.closest(".d-checkbox")).toHaveClass("d-checkbox--disabled");
  });

  // 測試onChange事件
  it("handles change events", () => {
    const handleChange = vi.fn();
    render(<DCheckbox onChange={handleChange} />);

    fireEvent.click(screen.getByRole("checkbox"));
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  // 測試禁用狀態下的onChange
  it("does not trigger onChange when disabled", () => {
    const handleChange = vi.fn();
    render(<DCheckbox disabled onChange={handleChange} />);

    fireEvent.click(screen.getByRole("checkbox"));
    expect(handleChange).not.toHaveBeenCalled();
  });

  // 測試不同密度
  it("renders with different densities", () => {
    const { rerender } = render(<DCheckbox density="comfortable" />);
    expect(screen.getByRole("checkbox").closest(".d-checkbox")).toHaveClass(
      "d-checkbox--density-comfortable"
    );

    rerender(<DCheckbox density="compact" />);
    expect(screen.getByRole("checkbox").closest(".d-checkbox")).toHaveClass(
      "d-checkbox--density-compact"
    );
  });

  // 測試class名稱組合
  it("combines class names correctly", () => {
    render(<DCheckbox disabled density="comfortable" />);
    const wrapper = screen.getByRole("checkbox").closest(".d-checkbox");
    expect(wrapper).toHaveClass(
      "d-checkbox",
      "d-checkbox--density-comfortable",
      "d-checkbox--disabled"
    );
  });
});
