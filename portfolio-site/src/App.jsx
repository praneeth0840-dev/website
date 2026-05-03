import { useState, useEffect, useRef } from "react";
import "./index.css";

const BOOKING_LINK = "https://calendly.com/venkatapraneeth-garikipati-edhec";
const LINKEDIN_URL  = "https://linkedin.com/in/gvpr";

const ROLES = ["All", "RevOps", "GTM Engineering", "Sales Operations", "Data & Automation"];

const ROLE_STYLE = {
  "RevOps":            { bg:"#FFF7ED", color:"#C2410C", dbg:"#431407", dc:"#FDBA74" },
  "GTM Engineering":   { bg:"#F0FDF4", color:"#15803D", dbg:"#052e16", dc:"#86EFAC" },
  "Sales Operations":  { bg:"#FAF5FF", color:"#7C3AED", dbg:"#2e1065", dc:"#C4B5FD" },
  "Data & Automation": { bg:"#EFF6FF", color:"#1D4ED8", dbg:"#1e3a5f", dc:"#93C5FD" },
};

const PROJECTS = [
  {
    id: 1,
    title: "Company news monitoring system",
    code: "NewsMonitor.gs",
    summary: "Automatic tracker that watches 1471 target companies for news, funding, and leadership changes, so the sales team always knows the right moment to reach out.",
    detail: {
      problem: "The sales team was spending hours every week manually Googling target accounts for news and signals. Outreach was often too late or based on stale information.",
      solution: "Built a fully automated news monitoring system in Google Apps Script that pulls RSS feeds from 1471 target accounts on a timed schedule, filters for relevant signals (funding rounds, leadership changes, product launches), and sends real-time alerts to the sales team, all without any third-party tools or subscription costs.",
      impact: [
        "1471 companies monitored automatically, every day",
        "Sales reps receive timely, relevant signals without any manual research",
        "Replaced a process that previously took 3+ hours per week per rep",
        "Zero third-party tool cost, built entirely on Google Apps Script",
      ],
      stack: ["Google Apps Script", "RSS Feeds", "HubSpot API", "Google Sheets", "Chained Triggers"],
    },
    roles: ["GTM Engineering", "Data & Automation"],
    tech: ["Google Apps Script", "RSS", "HubSpot API"],
    metric: "1471", metricLbl: "accounts tracked",
    co: "Deepki", yr: "2025–26", logo: "/Deepki.png",
  },
  {
    id: 2,
    title: "LinkedIn contact enrichment pipeline",
    code: "4-level fallback system",
    summary: "Automated system that finds and fills in missing contact details, job titles, emails, LinkedIn profiles, for hundreds of prospects at a time.",
    detail: {
      problem: "Prospecting was bottlenecked by incomplete contact data. Sales reps were manually searching LinkedIn for hours to build outreach lists, and the quality was inconsistent.",
      solution: "Engineered an enrichment pipeline using Apify to scrape LinkedIn profiles at scale, with a 4-level fallback query system that tries progressively broader searches to maximise data coverage. Enriched records are written directly into Google Sheets for immediate sales consumption.",
      impact: [
        "1470+ target accounts enriched automatically",
        "4-level fallback system maximises data coverage even for hard-to-find contacts",
        "Reduced manual prospecting research from hours to minutes",
        "Data written directly into Sheets with zero copy-paste by sales reps",
      ],
      stack: ["Apify", "Google Apps Script", "REST API", "Google Sheets", "LinkedIn"],
    },
    roles: ["GTM Engineering", "Data & Automation"],
    tech: ["Apify", "Google Apps Script", "LinkedIn"],
    metric: "4-level", metricLbl: "fallback coverage",
    co: "Deepki", yr: "2025–26", logo: "/Deepki.png",
  },
  {
    id: 3,
    title: "Lead-to-demo automation pipeline",
    code: "End-to-end booking flow",
    summary: "Connected all the marketing and sales tools so that when a lead comes in, it is automatically scored, assigned to the right rep, and moved through the pipeline with no manual steps.",
    detail: {
      problem: "Inbound leads were falling through the cracks. There was no consistent process for routing leads from form fill to booked demo. Reps were manually checking forms, leads were being missed, and response time was slow.",
      solution: "Designed an end-to-end pipeline connecting HubSpot forms, Salesforce CRM, Make automation, and Google Apps Script. Leads are automatically scored on entry, routed to the correct sales rep based on territory and ICP fit, enrolled in the right outreach sequence, and a Slack alert is sent, all within seconds of a form submission.",
      impact: [
        "Zero manual lead routing, fully automated from form fill to rep assignment",
        "Slack alerting ensures instant rep awareness of new inbound leads",
        "Consistent process applied to every lead with no exceptions or missed follow-ups",
        "Sequence enrollment automated based on lead score and segment",
      ],
      stack: ["HubSpot", "Salesforce", "Make (Integromat)", "Google Apps Script", "Slack API", "Lemlist"],
    },
    roles: ["RevOps", "GTM Engineering"],
    tech: ["HubSpot", "Salesforce", "Make", "Google Apps Script"],
    metric: "Full", metricLbl: "funnel automated",
    co: "Deepki", yr: "2025–26", logo: "/Deepki.png",
  },
  {
    id: 4,
    title: "Sales forecasting and slippage model",
    code: "98% forecast accuracy",
    summary: "A forecasting model that flags deals at risk of slipping before they actually slip, giving leadership time to act before month-end.",
    detail: {
      problem: "Sales forecasts were unreliable. Deals marked as closing this month were regularly slipping, and leadership only found out at the end of the quarter, too late to take corrective action.",
      solution: "Built a deal slippage tracker and forecasting model in Salesforce and Excel that monitors three risk signals for every deal: close date drift (how many times the date has been pushed), stage stagnation (how long a deal has sat in a stage without movement), and engagement signals (Gong call activity, email opens). Deals hitting risk thresholds are automatically flagged in the weekly leadership report.",
      impact: [
        "98% forecast accuracy achieved over the quarter",
        "At-risk deals flagged before month-end giving leadership time to intervene",
        "Identified a 45% regional growth disparity, directly prompting a QBR restructure",
        "Sales resources reallocated across territories based on the analysis",
      ],
      stack: ["Salesforce", "Advanced Excel", "Google Sheets", "Gong", "Tableau"],
    },
    roles: ["RevOps", "Sales Operations"],
    tech: ["Salesforce", "Excel", "Google Sheets", "Gong"],
    metric: "98%", metricLbl: "forecast accuracy",
    co: "Deepki", yr: "2025–26", logo: "/Deepki.png",
  },
  {
    id: 5,
    title: "Field marketing ROI analysis",
    code: "ROAS, CAC and lead quality",
    summary: "End-to-end ROI analysis on quarterly field events, covering what was spent, what leads came in, and which ones actually converted to pipeline.",
    detail: {
      problem: "The company was running quarterly field marketing events with no structured way to measure whether they were generating real pipeline or just spending budget. Leadership had no visibility into ROAS or lead quality by event.",
      solution: "Ran a full ROI analysis covering ROAS, CAC, and lead quality scoring for each event. Built a repeatable framework in Excel and Salesforce that can be run after every event, tracking spend by event, leads generated, MQL-to-SQL conversion rate, and pipeline influenced. Findings were presented at QBR with concrete reallocation recommendations.",
      impact: [
        "40% increase in qualified lead generation following budget reallocation",
        "Revealed which event formats and locations produced the highest-quality leads",
        "Framework now used as the standard post-event analysis template",
        "Directly influenced strategic decisions on which events to repeat vs cut",
      ],
      stack: ["Excel", "Salesforce", "HubSpot", "Tableau", "Google Sheets"],
    },
    roles: ["RevOps", "Sales Operations"],
    tech: ["Excel", "Salesforce", "HubSpot", "Tableau"],
    metric: "40%", metricLbl: "lead gen increase",
    co: "Deepki", yr: "2025–26", logo: "/Deepki.png",
  },
  {
    id: 6,
    title: "Weekly pipeline report automation",
    code: "Auto-generated PowerPoint",
    summary: "Eliminated 3 hours of weekly manual work by building a system that pulls Salesforce data and automatically generates a finished leadership PowerPoint.",
    detail: {
      problem: "Every Monday, someone on the team spent 3 hours manually pulling data from Salesforce, formatting it in Excel, and building slides for the leadership pipeline review. It was repetitive, error-prone, and the data was already stale by the time the deck was ready.",
      solution: "Built a Google Apps Script that pulls live data directly from Salesforce exports, processes it, and generates a fully formatted PowerPoint presentation using pptxgenjs with charts, tables, and commentary pre-filled. The script runs automatically every Monday morning. Leadership opens a finished, consistent deck without anyone touching it.",
      impact: [
        "3 hours of manual work eliminated every week",
        "Deck is ready before the Monday morning review, not during it",
        "Consistent formatting and data sourcing every time with no human error",
        "Reduced preparation time for QBR reporting by 3 hours per cycle",
      ],
      stack: ["pptxgenjs", "Google Apps Script", "Salesforce", "Google Sheets"],
    },
    roles: ["RevOps", "Data & Automation"],
    tech: ["pptxgenjs", "Salesforce", "Google Apps Script"],
    metric: "3hrs", metricLbl: "saved per week",
    co: "Deepki", yr: "2025–26", logo: "/Deepki.png",
  },
  {
    id: 7,
    title: "CRM data governance programme",
    code: "41% accuracy improvement",
    summary: "Full audit of HubSpot and Salesforce, finding and fixing 1,200+ duplicate or incomplete records, and building rules to keep data clean going forward.",
    detail: {
      problem: "The CRM data across both HubSpot and Salesforce was not completely reliable. Duplicate records, missing fields, and inconsistent naming were causing wrong lead assignments, broken automations, and inaccurate reports.",
      solution: "Ran a full audit across both CRMs, identifying duplicates, incomplete records, and broken field mappings. Enforced mandatory fields, built validation rules to prevent bad data at entry, ran deduplication campaigns, and set up a bi-directional sync between HubSpot and Salesforce to maintain a single source of truth.",
      impact: [
        "81% improvement in overall CRM data accuracy within 60 days",
        "1,200+ duplicate or incomplete records identified and resolved",
        "Mandatory field enforcement prevents bad data from entering at the source",
        "Tri-directional Gong, HubSpot, and Salesforce sync with one source of truth across all three",
      ],
      stack: ["Salesforce", "HubSpot", "n8n", "REST APIs", "Advanced Excel"],
    },
    roles: ["RevOps", "Sales Operations"],
    tech: ["Salesforce", "HubSpot", "n8n", "REST APIs"],
    metric: "41%", metricLbl: "data accuracy lift",
    co: "Deepki", yr: "2025–26", logo: "/Deepki.png",
  },
  {
    id: 8,
    title: "n8n and Zapier automation workflows",
    code: "10+ hrs/week saved",
    summary: "Series of automation workflows connecting Salesforce, HubSpot, Google Workspace, and AI tools, removing manual data work from the GTM team's plate.",
    detail: {
      problem: "GTM teams were spending 10+ hours a week on repetitive data tasks: copying records between tools, sending manual update emails, formatting reports, and chasing down data that should have been automatic.",
      solution: "Designed and deployed a suite of n8n and Zapier workflows integrating REST APIs and webhooks across the full GTM stack. Key workflows include automatic lead enrichment on entry, CRM-to-Slack notifications for key deal events, AI-powered record summarisation using Claude and Gemini APIs, and automated data sync between Google Workspace and both CRMs.",
      impact: [
        "10+ hours per week of manual data work eliminated across GTM teams",
        "AI agents deployed via Claude and Gemini APIs for intelligent workflow steps",
        "Real-time Slack notifications keep reps updated without checking the CRM",
        "Webhooks maintain live data sync with no manual exports or imports",
      ],
      stack: ["n8n", "REST APIs", "Webhooks", "Claude API", "Gemini API", "HubSpot", "Salesforce", "Google Workspace"],
    },
    roles: ["GTM Engineering", "Data & Automation"],
    tech: ["n8n", "Zapier", "Claude API", "REST APIs", "Webhooks"],
    metric: "10hrs+", metricLbl: "saved per week",
    co: "Deepki", yr: "2025–26", logo: "/Deepki.png",
  },
  {
    id: 9,
    title: "AI-powered job matching agent",
    code: "Personal automation project",
    summary: "Personal tool that scans 5 job boards daily and uses AI to score each role against my experience, turning a 3-hour daily search into a 5-minute review.",
    detail: {
      problem: "Job hunting across multiple platforms (LinkedIn, Welcome to the Jungle, Ashby, Greenhouse, Lever) was taking 2 to 3 hours daily. Most listings were irrelevant, and manually scoring fit against a CV is subjective and slow.",
      solution: "Built an autonomous scraping agent hosted on Railway that pulls new listings from 5 platforms daily, then passes each listing to the Claude API with my master CV as context. Claude scores each role on fit (skills match, seniority, location, language) and returns a ranked shortlist with a one-line rationale per role. Results populate a Google Sheet reviewed each morning.",
      impact: [
        "5 platforms scanned automatically every day",
        "AI scoring reduces 3 hours of manual review to a 5-minute shortlist check",
        "Fit scores calibrated against actual CV, not keyword matching",
        "Built entirely as a side project to solve a real personal problem",
      ],
      stack: ["Python", "Claude API (Anthropic)", "Railway", "Serper API", "Google Sheets", "Apify"],
    },
    roles: ["GTM Engineering", "Data & Automation"],
    tech: ["Python", "Claude API", "Railway", "Serper"],
    metric: "5", metricLbl: "platforms scanned",
    co: "Personal", yr: "2025",
  },
];

