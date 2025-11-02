"use client";
import { useEffect, useRef } from "react";

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
    if (!show) return;

    (async () => {
      const { Toast: BootstrapToast } = await import("bootstrap");

      if (toastRef.current) {
        const bsToast = BootstrapToast.getOrCreateInstance(toastRef.current, {
          delay: 3000,
        });

        bsToast.show();

        const handleHidden = () => onClose?.();
        toastRef.current.addEventListener("hidden.bs.toast", handleHidden);

        return () => {
          toastRef.current?.removeEventListener(
            "hidden.bs.toast",
            handleHidden
          );
        };
      }
    })();
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
