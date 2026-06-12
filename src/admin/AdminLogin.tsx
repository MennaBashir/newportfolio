import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, KeyRound, Loader2 } from "lucide-react";
import { verifyCredentials, createSession } from "./auth";
import { Field, PrimaryButton } from "./ui";

export default function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setChecking(true);
    const ok = await verifyCredentials(email, password);
    setChecking(false);
    if (ok) {
      createSession();
      onSuccess();
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-8"
        style={{ boxShadow: "0 0 60px rgba(59,130,246,0.06)" }}
      >
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 border border-sky-500/20"
            style={{ background: "rgba(56,189,248,0.06)" }}
          >
            <Lock className="w-6 h-6 text-sky-400" />
          </div>
          <h1 className="text-xl font-bold text-white">Admin Access</h1>
          <p className="text-sm text-slate-500 mt-1">
            Sign in to manage your portfolio
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Field label="Email">
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
              <input
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-sky-500/40 transition-colors"
              />
            </div>
          </Field>

          <Field label="Password">
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-slate-200 placeholder:text-slate-600 outline-none focus:border-sky-500/40 transition-colors"
              />
            </div>
          </Field>

          {error && (
            <p className="text-xs text-red-400 bg-red-500/[0.06] border border-red-500/15 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <PrimaryButton type="submit" disabled={checking}>
            {checking && <Loader2 className="w-4 h-4 animate-spin" />}
            {checking ? "Verifying..." : "Sign In"}
          </PrimaryButton>
        </form>
      </motion.div>
    </div>
  );
}
