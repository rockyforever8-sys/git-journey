export type Faculty =
  | 'Arts & Humanities'
  | 'Business'
  | 'Engineering'
  | 'Science'
  | 'Medicine'
  | 'Law'
  | 'Social Sciences'

export interface Program {
  name: string
  faculty: Faculty
  minIb: number
  competitiveIb: number
  subjectNotes?: string
}

export interface University {
  id: string
  name: string
  shortName: string
  qsRanking2025: number
  qsRanking2024: number
  established: number
  campus: string
  minIb: number
  competitiveIbLow: number
  competitiveIbHigh: number
  tuitionLocal: number
  tuitionNonLocal: number
  englishReq: string
  chineseReq: string
  interviewLikely: boolean
  holistic: boolean
  strengths: string[]
  programs: Program[]
  website: string
  color: string
}

export const FACULTIES: Faculty[] = [
  'Arts & Humanities',
  'Business',
  'Engineering',
  'Science',
  'Medicine',
  'Law',
  'Social Sciences',
]

export const universities: University[] = [
  {
    id: 'hku',
    name: 'The University of Hong Kong',
    shortName: 'HKU',
    qsRanking2025: 17,
    qsRanking2024: 26,
    established: 1911,
    campus: 'Pokfulam, Hong Kong Island',
    minIb: 32,
    competitiveIbLow: 37,
    competitiveIbHigh: 42,
    tuitionLocal: 47000,
    tuitionNonLocal: 224000,
    englishReq: 'IB English Grade 4+ (SL/HL)',
    chineseReq: 'IB Chinese Grade 4+ or equivalent',
    interviewLikely: true,
    holistic: true,
    strengths: ['Medicine', 'Law', 'Dentistry', 'Architecture', 'Global reputation'],
    programs: [
      { name: 'Bachelor of Arts', faculty: 'Arts & Humanities', minIb: 32, competitiveIb: 35 },
      { name: 'Bachelor of Business Administration', faculty: 'Business', minIb: 36, competitiveIb: 40, subjectNotes: 'Strong HL Maths preferred' },
      { name: 'Bachelor of Engineering', faculty: 'Engineering', minIb: 33, competitiveIb: 37, subjectNotes: 'HL Maths or Physics Grade 6+' },
      { name: 'Bachelor of Science', faculty: 'Science', minIb: 32, competitiveIb: 38 },
      { name: 'Bachelor of Medicine & Surgery (MBBS)', faculty: 'Medicine', minIb: 42, competitiveIb: 45, subjectNotes: 'Chemistry & Biology HL required' },
      { name: 'Bachelor of Laws (LLB)', faculty: 'Law', minIb: 40, competitiveIb: 43 },
      { name: 'Bachelor of Social Sciences', faculty: 'Social Sciences', minIb: 33, competitiveIb: 37 },
    ],
    website: 'https://admissions.hku.hk',
    color: '#006747',
  },
  {
    id: 'cuhk',
    name: 'The Chinese University of Hong Kong',
    shortName: 'CUHK',
    qsRanking2025: 36,
    qsRanking2024: 47,
    established: 1963,
    campus: 'Sha Tin, New Territories',
    minIb: 30,
    competitiveIbLow: 35,
    competitiveIbHigh: 40,
    tuitionLocal: 47000,
    tuitionNonLocal: 178000,
    englishReq: 'IB English Grade 4+ (SL/HL)',
    chineseReq: 'IB Chinese Grade 4+ (faculty discretion)',
    interviewLikely: true,
    holistic: true,
    strengths: ['Business', 'Medicine', 'Chinese Studies', 'Campus life', 'Research'],
    programs: [
      { name: 'Bachelor of Arts', faculty: 'Arts & Humanities', minIb: 30, competitiveIb: 35 },
      { name: 'BBA Programme', faculty: 'Business', minIb: 33, competitiveIb: 38, subjectNotes: 'English A SL/HL or English B HL' },
      { name: 'Bachelor of Engineering', faculty: 'Engineering', minIb: 32, competitiveIb: 37, subjectNotes: 'HL Maths preferred' },
      { name: 'Bachelor of Science', faculty: 'Science', minIb: 31, competitiveIb: 36 },
      { name: 'Global Business Studies', faculty: 'Business', minIb: 36, competitiveIb: 40 },
      { name: 'Bachelor of Medicine (MBChB)', faculty: 'Medicine', minIb: 40, competitiveIb: 43, subjectNotes: 'Chemistry HL required' },
      { name: 'Bachelor of Laws (LLB)', faculty: 'Law', minIb: 38, competitiveIb: 41 },
      { name: 'Bachelor of Social Science', faculty: 'Social Sciences', minIb: 30, competitiveIb: 35 },
    ],
    website: 'https://admission.cuhk.edu.hk',
    color: '#7D0541',
  },
  {
    id: 'hkust',
    name: 'Hong Kong University of Science and Technology',
    shortName: 'HKUST',
    qsRanking2025: 47,
    qsRanking2024: 60,
    established: 1991,
    campus: 'Clear Water Bay, Kowloon',
    minIb: 34,
    competitiveIbLow: 36,
    competitiveIbHigh: 42,
    tuitionLocal: 47000,
    tuitionNonLocal: 185000,
    englishReq: 'IB English Grade 4+ (SL/HL)',
    chineseReq: 'Not mandatory for most programmes',
    interviewLikely: true,
    holistic: true,
    strengths: ['Engineering', 'Business', 'Computer Science', 'STEM focus', 'Industry links'],
    programs: [
      { name: 'BBA (Business & Management)', faculty: 'Business', minIb: 34, competitiveIb: 38 },
      { name: 'BBA in Finance', faculty: 'Business', minIb: 36, competitiveIb: 40 },
      { name: 'BEng in Computer Science', faculty: 'Engineering', minIb: 36, competitiveIb: 40, subjectNotes: 'HL Maths Grade 6+' },
      { name: 'BEng in Electronic Engineering', faculty: 'Engineering', minIb: 35, competitiveIb: 38, subjectNotes: 'HL Maths Grade 6+' },
      { name: 'BSc in Computer Science', faculty: 'Science', minIb: 36, competitiveIb: 39 },
      { name: 'BSc in Data Science & Technology', faculty: 'Science', minIb: 37, competitiveIb: 41, subjectNotes: 'HL Maths required' },
      { name: 'BSc in Economics & Finance', faculty: 'Business', minIb: 36, competitiveIb: 40 },
      { name: 'BSc in Global China Studies', faculty: 'Social Sciences', minIb: 34, competitiveIb: 37 },
    ],
    website: 'https://join.hkust.edu.hk',
    color: '#003366',
  },
  {
    id: 'cityu',
    name: 'City University of Hong Kong',
    shortName: 'CityU',
    qsRanking2025: 62,
    qsRanking2024: 70,
    established: 1984,
    campus: 'Kowloon Tong, Kowloon',
    minIb: 30,
    competitiveIbLow: 32,
    competitiveIbHigh: 38,
    tuitionLocal: 47000,
    tuitionNonLocal: 175000,
    englishReq: 'IB English Grade 4+ (A) or Grade 5+ (B SL)',
    chineseReq: 'Varies by programme',
    interviewLikely: false,
    holistic: true,
    strengths: ['Veterinary Medicine', 'Creative Media', 'Law', 'Business', 'Urban campus'],
    programs: [
      { name: 'Bachelor of Arts & Humanities', faculty: 'Arts & Humanities', minIb: 30, competitiveIb: 33 },
      { name: 'BBA', faculty: 'Business', minIb: 31, competitiveIb: 35 },
      { name: 'Bachelor of Engineering', faculty: 'Engineering', minIb: 31, competitiveIb: 36 },
      { name: 'Bachelor of Science', faculty: 'Science', minIb: 30, competitiveIb: 34 },
      { name: 'Bachelor of Veterinary Medicine', faculty: 'Medicine', minIb: 36, competitiveIb: 40, subjectNotes: 'Chemistry & Biology required' },
      { name: 'Bachelor of Laws (LLB)', faculty: 'Law', minIb: 34, competitiveIb: 38 },
      { name: 'Bachelor of Social Sciences', faculty: 'Social Sciences', minIb: 30, competitiveIb: 33 },
    ],
    website: 'https://www.cityu.edu.hk/admo',
    color: '#702F8A',
  },
  {
    id: 'polyu',
    name: 'The Hong Kong Polytechnic University',
    shortName: 'PolyU',
    qsRanking2025: 57,
    qsRanking2024: 65,
    established: 1937,
    campus: 'Hung Hom, Kowloon',
    minIb: 30,
    competitiveIbLow: 32,
    competitiveIbHigh: 36,
    tuitionLocal: 47000,
    tuitionNonLocal: 175000,
    englishReq: 'IB English Grade 4+ (SL/HL)',
    chineseReq: 'Varies by programme',
    interviewLikely: false,
    holistic: true,
    strengths: ['Design', 'Hospitality', 'Engineering', 'Applied sciences', 'Industry placement'],
    programs: [
      { name: 'Bachelor of Design', faculty: 'Arts & Humanities', minIb: 30, competitiveIb: 33 },
      { name: 'BBA', faculty: 'Business', minIb: 30, competitiveIb: 34 },
      { name: 'Bachelor of Engineering', faculty: 'Engineering', minIb: 31, competitiveIb: 35 },
      { name: 'Bachelor of Science', faculty: 'Science', minIb: 30, competitiveIb: 33 },
      { name: 'Bachelor of Hotel & Tourism Management', faculty: 'Business', minIb: 30, competitiveIb: 34 },
      { name: 'Bachelor of Health Sciences', faculty: 'Medicine', minIb: 32, competitiveIb: 36 },
      { name: 'Bachelor of Social Sciences', faculty: 'Social Sciences', minIb: 30, competitiveIb: 32 },
    ],
    website: 'https://www.polyu.edu.hk/study',
    color: '#A02323',
  },
  {
    id: 'hkbu',
    name: 'Hong Kong Baptist University',
    shortName: 'HKBU',
    qsRanking2025: 252,
    qsRanking2024: 295,
    established: 1956,
    campus: 'Kowloon Tong, Kowloon',
    minIb: 28,
    competitiveIbLow: 30,
    competitiveIbHigh: 35,
    tuitionLocal: 47000,
    tuitionNonLocal: 160000,
    englishReq: 'IB English Grade 4+ (SL/HL)',
    chineseReq: 'Varies by programme',
    interviewLikely: false,
    holistic: true,
    strengths: ['Communication', 'Film & Creative industries', 'Chinese Medicine', 'Liberal arts'],
    programs: [
      { name: 'Bachelor of Arts', faculty: 'Arts & Humanities', minIb: 28, competitiveIb: 31 },
      { name: 'BBA', faculty: 'Business', minIb: 29, competitiveIb: 33 },
      { name: 'Bachelor of Science', faculty: 'Science', minIb: 28, competitiveIb: 32 },
      { name: 'Bachelor of Communication', faculty: 'Arts & Humanities', minIb: 29, competitiveIb: 33 },
      { name: 'Bachelor of Social Sciences', faculty: 'Social Sciences', minIb: 28, competitiveIb: 31 },
    ],
    website: 'https://admissions.hkbu.edu.hk',
    color: '#0054A4',
  },
  {
    id: 'lingnan',
    name: 'Lingnan University',
    shortName: 'Lingnan',
    qsRanking2025: 701,
    qsRanking2024: 641,
    established: 1967,
    campus: 'Tuen Mun, New Territories',
    minIb: 26,
    competitiveIbLow: 28,
    competitiveIbHigh: 32,
    tuitionLocal: 47000,
    tuitionNonLocal: 145000,
    englishReq: 'IB English Grade 4+ (SL/HL)',
    chineseReq: 'Not mandatory',
    interviewLikely: false,
    holistic: true,
    strengths: ['Liberal arts', 'Small class sizes', 'Global exchanges', 'Close-knit community'],
    programs: [
      { name: 'Bachelor of Arts', faculty: 'Arts & Humanities', minIb: 26, competitiveIb: 29 },
      { name: 'BBA', faculty: 'Business', minIb: 27, competitiveIb: 30 },
      { name: 'Bachelor of Social Sciences', faculty: 'Social Sciences', minIb: 26, competitiveIb: 29 },
    ],
    website: 'https://www.ln.edu.hk/admissions',
    color: '#8B0000',
  },
]

export function getFitLevel(
  ibScore: number,
  uni: University,
  faculty?: Faculty
): 'reach' | 'target' | 'safety' | 'unlikely' {
  const programs = faculty
    ? uni.programs.filter((p) => p.faculty === faculty)
    : uni.programs

  if (programs.length === 0) {
    return getFitLevel(ibScore, uni)
  }

  const minCompetitive = Math.min(...programs.map((p) => p.competitiveIb))
  const maxMin = Math.max(...programs.map((p) => p.minIb))

  if (ibScore >= minCompetitive + 2) return 'safety'
  if (ibScore >= minCompetitive) return 'target'
  if (ibScore >= maxMin) return 'reach'
  return 'unlikely'
}

export function formatCurrency(hkd: number): string {
  return new Intl.NumberFormat('en-HK', {
    style: 'currency',
    currency: 'HKD',
    maximumFractionDigits: 0,
  }).format(hkd)
}
