import { useState, useEffect, useRef } from "react";

// ─── ADMIN ────────────────────────────────────────────────────────────────────
const ADMIN_USER = "OliverChow";
const ADMIN_PASS = "CQzy0215!";

// ─── BILINGUAL TEXT ───────────────────────────────────────────────────────────
const T = {
  appName:      ["A-Level 学习助手", "A-Level Learner"],
  nav_home:     ["首页", "Home"],
  nav_quiz:     ["练习题", "Quiz"],
  nav_flash:    ["抽认卡", "Cards"],
  nav_progress: ["进度", "Progress"],
  nav_ai:       ["AI助手", "AI Tutor"],
  nav_portal:   ["资源库", "Resources"],
  nav_exams:    ["考试信息", "Exams"],
  back:         ["返回", "Back"],
  correct:      ["回答正确！", "Correct!"],
  wrong:        ["回答错误", "Incorrect"],
  next:         ["下一题", "Next"],
  retry:        ["再练一次", "Try Again"],
  score:        ["得分", "Score"],
  flip:         ["翻转卡片", "Flip Card"],
  know:         ["✓ 认识", "✓ Got it"],
  dontknow:     ["✗ 不认识", "✗ Not yet"],
  cards_done:   ["本轮完成！", "Round Complete!"],
  quiz_done:    ["练习完成", "Quiz Complete"],
  send:         ["发送", "Send"],
  ai_thinking:  ["AI 思考中…", "Thinking…"],
  ai_placeholder: ["提问，例如：如何求导？", "Ask e.g. How do I differentiate?"],
  upload:       ["上传资源", "Upload"],
  approve:      ["批准", "Approve"],
  reject:       ["拒绝", "Reject"],
  admin_login:  ["管理员登录", "Admin Login"],
  username:     ["用户名", "Username"],
  password:     ["密码", "Password"],
  signin:       ["登录", "Sign In"],
  logout:       ["退出", "Log Out"],
  cancel:       ["取消", "Cancel"],
  submit:       ["提交审核", "Submit for Review"],
  pending:      ["待审核上传", "Pending Uploads"],
};
const L = (key, ln) => T[key]?.[ln] ?? T[key]?.[0] ?? key;

// ─── EXAM DATA ────────────────────────────────────────────────────────────────
const examInfo = {
  dates: [
    { session: "May/June 2025 – 开始", date: "2025年5月5日", note: "首场书面考试开始" },
    { session: "May/June 2025 – 结束", date: "2025年6月18日", note: "末场书面考试结束" },
    { session: "Oct/Nov 2025 – 开始", date: "2025年10月6日", note: "首场书面考试开始" },
    { session: "Oct/Nov 2025 – 结束", date: "2025年11月14日", note: "末场书面考试结束" },
    { session: "May/June 2026 – 开始", date: "2026年5月4日", note: "首场书面考试开始" },
    { session: "May/June 2026 – 结束", date: "2026年6月17日", note: "末场书面考试结束" },
  ],
  locations: [
    { city: "北京 Beijing", region: "华北", centres: ["British School of Beijing", "Beijing BISS International School", "Dulwich College Beijing"] },
    { city: "上海 Shanghai", region: "华东", centres: ["Shanghai American School", "Concordia International School", "Yew Chung International School"] },
    { city: "广州 Guangzhou", region: "华南", centres: ["Guangzhou Nanhu International School", "Clifford School", "Utahloy International School"] },
    { city: "深圳 Shenzhen", region: "华南", centres: ["Shekou International School", "Shenzhen College of International Education", "BASIS International School Shenzhen"] },
    { city: "成都 Chengdu", region: "西南", centres: ["Chengdu No.7 High School International Dept.", "BASIS International School Chengdu"] },
    { city: "杭州 Hangzhou", region: "华东", centres: ["Hangzhou Foreign Languages School", "Dipont Education Hangzhou"] },
    { city: "武汉 Wuhan", region: "华中", centres: ["Wuhan Britain-China School", "Maple Leaf International School Wuhan"] },
    { city: "重庆 Chongqing", region: "西南", centres: ["Chongqing Liangjiang Yucai Secondary School", "Dipont Huamei International School"] },
  ],
  format: [
    { aspect: "主办机构", detail: "Cambridge Assessment International Education (CAIE)" },
    { aspect: "考试语言", detail: "英语（全部试卷）" },
    { aspect: "评分等级", detail: "A* · A · B · C · D · E · U" },
    { aspect: "课程作业", detail: "部分科目包含内部评估课程作业，须在考试前提交" },
    { aspect: "阅卷方式", detail: "所有试卷由CAIE考官集中批改，可申请复议" },
    { aspect: "成绩公布", detail: "8月（5/6月考次）· 1月（10/11月考次）" },
    { aspect: "报名截止", detail: "通常在考试开始前6个月，请向注册考试中心确认" },
  ]
};

// ─── SUBJECT DATA ─────────────────────────────────────────────────────────────
const subjects = {
  mathematics: {
    label: ["数学", "Mathematics"], code: "9709", color: "#0d4f3c", icon: "∑",
    examFormat: [
      { paper: "Paper 1 – Pure Mathematics 1", duration: "1h 45m", marks: 75, weight: "~30%", type: "Written", desc: "10–12题结构题，涵盖代数、坐标几何、微积分" },
      { paper: "Paper 2 – Pure Mathematics 2", duration: "1h 15m", marks: 50, weight: "~20%", type: "Written", desc: "6–8题，含对数、三角恒等式、微积分" },
      { paper: "Paper 3 – Pure Mathematics 3", duration: "1h 45m", marks: 75, weight: "~30%", type: "Written", desc: "10–12题，含复数、向量、微分方程" },
      { paper: "Paper 4 – Mechanics", duration: "1h 15m", marks: 50, weight: "~20%", type: "Written", desc: "6–8题，力学：力、运动学、牛顿定律" },
      { paper: "Paper 5 – Probability & Statistics 1", duration: "1h 15m", marks: 50, weight: "~20%", type: "Written", desc: "6–8题，数据、概率、分布" },
      { paper: "Paper 6 – Probability & Statistics 2", duration: "1h 15m", marks: 50, weight: "~20%", type: "Written", desc: "6–8题，假设检验、泊松、正态分布" },
    ],
    syllabus: [
      { topic: "Pure Mathematics 1", subtopics: ["二次函数", "坐标几何", "弧度制", "三角函数", "数列与级数", "微分", "积分", "向量"] },
      { topic: "Pure Mathematics 2 & 3", subtopics: ["多项式与对数", "三角恒等式", "进阶微分", "进阶积分", "数值方法", "微分方程", "复数(P3)", "三维向量(P3)"] },
      { topic: "Mechanics", subtopics: ["力与平衡", "运动学", "牛顿运动定律", "能量与功率", "动量"] },
      { topic: "Probability & Statistics", subtopics: ["数据表示", "排列组合", "概率", "离散随机变量", "正态分布", "假设检验", "泊松分布(S2)"] },
    ],
    questionTypes: ["多部分结构题（大部分分数）", "形式证明题", "图形绘制与解读", "数值计算（需展示方法）", ""证明"与"由此推断"题型", "实际应用建模题"],
    resources: [
      { id: 1, title: "Integration by Parts – 完整指南", type: "PDF", source: "Open Textbook", size: "2.1 MB", approved: true, downloads: 342, tags: ["积分", "P2/P3"] },
      { id: 2, title: "坐标几何练习题集", type: "PDF", source: "Community Upload", size: "890 KB", approved: true, downloads: 218, tags: ["几何", "P1"] },
      { id: 3, title: "微分法则速查表", type: "PDF", source: "Open Textbook", size: "450 KB", approved: true, downloads: 589, tags: ["微分", "P1"] },
      { id: 4, title: "数值方法例题解析", type: "PDF", source: "Community Upload", size: "1.3 MB", approved: false, downloads: 0, tags: ["数值", "P2"] },
    ]
  },
  statistics: {
    label: ["统计学", "Statistics"], code: "9709", color: "#0f2d5c", icon: "μ",
    examFormat: [
      { paper: "Paper 5 – Probability & Statistics 1", duration: "1h 15m", marks: 50, weight: "50%", type: "Written", desc: "6–8题，数据表示、概率和分布" },
      { paper: "Paper 6 – Probability & Statistics 2", duration: "1h 15m", marks: 50, weight: "50%", type: "Written", desc: "6–8题，假设检验、泊松、正态近似" },
    ],
    syllabus: [
      { topic: "数据表示", subtopics: ["茎叶图", "箱线图", "频率直方图", "集中趋势", "方差与标准差"] },
      { topic: "概率", subtopics: ["样本空间图", "条件概率", "韦恩图", "树形图", "独立与互斥事件"] },
      { topic: "统计分布", subtopics: ["二项分布", "正态分布", "泊松分布", "连续性修正", "分布近似"] },
      { topic: "假设检验", subtopics: ["原假设与备择假设", "单尾与双尾检验", "临界域", "p值", "第一类与第二类错误"] },
    ],
    questionTypes: ["数据读取与计算题", "概率树形图构建题", "分布识别与参数应用", "完整假设检验书写（需展示全部步骤）", "临界域确定题", "情境解读题"],
    resources: [
      { id: 5, title: "正态分布表与笔记", type: "PDF", source: "Open Textbook", size: "1.8 MB", approved: true, downloads: 401, tags: ["正态分布", "S1"] },
      { id: 6, title: "假设检验分步指南", type: "PDF", source: "Community Upload", size: "720 KB", approved: true, downloads: 265, tags: ["假设检验", "S2"] },
      { id: 7, title: "概率树形图练习册", type: "PDF", source: "Community Upload", size: "560 KB", approved: true, downloads: 187, tags: ["概率", "S1"] },
    ]
  },
  economics: {
    label: ["经济学", "Economics"], code: "9708", color: "#4a1800", icon: "$",
    examFormat: [
      { paper: "Paper 1 – Multiple Choice (AS)", duration: "1h", marks: 30, weight: "15%", type: "MCQ", desc: "30道选择题，AS级别微观与宏观经济学" },
      { paper: "Paper 2 – Data Response & Essays (AS)", duration: "2h", marks: 60, weight: "25%", type: "Written", desc: "A节：必答数据分析题；B节：二选一论述题（25分）" },
      { paper: "Paper 3 – Multiple Choice (A Level)", duration: "1h", marks: 30, weight: "15%", type: "MCQ", desc: "30道选择题，A-Level全部内容" },
      { paper: "Paper 4 – Data Response & Essays (A Level)", duration: "2h 15m", marks: 70, weight: "45%", type: "Written", desc: "A节：必答题；B、C节各选一道论述题" },
    ],
    syllabus: [
      { topic: "微观经济学", subtopics: ["供需分析", "价格/收入/交叉弹性", "消费者与生产者剩余", "市场结构", "劳动力市场", "市场失灵与外部性", "政府干预"] },
      { topic: "宏观经济学", subtopics: ["国民收入核算(GDP)", "AD/AS模型", "失业类型", "通货膨胀与通缩", "经济增长与商业周期", "国际收支", "汇率制度", "货币与财政政策"] },
      { topic: "国际经济学", subtopics: ["比较优势", "自由贸易与保护主义", "贸易壁垒", "经常账户赤字", "汇率制度管理", "IMF、世界银行与WTO"] },
      { topic: "发展经济学", subtopics: ["发展指标（HDI）", "贫困与不平等", "发展障碍", "发展政策（贸易、援助、外资）"] },
    ],
    questionTypes: ["选择题（四选一最佳答案）", "数据分析题（含计算）", "25分论述题（需双边分析与评价）", "图形绘制与标注", "2-3分定义题", "政策评估题（结合经济理论）"],
    resources: [
      { id: 8, title: "需求价格弹性完整笔记", type: "PDF", source: "Open Textbook", size: "1.2 MB", approved: true, downloads: 312, tags: ["弹性", "微观"] },
      { id: 9, title: "宏观经济指标详解", type: "PDF", source: "Community Upload", size: "980 KB", approved: true, downloads: 244, tags: ["宏观", "笔记"] },
      { id: 10, title: "市场失灵案例分析", type: "PDF", source: "Community Upload", size: "1.5 MB", approved: false, downloads: 0, tags: ["市场失灵", "论述"] },
    ]
  },
  furtherMaths: {
    label: ["进阶数学", "Further Maths"], code: "9231", color: "#2e0854", icon: "∞",
    examFormat: [
      { paper: "Paper 1 – Further Pure Mathematics 1", duration: "2h", marks: 80, weight: "~35%", type: "Written", desc: "10–12题，多项式根、矩阵、极坐标、级数" },
      { paper: "Paper 2 – Further Pure Mathematics 2", duration: "2h", marks: 80, weight: "~35%", type: "Written", desc: "10–12题，双曲函数、高阶微积分、复数、特征值" },
      { paper: "Paper 3 – Further Mechanics", duration: "1h 30m", marks: 60, weight: "~30%", type: "Written", desc: "6–8题，圆周运动、弹性绳、简谐运动" },
      { paper: "Paper 4 – Further Statistics", duration: "1h 30m", marks: 60, weight: "~30%", type: "Written", desc: "6–8题，估计、卡方检验、非参数检验" },
    ],
    syllabus: [
      { topic: "Further Pure 1", subtopics: ["多项式根（根之和/积）", "有理函数与斜渐近线", "级数求和", "矩阵(2×2, 3×3)", "极坐标曲线", "三维向量（直线与平面）", "数学归纳法"] },
      { topic: "Further Pure 2", subtopics: ["双曲函数", "进阶积分法（递推公式）", "进阶微分方程", "复数（棣莫弗定理）", "矩阵特征值与特征向量", "麦克劳林与泰勒级数"] },
      { topic: "Further Mechanics", subtopics: ["匀速圆周运动", "非匀速圆周运动", "弹性绳与弹簧（胡克定律）", "简谐运动方程与能量", "变加速运动学"] },
      { topic: "Further Statistics", subtopics: ["概率生成函数", "无偏估计量", "卡方检验（拟合优度与关联性）", "威尔科克森符号秩检验", "独立随机变量的组合"] },
    ],
    questionTypes: ["扩展形式证明（多步骤）", "极坐标曲线绘制与解读", "矩阵变换与特征值题", ""证明"、"验证"与"推导"结构题", "带边界条件的常微分方程求解", "完整统计检验书写"],
    resources: [
      { id: 11, title: "复数与阿根图", type: "PDF", source: "Open Textbook", size: "1.6 MB", approved: true, downloads: 198, tags: ["复数", "FP1"] },
      { id: 12, title: "矩阵运算练习", type: "PDF", source: "Community Upload", size: "840 KB", approved: true, downloads: 152, tags: ["矩阵", "FP1"] },
      { id: 13, title: "数学归纳法例题", type: "PDF", source: "Open Textbook", size: "620 KB", approved: true, downloads: 209, tags: ["证明", "FP1"] },
    ]
  }
};

