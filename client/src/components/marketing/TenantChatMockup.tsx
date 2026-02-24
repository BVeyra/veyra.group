import { Send } from "lucide-react";

export default function TenantChatMockup() {
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
            <div className="flex gap-3 max-w-[85%]">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex-shrink-0 flex items-center justify-center text-emerald-400 text-[10px] font-bold mt-1 ring-1 ring-emerald-500/20">
                V
              </div>
              <div className="bg-white/10 rounded-2xl rounded-tl-none p-3 text-xs text-gray-200 leading-relaxed border border-white/5">
                Hi Sarah! I received your rent payment of $1,850 for Unit 12C. Thank you! Do you need anything else?
              </div>
            </div>

            <div className="flex gap-3 max-w-[85%] self-end flex-row-reverse">
              <div className="w-6 h-6 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center text-gray-300 text-[10px] font-bold mt-1 border border-white/10">
                S
              </div>
              <div className="bg-emerald-600 rounded-2xl rounded-tr-none p-3 text-xs text-white leading-relaxed shadow-lg shadow-emerald-900/20">
                Thanks! Actually, when is the lease renewal coming up?
              </div>
            </div>

            <div className="flex gap-3 max-w-[85%]">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex-shrink-0 flex items-center justify-center text-emerald-400 text-[10px] font-bold mt-1 ring-1 ring-emerald-500/20">
                V
              </div>
              <div className="bg-white/10 rounded-2xl rounded-tl-none p-3 text-xs text-gray-200 leading-relaxed border border-white/5">
                Your lease for Unit 12C ends on August 31, 2026. We'll send renewal options about 60 days before that. Would you like me to set a reminder?
              </div>
            </div>
          </div>

          <div className="mt-auto pt-2">
            <div className="bg-white/5 rounded-full px-4 py-3 flex items-center justify-between border border-white/5 ring-1 ring-white/5">
              <span className="text-xs text-gray-500">Type a message...</span>
              <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Send className="w-3.5 h-3.5 text-black ml-0.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
