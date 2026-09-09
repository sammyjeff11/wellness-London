"use client";
import { useEffect, useRef, type ReactNode } from "react";

/** Native modal: contains focus, makes the background inert and handles Escape. */
export default function OverlayDialog({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog || !open) return;
    const trigger = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      trigger?.focus();
    };
  }, [open]);
  return (
    <dialog
      ref={ref}
      aria-label={title}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="well-dialog"
    >
      <div className="p-5 sm:p-7">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-3xl">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="min-h-11 rounded-full border border-[#b9ab97] px-4 text-sm"
          >
            Close
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
