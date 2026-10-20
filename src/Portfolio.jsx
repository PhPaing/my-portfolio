import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Copy, Download, Menu, Moon, Sun, X } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import portrait from "./assets/profile.png";
import resume from "./assets/Phone_Myat_Paing_Resume.pdf";
import { candidate, certs, education, experience, links, projects, proof, skills } from "./data";

const NAV = [
  ["projects", "Projects"],
  ["experience", "Experience"],
  ["skills", "Skills"],
  ["education", "Education"],
  ["contact", "Contact"],
];
const SECTION_IDS = NAV.map(([id]) => id);

const btn = "inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors";
const primary = `${btn} bg-accent text-paper hover:opacity-90`;
const ghost = `${btn} border border-line text-ink hover:border-accent`;

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) return saved;
    } catch { /* storage unavailable */ }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("theme", theme); } catch { /* ignore */ }
  }, [theme]);
  return [theme, setTheme];
}

function useActiveSection(ids) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
      <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      <div className="mt-10">{children}</div>
    </section>
  );
}

function Nav({ theme, setTheme }) {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-10">
        <a href="#top" className="font-display text-lg font-bold tracking-tight">Phone Myat Paing</a>
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV.map(([id, label]) => (
            <a
              key={id}
              href={"#" + id}
              aria-current={active === id ? "true" : undefined}
              className={"rounded-md px-3 py-2 text-sm font-medium transition-colors " + (active === id ? "text-accent" : "text-mute hover:text-ink")}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line hover:border-accent"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Mobile" className="flex flex-col border-t border-line px-6 pb-3 md:hidden">
          {NAV.map(([id, label]) => (
            <a key={id} href={"#" + id} onClick={() => setOpen(false)} className="py-3 text-sm font-medium text-mute">
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function ApiCard() {
  const entries = Object.entries(candidate);
  const fmt = (v) => JSON.stringify(v).replace(/","/g, '", "');
  return (
    <figure
      className="overflow-hidden rounded-xl border border-line bg-panel shadow-[0_1px_0_var(--line)]"
      aria-label="Profile summary shown as a JSON API response"
    >
      <figcaption className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 font-mono text-xs text-mute">
        <span className="truncate">GET /api/candidates/phone-myat-paing</span>
        <span className="status-in shrink-0 rounded bg-ok/15 px-2 py-0.5 font-medium text-ok">200 OK</span>
      </figcaption>
      <pre className="overflow-x-auto px-4 py-5 font-mono text-[13px] leading-7 whitespace-pre-wrap">
        <span className="line-in block" style={{ "--i": 0 }}>{"{"}</span>
        {entries.map(([k, v], i) => (
          <span key={k} className="line-in block pl-8 -indent-4" style={{ "--i": i + 1 }}>
            <span className="text-mute">"{k}"</span>: <span className={k === "availability" ? "font-medium text-ok" : "text-accent"}>{fmt(v)}</span>
            {i < entries.length - 1 ? "," : ""}
          </span>
        ))}
        <span className="line-in block" style={{ "--i": entries.length + 1 }}>{"}"}</span>
      </pre>
    </figure>
  );
}

function Hero() {
  return (
    <section id="top" className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-12 pt-14 md:grid-cols-[1.15fr_1fr] md:px-10 md:pb-16 md:pt-24">
      <div>
        <div className="mb-6 flex items-center gap-3">
          <img src={portrait} alt="Portrait of Phone Myat Paing" width="48" height="48" className="h-12 w-12 rounded-full border border-line object-cover" />
          <p className="flex items-center gap-2 text-sm font-medium text-mute">
            <span className="h-2 w-2 rounded-full bg-ok" aria-hidden="true" />
            Open to work in Bangkok, available immediately
          </p>
        </div>
        <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          I build React front ends and ASP.NET Core back ends.
        </h1>
        <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-mute">
          I'm Phone Myat Paing, a junior full-stack developer with a B.Sc. in IT (Software Engineering) from Stamford.
          After a five-month internship at Bangkok Glass building React and TypeScript pages on ASP.NET Core APIs,
          I'm looking for an entry-level full-stack, .NET or React role.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href={resume} download="Phone_Myat_Paing_Resume.pdf" className={primary}>
            <Download size={16} /> Download resume
          </a>
          <a href="#contact" className={ghost}>Contact me</a>
          <span className="mx-1 hidden h-6 w-px bg-line sm:block" aria-hidden="true" />
          {[
            [links.github, "GitHub", <FaGithub size={20} key="g" />],
            [links.linkedin, "LinkedIn", <FaLinkedin size={20} key="l" />],
            [links.whatsapp, "WhatsApp", <FaWhatsapp size={20} key="w" />],
          ].map(([href, label, icon]) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="rounded-md p-2 text-mute hover:text-accent">
              {icon}
            </a>
          ))}
        </div>
      </div>
      <ApiCard />
    </section>
  );
}

function ProofStrip() {
  return (
    <div className="mx-auto max-w-6xl px-6 md:px-10">
      <dl className="grid gap-6 border-y border-line py-8 sm:grid-cols-3">
        {proof.map(([n, label]) => (
          <div key={n}>
            <dt className="font-display text-2xl font-bold">{n}</dt>
            <dd className="mt-1 text-sm text-mute">{label}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Projects() {
  return (
    <Section id="projects" title="Projects I've built">
      <div>
        {projects.map((p) => (
          <article key={p.title} className="grid gap-6 border-t border-line py-9 md:grid-cols-[1fr_auto] md:gap-12">
            <div>
              <h3 className="font-display text-2xl font-bold tracking-tight">{p.title}</h3>
              <p className="mt-2 max-w-[62ch] text-mute">{p.summary}</p>
              <ul className="mt-4 max-w-[62ch] space-y-2 text-[15px]">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-3">
                    <span className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                    {pt}
                  </li>
                ))}
              </ul>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
                {p.tags.map((tag) => (
                  <li key={tag} className="rounded-md border border-line px-2.5 py-1 text-xs font-medium text-mute">{tag}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-3 md:flex-col md:items-stretch">
              {p.live && (
                <a href={p.live} target="_blank" rel="noopener noreferrer" className={primary}>
                  Live demo <ArrowUpRight size={15} />
                </a>
              )}
              <a href={p.code} target="_blank" rel="noopener noreferrer" className={ghost}>
                <FaGithub size={15} /> Source code
              </a>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="grid gap-8 md:grid-cols-[220px_1fr] md:gap-12">
        <p className="text-sm font-medium text-mute">{experience.dates}</p>
        <div className="border-l border-line pl-6 md:pl-10">
          <h3 className="font-display text-xl font-bold">{experience.role}</h3>
          <p className="mt-1 text-mute">{experience.company}</p>
          <p className="mt-1 text-sm"><span className="font-semibold">Project:</span> {experience.project}</p>
          <ul className="mt-6 max-w-[68ch] space-y-3 text-[15px] leading-relaxed">
            {experience.duties.map((d) => (
              <li key={d} className="flex gap-3">
                <Check size={16} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" title="Skills">
      <dl>
        {skills.map(([group, items]) => (
          <div key={group} className="grid gap-1 border-t border-line py-4 md:grid-cols-[220px_1fr] md:gap-12">
            <dt className="font-semibold">{group}</dt>
            <dd className="text-mute">{items}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

function Education() {
  return (
    <Section id="education" title="Education">
      <div className="grid gap-10 md:grid-cols-2">
        {education.map((e) => (
          <div key={e.school} className="border-t border-line pt-5">
            <p className="text-sm text-mute">{e.range}</p>
            <h3 className="mt-2 font-display text-xl font-bold">{e.school}</h3>
            <p className="mt-1 text-mute">{e.detail}</p>
            <p className="mt-1 text-sm font-medium">{e.note}</p>
          </div>
        ))}
      </div>
      <ul className="mt-10 flex flex-wrap gap-2" aria-label="Certifications">
        {certs.map((c) => (
          <li key={c} className="rounded-md border border-line px-3 py-1.5 text-sm text-mute">{c}</li>
        ))}
      </ul>
    </Section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = "mailto:" + links.email;
    }
  };
  return (
    <Section id="contact" title="Let's talk about a role">
      <p className="max-w-[56ch] text-lg leading-relaxed text-mute">
        I'm open to junior full-stack, .NET and React developer roles in Bangkok and can start immediately.
        Email is the fastest way to reach me; I'm also on WhatsApp and LINE at {links.phone}.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href={"mailto:" + links.email} className={primary}>Email {links.email}</a>
        <button onClick={copyEmail} className={ghost} aria-live="polite">
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? "Email copied" : "Copy email"}
        </button>
        <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className={ghost}><FaWhatsapp size={16} /> WhatsApp</a>
        <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className={ghost}><FaLinkedin size={16} /> LinkedIn</a>
        <a href={links.github} target="_blank" rel="noopener noreferrer" className={ghost}><FaGithub size={16} /> GitHub</a>
      </div>
    </Section>
  );
}

export default function Portfolio() {
  const [theme, setTheme] = useTheme();
  return (
    <>
      <a href="#projects" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-paper">
        Skip to projects
      </a>
      <Nav theme={theme} setTheme={setTheme} />
      <main>
        <Hero />
        <ProofStrip />
        <Projects />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
      <footer className="border-t border-line px-6 py-8 text-sm text-mute md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 md:flex-row">
          <p>&copy; {new Date().getFullYear()} Phone Myat Paing. Built with React and Tailwind CSS.</p>
          <a href="#top" className="font-medium text-accent">Back to top</a>
        </div>
      </footer>
    </>
  );
}
