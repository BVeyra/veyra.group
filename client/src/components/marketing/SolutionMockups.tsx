import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { Link } from "wouter";
import DashboardMockup from "@/components/marketing/DashboardMockup";
import TenantChatMockup from "@/components/marketing/TenantChatMockup";

export default function SolutionMockups() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
      >
        <DashboardMockup />
        <div className="flex justify-center mt-6">
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 text-black font-semibold px-6 py-3 text-sm hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
          >
            <Play className="w-4 h-4" />
            Try Interactive Demo
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
      >
        <TenantChatMockup />
      </motion.div>
    </div>
  );
}
