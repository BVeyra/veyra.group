import type { InboxMessage, MessageFilter } from "@/components/demo/types";
import { Search, Send } from "lucide-react";
import { useMemo, useState } from "react";

type MessagesViewProps = {
  inboxMessages: InboxMessage[];
  selectedMessageId: number | null;
  messageSearch: string;
  messageFilter: MessageFilter;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: MessageFilter) => void;
  onSelectMessage: (messageId: number) => void;
  onSendReply: (messageId: number, message: string) => void;
};

function statusBadge(status: InboxMessage["status"]) {
  if (status === "needs-review") {
    return {
      label: "Needs Review",
      className:
        "text-yellow-400 bg-yellow-500/10 border border-yellow-500/20",
    };
  }
  if (status === "resolved") {
    return {
      label: "Resolved",
      className:
        "text-emerald-300 bg-emerald-500/10 border border-emerald-500/20",
    };
  }
  return {
    label: "Auto-Replied",
    className:
      "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20",
  };
}

const filterTabs: Array<{ key: MessageFilter; label: string }> = [
  { key: "all", label: "All" },
  { key: "needs-review", label: "Needs Review" },
  { key: "auto-replied", label: "Auto-Replied" },
];

export default function MessagesView({
  inboxMessages,
  selectedMessageId,
  messageSearch,
  messageFilter,
  onSearchChange,
  onFilterChange,
  onSelectMessage,
  onSendReply,
}: MessagesViewProps) {
  const [replyDraft, setReplyDraft] = useState("");

  const filteredMessages = useMemo(() => {
    const search = messageSearch.trim().toLowerCase();
    return inboxMessages.filter((message) => {
      const filterMatch =
        messageFilter === "all" ? true : message.status === messageFilter;
      if (!filterMatch) return false;
      if (!search) return true;
      return (
        `${message.tenant} ${message.unit} ${message.lastMessage}`
          .toLowerCase()
          .includes(search)
      );
    });
  }, [inboxMessages, messageFilter, messageSearch]);

  const selectedMessage =
    filteredMessages.find((message) => message.id === selectedMessageId) ??
    filteredMessages[0] ??
    null;

  const handleReplySend = () => {
    if (!selectedMessage) return;
    const trimmed = replyDraft.trim();
    if (!trimmed) return;
    onSendReply(selectedMessage.id, trimmed);
    setReplyDraft("");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[0.42fr_0.58fr] gap-4">
      <div className="rounded-xl border border-white/10 bg-[#0C0C0C] p-4">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            value={messageSearch}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search messages..."
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder:text-gray-500"
          />
        </div>

        <div className="mb-3 flex items-center gap-4 border-b border-white/5 pb-2">
          {filterTabs.map((tab) => {
            const active = messageFilter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => onFilterChange(tab.key)}
                className={`text-xs pb-1 border-b-2 transition-colors ${
                  active
                    ? "text-emerald-300 border-emerald-400"
                    : "text-gray-500 border-transparent hover:text-gray-300"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="space-y-2 max-h-[520px] overflow-y-auto scrollbar-hide pr-1">
          {filteredMessages.map((message) => {
            const active = message.id === selectedMessage?.id;
            const badge = statusBadge(message.status);
            return (
              <button
                key={message.id}
                type="button"
                onClick={() => onSelectMessage(message.id)}
                className={`w-full text-left rounded-lg border px-3 py-3 transition-colors ${
                  active
                    ? "bg-white/5 border-white/15 border-l-2 border-l-emerald-500"
                    : "bg-white/[0.01] border-white/5 hover:bg-white/[0.03]"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm text-white font-medium truncate">
                      {message.tenant} · Unit {message.unit}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {message.lastMessage}
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-500 shrink-0">
                    {message.time}
                  </span>
                </div>
                <div className="mt-2 inline-flex items-center gap-2">
                  {message.unread && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  )}
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${badge.className}`}
                  >
                    {badge.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#0C0C0C] p-4 flex flex-col min-h-[560px]">
        {selectedMessage ? (
          <>
            <div className="pb-3 border-b border-white/5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-white font-semibold">
                    {selectedMessage.tenant} · Unit {selectedMessage.unit}
                  </h3>
                  <p className="text-xs text-gray-500">{selectedMessage.time}</p>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    statusBadge(selectedMessage.status).className
                  }`}
                >
                  {statusBadge(selectedMessage.status).label}
                </span>
              </div>
            </div>

            <div className="flex-1 py-4 space-y-3 overflow-y-auto scrollbar-hide">
              {selectedMessage.thread.map((message) => (
                <div
                  key={message.id}
                  className={`max-w-[86%] ${
                    message.sender === "assistant"
                      ? "mr-auto"
                      : "ml-auto text-right"
                  }`}
                >
                  <div
                    className={`rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      message.sender === "assistant"
                        ? "bg-white/10 border border-white/10 text-gray-200 rounded-tl-none"
                        : "bg-emerald-600 text-white rounded-tr-none"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto">
              <div className="bg-white/5 rounded-full px-3 py-2 flex items-center gap-2 border border-white/10 ring-1 ring-white/5">
                <input
                  value={replyDraft}
                  onChange={(event) => setReplyDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      handleReplySend();
                    }
                  }}
                  placeholder="Write a response..."
                  className="flex-1 bg-transparent text-sm text-gray-100 placeholder:text-gray-500 outline-none"
                />
                <button
                  type="button"
                  onClick={handleReplySend}
                  className="w-9 h-9 rounded-full bg-emerald-500 text-white inline-flex items-center justify-center disabled:opacity-50"
                  disabled={!replyDraft.trim()}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full inline-flex items-center justify-center text-gray-500 text-sm">
            No messages match your filters.
          </div>
        )}
      </div>
    </div>
  );
}
