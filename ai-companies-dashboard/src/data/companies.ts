export type Region = 'usa' | 'china' | 'global';

export interface CompanyMetrics {
  arenaElo: number;
  mmlu: number;
  gpqa: number;
  humanEval: number;
  sweBench: number;
  math: number;
  inferenceSpeed: number;
  contextWindow: number;
  costEfficiency: number;
  multimodal: number;
  research: number;
  ecosystem: number;
  openSource: number;
}

export interface Company {
  id: string;
  name: string;
  region: Region;
  country: string;
  flag: string;
  flagshipModel: string;
  founded: number;
  valuation: string;
  metrics: CompanyMetrics;
  strengths: string[];
  weaknesses: string[];
  color: string;
}

export const METRIC_LABELS: Record<keyof CompanyMetrics, { label: string; unit: string; description: string }> = {
  arenaElo: { label: 'Arena Elo', unit: 'pts', description: 'LMArena human preference rating' },
  mmlu: { label: 'MMLU', unit: '%', description: 'Massive Multitask Language Understanding' },
  gpqa: { label: 'GPQA Diamond', unit: '%', description: 'Graduate-level science reasoning' },
  humanEval: { label: 'HumanEval', unit: '%', description: 'Python code generation accuracy' },
  sweBench: { label: 'SWE-bench', unit: '%', description: 'Real-world software engineering tasks' },
  math: { label: 'MATH', unit: '%', description: 'Competition mathematics problems' },
  inferenceSpeed: { label: 'Inference Speed', unit: 'tok/s', description: 'Tokens generated per second' },
  contextWindow: { label: 'Context Window', unit: 'M', description: 'Maximum input context in millions of tokens' },
  costEfficiency: { label: 'Cost Efficiency', unit: '/100', description: 'Performance per dollar (higher = better value)' },
  multimodal: { label: 'Multimodal', unit: '/100', description: 'Vision, audio, and video capabilities' },
  research: { label: 'Research Output', unit: '/100', description: 'Papers, breakthroughs, and innovation pace' },
  ecosystem: { label: 'Ecosystem', unit: '/100', description: 'API adoption, developer tools, and integrations' },
  openSource: { label: 'Open Source', unit: '/100', description: 'Model openness and community contribution' },
};

export const BENCHMARK_METRICS: (keyof CompanyMetrics)[] = [
  'arenaElo', 'mmlu', 'gpqa', 'humanEval', 'sweBench', 'math',
];

export const CAPABILITY_METRICS: (keyof CompanyMetrics)[] = [
  'inferenceSpeed', 'contextWindow', 'costEfficiency', 'multimodal',
  'research', 'ecosystem', 'openSource',
];

