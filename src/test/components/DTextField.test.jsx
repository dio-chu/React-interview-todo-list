import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DTextField from "../../components/DTextField";

describe("DTextField Component", () => {
  // 創建一個通用的 onChange 處理器
  const noop = () => {};

  // 測試基本渲染
  it("renders with default props", () => {
    render(<DTextField onChange={noop} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  // 測試輸入功能
  it("handles input changes", () => {
    const handleChange = vi.fn();
    render(<DTextField value="" onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test input" } });
    expect(handleChange).toHaveBeenCalled();
  });

  // 測試placeholder
  it("displays placeholder", () => {
    render(<DTextField onChange={noop} placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  // 測試錯誤訊息
  it("displays error messages", () => {
    const errorMessages = ["Error 1", "Error 2"];
    render(<DTextField onChange={noop} errorMessages={errorMessages} />);

    errorMessages.forEach((error) => {
      expect(screen.getByText(error)).toBeInTheDocument();
    });
    expect(
      screen.getByRole("textbox").closest(".d-text-field__input-wrapper")
    ).toHaveClass("d-text-field__input-wrapper--error");
  });

  // 測試前置圖標
  it("renders prepend icon", () => {
    const PrependIcon = () => <span data-testid="prepend-icon">★</span>;
    render(<DTextField onChange={noop} prependInnerIcon={<PrependIcon />} />);
    expect(screen.getByTestId("prepend-icon")).toBeInTheDocument();
  });

  // 測試後置圖標
  it("renders append icon", () => {
    const AppendIcon = () => <span data-testid="append-icon">★</span>;
    render(<DTextField onChange={noop} appendInnerIcon={<AppendIcon />} />);
    expect(screen.getByTestId("append-icon")).toBeInTheDocument();
  });

  // 測試自定義寬度
  it("applies custom width", () => {
    render(<DTextField onChange={noop} width="200px" />);
    expect(screen.getByRole("textbox").closest(".d-text-field")).toHaveStyle({
      width: "200px",
    });
  });

  // 測試自定義背景色和文字顏色
  it("applies custom background and text colors", () => {
    const backgroundColor = "#f0f0f0";
    const color = "#333333";
    render(
      <DTextField
        onChange={noop}
        backgroundColor={backgroundColor}
        color={color}
      />
    );
    const container = screen.getByRole("textbox").closest(".d-text-field");
    expect(container).toHaveStyle({
      "--input-background": backgroundColor,
      "--input-color": color,
    });
  });

  // 測試額外的 input 屬性
  it("passes through additional input props", () => {
    render(<DTextField onChange={noop} maxLength={10} readOnly />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("maxLength", "10");
    expect(input).toHaveAttribute("readonly");
  });

  // 測試值的控制
  it("controls input value", () => {
    const testValue = "test value";
    render(<DTextField value={testValue} onChange={noop} />);
    expect(screen.getByRole("textbox")).toHaveValue(testValue);
  });

  // 測試錯誤狀態的樣式
  it("applies error styles when error messages exist", () => {
    render(<DTextField onChange={noop} errorMessages={["Error message"]} />);
    expect(
      screen.getByRole("textbox").closest(".d-text-field__input-wrapper")
    ).toHaveClass("d-text-field__input-wrapper--error");
  });

  // 測試無錯誤時的樣式
  it("does not apply error styles when no error messages", () => {
    render(<DTextField onChange={noop} errorMessages={[]} />);
    expect(
      screen.getByRole("textbox").closest(".d-text-field__input-wrapper")
    ).not.toHaveClass("d-text-field__input-wrapper--error");
  });
});
