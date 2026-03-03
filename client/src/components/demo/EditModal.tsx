import type { ApprovalItem } from "@/components/demo/types";
import { X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

type EditModalProps = {
  isOpen: boolean;
  queueItem: ApprovalItem | null;
  onClose: () => void;
  onSend: (editedText: string) => void;
};

export default function EditModal({
  isOpen,
  queueItem,
  onClose,
  onSend,
}: EditModalProps) {
  const [draft, setDraft] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!isOpen || !queueItem) return;
    setDraft(queueItem.draftText);
  }, [isOpen, queueItem]);

  useEffect(() => {
    if (!isOpen) return;
    textAreaRef.current?.focus();

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const characterCount = draft.length;
  const canSend = draft.trim().length > 0 && characterCount <= 500;
  const confidence = useMemo(() => queueItem?.confidence ?? 0, [queueItem]);

  if (!isOpen || !queueItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
        aria-label="Close edit modal backdrop"
      />

      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#111] p-6 shadow-2xl transition-opacity duration-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">
            Edit Response — Unit {queueItem.unit}, {queueItem.tenant}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="h-8 w-8 inline-flex items-center justify-center rounded-md text-gray-400 hover:text-white hover:bg-white/5"
            aria-label="Close edit modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-sm text-gray-400 mb-2">AI-drafted response:</p>
        <textarea
          ref={textAreaRef}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          maxLength={500}
          className="w-full h-40 resize-none rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
        />

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-3">
            <span className="text-xs text-gray-500">{characterCount} / 500</span>
            <span className="inline-flex items-center gap-1.5 text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-full px-2 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              AI Confidence: {confidence}%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onSend(draft)}
              disabled={!canSend}
              className="rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 text-sm text-white"
            >
              Send Edited Response
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