const EXPERIENCE = [
  {
    role: "Revenue Operations Specialist",
    type: "Contract",
    company: "Deepki",
    logo: "/Deepki.png",
    companyDesc: "ESG SaaS",
    period: "Aug 2025 – Present",
    location: "Paris, France",
    desc: "Deepki helps large companies measure and reduce their environmental impact across real estate portfolios. In this role I own the full revenue operations function: CRM administration across HubSpot and Salesforce, pipeline reporting, forecasting, automation, and all the systems that keep the sales team moving fast.",
    bullets: [
      "Built revenue dashboards tracking ARR, pipeline velocity, win rates, and CAC, used weekly by Sales and Marketing leadership",
      "Boosted forecasting accuracy to 98% with a slippage model flagging at-risk deals by close date drift and stage stagnation",
      "Uncovered a 45% regional growth disparity through data analysis, directly prompting a QBR restructure",
      "Improved CRM data accuracy by 21% across HubSpot and Salesforce through deduplication, validation rules, and governance",
      "Saved 10+ hours per week by automating data workflows across the GTM stack using n8n and Google Apps Script",
    ],
    tags: ["RevOps", "GTM Engineering", "Sales Operations"],
  },
  {
    role: "Sales and Growth Intern",
    type: "Contract",
    company: "Growth Student",
    companyDesc: "EdTech, Nice",
    period: "May 2024 – Sep 2024",
    location: "Nice, France",
    desc: "B2B EdTech company. Managed a pipeline of 150+ clients, produced weekly KPI reports for the CEO, and redesigned the sales process to improve conversion rates.",
    bullets: [
      "Managed B2B pipeline of 150+ clients, maintaining data hygiene and generating weekly KPI reports for the CEO",
      "Identified funnel drop-off stages and proposed sequence adjustments delivering a 30% increase in prospect response rates",
      "Reduced average sales cycle by 2 weeks by mapping the full process from outreach to close and removing friction points",
      "Collaborated with the CEO to refine ICP and pitch strategy",
    ],
    tags: ["Sales Operations", "RevOps"],
  },
];

