import { useEffect, useRef, useState } from "react";
import { Mail, ArrowUpRight, Circle, Phone, GraduationCap, Briefcase, MapPin } from "lucide-react";
import profilePhoto from "./assets/profile.jpg";

const CONFIG = {
  name: "Phone Myat Paing",
  role: "Junior Full-Stack Developer (React + .NET)",
  location: "Bangkok, Thailand",
  status: "available for work",
  email: "phonemyatp27@gmail.com",
  phone: "+66 95 819 9409",
  github: "https://github.com/PhPaing",
  bio: "Junior full-stack developer working across React and .NET, with hands-on internship experience building responsive web applications and integrating REST APIs. Strong in debugging, API testing, and frontend-backend integration.",
  now: "Currently: finishing a B.Sc. in Information Technology at Stamford International University (2023–2026).",
  badges: [
    { icon: "briefcase", label: "Bangkok Glass Intern" },
    { icon: "grad", label: "B.Sc. IT · GPA 3.35" },
    { icon: "pin", label: "Bangkok, Thailand" },
  ],
  projects: [
    {
      name: "Bangkok Glass Frontend Modernization",
      tag: "internship",
      desc: "Built 10+ reusable React.js and Tailwind CSS components, and integrated the frontend with .NET REST APIs during a Software Developer Internship at Bangkok Glass Public Company Limited.",
      stack: ["React.js", "Tailwind CSS", ".NET", "REST APIs"],
    },
    {
      name: "ATM Management System",
      tag: "academic project",
      desc: "A console-based ATM system supporting deposit and withdrawal flows, with secure login and account lockout after failed attempts.",
      stack: ["Java", "MySQL"],
    },
    {
      name: "Breast Cancer Classification",
      tag: "machine learning",
      desc: "A machine learning model that classifies tumors as benign or malignant, built with a full data preprocessing and feature-selection pipeline.",
      stack: ["Python", "Scikit-learn"],
    },
  ],
  skills: {
    Languages: ["JavaScript", "C#", "Python", "Java"],
    Frontend: ["React.js", "HTML", "CSS", "Tailwind CSS"],
    "Backend & DB": [".NET", "REST APIs", "MySQL"],
    Tools: ["Git / GitHub", "VS Code", "Visual Studio", "Postman", "Swagger UI"],
  },
};

const SECTIONS = [
  { id: "work", label: "// work" },
  { id: "about", label: "// about" },
  { id: "toolkit", label: "// toolkit" },
  { id: "contact", label: "// contact" },
];

const BADGE_ICONS = { briefcase: Briefcase, grad: GraduationCap, pin: MapPin };

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
      <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.03 3.26 9.29 7.79 10.8.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.17.69-3.84-1.36-3.84-1.36-.52-1.31-1.27-1.66-1.27-1.66-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.33.95.1-.74.4-1.25.72-1.54-2.53-.29-5.19-1.27-5.19-5.63 0-1.24.44-2.26 1.17-3.05-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.14 1.17.91-.25 1.89-.38 2.86-.39.97.01 1.95.14 2.86.39 2.18-1.48 3.14-1.17 3.14-1.17.62 1.58.23 2.75.11 3.04.73.79 1.17 1.81 1.17 3.05 0 4.37-2.67 5.34-5.21 5.62.41.36.77 1.06.77 2.14 0 1.54-.01 2.79-.01 3.17 0 .3.2.66.79.55A10.53 10.53 0 0 0 23.5 12c0-6.28-5.23-11.52-11.5-11.52Z" />
    </svg>
  );
}

