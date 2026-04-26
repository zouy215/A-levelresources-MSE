import { useState, useEffect } from "react";

const ADMIN_USER = "OliverChow";
const ADMIN_PASS = "CQzy0215!";

const examInfo = {
  dates: [
    { session: "May/June 2025 – Papers Begin", date: "5 May 2025", note: "First written papers commence" },
    { session: "May/June 2025 – Papers End", date: "18 June 2025", note: "Last written papers conclude" },
    { session: "Oct/Nov 2025 – Papers Begin", date: "6 October 2025", note: "First written papers commence" },
    { session: "Oct/Nov 2025 – Papers End", date: "14 November 2025", note: "Last written papers conclude" },
    { session: "May/June 2026 – Papers Begin", date: "4 May 2026", note: "First written papers commence" },
    { session: "May/June 2026 – Papers End", date: "17 June 2026", note: "Last written papers conclude" },
  ],
  locations: [
    { city: "北京 Beijing", region: "华北 North China", centres: ["British School of Beijing", "Beijing BISS International School", "Dulwich College Beijing"] },
    { city: "上海 Shanghai", region: "华东 East China", centres: ["Shanghai American School", "Concordia International School", "Yew Chung International School"] },
    { city: "广州 Guangzhou", region: "华南 South China", centres: ["Guangzhou Nanhu International School", "Clifford School", "Utahloy International School"] },
    { city: "深圳 Shenzhen", region: "华南 South China", centres: ["Shekou International School", "Shenzhen College of International Education", "BASIS International School Shenzhen"] },
    { city: "成都 Chengdu", region: "西南 Southwest", centres: ["Chengdu No.7 High School International Department", "BASIS International School Chengdu"] },
    { city: "杭州 Hangzhou", region: "华东 East China", centres: ["Hangzhou Foreign Languages School IB Center", "Dipont Education Hangzhou"] },
    { city: "武汉 Wuhan", region: "华中 Central China", centres: ["Wuhan Britain-China School", "Maple Leaf International School Wuhan"] },
    { city: "重庆 Chongqing", region: "西南 Southwest", centres: ["Chongqing Liangjiang Yucai Secondary School", "Dipont Huamei International School"] },
  ],
  format: [
    { aspect: "Examining Body", detail: "Cambridge Assessment International Education (CAIE)" },
    { aspect: "Language of Assessment", detail: "English (all components)" },
    { aspect: "Grading Scale", detail: "A* · A · B · C · D · E · U" },
    { aspect: "Coursework / Practical", detail: "Select subjects include internally assessed coursework submitted before the exam window" },
    { aspect: "Script Marking", detail: "All papers are marked centrally by CAIE examiners; re-marks available on request" },
    { aspect: "Results Release", detail: "August (May/June session)  ·  January (Oct/Nov session)" },
    { aspect: "Registration Deadline", detail: "Typically 6 months before the exam session — confirm with your registered centre" },
    { aspect: "Permitted Calculators", detail: "Scientific calculators permitted in most Maths and Science papers; check individual syllabuses" },
  ]
};

