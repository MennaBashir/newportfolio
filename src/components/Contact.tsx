import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  Send,
  Code2,
  Briefcase,
  GitBranch,
  Mail,
  Loader2,
  ChevronDown,
  MessageCircle,
} from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import { useContent } from "../store/ContentStore";
import SectionHeading from "./SectionHeading";

const socialIcons: Record<string, typeof Code2> = {
  GitHub: Code2,
  LinkedIn: Briefcase,
  GitLab: GitBranch,
  Email: Mail,
};

const REQUEST_TYPES = [
  { label: "Freelance Project", color: "#3b82f6" },
  { label: "New Role", color: "#4ade80" },
  { label: "Collaboration", color: "#a78bfa" },
];

const MY_SERVICES = [
  { label: "Custom Web App", color: "#38bdf8" },
  { label: "React Native Mobile App", color: "#f97316" },
];

const contactSchema = z.object({
  name: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  requestType: z.string().min(1, "Please select a request type"),
  service: z.string().min(1, "Please select a service"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must not exceed 500 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

function TiltCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 300, damping: 30 });
  const sy = useSpring(ry, { stiffness: 300, damping: 30 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        rx.set(((e.clientY - r.top) / r.height - 0.5) * -6);
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 6);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={{ rotateX: sx, rotateY: sy, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function MagneticLink({
  href,
  platform,
  handle,
  Icon,
}: {
  href: string;
  platform: string;
  handle: string;
  Icon: typeof Code2;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.15);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.15);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: sx, y: sy }}
      className="group flex items-center gap-4 p-4 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.05] hover:border-blue-500/20 transition-all duration-300"
    >
      <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-blue-500/[0.08] border border-blue-500/10 group-hover:border-blue-500/25 transition-all duration-300">
        <Icon className="w-4 h-4 text-blue-400 group-hover:text-blue-300 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] transition-all duration-300" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
          {platform}
        </p>
        <p className="text-xs text-slate-500 truncate">{handle}</p>
      </div>
    </motion.a>
  );
}

function Dropdown({
  label,
  options,
  value,
  onChange,
  hasError,
}: {
  label: string;
  options: { label: string; color: string }[];
  value: string;
  onChange: (v: string) => void;
  hasError?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.label === value);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={hasError ? "true" : "false"}
        className="w-full flex items-center justify-between gap-2 px-4 py-3 rounded-xl border bg-zinc-900/80 text-sm text-slate-300 hover:border-blue-500/30 transition-all duration-300 focus:outline-none focus:border-blue-500/40"
        style={
          open
            ? {
                boxShadow: "0 0 12px 2px rgba(59,130,246,0.1)",
                borderColor: hasError
                  ? "rgba(239,68,68,0.5)"
                  : "rgba(59,130,246,0.35)",
              }
            : {
                borderColor: hasError
                  ? "rgba(239,68,68,0.5)"
                  : "rgba(255,255,255,0.06)",
              }
        }
      >
        <span className="flex items-center gap-2">
          {selected && (
            <span
              className="inline-block w-2 h-2 rounded-full animate-pulse-slow"
              style={{
                background: selected.color,
                boxShadow: `0 0 6px 2px ${selected.color}80`,
              }}
            />
          )}
          <span className={selected ? "text-slate-200" : "text-slate-500"}>
            {value || label}
          </span>
        </span>
        <ChevronDown
          className="w-4 h-4 text-slate-500 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute z-50 top-full mt-1.5 w-full rounded-xl border border-white/[0.07] bg-zinc-900/95 backdrop-blur-xl overflow-hidden"
            style={{
              boxShadow:
                "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(59,130,246,0.1)",
            }}
          >
            {options.map((opt) => (
              <li key={opt.label}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt.label);
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/[0.05] hover:text-white transition-colors duration-150 text-left"
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full flex-shrink-0"
                    style={{
                      background: opt.color,
                      boxShadow: `0 0 6px 2px ${opt.color}60`,
                    }}
                  />
                  {opt.label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function EnvelopeSentAnimation() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.3],
            x: Math.cos((i / 8) * Math.PI * 2) * 120,
            y: Math.sin((i / 8) * Math.PI * 2) * 80 - 40,
          }}
          transition={{ duration: 1.2, delay: i * 0.08, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
          style={{
            background: i % 2 === 0 ? "#3b82f6" : "#38bdf8",
            boxShadow: `0 0 8px 2px ${i % 2 === 0 ? "#3b82f6" : "#38bdf8"}`,
          }}
        />
      ))}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          initial={{ opacity: 0, scaleX: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 0.7, 0],
            scaleX: [0, 1, 0.2],
            x: Math.cos((i / 5) * Math.PI * 2 + 0.3) * 90,
            y: Math.sin((i / 5) * Math.PI * 2 + 0.3) * 60 - 30,
          }}
          transition={{ duration: 1, delay: 0.1 + i * 0.1, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 h-px w-10 origin-left"
          style={{ background: "linear-gradient(90deg, #3b82f6, transparent)" }}
        />
      ))}
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p
      className="mt-1.5 text-xs text-red-400"
      style={{ textShadow: "0 0 8px rgba(239,68,68,0.5)" }}
    >
      {message}
    </p>
  );
}