const EDUCATION = [
  {
    degree: "Double Degree: Master in Management (Grande École) and MSc Strategy and Consulting",
    school: "EDHEC Business School, 4th Best Business School in France",
    period: "MiM: Sep 2022 – Jun 2023 · MSc: Sep 2024 – May 2025",
    location: "Lille / Paris, France",
    type: "Grande École · Double Degree",
    icon: "🎓",
    logo: "/EDHEC.png",
    highlights: [
      "1 of 2 recipients of the French Government and EDHEC co-financed merit scholarship, awarded out of 800 students",
      "Table tennis doubles champions at the EDHEC inter-school tournament",
      "A+ in Operations Management, Strategy and Business Models, and Financial Modelling and M&A",
      "Specialisation in go-to-market strategy, business operations, and consulting",
      "Post-study work permit eligible, legally authorised to work in France",
    ],
    tags: ["Strategy", "Consulting", "GTM", "Financial Modelling"],
  },
  {
    degree: "B.Eng Fashion Technology",
    school: "National Institute of Fashion Technology (NIFT), Chennai, 3rd Best Fashion Institute in India",
    period: "Graduated May 2021",
    location: "Chennai, India",
    type: "Bachelor",
    icon: "🏛️",
    logo: "/NIFT.png",
    highlights: [
      "GPA: 9.4 / 10",
      "Worked as Junior Merchandiser for U.S. Polo Assn and Arrow",
      "Industrial exposure with The North Face and PVH (Calvin Klein, Tommy Hilfiger)",
      "Analysed assembly line efficiency and inventory flow in live production environments",
    ],
    tags: ["Operations", "Process Analysis", "Industrial Engineering"],
  },
];