const subjects = {
  mathematics: {
    label: "Mathematics", code: "9709", color: "#0d4f3c", light: "#e6f4ef", accent: "#22c55e", icon: "∑",
    examFormat: [
      { paper: "Paper 1 – Pure Mathematics 1", duration: "1h 45m", marks: 75, weight: "~30%", type: "Written", questions: "10–12 structured questions; mix of short-answer and multi-part problems" },
      { paper: "Paper 2 – Pure Mathematics 2", duration: "1h 15m", marks: 50, weight: "~20%", type: "Written", questions: "6–8 structured questions covering logs, trigonometry identities, calculus" },
      { paper: "Paper 3 – Pure Mathematics 3", duration: "1h 45m", marks: 75, weight: "~30%", type: "Written", questions: "10–12 questions including complex numbers, vectors, differential equations" },
      { paper: "Paper 4 – Mechanics", duration: "1h 15m", marks: 50, weight: "~20%", type: "Written", questions: "6–8 questions on forces, kinematics, Newton's laws, energy and power" },
      { paper: "Paper 5 – Probability & Statistics 1", duration: "1h 15m", marks: 50, weight: "~20%", type: "Written", questions: "6–8 questions on data, probability, distributions" },
      { paper: "Paper 6 – Probability & Statistics 2", duration: "1h 15m", marks: 50, weight: "~20%", type: "Written", questions: "6–8 questions; hypothesis testing, Poisson, Normal distribution" },
    ],
    syllabus: [
      { topic: "Pure Mathematics 1", subtopics: ["Quadratics & Functions", "Coordinate Geometry", "Circular Measure", "Trigonometry", "Sequences & Series", "Differentiation", "Integration", "Vectors"] },
      { topic: "Pure Mathematics 2 & 3", subtopics: ["Polynomials & Logarithms", "Trigonometric Identities", "Advanced Differentiation", "Advanced Integration", "Numerical Methods", "Differential Equations", "Complex Numbers (P3 only)", "3D Vectors (P3 only)"] },
      { topic: "Mechanics", subtopics: ["Forces & Equilibrium", "Kinematics in 1D & 2D", "Newton's Laws of Motion", "Energy, Work & Power", "Momentum & Impulse"] },
      { topic: "Probability & Statistics", subtopics: ["Representation of Data", "Permutations & Combinations", "Probability", "Discrete Random Variables", "Normal Distribution", "Hypothesis Testing", "Poisson Distribution (S2)"] },
    ],
    questionTypes: ["Structured multi-part questions (majority of marks)", "Formal proof questions", "Graph sketching and interpretation", "Numerical computation with method shown", "'Show that' and 'Hence deduce' questions", "Real-world modelling and application problems"],
    resources: [
      { id: 1, title: "Integration by Parts – Complete Guide", type: "PDF", source: "Open Textbook", size: "2.1 MB", approved: true, downloads: 342, tags: ["Integration", "P2/P3"] },
      { id: 2, title: "Coordinate Geometry Practice Set", type: "PDF", source: "Community Upload", size: "890 KB", approved: true, downloads: 218, tags: ["Geometry", "P1"] },
      { id: 3, title: "Differentiation Rules Cheatsheet", type: "PDF", source: "Open Textbook", size: "450 KB", approved: true, downloads: 589, tags: ["Differentiation", "P1"] },
      { id: 4, title: "Numerical Methods Worked Examples", type: "PDF", source: "Community Upload", size: "1.3 MB", approved: false, downloads: 0, tags: ["Numerical", "P2"] },
    ]
  },
  statistics: {
    label: "Statistics", code: "9709", color: "#0f2d5c", light: "#e8eef8", accent: "#3b82f6", icon: "μ",
    examFormat: [
      { paper: "Paper 5 – Probability & Statistics 1", duration: "1h 15m", marks: 50, weight: "50%", type: "Written", questions: "6–8 structured questions on data representation, probability, and distributions" },
      { paper: "Paper 6 – Probability & Statistics 2", duration: "1h 15m", marks: 50, weight: "50%", type: "Written", questions: "6–8 questions on hypothesis testing, Poisson, Normal and approximations" },
    ],
    syllabus: [
      { topic: "Representation of Data", subtopics: ["Stem-and-leaf diagrams", "Box-and-whisker plots", "Histograms & frequency polygons", "Measures of central tendency", "Variance & standard deviation"] },
      { topic: "Probability", subtopics: ["Sample space diagrams", "Conditional probability", "Venn diagrams", "Tree diagrams", "Independence & mutual exclusivity"] },
      { topic: "Statistical Distributions", subtopics: ["Binomial distribution", "Normal distribution", "Poisson distribution", "Continuity corrections", "Distribution approximations"] },
      { topic: "Hypothesis Testing", subtopics: ["Null & alternative hypotheses", "One-tail & two-tail tests", "Critical regions", "p-values", "Type I & Type II errors"] },
      { topic: "Correlation & Regression", subtopics: ["Scatter diagrams", "Product moment correlation coefficient", "Regression lines (LSRL)", "Interpolation vs extrapolation"] },
    ],
    questionTypes: ["Data-reading and calculation questions", "Probability tree construction", "Distribution identification and parameter use", "Full hypothesis test write-ups (structured method)", "Critical region determination problems", "Context-based interpretation questions"],
    resources: [
      { id: 5, title: "Normal Distribution Tables & Notes", type: "PDF", source: "Open Textbook", size: "1.8 MB", approved: true, downloads: 401, tags: ["Normal Dist.", "S1"] },
      { id: 6, title: "Hypothesis Testing Step-by-Step", type: "PDF", source: "Community Upload", size: "720 KB", approved: true, downloads: 265, tags: ["Hypothesis", "S2"] },
      { id: 7, title: "Probability Tree Diagrams Worksheet", type: "PDF", source: "Community Upload", size: "560 KB", approved: true, downloads: 187, tags: ["Probability", "S1"] },
    ]
  },
  economics: {
    label: "Economics", code: "9708", color: "#4a1800", light: "#fdf0e8", accent: "#f97316", icon: "$",
    examFormat: [
      { paper: "Paper 1 – Multiple Choice (AS)", duration: "1h", marks: 30, weight: "15%", type: "MCQ", questions: "30 multiple-choice questions on AS Level microeconomics and macroeconomics" },
      { paper: "Paper 2 – Data Response & Essays (AS)", duration: "2h", marks: 60, weight: "25%", type: "Written", questions: "Section A: compulsory data response; Section B: choose 1 of 2 essays (25 marks)" },
      { paper: "Paper 3 – Multiple Choice (A Level)", duration: "1h", marks: 30, weight: "15%", type: "MCQ", questions: "30 multiple-choice questions on full A Level content" },
      { paper: "Paper 4 – Data Response & Essays (A Level)", duration: "2h 15m", marks: 70, weight: "45%", type: "Written", questions: "Section A: compulsory data response; Section B & C: one essay each" },
    ],
    syllabus: [
      { topic: "Microeconomics", subtopics: ["Supply & demand analysis", "Price, income & cross elasticities", "Consumer & producer surplus", "Market structures (perfect competition, monopoly, oligopoly, monopolistic competition)", "Labour markets & wage determination", "Market failure & externalities", "Government intervention & cost-benefit analysis"] },
      { topic: "Macroeconomics", subtopics: ["National income accounting (GDP, GNP)", "AD/AS model", "Unemployment types & measures", "Inflation, deflation & stagflation", "Economic growth & the business cycle", "Balance of payments", "Exchange rate systems", "Monetary & fiscal policy"] },
      { topic: "International Economics", subtopics: ["Comparative & absolute advantage", "Free trade vs protectionism", "Trade barriers (tariffs, quotas, subsidies)", "Current account deficits", "Exchange rate systems & management", "Role of IMF, World Bank & WTO"] },
      { topic: "Development Economics", subtopics: ["Measuring development (HDI, MPI)", "Poverty traps & inequality", "Barriers to economic development", "Policies for development (trade, aid, FDI)", "Role of international aid & debt"] },
    ],
    questionTypes: ["MCQ — single best answer from four options", "Data response — extract analysis with calculations", "25-mark essays (analysis + two-sided evaluation required)", "Diagram drawing and accurate labelling", "Short definition questions (2–3 marks)", "Policy evaluation with reference to economic theory"],
    resources: [
      { id: 8, title: "Price Elasticity of Demand – Full Notes", type: "PDF", source: "Open Textbook", size: "1.2 MB", approved: true, downloads: 312, tags: ["Elasticity", "Micro"] },
      { id: 9, title: "Macroeconomic Indicators Explained", type: "PDF", source: "Community Upload", size: "980 KB", approved: true, downloads: 244, tags: ["Macro", "Notes"] },
      { id: 10, title: "Market Failure Case Studies", type: "PDF", source: "Community Upload", size: "1.5 MB", approved: false, downloads: 0, tags: ["Market Failure", "Essays"] },
    ]
  },
  furtherMaths: {
    label: "Further Mathematics", code: "9231", color: "#2e0854", light: "#f3ebfd", accent: "#a855f7", icon: "∞",
    examFormat: [
      { paper: "Paper 1 – Further Pure Mathematics 1", duration: "2h", marks: 80, weight: "~35%", type: "Written", questions: "10–12 structured questions on roots of polynomials, matrices, polar coordinates, series" },
      { paper: "Paper 2 – Further Pure Mathematics 2", duration: "2h", marks: 80, weight: "~35%", type: "Written", questions: "10–12 questions on hyperbolic functions, advanced calculus, complex numbers, eigenvalues" },
      { paper: "Paper 3 – Further Mechanics", duration: "1h 30m", marks: 60, weight: "~30%", type: "Written", questions: "6–8 questions on circular motion, elastic strings, SHM, dimensional analysis" },
      { paper: "Paper 4 – Further Probability & Statistics", duration: "1h 30m", marks: 60, weight: "~30%", type: "Written", questions: "6–8 questions on estimation, chi-squared tests, non-parametric tests" },
    ],
    syllabus: [
      { topic: "Further Pure 1", subtopics: ["Roots of polynomials (sum/product of roots)", "Rational functions & oblique asymptotes", "Summation of series", "Matrices (2×2 and 3×3)", "Polar coordinates & curves", "3D Vectors (lines & planes)", "Proof by mathematical induction"] },
      { topic: "Further Pure 2", subtopics: ["Hyperbolic functions (sinh, cosh, tanh)", "Further integration (reduction formulae, arc length)", "Further differential equations (integrating factor, substitution)", "Complex numbers (De Moivre's theorem, nth roots)", "Matrix eigenvalues & eigenvectors", "Maclaurin & Taylor series"] },
      { topic: "Further Mechanics", subtopics: ["Uniform circular motion", "Non-uniform circular motion", "Elastic strings & springs (Hooke's Law, energy)", "Simple harmonic motion (equations & energy)", "Further kinematics (variable acceleration in 2D)"] },
      { topic: "Further Statistics", subtopics: ["Probability generating functions", "Unbiased estimators & consistency", "Chi-squared tests (goodness of fit & association)", "Wilcoxon signed-rank & rank-sum tests", "Combinations of independent random variables"] },
    ],
    questionTypes: ["Extended formal proofs (multiple steps)", "Sketch and interpret polar curves", "Matrix transformation and eigenvalue problems", "'Show that', 'Verify' and 'Deduce' structured questions", "ODE solving with given boundary conditions", "Full statistical test write-up (state, test, conclude)"],
    resources: [
      { id: 11, title: "Complex Numbers – Argand Diagrams", type: "PDF", source: "Open Textbook", size: "1.6 MB", approved: true, downloads: 198, tags: ["Complex Numbers", "FP1"] },
      { id: 12, title: "Matrix Operations Practice", type: "PDF", source: "Community Upload", size: "840 KB", approved: true, downloads: 152, tags: ["Matrices", "FP1"] },
      { id: 13, title: "Proof by Induction Examples", type: "PDF", source: "Open Textbook", size: "620 KB", approved: true, downloads: 209, tags: ["Proof", "FP1"] },
    ]
  }
};

