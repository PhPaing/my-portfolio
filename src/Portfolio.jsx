import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, ChevronRight, Copy, Download, MapPin, Menu, Moon, Sun, X } from "lucide-react";
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

const btn = "group inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-[0.97]";
const tag = "rounded-md border border-line bg-panel px-2.5 py-1 font-mono text-xs text-mute transition-colors hover:border-accent hover:text-ink";
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

function useReveal() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); obs.disconnect(); }
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, "reveal" + (seen ? " in" : "")];
}

function Reveal({ as: Tag = "div", delay = 0, className = "", children }) {
  const [ref, cls] = useReveal();
  return <Tag ref={ref} style={{ "--d": delay + "ms" }} className={cls + " " + className}>{children}</Tag>;
}

function Section({ id, title, note, reveal = true, children }) {
  return (
    <section id={id} className="mx-auto grid max-w-6xl gap-8 border-t border-line px-6 py-16 md:grid-cols-[200px_1fr] md:gap-14 md:px-10 md:py-24">
      <Reveal as="header" className="md:sticky md:top-24 md:self-start">
        <h2 className="font-display text-2xl font-semibold tracking-tight">{title}</h2>
        {note && <p className="mt-2 text-sm text-mute">{note}</p>}
      </Reveal>
      {reveal ? <Reveal delay={80}>{children}</Reveal> : <div>{children}</div>}
    </section>
  );
}