// ─── QUIZ DATA ────────────────────────────────────────────────────────────────
const quizData = {
  mathematics: {
    "Differentiation 微分": [
      { q: "f(x) = x³ + 2x² − 5x + 1，求 f'(x)？", opts: ["3x² + 4x − 5", "3x² + 2x − 5", "x² + 4x − 5", "3x³ + 4x − 5"], ans: 0, exp: "幂法则 d/dx(xⁿ)=nxⁿ⁻¹：3x² + 4x − 5。", expEN: "Power rule d/dx(xⁿ)=nxⁿ⁻¹: 3x² + 4x − 5." },
      { q: "y = sin(3x)，求 dy/dx？", opts: ["cos(3x)", "3cos(3x)", "−3cos(3x)", "sin(3x)/3"], ans: 1, exp: "链式法则：dy/dx = 3cos(3x)。", expEN: "Chain rule: dy/dx = 3cos(3x)." },
      { q: "y = eˣ 在 x = 0 处的梯度是？", opts: ["0", "e", "1", "∞"], ans: 2, exp: "d/dx(eˣ)=eˣ，代入 x=0 得 e⁰=1。", expEN: "d/dx(eˣ)=eˣ, at x=0: e⁰=1." },
      { q: "微分 y = ln(x²)？", opts: ["1/x²", "2/x", "2x", "1/(2x)"], ans: 1, exp: "ln(x²)=2ln(x)，故 dy/dx=2/x。", expEN: "ln(x²)=2ln(x), so dy/dx=2/x." },
    ],
    "Integration 积分": [
      { q: "∫(3x² + 2) dx = ？", opts: ["x³ + 2x + C", "6x + C", "x³ + C", "3x + 2x + C"], ans: 0, exp: "逐项积分：x³ + 2x + C。", expEN: "Integrate term by term: x³ + 2x + C." },
      { q: "∫sin(x) dx = ？", opts: ["cos(x)+C", "−cos(x)+C", "sin(x)+C", "−sin(x)+C"], ans: 1, exp: "sin(x) 的积分为 −cos(x)+C。", expEN: "Integral of sin(x) is −cos(x)+C." },
      { q: "计算 ∫₀² 2x dx？", opts: ["2", "4", "8", "1"], ans: 1, exp: "[x²]₀² = 4−0 = 4。", expEN: "[x²]₀² = 4−0 = 4." },
    ],
    "Trigonometry 三角函数": [
      { q: "sin²θ + cos²θ = ？", opts: ["0", "2", "1", "sinθcosθ"], ans: 2, exp: "勾股恒等式，恒等于 1。", expEN: "Pythagorean identity, always equals 1." },
      { q: "在 0≤x≤360° 内解 sin(x) = 1/2？", opts: ["仅30°", "30° 和 150°", "60° 和 120°", "仅150°"], ans: 1, exp: "sin(x)=0.5 在 x=30° 和 x=150° 处成立。", expEN: "sin(x)=0.5 at x=30° and x=150°." },
    ],
  },
  statistics: {
    "Normal Distribution 正态分布": [
      { q: "X~N(μ,σ²)，均值±1σ范围内约有多少数据？", opts: ["68%", "95%", "99.7%", "50%"], ans: 0, exp: "经验法则：±1σ≈68%，±2σ≈95%，±3σ≈99.7%。", expEN: "Empirical rule: ±1σ≈68%, ±2σ≈95%." },
      { q: "X~N(10,4)，求 P(X<10)？", opts: ["0.25", "0.75", "0.5", "无法确定"], ans: 2, exp: "正态分布关于均值对称，P(X<μ)=0.5。", expEN: "By symmetry, P(X<μ)=0.5." },
    ],
    "Hypothesis Testing 假设检验": [
      { q: "假设检验中，"显著性水平"是指？", opts: ["原假设为真的概率", "H₀为真时错误拒绝的概率（第一类错误）", "H₁正确的概率", "p值的阈值"], ans: 1, exp: "显著性水平 α = P(第一类错误) = P(拒绝H₀|H₀为真)。", expEN: "α = P(Type I error) = P(reject H₀|H₀ true)." },
      { q: "5%显著性水平下，p值=0.03，应该？", opts: ["不能拒绝H₀", "拒绝H₀", "确定接受H₁", "结果不确定"], ans: 1, exp: "p=0.03<0.05，在5%水平下拒绝H₀。", expEN: "p=0.03<0.05, reject H₀ at 5% level." },
    ],
    "Probability 概率": [
      { q: "P(A)=0.4，P(B)=0.3，A与B独立，求P(A∩B)？", opts: ["0.7", "0.12", "0.1", "0.58"], ans: 1, exp: "独立事件：P(A∩B)=P(A)×P(B)=0.4×0.3=0.12。", expEN: "Independent: P(A∩B)=0.4×0.3=0.12." },
    ],
  },
  economics: {
    "Microeconomics 微观经济学": [
      { q: "需求价格弹性 PED=−2，该需求属于？", opts: ["缺乏弹性", "富有弹性", "单位弹性", "完全无弹性"], ans: 1, exp: "|PED|>1 为富有弹性，消费者对价格变化敏感。", expEN: "|PED|>1 means elastic demand." },
      { q: "哪种市场结构只有一个卖家且进入壁垒极高？", opts: ["完全竞争", "寡头垄断", "垄断", "垄断性竞争"], ans: 2, exp: "垄断：单一卖家，产品唯一，极高进入壁垒。", expEN: "Monopoly: one seller, unique product, high barriers." },
      { q: "负外部性导致市场？", opts: ["产量不足", "产量过多", "达到社会最优", "关闭"], ans: 1, exp: "负外部性：私人成本<社会成本，导致过度生产。", expEN: "Negative externality: private cost < social cost → over-production." },
    ],
    "Macroeconomics 宏观经济学": [
      { q: "以下哪项会使AD曲线右移？", opts: ["增加所得税", "提高利率", "增加政府支出", "通缩预期"], ans: 2, exp: "政府支出增加直接提升总需求（AD=C+I+G+NX）。", expEN: "Higher G directly increases AD=C+I+G+NX." },
      { q: "乘数效应是指？", opts: ["投资变动对GDP产生更大倍数的影响", "高税收增加产出", "货币政策比财政政策更有效", "通胀降低实际GDP"], ans: 0, exp: "乘数：自主支出变动引起GDP更大幅度的变动。", expEN: "Multiplier: autonomous expenditure change → larger GDP change." },
    ],
  },
  furtherMaths: {
    "Complex Numbers 复数": [
      { q: "z = 3+4i，求|z|？", opts: ["5", "7", "√7", "25"], ans: 0, exp: "|z|=√(3²+4²)=√25=5。", expEN: "|z|=√(3²+4²)=√25=5." },
      { q: "i² = ？", opts: ["1", "i", "−1", "−i"], ans: 2, exp: "由定义 i=√(−1)，故 i²=−1。", expEN: "By definition i=√(−1), so i²=−1." },
    ],
    "Matrices 矩阵": [
      { q: "2×2矩阵M，det(M)=0，则M是？", opts: ["可逆矩阵", "奇异矩阵（不可逆）", "正交矩阵", "对称矩阵"], ans: 1, exp: "行列式为0 → 奇异矩阵，无逆矩阵。", expEN: "det=0 → singular matrix, no inverse." },
      { q: "[[2,3],[1,4]] 的行列式是？", opts: ["5", "8", "11", "−5"], ans: 0, exp: "det=(2×4)−(3×1)=8−3=5。", expEN: "det=(2×4)−(3×1)=8−3=5." },
    ],
  }
};

