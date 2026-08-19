import type { AlgorithmDefinition } from '@/types/report'

export const ALGORITHMS: AlgorithmDefinition[] = [
  {
    id: 'cnn',
    name: 'CNN',
    fullName: 'Convolutional Neural Network',
    tagline: 'Spatial patterns in images & video',
    accent: '#38bdf8',
    icon: 'layers',
  },
  {
    id: 'svm',
    name: 'SVM',
    fullName: 'Support Vector Machine',
    tagline: 'Strong margins on structured data',
    accent: '#a78bfa',
    icon: 'git-branch',
  },
  {
    id: 'random-forest',
    name: 'Random Forest',
    fullName: 'Random Forest Classifier',
    tagline: 'Robust ensembles for tabular tasks',
    accent: '#34d399',
    icon: 'tree',
  },
  {
    id: 'knn',
    name: 'KNN',
    fullName: 'K-Nearest Neighbors',
    tagline: 'Simple similarity-based decisions',
    accent: '#fbbf24',
    icon: 'users',
  },
  {
    id: 'rnn',
    name: 'RNN',
    fullName: 'Recurrent Neural Network',
    tagline: 'Sequential & time-series modeling',
    accent: '#fb7185',
    icon: 'repeat',
  },
]

export const APPROVED_SOURCES = [
  'arXiv',
  'Semantic Scholar',
  'Papers With Code',
  'Kaggle',
  'UCI ML Repository',
  'Hugging Face',
  'NOAA',
  'OpenWeather',
  'ImageNet (metadata)',
]

export function getAlgorithm(id: string): AlgorithmDefinition | undefined {
  return ALGORITHMS.find((algorithm) => algorithm.id === id)
}
