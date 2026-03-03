import type { DemoSettings } from "@/components/demo/types";
import { Pencil } from "lucide-react";

type SettingsViewProps = {
  propertyName: string;
  settings: DemoSettings;
  onSetResponseTone: (tone: DemoSettings["responseTone"]) => void;
  onSetAutoReplyThreshold: (value: number) => void;
  onSetResponseDelay: (value: number) => void;
  onToggleNotification: (key: keyof DemoSettings["notifications"]) => void;
};

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex min-h-11 w-full items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-left"
      aria-pressed={checked}
    >
      <span className="text-sm text-gray-300">{label}</span>
      <span
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? "bg-emerald-500" : "bg-white/10"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </span>
    </button>
  );
}

export default function SettingsView({
  propertyName,
  settings,
  onSetResponseTone,
  onSetAutoReplyThreshold,
  onSetResponseDelay,
  onToggleNotification,
}: SettingsViewProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
      <section className="rounded-xl border border-white/10 bg-[#0C0C0C] p-4 md:p-5">
        <h3 className="text-white font-semibold mb-4">Account</h3>
        <div className="space-y-3 text-sm">
          {[
            ["Property", propertyName],
            ["Manager", "Bruno Johnson"],
            ["Email", "hello@veyragroup.ai"],
            ["Phone", "(302) 600-2625"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex min-h-11 items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2"
            >
              <div>
                <p className="text-xs text-gray-500">{label}</p>
                <p className="text-gray-200">{value}</p>
              </div>
              <Pencil className="h-4 w-4 text-gray-500" />
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-white/10 bg-[#0C0C0C] p-4 md:p-5">
        <h3 className="text-white font-semibold mb-4">AI Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-500">Response Tone</label>
            <select
              value={settings.responseTone}
              onChange={(event) =>
                onSetResponseTone(event.target.value as DemoSettings["responseTone"])
              }
              className="mt-1 h-11 w-full rounded-lg border border-white/10 bg-white/[0.02] px-3 text-sm text-gray-200"
            >
              <option>Professional</option>
              <option>Friendly</option>
              <option>Casual</option>
            </select>
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between text-xs text-gray-500">
              <span>Auto-reply threshold</span>
              <span>{settings.autoReplyThreshold}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={settings.autoReplyThreshold}
              onChange={(event) => onSetAutoReplyThreshold(Number(event.target.value))}
              className="h-11 w-full accent-emerald-500"
            />
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between text-xs text-gray-500">
              <span>Response delay</span>
              <span>{settings.responseDelay}s</span>
            </div>
            <input
              type="range"
              min={0}
              max={5}
              step={1}
              value={settings.responseDelay}
              onChange={(event) => onSetResponseDelay(Number(event.target.value))}
              className="h-11 w-full accent-emerald-500"
            />
          </div>

          <div className="pt-2">
            <p className="mb-2 text-xs text-gray-500">Notification preferences</p>
            <div className="space-y-2">
              <Toggle
                label="Email"
                checked={settings.notifications.email}
                onChange={() => onToggleNotification("email")}
              />
              <Toggle
                label="SMS"
                checked={settings.notifications.sms}
                onChange={() => onToggleNotification("sms")}
              />
              <Toggle
                label="Push"
                checked={settings.notifications.push}
                onChange={() => onToggleNotification("push")}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
