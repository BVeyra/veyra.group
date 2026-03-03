import { motion } from "framer-motion";
import DashboardMockup from "@/components/marketing/DashboardMockup";
import TenantChatMockup from "@/components/marketing/TenantChatMockup";

export default function SolutionMockups() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
      >
        <DashboardMockup />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
      >
        <TenantChatMockup />
      </motion.div>
    </div>
  );
}
