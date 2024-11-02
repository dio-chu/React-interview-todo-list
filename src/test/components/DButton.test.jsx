import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DButton from "../../components/DButton";

describe("DButton Component", () => {
  // 測試基本渲染
  it("renders with default props", () => {
    render(<DButton />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      "d-button",
      "d-button--size-medium",
      "d-button--density-default"
    );
  });

  // 測試不同尺寸
  it("renders with different sizes", () => {
    const { rerender } = render(<DButton size="small" />);
    expect(screen.getByRole("button")).toHaveClass("d-button--size-small");

    rerender(<DButton size="large" />);
    expect(screen.getByRole("button")).toHaveClass("d-button--size-large");
  });

  // 測試標籤文字
  it("displays correct label", () => {
    render(<DButton label="Click me" />);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  // 測試禁用狀態
  it("handles disabled state", () => {
    render(<DButton disabled label="Disabled Button" />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveClass("d-button--disabled");
  });

  // 測試點擊事件
  it("handles click events", () => {
    const handleClick = vi.fn();
    render(<DButton onClick={handleClick} label="Click me" />);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // 測試圖標渲染
  it("renders with append icon", () => {
    const testIcon = <span data-testid="test-icon">★</span>;
    render(<DButton appendIcon={testIcon} />);
    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });

  // 測試不同密度
  it("renders with different densities", () => {
    const { rerender } = render(<DButton density="comfortable" />);
    expect(screen.getByRole("button")).toHaveClass(
      "d-button--density-comfortable"
    );

    rerender(<DButton density="compact" />);
    expect(screen.getByRole("button")).toHaveClass("d-button--density-compact");
  });
});