// ─── FLASHCARD DATA ───────────────────────────────────────────────────────────
const flashData = {
  mathematics: [
    { front: "Chain Rule 链式法则", back: "d/dx[f(g(x))] = f'(g(x)) · g'(x)\n\n例：d/dx[sin(x²)] = cos(x²)·2x = 2x·cos(x²)" },
    { front: "Product Rule 乘积法则", back: "d/dx[uv] = u'v + uv'\n\n例：d/dx[x·eˣ] = eˣ + x·eˣ = eˣ(1+x)" },
    { front: "Integration by Parts\n分部积分法", back: "∫u dv = uv − ∫v du\n\n选u遵循 LIATE 原则：\nLogarithm → Inverse trig → Algebra → Trig → Exponential" },
    { front: "Quotient Rule 商法则", back: "d/dx[u/v] = (u'v − uv') / v²\n\n例：d/dx[sinx/x] = (xcosx−sinx)/x²" },
    { front: "sin²x + cos²x = ?", back: "= 1\n（勾股恒等式 Pythagorean Identity）\n\n推论：\n• 1 + tan²x = sec²x\n• 1 + cot²x = csc²x" },
    { front: "∫eˣ dx = ?", back: "= eˣ + C\n\n（指数函数积分不变）\n∫eᵃˣ dx = eᵃˣ/a + C" },
  ],
  statistics: [
    { front: "Normal Distribution\n正态分布记法", back: "X ~ N(μ, σ²)\n\n经验法则（68-95-99.7）：\n• 68% within ±1σ\n• 95% within ±2σ\n• 99.7% within ±3σ" },
    { front: "Hypothesis Test\n假设检验完整步骤", back: "1. 建立 H₀ 和 H₁\n2. 确定显著性水平 α\n3. 计算检验统计量\n4. 求p值或临界域\n5. 比较并用完整语言作出结论" },
    { front: "Type I & II Errors\n两类错误", back: "• 第一类错误：H₀为真时拒绝H₀\n  P(Type I) = α（显著性水平）\n\n• 第二类错误：H₀为假时接受H₀\n  P(Type II) = β" },
    { front: "PCC 相关系数 r", back: "−1 ≤ r ≤ 1\n\nr=1：完全正相关\nr=−1：完全负相关\nr=0：无线性相关\n\n|r|>0.8 通常视为强相关" },
  ],
  economics: [
    { front: "PED 需求价格弹性", back: "PED = %ΔQd ÷ %ΔP\n\n|PED|>1：富有弹性（Elastic）\n|PED|<1：缺乏弹性（Inelastic）\n|PED|=1：单位弹性\n|PED|=0：完全无弹性\n|PED|=∞：完全弹性" },
    { front: "Multiplier 乘数", back: "k = 1/(1−MPC) = 1/MPS\n\n例：MPC=0.8 → k=5\n政府增加支出1元，GDP增加5元\n\n（AD=C+I+G+NX）" },
    { front: "Externalities 外部性", back: "正外部性：MSB>MPB → 市场供给不足\n  解决：政府补贴\n\n负外部性：MSC>MPC → 市场产量过多\n  解决：税收、法规、排污权交易" },
    { front: "AD/AS 模型", back: "AD = C + I + G + (X−M)\n\nAD右移：↑G, ↓税, ↓利率, ↑出口\nSRAS右移：↓工资, ↓原材料价格\nLRAS：由生产潜力决定（垂直）" },
    { front: "Market Structures\n市场结构比较", back: "完全竞争：P=MC，长期零利润，最优效率\n垄断：P>MC，产量低，存在超额利润\n寡头：相互依存，价格刚性，纳什均衡" },
  ],
  furtherMaths: [
    { front: "Complex Number Modulus\n复数的模", back: "z = a + bi\n|z| = √(a² + b²)\n\n例：|3+4i| = √(9+16) = 5\n\narg(z) = arctan(b/a)（注意象限）" },
    { front: "De Moivre's Theorem\n棣莫弗定理", back: "[r(cosθ+i sinθ)]ⁿ = rⁿ(cos nθ + i sin nθ)\n\n应用：求复数的n次幂和n次方根" },
    { front: "Matrix Determinant\n矩阵行列式", back: "2×2: det[[a,b],[c,d]] = ad−bc\n\n若 det=0 → 奇异矩阵（不可逆）\n若 det≠0 → 可逆，逆矩阵 = adj/det" },
    { front: "Proof by Induction\n数学归纳法", back: "1. 基础步骤：证明 n=1 成立\n2. 归纳假设：设 n=k 时成立\n3. 归纳步骤：证明 n=k+1 时成立\n4. 结论：由归纳法，命题对所有正整数n成立" },
  ]
};

// ─── AI RESPONSES ─────────────────────────────────────────────────────────────
const aiKB = [
  { keys: ["integrat","积分","∫","分部"], ans: "**Integration 积分**\n\n基本公式：\n• ∫xⁿ dx = xⁿ⁺¹/(n+1) + C\n• ∫eˣ dx = eˣ + C\n• ∫sin x dx = −cos x + C\n• ∫cos x dx = sin x + C\n• ∫1/x dx = ln|x| + C\n\n**分部积分（Integration by Parts）：**\n∫u dv = uv − ∫v du\n\n选择 u 遵循 **LIATE** 原则：\nLogarithm → Inverse trig → Algebraic → Trig → Exponential\n\n💡 例：∫x·eˣ dx\n令 u=x，dv=eˣdx → du=dx，v=eˣ\n∫x·eˣ dx = xeˣ − eˣ + C = eˣ(x−1) + C" },
  { keys: ["different","导数","微分","chain","链式","product","乘积","quotient","商法则"], ans: "**Differentiation 微分**\n\n四大核心法则：\n\n• **幂法则（Power Rule）：** d/dx(xⁿ) = nxⁿ⁻¹\n• **链式法则（Chain Rule）：** d/dx[f(g(x))] = f'(g(x))·g'(x)\n• **乘积法则（Product Rule）：** d/dx[uv] = u'v + uv'\n• **商法则（Quotient Rule）：** d/dx[u/v] = (u'v − uv')/v²\n\n常用导数：\n• d/dx(eˣ) = eˣ\n• d/dx(ln x) = 1/x\n• d/dx(sin x) = cos x\n• d/dx(cos x) = −sin x\n\n💡 例：y = sin(x²)\n链式法则：dy/dx = cos(x²)·2x = 2x·cos(x²)" },
  { keys: ["ped","弹性","elastic","elasticity","需求价格"], ans: "**Price Elasticity of Demand (PED) 需求价格弹性**\n\nPED = %ΔQd ÷ %ΔP\n\n**判断标准：**\n• |PED| > 1 → 富有弹性（消费者敏感）\n• |PED| < 1 → 缺乏弹性（消费者不敏感）\n• |PED| = 1 → 单位弹性\n\n**影响弹性的因素：**\n• 替代品数量：替代品越多，弹性越大\n• 必需品 vs 奢侈品：必需品弹性更小\n• 时间：长期弹性通常更大\n• 收入占比：比例越大，弹性越大\n\n💡 考试提示：画图时标注 P、Q 轴，弹性需求曲线较平，无弹性较陡。" },
  { keys: ["normal","正态","distribution","分布","n(μ","n(u"], ans: "**Normal Distribution 正态分布**\n\nX ~ N(μ, σ²)\n• μ = 均值（mean）\n• σ² = 方差（variance）\n• σ = 标准差（standard deviation）\n\n**经验法则（68-95-99.7 Rule）：**\n• P(μ−σ < X < μ+σ) ≈ 68%\n• P(μ−2σ < X < μ+2σ) ≈ 95%\n• P(μ−3σ < X < μ+3σ) ≈ 99.7%\n\n**标准化（Standardisation）：**\nZ = (X − μ) / σ，Z ~ N(0,1)\n\n💡 考试技巧：先画出正态曲线，标注均值和目标值，再确定面积方向，查表时注意是否需要对称处理。" },
  { keys: ["hypothesis","假设","h0","h1","检验","significance","显著"], ans: "**Hypothesis Testing 假设检验**\n\n**完整答题步骤（必须全部写出）：**\n\n1️⃣ 建立假设\n   H₀（原假设）和 H₁（备择假设）\n\n2️⃣ 确定显著性水平 α（通常5%或1%）\n\n3️⃣ 计算检验统计量\n\n4️⃣ 判断：p值与α比较\n   • p < α → 拒绝 H₀\n   • p ≥ α → 不能拒绝 H₀\n\n5️⃣ 结论（必须联系原始情境）\n   写法：'There is/is not sufficient evidence to suggest that...'\n\n**两类错误：**\n• Type I（第一类）：H₀为真却拒绝，概率 = α\n• Type II（第二类）：H₀为假却接受，概率 = β\n\n⚠️ 切勿写"prove"或"accept H₁"！" },
  { keys: ["matrix","矩阵","determinant","行列式","eigenvalue","特征值"], ans: "**Matrices 矩阵**\n\n**2×2 行列式：**\ndet[[a,b],[c,d]] = ad − bc\n\n**逆矩阵（det ≠ 0 时）：**\n[[a,b],[c,d]]⁻¹ = (1/det)·[[d,−b],[−c,a]]\n\n**常用变换矩阵：**\n• 旋转θ角：[[cosθ,−sinθ],[sinθ,cosθ]]\n• 关于x轴反射：[[1,0],[0,−1]]\n• 关于y轴反射：[[−1,0],[0,1]]\n• 放大k倍：[[k,0],[0,k]]\n\n**特征值（Eigenvalues）：**\ndet(M − λI) = 0，解出 λ，再求对应特征向量" },
  { keys: ["complex","复数","argand","modulus","模","argument","辐角","moivre","棣莫弗"], ans: "**Complex Numbers 复数**\n\nz = a + bi，i = √(−1)\n\n**基本运算：**\n• 模：|z| = √(a²+b²)\n• 辐角：arg(z) = arctan(b/a)（注意象限）\n• 共轭：z* = a − bi\n• z·z* = |z|²\n\n**极坐标形式：**\nz = r(cosθ + i sinθ) = re^(iθ)\n\n**棣莫弗定理（De Moivre's）：**\nzⁿ = rⁿ(cos nθ + i sin nθ)\n\n💡 求n次方根：有n个不同解，辐角间隔 2π/n" },
  { keys: ["multiplier","乘数","mpc","mps","fiscal","财政"], ans: "**Multiplier Effect 乘数效应**\n\n乘数 k = 1/(1−MPC) = 1/MPS\n\n其中：\n• MPC = 边际消费倾向（增加收入中用于消费的比例）\n• MPS = 边际储蓄倾向 = 1 − MPC\n\n**例：** MPC = 0.75\n→ k = 1/(1−0.75) = 1/0.25 = **4**\n→ 政府额外支出100亿元 → GDP增加400亿元\n\n**实际乘数更小，因为：**\n• 部分收入用于进口（漏出）\n• 部分用于缴税\n• 通货膨胀会抵消实际增长\n\n💡 考试常考：计算乘数 + 解释为何实际效果小于理论值" },
];

const getAIResp = (q) => {
  const ql = q.toLowerCase();
  for (const r of aiKB) {
    if (r.keys.some(k => ql.includes(k))) return r.ans;
  }
  return "**感谢提问！**\n\n这是个好问题。您可以尝试提问以下主题：\n\n📐 **数学：** 微分、积分、三角函数、向量\n📊 **统计：** 正态分布、假设检验、二项分布\n💰 **经济：** PED弹性、乘数效应、市场失灵、AD/AS\n∞ **进阶数学：** 复数、矩阵、数学归纳法\n\n---\n*提示：用关键词提问效果更好，例如「链式法则怎么用？」或「解释PED弹性」*";
};

