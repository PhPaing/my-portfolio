// All site content lives here. Edit this file; the layout in Portfolio.jsx stays untouched.

export const links = {
  email: "phonemyatp27@gmail.com",
  phone: "+66 95 819 9409",
  whatsapp: "https://wa.me/66958199409",
  linkedin: "https://www.linkedin.com/in/phone-myat-paing-572707386/",
  github: "https://github.com/PhPaing",
};

// Shown in the hero as a JSON "API response".
export const candidate = {
  name: "Phone Myat Paing",
  role: "Full-stack developer",
  location: "Bangkok, Thailand",
  stack: ["React", "TypeScript", "ASP.NET Core", "C#", "SQL Server"],
  education: "B.Sc. IT (Software Engineering)",
  languages: ["English (fluent)", "Burmese (native)"],
  seeking: ["Junior full-stack", ".NET", "React"],
  visa: "Open to Non-B visa sponsorship",
  availability: "Immediately",
};

export const proof = [
  ["5 months", "developer internship at Bangkok Glass"],
  ["10+ components", "built for a 7-page customer-facing site"],
  ["3 projects", "with source on GitHub, 2 with live demos"],
];

export const projects = [
  {
    title: "MovieTracker",
    summary: "A full-stack movie watchlist with its own authenticated API and a React client.",
    points: [
      "ASP.NET Core Web API with JWT authentication and EF Core migrations on SQL Server",
      "Background service imports from the TMDB API every 24 hours and updates records without duplicates",
      "React front end with search, genre filter, sorting, server-side pagination, personal lists with ratings and notes, and a top-genres stats chart",
    ],
    tags: ["ASP.NET Core", "C#", "SQL Server", "EF Core", "React.js", "JWT"],
    code: "https://github.com/PhPaing/Movie-Tracker",
  },
  {
    title: "RepairQueue",
    summary: "A bilingual (Thai/English) condo maintenance tracker with a resident view and an admin dashboard.",
    points: [
      "Live queue tracking for residents",
      "Admin dashboard to assign technicians and update ticket status",
      "State managed with React Context, data persisted in local storage, deployed on Netlify",
    ],
    tags: ["React.js", "TypeScript", "Vite", "Tailwind CSS", "Context API"],
    code: "https://github.com/PhPaing/repairqueue",
    live: "https://repairqueue.netlify.app",
  },
  {
    title: "BG Pathum United FC website",
    summary: "A responsive football club website, also the project I worked on during my internship.",
    points: [
      "Match schedules, news, player information, standings and video content",
      "Reusable React.js components and responsive UI with TypeScript and Tailwind CSS",
      "YouTube API and Football Data API for dynamic video and match data",
    ],
    tags: ["React.js", "TypeScript", "Tailwind CSS", "REST APIs"],
    code: "https://github.com/PhPaing/bg-pathum-united-website",
    live: "https://bg-pathum-united-website.vercel.app",
  },
];

export const experience = {
  role: "Software Developer Intern",
  company: "Bangkok Glass Public Company Limited, Bangkok",
  dates: "Nov 2025 to Mar 2026",
  project: "BG Pathum United FC website redesign (customer-facing)",
  duties: [
    "Built 10+ reusable React.js and TypeScript components with Tailwind CSS, used across 7 pages of the redesigned customer-facing website",
    "Implemented client-side routing with React Router and responsive layouts using Vite",
    "Built the front end for an AI chat assistant that connects to an AI chatbot service through its API",
    "Integrated the front end with ASP.NET Core REST APIs, handling JSON requests and responses",
    "Assessed REST endpoints using Postman and Swagger UI and reported integration and data issues to backend developers",
    "Used Git/GitHub for version control and validated features before deployment",
  ],
};

export const skills = [
  ["Languages", "TypeScript, JavaScript, C#, Java"],
  ["Front end", "React.js, HTML5, CSS3, Tailwind CSS"],
  ["API and back end", "ASP.NET Core Web API, EF Core, REST APIs, JWT, JSON"],
  ["Databases", "SQL Server, MySQL, SQLite"],
  ["Tools", "Git, GitHub, Postman, Swagger UI, Visual Studio, VS Code"],
  ["Practices", "REST API integration, relational database design, responsive UI, API testing, client-side routing"],
];

export const education = [
  { range: "2023 to 2026", school: "Stamford International University", detail: "B.Sc. Information Technology (Software Engineering)", note: "GPA 3.35" },
  { range: "2019 to 2022", school: "Youth International University", detail: "Diploma in Computing, Pearson BTEC Level 5 (UK)", note: "Merit" },
];

export const certs = [
  "Responsive Web Design (freeCodeCamp)",
  "JavaScript Algorithms and Data Structures (freeCodeCamp)",
  "Cloud-Based Web Development (Stamford)",
];