function inputCls(hasError: boolean) {
  return [
    "w-full px-4 py-3 bg-zinc-900/80 rounded-xl text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none transition-all duration-300",
    hasError
      ? "border border-red-500/50 focus:border-red-500/70 focus:shadow-[0_0_16px_3px_rgba(239,68,68,0.10)]"
      : "border border-white/[0.06] focus:border-blue-500/50 focus:shadow-[0_0_16px_3px_rgba(59,130,246,0.12)]",
  ].join(" ");
}

export default function Contact() {
  const [showAnim, setShowAnim] = useState(false);
  const { content } = useContent();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      requestType: "",
      service: "",
      message: "",
    },
  });

  const messageValue = watch("message") ?? "";

  const onSubmit = async (data: ContactFormData) => {
    setShowAnim(true);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          request_type: data.requestType,
          service: data.service,
          message: data.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );
      toast.success("Message Sent Successfully!", {
        style: {
          background: "#18181b",
          color: "#e2e8f0",
          border: "1px solid rgba(59,130,246,0.2)",
        },
      });
      reset();
    } catch {
      toast.error("Something went wrong. Please try again.", {
        style: {
          background: "#18181b",
          color: "#e2e8f0",
          border: "1px solid rgba(239,68,68,0.2)",
        },
      });
    } finally {
      setShowAnim(false);
    }
  };

  return (
    <section className="relative py-24 overflow-hidden">
      <Toaster position="top-right" />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <SectionHeading
          label="Reach Out"
          title="Let's Connect"
          description="Whether it's a job opportunity or a collaboration — my inbox is always open."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <motion.div variants={fadeUp} className="space-y-4">
            <TiltCard className="p-5 rounded-2xl border border-white/[0.05] bg-white/[0.02] backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                </span>
                <span className="text-sm font-semibold text-emerald-400">
                  Available for Work
                </span>
              </div>
              <p className="text-[15px] text-slate-300 font-medium mb-0.5">
                Open to Roles & Collaboration
              </p>
              <p className="text-sm text-slate-500">
                Specializing in React, Next.js &amp; React Native.
              </p>
            </TiltCard>

            <TiltCard className="p-5 rounded-2xl border border-white/[0.05] bg-white/[0.02] backdrop-blur-xl">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-[0.15em] mb-3">
                Connect Directly
              </h3>
              <div className="space-y-2">
                {content.socialLinks.map((link) => {
                  const Icon = socialIcons[link.platform] || Mail;
                  return (
                    <MagneticLink
                      key={link.platform}
                      href={link.url}
                      platform={link.platform}
                      handle={link.handle}
                      Icon={Icon}
                    />
                  );
                })}
              </div>
            </TiltCard>

            <motion.a
              href="https://wa.me/201554619025"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-4 p-5 rounded-2xl border border-emerald-500/15 bg-emerald-500/[0.04] backdrop-blur-xl hover:border-emerald-500/30 hover:bg-emerald-500/[0.07] transition-all duration-300 cursor-pointer"
              style={{ boxShadow: "0 0 20px 4px rgba(74,222,128,0.04)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 28px 6px rgba(74,222,128,0.09)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 0 20px 4px rgba(74,222,128,0.04)";
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(74,222,128,0.1)",
                  border: "1px solid rgba(74,222,128,0.2)",
                  boxShadow: "0 0 16px 4px rgba(74,222,128,0.15)",
                }}
              >
                <MessageCircle
                  className="w-5 h-5 text-emerald-400"
                  style={{
                    filter: "drop-shadow(0 0 6px rgba(74,222,128,0.6))",
                  }}
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-300">
                  Chat on WhatsApp
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Quick replies · Usually within an hour
                </p>
              </div>
            </motion.a>
          </motion.div>

          <motion.div variants={fadeUp}>
            <AnimatePresence mode="wait">
              <motion.form
                key="form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="relative h-full p-6 rounded-2xl border border-white/[0.05] bg-white/[0.02] backdrop-blur-xl flex flex-col"
              >
                {showAnim && <EnvelopeSentAnimation />}
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-[0.15em] mb-5">
                  Send a Request
                </h3>
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4 flex-1"
                >
                  <motion.div variants={fadeUp}>
                    <label htmlFor="contact-name" className="sr-only">
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Your name"
                      aria-invalid={errors.name ? "true" : "false"}
                      className={inputCls(!!errors.name)}
                      {...register("name")}
                    />
                    <FieldError message={errors.name?.message} />
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <label htmlFor="contact-email" className="sr-only">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="you@example.com"
                      aria-invalid={errors.email ? "true" : "false"}
                      className={inputCls(!!errors.email)}
                      {...register("email")}
                    />
                    <FieldError message={errors.email?.message} />
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <Controller
                      name="requestType"
                      control={control}
                      render={({ field }) => (
                        <Dropdown
                          label="Request Type"
                          options={REQUEST_TYPES}
                          value={field.value}
                          onChange={field.onChange}
                          hasError={!!errors.requestType}
                        />
                      )}
                    />
                    <FieldError message={errors.requestType?.message} />
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <Controller
                      name="service"
                      control={control}
                      render={({ field }) => (
                        <Dropdown
                          label="Service Needed"
                          options={MY_SERVICES}
                          value={field.value}
                          onChange={field.onChange}
                          hasError={!!errors.service}
                        />
                      )}
                    />
                    <FieldError message={errors.service?.message} />
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <label htmlFor="contact-message" className="sr-only">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={7}
                      placeholder="Tell me about your project..."
                      aria-invalid={errors.message ? "true" : "false"}
                      className={`${inputCls(!!errors.message)} resize-none`}
                      {...register("message")}
                    />
                    <div className="flex items-center justify-between mt-1">
                      <FieldError message={errors.message?.message} />
                      <p className="text-right text-xs text-slate-600 ml-auto">
                        {messageValue.length}/500
                      </p>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative cursor-pointer w-full mt-5 flex items-center justify-center gap-2 px-6 py-3.5 font-semibold text-sm text-white rounded-xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(59,130,246,0.85) 0%, rgba(99,102,241,0.85) 100%)",
                    boxShadow:
                      "0 0 20px 4px rgba(59,130,246,0.2), 0 0 0 1px rgba(99,102,241,0.3), 0 4px 16px rgba(0,0,0,0.4)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 0 35px 8px rgba(59,130,246,0.35), 0 0 0 1px rgba(99,102,241,0.5), 0 4px 20px rgba(0,0,0,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 0 20px 4px rgba(59,130,246,0.2), 0 0 0 1px rgba(99,102,241,0.3), 0 4px 16px rgba(0,0,0,0.4)";
                  }}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {isSubmitting ? "Sending..." : "Send Request"}
                </motion.button>
              </motion.form>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
