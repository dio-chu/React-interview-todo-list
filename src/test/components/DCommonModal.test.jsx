// DCommonModal.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DCommonModal from "../../components/modals/DCommonModal";

describe("DCommonModal Component", () => {
  // 測試基本渲染
  it("renders with title and content", () => {
    render(
      <DCommonModal isShow={true} title="Test Title">
        <div>Modal Content</div>
      </DCommonModal>
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  // 測試關閉按鈕
  it("handles close button click", () => {
    const onClose = vi.fn();
    render(
      <DCommonModal isShow={true} title="Test Title" onClose={onClose}>
        <div>Modal Content</div>
      </DCommonModal>
    );

    const closeButton = screen.getByText("✕");
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });

  // 測試確認和取消按鈕
  it("renders and handles confirm and cancel buttons", () => {
    const onConfirm = vi.fn();
    const onClose = vi.fn();

    render(
      <DCommonModal
        isShow={true}
        confirmText="Confirm"
        cancelText="Cancel"
        onConfirm={onConfirm}
        onClose={onClose}
      >
        <div>Modal Content</div>
      </DCommonModal>
    );

    const confirmButton = screen.getByText("Confirm");
    const cancelButton = screen.getByText("Cancel");

    fireEvent.click(confirmButton);
    expect(onConfirm).toHaveBeenCalled();

    fireEvent.click(cancelButton);
    expect(onClose).toHaveBeenCalled();
  });

  // 測試隱藏頁腳
  it("hides footer when showFooter is false", () => {
    render(
      <DCommonModal
        isShow={true}
        showFooter={false}
        confirmText="Confirm"
        cancelText="Cancel"
      >
        <div>Modal Content</div>
      </DCommonModal>
    );

    expect(screen.queryByText("Confirm")).not.toBeInTheDocument();
    expect(screen.queryByText("Cancel")).not.toBeInTheDocument();
  });

  // 測試選擇性按鈕顯示
  it("selectively shows confirm and cancel buttons", () => {
    render(
      <DCommonModal
        isShow={true}
        confirmText="Confirm"
        // 不提供 cancelText，應該只顯示確認按鈕
      >
        <div>Modal Content</div>
      </DCommonModal>
    );

    expect(screen.getByText("Confirm")).toBeInTheDocument();
    expect(screen.queryByText("Cancel")).not.toBeInTheDocument();
  });

  // 測試默認的取消行為
  it("uses onClose as default cancel handler", () => {
    const onClose = vi.fn();
    render(
      <DCommonModal isShow={true} cancelText="Cancel" onClose={onClose}>
        <div>Modal Content</div>
      </DCommonModal>
    );

    fireEvent.click(screen.getByText("Cancel"));
    expect(onClose).toHaveBeenCalled();
  });
});
