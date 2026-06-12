import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  LayoutDashboard,
  FolderKanban,
  BriefcaseBusiness,
  Layers,
  Share2,
  Sparkles,
  Download,
  RotateCcw,
  LogOut,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  Save,
} from "lucide-react";
import { useContent } from "../store/ContentStore";
import type {
  ExperienceItem,
  ProjectItem,
  SocialLink,
  TechGroup,
} from "../assets/contentTypes";
import { ASSETS } from "../assets/assets";
import { resolveImage } from "../assets/data";
import { clearSession } from "./auth";
import { Field, TextInput, TextArea, PrimaryButton, GhostButton, Card } from "./ui";

type Tab = "hero" | "projects" | "experience" | "tech" | "social";

const TABS: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "hero", label: "Hero", icon: Sparkles },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness },
  { id: "tech", label: "Tech Stack", icon: Layers },
  { id: "social", label: "Social Links", icon: Share2 },
];

const ASSET_KEYS = Object.keys(ASSETS).filter((k) => k !== "resume");

const STATUS_OPTIONS = ["", "featured", "new", "freelance", "in-progress"];
const CATEGORY_OPTIONS = ["React/Next.js", "React Native"];
const COLOR_OPTIONS = ["sky", "violet", "emerald", "amber"];

function csv(value: string[]): string {
  return value.join(", ");
}