function useTypedText(text, speed = 38, startDelay = 300) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    let timer;
    const start = setTimeout(() => {
      timer = setInterval(() => {
        i += 1;
        setOut(text.slice(0, i));
        if (i >= text.length) clearInterval(timer);
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearInterval(timer);
    };
  }, [text, speed, startDelay]);
  return out;
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, className = "", as: Tag = "div" }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`${className} transition-all duration-700 ease-out motion-reduce:transition-none ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {children}
    </Tag>
  );
}

export default function Portfolio() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const heroLine1 = useTypedText("const engineer = {", 28, 200);
  // eslint-disable-next-line no-unused-vars
  const heroLine2 = useTypedText(
    `  name: "${CONFIG.name}",`,
    22,
    200 + "const engineer = {".length * 28 + 120
  );

  const [active, setActive] = useState("work");

  return (
    <div
      style={{
        "--bg": "#FAFAFB",
        "--bg-panel": "#F1F2F5",
        "--ink": "#14161A",
        "--ink-soft": "#5B6068",
        "--accent": "#0F8B8D",
        "--accent-warm": "#E8A33D",
        "--line": "#E2E4E9",
        fontFamily: "'Inter', sans-serif",
        backgroundColor: "var(--bg)",
        color: "var(--ink)",
      }}
      className="min-h-screen w-full relative overflow-x-hidden"
    >
      <style>{`
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        a, button { outline-offset: 3px; }
        a:focus-visible, button:focus-visible {
          outline: 2px solid var(--accent);
          border-radius: 2px;
        }
        .cursor-blink::after {
          content: "▍";
          color: var(--accent-warm);
          animation: blink 1s step-start infinite;
        }
        @keyframes blink { 50% { opacity: 0; } }
        .card-hover { transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease; }
        @media (prefers-reduced-motion: reduce) {
          .card-hover { transition: none; }
        }
        .card-hover:hover { transform: translateY(-3px); border-color: var(--accent); box-shadow: 0 12px 24px -12px rgba(15,139,141,0.25); }
        .photo-glow {
          background: radial-gradient(circle at 65% 30%, rgba(15,139,141,0.16), transparent 60%),
                      radial-gradient(circle at 20% 80%, rgba(232,163,61,0.14), transparent 55%);
        }
        .photo-frame {
          box-shadow: 0 24px 48px -20px rgba(20,22,26,0.25), 0 0 0 1px var(--line);
        }
      `}</style>

      {/* Ambient background accent */}
      <div className="photo-glow fixed inset-0 -z-10" aria-hidden="true" />

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-30 backdrop-blur border-b" style={{ borderColor: "var(--line)", backgroundColor: "rgba(250,250,251,0.85)" }}>
        <div className="max-w-5xl mx-auto px-6 md:pl-16 py-4 flex items-center justify-between">
          <span className="font-mono text-sm font-medium">{CONFIG.name.split(" ").map(n => n[0]).join("")}.</span>
          <nav className="flex gap-5 md:gap-8">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setActive(s.id)}
                className="font-mono text-xs tracking-wide transition-colors"
                style={{ color: active === s.id ? "var(--accent)" : "var(--ink-soft)" }}
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Decorative gutter line */}
      <div
        className="hidden md:block fixed top-0 left-8 bottom-0 w-px z-0"
        style={{ backgroundColor: "var(--line)" }}
        aria-hidden="true"
      />

      <main className="pt-28 md:pl-16 max-w-5xl mx-auto px-6">
        {/* HERO */}
        <section className="min-h-[70vh] flex flex-col-reverse md:flex-row items-center gap-12 py-16">
          <div className="flex-1">
            <div
              className="font-mono text-sm p-6 rounded-lg border max-w-xl"
              style={{ borderColor: "var(--line)", backgroundColor: "var(--bg-panel)" }}
            >
              <div style={{ color: "var(--ink-soft)" }}>{heroLine1}</div>
              <div>
                <span style={{ color: "var(--ink-soft)" }}>  name: </span>
                <span style={{ color: "var(--accent)" }}>"{CONFIG.name}"</span>
                <span>,</span>
              </div>
              <div>
                <span style={{ color: "var(--ink-soft)" }}>  role: </span>
                <span style={{ color: "var(--accent)" }}>"{CONFIG.role}"</span>
                <span className="cursor-blink"></span>
              </div>
              <div style={{ color: "var(--ink-soft)" }}>{"}"}</div>
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-semibold mt-8 leading-[1.05] max-w-xl">
              I turn hard problems into software that just works.
            </h1>
            <p className="mt-5 max-w-lg text-base md:text-lg" style={{ color: "var(--ink-soft)" }}>
              {CONFIG.bio}
            </p>

            <div className="flex gap-4 mt-8">
              <a
                href="#work"
                className="font-mono text-sm px-5 py-3 rounded-md text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "var(--accent)" }}
              >
                view work →
              </a>
              <a
                href={`mailto:${CONFIG.email}`}
                className="font-mono text-sm px-5 py-3 rounded-md border transition-colors"
                style={{ borderColor: "var(--line)" }}
              >
                say hello
              </a>
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              {CONFIG.badges.map((b) => {
                const Icon = BADGE_ICONS[b.icon];
                return (
                  <span
                    key={b.label}
                    className="font-mono text-xs px-3 py-1.5 rounded-full border flex items-center gap-1.5"
                    style={{ borderColor: "var(--line)", color: "var(--ink-soft)" }}
                  >
                    <Icon size={13} style={{ color: "var(--accent)" }} />
                    {b.label}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="shrink-0">
            <div
              className="photo-frame rounded-2xl overflow-hidden w-56 h-56 md:w-72 md:h-72"
              style={{ backgroundColor: "var(--bg-panel)" }}
            >
              <img
                src={profilePhoto}
                alt={CONFIG.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* WORK */}
        <section id="work" className="py-20 border-t" style={{ borderColor: "var(--line)" }}>
          <Reveal>
            <p className="font-mono text-xs mb-2" style={{ color: "var(--accent)" }}>// work</p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-10">Selected projects</h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5">
            {CONFIG.projects.map((p, i) => (
              <Reveal key={p.name} className={`delay-${i}`}>
                <div
                  className="card-hover h-full p-6 rounded-lg border flex flex-col"
                  style={{ borderColor: "var(--line)" }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-display text-xl font-semibold">{p.name}</h3>
                    <ArrowUpRight size={18} style={{ color: "var(--ink-soft)" }} />
                  </div>
                  <span
                    className="font-mono text-[11px] w-fit px-2 py-0.5 rounded mb-3"
                    style={{ backgroundColor: "var(--bg-panel)", color: "var(--ink-soft)" }}
                  >
                    {p.tag}
                  </span>
                  <p className="text-sm mb-4 flex-1" style={{ color: "var(--ink-soft)" }}>
                    {p.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span key={s} className="font-mono text-[11px]" style={{ color: "var(--accent)" }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-20 border-t" style={{ borderColor: "var(--line)" }}>
          <Reveal>
            <p className="font-mono text-xs mb-2" style={{ color: "var(--accent)" }}>// about</p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-6">A little more context</h2>
            <p className="max-w-2xl text-base leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              {CONFIG.bio} Outside of coursework, I've built projects spanning systems programming
              (a Java ATM simulator) and applied machine learning (tumor classification with Scikit-learn),
              alongside my internship work integrating React frontends with .NET APIs.
            </p>
            <p className="font-mono text-sm mt-6 px-4 py-3 rounded-md border max-w-xl" style={{ borderColor: "var(--line)", backgroundColor: "var(--bg-panel)" }}>
              {CONFIG.now}
            </p>
          </Reveal>
        </section>

        {/* TOOLKIT */}
        <section id="toolkit" className="py-20 border-t" style={{ borderColor: "var(--line)" }}>
          <Reveal>
            <p className="font-mono text-xs mb-2" style={{ color: "var(--accent)" }}>// toolkit</p>
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-10">What I build with</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(CONFIG.skills).map(([cat, items], i) => (
              <Reveal key={cat} className={`delay-${i}`}>
                <h3 className="font-mono text-xs mb-3" style={{ color: "var(--ink-soft)" }}>{cat}</h3>
                <ul className="space-y-2">
                  {items.map((it) => (
                    <li key={it} className="text-sm">{it}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-24 border-t" style={{ borderColor: "var(--line)" }}>
          <Reveal>
            <p className="font-mono text-xs mb-2" style={{ color: "var(--accent)" }}>// contact</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold mb-6 max-w-lg leading-tight">
              Let's build something worth shipping.
            </h2>
            <a
              href={`mailto:${CONFIG.email}`}
              className="font-display text-xl md:text-2xl inline-block border-b-2 pb-1 transition-colors"
              style={{ borderColor: "var(--accent-warm)" }}
            >
              {CONFIG.email}
            </a>
            <p className="font-mono text-sm mt-3" style={{ color: "var(--ink-soft)" }}>
              {CONFIG.phone}
            </p>
            <div className="flex gap-5 mt-8">
              <a href={CONFIG.github} aria-label="GitHub" style={{ color: "var(--ink-soft)" }}>
                <GithubIcon />
              </a>
              <a href={`tel:${CONFIG.phone.replace(/\s/g, "")}`} aria-label="Phone" style={{ color: "var(--ink-soft)" }}>
                <Phone size={20} />
              </a>
              <a href={`mailto:${CONFIG.email}`} aria-label="Email" style={{ color: "var(--ink-soft)" }}>
                <Mail size={20} />
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      {/* STATUS BAR — mimics an editor's bottom bar */}
      <footer
        className="fixed bottom-0 left-0 right-0 z-30 border-t backdrop-blur"
        style={{ borderColor: "var(--line)", backgroundColor: "rgba(250,250,251,0.9)" }}
      >
        <div className="max-w-5xl mx-auto px-6 md:pl-16 py-2 flex items-center justify-between font-mono text-[11px]" style={{ color: "var(--ink-soft)" }}>
          <span className="flex items-center gap-1.5">
            <Circle size={8} fill="var(--accent)" style={{ color: "var(--accent)" }} />
            {CONFIG.status}
          </span>
          <span className="hidden sm:inline">{CONFIG.location} · UTF-8</span>
        </div>
      </footer>
    </div>
  );
}