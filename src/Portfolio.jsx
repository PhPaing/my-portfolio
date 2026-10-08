import { useState, useEffect } from "react";
import portrait from "./assets/profile.png";
import resumePdf from "./assets/Phone_Myat_Paing_Resume.pdf";
import {
  Mail,
  MessageCircle,
  Send,
  Download,
  ArrowRight,
  ArrowUpRight,
  Sun,
  Moon,
  MapPin,
  Briefcase,
  AtSign,
  CheckCircle2,
  GraduationCap,
  Menu,
  X,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

/* ============================================================
   THEME TOKENS — light / dark, switched at runtime
   Signature: the avatar ring gradient (blue → teal → emerald)
   is the one bold, consistent accent; everything else is calm.
   ============================================================ */
const THEMES = {
  dark: {
    bg: "#0A0E14",
    bgAlt: "#0F141C",
    panel: "#131922",
    panelAlt: "#171E29",
    line: "#232B38",
    text: "#EDF1F7",
    textDim: "#98A2B3",
    textFaint: "#5B6474",
    navBg: "rgba(10,14,20,0.82)",
    inputBg: "#0F141C",
  },
  light: {
    bg: "#FBFBFA",
    bgAlt: "#F3F4F2",
    panel: "#FFFFFF",
    panelAlt: "#F5F6F5",
    line: "#E4E6E3",
    text: "#14171C",
    textDim: "#565D68",
    textFaint: "#8A9099",
    navBg: "rgba(251,251,250,0.82)",
    inputBg: "#FFFFFF",
  },
};

const GRADIENT = "linear-gradient(135deg, #0A2E6B 0%, #1D5FD6 50%, #4FC3F7 100%)";
const ACCENT = "#2E7CF6";

const FONT_HEAD = "'Sora', sans-serif";
const FONT_BODY = "'Inter', sans-serif";
const FONT_MONO = "'IBM Plex Mono', monospace";

const PHOTO_SRC = portrait;
const RESUME_SRC = resumePdf;

/* ============================================================
   SHARED
   ============================================================ */
function Section({ id, children, t, border = true }) {
  return (
    <section
      id={id}
      className="px-6 md:px-12 py-20 md:py-28 transition-colors duration-500"
      style={{ borderTop: border ? `1px solid ${t.line}` : "none" }}
    >
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

function Eyebrow({ children }) {
  return (
    <div
      className="inline-flex items-center gap-2 text-[12.5px] font-semibold tracking-[0.14em] uppercase mb-4"
      style={{ fontFamily: FONT_MONO, color: ACCENT }}
    >
      <span className="w-6 h-px" style={{ backgroundColor: ACCENT }} />
      {children}
    </div>
  );
}

function Pill({ children, t, accent }) {
  return (
    <span
      className="px-3 py-1.5 rounded-full text-[12.5px] font-medium transition-colors duration-500"
      style={{
        fontFamily: FONT_BODY,
        color: accent ? "#0A0E14" : t.textDim,
        backgroundColor: accent ? ACCENT : t.panelAlt,
        border: accent ? "none" : `1px solid ${t.line}`,
      }}
    >
      {children}
    </span>
  );
}

/* ============================================================
   NAV
   ============================================================ */
function Nav({ t, isDark, setIsDark }) {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Home", href: "#top" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md transition-colors duration-500"
      style={{ backgroundColor: t.navBg, borderBottom: `1px solid ${t.line}` }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[13px] font-bold"
            style={{ background: GRADIENT, color: "#06131A" , fontFamily: FONT_HEAD}}
          >
            PM
          </span>
          <span className="text-[15px] font-semibold tracking-tight transition-colors duration-500" style={{ fontFamily: FONT_HEAD, color: t.text }}>
            Phone Myat Paing
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="px-3.5 py-2 rounded-md text-[13.5px] font-medium transition-colors duration-300 hover:opacity-80"
              style={{ fontFamily: FONT_BODY, color: t.textDim }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDark(!isDark)}
            aria-label="Toggle dark mode"
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-500"
            style={{ border: `1px solid ${t.line}`, color: t.text }}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center"
            style={{ color: t.text }}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-1 transition-colors duration-500" style={{ borderTop: `1px solid ${t.line}` }}>
          {links.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="py-2.5 text-[14px] font-medium" style={{ fontFamily: FONT_BODY, color: t.textDim }}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

/* ============================================================
   HERO
   ============================================================ */
const ROLES = ["Junior Full-Stack Developer"];

function Hero({ t }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setIdx((i) => (i + 1) % ROLES.length), 2200);
    return () => clearInterval(iv);
  }, []);

  const INFO = [
    { icon: <Briefcase size={16} />, text: "React · TypeScript · ASP.NET Core · SQL Server" },
    { icon: <MapPin size={16} />, text: "based in Bangkok, Thailand" },
    { icon: <GraduationCap size={16} />, text: "B.Sc. IT (Software Engineering), Stamford" },
    { icon: <AtSign size={16} />, text: "phonemyatp27@gmail.com" },
  ];

  return (
    <section id="top" className="relative px-6 md:px-12 pt-16 md:pt-24 pb-20 overflow-hidden">
      <div
        className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ background: GRADIENT }}
      />
      <div className="max-w-6xl mx-auto relative grid md:grid-cols-[380px_1fr] gap-14 items-center">
        {/* AVATAR */}
        <div className="flex justify-center md:justify-start">
          <div className="relative">
            <div
              className="w-64 h-64 md:w-80 md:h-80 rounded-full p-1"
              style={{ background: GRADIENT }}
            >
              <img
                src={PHOTO_SRC}
                alt="Portrait of Phone Myat Paing"
                className="w-full h-full rounded-full object-cover "
              />
            </div>
            <span
              className="absolute -bottom-2 -right-1 md:right-4 px-3 py-1.5 rounded-full text-[12px] font-semibold flex items-center gap-1.5 shadow-lg transition-colors duration-500"
              style={{ backgroundColor: t.panel, border: `1px solid ${t.line}`, color: t.text, fontFamily: FONT_MONO }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: ACCENT }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: ACCENT }} />
              </span>
              open to work
            </span>
          </div>
        </div>

        {/* TEXT */}
        <div>
          <p className="text-lg md:text-xl mb-2 transition-colors duration-500" style={{ fontFamily: FONT_BODY, color: t.textDim }}>
            Hi, I'm
          </p>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-3 transition-colors duration-500"
            style={{ fontFamily: FONT_HEAD, color: t.text }}
          >
            Phone Myat Paing <span className="wave-emoji" style={{ display: "inline-block" }}>👋</span>
          </h1>
          <div className="h-10 md:h-12 mb-6">
            <h2
              className="text-2xl md:text-[32px] font-bold transition-opacity duration-500"
              style={{ fontFamily: FONT_HEAD, backgroundImage: GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}
              key={idx}
            >
              I'm a {ROLES[idx]}.
            </h2>
          </div>

          <div className="flex flex-col gap-2.5 mb-8">
            {INFO.map((i, k) => (
              <div key={k} className="flex items-center gap-3 text-[14.5px] transition-colors duration-500" style={{ fontFamily: FONT_BODY, color: t.textDim }}>
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-500"
                  style={{ backgroundColor: t.panelAlt, color: ACCENT, border: `1px solid ${t.line}` }}
                >
                  {i.icon}
                </span>
                {i.text}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-7">
            <a
              href={RESUME_SRC}
              download="Phone_Myat_Paing_Resume.pdf"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-[14px] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ background: GRADIENT, color: "#08121A", fontFamily: FONT_BODY }}
            >
              <Download size={16} /> Download Resume
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-[14px] transition-colors duration-300 hover:opacity-80"
              style={{ border: `1.5px solid ${t.line}`, color: t.text, fontFamily: FONT_BODY }}
            >
              Contact Me <ArrowRight size={16} />
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <SocialIcon href="https://www.linkedin.com/in/phone-myat-paing-572707386/" label="LinkedIn" t={t}>
              <FaLinkedin size={18} />
            </SocialIcon>
            <SocialIcon href="https://wa.me/66958199409" label="WhatsApp" t={t}>
              <MessageCircle size={18} />
            </SocialIcon>
            <SocialIcon href="mailto:phonemyatp27@gmail.com" label="Email" t={t}>
              <Mail size={18} />
            </SocialIcon>
            <SocialIcon href="https://github.com/PhPaing" label="GitHub" t={t}>
              <FaGithub size={18} />
            </SocialIcon>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialIcon({ href, label, children, t }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
      style={{ border: `1px solid ${t.line}`, color: t.text }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = ACCENT)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = t.line)}
    >
      {children}
    </a>
  );
}

