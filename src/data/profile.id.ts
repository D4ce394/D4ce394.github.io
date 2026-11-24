// Indonesian version of profile.ts. Facts and names stay the same; only wording is translated.
import { profile } from './profile';

const byKey = <T extends { cover: string }>(list: T[], patch: Record<string, Partial<T>>) =>
  list.map((x) => ({ ...x, ...patch[x.cover] }));

export const profileId = {
  ...profile,
  roles: ['backend developer', 'full-stack developer', 'data analyst', 'AI engineer'],
  heroText: 'Mahasiswa Informatika tingkat akhir di Telkom University, tinggal di Bandung. Saya membangun backend Python dengan Django REST Framework dan FastAPI, men-deploy-nya dengan Docker, dan menyajikan model ML lewat API yang rapi.',
  fun: ['Game FPS', 'Seri <em>Persona</em>', 'Film Marvel', 'Anime', '<em>API</em> yang rapi', 'Semua di-Docker-in', 'Baca error log'],

  about: {
    ...profile.about,
    body: [
      'Backend developer dari Bandung. Mahasiswa Informatika tingkat akhir di Telkom University (IPK 3,72/4,00, lulus 2027).',
      'Saya membangun backend Python dengan Django REST Framework dan FastAPI: desain REST API, autentikasi dan akses berbasis peran, pemodelan PostgreSQL, integrasi payment gateway, dan deployment Docker. Saya juga mengerjakan front end dengan React dan menyajikan model ML (PyTorch, YOLO) lewat API.',
    ],
  },

  experience: [
    {
      ...profile.experience[0],
      date: 'Okt 2026 – Sekarang',
      org: 'Satelit HR Administration System (proyek klien)',
      desc: 'Backend untuk sistem administrasi HR dengan target 200+ pengguna; merancang arsitekturnya dari awal sampai akhir.',
    },
    {
      ...profile.experience[1],
      date: 'Sep 2026 – Sekarang',
      role: 'Asisten Praktikum',
      org: 'Laboratorium Informatika, Telkom University',
      desc: 'Mengajar sesi praktikum dan me-review kode mahasiswa.',
    },
    {
      ...profile.experience[2],
      desc: 'MammoGuard: backend FastAPI yang menyajikan model PyTorch lewat REST; pipeline citra CLAHE + Grad-CAM; alat brush/mask; ekspor laporan tunggal dan massal; penyimpanan Cloudflare R2, deployment Docker.',
    },
  ],

  projects: byKey(profile.projects, {
    satelit: { kind: 'Backend · Sistem HR', date: 'Okt 2026 – Sekarang', desc: 'Arsitektur sistem administrasi HR untuk 200+ pengguna.', status: 'Proyek klien, sedang berjalan' },
    mammoguard: {
      kind: 'AI · Aplikasi web',
      desc: 'Aplikasi web analisis mammogram berbasis AI.',
      part: 'backend FastAPI selama magang di HUMIC (model PyTorch lewat REST, penyimpanan R2, Docker, ekspor laporan).',
      note: 'Hak cipta terdaftar (DJKI) No. 001456509',
    },
    iot: { desc: 'YOLO menghitung ayam dari CCTV/video dan mengirim hitungan real-time ke Firebase, dengan frontend Svelte.' },
    feast: {
      kind: 'Full-stack · POS F&B',
      desc: 'POS F&B multi-tenant (web + mobile) dengan model Brand–Outlet, RBAC per brand, dan pembayaran QRIS/tunai.',
      part: 'menyelesaikan, mengimplementasikan, dan menguji fitur.',
    },
    sajiin: { kind: 'Full-stack · POS web', date: 'Okt – Des 2025', desc: 'POS berbasis web.', part: 'frontend React dan integrasi pembayaran Midtrans di Django REST.' },
  }),

  research: {
    ...profile.research,
    status: 'Diterima',
    kind: 'Paper konferensi',
    desc: 'Membandingkan Grad-CAM, SHAP, dan LIME pada klasifikasi MRI tumor otak empat kelas dengan EfficientNet-B0, dievaluasi dengan Quantus terhadap baseline acak dan detektor tepi.',
    detail: 'Mengaudit dataset dari duplikat hasil cermin dan rotasi sebelum memercayai model (7.200 → 2.763 citra). Macro-F1 0,859 ± 0,006 dari 3 seed.',
  },

  skills: profile.skills.map((g) => ({
    ...g,
    title: ({ 'Data & storage': 'Data & penyimpanan', Infrastructure: 'Infrastruktur', Practices: 'Praktik' } as Record<string, string>)[g.title] ?? g.title,
  })),

  education: { ...profile.education, degree: 'Sarjana Informatika', gpa: 'IPK 3,72/4,00' },

  certs: profile.certs.map((c) => ({ ...c, date: c.date.replace('Oct', 'Okt') })),
};
