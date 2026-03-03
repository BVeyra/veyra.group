import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  author: string;
  text: string;
};

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    role: "assistant",
    author: "V",
    text: "Hi Sarah! I received your rent payment of $1,850 for Unit 12C. Thank you! Do you need anything else?",
  },
  {
    id: 2,
    role: "user",
    author: "S",
    text: "Thanks! Actually, when is the lease renewal coming up?",
  },
  {
    id: 3,
    role: "assistant",
    author: "V",
    text: "Your lease for Unit 12C ends on August 31, 2026. We'll send renewal options about 60 days before that. Would you like me to set a reminder?",
  },
];

function buildMockReply(input: string) {
  const value = input.toLowerCase();

  if (value.includes("lease") || value.includes("renew")) {
    return "Absolutely. I set a lease renewal reminder and logged this in your account. You'll get a follow-up 60 days before expiration.";
  }

  if (value.includes("rent") || value.includes("payment")) {
    return "Got it. I pulled your rent ledger and sent a summary with due date, amount, and payment options.";
  }

  if (value.includes("maintenance") || value.includes("toilet") || value.includes("hvac")) {
    return "Thanks for reporting that. I created a maintenance ticket and dispatched the correct vendor. You'll receive status updates automatically.";
  }

  return "Got it. I logged that request and sent a confirmation. A property manager will review anything that needs human approval.";
}

type TenantChatMockupProps = {
  interactive?: boolean;
};

export default function TenantChatMockup({ interactive = false }: TenantChatMockupProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!interactive) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [interactive, messages, isTyping]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const sendMessage = () => {
    if (!interactive) return;
    const trimmed = draft.trim();
    if (!trimmed || isTyping) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      role: "user",
      author: "S",
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setDraft("");
    setIsTyping(true);

    timeoutRef.current = window.setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: Date.now() + 1,
        role: "assistant",
        author: "V",
        text: buildMockReply(trimmed),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 850);
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
      <div className="text-xs text-gray-500 uppercase tracking-widest mb-8 font-medium">What your tenants see</div>

      <div className="relative w-[300px] h-[600px] bg-black rounded-[3rem] border-[8px] border-[#1a1a1a] shadow-2xl overflow-hidden ring-1 ring-white/10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#1a1a1a] rounded-b-2xl z-20 flex justify-center items-center">
          <div className="w-16 h-4 bg-black rounded-full mt-1" />
        </div>

        <div className="absolute top-3 left-8 right-8 flex justify-between text-[10px] text-white font-medium z-10 opacity-50">
          <span>9:41</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-white rounded-full" />
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
        </div>

        <div className="h-full w-full bg-[#0C0C0C] flex flex-col pt-12 pb-6 px-4">
          <div className="flex items-center gap-3 pb-4 border-b border-white/5 mt-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs font-bold ring-1 ring-emerald-500/20">
              V
            </div>
            <div>
              <div className="text-sm font-medium text-white">Veyra Assistant</div>
              <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-emerald-400" />
                Online
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-4 py-6 overflow-y-auto scrollbar-hide">
            {messages.map((message) => {
              if (message.role === "assistant") {
                return (
                  <div key={message.id} className="flex gap-3 max-w-[85%]">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex-shrink-0 flex items-center justify-center text-emerald-400 text-[10px] font-bold mt-1 ring-1 ring-emerald-500/20">
                      {message.author}
                    </div>
                    <div className="bg-white/10 rounded-2xl rounded-tl-none p-3 text-xs text-gray-200 leading-relaxed border border-white/5">
                      {message.text}
                    </div>
                  </div>
                );
              }

              return (
                <div key={message.id} className="flex gap-3 max-w-[85%] self-end flex-row-reverse">
                  <div className="w-6 h-6 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center text-gray-300 text-[10px] font-bold mt-1 border border-white/10">
                    {message.author}
                  </div>
                  <div className="bg-emerald-600 rounded-2xl rounded-tr-none p-3 text-xs text-white leading-relaxed shadow-lg shadow-emerald-900/20">
                    {message.text}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex gap-3 max-w-[85%]">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex-shrink-0 flex items-center justify-center text-emerald-400 text-[10px] font-bold mt-1 ring-1 ring-emerald-500/20">
                  V
                </div>
                <div className="bg-white/10 rounded-2xl rounded-tl-none p-3 border border-white/5">
                  <span className="inline-flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300/80 animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300/60 animate-pulse [animation-delay:120ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300/40 animate-pulse [animation-delay:240ms]" />
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="mt-auto pt-2">
            <div className="bg-white/5 rounded-full px-3 py-2 flex items-center gap-2 border border-white/5 ring-1 ring-white/5">
              <input
                type="text"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Type a message..."
                disabled={!interactive}
                className="flex-1 bg-transparent text-xs text-gray-200 placeholder:text-gray-500 outline-none"
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={!interactive || !draft.trim() || isTyping}
                className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-3.5 h-3.5 text-black ml-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