const openTools = [
  { title: "Khan Academy", desc: "Free video lessons and exercises across all subjects", icon: "▶", color: "#0d4f3c" },
  { title: "Desmos", desc: "Interactive graphing calculator and geometry tools", icon: "◈", color: "#0f2d5c" },
  { title: "GeoGebra", desc: "Dynamic maths visualisations and constructions", icon: "⬡", color: "#4a1800" },
  { title: "Wolfram Alpha", desc: "Step-by-step symbolic computation engine", icon: "Ω", color: "#2e0854" },
  { title: "NRICH Mathematics", desc: "Rich problems and investigations from Cambridge", icon: "◉", color: "#0d4f3c" },
  { title: "Core Economics", desc: "Free open-access undergraduate economics textbook", icon: "◎", color: "#0f2d5c" },
  { title: "Physics & Maths Tutor", desc: "A-Level past papers, mark schemes and revision notes", icon: "✦", color: "#4a1800" },
  { title: "Mathswatch", desc: "Video clips and interactive practice questions", icon: "◑", color: "#2e0854" },
];

const initialPending = [
  { id: 4, title: "Numerical Methods Worked Examples", subject: "Mathematics", uploader: "student_ax92", date: "2026-04-18", size: "1.3 MB" },
  { id: 10, title: "Market Failure Case Studies", subject: "Economics", uploader: "econ_notes_jb", date: "2026-04-20", size: "1.5 MB" },
  { id: 14, title: "Differential Equations Summary", subject: "Further Maths", uploader: "fm_revision_hk", date: "2026-04-21", size: "790 KB" },
];