// ─── PENDING UPLOADS ──────────────────────────────────────────────────────────
const initPending = [
  { id: 4, title: "数值方法例题解析", subject: "数学", uploader: "student_ax92", date: "2026-04-18", size: "1.3 MB" },
  { id: 10, title: "市场失灵案例分析", subject: "经济学", uploader: "econ_notes_jb", date: "2026-04-20", size: "1.5 MB" },
  { id: 14, title: "微分方程总结", subject: "进阶数学", uploader: "fm_revision_hk", date: "2026-04-21", size: "790 KB" },
];

// ─── OPEN TOOLS ───────────────────────────────────────────────────────────────
const openTools = [
  { title: "Khan Academy", desc: "免费视频课程与练习，覆盖所有科目", icon: "▶", color: "#0d4f3c" },
  { title: "Desmos", desc: "在线交互式图形计算器", icon: "◈", color: "#0f2d5c" },
  { title: "GeoGebra", desc: "动态数学可视化与几何工具", icon: "⬡", color: "#4a1800" },
  { title: "Wolfram Alpha", desc: "分步骤符号运算引擎", icon: "Ω", color: "#2e0854" },
  { title: "NRICH Mathematics", desc: "剑桥大学数学拓展题库", icon: "◉", color: "#0d4f3c" },
  { title: "Physics & Maths Tutor", desc: "历年真题、评分标准与复习笔记", icon: "✦", color: "#4a1800" },
  { title: "Core Economics", desc: "免费开放获取经济学教材", icon: "◎", color: "#0f2d5c" },
  { title: "Mathswatch", desc: "视频讲解与在线练习题", icon: "◑", color: "#2e0854" },
];