function Nav({ theme, setTheme }) {
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const bar = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur">
      <div ref={bar} className="absolute -bottom-px left-0 h-0.5 w-full origin-left scale-x-0 bg-accent" aria-hidden="true" />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-10">
        <a href="#top" className="flex items-center gap-2.5 font-semibold tracking-tight"><span className="flex h-7 w-7 items-center justify-center rounded-md bg-ink font-mono text-[11px] text-paper" aria-hidden="true">PM</span>Phone Myat Paing</a>
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
          <a href={resume} download="Phone_Myat_Paing_Resume.pdf" className="hidden items-center gap-1.5 rounded-lg bg-ink px-3 py-2 text-sm font-semibold text-paper hover:opacity-90 sm:inline-flex"><Download size={14} /> Resume</a>
          <button
            onClick={() => {
              const root = document.documentElement;
              root.classList.add("theme-anim");
              setTimeout(() => root.classList.remove("theme-anim"), 400);
              setTheme(theme === "dark" ? "light" : "dark");
            }}
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
      <div className={"grid transition-[grid-template-rows] duration-300 ease-out md:hidden " + (open ? "grid-rows-[1fr] border-t border-line" : "grid-rows-[0fr]")}>
        <nav aria-label="Mobile" inert={!open} className="flex flex-col overflow-hidden px-6">
          {NAV.map(([id, label]) => (
            <a key={id} href={"#" + id} onClick={() => setOpen(false)} className="py-3 text-sm font-medium text-mute">
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function ApiCard() {
  const entries = Object.entries(candidate);
  const fmt = (v) => JSON.stringify(v).replace(/","/g, '", "');
  return (
    <figure
      className="overflow-hidden rounded-2xl border border-line bg-panel shadow-[0_20px_50px_-30px_color-mix(in_srgb,var(--accent)_60%,transparent)]"
      aria-label="Profile summary shown as a JSON API response"
    >
      <figcaption className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 font-mono text-xs text-mute">
        <span className="truncate"><span className="font-semibold text-accent">GET</span> /api/candidates/phone-myat-paing</span>
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
    <section id="top" className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-12 pt-14 md:grid-cols-[1.15fr_1fr] md:px-10 md:pb-16 md:pt-24">
      <div className="hero-grid pointer-events-none absolute inset-x-0 -top-16 -z-10 h-[34rem]" aria-hidden="true" />
      <div>
        <div className="rise mb-6 flex items-center gap-3" style={{ "--i": 0 }}>
          <img src={portrait} alt="Portrait of Phone Myat Paing" width="48" height="48" className="h-12 w-12 rounded-full border border-line object-cover" />
          <p className="flex items-center gap-2 text-sm font-medium text-mute">
            <span className="h-2 w-2 rounded-full bg-ok" aria-hidden="true" />
            Open to work in Bangkok, available immediately
          </p>
        </div>
        <h1 style={{ "--i": 1 }} className="rise font-display text-4xl font-semibold leading-[1.04] tracking-[-0.035em] sm:text-5xl lg:text-[3.6rem]">
          I build Laravel and ASP.NET Core back ends with React front ends.
        </h1>
        <p style={{ "--i": 2 }} className="rise mt-5 flex items-center gap-1.5 font-mono text-sm text-mute"><MapPin size={14} aria-hidden="true" />{candidate.location}<span className="caret text-accent" aria-hidden="true">_</span></p>
        <p style={{ "--i": 3 }} className="rise mt-5 max-w-[60ch] text-lg leading-relaxed text-mute">
          I'm Phone Myat Paing, a full-stack developer with a B.Sc. in IT (Software Engineering) from Stamford.
          After a five-month internship at Bangkok Glass building React and TypeScript pages on ASP.NET Core APIs,
          I built and deployed a Laravel app on Ubuntu with Nginx and MySQL. I'm looking for an full-stack, Laravel, .NET or React role.
        </p>
        <div style={{ "--i": 4 }} className="rise mt-8 flex flex-wrap items-center gap-3">
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
    <Reveal className="mx-auto max-w-6xl px-6 md:px-10">
      <dl className="grid divide-y divide-line overflow-hidden rounded-2xl border border-line bg-panel sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {proof.map(([n, label]) => (
          <div key={n} className="px-6 py-6">
            <dt className="font-display text-3xl font-semibold tracking-tight">{n}</dt>
            <dd className="mt-1 text-sm text-mute">{label}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}

function Projects() {
  return (
    <Section id="projects" reveal={false} title="Projects" note="4 projects with source on GitHub, 2 with live demos.">
      <div className="space-y-6">
        {projects.map((p) => (
          <Reveal key={p.title}>
          <article className="rounded-2xl border border-line bg-panel p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_24px_40px_-28px_var(--accent)] md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <h3 className="font-display text-2xl font-semibold tracking-tight">{p.title}</h3>
              <div className="flex flex-wrap gap-2">
                {p.live && (
                  <a href={p.live} target="_blank" rel="noopener noreferrer" className={`${btn} bg-accent text-paper hover:opacity-90`}>
                    Live demo <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                )}
                <a href={p.code} target="_blank" rel="noopener noreferrer" className={`${btn} border border-line hover:border-accent`}>
                  <FaGithub size={15} /> Source
                </a>
              </div>
            </div>
            <p className="mt-3 max-w-[64ch] text-mute">{p.summary}</p>
            <ol aria-label="Architecture" className="mt-5 flex flex-wrap items-center gap-y-2 rounded-lg bg-paper px-3 py-2.5 font-mono text-xs">
              {p.flow.map((n, i) => (
                <li key={n} className="flex items-center">
                  {i > 0 && <ChevronRight size={14} className="mx-1 text-accent" aria-hidden="true" />}
                  {n}
                </li>
              ))}
            </ol>
            <ul className="mt-5 max-w-[66ch] space-y-2 text-[15px] leading-relaxed">
              {p.points.map((pt) => (
                <li key={pt} className="flex gap-3">
                  <span className="mt-[0.75em] h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                  {pt}
                </li>
              ))}
            </ul>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies used">
              {p.tags.map((t) => <li key={t} className={tag}>{t}</li>)}
            </ul>
          </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" title="Experience" note={experience.dates}>
      <div className="rounded-2xl border border-line bg-panel p-6 md:p-8">
        <h3 className="font-display text-xl font-semibold tracking-tight">{experience.role}</h3>
        <p className="mt-1 text-mute">{experience.company}</p>
        <p className="mt-3 inline-block rounded-md bg-paper px-2.5 py-1 font-mono text-xs">{experience.project}</p>
        <ul className="mt-6 max-w-[68ch] space-y-3 text-[15px] leading-relaxed">
          {experience.duties.map((d) => (
            <li key={d} className="flex gap-3">
              <Check size={16} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
              {d}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" title="Skills" note="Grouped by what I use them for.">
      <dl>
        {skills.map(([group, items]) => (
          <div key={group} className="grid gap-3 border-b border-line py-5 first:pt-0 md:grid-cols-[180px_1fr] md:gap-8">
            <dt className="text-sm font-semibold">{group}</dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
                {items.split(", ").map((s) => <li key={s} className={tag}>{s}</li>)}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

function Education() {
  return (
    <Section id="education" title="Education">
      <div className="grid gap-6 md:grid-cols-2">
        {education.map((e) => (
          <div key={e.school} className="rounded-2xl border border-line bg-panel p-6">
            <p className="font-mono text-xs text-mute">{e.range}</p>
            <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">{e.school}</h3>
            <p className="mt-1 text-mute">{e.detail}</p>
            <p className="mt-2 text-sm font-medium text-accent">{e.note}</p>
          </div>
        ))}
      </div>
      <ul className="mt-8 flex flex-wrap gap-2" aria-label="Certifications">
        {certs.map((c) => <li key={c} className={tag}>{c}</li>)}
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
    <Section id="contact" title="Contact" note="Email is the fastest way to reach me.">
      <div className="rounded-2xl border border-line bg-panel p-6 md:p-10">
      <h3 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">Let's talk about a role</h3>
      <p className="mt-4 max-w-[56ch] text-lg leading-relaxed text-mute">
        I'm open to full-stack, Laravel, .NET and React developer roles in Bangkok and can start immediately.
        I'm also on WhatsApp and LINE at {links.phone}.
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
          <p>&copy; {new Date().getFullYear()} Phone Myat Paing. Built with React, Vite and Tailwind CSS.</p>
          <a href="#top" className="font-medium text-accent">Back to top</a>
        </div>
      </footer>
    </>
  );
}