export const companies: Company[] = [
  {
    id: 'anthropic',
    name: 'Anthropic',
    region: 'usa',
    country: 'United States',
    flag: '🇺🇸',
    flagshipModel: 'Claude Opus 4.8 / Fable 5',
    founded: 2021,
    valuation: '$61B',
    color: '#D97757',
    metrics: {
      arenaElo: 1580, mmlu: 94.6, gpqa: 93.6, humanEval: 96.2, sweBench: 95.0,
      math: 95.1, inferenceSpeed: 72, contextWindow: 1.0, costEfficiency: 55,
      multimodal: 82, research: 95, ecosystem: 88, openSource: 25,
    },
    strengths: ['#1 coding & agentic workflows', 'Best SWE-bench scores', 'Strong safety research', 'Computer-use capabilities'],
    weaknesses: ['Premium pricing', 'Limited open-source models', 'Slower inference vs OpenAI'],
  },
  {
    id: 'openai',
    name: 'OpenAI',
    region: 'usa',
    country: 'United States',
    flag: '🇺🇸',
    flagshipModel: 'GPT-5.6 / GPT-5.5 Pro',
    founded: 2015,
    valuation: '$300B',
    color: '#10A37F',
    metrics: {
      arenaElo: 1551, mmlu: 93.8, gpqa: 92.4, humanEval: 95.4, sweBench: 80.0,
      math: 97.8, inferenceSpeed: 96, contextWindow: 1.0, costEfficiency: 60,
      multimodal: 90, research: 92, ecosystem: 98, openSource: 30,
    },
    strengths: ['Fastest inference speed', 'Largest developer ecosystem', 'Voice & multimodal leader', 'Strong math reasoning'],
    weaknesses: ['SWE-bench trails Anthropic', 'High Pro-tier pricing', 'Closed model weights'],
  },
  {
    id: 'google',
    name: 'Google DeepMind',
    region: 'usa',
    country: 'United States',
    flag: '🇺🇸',
    flagshipModel: 'Gemini 3.1 Pro',
    founded: 2010,
    valuation: 'Alphabet subsidiary',
    color: '#4285F4',
    metrics: {
      arenaElo: 1538, mmlu: 92.6, gpqa: 94.3, humanEval: 92.8, sweBench: 80.6,
      math: 100, inferenceSpeed: 85, contextWindow: 2.0, costEfficiency: 78,
      multimodal: 95, research: 98, ecosystem: 90, openSource: 45,
    },
    strengths: ['#1 GPQA science reasoning', '2M token context window', 'Best cost-performance ratio', 'Native multimodal architecture'],
    weaknesses: ['Arena Elo below Anthropic/OpenAI', 'Product UX inconsistency', 'Slower enterprise adoption'],
  },
  {
    id: 'meta',
    name: 'Meta AI',
    region: 'usa',
    country: 'United States',
    flag: '🇺🇸',
    flagshipModel: 'Llama 5 Maverick',
    founded: 2013,
    valuation: 'Meta subsidiary',
    color: '#0668E1',
    metrics: {
      arenaElo: 1487, mmlu: 86.4, gpqa: 62.8, humanEval: 85.7, sweBench: 50.4,
      math: 82.1, inferenceSpeed: 110, contextWindow: 0.128, costEfficiency: 95,
      multimodal: 75, research: 85, ecosystem: 92, openSource: 98,
    },
    strengths: ['Leading open-source models', 'Massive community adoption', 'Self-hosting flexibility', 'Fast inference'],
    weaknesses: ['Frontier benchmarks lag closed models', 'Smaller context window', 'Less enterprise support'],
  },
  {
    id: 'xai',
    name: 'xAI',
    region: 'usa',
    country: 'United States',
    flag: '🇺🇸',
    flagshipModel: 'Grok 4',
    founded: 2023,
    valuation: '$50B',
    color: '#1DA1F2',
    metrics: {
      arenaElo: 1470, mmlu: 90.2, gpqa: 72.1, humanEval: 90.6, sweBench: 62.8,
      math: 89.4, inferenceSpeed: 88, contextWindow: 0.256, costEfficiency: 70,
      multimodal: 78, research: 72, ecosystem: 65, openSource: 40,
    },
    strengths: ['Real-time X/Twitter data access', 'Rapid iteration pace', 'Competitive mid-tier pricing', 'Strong general chat'],
    weaknesses: ['Research depth vs Google/Anthropic', 'Smaller developer ecosystem', 'Limited enterprise presence'],
  },
  {
    id: 'microsoft',
    name: 'Microsoft AI',
    region: 'usa',
    country: 'United States',
    flag: '🇺🇸',
    flagshipModel: 'Copilot / Azure OpenAI',
    founded: 1975,
    valuation: '$3.1T (parent)',
    color: '#00A4EF',
    metrics: {
      arenaElo: 1520, mmlu: 91.5, gpqa: 88.0, humanEval: 91.0, sweBench: 75.0,
      math: 90.0, inferenceSpeed: 80, contextWindow: 1.0, costEfficiency: 65,
      multimodal: 85, research: 80, ecosystem: 96, openSource: 35,
    },
    strengths: ['Enterprise distribution at scale', 'GitHub Copilot dominance', 'Azure cloud integration', 'Office 365 embedding'],
    weaknesses: ['Relies on OpenAI models', 'Less frontier research', 'Not a pure-play AI lab'],
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    region: 'china',
    country: 'China',
    flag: '🇨🇳',
    flagshipModel: 'DeepSeek V4 Pro / R2',
    founded: 2023,
    valuation: 'Private',
    color: '#4F46E5',
    metrics: {
      arenaElo: 1450, mmlu: 88.7, gpqa: 79.9, humanEval: 90.8, sweBench: 67.8,
      math: 96.4, inferenceSpeed: 75, contextWindow: 1.0, costEfficiency: 98,
      multimodal: 70, research: 88, ecosystem: 75, openSource: 90,
    },
    strengths: ['Best cost-efficiency globally', 'Open-weight frontier models', 'Strong math & reasoning', 'Disrupted pricing market'],
    weaknesses: ['GPQA below US frontier', 'US export restrictions', 'Brand trust in Western enterprise'],
  },
  {
    id: 'alibaba',
    name: 'Alibaba (Qwen)',
    region: 'china',
    country: 'China',
    flag: '🇨🇳',
    flagshipModel: 'Qwen 3.7 Max',
    founded: 1999,
    valuation: '$200B+ (parent)',
    color: '#FF6A00',
    metrics: {
      arenaElo: 1450, mmlu: 88.4, gpqa: 88.4, humanEval: 88.4, sweBench: 76.4,
      math: 91.3, inferenceSpeed: 70, contextWindow: 1.0, costEfficiency: 85,
      multimodal: 80, research: 82, ecosystem: 78, openSource: 85,
    },
    strengths: ['Strong multilingual (especially Chinese)', 'Open Qwen model family', 'Competitive coding benchmarks', 'Cloud integration via Alibaba Cloud'],
    weaknesses: ['Arena Elo below US top tier', 'Less Western developer mindshare', 'Geopolitical cloud concerns'],
  },
  {
    id: 'moonshot',
    name: 'Moonshot AI',
    region: 'china',
    country: 'China',
    flag: '🇨🇳',
    flagshipModel: 'Kimi K3',
    founded: 2023,
    valuation: '$3.3B',
    color: '#7C3AED',
    metrics: {
      arenaElo: 1516, mmlu: 87.0, gpqa: 78.0, humanEval: 92.0, sweBench: 82.0,
      math: 88.0, inferenceSpeed: 55, contextWindow: 1.0, costEfficiency: 88,
      multimodal: 72, research: 80, ecosystem: 60, openSource: 80,
    },
    strengths: ['#1 coding arena (Frontend Code)', 'Open-weight 2.8T MoE model', 'Long-context pioneer', 'Rapid product growth'],
    weaknesses: ['Slower inference speed', 'Smaller global ecosystem', 'General text Elo mid-pack'],
  },
  {
    id: 'bytedance',
    name: 'ByteDance',
    region: 'china',
    country: 'China',
    flag: '🇨🇳',
    flagshipModel: 'Doubao 2.0',
    founded: 2012,
    valuation: '$268B (parent)',
    color: '#FE2C55',
    metrics: {
      arenaElo: 1420, mmlu: 86.0, gpqa: 72.0, humanEval: 87.0, sweBench: 60.0,
      math: 85.0, inferenceSpeed: 90, contextWindow: 0.256, costEfficiency: 82,
      multimodal: 85, research: 75, ecosystem: 70, openSource: 50,
    },
    strengths: ['Massive user base via TikTok/Douyin', 'Video understanding leader', 'Fast inference at scale', 'Consumer AI product focus'],
    weaknesses: ['Benchmark scores below frontier', 'Limited open-source release', 'Regulatory scrutiny globally'],
  },
  {
    id: 'baidu',
    name: 'Baidu',
    region: 'china',
    country: 'China',
    flag: '🇨🇳',
    flagshipModel: 'ERNIE 5.0',
    founded: 2000,
    valuation: '$35B (parent)',
    color: '#2932E1',
    metrics: {
      arenaElo: 1400, mmlu: 85.0, gpqa: 70.0, humanEval: 84.0, sweBench: 55.0,
      math: 83.0, inferenceSpeed: 65, contextWindow: 0.128, costEfficiency: 75,
      multimodal: 78, research: 78, ecosystem: 72, openSource: 55,
    },
    strengths: ['First major Chinese LLM (ERNIE)', 'Search integration advantage', 'Autonomous driving (Apollo) synergy', 'Government AI partnerships'],
    weaknesses: ['Benchmark gap vs DeepSeek/Alibaba', 'Smaller context window', 'Slower innovation pace recently'],
  },
  {
    id: 'zhipu',
    name: 'Zhipu AI',
    region: 'china',
    country: 'China',
    flag: '🇨🇳',
    flagshipModel: 'GLM-5',
    founded: 2019,
    valuation: '$2.8B',
    color: '#059669',
    metrics: {
      arenaElo: 1410, mmlu: 86.5, gpqa: 74.0, humanEval: 86.0, sweBench: 58.0,
      math: 86.0, inferenceSpeed: 68, contextWindow: 0.128, costEfficiency: 80,
      multimodal: 74, research: 82, ecosystem: 65, openSource: 75,
    },
    strengths: ['Tsinghua University research roots', 'GLM open model family', 'Strong academic partnerships', 'Agent framework (AutoGLM)'],
    weaknesses: ['Smaller scale vs ByteDance/Alibaba', 'Context window limitations', 'Less global brand recognition'],
  },
  {
    id: 'tencent',
    name: 'Tencent',
    region: 'china',
    country: 'China',
    flag: '🇨🇳',
    flagshipModel: 'Hunyuan 2.0',
    founded: 1998,
    valuation: '$500B+ (parent)',
    color: '#07C160',
    metrics: {
      arenaElo: 1390, mmlu: 84.0, gpqa: 68.0, humanEval: 83.0, sweBench: 52.0,
      math: 81.0, inferenceSpeed: 72, contextWindow: 0.256, costEfficiency: 72,
      multimodal: 80, research: 76, ecosystem: 85, openSource: 40,
    },
    strengths: ['WeChat ecosystem integration', 'Gaming & social AI applications', 'Strong cloud infrastructure', 'Massive data moat'],
    weaknesses: ['Frontier benchmarks lag peers', 'Less open-source contribution', 'Consumer focus over research'],
  },
  {
    id: 'mistral',
    name: 'Mistral AI',
    region: 'global',
    country: 'France',
    flag: '🇫🇷',
    flagshipModel: 'Mistral Large 3',
    founded: 2023,
    valuation: '$6B',
    color: '#F97316',
    metrics: {
      arenaElo: 1430, mmlu: 87.0, gpqa: 75.0, humanEval: 88.0, sweBench: 62.0,
      math: 86.0, inferenceSpeed: 95, contextWindow: 0.128, costEfficiency: 80,
      multimodal: 65, research: 80, ecosystem: 70, openSource: 88,
    },
    strengths: ['European AI champion', 'Efficient model architecture', 'Strong open-weight releases', 'EU regulatory alignment'],
    weaknesses: ['Smaller than US/China giants', 'Limited multimodal capabilities', 'Narrower context windows'],
  },
];

export function normalizeMetric(key: keyof CompanyMetrics, value: number): number {
  const ranges: Record<keyof CompanyMetrics, [number, number]> = {
    arenaElo: [1350, 1600],
    mmlu: [80, 96],
    gpqa: [60, 96],
    humanEval: [80, 98],
    sweBench: [45, 96],
    math: [78, 100],
    inferenceSpeed: [50, 115],
    contextWindow: [0.1, 2.0],
    costEfficiency: [50, 100],
    multimodal: [60, 98],
    research: [65, 100],
    ecosystem: [55, 100],
    openSource: [20, 100],
  };
  const [min, max] = ranges[key];
  return Math.round(((value - min) / (max - min)) * 100);
}