// ─── ACCORDION ────────────────────────────────────────────────────────────────
function Accordion({ section, color }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #e4e0d6" }}>
      <div onClick={() => setOpen(o => !o)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", cursor: "pointer" }}>
        <span style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 16, fontWeight: 600 }}>{section.topic}</span>
        <span style={{ fontSize: 20, color: "#bbb", transform: open ? "rotate(45deg)" : "none", transition: "transform .2s", display: "inline-block" }}>+</span>
      </div>
      {open && (
        <div style={{ paddingBottom: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
          {section.subtopics.map((st, i) => (
            <span key={i} style={{ padding: "4px 12px", borderRadius: 20, border: `1.5px solid ${color}50`, color, fontSize: 12, background: color + "0e", fontFamily: "'Noto Sans SC',sans-serif" }}>{st}</span>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [ln, setLn] = useState(0);
  const [view, setView] = useState("home");
  const [activeSubject, setActiveSubject] = useState(null);
  const [subjectTab, setSubjectTab] = useState("resources");
  const [examTab, setExamTab] = useState("dates");
  const [adminMode, setAdminMode] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({ title: "", subject: "mathematics", topic: "" });
  const [uploadOK, setUploadOK] = useState(false);
  const [pending, setPending] = useState(initPending);
  const [actions, setActions] = useState({ approved: 0, rejected: 0 });
  const [quizState, setQuizState] = useState(null);
  const [flashState, setFlashState] = useState(null);
  const [aiMsgs, setAiMsgs] = useState([{ role: "ai", text: "你好！我是您的 A-Level AI 学习助手。\n\n您可以问我关于数学、统计学、经济学或进阶数学的任何问题！\n\nHello! Ask me anything about A-Level Maths, Stats, Economics or Further Maths!" }]);
  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [progress, setProgress] = useState({ totalQ: 0, correct: 0, streak: 3, bySubject: { mathematics:{done:12,correct:9}, statistics:{done:8,correct:6}, economics:{done:15,correct:11}, furtherMaths:{done:5,correct:3} } });
  const [searchQ, setSearchQ] = useState("");
  const aiEnd = useRef(null);

  useEffect(() => { aiEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [aiMsgs]);

  const subjectKeys = Object.keys(subjects);
  const curS = activeSubject ? subjects[activeSubject] : null;
  const allApproved = Object.values(subjects).flatMap(s => s.resources.filter(r => r.approved));
  const filteredRes = searchQ.length > 1 ? allApproved.filter(r => r.title.toLowerCase().includes(searchQ.toLowerCase()) || r.tags.some(t => t.includes(searchQ))) : [];
  const totalDone = Object.values(progress.bySubject).reduce((a, b) => a + b.done, 0);
  const totalCorrect = Object.values(progress.bySubject).reduce((a, b) => a + b.correct, 0);
  const accuracy = totalDone > 0 ? Math.round((totalCorrect / totalDone) * 100) : 0;

  // Admin
  const handleLogin = () => {
    if (loginUser === ADMIN_USER && loginPass === ADMIN_PASS) {
      setAdminMode(true); setShowAdminLogin(false); setLoginError(false); setLoginUser(""); setLoginPass(""); setView("admin");
    } else setLoginError(true);
  };
  const approve = id => { setActions(a => ({ ...a, approved: a.approved + 1 })); setPending(p => p.filter(u => u.id !== id)); };
  const reject  = id => { setActions(a => ({ ...a, rejected: a.rejected + 1 })); setPending(p => p.filter(u => u.id !== id)); };

  // Upload
  const doUpload = () => {
    if (!uploadForm.title) return;
    setUploadOK(true);
    setTimeout(() => { setUploadOK(false); setUploadModal(false); setUploadForm({ title: "", subject: "mathematics", topic: "" }); }, 2400);
  };

  // Quiz
  const startQuiz = (sk, tk) => {
    const pool = tk === "__all__" ? Object.values(quizData[sk]).flat() : quizData[sk][tk] || [];
    const qs = [...pool].sort(() => Math.random() - 0.5).slice(0, Math.min(8, pool.length));
    setQuizState({ sk, tk, qs, idx: 0, sel: null, answered: false, score: 0, done: false });
  };
  const selectAns = (i) => {
    if (quizState.answered) return;
    const ok = i === quizState.qs[quizState.idx].ans;
    setQuizState(q => ({ ...q, sel: i, answered: true, score: ok ? q.score + 1 : q.score }));
    setProgress(p => ({ ...p, totalQ: p.totalQ + 1, correct: ok ? p.correct + 1 : p.correct, bySubject: { ...p.bySubject, [quizState.sk]: { done: p.bySubject[quizState.sk].done + 1, correct: ok ? p.bySubject[quizState.sk].correct + 1 : p.bySubject[quizState.sk].correct } } }));
  };
  const nextQ = () => quizState.idx + 1 >= quizState.qs.length ? setQuizState(q => ({ ...q, done: true })) : setQuizState(q => ({ ...q, idx: q.idx + 1, sel: null, answered: false }));

  // Flash
  const startFlash = (sk) => {
    const cards = [...(flashData[sk] || [])].sort(() => Math.random() - 0.5);
    setFlashState({ sk, cards, idx: 0, flipped: false, known: 0, unknown: 0, done: false });
  };
  const cardAns = (knew) => {
    const next = flashState.idx + 1;
    if (next >= flashState.cards.length) setFlashState(f => ({ ...f, done: true, known: f.known + (knew?1:0), unknown: f.unknown + (knew?0:1) }));
    else setFlashState(f => ({ ...f, idx: next, flipped: false, known: f.known + (knew?1:0), unknown: f.unknown + (knew?0:1) }));
  };

  // AI
  const sendAI = async () => {
    if (!aiInput.trim()) return;
    const q = aiInput.trim(); setAiMsgs(m => [...m, { role: "user", text: q }]); setAiInput(""); setAiLoading(true);
    await new Promise(r => setTimeout(r, 800 + Math.random() * 700));
    setAiMsgs(m => [...m, { role: "ai", text: getAIResp(q) }]); setAiLoading(false);
  };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&family=Noto+Sans+SC:wght@300;400;500;600&family=JetBrains+Mono:wght@400;600&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{--bg:#f4f1eb;--bg2:#edead f;--w:#fff;--br:#d9d4c7;--tx:#1a1a1e;--mu:#666;--fa:#aaa}
    body{background:#f4f1eb;font-family:'Noto Serif SC',Georgia,serif}
    .ss{font-family:'Noto Sans SC','DM Sans',sans-serif}
    .mo{font-family:'JetBrains Mono',monospace}
    .cap{font-family:'Noto Sans SC',sans-serif;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#aaa}
    .fd{animation:fd .45s cubic-bezier(.22,1,.36,1) both}
    @keyframes fd{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
    .s1{animation-delay:.04s}.s2{animation-delay:.1s}.s3{animation-delay:.16s}.s4{animation-delay:.22s}
    .btn{cursor:pointer;border:none;font-family:'Noto Sans SC',sans-serif;font-weight:600;font-size:13px;border-radius:3px;transition:all .16s}
    .dk{background:#1a1a1e;color:#f4f1eb;padding:10px 24px}.dk:hover{background:#2d2d33}
    .gh{background:transparent;color:#1a1a1e;border:1.5px solid #1a1a1e;padding:9px 22px}.gh:hover{background:#1a1a1e;color:#f4f1eb}
    .sm{padding:6px 15px;font-size:11px}
    .ap{background:#0d4f3c;color:#fff;padding:7px 17px}.ap:hover{background:#0a3d2e}
    .rj{background:transparent;color:#b91c1c;border:1.5px solid #b91c1c;padding:7px 17px}.rj:hover{background:#b91c1c;color:#fff}
    .card{background:#fff;border:1px solid #d9d4c7;border-radius:4px}
    .np{cursor:pointer;font-family:'Noto Sans SC',sans-serif;font-size:12.5px;font-weight:500;color:#666;padding:5px 2px;border-bottom:2px solid transparent;transition:all .18s;white-space:nowrap}
    .np:hover{color:#1a1a1e}.np.on{color:#1a1a1e;border-bottom-color:#1a1a1e}
    .tab{cursor:pointer;padding:10px 20px;font-family:'Noto Sans SC',sans-serif;font-size:12px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:#888;border-bottom:2.5px solid transparent;margin-bottom:-1.5px;transition:all .18s}
    .tab:hover{color:#1a1a1e}.tab.on{color:#1a1a1e;border-bottom-color:#1a1a1e}
    .tb{display:flex;border-bottom:1.5px solid #d9d4c7;gap:0;margin-bottom:26px}
    .inp{width:100%;border:1.5px solid #d9d4c7;border-radius:3px;padding:10px 14px;font-family:'Noto Sans SC',sans-serif;font-size:14px;background:#fff;outline:none;transition:border-color .18s;color:#1a1a1e;resize:none}
    .inp:focus{border-color:#1a1a1e}
    .opt{width:100%;text-align:left;padding:13px 18px;border:1.5px solid #d9d4c7;border-radius:3px;background:#fff;cursor:pointer;font-family:'Noto Sans SC',sans-serif;font-size:14px;color:#1a1a1e;transition:all .15s;margin-bottom:8px}
    .opt:hover:not(:disabled){border-color:#888;background:#faf8f3}
    .oc{border-color:#0d4f3c!important;background:#e8f5ef!important;color:#0d4f3c!important}
    .ow{border-color:#b91c1c!important;background:#fef2f2!important;color:#b91c1c!important}
    .od{border-color:#ccc!important;background:#f9f8f5!important;color:#bbb!important}
    .tg{display:inline-block;padding:2px 9px;border-radius:20px;font-size:11px;font-family:'Noto Sans SC',sans-serif;background:rgba(0,0,0,.06);color:#555;margin-right:4px}
    .rr{border-bottom:1px solid #d9d4c7;padding:14px 0;transition:background .14s}
    .rr:last-child{border-bottom:none}.rr:hover{background:rgba(0,0,0,.016)}
    .sc2{cursor:pointer;border-radius:4px;padding:26px 24px;color:#fff;position:relative;overflow:hidden;transition:transform .24s,box-shadow .24s}
    .sc2:hover{transform:translateY(-4px);box-shadow:0 14px 40px rgba(0,0,0,.15)}
    .bn{font-family:'Noto Serif SC',serif;font-size:90px;font-weight:700;opacity:.07;position:absolute;right:12px;bottom:-10px;line-height:1;user-select:none;pointer-events:none}
    .pb{height:8px;background:#ede9e0;border-radius:10px;overflow:hidden}
    .pbf{height:100%;border-radius:10px;transition:width .6s cubic-bezier(.22,1,.36,1)}
    .fl{perspective:1000px;cursor:pointer}
    .fli{position:relative;width:100%;min-height:240px;transition:transform .55s cubic-bezier(.22,1,.36,1);transform-style:preserve-3d}
    .fli.fp{transform:rotateY(180deg)}
    .ff{position:absolute;inset:0;backface-visibility:hidden;display:flex;align-items:center;justify-content:center;border-radius:4px;padding:28px}
    .fb{transform:rotateY(180deg)}
    .ai-w{border-radius:14px;padding:13px 18px;max-width:88%;font-family:'Noto Sans SC',sans-serif;font-size:14px;line-height:1.8;white-space:pre-wrap}
    .ai-a{background:#f0ede5;color:#1a1a1e;border-radius:14px 14px 14px 2px}
    .ai-u{background:#1a1a1e;color:#f4f1eb;border-radius:14px 14px 2px 14px;margin-left:auto}
    .et{width:100%;border-collapse:collapse}
    .et th{font-family:'Noto Sans SC',sans-serif;font-size:10px;letter-spacing:.13em;text-transform:uppercase;color:#aaa;padding:11px 16px;text-align:left;border-bottom:1.5px solid #d9d4c7}
    .et td{font-family:'Noto Sans SC',sans-serif;font-size:13.5px;padding:13px 16px;border-bottom:1px solid #d9d4c7;vertical-align:top}
    .et tr:last-child td{border-bottom:none}
    .et tbody tr:hover td{background:rgba(0,0,0,.016)}
    .chip{display:inline-block;padding:4px 11px;border-radius:20px;border:1px solid rgba(255,255,255,.28);font-family:'Noto Sans SC',sans-serif;font-size:11px;color:rgba(255,255,255,.82);margin:3px;transition:background .18s}
    .chip:hover{background:rgba(255,255,255,.14)}
    .overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;z-index:200;backdrop-filter:blur(3px)}
    .modal{background:#f4f1eb;border:1px solid #d9d4c7;border-radius:4px;padding:40px;width:490px;max-width:96vw;max-height:92vh;overflow-y:auto}
    .hr{height:1px;background:#d9d4c7;margin:26px 0}
    .lt{cursor:pointer;font-family:'Noto Sans SC',sans-serif;font-size:12px;padding:4px 12px;border:1.5px solid #d9d4c7;border-radius:20px;background:transparent;color:#888;transition:all .18s}
    .lt:hover{background:#1a1a1e;color:#f4f1eb;border-color:#1a1a1e}
    ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:#d9d4c7;border-radius:3px}
    @media(max-width:600px){.hide-sm{display:none!important}}
  `;

  return (
    <div style={{ minHeight: "100vh", background: "#f4f1eb", color: "#1a1a1e" }}>
      <style>{css}</style>

      {/* ── HEADER ── */}
      <header style={{ background: "rgba(244,241,235,.95)", borderBottom: "1px solid #d9d4c7", position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(8px)" }}>
        <div style={{ maxWidth: 980, margin: "0 auto", padding: "0 22px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 58 }}>
          <div onClick={() => { setView("home"); setActiveSubject(null); }} style={{ cursor: "pointer", display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 20, fontWeight: 700 }}>A-Level</span>
            <span style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 20, fontWeight: 400, color: "#999" }}>{ln === 0 ? "学习助手" : "Learner"}</span>
          </div>
          <nav style={{ display: "flex", gap: 20, alignItems: "center" }}>
            {[["home", ln===0?"首页":"Home"],["learn", ln===0?"学习":"Learn"],["portal", ln===0?"资源库":"Resources"],["exams", ln===0?"考试":"Exams"],["tools", ln===0?"工具":"Tools"]].map(([k,l]) => (
              <span key={k} className={`np hide-sm ${view===k?"on":""}`} onClick={() => { setView(k); setActiveSubject(null); setQuizState(null); setFlashState(null); }}>{l}</span>
            ))}
            {adminMode
              ? <span className={`np ${view==="admin"?"on":""}`} onClick={() => setView("admin")}>{ln===0?"管理":"Admin"}</span>
              : <span className="np" onClick={() => setShowAdminLogin(true)}>{ln===0?"管理":"Admin"}</span>}
            <button className="btn dk sm" onClick={() => setUploadModal(true)}>+ {ln===0?"上传":"Upload"}</button>
            <button className="lt" onClick={() => setLn(l => 1-l)}>{ln===0?"EN":"中"}</button>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: 980, margin: "0 auto", padding: "40px 22px 90px" }}>

        {/* ══ HOME ══ */}
        {view === "home" && (
          <div>
            <div className="fd" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "start", marginBottom: 52 }}>
              <div>
                <div className="cap" style={{ marginBottom: 16 }}>oliverchow-mse · Cambridge CAIE · 中国大陆</div>
                <h1 style={{ fontFamily: "'Noto Serif SC',serif", fontSize: "clamp(36px,5vw,60px)", fontWeight: 700, lineHeight: 1.1, marginBottom: 18 }}>
                  {ln===0 ? "A-Level\n智能学习平台" : "A-Level\nSmart Learning"}
                </h1>
                <p className="ss" style={{ color: "#666", fontSize: 15, lineHeight: 1.85, maxWidth: 440, marginBottom: 30 }}>
                  {ln===0
                    ? "练习题 · 抽认卡 · AI辅导 · 资源库 · 考试信息\n为课堂辅助教学和自主备考设计，完全免费。"
                    : "Quiz · Flashcards · AI Tutor · Resources · Exam Info\nFor classroom and self-study. Completely free."}
                </p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <button className="btn dk" onClick={() => setView("learn")}>{ln===0?"开始学习":"Start Learning"}</button>
                  <button className="btn gh" onClick={() => setView("exams")}>{ln===0?"考试信息":"Exam Info"}</button>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 120 }}>
                {[{n: totalDone, l: ln===0?"题目完成":"Done"},{n: accuracy+"%", l: ln===0?"正确率":"Accuracy"},{n: progress.streak+"🔥", l: ln===0?"连续天":"Streak"}].map((s,i) => (
                  <div key={i} className={`card fd s${i+1}`} style={{ padding: "14px 16px", textAlign: "center" }}>
                    <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 28, fontWeight: 700, lineHeight: 1 }}>{s.n}</div>
                    <div className="cap" style={{ marginTop: 4 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hr" />
            <div className="cap" style={{ marginBottom: 20 }}>{ln===0?"快速进入":"Quick Access"}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14, marginBottom: 48 }}>
              {subjectKeys.map((k, i) => {
                const s = subjects[k];
                return (
                  <div key={k} className={`sc2 fd s${i+1}`} style={{ background: s.color }}
                    onClick={() => { setActiveSubject(k); setSubjectTab("resources"); setView("portal"); }}>
                    <div className="bn">{s.icon}</div>
                    <div className="cap" style={{ color: "rgba(255,255,255,.38)", marginBottom: 8 }}>{s.code}</div>
                    <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 10 }}>{s.label[ln]}</div>
                    <div className="ss" style={{ fontSize: 11, color: "rgba(255,255,255,.55)" }}>{s.resources.filter(r=>r.approved).length} {ln===0?"资源":"resources"} · {s.examFormat.length} {ln===0?"试卷":"papers"}</div>
                  </div>
                );
              })}
            </div>

            <div style={{ background: "#1a1a1e", borderRadius: 4, padding: "28px 32px", color: "#f4f1eb" }}>
              <div className="cap" style={{ color: "#555", marginBottom: 16 }}>{ln===0?"近期考试时间":"Upcoming Exam Dates"}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 18 }}>
                {examInfo.dates.slice(0, 4).map((d, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 19, fontWeight: 600, marginBottom: 4 }}>{d.date}</div>
                    <div className="ss" style={{ fontSize: 11, color: "#777" }}>{d.session}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 20 }}>
                <button className="btn gh" style={{ borderColor: "#444", color: "#aaa" }} onClick={() => setView("exams")}>{ln===0?"查看完整考试信息 →":"Full Exam Info →"}</button>
              </div>
            </div>
          </div>
        )}

        {/* ══ LEARN HUB ══ */}
        {view === "learn" && !quizState && !flashState && (
          <div className="fd">
            <div className="cap" style={{ marginBottom: 6 }}>{ln===0?"学习模式":"Learning Mode"}</div>
            <h2 style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 32, fontWeight: 700, marginBottom: 6 }}>{ln===0?"选择学习方式":"Choose How to Study"}</h2>
            <p className="ss" style={{ color: "#777", marginBottom: 32, fontSize: 14 }}>{ln===0?"四种模式，全面备考":"Four modes to cover every aspect of your revision"}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 32 }}>
              {[
                { icon:"✏️", t: ln===0?"练习题测试":"Practice Quiz", d: ln===0?"按主题答题，即时反馈与解析":"Topic-based questions with instant explanations", a: () => {} },
                { icon:"🃏", t: ln===0?"知识点抽认卡":"Flashcards", d: ln===0?"快速记忆核心公式和概念":"Rapid memorisation of key concepts", a: () => setFlashState("select") },
                { icon:"📊", t: ln===0?"学习进度":"Progress", d: ln===0?"查看各科目学习数据":"View performance across subjects", a: () => setView("progress") },
                { icon:"🤖", t: "AI " + (ln===0?"辅导":"Tutor"), d: ln===0?"随时提问，获得详细解析":"Ask questions, get detailed explanations", a: () => setView("ai") },
              ].map((m, i) => (
                <div key={i} className={`card fd s${i+1}`} style={{ padding: "22px", cursor: "pointer", transition: "box-shadow .2s" }}
                  onClick={m.a}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,.09)"}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{m.icon}</div>
                  <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 17, fontWeight: 600, marginBottom: 6 }}>{m.t}</div>
                  <div className="ss" style={{ fontSize: 13, color: "#777", lineHeight: 1.55 }}>{m.d}</div>
                </div>
              ))}
            </div>
            <div className="cap" style={{ marginBottom: 16 }}>{ln===0?"选择科目开始练习题":"Choose a subject for Quiz"}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 12 }}>
              {subjectKeys.map((k, i) => {
                const s = subjects[k]; const topics = Object.keys(quizData[k]);
                return (
                  <div key={k}>
                    <div className={`sc2 fd s${i+1}`} style={{ background: s.color, marginBottom: 8 }} onClick={() => startQuiz(k, "__all__")}>
                      <div className="bn">{s.icon}</div>
                      <div className="cap" style={{ color: "rgba(255,255,255,.38)", marginBottom: 6 }}>{s.label[1]}</div>
                      <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 18, fontWeight: 700, color: "#fff" }}>{s.label[ln]}</div>
                      <div className="ss" style={{ fontSize: 11, color: "rgba(255,255,255,.55)", marginTop: 6 }}>{Object.values(quizData[k]).flat().length} {ln===0?"题":"qs"} →</div>
                    </div>
                    {topics.map(t => (
                      <div key={t} className="opt" style={{ marginBottom: 5 }} onClick={() => startQuiz(k, t)}>
                        <span style={{ color: s.color, fontWeight: 700, marginRight: 6 }}>›</span>{t}
                        <span className="ss" style={{ fontSize: 11, color: "#bbb", marginLeft: 6 }}>{quizData[k][t].length} {ln===0?"题":"q"}</span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Flash select */}
        {view === "learn" && flashState === "select" && (
          <div className="fd">
            <span className="ss" style={{ fontSize: 12, color: "#aaa", cursor: "pointer" }} onClick={() => setFlashState(null)}>← {L("back",ln)}</span>
            <h2 style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 28, fontWeight: 700, margin: "16px 0 24px" }}>{ln===0?"选择科目 – 抽认卡":"Select Subject – Flashcards"}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 12 }}>
              {subjectKeys.map((k,i) => {
                const s = subjects[k];
                return (
                  <div key={k} className={`sc2 fd s${i+1}`} style={{ background: s.color }} onClick={() => startFlash(k)}>
                    <div className="bn">{s.icon}</div>
                    <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 18, fontWeight: 700, color: "#fff" }}>{s.label[ln]}</div>
                    <div className="ss" style={{ fontSize: 11, color: "rgba(255,255,255,.55)", marginTop: 6 }}>{flashData[k]?.length||0} {ln===0?"张卡":"cards"}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Quiz active */}
        {view === "learn" && quizState && !quizState.done && (
          <div className="fd">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <span className="ss" style={{ fontSize: 12, color: "#aaa", cursor: "pointer" }} onClick={() => setQuizState(null)}>← {L("back",ln)}</span>
              <span className="ss" style={{ fontSize: 13, color: "#888" }}>{quizState.idx+1} / {quizState.qs.length}</span>
            </div>
            <div style={{ height: 4, background: "#ede9e0", borderRadius: 4, marginBottom: 24, overflow: "hidden" }}>
              <div style={{ height: "100%", background: subjects[quizState.sk].color, width: `${(quizState.idx/quizState.qs.length)*100}%`, transition: "width .4s", borderRadius: 4 }} />
            </div>
            <div className="card" style={{ padding: "26px 26px 22px", marginBottom: 18 }}>
              <div className="cap" style={{ marginBottom: 8 }}>{subjects[quizState.sk].label[ln]}</div>
              <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 18, fontWeight: 600, lineHeight: 1.65 }}>{quizState.qs[quizState.idx].q}</div>
            </div>
            {quizState.qs[quizState.idx].opts.map((opt, i) => {
              let cl = "opt";
              if (quizState.answered) {
                if (i === quizState.qs[quizState.idx].ans) cl += " oc";
                else if (i === quizState.sel) cl += " ow";
                else cl += " od";
              }
              return <button key={i} className={cl} onClick={() => selectAns(i)} disabled={quizState.answered}>
                <span style={{ fontWeight: 700, marginRight: 10, opacity: .45 }}>{"ABCD"[i]}</span>{opt}
              </button>;
            })}
            {quizState.answered && (
              <div className="card fd" style={{ padding: "18px 20px", marginTop: 14, borderLeft: `4px solid ${quizState.sel===quizState.qs[quizState.idx].ans?"#0d4f3c":"#b91c1c"}` }}>
                <div className="ss" style={{ fontWeight: 700, marginBottom: 6, color: quizState.sel===quizState.qs[quizState.idx].ans?"#0d4f3c":"#b91c1c" }}>
                  {quizState.sel===quizState.qs[quizState.idx].ans ? L("correct",ln) : L("wrong",ln)}
                </div>
                <div className="ss" style={{ fontSize: 13, color: "#555", lineHeight: 1.7 }}>
                  {ln===0 ? quizState.qs[quizState.idx].exp : quizState.qs[quizState.idx].expEN}
                </div>
                <div style={{ marginTop: 14 }}><button className="btn dk sm" onClick={nextQ}>{L("next",ln)} →</button></div>
              </div>
            )}
          </div>
        )}

        {/* Quiz done */}
        {view === "learn" && quizState?.done && (
          <div className="fd" style={{ textAlign: "center", paddingTop: 36 }}>
            <div style={{ fontSize: 52, marginBottom: 10 }}>{quizState.score/quizState.qs.length>=.8?"🎉":quizState.score/quizState.qs.length>=.5?"👍":"📚"}</div>
            <h2 style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 28, fontWeight: 700, marginBottom: 6 }}>{L("quiz_done",ln)}</h2>
            <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 52, fontWeight: 700, color: subjects[quizState.sk].color, marginBottom: 6 }}>{quizState.score}/{quizState.qs.length}</div>
            <div className="ss" style={{ color: "#777", marginBottom: 28 }}>{Math.round((quizState.score/quizState.qs.length)*100)}%</div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button className="btn dk" onClick={() => startQuiz(quizState.sk, quizState.tk)}>{L("retry",ln)}</button>
              <button className="btn gh" onClick={() => setQuizState(null)}>{ln===0?"换题目":"Change Topic"}</button>
            </div>
          </div>
        )}

        {/* Flashcard active */}
        {view === "learn" && flashState && flashState !== "select" && !flashState.done && (
          <div className="fd">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
              <span className="ss" style={{ fontSize: 12, color: "#aaa", cursor: "pointer" }} onClick={() => setFlashState("select")}>← {L("back",ln)}</span>
              <span className="ss" style={{ fontSize: 13, color: "#888" }}>{flashState.idx+1} / {flashState.cards.length}</span>
            </div>
            <div style={{ height: 4, background: "#ede9e0", borderRadius: 4, marginBottom: 22, overflow: "hidden" }}>
              <div style={{ height: "100%", background: subjects[flashState.sk].color, width: `${(flashState.idx/flashState.cards.length)*100}%`, transition: "width .4s", borderRadius: 4 }} />
            </div>
            <div className="fl" onClick={() => setFlashState(f => ({ ...f, flipped: !f.flipped }))}>
              <div className={`fli ${flashState.flipped?"fp":""}`} style={{ height: 240 }}>
                <div className="ff card" style={{ background: subjects[flashState.sk].color }}>
                  <div style={{ textAlign: "center" }}>
                    <div className="cap" style={{ color: "rgba(255,255,255,.4)", marginBottom: 10 }}>{ln===0?"点击翻转 →":"Tap to flip →"}</div>
                    <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 20, fontWeight: 700, color: "#fff", whiteSpace: "pre-line", lineHeight: 1.5 }}>{flashState.cards[flashState.idx].front}</div>
                  </div>
                </div>
                <div className="ff fb card">
                  <div style={{ textAlign: "left", width: "100%" }}>
                    <div className="cap" style={{ marginBottom: 10 }}>{ln===0?"答案":"Answer"}</div>
                    <div className="mo" style={{ fontSize: 13, color: "#1a1a1e", whiteSpace: "pre-line", lineHeight: 1.85 }}>{flashState.cards[flashState.idx].back}</div>
                  </div>
                </div>
              </div>
            </div>
            {flashState.flipped ? (
              <div className="fd" style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 20 }}>
                <button className="btn gh" style={{ flex: 1, maxWidth: 170, padding: 12 }} onClick={() => cardAns(false)}>{L("dontknow",ln)}</button>
                <button className="btn dk" style={{ flex: 1, maxWidth: 170, padding: 12, background: "#0d4f3c" }} onClick={() => cardAns(true)}>{L("know",ln)}</button>
              </div>
            ) : (
              <div style={{ textAlign: "center", marginTop: 16 }}>
                <button className="btn gh" onClick={() => setFlashState(f => ({ ...f, flipped: true }))}>🔄 {L("flip",ln)}</button>
              </div>
            )}
            <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 18 }}>
              <span className="ss" style={{ fontSize: 13, color: "#0d4f3c" }}>✓ {flashState.known}</span>
              <span className="ss" style={{ fontSize: 13, color: "#b91c1c" }}>✗ {flashState.unknown}</span>
            </div>
          </div>
        )}

        {/* Flashcard done */}
        {view === "learn" && flashState?.done && (
          <div className="fd" style={{ textAlign: "center", paddingTop: 36 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🃏</div>
            <h2 style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 26, fontWeight: 700, marginBottom: 20 }}>{L("cards_done",ln)}</h2>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 28 }}>
              {[{n:flashState.known, l:ln===0?"认识":"Got it", c:"#0d4f3c"},{n:flashState.unknown, l:ln===0?"待复习":"Review", c:"#b91c1c"}].map((s,i)=>(
                <div key={i} className="card" style={{ padding: "16px 28px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 34, fontWeight: 700, color: s.c }}>{s.n}</div>
                  <div className="cap">{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button className="btn dk" onClick={() => startFlash(flashState.sk)}>{L("retry",ln)}</button>
              <button className="btn gh" onClick={() => setFlashState("select")}>{ln===0?"换科目":"Change"}</button>
            </div>
          </div>
        )}

        {/* ══ PROGRESS ══ */}
        {view === "progress" && (
          <div className="fd">
            <span className="ss" style={{ fontSize: 12, color: "#aaa", cursor: "pointer", marginBottom: 18, display: "block" }} onClick={() => setView("learn")}>← {L("back",ln)}</span>
            <h2 style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 30, fontWeight: 700, marginBottom: 26 }}>{ln===0?"我的学习进度":"My Progress"}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 32 }}>
              {[{n:progress.streak+"🔥",l:ln===0?"连续天数":"Streak"},{n:totalDone,l:ln===0?"完成题目":"Done"},{n:accuracy+"%",l:ln===0?"正确率":"Accuracy"}].map((s,i)=>(
                <div key={i} className="card" style={{ padding: "18px 14px", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 32, fontWeight: 700 }}>{s.n}</div>
                  <div className="cap" style={{ marginTop: 4 }}>{s.l}</div>
                </div>
              ))}
            </div>
            {subjectKeys.map((k,i) => {
              const s=subjects[k], p=progress.bySubject[k], pct=p.done>0?Math.round((p.correct/p.done)*100):0;
              return (
                <div key={k} className={`card fd s${i+1}`} style={{ padding: "18px 20px", marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 34, height: 34, background: s.color, borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "Georgia", fontSize: 15 }}>{s.icon}</div>
                      <div>
                        <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 15, fontWeight: 600 }}>{s.label[ln]}</div>
                        <div className="ss" style={{ fontSize: 11, color: "#aaa" }}>{p.done} {ln===0?"题":"done"} · {p.correct} {ln===0?"正确":"correct"}</div>
                      </div>
                    </div>
                    <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 26, fontWeight: 700, color: s.color }}>{pct}%</div>
                  </div>
                  <div className="pb"><div className="pbf" style={{ width: pct+"%", background: s.color }} /></div>
                </div>
              );
            })}
          </div>
        )}

        {/* ══ AI TUTOR ══ */}
        {view === "ai" && (
          <div className="fd" style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 200px)", minHeight: 500 }}>
            <div style={{ marginBottom: 14 }}>
              <span className="ss" style={{ fontSize: 12, color: "#aaa", cursor: "pointer" }} onClick={() => setView("learn")}>← {L("back",ln)}</span>
            </div>
            <h2 style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 26, fontWeight: 700, marginBottom: 14 }}>AI {ln===0?"智能辅导":"Tutor"}</h2>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
              {(ln===0
                ? ["如何求导？","正态分布怎么用？","什么是PED？","矩阵行列式怎么算？","乘数效应是什么？","复数的模？"]
                : ["How to differentiate?","Explain normal distribution","What is PED?","How to find determinant?","Explain multiplier","Find |z| for complex numbers?"]
              ).map((p,i)=>(
                <button key={i} className="tg" style={{ cursor: "pointer", padding: "5px 12px", fontSize: 12 }} onClick={() => setAiInput(p)}>{p}</button>
              ))}
            </div>
            <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, paddingBottom: 4 }}>
              {aiMsgs.map((m,i)=>(
                <div key={i} style={{ display: "flex", justifyContent: m.role==="user"?"flex-end":"flex-start", alignItems: "flex-end", gap: 8 }}>
                  {m.role==="ai" && <div style={{ width: 30, height: 30, background: "#1a1a1e", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 14 }}>🤖</div>}
                  <div className={`ai-w ${m.role==="ai"?"ai-a":"ai-u"}`}>{m.text}</div>
                </div>
              ))}
              {aiLoading && (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 30, height: 30, background: "#1a1a1e", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🤖</div>
                  <div className="ai-w ai-a ss" style={{ color: "#aaa" }}>{L("ai_thinking",ln)}</div>
                </div>
              )}
              <div ref={aiEnd} />
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 14, paddingTop: 14, borderTop: "1px solid #d9d4c7" }}>
              <textarea className="inp" rows={2} placeholder={L("ai_placeholder",ln)} value={aiInput} onChange={e => setAiInput(e.target.value)}
                onKeyDown={e => { if (e.key==="Enter"&&!e.shiftKey){e.preventDefault();sendAI();} }} style={{ flex: 1 }} />
              <button className="btn dk" style={{ padding: "0 18px", alignSelf: "stretch" }} onClick={sendAI} disabled={aiLoading}>{L("send",ln)}</button>
            </div>
          </div>
        )}

        {/* ══ PORTAL (Resources) ══ */}
        {view === "portal" && !activeSubject && (
          <div className="fd">
            <h2 style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 30, fontWeight: 700, marginBottom: 8 }}>{ln===0?"资源库":"Resource Library"}</h2>
            <p className="ss" style={{ color: "#777", marginBottom: 26, fontSize: 14 }}>{ln===0?"搜索或浏览所有已审核资源":"Search or browse all approved resources"}</p>
            <input className="inp" placeholder={ln===0?"按标题或标签搜索…":"Search by title or tag…"} value={searchQ} onChange={e => setSearchQ(e.target.value)} style={{ marginBottom: 28 }} />
            {searchQ.length > 1 ? (
              <div>
                <div className="cap" style={{ marginBottom: 12 }}>{filteredRes.length} {ln===0?"条结果":"results"}</div>
                <div className="card" style={{ padding: "0 22px" }}>
                  {filteredRes.length===0 ? <div className="ss" style={{ padding: "24px 0", textAlign: "center", color: "#ccc" }}>{ln===0?"无匹配结果":"No matches found."}</div>
                    : filteredRes.map(r => {
                      const subj = Object.values(subjects).find(s => s.resources.find(x => x.id===r.id));
                      return (
                        <div key={r.id} className="rr" style={{ display: "flex", alignItems: "center", gap: 14 }}>
                          <div style={{ flex: 1 }}>
                            <div className="ss" style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{r.title}</div>
                            <div>{r.tags.map(t=><span key={t} className="tg">{t}</span>)}{subj&&<span className="tg" style={{ background: subj.color+"18", color: subj.color }}>{subj.label[ln]}</span>}</div>
                          </div>
                          <button className="btn gh sm">{ln===0?"下载":"Download"}</button>
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : subjectKeys.map(key => {
              const s=subjects[key]; const apr=s.resources.filter(r=>r.approved);
              return (
                <div key={key} style={{ marginBottom: 30 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, cursor: "pointer" }} onClick={() => { setActiveSubject(key); setSubjectTab("resources"); }}>
                    <div style={{ width: 32, height: 32, background: s.color, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 14, fontFamily: "Georgia" }}>{s.icon}</div>
                    <span style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 18, fontWeight: 700 }}>{s.label[ln]}</span>
                    <span className="cap">{apr.length} {ln===0?"资源":"resources"}</span>
                  </div>
                  <div className="card" style={{ padding: "0 20px" }}>
                    {apr.map(r => (
                      <div key={r.id} className="rr" style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <div style={{ flex: 1 }}>
                          <div className="ss" style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{r.title}</div>
                          <div>{r.tags.map(t=><span key={t} className="tg">{t}</span>)}<span className="ss" style={{ fontSize: 11, color: "#ccc" }}>{r.size} · ↓{r.downloads}</span></div>
                        </div>
                        <button className="btn gh sm">{ln===0?"下载":"Download"}</button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ══ SUBJECT DETAIL ══ */}
        {view === "portal" && activeSubject && curS && (
          <div className="fd">
            <span className="ss" style={{ fontSize: 12, color: "#aaa", cursor: "pointer" }} onClick={() => setActiveSubject(null)}>← {L("back",ln)}</span>
            <div style={{ background: curS.color, borderRadius: 4, padding: "36px 38px 30px", color: "#fff", margin: "16px 0 28px", position: "relative", overflow: "hidden" }}>
              <div style={{ fontSize: 120, fontFamily: "Georgia", opacity: .06, position: "absolute", right: 20, top: -20, lineHeight: 1, userSelect: "none" }}>{curS.icon}</div>
              <div className="cap" style={{ color: "rgba(255,255,255,.35)", marginBottom: 8 }}>CAIE {curS.code}</div>
              <h1 style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 36, fontWeight: 700, marginBottom: 16 }}>{curS.label[ln]}</h1>
              <div style={{ display: "flex", flexWrap: "wrap" }}>{curS.syllabus.map(t=><span key={t.topic} className="chip">{t.topic}</span>)}</div>
            </div>
            <div className="tb">
              {[["resources",ln===0?"资源":"Resources"],["syllabus",ln===0?"大纲":"Syllabus"],["papers",ln===0?"试卷":"Papers"],["qtypes",ln===0?"题型":"Q Types"]].map(([k,l])=>(
                <span key={k} className={`tab ${subjectTab===k?"on":""}`} onClick={() => setSubjectTab(k)}>{l}</span>
              ))}
            </div>
            {subjectTab==="resources" && (
              <div className="card" style={{ padding: "0 22px" }}>
                {curS.resources.filter(r=>r.approved).map(r=>(
                  <div key={r.id} className="rr" style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 38, height: 38, background: curS.color+"22", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span className="ss" style={{ fontSize: 10, fontWeight: 700, color: curS.color }}>{r.type}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="ss" style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{r.title}</div>
                      <div>{r.tags.map(t=><span key={t} className="tg">{t}</span>)}<span className="ss" style={{ fontSize: 11, color: "#ccc" }}>{r.source} · {r.size} · ↓{r.downloads}</span></div>
                    </div>
                    <button className="btn gh sm">{ln===0?"下载":"Download"}</button>
                  </div>
                ))}
              </div>
            )}
            {subjectTab==="syllabus" && (
              <div className="card" style={{ padding: "0 22px" }}>
                {curS.syllabus.map((sec,i)=><Accordion key={i} section={sec} color={curS.color} />)}
              </div>
            )}
            {subjectTab==="papers" && (
              <table className="et card">
                <thead><tr><th>{ln===0?"试卷":"Paper"}</th><th>{ln===0?"时长":"Duration"}</th><th>{ln===0?"分数":"Marks"}</th><th>{ln===0?"占比":"Weight"}</th></tr></thead>
                <tbody>{curS.examFormat.map((p,i)=>(
                  <tr key={i}>
                    <td><span className="ss" style={{ fontWeight: 600 }}>{p.paper}</span><br/><span className="ss" style={{ fontSize: 12, color: "#888", marginTop: 3, display: "block" }}>{p.desc}</span></td>
                    <td><span className="ss">{p.duration}</span></td>
                    <td><span className="ss">{p.marks}</span></td>
                    <td><span className="ss" style={{ fontWeight: 700, color: curS.color }}>{p.weight}</span></td>
                  </tr>
                ))}</tbody>
              </table>
            )}
            {subjectTab==="qtypes" && (
              <div className="card" style={{ padding: "6px 24px" }}>
                {curS.questionTypes.map((qt,i)=>(
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 0", borderBottom: i<curS.questionTypes.length-1?"1px solid #e4e0d6":"none" }}>
                    <div style={{ width: 24, height: 24, background: curS.color, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span className="ss" style={{ fontSize: 11, color: "#fff", fontWeight: 700 }}>{i+1}</span>
                    </div>
                    <span className="ss" style={{ fontSize: 14, lineHeight: 1.65 }}>{qt}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ══ EXAMS ══ */}
        {view === "exams" && (
          <div className="fd">
            <div className="cap" style={{ marginBottom: 10 }}>Cambridge CAIE · 中国大陆考生</div>
            <h2 style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 32, fontWeight: 700, marginBottom: 8 }}>{ln===0?"考试信息":"Examination Information"}</h2>
            <p className="ss" style={{ color: "#777", marginBottom: 28, fontSize: 14 }}>{ln===0?"考试日期、中国大陆考点及考试形式":"Exam dates, China mainland centres, and assessment format"}</p>
            <div className="tb">
              {[["dates",ln===0?"考试日期":"Dates"],["locations",ln===0?"考点·中国":"Locations"],["format",ln===0?"考试形式":"Format"]].map(([k,l])=>(
                <span key={k} className={`tab ${examTab===k?"on":""}`} onClick={() => setExamTab(k)}>{l}</span>
              ))}
            </div>
            {examTab==="dates" && (
              <div>
                <table className="et card">
                  <thead><tr><th>{ln===0?"考试场次":"Session"}</th><th>{ln===0?"日期":"Date"}</th><th>{ln===0?"备注":"Note"}</th></tr></thead>
                  <tbody>{examInfo.dates.map((d,i)=>(
                    <tr key={i}><td><span className="ss" style={{ fontWeight: 600 }}>{d.session}</span></td><td><span style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 18, fontWeight: 600 }}>{d.date}</span></td><td><span className="ss" style={{ fontSize: 13, color: "#777" }}>{d.note}</span></td></tr>
                  ))}</tbody>
                </table>
                <div className="card" style={{ padding: "12px 18px", marginTop: 12 }}>
                  <span className="ss" style={{ fontSize: 13, color: "#888" }}>⚠ {ln===0?"以上日期为参考时间窗口，具体试卷时间请向注册考试中心确认。":"Dates are indicative windows. Confirm individual paper timetables with your registered centre."}</span>
                </div>
              </div>
            )}
            {examTab==="locations" && (
              <div>
                <div className="ss" style={{ fontSize: 13, color: "#888", marginBottom: 18 }}>{ln===0?"以下城市设有CAIE认可的A-Level考试中心，请直接联系学校确认报名名额。":"The following cities host CAIE-approved centres. Contact schools directly to confirm registration."}</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(265px,1fr))", gap: 12 }}>
                  {examInfo.locations.map((loc,i)=>(
                    <div key={i} className={`card fd s${(i%4)+1}`} style={{ padding: "20px 22px", transition: "box-shadow .2s" }}
                      onMouseEnter={e=>e.currentTarget.style.boxShadow="0 6px 22px rgba(0,0,0,.08)"}
                      onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                        <h3 style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 18, fontWeight: 700 }}>{loc.city}</h3>
                        <span className="cap" style={{ background: "#f0ece2", padding: "3px 10px", borderRadius: 20, fontSize: 9, color: "#888" }}>{loc.region}</span>
                      </div>
                      <ul style={{ listStyle: "none" }}>
                        {loc.centres.map((c,j)=>(
                          <li key={j} className="ss" style={{ fontSize: 12, color: "#555", padding: "4px 0", borderBottom: j<loc.centres.length-1?"1px solid #f0ece2":"none" }}>
                            <span style={{ color: "#ccc", marginRight: 8 }}>·</span>{c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {examTab==="format" && (
              <div>
                <table className="et card" style={{ marginBottom: 22 }}>
                  <thead><tr><th>{ln===0?"项目":"Aspect"}</th><th>{ln===0?"详情":"Detail"}</th></tr></thead>
                  <tbody>{examInfo.format.map((f,i)=>(
                    <tr key={i}><td><span className="ss" style={{ fontWeight: 600 }}>{f.aspect}</span></td><td><span className="ss">{f.detail}</span></td></tr>
                  ))}</tbody>
                </table>
                <div className="cap" style={{ marginBottom: 12 }}>{ln===0?"等级":"Grade Scale"}</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {[["A*","#0d4f3c"],["A","#1a6b50"],["B","#0f2d5c"],["C","#1e4b9c"],["D","#4a1800"],["E","#8b3200"],["U","#888"]].map(([g,c])=>(
                    <div key={g} className="card" style={{ textAlign: "center", padding: "14px 16px", flex: 1, minWidth: 52 }}>
                      <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 26, fontWeight: 700, color: c }}>{g}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══ TOOLS ══ */}
        {view === "tools" && (
          <div className="fd">
            <h2 style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 30, fontWeight: 700, marginBottom: 8 }}>{ln===0?"开源学习工具":"Open-Source Tools"}</h2>
            <p className="ss" style={{ color: "#777", marginBottom: 32, fontSize: 14 }}>{ln===0?"免费外部工具，辅助您的学习":"Free external resources to support your studies"}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 12 }}>
              {openTools.map((t,i)=>(
                <div key={i} className={`card fd s${(i%4)+1}`} style={{ padding: "18px 20px", display: "flex", gap: 14, alignItems: "flex-start", cursor: "pointer", transition: "box-shadow .2s" }}
                  onMouseEnter={e=>e.currentTarget.style.boxShadow="0 6px 22px rgba(0,0,0,.08)"}
                  onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                  <div style={{ width: 40, height: 40, background: t.color, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#fff", fontSize: 17, fontFamily: "Georgia" }}>{t.icon}</div>
                  <div>
                    <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{t.title}</div>
                    <div className="ss" style={{ fontSize: 13, color: "#777", lineHeight: 1.55 }}>{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ ADMIN ══ */}
        {view === "admin" && adminMode && (
          <div className="fd">
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 32 }}>
              <h2 style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 30, fontWeight: 700 }}>{ln===0?"管理面板":"Admin Panel"}</h2>
              <span className="ss" style={{ background: "#1a1a1e", color: "#f4f1eb", padding: "3px 14px", borderRadius: 20, fontSize: 11, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase" }}>{ADMIN_USER}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12, marginBottom: 36 }}>
              {[{l:ln===0?"已审核资源":"Approved",v:allApproved.length},{l:ln===0?"待审核":"Pending",v:pending.length},{l:ln===0?"总下载":"Downloads",v:Object.values(subjects).flatMap(s=>s.resources).reduce((a,r)=>a+r.downloads,0).toLocaleString()},{l:ln===0?"考试城市":"Exam Cities",v:examInfo.locations.length}].map((s,i)=>(
                <div key={i} className="card" style={{ padding: "18px 20px" }}>
                  <div className="cap" style={{ marginBottom: 8 }}>{s.l}</div>
                  <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 32, fontWeight: 700 }}>{s.v}</div>
                </div>
              ))}
            </div>
            <h3 style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 22, fontWeight: 700, marginBottom: 16 }}>{L("pending",ln)}</h3>
            {pending.length===0
              ? <div className="ss" style={{ color: "#bbb", fontSize: 14 }}>{ln===0?"暂无待审核上传。":"No uploads pending review."}</div>
              : pending.map(u=>(
                <div key={u.id} className="card" style={{ padding: "16px 20px", marginBottom: 10, display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 14 }}>
                  <div>
                    <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{u.title}</div>
                    <div className="ss" style={{ fontSize: 13, color: "#777" }}>{u.subject} · <strong>{u.uploader}</strong> · {u.date} · {u.size}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                    <button className="btn ap" onClick={() => approve(u.id)}>{L("approve",ln)}</button>
                    <button className="btn rj" onClick={() => reject(u.id)}>{L("reject",ln)}</button>
                  </div>
                </div>
              ))
            }
            {(actions.approved>0||actions.rejected>0) && (
              <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                {actions.approved>0&&<span className="ss" style={{ background: "#e6f4ef", color: "#0d4f3c", padding: "4px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>✓ {actions.approved} {ln===0?"已批准":"approved"}</span>}
                {actions.rejected>0&&<span className="ss" style={{ background: "#fef2f2", color: "#b91c1c", padding: "4px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>✗ {actions.rejected} {ln===0?"已拒绝":"rejected"}</span>}
              </div>
            )}
            <div style={{ marginTop: 36 }}>
              <button className="btn gh" onClick={() => { setAdminMode(false); setView("home"); }}>{L("logout",ln)}</button>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #d9d4c7", background: "#fff", padding: "22px 22px", textAlign: "center" }}>
        <span className="ss" style={{ fontSize: 12, color: "#ccc" }}>
          A-Level 学习助手 · oliverchow-mse · Cambridge CAIE · {ln===0?"完全免费 · 仅供教育用途":"Free · Educational Use Only"}
        </span>
      </footer>

      {/* ADMIN LOGIN MODAL */}
      {showAdminLogin && (
        <div className="overlay" onClick={() => { setShowAdminLogin(false); setLoginError(false); }}>
          <div className="modal fd" onClick={e => e.stopPropagation()}>
            <h2 style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 26, fontWeight: 700, marginBottom: 6 }}>{L("admin_login",ln)}</h2>
            <p className="ss" style={{ color: "#888", fontSize: 13, marginBottom: 26 }}>{ln===0?"请输入管理员账号和密码。":"Enter your administrator credentials."}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <div className="cap" style={{ marginBottom: 7 }}>{L("username",ln)}</div>
                <input className="inp" placeholder={ln===0?"用户名":"Username"} value={loginUser} onChange={e => { setLoginUser(e.target.value); setLoginError(false); }} />
              </div>
              <div>
                <div className="cap" style={{ marginBottom: 7 }}>{L("password",ln)}</div>
                <div style={{ position: "relative" }}>
                  <input className="inp" type={showPass?"text":"password"} placeholder={ln===0?"密码":"Password"} value={loginPass}
                    onChange={e => { setLoginPass(e.target.value); setLoginError(false); }}
                    onKeyDown={e => e.key==="Enter"&&handleLogin()} style={{ paddingRight: 50 }} />
                  <span onClick={() => setShowPass(p=>!p)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", cursor: "pointer", fontSize: 12, color: "#bbb", fontFamily: "sans-serif" }}>
                    {showPass?(ln===0?"隐藏":"hide"):(ln===0?"显示":"show")}
                  </span>
                </div>
              </div>
              {loginError && <span className="ss" style={{ color: "#b91c1c", fontSize: 13 }}>{ln===0?"用户名或密码错误，请重试。":"Invalid username or password."}</span>}
              <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                <button className="btn dk" style={{ flex: 1, padding: 12 }} onClick={handleLogin}>{L("signin",ln)}</button>
                <button className="btn gh" style={{ flex: 1, padding: 12 }} onClick={() => { setShowAdminLogin(false); setLoginError(false); }}>{L("cancel",ln)}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* UPLOAD MODAL */}
      {uploadModal && (
        <div className="overlay" onClick={() => setUploadModal(false)}>
          <div className="modal fd" onClick={e => e.stopPropagation()}>
            {uploadOK ? (
              <div style={{ textAlign: "center", padding: "28px 0" }}>
                <div style={{ fontSize: 52, marginBottom: 14 }}>✓</div>
                <h2 style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 24, fontWeight: 700, marginBottom: 8 }}>{ln===0?"提交成功！":"Submitted!"}</h2>
                <p className="ss" style={{ color: "#777", fontSize: 14 }}>{ln===0?"您的文件已提交，等待管理员审核后将公开显示。":"Your upload is pending admin review before going live."}</p>
              </div>
            ) : (
              <>
                <h2 style={{ fontFamily: "'Noto Serif SC',serif", fontSize: 24, fontWeight: 700, marginBottom: 6 }}>{ln===0?"上传学习资源":"Upload a Resource"}</h2>
                <p className="ss" style={{ color: "#888", fontSize: 13, marginBottom: 24 }}>{ln===0?"所有上传内容经管理员审核后方可公开。":"All uploads are reviewed by admin before publication."}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <div className="cap" style={{ marginBottom: 7 }}>{ln===0?"标题":"Title"}</div>
                    <input className="inp" placeholder={ln===0?"例如：积分方法完整笔记":"e.g. Integration Methods Complete Notes"} value={uploadForm.title} onChange={e => setUploadForm(f=>({...f,title:e.target.value}))} />
                  </div>
                  <div>
                    <div className="cap" style={{ marginBottom: 7 }}>{ln===0?"科目":"Subject"}</div>
                    <select className="inp" value={uploadForm.subject} onChange={e => setUploadForm(f=>({...f,subject:e.target.value,topic:""}))}>
                      {subjectKeys.map(k=><option key={k} value={k}>{subjects[k].label[ln]}</option>)}
                    </select>
                  </div>
                  <div>
                    <div className="cap" style={{ marginBottom: 7 }}>{ln===0?"主题":"Topic"}</div>
                    <select className="inp" value={uploadForm.topic} onChange={e => setUploadForm(f=>({...f,topic:e.target.value}))}>
                      <option value="">{ln===0?"选择主题…":"Select topic…"}</option>
                      {subjects[uploadForm.subject].syllabus.map(s=><option key={s.topic} value={s.topic}>{s.topic}</option>)}
                    </select>
                  </div>
                  <div>
                    <div className="cap" style={{ marginBottom: 7 }}>{ln===0?"文件 (PDF)":"File (PDF)"}</div>
                    <div style={{ border: "1.5px dashed #d9d4c7", borderRadius: 3, padding: "26px", textAlign: "center", background: "#edead8", cursor: "pointer" }}>
                      <div className="ss" style={{ fontSize: 13, color: "#bbb" }}>{ln===0?"点击选择或拖放PDF文件":"Click to select or drag & drop a PDF"}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                    <button className="btn dk" style={{ flex: 1, padding: 12 }} onClick={doUpload} disabled={!uploadForm.title}>{L("submit",ln)}</button>
                    <button className="btn gh" style={{ flex: 1, padding: 12 }} onClick={() => setUploadModal(false)}>{L("cancel",ln)}</button>
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
