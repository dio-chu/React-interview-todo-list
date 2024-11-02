import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import DModal from "../../components/modals/DModal";

describe("DModal Component", () => {
  // 在每個測試前清理 body style
  beforeEach(() => {
    document.body.style.overflow = "";
  });

  // 在每個測試後清理 body style
  afterEach(() => {
    document.body.style.overflow = "";
  });

  // 測試基本渲染
  it("renders when isShow is true", () => {
    render(
      <DModal isShow={true}>
        <div>Modal Content</div>
      </DModal>
    );
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  // 測試不渲染當 isShow 為 false
  it("does not render when isShow is false", () => {
    render(
      <DModal isShow={false}>
        <div>Modal Content</div>
      </DModal>
    );
    expect(screen.queryByText("Modal Content")).not.toBeInTheDocument();
  });

  // 測試自定義尺寸
  it("applies custom dimensions", () => {
    render(
      <DModal
        isShow={true}
        minWidth="400px"
        minHeight="300px"
        width="500px"
        height="400px"
      >
        <div>Modal Content</div>
      </DModal>
    );

    const content = screen.getByText("Modal Content").parentElement;
    expect(content).toHaveStyle({
      minWidth: "400px",
      minHeight: "300px",
      width: "500px",
      height: "400px",
    });
  });

  // 測試點擊背景關閉
  it("calls onClose when backdrop is clicked and isBackdropClick is true", () => {
    const onClose = vi.fn();
    render(
      <DModal isShow={true} onClose={onClose} isBackdropClick={true}>
        <div>Modal Content</div>
      </DModal>
    );

    const backdrop = document.querySelector(".d-modal__backdrop");
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  });

  // 測試持久化模式
  it("adds shake animation class when persistent and backdrop is clicked", async () => {
    const onClose = vi.fn();
    render(
      <DModal
        isShow={true}
        onClose={onClose}
        isBackdropClick={true}
        isPersistent={true}
      >
        <div>Modal Content</div>
      </DModal>
    );

    const backdrop = document.querySelector(".d-modal__backdrop");
    const content = document.querySelector(".d-modal__content");

    fireEvent.click(backdrop);
    expect(content).toHaveClass("d-modal__content--shake");

    // 等待動畫結束
    await new Promise((resolve) => setTimeout(resolve, 300));
    expect(content).not.toHaveClass("d-modal__content--shake");
    expect(onClose).not.toHaveBeenCalled();
  });

  // 測試 body overflow
  it("controls body overflow", () => {
    const { unmount } = render(
      <DModal isShow={true}>
        <div>Modal Content</div>
      </DModal>
    );

    expect(document.body.style.overflow).toBe("hidden");

    unmount();
    expect(document.body.style.overflow).toBe("");
  });
});