const STACK = {
  "CRM & Sales tools":  ["Salesforce (Admin)", "HubSpot (Super Admin)", "Gong", "Apollo.io", "LinkedIn Sales Nav"],
  "Automation":         ["n8n", "Google Apps Script", "Make", "Zapier", "REST APIs", "Webhooks"],
  "Data & Analytics":   ["Tableau", "Advanced Excel", "Google Sheets", "SQL (basic)", "Salesforce Reports"],
  "AI & Agents":        ["Claude (Anthropic)", "OpenAI", "Gemini", "AI workflow orchestration"],
  "Outbound tools":     ["Lemlist", "Apollo.io", "Apify", "Clay", "LinkedIn Sales Navigator"],
  "Infrastructure":     ["AWS", "Railway", "Google Cloud", "pptxgenjs"],
};

const ABOUT_HIGHLIGHTS = [
  { icon: "📊", text: "98% forecast accuracy and a 45% regional growth disparity uncovered at a €6M ARR SaaS company" },
  { icon: "🔧", text: "I build the systems — CRM architecture, automation pipelines, AI workflows — not just the strategy slides" },
  { icon: "🌍", text: "EDHEC-educated, French Government scholarship recipient, legally authorised to work in France" },
  { icon: "🤝", text: "Comfortable working across Sales, Marketing, and Tech — I translate between all three" },
];

