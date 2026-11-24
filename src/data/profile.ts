// Single source of content. Accuracy rules:
// (FEAST = finalize/implement/test, HKI = copyright, no phone number, no Node/Express claim).
export const profile = {
  name: ['Dandi', 'Septian', 'Yusniawan'],
  fullName: 'Dandi Septian Yusniawan',
  mark: 'D4CE',
  nick: 'D4ce',
  heroText: 'Final-year Informatics student at Telkom University, based in Bandung. I build Python backends with Django REST Framework and FastAPI, ship them with Docker, and serve ML models behind clean APIs.',
  role: 'Backend Developer',
  stack: 'Python, Django REST, FastAPI',
  heroLine: 'Final-year Informatics student at Telkom University, based in Bandung. Open to backend, full-stack, data analyst and AI engineer roles.',
  // the hero cycles through these: "I'm <role>"
  roles: ['a backend developer', 'a full-stack developer', 'a data analyst', 'an AI engineer'],
  // draggable stickers in the "Off duty" board; <em> renders in the serif italic
  fun: ['FPS games', 'Persona <em>series</em>', 'Marvel movies', 'Anime', 'Clean <em>APIs</em>', 'Docker everything', 'Reading error logs'],
  email: 'dsyusniawan@gmail.com',
  github: { url: 'https://github.com/D4ce394', label: 'github.com/D4ce394' },
  linkedin: { url: 'https://www.linkedin.com/in/dandisy', label: 'linkedin.com/in/dandisy' },

  about: {
    body: [
      'Backend developer from Bandung. Final-year Informatics student at Telkom University (GPA 3.72/4.00, graduating 2027).',
      'I build Python backends with Django REST Framework and FastAPI: REST API design, auth and role-based access, PostgreSQL modeling, payment gateway integration, Docker deployment. I also work on the front end with React and serve ML models (PyTorch, YOLO) behind APIs.',
    ],
    offClock: 'Off the clock: FPS games, Persona, Marvel movies, and anime.',
  },

  facts: [
    ['Based in', 'Bandung, Indonesia'],
    ['Studying', 'Informatics, Telkom University'],
    ['GPA', '3.72/4.00'],
    ['Graduating', '2027'],
    ['Focus', 'Python backends: Django REST Framework, FastAPI'],
    ['Looking for', 'Backend, full-stack, data analyst, AI engineer'],
  ],

  // latest first
  experience: [
    {
      date: 'Oct 2026 – Present',
      role: 'Freelance Backend Developer',
      org: 'Satelit HR Administration System (client project)',
      desc: 'Backend for an HR admin system targeting 200+ users; designed the architecture end to end.',
      chips: ['Django REST Framework', 'React', 'PostgreSQL', 'Redis + Celery', 'Nginx', 'Docker + GitHub Actions'],
    },
    {
      date: 'Sep 2026 – Present',
      role: 'Practicum Assistant',
      org: 'Informatics Laboratory, Telkom University',
      desc: 'Run practicum sessions and review student code.',
      chips: ['REST API', 'PostgreSQL', 'JWT', 'React', 'Laravel', 'Testing'],
    },
    {
      date: 'Apr – Jun 2026',
      role: 'Backend Developer Intern',
      org: 'HUMIC Research Center, Telkom University',
      desc: 'MammoGuard: FastAPI backend serving a PyTorch model via REST; CLAHE + Grad-CAM image pipeline; brush/mask tool; single and bulk report export; Cloudflare R2 storage, Docker deployment.',
      chips: ['FastAPI', 'PyTorch', 'Cloudflare R2', 'Docker'],
    },
  ],

  // newest first; `cover` picks the illustration in Cover.astro
  projects: [
    {
      cover: 'satelit',
      kind: 'Backend · HR system',
      cats: ['backend'],
      name: 'Satelit',
      date: 'Oct 2026 – Present',
      desc: 'HR admin system architecture for 200+ users.',
      // private client work: stack only, no screenshots, no repo link
      status: 'Client project, in progress',
      chips: ['Django REST Framework', 'React', 'PostgreSQL', 'Redis + Celery', 'Nginx', 'Docker + GitHub Actions'],
    },
    {
      cover: 'mammoguard',
      repo: 'https://github.com/DevZkafnd/MammoGuard-AI',
      kind: 'AI · Web app',
      cats: ['backend', 'ai'],
      name: 'MammoGuard',
      date: 'Apr – Jun 2026',
      featured: true,
      desc: 'AI mammogram analysis web app.',
      part: 'the FastAPI backend during the HUMIC internship (PyTorch model served via REST, R2 storage, Docker, report export).',
      chips: ['FastAPI', 'PyTorch', 'Cloudflare R2', 'Docker'],
      note: 'Registered copyright (DJKI) No. 001456509',
    },
    {
      cover: 'iot',
      repo: 'https://github.com/D4ce394/Chicken-Poultry',
      kind: 'AI · Computer vision',
      cats: ['ai', 'fullstack'],
      name: 'IoT Poultry Counter',
      date: 'Apr – Jun 2026',
      desc: 'YOLO counts chickens from CCTV/video and sends real-time counts to Firebase, with a Svelte frontend.',
      chips: ['YOLO', 'Firebase', 'Svelte'],
    },
    {
      cover: 'feast',
      repo: 'https://github.com/FEAST-IF-4709',
      kind: 'Full-stack · F&B POS',
      cats: ['backend', 'fullstack'],
      name: 'FEAST',
      date: 'Feb – Jun 2026',
      desc: 'Multi-tenant F&B POS (web + mobile) with a Brand–Outlet model, per-brand RBAC, QRIS/cash payments.',
      part: 'finalized, implemented and tested features.',
      chips: ['Django REST', 'React'],
    },
    {
      cover: 'sajiin',
      repo: 'https://github.com/Cahyo-Techno-Infinity/Sajiin-POS-Website',
      kind: 'Full-stack · Web POS',
      cats: ['fullstack'],
      name: 'Sajiin',
      date: 'Oct – Dec 2025',
      desc: 'Web POS.',
      part: 'React frontend and Midtrans payment integration on Django REST.',
      chips: ['React', 'Midtrans', 'Django REST'],
    },
  ] as { cover: string; repo?: string; kind: string; cats: string[]; name: string; date: string; featured?: boolean; desc: string; part?: string; status?: string; note?: string; chips: string[] }[],

  // Undergraduate thesis paper. Keep the status honest; add a public link (DOI) once it exists.
  research: {
    status: 'Accepted',
    kind: 'Conference paper',
    title: 'Comparative Analysis of Explainable AI Methods for Multiclass Classification of Brain Tumors in MRI Images Using EfficientNet Model',
    desc: 'Compares Grad-CAM, SHAP and LIME on four-class brain tumor MRI classification with EfficientNet-B0, evaluated with Quantus against random and edge-detector baselines.',
    detail: 'Audited the dataset for mirrored and rotated duplicates before trusting the model (7,200 → 2,763 images). Macro-F1 0.859 ± 0.006 over 3 seeds.',
    chips: ['TensorFlow / Keras', 'EfficientNet-B0', 'Grad-CAM', 'SHAP', 'LIME', 'Quantus'],
  },

  skills: [
    { title: 'Backend', items: ['Python', 'Django REST Framework', 'FastAPI', 'Flask', 'Laravel', 'Next.js', 'Spring', 'Postman'] },
    { title: 'Data & storage', items: ['PostgreSQL', 'Redis', 'Firebase', 'Cloudflare R2'] },
    { title: 'Infrastructure', items: ['Docker', 'GitHub Actions', 'Nginx', 'Linux', 'Git'] },
    { title: 'Frontend', items: ['React', 'Tailwind CSS'] },
    { title: 'Machine learning', items: ['PyTorch model serving', 'TensorFlow / Keras', 'scikit-learn', 'YOLO', 'Grad-CAM', 'SHAP', 'LIME'] },
    { title: 'Practices', items: ['REST API design', 'JWT auth', 'RBAC', 'Payment gateways (Midtrans, QRIS)', 'Testing', 'Code review'] },
  ],

  education: { school: 'Telkom University', degree: 'Bachelor of Informatics', period: '2023 – 2027', gpa: 'GPA 3.72/4.00' },

  certs: [
    { date: 'Jul 2026', name: 'Google IT Automation with Python', org: 'Google' },
    { date: 'Mar 2026', name: 'Microsoft Azure AI Fundamentals (AI-900)', org: 'Microsoft' },
    { date: 'Oct 2025', name: 'Data Classification and Summarization Using Granite', org: 'IBM' },
  ],

  contactLead: 'Open to backend, full-stack, data analyst and AI engineer roles.',
};

export const sections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'research', label: 'Research' },
  { id: 'contact', label: 'Contact' },
];