function parseCsv(value: string): string[] {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function move<T>(arr: T[], from: number, to: number): T[] {
  if (to < 0 || to >= arr.length) return arr;
  const next = [...arr];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function ListControls({
  index,
  total,
  onMove,
  onDelete,
}: {
  index: number;
  total: number;
  onMove: (dir: -1 | 1) => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <GhostButton type="button" disabled={index === 0} onClick={() => onMove(-1)}>
        <ChevronUp className="w-3.5 h-3.5" />
      </GhostButton>
      <GhostButton
        type="button"
        disabled={index === total - 1}
        onClick={() => onMove(1)}
      >
        <ChevronDown className="w-3.5 h-3.5" />
      </GhostButton>
      <GhostButton type="button" danger onClick={onDelete}>
        <Trash2 className="w-3.5 h-3.5" />
      </GhostButton>
    </div>
  );
}

function HeroEditor() {
  const { content, updateContent } = useContent();
  const [words, setWords] = useState(csv(content.typingWords));
  const [badges, setBadges] = useState(content.heroBadges.join("\n"));

  const save = () => {
    updateContent({
      typingWords: parseCsv(words),
      heroBadges: badges
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    });
    toast.success("Hero content saved");
  };

  return (
    <Card>
      <div className="flex flex-col gap-4">
        <Field label="Typing words (comma separated)">
          <TextInput value={words} onChange={(e) => setWords(e.target.value)} />
        </Field>
        <Field label="Hero badges (one per line)">
          <TextArea
            rows={4}
            value={badges}
            onChange={(e) => setBadges(e.target.value)}
          />
        </Field>
        <div>
          <PrimaryButton type="button" onClick={save}>
            <Save className="w-4 h-4" /> Save Hero
          </PrimaryButton>
        </div>
      </div>
    </Card>
  );
}

function ProjectCard({
  project,
  index,
  total,
  onChange,
  onMove,
  onDelete,
}: {
  project: ProjectItem;
  index: number;
  total: number;
  onChange: (p: ProjectItem) => void;
  onMove: (dir: -1 | 1) => void;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  const set = (patch: Partial<ProjectItem>) => onChange({ ...project, ...patch });

  return (
    <Card>
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 cursor-pointer text-left flex-1 min-w-0"
        >
          <img
            src={resolveImage(project.image)}
            alt=""
            className="w-12 h-9 rounded-lg object-cover object-top border border-white/[0.08] shrink-0"
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-200 truncate">
              {project.title || "Untitled project"}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {project.category}
              {project.status ? ` · ${project.status}` : ""}
            </p>
          </div>
        </button>
        <ListControls index={index} total={total} onMove={onMove} onDelete={onDelete} />
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5">
              <Field label="Title">
                <TextInput
                  value={project.title}
                  onChange={(e) => set({ title: e.target.value })}
                />
              </Field>
              <Field label="Category">
                <select
                  value={project.category}
                  onChange={(e) => set({ category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-slate-200 outline-none focus:border-sky-500/40 [&>option]:bg-zinc-900"
                >
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
              <div className="md:col-span-2">
                <Field label="Description">
                  <TextArea
                    rows={4}
                    value={project.description}
                    onChange={(e) => set({ description: e.target.value })}
                  />
                </Field>
              </div>
              <div className="md:col-span-2">
                <Field label="Tech (comma separated)">
                  <TextInput
                    value={csv(project.tech)}
                    onChange={(e) => set({ tech: parseCsv(e.target.value) })}
                  />
                </Field>
              </div>
              <Field label="Status">
                <select
                  value={project.status}
                  onChange={(e) => set({ status: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-slate-200 outline-none focus:border-sky-500/40 [&>option]:bg-zinc-900"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s || "none"}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Image (asset key or URL)">
                <TextInput
                  list="asset-keys"
                  value={project.image}
                  onChange={(e) => set({ image: e.target.value })}
                />
              </Field>
              <Field label='GitHub URL (or "not available")'>
                <TextInput
                  value={project.github}
                  onChange={(e) => set({ github: e.target.value })}
                />
              </Field>
              <Field label='Demo URL (or "not available")'>
                <TextInput
                  value={project.demo}
                  onChange={(e) => set({ demo: e.target.value })}
                />
              </Field>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

function ProjectsEditor() {
  const { content, updateContent } = useContent();
  const projects = content.projects;
  const setProjects = (next: ProjectItem[]) => updateContent({ projects: next });

  const addProject = () =>
    setProjects([
      {
        title: "New Project",
        description: "",
        category: "React/Next.js",
        tech: [],
        featured: false,
        status: "",
        image: ASSET_KEYS[0] ?? "",
        github: "not available",
        demo: "not available",
      },
      ...projects,
    ]);

  return (
    <div className="flex flex-col gap-3">
      <datalist id="asset-keys">
        {ASSET_KEYS.map((k) => (
          <option key={k} value={k} />
        ))}
      </datalist>
      <div>
        <PrimaryButton type="button" onClick={addProject}>
          <Plus className="w-4 h-4" /> Add Project
        </PrimaryButton>
      </div>
      {projects.map((p, i) => (
        <ProjectCard
          key={i}
          project={p}
          index={i}
          total={projects.length}
          onChange={(next) =>
            setProjects(projects.map((x, j) => (j === i ? next : x)))
          }
          onMove={(dir) => setProjects(move(projects, i, i + dir))}
          onDelete={() => {
            if (confirm(`Delete project "${p.title}"?`))
              setProjects(projects.filter((_, j) => j !== i));
          }}
        />
      ))}
    </div>
  );
}

function ExperienceCard({
  exp,
  index,
  total,
  onChange,
  onMove,
  onDelete,
}: {
  exp: ExperienceItem;
  index: number;
  total: number;
  onChange: (e: ExperienceItem) => void;
  onMove: (dir: -1 | 1) => void;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  const set = (patch: Partial<ExperienceItem>) => onChange({ ...exp, ...patch });

  return (
    <Card>
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="cursor-pointer text-left flex-1 min-w-0"
        >
          <p className="text-sm font-semibold text-slate-200 truncate">
            {exp.role || "New role"}
          </p>
          <p className="text-xs text-slate-500 truncate">
            {exp.company} · {exp.period}
          </p>
        </button>
        <ListControls index={index} total={total} onMove={onMove} onDelete={onDelete} />
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5">
              <Field label="Role">
                <TextInput
                  value={exp.role}
                  onChange={(e) => set({ role: e.target.value })}
                />
              </Field>
              <Field label="Company">
                <TextInput
                  value={exp.company}
                  onChange={(e) => set({ company: e.target.value })}
                />
              </Field>
              <Field label='Period (e.g. "Feb 2025 -- Present")'>
                <TextInput
                  value={exp.period}
                  onChange={(e) => set({ period: e.target.value })}
                />
              </Field>
              <Field label='Duration ("auto" = computed from period)'>
                <TextInput
                  value={exp.duration}
                  onChange={(e) => set({ duration: e.target.value })}
                />
              </Field>
              <Field label="Type">
                <TextInput
                  value={exp.type}
                  onChange={(e) => set({ type: e.target.value })}
                />
              </Field>
              <Field label="Accent color">
                <select
                  value={exp.color}
                  onChange={(e) => set({ color: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-sm text-slate-200 outline-none focus:border-sky-500/40 [&>option]:bg-zinc-900"
                >
                  {COLOR_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
              <div className="md:col-span-2">
                <Field label="Description bullets (one per line)">
                  <TextArea
                    rows={4}
                    value={exp.description.join("\n")}
                    onChange={(e) =>
                      set({
                        description: e.target.value
                          .split("\n")
                          .filter((s) => s.trim()),
                      })
                    }
                  />
                </Field>
              </div>
              <div className="md:col-span-2">
                <Field label="Tech (comma separated)">
                  <TextInput
                    value={csv(exp.tech)}
                    onChange={(e) => set({ tech: parseCsv(e.target.value) })}
                  />
                </Field>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

function ExperienceEditor() {
  const { content, updateContent } = useContent();
  const experiences = content.experiences;
  const setExperiences = (next: ExperienceItem[]) =>
    updateContent({ experiences: next });

  const addExperience = () =>
    setExperiences([
      {
        role: "New Role",
        company: "",
        period: "",
        duration: "",
        type: "Full-time",
        description: [],
        tech: [],
        color: "sky",
      },
      ...experiences,
    ]);

  return (
    <div className="flex flex-col gap-3">
      <div>
        <PrimaryButton type="button" onClick={addExperience}>
          <Plus className="w-4 h-4" /> Add Experience
        </PrimaryButton>
      </div>
      {experiences.map((exp, i) => (
        <ExperienceCard
          key={i}
          exp={exp}
          index={i}
          total={experiences.length}
          onChange={(next) =>
            setExperiences(experiences.map((x, j) => (j === i ? next : x)))
          }
          onMove={(dir) => setExperiences(move(experiences, i, i + dir))}
          onDelete={() => {
            if (confirm(`Delete experience "${exp.role} @ ${exp.company}"?`))
              setExperiences(experiences.filter((_, j) => j !== i));
          }}
        />
      ))}
    </div>
  );
}

function TechGroupCard({
  group,
  index,
  total,
  onChange,
  onMove,
  onDelete,
}: {
  group: TechGroup;
  index: number;
  total: number;
  onChange: (g: TechGroup) => void;
  onMove: (dir: -1 | 1) => void;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  const set = (patch: Partial<TechGroup>) => onChange({ ...group, ...patch });

  return (
    <Card>
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 cursor-pointer text-left flex-1 min-w-0"
        >
          <span
            className="w-3 h-3 rounded-full shrink-0"
            style={{ background: group.accentColor }}
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-200 truncate">
              {group.label}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {group.techs.map((t) => t.name).join(", ")}
            </p>
          </div>
        </button>
        <ListControls index={index} total={total} onMove={onMove} onDelete={onDelete} />
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5">
              <Field label="Label">
                <TextInput
                  value={group.label}
                  onChange={(e) => set({ label: e.target.value })}
                />
              </Field>
              <Field label="Badge">
                <TextInput
                  value={group.badge}
                  onChange={(e) => set({ badge: e.target.value })}
                />
              </Field>
              <Field label="Accent color (hex)">
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={group.accentColor}
                    onChange={(e) => set({ accentColor: e.target.value })}
                    className="w-10 h-10 rounded-lg border border-white/[0.08] bg-transparent cursor-pointer"
                  />
                  <TextInput
                    value={group.accentColor}
                    onChange={(e) => set({ accentColor: e.target.value })}
                  />
                </div>
              </Field>
              <div className="md:col-span-2 flex flex-col gap-2">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Technologies
                </span>
                {group.techs.map((tech, ti) => (
                  <div key={ti} className="flex items-center gap-2">
                    <input
                      type="color"
                      value={
                        /^#[0-9a-fA-F]{6}$/.test(tech.color)
                          ? tech.color
                          : "#ffffff"
                      }
                      onChange={(e) =>
                        set({
                          techs: group.techs.map((t, j) =>
                            j === ti ? { ...t, color: e.target.value } : t
                          ),
                        })
                      }
                      className="w-9 h-9 rounded-lg border border-white/[0.08] bg-transparent cursor-pointer shrink-0"
                    />
                    <TextInput
                      value={tech.name}
                      onChange={(e) =>
                        set({
                          techs: group.techs.map((t, j) =>
                            j === ti ? { ...t, name: e.target.value } : t
                          ),
                        })
                      }
                    />
                    <GhostButton
                      type="button"
                      danger
                      onClick={() =>
                        set({ techs: group.techs.filter((_, j) => j !== ti) })
                      }
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </GhostButton>
                  </div>
                ))}
                <div>
                  <GhostButton
                    type="button"
                    onClick={() =>
                      set({
                        techs: [...group.techs, { name: "New Tech", color: "#38BDF8" }],
                      })
                    }
                  >
                    <Plus className="w-3.5 h-3.5" /> Add tech
                  </GhostButton>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

function TechEditor() {
  const { content, updateContent } = useContent();
  const groups = content.techGroups;
  const setGroups = (next: TechGroup[]) => updateContent({ techGroups: next });

  const addGroup = () =>
    setGroups([
      ...groups,
      {
        id: `group-${Date.now()}`,
        label: "New Group",
        badge: "Badge",
        accentColor: "#38bdf8",
        gridArea: "extra",
        techs: [],
      },
    ]);

  return (
    <div className="flex flex-col gap-3">
      <div>
        <PrimaryButton type="button" onClick={addGroup}>
          <Plus className="w-4 h-4" /> Add Group
        </PrimaryButton>
      </div>
      {groups.map((g, i) => (
        <TechGroupCard
          key={g.id}
          group={g}
          index={i}
          total={groups.length}
          onChange={(next) => setGroups(groups.map((x, j) => (j === i ? next : x)))}
          onMove={(dir) => setGroups(move(groups, i, i + dir))}
          onDelete={() => {
            if (confirm(`Delete group "${g.label}"?`))
              setGroups(groups.filter((_, j) => j !== i));
          }}
        />
      ))}
    </div>
  );
}

function SocialEditor() {
  const { content, updateContent } = useContent();
  const links = content.socialLinks;
  const setLinks = (next: SocialLink[]) => updateContent({ socialLinks: next });

  return (
    <div className="flex flex-col gap-3">
      <div>
        <PrimaryButton
          type="button"
          onClick={() =>
            setLinks([...links, { platform: "New", handle: "", url: "" }])
          }
        >
          <Plus className="w-4 h-4" /> Add Link
        </PrimaryButton>
      </div>
      {links.map((link, i) => (
        <Card key={i}>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.5fr_auto] gap-3 items-end">
            <Field label="Platform">
              <TextInput
                value={link.platform}
                onChange={(e) =>
                  setLinks(
                    links.map((x, j) =>
                      j === i ? { ...x, platform: e.target.value } : x
                    )
                  )
                }
              />
            </Field>
            <Field label="Handle">
              <TextInput
                value={link.handle}
                onChange={(e) =>
                  setLinks(
                    links.map((x, j) =>
                      j === i ? { ...x, handle: e.target.value } : x
                    )
                  )
                }
              />
            </Field>
            <Field label="URL">
              <TextInput
                value={link.url}
                onChange={(e) =>
                  setLinks(
                    links.map((x, j) => (j === i ? { ...x, url: e.target.value } : x))
                  )
                }
              />
            </Field>
            <ListControls
              index={i}
              total={links.length}
              onMove={(dir) => setLinks(move(links, i, i + dir))}
              onDelete={() => {
                if (confirm(`Delete "${link.platform}" link?`))
                  setLinks(links.filter((_, j) => j !== i));
              }}
            />
          </div>
        </Card>
      ))}
    </div>
  );
}

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("hero");
  const { content, resetContent, hasOverrides } = useContent();

  const exportContent = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "content.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("content.json downloaded — replace src/assets/content.json and redeploy");
  };

  const editor = useMemo(() => {
    switch (tab) {
      case "hero":
        return <HeroEditor />;
      case "projects":
        return <ProjectsEditor />;
      case "experience":
        return <ExperienceEditor />;
      case "tech":
        return <TechEditor />;
      case "social":
        return <SocialEditor />;
    }
  }, [tab]);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <Toaster position="top-right" />
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
              <LayoutDashboard className="w-6 h-6 text-sky-400" />
              Portfolio Dashboard
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Changes save instantly to this browser. Export to publish for everyone.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <GhostButton type="button" onClick={exportContent}>
              <Download className="w-3.5 h-3.5" /> Export content.json
            </GhostButton>
            {hasOverrides && (
              <GhostButton
                type="button"
                danger
                onClick={() => {
                  if (confirm("Discard all local changes and restore defaults?")) {
                    resetContent();
                    toast.success("Restored defaults");
                  }
                }}
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset
              </GhostButton>
            )}
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium border text-slate-300 border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.07] hover:text-white transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5" /> View Site
            </Link>
            <GhostButton
              type="button"
              onClick={() => {
                clearSession();
                onLogout();
              }}
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </GhostButton>
          </div>
        </div>

        <div className="flex items-center gap-1.5 mb-6 border border-white/[0.05] bg-white/[0.02] backdrop-blur-xl rounded-2xl p-1.5 w-fit max-w-full overflow-x-auto">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer whitespace-nowrap transition-colors duration-300 ${
                tab === id ? "text-sky-400" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab === id && (
                <motion.div
                  layoutId="admin-tab"
                  className="absolute inset-0 rounded-xl border border-sky-500/30 bg-sky-500/[0.08]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon className="w-4 h-4 relative z-10" />
              <span className="relative z-10">{label}</span>
            </button>
          ))}
        </div>

        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {editor}
        </motion.div>
      </div>
    </div>
  );
}