function SyllabusAccordion({ section, color }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #e4e0d8" }}>
      <div onClick={() => setOpen(o => !o)}
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 0", cursor: "pointer" }}>
        <span style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 18, fontWeight: 600 }}>{section.topic}</span>
        <span style={{ fontSize: 22, color: "#bbb", transform: open ? "rotate(45deg)" : "none", transition: "transform .22s", display: "inline-block" }}>+</span>
      </div>
      {open && (
        <div style={{ paddingBottom: 18, paddingLeft: 4, display: "flex", flexWrap: "wrap", gap: 8 }}>
          {section.subtopics.map((st, i) => (
            <span key={i} style={{ padding: "5px 14px", borderRadius: 20, border: `1.5px solid ${color}50`, color, fontSize: 13, background: color + "0e", fontFamily: "'DM Sans',sans-serif" }}>{st}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ALevelPortal() {
  const [view, setView] = useState("home");
  const [activeSubject, setActiveSubject] = useState(null);
  const [subjectTab, setSubjectTab] = useState("resources");
  const [adminMode, setAdminMode] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({ title: "", subject: "mathematics", topic: "" });
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [pending, setPending] = useState(initialPending);
  const [actionLog, setActionLog] = useState({ approved: 0, rejected: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [examTab, setExamTab] = useState("dates");

  const subjectKeys = Object.keys(subjects);
  const curS = activeSubject ? subjects[activeSubject] : null;

  const handleLogin = () => {
    if (loginUser === ADMIN_USER && loginPass === ADMIN_PASS) {
      setAdminMode(true); setShowAdminLogin(false);
      setLoginError(false); setLoginUser(""); setLoginPass("");
      setView("admin");
    } else { setLoginError(true); }
  };

  const handleApprove = id => { setActionLog(l => ({ ...l, approved: l.approved + 1 })); setPending(p => p.filter(u => u.id !== id)); };
  const handleReject = id => { setActionLog(l => ({ ...l, rejected: l.rejected + 1 })); setPending(p => p.filter(u => u.id !== id)); };

  const handleUpload = () => {
    if (!uploadForm.title) return;
    setUploadSuccess(true);
    setTimeout(() => { setUploadSuccess(false); setUploadModal(false); setUploadForm({ title: "", subject: "mathematics", topic: "" }); }, 2500);
  };

  const allApproved = Object.values(subjects).flatMap(s => s.resources.filter(r => r.approved));
  const filtered = searchQuery.length > 1 ? allApproved.filter(r =>
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))) : [];

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
    *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
    :root { --bg:#f7f5f0; --bg2:#efece4; --white:#ffffff; --border:#ddd8cc; --text:#18181b; --muted:#6b6b6b; --faint:#a0a0a0; }
    body { background:var(--bg); }
    .serif { font-family:'Cormorant Garamond',Georgia,serif; }
    .sans { font-family:'DM Sans',sans-serif; }
    .caps { font-family:'DM Sans',sans-serif; font-size:10px; letter-spacing:.15em; text-transform:uppercase; color:var(--faint); }
    .fade-up { animation:fu .5s cubic-bezier(.22,1,.36,1) both; }
    @keyframes fu { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
    .s1{animation-delay:.05s} .s2{animation-delay:.11s} .s3{animation-delay:.17s} .s4{animation-delay:.23s}
    .nav-pill { cursor:pointer; font-family:'DM Sans',sans-serif; font-size:12.5px; font-weight:500; letter-spacing:.06em; text-transform:uppercase; color:var(--muted); padding:5px 2px; border-bottom:2px solid transparent; transition:color .18s,border-color .18s; }
    .nav-pill:hover { color:var(--text); }
    .nav-pill.on { color:var(--text); border-bottom-color:var(--text); }
    .btn { cursor:pointer; border:none; font-family:'DM Sans',sans-serif; font-weight:600; font-size:12px; letter-spacing:.07em; text-transform:uppercase; border-radius:2px; transition:all .16s; }
    .dark { background:var(--text); color:var(--bg); padding:9px 22px; }
    .dark:hover { background:#2a2a2d; }
    .ghost { background:transparent; color:var(--text); border:1.5px solid var(--text); padding:8px 20px; }
    .ghost:hover { background:var(--text); color:var(--bg); }
    .sm { padding:6px 15px; font-size:11px; }
    .approve-btn { background:#0d4f3c; color:#fff; padding:7px 17px; }
    .approve-btn:hover { background:#0a3d2e; }
    .reject-btn { background:transparent; color:#b91c1c; border:1.5px solid #b91c1c; padding:7px 17px; }
    .reject-btn:hover { background:#b91c1c; color:#fff; }
    .card { background:var(--white); border:1px solid var(--border); border-radius:3px; }
    .sc { cursor:pointer; border-radius:3px; transition:transform .28s cubic-bezier(.22,1,.36,1),box-shadow .28s; }
    .sc:hover { transform:translateY(-5px); box-shadow:0 18px 50px rgba(0,0,0,.13); }
    .rrow { border-bottom:1px solid var(--border); padding:14px 0; transition:background .14s; }
    .rrow:last-child { border-bottom:none; }
    .rrow:hover { background:rgba(0,0,0,.017); }
    .tag { display:inline-block; padding:2px 9px; border-radius:20px; font-size:11px; font-family:'DM Sans',sans-serif; font-weight:500; background:rgba(0,0,0,.06); color:#555; margin-right:4px; }
    .inp { width:100%; border:1.5px solid var(--border); border-radius:2px; padding:10px 14px; font-family:'DM Sans',sans-serif; font-size:14px; background:var(--white); outline:none; transition:border-color .18s; color:var(--text); }
    .inp:focus { border-color:var(--text); }
    .overlay { position:fixed; inset:0; background:rgba(0,0,0,.55); display:flex; align-items:center; justify-content:center; z-index:200; backdrop-filter:blur(3px); }
    .modal { background:var(--bg); border:1px solid var(--border); border-radius:4px; padding:42px; width:500px; max-width:96vw; max-height:92vh; overflow-y:auto; }
    .tab-bar { display:flex; border-bottom:1.5px solid var(--border); gap:0; margin-bottom:28px; }
    .tab { cursor:pointer; padding:10px 22px; font-family:'DM Sans',sans-serif; font-size:12px; font-weight:600; letter-spacing:.06em; text-transform:uppercase; color:var(--muted); border-bottom:2.5px solid transparent; margin-bottom:-1.5px; transition:color .18s,border-color .18s; }
    .tab:hover { color:var(--text); }
    .tab.on { color:var(--text); border-bottom-color:var(--text); }
    .hr { height:1px; background:var(--border); margin:28px 0; }
    .etable { width:100%; border-collapse:collapse; }
    .etable th { font-family:'DM Sans',sans-serif; font-size:10.5px; letter-spacing:.13em; text-transform:uppercase; color:var(--faint); padding:11px 18px; text-align:left; border-bottom:1.5px solid var(--border); }
    .etable td { font-family:'DM Sans',sans-serif; font-size:13.5px; padding:14px 18px; border-bottom:1px solid var(--border); vertical-align:top; }
    .etable tr:last-child td { border-bottom:none; }
    .etable tbody tr:hover td { background:rgba(0,0,0,.017); }
    .chip { display:inline-block; padding:4px 12px; border-radius:20px; border:1px solid rgba(255,255,255,.28); font-family:'DM Sans',sans-serif; font-size:11px; color:rgba(255,255,255,.82); margin:3px; transition:background .18s; }
    .chip:hover { background:rgba(255,255,255,.14); }
    .heronum { font-family:'Cormorant Garamond',Georgia,serif; font-size:100px; font-weight:700; line-height:1; opacity:.08; position:absolute; right:18px; top:8px; color:inherit; user-select:none; pointer-events:none; }
    ::-webkit-scrollbar { width:5px; }
    ::-webkit-scrollbar-thumb { background:var(--border); border-radius:3px; }
  `;

  return (
    <div style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", background: "#f7f5f0", minHeight: "100vh", color: "#18181b" }}>
      <style>{css}</style>

      {/* HEADER */}
      <header style={{ background: "rgba(247,245,240,.96)", borderBottom: "1px solid #ddd8cc", position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(8px)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 30px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 62 }}>
          <div onClick={() => { setView("home"); setActiveSubject(null); }} style={{ cursor: "pointer", display: "flex", alignItems: "baseline", gap: 8 }}>
            <span className="serif" style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-.02em" }}>A-Level</span>
            <span className="serif" style={{ fontSize: 22, fontWeight: 400, color: "#999" }}>Portal</span>
            <span className="sans" style={{ fontSize: 10, color: "#ccc", letterSpacing: ".1em", marginLeft: 6, textTransform: "uppercase" }}>oliverchow-mse</span>
          </div>
          <nav style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {[["home","Home"],["exams","Exams"],["resources","Resources"],["tools","Tools"]].map(([k,l]) => (
              <span key={k} className={`nav-pill ${view===k?"on":""}`} onClick={() => { setView(k); setActiveSubject(null); }}>{l}</span>
            ))}
            {adminMode
              ? <span className={`nav-pill ${view==="admin"?"on":""}`} onClick={() => setView("admin")}>Admin</span>
              : <span className="nav-pill" onClick={() => setShowAdminLogin(true)}>Admin</span>}
            <button className="btn dark sm" onClick={() => setUploadModal(true)}>+ Upload</button>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: 1180, margin: "0 auto", padding: "50px 30px 100px" }}>

        {/* ═══ HOME ═══ */}
        {view === "home" && !activeSubject && (
          <div>
            <div className="fade-up" style={{ display: "grid", gridTemplateColumns: "1.1fr .9fr", gap: 52, alignItems: "center", marginBottom: 64 }}>
              <div>
                <div className="caps" style={{ marginBottom: 18 }}>Cambridge CAIE · A-Level · 中国大陆</div>
                <h1 className="serif" style={{ fontSize: "clamp(44px,6vw,72px)", fontWeight: 700, lineHeight: 1.07, letterSpacing: "-.025em", marginBottom: 22 }}>
                  Master Your<br />A-Levels.
                </h1>
                <p className="sans" style={{ color: "#666", fontSize: 16, lineHeight: 1.78, marginBottom: 34, maxWidth: 430 }}>
                  Curated study resources, exam dates and centre locations across mainland China, open tools, and a community upload library — for Maths, Statistics, Economics and Further Maths.
                </p>
                <div style={{ display: "flex", gap: 12 }}>
                  <button className="btn dark" onClick={() => setView("exams")}>Exam Information</button>
                  <button className="btn ghost" onClick={() => setView("resources")}>Browse Resources</button>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { n: "4", l: "Subjects" },
                  { n: String(allApproved.length), l: "Resources" },
                  { n: String(examInfo.locations.length), l: "Cities in China" },
                  { n: "2026", l: "Current Year" }
                ].map((s, i) => (
                  <div key={i} className={`card fade-up s${i+1}`} style={{ padding: "22px 24px" }}>
                    <div className="serif" style={{ fontSize: 46, fontWeight: 700, lineHeight: 1, marginBottom: 4 }}>{s.n}</div>
                    <div className="caps">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hr" />
            <div className="caps" style={{ marginBottom: 24 }}>Choose a Subject</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(255px,1fr))", gap: 16, marginBottom: 56 }}>
              {subjectKeys.map((key, i) => {
                const s = subjects[key];
                return (
                  <div key={key} className={`sc fade-up s${i+1}`}
                    style={{ background: s.color, padding: "34px 30px 28px", color: "#fff", position: "relative", overflow: "hidden" }}
                    onClick={() => { setActiveSubject(key); setSubjectTab("resources"); setView("subject"); }}>
                    <div className="heronum">{s.icon}</div>
                    <div className="caps" style={{ color: "rgba(255,255,255,.4)", marginBottom: 10 }}>{s.code}</div>
                    <h2 className="serif" style={{ fontSize: 26, fontWeight: 700, marginBottom: 16 }}>{s.label}</h2>
                    <div style={{ display: "flex", flexWrap: "wrap", marginBottom: 20 }}>
                      {s.syllabus.map(t => <span key={t.topic} className="chip">{t.topic}</span>)}
                    </div>
                    <div className="sans" style={{ fontSize: 12, opacity: .55 }}>
                      {s.resources.filter(r => r.approved).length} resources · {s.examFormat.length} papers →
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dates strip */}
            <div style={{ background: "#18181b", borderRadius: 3, padding: "34px 38px", color: "#f7f5f0" }}>
              <div className="caps" style={{ color: "#555", marginBottom: 20 }}>Upcoming Key Exam Dates</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 22 }}>
                {examInfo.dates.slice(0, 4).map((d, i) => (
                  <div key={i}>
                    <div className="serif" style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>{d.date}</div>
                    <div className="sans" style={{ fontSize: 12, color: "#777", lineHeight: 1.5 }}>{d.session}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24 }}>
                <button className="btn ghost" style={{ borderColor: "#444", color: "#aaa" }} onClick={() => setView("exams")}>
                  Full Exam Information →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ═══ SUBJECT ═══ */}
        {view === "subject" && activeSubject && curS && (
          <div className="fade-up">
            <span className="sans" style={{ fontSize: 12, color: "#aaa", cursor: "pointer" }}
              onClick={() => { setView("home"); setActiveSubject(null); }}>← Back</span>
            <div style={{ background: curS.color, borderRadius: 3, padding: "40px 42px 34px", color: "#fff", margin: "18px 0 32px", position: "relative", overflow: "hidden" }}>
              <div style={{ fontSize: 140, fontFamily: "Georgia", opacity: .06, position: "absolute", right: 24, top: -24, lineHeight: 1, userSelect: "none" }}>{curS.icon}</div>
              <div className="caps" style={{ color: "rgba(255,255,255,.38)", marginBottom: 8 }}>CAIE {curS.code}</div>
              <h1 className="serif" style={{ fontSize: 42, fontWeight: 700, marginBottom: 18 }}>{curS.label}</h1>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {curS.syllabus.map(t => <span key={t.topic} className="chip">{t.topic}</span>)}
              </div>
            </div>

            <div className="tab-bar">
              {[["resources","Resources"],["syllabus","Syllabus"],["papers","Exam Papers"],["qtypes","Question Types"]].map(([k, l]) => (
                <span key={k} className={`tab ${subjectTab===k?"on":""}`} onClick={() => setSubjectTab(k)}>{l}</span>
              ))}
            </div>

            {subjectTab === "resources" && (
              <div>
                <div className="card" style={{ padding: "0 24px" }}>
                  {curS.resources.filter(r => r.approved).map(r => (
                    <div key={r.id} className="rrow" style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div style={{ width: 40, height: 40, background: curS.color + "22", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span className="sans" style={{ fontSize: 10, fontWeight: 700, color: curS.color }}>{r.type}</span>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div className="sans" style={{ fontSize: 14, fontWeight: 600, marginBottom: 5 }}>{r.title}</div>
                        <div>{r.tags.map(t => <span key={t} className="tag">{t}</span>)}<span className="sans" style={{ fontSize: 11, color: "#ccc" }}>{r.source} · {r.size}</span></div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
                        <span className="sans" style={{ fontSize: 12, color: "#ccc" }}>↓ {r.downloads}</span>
                        <button className="btn ghost sm">Download</button>
                      </div>
                    </div>
                  ))}
                  {curS.resources.filter(r => r.approved).length === 0 && (
                    <div className="sans" style={{ padding: "28px 0", textAlign: "center", color: "#ccc", fontSize: 14 }}>No approved resources yet.</div>
                  )}
                </div>
                <div style={{ marginTop: 18, display: "flex", justifyContent: "flex-end" }}>
                  <button className="btn dark" onClick={() => { setUploadForm(f => ({ ...f, subject: activeSubject })); setUploadModal(true); }}>+ Upload Resource</button>
                </div>
              </div>
            )}

            {subjectTab === "syllabus" && (
              <div className="card" style={{ padding: "0 24px" }}>
                {curS.syllabus.map((sec, i) => <SyllabusAccordion key={i} section={sec} color={curS.color} />)}
              </div>
            )}

            {subjectTab === "papers" && (
              <table className="etable card">
                <thead><tr><th>Paper</th><th>Duration</th><th>Marks</th><th>Weight</th><th>Type</th></tr></thead>
                <tbody>
                  {curS.examFormat.map((p, i) => (
                    <tr key={i}>
                      <td>
                        <span className="sans" style={{ fontWeight: 600 }}>{p.paper}</span>
                        <br /><span className="sans" style={{ fontSize: 12, color: "#888", marginTop: 4, display: "block" }}>{p.questions}</span>
                      </td>
                      <td><span className="sans">{p.duration}</span></td>
                      <td><span className="sans">{p.marks}</span></td>
                      <td><span className="sans" style={{ fontWeight: 700, color: curS.color }}>{p.weight}</span></td>
                      <td><span className="tag">{p.type}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {subjectTab === "qtypes" && (
              <div className="card" style={{ padding: "8px 26px" }}>
                {curS.questionTypes.map((qt, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 0", borderBottom: i < curS.questionTypes.length - 1 ? "1px solid #e4e0d8" : "none" }}>
                    <div style={{ width: 26, height: 26, background: curS.color, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                      <span className="sans" style={{ fontSize: 11, color: "#fff", fontWeight: 700 }}>{i + 1}</span>
                    </div>
                    <span className="sans" style={{ fontSize: 14, lineHeight: 1.65 }}>{qt}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ═══ EXAMS ═══ */}
        {view === "exams" && (
          <div className="fade-up">
            <div style={{ marginBottom: 36 }}>
              <div className="caps" style={{ marginBottom: 12 }}>Cambridge CAIE · 中国大陆考生信息</div>
              <h1 className="serif" style={{ fontSize: 44, fontWeight: 700, marginBottom: 10 }}>Examination Information</h1>
              <p className="sans" style={{ color: "#777", fontSize: 15, maxWidth: 560 }}>Exam dates, approved centres across mainland China, and the assessment format for CAIE A-Level candidates.</p>
            </div>
            <div className="tab-bar">
              {[["dates","Exam Dates"],["locations","Locations · 考点"],["format","Assessment Format"]].map(([k,l]) => (
                <span key={k} className={`tab ${examTab===k?"on":""}`} onClick={() => setExamTab(k)}>{l}</span>
              ))}
            </div>

            {examTab === "dates" && (
              <div>
                <table className="etable card">
                  <thead><tr><th>Session</th><th>Date</th><th>Note</th></tr></thead>
                  <tbody>
                    {examInfo.dates.map((d, i) => (
                      <tr key={i}>
                        <td><span className="sans" style={{ fontWeight: 600 }}>{d.session}</span></td>
                        <td><span className="serif" style={{ fontSize: 20, fontWeight: 600 }}>{d.date}</span></td>
                        <td><span className="sans" style={{ color: "#777", fontSize: 13 }}>{d.note}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="card" style={{ padding: "14px 20px", marginTop: 14 }}>
                  <span className="sans" style={{ fontSize: 13, color: "#888" }}>⚠ Dates are indicative windows. Confirm your individual paper timetable with your registered examination centre.</span>
                </div>
              </div>
            )}

            {examTab === "locations" && (
              <div>
                <div className="sans" style={{ fontSize: 13, color: "#888", marginBottom: 22 }}>
                  CAIE-approved centres in mainland China. Contact individual schools to confirm registration availability and capacity.
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(275px,1fr))", gap: 14 }}>
                  {examInfo.locations.map((loc, i) => (
                    <div key={i} className={`card fade-up s${(i%4)+1}`} style={{ padding: "22px 24px", transition: "box-shadow .2s" }}
                      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,.08)"}
                      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                        <h3 className="serif" style={{ fontSize: 20, fontWeight: 700 }}>{loc.city}</h3>
                        <span className="caps" style={{ background: "#f0ece2", padding: "3px 10px", borderRadius: 20, fontSize: 9.5, color: "#888" }}>{loc.region}</span>
                      </div>
                      <ul style={{ listStyle: "none" }}>
                        {loc.centres.map((c, j) => (
                          <li key={j} className="sans" style={{ fontSize: 13, color: "#555", padding: "5px 0", borderBottom: j < loc.centres.length - 1 ? "1px solid #f0ece2" : "none" }}>
                            <span style={{ color: "#ccc", marginRight: 8 }}>·</span>{c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {examTab === "format" && (
              <div>
                <table className="etable card" style={{ marginBottom: 26 }}>
                  <thead><tr><th>Aspect</th><th>Detail</th></tr></thead>
                  <tbody>
                    {examInfo.format.map((f, i) => (
                      <tr key={i}>
                        <td><span className="sans" style={{ fontWeight: 600 }}>{f.aspect}</span></td>
                        <td><span className="sans">{f.detail}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="caps" style={{ marginBottom: 14 }}>Grade Scale</div>
                <div style={{ display: "flex", gap: 10 }}>
                  {[["A*","#0d4f3c"],["A","#1a6b50"],["B","#0f2d5c"],["C","#1e4b9c"],["D","#4a1800"],["E","#8b3200"],["U","#888"]].map(([g,c]) => (
                    <div key={g} className="card" style={{ textAlign: "center", padding: "16px 18px", flex: 1 }}>
                      <div className="serif" style={{ fontSize: 30, fontWeight: 700, color: c }}>{g}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══ RESOURCES ═══ */}
        {view === "resources" && (
          <div className="fade-up">
            <h1 className="serif" style={{ fontSize: 42, fontWeight: 700, marginBottom: 8 }}>All Resources</h1>
            <p className="sans" style={{ color: "#777", marginBottom: 28, fontSize: 15 }}>Search and browse all approved materials.</p>
            <input className="inp" placeholder="Search by title or topic tag…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ marginBottom: 32 }} />

            {searchQuery.length > 1 ? (
              <div>
                <div className="caps" style={{ marginBottom: 14 }}>{filtered.length} result{filtered.length !== 1 ? "s" : ""}</div>
                <div className="card" style={{ padding: "0 24px" }}>
                  {filtered.length === 0
                    ? <div className="sans" style={{ padding: "28px 0", textAlign: "center", color: "#ccc" }}>No matches found.</div>
                    : filtered.map(r => {
                      const subj = Object.values(subjects).find(s => s.resources.find(x => x.id === r.id));
                      return (
                        <div key={r.id} className="rrow" style={{ display: "flex", alignItems: "center", gap: 16 }}>
                          <div style={{ flex: 1 }}>
                            <div className="sans" style={{ fontSize: 14, fontWeight: 600, marginBottom: 5 }}>{r.title}</div>
                            <div>{r.tags.map(t => <span key={t} className="tag">{t}</span>)}{subj && <span className="tag" style={{ background: subj.color + "18", color: subj.color }}>{subj.label}</span>}</div>
                          </div>
                          <button className="btn ghost sm">Download</button>
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : subjectKeys.map(key => {
              const s = subjects[key]; const apr = s.resources.filter(r => r.approved);
              return (
                <div key={key} style={{ marginBottom: 34 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 32, height: 32, background: s.color, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ color: "#fff", fontFamily: "Georgia", fontSize: 15 }}>{s.icon}</span>
                    </div>
                    <h2 className="serif" style={{ fontSize: 22, fontWeight: 700 }}>{s.label}</h2>
                    <span className="caps">{apr.length} approved</span>
                  </div>
                  <div className="card" style={{ padding: "0 24px" }}>
                    {apr.map(r => (
                      <div key={r.id} className="rrow" style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <div style={{ flex: 1 }}>
                          <div className="sans" style={{ fontSize: 14, fontWeight: 600, marginBottom: 5 }}>{r.title}</div>
                          <div>{r.tags.map(t => <span key={t} className="tag">{t}</span>)}<span className="sans" style={{ fontSize: 11, color: "#ccc" }}>{r.size} · ↓ {r.downloads}</span></div>
                        </div>
                        <button className="btn ghost sm">Download</button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ═══ TOOLS ═══ */}
        {view === "tools" && (
          <div className="fade-up">
            <h1 className="serif" style={{ fontSize: 42, fontWeight: 700, marginBottom: 8 }}>Open-Source Tools</h1>
            <p className="sans" style={{ color: "#777", marginBottom: 36, fontSize: 15 }}>Free external resources to support your studies.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(265px,1fr))", gap: 14 }}>
              {openTools.map((t, i) => (
                <div key={i} className={`card fade-up s${(i%4)+1}`} style={{ padding: "20px 22px", display: "flex", gap: 16, alignItems: "flex-start", cursor: "pointer", transition: "box-shadow .2s" }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,.09)"}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                  <div style={{ width: 42, height: 42, background: t.color, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#fff", fontSize: 18, fontFamily: "Georgia" }}>{t.icon}</div>
                  <div>
                    <div className="serif" style={{ fontSize: 17, fontWeight: 600, marginBottom: 4 }}>{t.title}</div>
                    <div className="sans" style={{ fontSize: 13, color: "#777", lineHeight: 1.55 }}>{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ ADMIN ═══ */}
        {view === "admin" && adminMode && (
          <div className="fade-up">
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 36 }}>
              <h1 className="serif" style={{ fontSize: 38, fontWeight: 700 }}>Admin Panel</h1>
              <span className="sans" style={{ background: "#18181b", color: "#f7f5f0", padding: "3px 14px", borderRadius: 20, fontSize: 11, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase" }}>
                {ADMIN_USER}
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 12, marginBottom: 42 }}>
              {[
                { l: "Approved Resources", v: allApproved.length },
                { l: "Pending Review", v: pending.length },
                { l: "Total Downloads", v: Object.values(subjects).flatMap(s => s.resources).reduce((a, r) => a + r.downloads, 0).toLocaleString() },
                { l: "Subjects", v: 4 },
                { l: "Exam Cities", v: examInfo.locations.length },
              ].map((s, i) => (
                <div key={i} className="card" style={{ padding: "20px 22px" }}>
                  <div className="caps" style={{ marginBottom: 8 }}>{s.l}</div>
                  <div className="serif" style={{ fontSize: 36, fontWeight: 700 }}>{s.v}</div>
                </div>
              ))}
            </div>
            <h2 className="serif" style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Pending Approvals</h2>
            {pending.length === 0
              ? <div className="sans" style={{ color: "#bbb", fontSize: 14 }}>No uploads pending review.</div>
              : pending.map(u => (
                <div key={u.id} className="card" style={{ padding: "18px 22px", marginBottom: 12, display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
                  <div>
                    <div className="serif" style={{ fontSize: 17, fontWeight: 600, marginBottom: 5 }}>{u.title}</div>
                    <div className="sans" style={{ fontSize: 13, color: "#777" }}>{u.subject} · <strong>{u.uploader}</strong> · {u.date} · {u.size}</div>
                  </div>
                  <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
                    <button className="btn approve-btn" onClick={() => handleApprove(u.id)}>Approve</button>
                    <button className="btn reject-btn" onClick={() => handleReject(u.id)}>Reject</button>
                  </div>
                </div>
              ))
            }
            {(actionLog.approved > 0 || actionLog.rejected > 0) && (
              <div className="sans" style={{ display: "flex", gap: 10, marginTop: 10 }}>
                {actionLog.approved > 0 && <span style={{ background: "#e6f4ef", color: "#0d4f3c", padding: "4px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>✓ {actionLog.approved} approved</span>}
                {actionLog.rejected > 0 && <span style={{ background: "#fef2f2", color: "#b91c1c", padding: "4px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>✕ {actionLog.rejected} rejected</span>}
              </div>
            )}
            <div style={{ marginTop: 40 }}>
              <button className="btn ghost" onClick={() => { setAdminMode(false); setView("home"); }}>Log out</button>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #ddd8cc", background: "#fff", padding: "26px 30px" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <div>
            <span className="serif" style={{ fontSize: 16, fontWeight: 700 }}>A-Level Portal</span>
            <span className="sans" style={{ fontSize: 12, color: "#ccc", marginLeft: 10 }}>oliverchow-mse · Cambridge CAIE</span>
          </div>
          <span className="sans" style={{ fontSize: 12, color: "#ccc" }}>alevellearning/oliverchow-mse.com · For educational use only</span>
        </div>
      </footer>

      {/* ADMIN LOGIN MODAL */}
      {showAdminLogin && (
        <div className="overlay" onClick={() => { setShowAdminLogin(false); setLoginError(false); }}>
          <div className="modal fade-up" onClick={e => e.stopPropagation()}>
            <h2 className="serif" style={{ fontSize: 28, fontWeight: 700, marginBottom: 6 }}>Admin Login</h2>
            <p className="sans" style={{ color: "#888", fontSize: 13, marginBottom: 28 }}>Enter your administrator credentials to access the admin panel.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <div className="caps" style={{ marginBottom: 7 }}>Username</div>
                <input className="inp" placeholder="Username" value={loginUser} onChange={e => { setLoginUser(e.target.value); setLoginError(false); }} />
              </div>
              <div>
                <div className="caps" style={{ marginBottom: 7 }}>Password</div>
                <div style={{ position: "relative" }}>
                  <input className="inp" type={showPass ? "text" : "password"} placeholder="Password" value={loginPass}
                    onChange={e => { setLoginPass(e.target.value); setLoginError(false); }}
                    onKeyDown={e => e.key === "Enter" && handleLogin()}
                    style={{ paddingRight: 44 }} />
                  <span onClick={() => setShowPass(p => !p)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", cursor: "pointer", fontSize: 13, color: "#bbb", fontFamily: "sans-serif" }}>
                    {showPass ? "hide" : "show"}
                  </span>
                </div>
              </div>
              {loginError && <span className="sans" style={{ color: "#b91c1c", fontSize: 13 }}>Invalid username or password.</span>}
              <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                <button className="btn dark" style={{ flex: 1, padding: 12 }} onClick={handleLogin}>Sign In</button>
                <button className="btn ghost" style={{ flex: 1, padding: 12 }} onClick={() => { setShowAdminLogin(false); setLoginError(false); }}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* UPLOAD MODAL */}
      {uploadModal && (
        <div className="overlay" onClick={() => setUploadModal(false)}>
          <div className="modal fade-up" onClick={e => e.stopPropagation()}>
            {uploadSuccess ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div className="serif" style={{ fontSize: 56, marginBottom: 16 }}>✓</div>
                <h2 className="serif" style={{ fontSize: 26, fontWeight: 700, marginBottom: 8 }}>Submitted for Review</h2>
                <p className="sans" style={{ color: "#777", fontSize: 14 }}>Your upload is pending admin approval and will go live once reviewed.</p>
              </div>
            ) : (
              <>
                <h2 className="serif" style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>Upload a Resource</h2>
                <p className="sans" style={{ color: "#888", fontSize: 13, marginBottom: 26 }}>All uploads are reviewed by the admin before publication.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <div className="caps" style={{ marginBottom: 7 }}>Title</div>
                    <input className="inp" placeholder="e.g. Integration by Parts – Full Notes" value={uploadForm.title} onChange={e => setUploadForm(f => ({ ...f, title: e.target.value }))} />
                  </div>
                  <div>
                    <div className="caps" style={{ marginBottom: 7 }}>Subject</div>
                    <select className="inp" value={uploadForm.subject} onChange={e => setUploadForm(f => ({ ...f, subject: e.target.value, topic: "" }))}>
                      {subjectKeys.map(k => <option key={k} value={k}>{subjects[k].label}</option>)}
                    </select>
                  </div>
                  <div>
                    <div className="caps" style={{ marginBottom: 7 }}>Topic</div>
                    <select className="inp" value={uploadForm.topic} onChange={e => setUploadForm(f => ({ ...f, topic: e.target.value }))}>
                      <option value="">Select topic…</option>
                      {subjects[uploadForm.subject].syllabus.map(s => <option key={s.topic} value={s.topic}>{s.topic}</option>)}
                    </select>
                  </div>
                  <div>
                    <div className="caps" style={{ marginBottom: 7 }}>File (PDF)</div>
                    <div style={{ border: "1.5px dashed #ddd8cc", borderRadius: 2, padding: "28px", textAlign: "center", background: "#efece4", cursor: "pointer" }}>
                      <div className="sans" style={{ fontSize: 13, color: "#bbb" }}>Click to select or drag & drop a PDF</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                    <button className="btn dark" style={{ flex: 1, padding: 12 }} onClick={handleUpload} disabled={!uploadForm.title}>Submit for Review</button>
                    <button className="btn ghost" style={{ flex: 1, padding: 12 }} onClick={() => setUploadModal(false)}>Cancel</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
