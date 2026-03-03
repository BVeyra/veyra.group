import type { NotificationItem } from "@/components/demo/types";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

type NotificationToastsProps = {
  notifications: NotificationItem[];
  onDismiss: (id: number) => void;
};

export default function NotificationToasts({
  notifications,
  onDismiss,
}: NotificationToastsProps) {
  useEffect(() => {
    const timers = notifications.map((notification) =>
      window.setTimeout(() => {
        onDismiss(notification.id);
      }, 5000)
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [notifications, onDismiss]);

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 w-[min(360px,calc(100vw-2rem))]">
      <AnimatePresence initial={false}>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative overflow-hidden bg-[#111] border border-white/10 border-l-4 border-l-emerald-500 rounded-lg p-4 shadow-xl"
          >
            <button
              type="button"
              onClick={() => onDismiss(notification.id)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-300"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="pr-6">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                <span>{notification.icon}</span>
                {notification.title}
              </div>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                {notification.description}
              </p>
            </div>

            <motion.div
              className="absolute left-0 right-0 bottom-0 h-[2px] bg-emerald-500/60"
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 5, ease: "linear" }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
