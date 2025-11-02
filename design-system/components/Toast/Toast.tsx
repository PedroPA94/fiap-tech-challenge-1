"use client";
import { useEffect, useRef } from "react";
import { Toast as BootstrapToast } from "bootstrap";

export type ToastKind = "info" | "success" | "danger" | "warning";

interface ToastProps {
  message: string;
  show: boolean;
  kind: ToastKind;
  onClose?: () => void;
}

export function Toast({ message, show, kind, onClose }: ToastProps) {
  const toastRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (toastRef.current) {
      const toast = new BootstrapToast(toastRef.current, { delay: 3000 });

      if (show) {
        toast.show();
      } else {
        toast.hide();
      }

      toastRef.current.addEventListener("hidden.bs.toast", () => {
        onClose?.();
      });

      return () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        toastRef.current?.removeEventListener(
          "hidden.bs.toast",
          onClose || (() => {})
        );
      };
    }
  }, [show, onClose]);

  return (
    <div
      className="toast-container position-fixed top-0 end-0 p-3"
      style={{ zIndex: 1055 }}
    >
      <div
        ref={toastRef}
        className={`toast align-items-center text-bg-${kind} border-0`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">{message}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  );
}