// ─── ICONS ───────────────────────────────────────────────────────────────────
const SunIcon  = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;
const MoonIcon = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;
const CloseIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

// ─── COMPONENTS ──────────────────────────────────────────────────────────────
function Tag({ role, dark }) {
  const s = ROLE_STYLE[role] || { bg:"#F1F5F9", color:"#475569", dbg:"#1e293b", dc:"#94A3B8" };
  return <span style={{ background:dark?s.dbg:s.bg, color:dark?s.dc:s.color, padding:"3px 10px", borderRadius:99, fontSize:11, fontWeight:600 }}>{role}</span>;
}

const TECH_LOGOS = {
  "Salesforce (Admin)":      "/Salesforce.png",
  "HubSpot (Super Admin)":   "/Hubspot.png",
  "HubSpot":                 "/Hubspot.png",
  "Salesforce":              "/Salesforce.png",
  "Gong":                    "/Gong.png",
  "Apollo.io":               "/Apollo.png",
  "n8n":                     "/n8n.png",
  "Make":                    "/Make.png",
  "Zapier":                  "/Zapier.png",
  "Apify":                   "/Apify.png",
  "Tableau":                 "/Tableau.png",
  "Lemlist":                 "/Lemlist.png",
};

function TechTag({ label, dark }) {
  const domain = TECH_LOGOS[label];
  return (
    <span style={{ background:dark?"#1e293b":"#F8FAFC", color:dark?"#94A3B8":"#475569", border:`1px solid ${dark?"#334155":"#E2E8F0"}`, padding:"4px 10px", borderRadius:8, fontSize:11, fontWeight:500, display:"inline-flex", alignItems:"center", gap:6 }}>
      {domain && <img src={domain} width={16} height={16} style={{ borderRadius:3, objectFit:"contain" }} onError={e => { e.target.style.display="none"; }} />}
      {label}
    </span>
  );
}

