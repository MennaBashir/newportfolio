export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
        {label}
      </span>
      {children}
    </label>
  );
}

export const inputCls =
  "w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-sky-500/40 focus:bg-sky-500/[0.03] transition-colors";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={inputCls} />;
}

export function TextArea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  return <textarea {...props} className={`${inputCls} resize-y min-h-24`} />;
}

export function PrimaryButton({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:brightness-110"
      style={{
        background:
          "linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #7c3aed 100%)",
        boxShadow:
          "0 0 0 1px rgba(99,102,241,0.3), 0 0 20px 4px rgba(59,130,246,0.15)",
      }}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  danger,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { danger?: boolean }) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium cursor-pointer border transition-all duration-300 ${
        danger
          ? "text-red-400 border-red-500/20 bg-red-500/[0.05] hover:bg-red-500/[0.12] hover:border-red-500/40"
          : "text-slate-300 border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.07] hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-5">
      {children}
    </div>
  );
}
