import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DSelect from "../../components/DSelect";

describe("DSelect Component", () => {
  const mockOptions = [
    { id: "1", value: "option1", label: "Option 1" },
    { id: "2", value: "option2", label: "Option 2" },
    { id: "3", value: "option3", label: "Option 3" },
  ];

  it("renders all options", () => {
    render(<DSelect options={mockOptions} onChange={() => {}} />);

    mockOptions.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it("highlights selected option", () => {
    render(
      <DSelect
        options={mockOptions}
        selectedValue="option2"
        onChange={() => {}}
      />
    );

    const selectedOption = screen.getByText("Option 2");
    expect(selectedOption.closest("button")).toHaveClass(
      "d-select__option--selected"
    );
  });

  it("calls onChange with correct value when option is clicked", () => {
    const handleChange = vi.fn();
    render(<DSelect options={mockOptions} onChange={handleChange} />);

    fireEvent.click(screen.getByText("Option 1"));
    expect(handleChange).toHaveBeenCalledWith("option1");
  });

  it("renders without options", () => {
    render(<DSelect options={[]} onChange={() => {}} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("handles multiple selections", () => {
    const handleChange = vi.fn();
    render(
      <DSelect
        options={mockOptions}
        selectedValue="option1"
        onChange={handleChange}
      />
    );

    fireEvent.click(screen.getByText("Option 2"));
    expect(handleChange).toHaveBeenCalledWith("option2");

    fireEvent.click(screen.getByText("Option 3"));
    expect(handleChange).toHaveBeenCalledWith("option3");
  });

  // 新增：測試預設 selectedValue
  it("uses default empty string for selectedValue when not provided", () => {
    render(<DSelect options={mockOptions} onChange={() => {}} />);

    // 確認沒有選中的選項
    const options = screen.getAllByRole("button");
    options.forEach((option) => {
      expect(option).not.toHaveClass("d-select__option--selected");
    });
  });
});