function CompanyLogo({ domain, size = 18 }) {
  return (
    <img
      src={domain}
      width={size} height={size}
      style={{ borderRadius:4, objectFit:"contain" }}
      onError={e => { e.target.style.display="none"; }}
    />
  );
}

function ProjectModal({ p, dark, onClose }) {
  useEffect(() => {
    const handler = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-card${dark?" dark":""}`} onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><CloseIcon /></button>
        <div className="modal-header">
          <div>
            <p className="card-meta" style={{ marginBottom:6, display:"flex", alignItems:"center", gap:6 }}>
              {p.logo && <CompanyLogo domain={p.logo} size={20} />}
              {p.co} · {p.yr}
            </p>
            <h2 className="modal-title">{p.title}</h2>
            <p className="modal-code">{p.code}</p>
          </div>
          <div className={`metric-box${dark?" dark":""}`} style={{ flexShrink:0 }}>
            <div className="metric-val">{p.metric}</div>
            <div className="metric-lbl">{p.metricLbl}</div>
          </div>
        </div>
        <div className="modal-body">
          <div className="modal-section">
            <p className="modal-label">The problem</p>
            <p className="modal-text">{p.detail.problem}</p>
          </div>
          <div className="modal-section">
            <p className="modal-label">What I built</p>
            <p className="modal-text">{p.detail.solution}</p>
          </div>
          <div className="modal-section">
            <p className="modal-label">Results</p>
            <ul className="modal-bullets">
              {p.detail.impact.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
          <div className="modal-section">
            <p className="modal-label">Stack</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:8 }}>
              {p.detail.stack.map(t => <TechTag key={t} label={t} dark={dark} />)}
            </div>
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginTop:4 }}>
            {p.roles.map(r => <Tag key={r} role={r} dark={dark} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ p, dark, delay, onClick }) {
  return (
    <div className={`card${dark?" dark":""}`} style={{ animationDelay:`${delay}s`, cursor:"pointer" }} onClick={onClick}>
      <div style={{ display:"flex", justifyContent:"space-between", gap:10 }}>
        <div style={{ flex:1 }}>
          <p className="card-meta" style={{ display:"flex", alignItems:"center", gap:6 }}>
            {p.logo && <CompanyLogo domain={p.logo} size={20} />}
            {p.co} · {p.yr}
          </p>
          <h3 className="card-title">{p.title}</h3>
          <p className="card-code">{p.code}</p>
        </div>
        <div className={`metric-box${dark?" dark":""}`}>
          <div className="metric-val">{p.metric}</div>
          <div className="metric-lbl">{p.metricLbl}</div>
        </div>
      </div>
      <p className="card-desc">{p.summary}</p>
      <div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:6 }}>
          {p.roles.map(r => <Tag key={r} role={r} dark={dark} />)}
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
          {p.tech.map(t => <TechTag key={t} label={t} dark={dark} />)}
        </div>
      </div>
      <p className="card-cta">Click to read more →</p>
    </div>
  );
}

function BookingPopup({ onClose }) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-card" onClick={e => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>✕</button>
        <div className="popup-emoji">👋</div>
        <h2 className="popup-heading">Still exploring?</h2>
        <p className="popup-sub">There's a lot more to share. Tools built, problems solved, and lessons learned. If you're curious, let's have a quick chat.</p>
        <a href={BOOKING_LINK} target="_blank" rel="noreferrer" className="popup-btn" onClick={onClose}>Book a 20-min intro call →</a>
        <button className="popup-dismiss" onClick={onClose}>Maybe later</button>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeRole, setActiveRole]   = useState("All");
  const [dark, setDark]               = useState(false);
  const [showPopup, setShowPopup]     = useState(false);
  const [openProject, setOpenProject] = useState(null);
  const popupFired = useRef(false);

  useEffect(() => {
    try { if (localStorage.getItem("pf-dark") === "1") setDark(true); } catch {}
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      if (!popupFired.current) { popupFired.current = true; setShowPopup(true); }
    }, 120000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.body.style.overflow = openProject ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [openProject]);

  const toggleDark = () => setDark(d => {
    try { localStorage.setItem("pf-dark", d ? "0" : "1"); } catch {}
    return !d;
  });

  const openProjectById = (id) => setOpenProject(PROJECTS.find(p => p.id === id));

  const filtered = activeRole === "All" ? PROJECTS : PROJECTS.filter(p => p.roles.includes(activeRole));

  const linkStyle = {
    color: "#3B82F6",
    cursor: "pointer",
    textDecoration: "underline",
    textUnderlineOffset: "3px",
    fontWeight: 500,
    background: "none",
    border: "none",
    padding: 0,
    font: "inherit",
    fontSize: "inherit",
  };

  return (
    <div className={`pf${dark?" dark":""}`}>
      {showPopup && <BookingPopup onClose={() => setShowPopup(false)} />}
      {openProject && <ProjectModal p={openProject} dark={dark} onClose={() => setOpenProject(null)} />}

      {/* NAV */}
      <nav className={`nav${dark?" dark":""}`}>
        <div className="nav-inner">
          <span className="nav-logo" style={{ fontSize:"29px" }}>Praneeth<span style={{ color:"#3B82F6" }}>.</span></span>
          <div className="nav-links">
            {["about","projects","experience","education","stack"].map(s => (
              <a key={s} href={`#${s}`}>{s.charAt(0).toUpperCase()+s.slice(1)}</a>
            ))}
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="nav-linkedin">LinkedIn</a>
            <button className="dark-toggle" onClick={toggleDark} aria-label="Toggle dark mode">
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="badge"><span className="dot" /> Open to work</div>
        <h1>Revenue Ops<br />&amp; <span>GTM Engineering</span></h1>
        <p className="hero-sub">
          I build the systems, automations, and dashboards that help B2B SaaS sales teams move faster,
          from CRM architecture and pipeline reporting to AI-powered workflows and lead generation infrastructure.
        </p>
        <div className="btn-row">
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="btn-primary">View LinkedIn →</a>
          <a href="#about" className="btn-sec">About me</a>
          <a href="#projects" className="btn-ghost">See my work ↓</a>
        </div>
        <div className="stats">
          {[
            { val:"98%",    lbl:"Forecast accuracy achieved" },
            { val:"1471",   lbl:"Accounts auto-monitored" },
            { val:"14hrs+", lbl:"Saved per week via automations" },
            { val:"81%",    lbl:"CRM data accuracy improvement" },
          ].map(s => (
            <div key={s.val} className="stat">
              <div className="stat-val">{s.val}</div>
              <div className="stat-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about-section">
        <div className="about-inner">
          <div className="about-text">
            <p className="about-label">About me</p>
            <h2 style={{ marginBottom:16 }}>The person behind the pipelines</h2>

            {/* Headshot */}
            <div style={{ marginBottom:20 }}>
              <img
                src="/praneeth.jpg"
                alt="Praneeth Garikipati"
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid #E2E8F0",
                }}
              />
            </div>

            <p className="about-para">
              I am genuinely bothered by inefficiency. If I do something manually twice, I am already
              designing the system that makes it automatic the third time. I notice things nobody asked
              me to notice, like a{" "}
              <button style={linkStyle} onClick={() => openProjectById(6)}>
                reporting process eating three hours every week
              </button>
              {" "}that nobody has thought to question, and I come back with a fix before the problem has even been named.
            </p>
            <p className="about-para">
              The curiosity always came before the tools. I did not learn{" "}
              <button style={linkStyle} onClick={() => openProjectById(1)}>
                Google Apps Script
              </button>
              {" "}because someone put it in a job description. I learned it because I had a problem in
              front of me and that was the fastest path to solving it. I do not announce what I am
              working on. I just show up with the thing done.
            </p>
          </div>
          <div className="about-highlights">
            {ABOUT_HIGHLIGHTS.map((h, i) => (
              <div key={i} className="highlight-item">
                <span className="highlight-icon">{h.icon}</span>
                <p className="highlight-text">{h.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="section">
        <div className="sec-header">
          <div>
            <h2>What I've built</h2>
            <p className="sec-sub">Click any project to read the full story, problem, solution, and results</p>
          </div>
          <div className="filters">
            {ROLES.map(r => (
              <button key={r} className={`pill${activeRole===r?" active":""}`} onClick={() => setActiveRole(r)}>{r}</button>
            ))}
          </div>
        </div>
        <div className="grid">
          {filtered.map((p,i) => (
            <ProjectCard key={p.id} p={p} dark={dark} delay={i*0.04} onClick={() => setOpenProject(p)} />
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="exp-section">
        <div className="exp-inner">
          <h2>Experience</h2>
          {EXPERIENCE.map((e,i) => (
            <div key={i} className="exp-item">
              <div>
                <p className="exp-period">{e.period}</p>
                <p className="exp-loc">{e.location}</p>
                <p className="exp-loc" style={{ marginTop:4, color:"#3B82F6", fontWeight:600 }}>{e.companyDesc}</p>
              </div>
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                  <h3 className="exp-role">{e.role}</h3>
                  <span className="exp-type">{e.type}</span>
                </div>
                <p className="exp-co" style={{ display:"flex", alignItems:"center", gap:8 }}>
                  {e.logo && <CompanyLogo domain={e.logo} size={24} />}
                  {e.company}
                </p>
                <p className="exp-desc" style={{ marginBottom:12 }}>{e.desc}</p>
                <ul className="exp-bullets">
                  {e.bullets.map((b,j) => <li key={j}>{b}</li>)}
                </ul>
                <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginTop:14 }}>
                  {e.tags.map(t => <Tag key={t} role={t} dark={dark} />)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="edu-section">
        <div className="edu-inner">
          <h2>Education</h2>
          <div className="edu-grid">
            {EDUCATION.map((e,i) => (
              <div key={i} className="edu-card">
                <div className="edu-card-top">
                  <div className="edu-icon-wrap"><span className="edu-icon">{e.icon}</span></div>
                  <div>
                    <span className="exp-type">{e.type}</span>
                    <p className="exp-period" style={{ marginTop:6 }}>{e.period}</p>
                    <p className="exp-loc">{e.location}</p>
                  </div>
                </div>
                <h3 className="exp-role" style={{ fontSize:18, marginBottom:4 }}>{e.degree}</h3>
                <p className="exp-co" style={{ display:"flex", alignItems:"center", gap:8 }}>
                  {e.logo && <CompanyLogo domain={e.logo} size={24} />}
                  {e.school}
                </p>
                <ul className="edu-highlights">
                  {e.highlights.map((h,j) => <li key={j}>{h}</li>)}
                </ul>
                <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginTop:16 }}>
                  {e.tags.map(t => <Tag key={t} role={t} dark={dark} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STACK */}
      <section id="stack" className="stack-section">
        <div className="stack-inner">
          <h2>Tools I work with</h2>
          <div className="stack-grid">
            {Object.entries(STACK).map(([cat, tools]) => (
              <div key={cat} className="stack-card">
                <p className="stack-cat">{cat}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  {tools.map(t => <TechTag key={t} label={t} dark={dark} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact">
        <h2>Let's talk.</h2>
        <p>
          I'm open to RevOps, GTM Engineering, Business Analyst, and CRM Admin roles at
          English-first B2B SaaS companies in Paris. If something on this page caught your eye,
          I'd love 20 minutes to tell you more.
        </p>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:16 }}>
          <a href={BOOKING_LINK} target="_blank" rel="noreferrer" className="contact-btn-primary">
            Book a 20-min intro call →
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="contact-btn-sec">
            LinkedIn
          </a>
        </div>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <a href="/resume-revops.pdf" download className="contact-btn-sec" style={{ display:"inline-flex", alignItems:"center", gap:6 }}>
            ↓ Download CV — Revenue Operations
          </a>
          <a href="/resume-gtm.pdf" download className="contact-btn-sec" style={{ display:"inline-flex", alignItems:"center", gap:6 }}>
            ↓ Download CV — GTM Engineering
          </a>
        </div>
      </section>

      <footer className="footer">
        <div style={{ display:"flex", flexDirection:"column", gap:4, alignItems:"center" }}>
          <span>Praneeth Garikipati · Revenue Operations &amp; GTM Engineering · Paris 2025</span>
          <span style={{ color:"#CBD5E1", fontSize:11 }}>This website was designed and built in under 20 minutes using Claude.</span>
        </div>
      </footer>
    </div>
  );
}