/* ============================================================
   ABOUT
   ============================================================ */
function About({ t }) {
  return (
    <Section id="about" t={t}>
      <Eyebrow t={t}>About Me</Eyebrow>
      <div className="grid md:grid-cols-[1.2fr_1fr] gap-14">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight transition-colors duration-500" style={{ fontFamily: FONT_HEAD, color: t.text }}>
            A little about my work
          </h2>
          <p className="text-[15.5px] leading-relaxed mb-4 transition-colors duration-500" style={{ fontFamily: FONT_BODY, color: t.textDim }}>
            I'm a junior full-stack developer with a B.Sc. in Information Technology (Software
            Engineering) from Stamford International University. I completed a five-month
            software developer internship at Bangkok Glass Public Company Limited, building
            React.js and TypeScript interfaces for a customer-facing website and integrating them
            with ASP.NET Core REST APIs.
          </p>
          <p className="text-[15.5px] leading-relaxed mb-6 transition-colors duration-500" style={{ fontFamily: FONT_BODY, color: t.textDim }}>
            I work across the stack: C#, ASP.NET Core and SQL Server on the back end, React.js and
            Tailwind CSS on the front end. I test endpoints with Postman and Swagger UI and keep my
            work in Git and GitHub. I'm looking for a junior full-stack, .NET or React role in Bangkok.
          </p>
          <div className="flex flex-wrap gap-2">
            <Pill t={t}>English — Fluent</Pill>
            <Pill t={t}>Burmese — Native</Pill>
            <Pill t={t} accent>Available Immediately</Pill>
          </div>
        </div>

        <div
          className="rounded-2xl p-6 transition-colors duration-500"
          style={{ backgroundColor: t.panel, border: `1px solid ${t.line}` }}
        >
          <div className="text-[12px] font-semibold uppercase tracking-wider mb-4" style={{ fontFamily: FONT_MONO, color: ACCENT }}>
            Snapshot
          </div>
          {[
            ["Location", "Bangkok, Thailand"],
            ["Role", "Junior Full-Stack Developer"],
            ["Availability", "Immediate"],
            ["Main stack", "React · ASP.NET Core · SQL Server"],
            ["Languages", "English (fluent) · Burmese (native)"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-4 py-3 transition-colors duration-500" style={{ borderBottom: `1px solid ${t.line}` }}>
              <span className="text-[13px] transition-colors duration-500" style={{ fontFamily: FONT_BODY, color: t.textFaint }}>
                {k}
              </span>
              <span className="text-[13.5px] font-medium text-right transition-colors duration-500" style={{ fontFamily: FONT_BODY, color: t.text }}>
                {v}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ============================================================
   EXPERIENCE
   ============================================================ */
const DUTIES = [
  "Built 10+ reusable React.js and TypeScript components with Tailwind CSS, used across 7 pages of the redesigned customer-facing website",
  "Implemented client-side routing with React Router and responsive layouts using Vite",
  "Built the front end for an AI chat assistant that connects to an AI chatbot service through its API",
  "Integrated the front end with ASP.NET Core REST APIs, handling JSON requests and responses",
  "Tested REST endpoints with Postman and Swagger UI and reported integration and data issues to backend developers",
  "Used Git/GitHub for version control and validated features before deployment",
];

function Experience({ t }) {
  return (
    <Section id="experience" t={t}>
      <Eyebrow t={t}>Experience</Eyebrow>
      <h2 className="text-3xl md:text-4xl font-bold mb-10 tracking-tight transition-colors duration-500" style={{ fontFamily: FONT_HEAD, color: t.text }}>
        Where I've worked
      </h2>

      <div className="rounded-2xl overflow-hidden transition-colors duration-500" style={{ border: `1px solid ${t.line}`, backgroundColor: t.panel }}>
        <div
          className="flex flex-col md:flex-row md:items-center justify-between gap-2 px-6 py-5 transition-colors duration-500"
          style={{ borderBottom: `1px solid ${t.line}`, backgroundColor: t.panelAlt }}
        >
          <div>
            <div className="text-lg font-semibold transition-colors duration-500" style={{ fontFamily: FONT_HEAD, color: t.text }}>
              Software Developer Intern
            </div>
            <div className="text-[13.5px] transition-colors duration-500" style={{ fontFamily: FONT_BODY, color: t.textDim }}>
              Bangkok Glass Public Company Limited · Bangkok, Thailand
            </div>
          </div>
          <Pill t={t} accent>Nov 2025 — Mar 2026</Pill>
        </div>
        <ul className="p-6 grid sm:grid-cols-2 gap-x-8 gap-y-4">
          {DUTIES.map((d, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[14px] leading-relaxed transition-colors duration-500" style={{ fontFamily: FONT_BODY, color: t.textDim }}>
              <CheckCircle2 size={16} className="mt-0.5 shrink-0" color={ACCENT} />
              {d}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

/* ============================================================
   PROJECTS
   ============================================================ */
const PROJECTS = [
  {
    title: "MovieTracker",
    desc: "Full-stack movie watchlist: Web API with JWT authentication and EF Core migrations, a background service importing from the TMDB API every 24 hours, and a React front end with search, genre filter and server-side pagination.",
    tags: ["ASP.NET Core", "C#", "SQL Server", "EF Core", "React.js", "JWT"],
    href: "https://github.com/PhPaing/Movie-Tracker",
  },
  {
    title: "BG Pathum United Football Club Website",
    desc: "Responsive club website with match schedules, news, standings and video, using reusable React and TypeScript components and the YouTube and Football Data APIs.",
    tags: ["React.js", "TypeScript", "Tailwind CSS", "REST APIs"],
    href: "https://github.com/PhPaing/bg-pathum-united-website",
  },
  {
    title: "Hot Coffee Delivery App",
    desc: "Android coffee ordering app with user authentication, menu browsing, cart and checkout, and order management on a SQLite/MySQL database.",
    tags: ["Java", "Android Studio", "XML", "SQLite/MySQL"],
    href: "https://github.com/PhPaing/Hot-Coffee-Delivery-App",
  },
];

function Projects({ t }) {
  return (
    <Section id="projects" t={t}>
      <Eyebrow t={t}>Portfolio</Eyebrow>
      <h2 className="text-3xl md:text-4xl font-bold mb-10 tracking-tight transition-colors duration-500" style={{ fontFamily: FONT_HEAD, color: t.text }}>
        Selected projects
      </h2>

      <div className="grid md:grid-cols-3 gap-5">
        {PROJECTS.map((p) => (
          <a
            key={p.title}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl p-6 flex flex-col transition-all duration-300 hover:-translate-y-1.5"
            style={{ backgroundColor: t.panel, border: `1px solid ${t.line}` }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
              style={{ background: GRADIENT }}
            >
              <FaGithub size={18} color="#081018" />
            </div>
            <h3 className="text-[17px] font-semibold mb-2.5 leading-snug transition-colors duration-500" style={{ fontFamily: FONT_HEAD, color: t.text }}>
              {p.title}
            </h3>
            <p className="text-[13.5px] leading-relaxed mb-5 flex-1 transition-colors duration-500" style={{ fontFamily: FONT_BODY, color: t.textDim }}>
              {p.desc}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {p.tags.map((tag) => (
                <span key={tag} className="text-[11px] px-2 py-1 rounded-md transition-colors duration-500" style={{ fontFamily: FONT_MONO, color: t.textDim, backgroundColor: t.panelAlt }}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-[13px] font-semibold mt-auto" style={{ fontFamily: FONT_BODY, color: ACCENT }}>
              View project
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}

/* ============================================================
   SKILLS + EDUCATION
   ============================================================ */
const SKILL_GROUPS = [
  { key: "Languages", values: ["TypeScript", "JavaScript", "C#", "Java"] },
  { key: "Frontend", values: ["React.js", "HTML5", "CSS3", "Tailwind CSS"] },
  { key: "API & Backend", values: ["ASP.NET Core Web API", "EF Core", "REST APIs", "JWT", "JSON"] },
  { key: "Database", values: ["SQL Server", "MySQL", "SQLite"] },
  { key: "Tools", values: ["Git", "GitHub", "Postman", "Swagger UI", "Visual Studio", "VS Code"] },
];
const EXPERTISE = ["REST API integration", "Relational database design", "Responsive UI", "API testing", "Client-side routing"];

function Skills({ t }) {
  return (
    <Section id="skills" t={t}>
      <Eyebrow t={t}>Skills</Eyebrow>
      <h2 className="text-3xl md:text-4xl font-bold mb-10 tracking-tight transition-colors duration-500" style={{ fontFamily: FONT_HEAD, color: t.text }}>
        Tools &amp; technologies
      </h2>

      <div className="grid md:grid-cols-5 gap-4 mb-10">
        {SKILL_GROUPS.map((g) => (
          <div key={g.key} className="rounded-xl p-4 transition-colors duration-500" style={{ backgroundColor: t.panel, border: `1px solid ${t.line}` }}>
            <div className="text-[11.5px] font-semibold uppercase tracking-wider mb-3" style={{ fontFamily: FONT_MONO, color: ACCENT }}>
              {g.key}
            </div>
            <div className="flex flex-col gap-1.5">
              {g.values.map((v) => (
                <span key={v} className="text-[13px] transition-colors duration-500" style={{ fontFamily: FONT_BODY, color: t.textDim }}>
                  {v}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {EXPERTISE.map((e) => (
          <Pill key={e} t={t}>{e}</Pill>
        ))}
      </div>
    </Section>
  );
}

function Education({ t }) {
  return (
    <Section id="education" t={t}>
      <Eyebrow t={t}>Education</Eyebrow>
      <h2 className="text-3xl md:text-4xl font-bold mb-10 tracking-tight transition-colors duration-500" style={{ fontFamily: FONT_HEAD, color: t.text }}>
        Education &amp; certifications
      </h2>

      <div className="grid md:grid-cols-2 gap-5 mb-8">
        {[
          { range: "2023 — 2026", school: "Stamford International University", detail: "B.Sc. Information Technology (Software Engineering)", note: "GPA 3.35" },
          { range: "2019 — 2022", school: "Youth International University", detail: "Diploma in Computing, Pearson BTEC Level 5 (UK)", note: "Merit" },
        ].map((e) => (
          <div key={e.school} className="rounded-2xl p-6 transition-colors duration-500" style={{ backgroundColor: t.panel, border: `1px solid ${t.line}` }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: GRADIENT }}>
              <GraduationCap size={18} color="#081018" />
            </div>
            <div className="text-[12px] mb-2 font-medium" style={{ fontFamily: FONT_MONO, color: ACCENT }}>
              {e.range}
            </div>
            <h3 className="text-[16px] font-semibold mb-1 transition-colors duration-500" style={{ fontFamily: FONT_HEAD, color: t.text }}>
              {e.school}
            </h3>
            <p className="text-[13.5px] mb-1 transition-colors duration-500" style={{ fontFamily: FONT_BODY, color: t.textDim }}>
              {e.detail}
            </p>
            <p className="text-[12.5px] transition-colors duration-500" style={{ fontFamily: FONT_MONO, color: t.textFaint }}>
              {e.note}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <Pill t={t}>Responsive Web Design — freeCodeCamp</Pill>
        <Pill t={t}>JS Algorithms &amp; Data Structures — freeCodeCamp</Pill>
        <Pill t={t}>Cloud-Based Web Development — Stamford</Pill>
      </div>
    </Section>
  );
}

/* ============================================================
   CONTACT
   ============================================================ */
function Contact({ t }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const sendMail = () => {
    const subject = encodeURIComponent(`Opportunity for ${form.name || "you"} — via portfolio`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:phonemyatp27@gmail.com?subject=${subject}&body=${body}`;
  };

  const CONTACT_ITEMS = [
    { label: "Email", value: "phonemyatp27@gmail.com", href: "mailto:phonemyatp27@gmail.com", icon: <Mail size={17} /> },
    { label: "WhatsApp", value: "+66 95 819 9409", href: "https://wa.me/66958199409", icon: <MessageCircle size={17} /> },
    { label: "LINE", value: "+66 95 819 9409 (LINE)", href: "tel:+66958199409", icon: <Send size={17} /> },
    { label: "LinkedIn", value: "/in/phone-myat-paing-572707386", href: "https://www.linkedin.com/in/phone-myat-paing-572707386/", icon: <FaLinkedin size={17} /> },
  ];

  return (
    <Section id="contact" t={t}>
      <Eyebrow t={t}>Contact</Eyebrow>
      <div className="grid md:grid-cols-2 gap-14">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight transition-colors duration-500" style={{ fontFamily: FONT_HEAD, color: t.text }}>
            Let's build something.
          </h2>
          <p className="text-[15px] leading-relaxed mb-8 max-w-md transition-colors duration-500" style={{ fontFamily: FONT_BODY, color: t.textDim }}>
            Open to junior full-stack, .NET and React developer roles in Bangkok, available to start
            immediately. Reach out on whichever channel is easiest — I reply fast.
          </p>

          <div className="flex flex-col gap-2.5">
            {CONTACT_ITEMS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 rounded-xl px-4 py-3.5 transition-colors duration-300 hover:opacity-80"
                style={{ border: `1px solid ${t.line}` }}
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0" style={{ background: GRADIENT, color: "#081018" }}>
                  {c.icon}
                </span>
                <span>
                  <span className="block text-[12px] transition-colors duration-500" style={{ fontFamily: FONT_MONO, color: t.textFaint }}>
                    {c.label}
                  </span>
                  <span className="block text-[14px] transition-colors duration-500" style={{ fontFamily: FONT_BODY, color: t.text }}>
                    {c.value}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-6 transition-colors duration-500" style={{ backgroundColor: t.panel, border: `1px solid ${t.line}` }}>
          <label className="block mb-4">
            <span className="block text-[12.5px] font-medium mb-1.5 transition-colors duration-500" style={{ fontFamily: FONT_BODY, color: t.textDim }}>
              Name
            </span>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
              className="w-full rounded-lg px-3.5 py-2.5 text-[14px] outline-none focus:ring-2 transition-colors duration-500"
              style={{ backgroundColor: t.inputBg, border: `1px solid ${t.line}`, color: t.text, fontFamily: FONT_BODY }}
            />
          </label>

          <label className="block mb-4">
            <span className="block text-[12.5px] font-medium mb-1.5 transition-colors duration-500" style={{ fontFamily: FONT_BODY, color: t.textDim }}>
              Email
            </span>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@company.com"
              type="email"
              className="w-full rounded-lg px-3.5 py-2.5 text-[14px] outline-none focus:ring-2 transition-colors duration-500"
              style={{ backgroundColor: t.inputBg, border: `1px solid ${t.line}`, color: t.text, fontFamily: FONT_BODY }}
            />
          </label>

          <label className="block mb-6">
            <span className="block text-[12.5px] font-medium mb-1.5 transition-colors duration-500" style={{ fontFamily: FONT_BODY, color: t.textDim }}>
              Message
            </span>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell me about the role..."
              rows={4}
              className="w-full rounded-lg px-3.5 py-2.5 text-[14px] outline-none focus:ring-2 resize-none transition-colors duration-500"
              style={{ backgroundColor: t.inputBg, border: `1px solid ${t.line}`, color: t.text, fontFamily: FONT_BODY }}
            />
          </label>

          <button
            onClick={sendMail}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-[14px] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            style={{ background: GRADIENT, color: "#081018", fontFamily: FONT_BODY }}
          >
            Send Message <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </Section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer({ t }) {
  return (
    <footer className="px-6 md:px-12 py-10 transition-colors duration-500" style={{ borderTop: `1px solid ${t.line}` }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="text-[13px] transition-colors duration-500" style={{ fontFamily: FONT_BODY, color: t.textFaint }}>
          © {new Date().getFullYear()} Phone Myat Paing. Built with React &amp; Tailwind CSS.
        </div>
        <a href="#top" className="text-[13px] font-medium transition-colors duration-500" style={{ fontFamily: FONT_BODY, color: ACCENT }}>
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}

/* ============================================================
   ROOT
   ============================================================ */
export default function Portfolio() {
  const [isDark, setIsDark] = useState(true);
  const t = isDark ? THEMES.dark : THEMES.light;

  return (
    <div style={{ backgroundColor: t.bg, minHeight: "100vh" }} className="antialiased transition-colors duration-500">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        * { scroll-behavior: smooth; }
        @keyframes wave {
          0% { transform: rotate(0deg); }
          8% { transform: rotate(16deg); }
          16% { transform: rotate(-10deg); }
          24% { transform: rotate(16deg); }
          32% { transform: rotate(-6deg); }
          40% { transform: rotate(12deg); }
          48% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
        .wave-emoji {
          transform-origin: 70% 70%;
          animation: wave 2.6s ease-in-out infinite;
          animation-delay: 0.6s;
        }
        ::selection { background: ${ACCENT}44; }
        input::placeholder, textarea::placeholder { color: ${t.textFaint}; }
        a, button { -webkit-tap-highlight-color: transparent; }
        a:focus-visible, button:focus-visible, input:focus-visible, textarea:focus-visible {
          outline: 2px solid ${ACCENT};
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; }
        }
      `}</style>
      <Nav t={t} isDark={isDark} setIsDark={setIsDark} />
      <Hero t={t} />
      <About t={t} />
      <Experience t={t} />
      <Projects t={t} />
      <Skills t={t} />
      <Education t={t} />
      <Contact t={t} />
      <Footer t={t} />
    </div>
  );
}