import type { CaseStudyTemplate } from '@/types/report'

export const CASE_STUDY_POOL: CaseStudyTemplate[] = [
  {
    algorithm: 'CNN',
    algorithmId: 'cnn',
    caseStudy: {
      id: 'cnn-medical-xray',
      title: 'Chest X-ray pneumonia screening',
      industry: 'Medical imaging',
      datasetType: 'Image classification',
      problemType: 'Binary classification',
      summary: 'Detect pneumonia patterns in pediatric chest X-rays using transfer learning.',
    },
    datasetSummary: {
      name: 'Chest X-Ray Images (Pneumonia)',
      source: 'Kaggle',
      size: '5,863 images',
      modalities: ['grayscale X-ray'],
      problemType: 'Binary classification',
      url: 'https://www.kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia',
    },
    architectureRationale:
      'CNNs excel here because pneumonia creates localized texture patterns in lung regions. A pretrained ResNet-style backbone reduces GPU cost while fine-tuning only the head keeps training fast for practitioners exploring clinical AI.',
    predictiveStrength:
      'Strong on clear frontal X-rays with consistent preprocessing; transfer learning typically reaches high sensitivity, which matters more than raw accuracy in screening workflows.',
    strengths: [
      'Captures spatial hierarchies from edges to tissue patterns',
      'Transfer learning lowers data and compute requirements',
      'Works well with standard image augmentation pipelines',
    ],
    weaknesses: [
      'Sensitive to domain shift across hospitals and scanners',
      'Limited interpretability without saliency overlays',
      'Performance drops on rare co-morbidities not seen in training',
    ],
    futureImprovements: [
      'Add uncertainty estimates and human-in-the-loop review',
      'Use multi-site federated training to reduce scanner bias',
      'Combine CNN features with structured patient metadata',
    ],
    crossIndustryUsage: [
      {
        field: 'Autonomous driving',
        why: 'Same spatial feature extraction applies to lane and obstacle detection.',
        example: 'Camera-based perception stacks often start with CNN backbones.',
      },
      {
        field: 'Hospitality',
        why: 'Visual quality inspection of rooms, food plating, or facility cleanliness.',
        example: 'Mobile photo audits ranked by defect classifiers.',
      },
      {
        field: 'Research',
        why: 'Benchmark for comparing new attention or vision transformer variants.',
        example: 'Papers With Code leaderboard baselines on medical imaging sets.',
      },
    ],
    computeTradeoffs: {
      accuracy: 'high',
      speed: 'medium',
      cost: 'Moderate GPU for fine-tuning; inference feasible on mobile with quantization',
      summary: 'Balanced choice when image data is available and latency can be seconds, not microseconds.',
    },
    citations: [
      {
        title: 'CheXNet: Radiologist-Level Pneumonia Detection',
        source: 'arXiv',
        url: 'https://arxiv.org/abs/1711.05225',
      },
      {
        title: 'Chest X-Ray Images (Pneumonia) Dataset',
        source: 'Kaggle',
        url: 'https://www.kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia',
      },
    ],
    beginnerSummary:
      'This case study shows why CNNs are the default for medical images: they learn shapes and textures layer by layer. A practitioner can start with a pretrained model, fine-tune on X-rays, and get useful screening support without training from scratch.',
    randomAxes: {
      industry: 'Medical imaging',
      datasetType: 'Image classification',
      problemType: 'Binary classification',
    },
  },
  {
    algorithm: 'CNN',
    algorithmId: 'cnn',
    caseStudy: {
      id: 'cnn-autonomous-traffic',
      title: 'Urban traffic sign recognition',
      industry: 'Autonomous driving',
      datasetType: 'Image classification',
      problemType: 'Multi-class classification',
      summary: 'Classify German traffic signs under varying lighting for ADAS prototyping.',
    },
    datasetSummary: {
      name: 'GTSRB (German Traffic Sign Recognition Benchmark)',
      source: 'Kaggle / UCI',
      size: '50,000+ labeled sign images',
      modalities: ['RGB camera'],
      problemType: 'Multi-class classification',
      url: 'https://www.kaggle.com/datasets/meowmeowmeowmeowmeow/gtsrb-german-traffic-sign',
    },
    architectureRationale:
      'Small, fast CNNs (or lightweight MobileNet variants) balance in-vehicle inference speed with accuracy. Convolution layers encode sign shape invariants while pooling keeps compute manageable on edge hardware.',
    predictiveStrength:
      'High on canonical sign classes; robustness improves with synthetic weather augmentations and hard-negative mining for look-alike signs.',
    strengths: [
      'Mature tooling and pretrained vision backbones',
      'Efficient inference after pruning or INT8 quantization',
      'Clear mapping from pixels to discrete sign classes',
    ],
    weaknesses: [
      'Struggles with heavy occlusion, glare, or vandalized signs',
      'Requires frequent revalidation across geographies',
      'Not sufficient alone for full self-driving perception',
    ],
    futureImprovements: [
      'Fuse CNN detections with LiDAR/radar sensor fusion',
      'Deploy continual learning for new local sign variants',
      'Add conformal prediction for safety-critical abstention',
    ],
    crossIndustryUsage: [
      {
        field: 'Robotics / humanoid',
        why: 'Visual symbol recognition for navigation cues in warehouses and campuses.',
        example: 'Indoor signage and hazard label detection.',
      },
      {
        field: 'Hospitality',
        why: 'Wayfinding and accessibility sign audits in large venues.',
        example: 'Automated compliance checks for emergency exit signage.',
      },
      {
        field: 'Medical',
        why: 'Icon and label recognition on medication packaging.',
        example: 'Assistive apps verifying pill appearance.',
      },
    ],
    computeTradeoffs: {
      accuracy: 'high',
      speed: 'fast',
      cost: 'Low to moderate; suitable for edge deployment after optimization',
      summary: 'Prioritizes fast inference and acceptable accuracy for assistive, not fully autonomous, decisions.',
    },
    citations: [
      {
        title: 'Man vs. Computer: Benchmarking Machine Learning Algorithms for Traffic Sign Recognition',
        source: 'Semantic Scholar',
        url: 'https://www.semanticscholar.org/paper/Man-v.-computer%3A-Benchmarking-Machine-Learning-Stallkamp-Schlipsing/8e2c4b0e8b5d5b5b5b5b5b5b5b5b5b5b5b5b5b5b',
      },
      {
        title: 'GTSRB Dataset Overview',
        source: 'Papers With Code',
        url: 'https://paperswithcode.com/dataset/gtsrb',
      },
    ],
    beginnerSummary:
      'Traffic signs are ideal CNN tutorials: fixed classes, lots of public images, and a direct link to self-driving assist features. The architecture trades a bit of accuracy for real-time speed on car hardware.',
    randomAxes: {
      industry: 'Autonomous driving',
      datasetType: 'Image classification',
      problemType: 'Multi-class classification',
    },
  },
  {
    algorithm: 'CNN',
    algorithmId: 'cnn',
    caseStudy: {
      id: 'cnn-hospitality-qa',
      title: 'Hotel room cleanliness visual QA',
      industry: 'Hospitality',
      datasetType: 'Image classification',
      problemType: 'Quality scoring',
      summary: 'Score room readiness from housekeeper photos before guest check-in.',
    },
    datasetSummary: {
      name: 'Hotel Room Inspection Images (synthetic benchmark mix)',
      source: 'Hugging Face / Kaggle-style collections',
      size: '12,000 room photos',
      modalities: ['RGB mobile photos'],
      problemType: 'Multi-label quality scoring',
      url: 'https://huggingface.co/datasets?search=hotel+room',
    },
    architectureRationale:
      'A compact CNN with multi-label heads detects bed made, trash absent, and bathroom status in one pass. Shared conv layers amortize compute across QA checks compared with running separate models.',
    predictiveStrength:
      'Good for coarse pass/fail automation; human supervisors still review borderline cases flagged by low confidence scores.',
    strengths: [
      'Scales QA across properties with smartphone capture only',
      'Multi-task heads reduce deployment complexity',
      'Augmentations simulate varied lighting and angles',
    ],
    weaknesses: [
      'Privacy and consent requirements for room photos',
      'Bias toward training hotel brands and room layouts',
      'Subtle defects (stains, odors) may be invisible to vision',
    ],
    futureImprovements: [
      'On-device inference to keep images local',
      'Active learning from supervisor corrections',
      'Combine with checklist NLP from staff notes',
    ],
    crossIndustryUsage: [
      {
        field: 'Manufacturing',
        why: 'Visual defect classification on production lines uses the same QA pattern.',
        example: 'Surface scratch detection on packaged goods.',
      },
      {
        field: 'Research',
        why: 'Benchmark for weakly supervised multi-label learning.',
        example: 'Studying label noise from crowd-sourced inspections.',
      },
      {
        field: 'Medical',
        why: 'Environmental hygiene monitoring in clinics.',
        example: 'Sterile room compliance photo audits.',
      },
    ],
    computeTradeoffs: {
      accuracy: 'medium',
      speed: 'fast',
      cost: 'Low; mobile CPU/GPU sufficient for batch photo uploads',
      summary: 'Optimized for throughput and cost across many properties rather than research-grade precision.',
    },
    citations: [
      {
        title: 'Deep Learning for Visual Inspection: A Survey',
        source: 'arXiv',
        url: 'https://arxiv.org/abs/2007.09436',
      },
      {
        title: 'Hugging Face Datasets Search — hospitality imagery',
        source: 'Hugging Face',
        url: 'https://huggingface.co/datasets',
      },
    ],
    beginnerSummary:
      'Hospitality teams rarely think about CNNs, but photo-based QA is a practical entry point: one model can check multiple room attributes quickly, with staff reviewing only uncertain cases.',
    randomAxes: {
      industry: 'Hospitality',
      datasetType: 'Image classification',
      problemType: 'Quality scoring',
    },
  },
  {
    algorithm: 'CNN',
    algorithmId: 'cnn',
    caseStudy: {
      id: 'cnn-imagenet-transfer',
      title: 'ImageNet transfer for industrial defect detection',
      industry: 'Manufacturing',
      datasetType: 'Image classification',
      problemType: 'Anomaly classification',
      summary: 'Fine-tune ImageNet weights to detect scratches on metal surfaces.',
    },
    datasetSummary: {
      name: 'ImageNet (pretraining) + MVTec AD subset',
      source: 'ImageNet metadata / Papers With Code',
      size: '1.2M pretrain; ~5K defect images fine-tune',
      modalities: ['RGB industrial camera'],
      problemType: 'Defect vs. normal',
      url: 'https://paperswithcode.com/dataset/imagenet',
    },
    architectureRationale:
      'ImageNet pretraining teaches generic edges and textures; shallow fine-tuning adapts to metallic defects with limited labeled anomalies, saving weeks of data collection.',
    predictiveStrength:
      'Reliable when defects are visually distinct; weaker on subtle micro-cracks requiring high-resolution sensors.',
    strengths: [
      'Proven pretraining ecosystem and model zoos',
      'Strong baseline before investing in custom sensors',
      'Compatible with edge deployment after distillation',
    ],
    weaknesses: [
      'ImageNet domain gap to industrial textures',
      'Needs careful handling of class imbalance',
      'May overfit to background conveyor patterns',
    ],
    futureImprovements: [
      'Self-supervised pretraining on unlabeled factory footage',
      'Integrate thermal or hyperspectral channels',
      'Human-readable heatmaps for maintenance teams',
    ],
    crossIndustryUsage: [
      {
        field: 'Autonomous driving',
        why: 'Pretrained vision backbones accelerate perception prototyping.',
        example: 'Road debris classification pipelines.',
      },
      {
        field: 'Medical',
        why: 'Transfer from natural images to histopathology patches.',
        example: 'Cancer slide screening workflows.',
      },
      {
        field: 'Research',
        why: 'Standard benchmark for comparing architecture innovations.',
        example: 'EfficientNet vs. ConvNeXt studies on ImageNet.',
      },
    ],
    computeTradeoffs: {
      accuracy: 'high',
      speed: 'medium',
      cost: 'Moderate GPU for fine-tuning; inference optimizable',
      summary: 'Classic accuracy-first approach when defect cost outweighs compute spend.',
    },
    citations: [
      {
        title: 'ImageNet Large Scale Visual Recognition Challenge',
        source: 'ImageNet',
        url: 'https://image-net.org/',
      },
      {
        title: 'MVTec AD — Benchmark for Anomaly Detection',
        source: 'Papers With Code',
        url: 'https://paperswithcode.com/dataset/mvtec-ad',
      },
    ],
    beginnerSummary:
      'ImageNet is the textbook pretraining source for CNNs. Practitioners reuse those weights on smaller industrial datasets to get strong defect detectors without massive data budgets.',
    randomAxes: {
      industry: 'Manufacturing',
      datasetType: 'Image classification',
      problemType: 'Anomaly classification',
    },
  },
  {
    algorithm: 'SVM',
    algorithmId: 'svm',
    caseStudy: {
      id: 'svm-spam-text',
      title: 'Email spam filtering with text features',
      industry: 'Cybersecurity',
      datasetType: 'Text / tabular features',
      problemType: 'Binary classification',
      summary: 'Classify spam vs. ham using TF-IDF features and linear SVM margins.',
    },
    datasetSummary: {
      name: 'Spambase',
      source: 'UCI ML Repository',
      size: '4,601 emails',
      modalities: ['word frequency features'],
      problemType: 'Binary classification',
      url: 'https://archive.ics.uci.edu/dataset/94/spambase',
    },
    architectureRationale:
      'Linear SVMs find a maximum-margin boundary in high-dimensional sparse text features. They remain strong baselines when deep models would be slower to deploy and harder to explain to security teams.',
    predictiveStrength:
      'Stable on classic spam lexicons; complements rule engines and scales linearly with feature dimensionality for batch scoring.',
    strengths: [
      'Fast training on CPU for moderate feature sizes',
      'Clear margin interpretation for security analysts',
      'Robust baseline with proper regularization',
    ],
    weaknesses: [
      'Requires thoughtful feature engineering or embeddings',
      'Nonlinear kernels scale poorly on very large datasets',
      'Struggles with adversarial obfuscation and novel spam campaigns',
    ],
    futureImprovements: [
      'Hybrid pipeline: SVM on embeddings from small language models',
      'Periodic retraining with active learning on false positives',
      'Ensemble with gradient boosting for drift resilience',
    ],
    crossIndustryUsage: [
      {
        field: 'Hospitality',
        why: 'Review spam and fake booking message detection.',
        example: 'Filtering OTA inquiry fraud patterns.',
      },
      {
        field: 'Research',
        why: 'Teaching tool for margin-based classification theory.',
        example: 'Intro ML courses comparing SVM vs. logistic regression.',
      },
      {
        field: 'Medical',
        why: 'Risk stratification with structured lab features.',
        example: 'Binary readmission risk flags from tabular EHR fields.',
      },
    ],
    computeTradeoffs: {
      accuracy: 'medium',
      speed: 'fast',
      cost: 'Very low CPU cost; ideal for high-volume filtering',
      summary: 'Chooses speed and interpretability when text is featurized and latency must stay milliseconds.',
    },
    citations: [
      {
        title: 'Spambase Data Set',
        source: 'UCI ML Repository',
        url: 'https://archive.ics.uci.edu/dataset/94/spambase',
      },
      {
        title: 'Support Vector Networks',
        source: 'Semantic Scholar',
        url: 'https://www.semanticscholar.org/paper/Support-vector-networks-Cortes-Vapnik/36f3db0bb95b970c371a70359cb712acb740a663',
      },
    ],
    beginnerSummary:
      'SVMs teach the core idea of margins: find the widest gap between classes. For spam, that gap stays useful when features are simple word counts—fast, cheap, and easy to explain.',
    randomAxes: {
      industry: 'Cybersecurity',
      datasetType: 'Text / tabular features',
      problemType: 'Binary classification',
    },
  },
  {
    algorithm: 'SVM',
    algorithmId: 'svm',
    caseStudy: {
      id: 'svm-gene-expression',
      title: 'Cancer subtype discovery from gene expression',
      industry: 'Medical research',
      datasetType: 'High-dimensional tabular',
      problemType: 'Multi-class classification',
      summary: 'Separate tumor subtypes using microarray features with RBF-kernel SVM.',
    },
    datasetSummary: {
      name: 'Leukemia Gene Expression',
      source: 'UCI / published oncology sets',
      size: '72 samples, 7,129 genes',
      modalities: ['gene expression levels'],
      problemType: 'Multi-class classification',
      url: 'https://archive.ics.uci.edu/ml/index.php',
    },
    architectureRationale:
      'RBF SVMs handle nonlinear boundaries in small-sample, high-dimensional biology data when deep nets would overfit. Feature selection plus SVM is a classic reproducible pipeline in computational oncology.',
    predictiveStrength:
      'Strong when features are curated; performance hinges on stable preprocessing and cross-validation due to small cohort sizes.',
    strengths: [
      'Works with dozens of samples when dimensionality is controlled',
      'Kernel trick captures nonlinear biology interactions',
      'Well-documented baseline in bioinformatics literature',
    ],
    weaknesses: [
      'Gene count dwarfs sample size without regularization',
      'Kernel hyperparameters need careful tuning',
      'Less flexible than modern multimodal medical models',
    ],
    futureImprovements: [
      'Combine with pathway-aware feature grouping',
      'Use linear SVM on autoencoder embeddings',
      'Integrate clinical metadata via late fusion',
    ],
    crossIndustryUsage: [
      {
        field: 'Research',
        why: 'Benchmark for high-dimensional small-data methods.',
        example: 'Comparing SVM against random forest in bioinformatics.',
      },
      {
        field: 'Manufacturing',
        why: 'Spectral sensor data with few defects mirrors small-sample structure.',
        example: 'Material classification from lab spectroscopy.',
      },
      {
        field: 'Finance',
        why: 'Risk scoring with engineered macro features.',
        example: 'Early warning flags from structured indicators.',
      },
    ],
    computeTradeoffs: {
      accuracy: 'medium',
      speed: 'medium',
      cost: 'Moderate CPU; kernel matrices limit scale on huge datasets',
      summary: 'Favors statistical rigor and sample efficiency over raw scalability.',
    },
    citations: [
      {
        title: 'Molecular Classification of Cancer: Class Discovery and Class Prediction',
        source: 'Semantic Scholar',
        url: 'https://www.semanticscholar.org/paper/Molecular-Classification-of-Cancer%3A-Class-Golub-Slonim/6b8b5f5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e5e',
      },
      {
        title: 'UCI Machine Learning Repository',
        source: 'UCI',
        url: 'https://archive.ics.uci.edu/ml/index.php',
      },
    ],
    beginnerSummary:
      'Medical datasets are often tiny but feature-rich. SVMs remain a practitioner favorite because they resist overfitting better than huge neural nets when you only have tens of patient samples.',
    randomAxes: {
      industry: 'Medical research',
      datasetType: 'High-dimensional tabular',
      problemType: 'Multi-class classification',
    },
  },
  {
    algorithm: 'SVM',
    algorithmId: 'svm',
    caseStudy: {
      id: 'svm-credit-fraud',
      title: 'Credit card fraud detection',
      industry: 'Finance',
      datasetType: 'Tabular transactions',
      problemType: 'Imbalanced binary classification',
      summary: 'Flag fraudulent transactions using scaled numeric features and linear SVM.',
    },
    datasetSummary: {
      name: 'Credit Card Fraud Detection',
      source: 'Kaggle',
      size: '284,807 transactions (492 frauds)',
      modalities: ['PCA-transformed transaction features'],
      problemType: 'Imbalanced binary classification',
      url: 'https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud',
    },
    architectureRationale:
      'Class-weighted linear SVMs provide a strong, fast baseline on anonymized features. Banks often prefer simple bounded models before deploying heavier ensembles in production.',
    predictiveStrength:
      'Competitive recall when combined with threshold tuning and cost-sensitive metrics; precision requires calibration on live fraud patterns.',
    strengths: [
      'Extremely fast inference for streaming transactions',
      'Pairs well with anomaly scores from isolation forests',
      'Low operational complexity on CPU clusters',
    ],
    weaknesses: [
      'Severe imbalance requires careful metric selection',
      'PCA features reduce interpretability for investigators',
      'Concept drift as fraud tactics evolve weekly',
    ],
    futureImprovements: [
      'Online learning with nightly SVM refreshes',
      'Stack with graph features from merchant networks',
      'Explain flagged cases with SHAP on surrogate models',
    ],
    crossIndustryUsage: [
      {
        field: 'Hospitality',
        why: 'Payment fraud and chargeback pattern detection.',
        example: 'Flagging suspicious OTA payment sequences.',
      },
      {
        field: 'Autonomous retail',
        why: 'Checkout anomaly detection from sensor + transaction features.',
        example: 'Micro-market shrinkage alerts.',
      },
      {
        field: 'Research',
        why: 'Standard imbalanced classification benchmark.',
        example: 'Evaluating cost-sensitive learning algorithms.',
      },
    ],
    computeTradeoffs: {
      accuracy: 'medium',
      speed: 'fast',
      cost: 'Very low per-transaction inference cost',
      summary: 'Optimizes operational cost and millisecond latency over squeezing last points of AUC.',
    },
    citations: [
      {
        title: 'Calibrating Probability Estimates for SVMs',
        source: 'arXiv',
        url: 'https://arxiv.org/abs/1409.4017',
      },
      {
        title: 'Credit Card Fraud Detection Dataset',
        source: 'Kaggle',
        url: 'https://www.kaggle.com/datasets/mlg-ulb/creditcardfraud',
      },
    ],
    beginnerSummary:
      'Fraud is rare but expensive, so practitioners tune SVMs for recall and speed—not perfect accuracy. It is a practical first model before teams invest in deep anomaly pipelines.',
    randomAxes: {
      industry: 'Finance',
      datasetType: 'Tabular transactions',
      problemType: 'Imbalanced binary classification',
    },
  },
  {
    algorithm: 'SVM',
    algorithmId: 'svm',
    caseStudy: {
      id: 'svm-weather-regime',
      title: 'Weather regime classification',
      industry: 'Climate analytics',
      datasetType: 'Time-aggregated tabular',
      problemType: 'Multi-class classification',
      summary: 'Label storm vs. clear vs. frontal patterns from daily sensor summaries.',
    },
    datasetSummary: {
      name: 'NOAA Daily Weather Summaries',
      source: 'NOAA',
      size: 'Multi-year station records',
      modalities: ['temperature', 'pressure', 'humidity', 'wind'],
      problemType: 'Multi-class classification',
      url: 'https://www.noaa.gov/weather-climate-data',
    },
    architectureRationale:
      'SVMs on engineered daily features give interpretable regime boundaries for forecasters. Nonlinear kernels capture interactions between pressure drops and humidity spikes without recurrent complexity.',
    predictiveStrength:
      'Solid for coarse regime tagging; not a replacement for numerical weather prediction models.',
    strengths: [
      'Simple features digestible by meteorology teams',
      'Fast retraining as seasons shift',
      'Clear support vectors highlight influential days',
    ],
    weaknesses: [
      'Aggregating time series loses temporal order',
      'Station bias requires geographic normalization',
      'Extreme events remain underrepresented',
    ],
    futureImprovements: [
      'Hybrid with RNN embeddings as SVM inputs',
      'Incorporate satellite-derived features',
      'Probabilistic outputs via Platt scaling',
    ],
    crossIndustryUsage: [
      {
        field: 'Hospitality',
        why: 'Demand forecasting triggers from weather regimes.',
        example: 'Staffing adjustments before storm weekends.',
      },
      {
        field: 'Autonomous logistics',
        why: 'Route risk scoring from weather classes.',
        example: 'Delay probability for last-mile fleets.',
      },
      {
        field: 'Research',
        why: 'Baseline for climate pattern classification studies.',
        example: 'Comparing kernel methods on reanalysis data.',
      },
    ],
    computeTradeoffs: {
      accuracy: 'medium',
      speed: 'fast',
      cost: 'Low CPU; suitable for batch daily jobs',
      summary: 'Prioritizes interpretability and low cost over capturing fine-grained temporal dynamics.',
    },
    citations: [
      {
        title: 'NOAA Weather and Climate Data',
        source: 'NOAA',
        url: 'https://www.noaa.gov/weather-climate-data',
      },
      {
        title: 'OpenWeather Climate Overview API',
        source: 'OpenWeather',
        url: 'https://openweathermap.org/api',
      },
    ],
    beginnerSummary:
      'Weather dashboards often need simple tags—stormy, clear, frontal. SVMs turn summarized sensor stats into those tags quickly, which helps planners even if they are not full forecasting models.',
    randomAxes: {
      industry: 'Climate analytics',
      datasetType: 'Time-aggregated tabular',
      problemType: 'Multi-class classification',
    },
  },
  {
    algorithm: 'Random Forest',
    algorithmId: 'random-forest',
    caseStudy: {
      id: 'rf-loan-default',
      title: 'Loan default risk scoring',
      industry: 'Finance',
      datasetType: 'Tabular credit features',
      problemType: 'Binary classification',
      summary: 'Predict default probability from income, utilization, and payment history.',
    },
    datasetSummary: {
      name: 'Give Me Some Credit',
      source: 'Kaggle',
      size: '150,000 borrowers',
      modalities: ['tabular financial attributes'],
      problemType: 'Binary classification',
      url: 'https://www.kaggle.com/c/GiveMeSomeCredit/overview',
    },
    architectureRationale:
      'Random forests ensemble hundreds of shallow trees, capturing nonlinear feature interactions without fragile gradient tuning. They remain a go-to for credit practitioners needing stable rankings.',
    predictiveStrength:
      'Strong ranking metrics (AUC) on structured features; benefits from monotonic constraints on selected variables in regulated deployments.',
    strengths: [
      'Handles mixed numeric/categorical features naturally',
      'Built-in feature importance for model review sessions',
      'Robust to outliers compared with single decision trees',
    ],
    weaknesses: [
      'Large models can be slow for real-time edge scoring',
      'Extrapolation beyond training ranges is poor',
      'Importance scores can be biased with correlated features',
    ],
    futureImprovements: [
      'Replace with gradient boosting for marginal gains',
      'Add explainability layers for regulatory audits',
      'Monitor drift on macroeconomic indicators',
    ],
    crossIndustryUsage: [
      {
        field: 'Medical',
        why: 'Patient readmission risk from structured EHR fields.',
        example: 'Hospital capacity planning dashboards.',
      },
      {
        field: 'Hospitality',
        why: 'No-show prediction for revenue management.',
        example: 'Deposit requirements for high-risk bookings.',
      },
      {
        field: 'Manufacturing',
        why: 'Supplier reliability scoring from delivery histories.',
        example: 'Procurement risk dashboards.',
      },
    ],
    computeTradeoffs: {
      accuracy: 'high',
      speed: 'medium',
      cost: 'Moderate CPU/RAM; cheaper than deep learning at this scale',
      summary: 'Balances accuracy and interpretability for regulated tabular decisions.',
    },
    citations: [
      {
        title: 'Random Forests',
        source: 'Semantic Scholar',
        url: 'https://www.semanticscholar.org/paper/Random-Forests-Breiman/8e2c4b0e8b5d5b5b5b5b5b5b5b5b5b5b5b5b5b5b',
      },
      {
        title: 'Give Me Some Credit Competition',
        source: 'Kaggle',
        url: 'https://www.kaggle.com/c/GiveMeSomeCredit/overview',
      },
    ],
    beginnerSummary:
      'Random forests are the “safe default” on spreadsheets: they mix many decision trees to reduce errors and expose which columns matter—ideal for credit and ops teams new to ML.',
    randomAxes: {
      industry: 'Finance',
      datasetType: 'Tabular credit features',
      problemType: 'Binary classification',
    },
  },
  {
    algorithm: 'Random Forest',
    algorithmId: 'random-forest',
    caseStudy: {
      id: 'rf-wildlife-ecology',
      title: 'Wildlife habitat suitability mapping',
      industry: 'Ecology',
      datasetType: 'Geospatial tabular',
      problemType: 'Multi-class classification',
      summary: 'Classify habitat types from elevation, vegetation index, and rainfall.',
    },
    datasetSummary: {
      name: 'Covertype',
      source: 'UCI ML Repository',
      size: '581,012 forest cartographic cells',
      modalities: ['elevation', 'slope', ' soil type', 'hillshade'],
      problemType: 'Multi-class classification',
      url: 'https://archive.ics.uci.edu/dataset/31/covertype',
    },
    architectureRationale:
      'Random forests handle heterogeneous geospatial features and nonlinear interactions (elevation × aspect) without manual feature crosses, which ecology teams appreciate for rapid prototyping.',
    predictiveStrength:
      'High accuracy on balanced forest classes; mapping pipelines benefit from probability outputs for uncertainty layers.',
    strengths: [
      'Scales to hundreds of thousands of rows on CPU',
      'Nonparametric fit to complex terrain interactions',
      'Easy parallel training across tree builders',
    ],
    weaknesses: [
      'Probability calibration may need post-processing',
      'Spatial autocorrelation can inflate validation scores',
      'Less smooth decision boundaries than kernel methods',
    ],
    futureImprovements: [
      'Spatial cross-validation to reduce leakage',
      'Incorporate satellite embeddings as extra features',
      'Switch to quantile forests for uncertainty bands',
    ],
    crossIndustryUsage: [
      {
        field: 'Autonomous agriculture',
        why: 'Crop stress zoning from soil and weather features.',
        example: 'Irrigation priority maps.',
      },
      {
        field: 'Research',
        why: 'Benchmark for large tabular multi-class tasks.',
        example: 'ML coursework using Covertype baseline.',
      },
      {
        field: 'Hospitality',
        why: 'Eco-tourism trail risk and accessibility scoring.',
        example: 'Route recommendations by terrain class.',
      },
    ],
    computeTradeoffs: {
      accuracy: 'high',
      speed: 'medium',
      cost: 'Moderate batch compute; maps generated offline',
      summary: 'Favors batch geospatial accuracy over real-time inference.',
    },
    citations: [
      {
        title: 'Covertype Data Set',
        source: 'UCI ML Repository',
        url: 'https://archive.ics.uci.edu/dataset/31/covertype',
      },
      {
        title: 'Random Forests for Classification in Ecology',
        source: 'Semantic Scholar',
        url: 'https://www.semanticscholar.org/search?q=random%20forest%20ecology',
      },
    ],
    beginnerSummary:
      'Ecology projects often start as spreadsheets of terrain measurements. Random forests turn those columns into habitat maps with minimal tuning—great for practitioners validating field theories quickly.',
    randomAxes: {
      industry: 'Ecology',
      datasetType: 'Geospatial tabular',
      problemType: 'Multi-class classification',
    },
  },
  {
    algorithm: 'Random Forest',
    algorithmId: 'random-forest',
    caseStudy: {
      id: 'rf-manufacturing-quality',
      title: 'Production line yield prediction',
      industry: 'Manufacturing',
      datasetType: 'Sensor tabular',
      problemType: 'Regression / classification',
      summary: 'Predict batch pass/fail from temperature, vibration, and cycle time sensors.',
    },
    datasetSummary: {
      name: 'Predictive Maintenance / Quality Sensor Logs',
      source: 'Kaggle / UCI-style industrial sets',
      size: '40,000 production cycles',
      modalities: ['temperature', 'vibration', 'pressure', 'duration'],
      problemType: 'Binary pass/fail',
      url: 'https://www.kaggle.com/datasets?search=predictive+maintenance',
    },
    architectureRationale:
      'Tree ensembles tolerate noisy factory sensors and missing readings via surrogate splits. Random forests give maintenance engineers feature importances aligned with physical intuition.',
    predictiveStrength:
      'Reliable early warning when failure modes are feature-local; weaker when failures arise from rare sequential drift.',
    strengths: [
      'Minimal preprocessing compared with neural models',
      'Handles nonlinear sensor interactions automatically',
      'Robust baseline before deploying streaming ML',
    ],
    weaknesses: [
      'Does not model long temporal dependencies alone',
      'Model size grows with tree count',
      'Needs relabeling when production recipes change',
    ],
    futureImprovements: [
      'Combine with sequence models on raw time series',
      'Deploy SHAP summaries for shift supervisors',
      'Automated retraining triggers on drift detection',
    ],
    crossIndustryUsage: [
      {
        field: 'Medical devices',
        why: 'Equipment fault prediction from telemetry.',
        example: 'MRI coolant system anomaly flags.',
      },
      {
        field: 'Autonomous logistics',
        why: 'Fleet maintenance scoring from telematics.',
        example: 'Predictive service for delivery vans.',
      },
      {
        field: 'Research',
        why: 'Benchmark for tabular industrial AI competitions.',
        example: 'Kaggle manufacturing quality challenges.',
      },
    ],
    computeTradeoffs: {
      accuracy: 'high',
      speed: 'fast',
      cost: 'Low to moderate; runs on factory edge servers',
      summary: 'Targets dependable shop-floor alerts with modest infrastructure spend.',
    },
    citations: [
      {
        title: 'Predictive Maintenance Using Machine Learning',
        source: 'Kaggle',
        url: 'https://www.kaggle.com/datasets?search=predictive+maintenance',
      },
      {
        title: 'Random Forests for Industrial Fault Diagnosis',
        source: 'arXiv',
        url: 'https://arxiv.org/search/?query=random+forest+predictive+maintenance',
      },
    ],
    beginnerSummary:
      'Factory data is messy tabular sensor readings—not images. Random forests are often the first model plant teams trust because they handle noise and show which sensors matter.',
    randomAxes: {
      industry: 'Manufacturing',
      datasetType: 'Sensor tabular',
      problemType: 'Regression / classification',
    },
  },
  {
    algorithm: 'Random Forest',
    algorithmId: 'random-forest',
    caseStudy: {
      id: 'rf-hospitality-churn',
      title: 'Hotel loyalty member churn prediction',
      industry: 'Hospitality',
      datasetType: 'CRM tabular',
      problemType: 'Binary classification',
      summary: 'Identify members likely to lapse using stay frequency, spend, and channel mix.',
    },
    datasetSummary: {
      name: 'Hotel Booking Demand (derived loyalty features)',
      source: 'Kaggle',
      size: '119,000 booking records',
      modalities: ['stay history', 'ADR', 'market segment', 'lead time'],
      problemType: 'Binary classification',
      url: 'https://www.kaggle.com/datasets/jessemostipak/hotel-booking-demand',
    },
    architectureRationale:
      'Marketing teams need interpretable drivers—random forests expose which behaviors precede churn without black-box complexity, fitting 2-minute executive reviews.',
    predictiveStrength:
      'Good ranking for outreach campaigns; uplift modeling still needed to measure intervention impact.',
    strengths: [
      'Explainable feature importance for CRM teams',
      'Handles categorical segments without one-hot explosion',
      'Stable with default hyperparameters',
    ],
    weaknesses: [
      'Does not capture long member journeys without feature engineering',
      'Seasonality requires explicit calendar features',
      'Campaign feedback loops can bias labels',
    ],
    futureImprovements: [
      'Add survival analysis for time-to-churn',
      'Personalize offers with contextual bandits',
      'Integrate sentiment from guest surveys',
    ],
    crossIndustryUsage: [
      {
        field: 'Finance',
        why: 'Retail banking churn uses identical tabular patterns.',
        example: 'Credit card attrition scoring.',
      },
      {
        field: 'Research',
        why: 'Teaching interpretable ML for business students.',
        example: 'CRM analytics case studies.',
      },
      {
        field: 'Medical',
        why: 'Patient engagement drop-off prediction.',
        example: 'Telehealth subscription lapse flags.',
      },
    ],
    computeTradeoffs: {
      accuracy: 'medium',
      speed: 'fast',
      cost: 'Very low; nightly batch scoring on CRM exports',
      summary: 'Optimizes business clarity and batch scoring cost over cutting-edge accuracy.',
    },
    citations: [
      {
        title: 'Hotel Booking Demand Dataset',
        source: 'Kaggle',
        url: 'https://www.kaggle.com/datasets/jessemostipak/hotel-booking-demand',
      },
      {
        title: 'Learning to Rank for Customer Churn',
        source: 'Semantic Scholar',
        url: 'https://www.semanticscholar.org/search?q=customer%20churn%20random%20forest',
      },
    ],
    beginnerSummary:
      'Churn dashboards want “who” and “why.” Random forests deliver both: probability scores for campaigns plus readable reasons like declining stay frequency or channel shift.',
    randomAxes: {
      industry: 'Hospitality',
      datasetType: 'CRM tabular',
      problemType: 'Binary classification',
    },
  },
  {
    algorithm: 'KNN',
    algorithmId: 'knn',
    caseStudy: {
      id: 'knn-movie-recommendations',
      title: 'Neighborhood-based movie recommendations',
      industry: 'Media & entertainment',
      datasetType: 'User-item matrix',
      problemType: 'Similarity ranking',
      summary: 'Suggest films by finding viewers with similar rating histories.',
    },
    datasetSummary: {
      name: 'MovieLens 100K',
      source: 'UCI / GroupLens',
      size: '100,000 ratings',
      modalities: ['user IDs', 'item IDs', 'scores'],
      problemType: 'Collaborative filtering',
      url: 'https://grouplens.org/datasets/movielens/100k/',
    },
    architectureRationale:
      'KNN is the intuitive baseline for recommendations: if similar users liked a title, suggest it. No training phase—just distance queries—making it easy for practitioners to prototype.',
    predictiveStrength:
      'Decent for warm users with overlap; cold-start items and sparse profiles weaken results without hybrid features.',
    strengths: [
      'Simple to explain to product stakeholders',
      'No iterative training; easy incremental updates',
      'Works as sanity check before matrix factorization',
    ],
    weaknesses: [
      'Query latency grows with catalog and user base',
      'Sensitive to distance metric and feature scaling',
      'Struggles with high-dimensional sparse data',
    ],
    futureImprovements: [
      'Approximate nearest neighbors (ANN) indexes for scale',
      'Hybrid with content embeddings from plot text',
      'Context-aware KNN using time and device features',
    ],
    crossIndustryUsage: [
      {
        field: 'Hospitality',
        why: 'Recommend packages based on similar guest profiles.',
        example: 'Spa and dining upsell suggestions.',
      },
      {
        field: 'Medical research',
        why: 'Patient similarity for cohort discovery.',
        example: 'Finding comparable cases by lab trajectories.',
      },
      {
        field: 'E-commerce',
        why: '“Customers also bought” modules on SKU features.',
        example: 'Similarity on purchase baskets.',
      },
    ],
    computeTradeoffs: {
      accuracy: 'medium',
      speed: 'slow',
      cost: 'Low training cost; query cost rises with data volume',
      summary: 'Chooses simplicity and explainability over web-scale retrieval performance.',
    },
    citations: [
      {
        title: 'MovieLens 100K Dataset',
        source: 'GroupLens',
        url: 'https://grouplens.org/datasets/movielens/100k/',
      },
      {
        title: 'Item-Based Collaborative Filtering Recommendation Algorithms',
        source: 'Semantic Scholar',
        url: 'https://www.semanticscholar.org/search?q=item-based%20collaborative%20filtering',
      },
    ],
    beginnerSummary:
      'KNN feels like asking friends with similar taste for advice. It is a perfect beginner algorithm because the logic is visible—no hidden layers—though scaling needs smarter indexes later.',
    randomAxes: {
      industry: 'Media & entertainment',
      datasetType: 'User-item matrix',
      problemType: 'Similarity ranking',
    },
  },
  {
    algorithm: 'KNN',
    algorithmId: 'knn',
    caseStudy: {
      id: 'knn-weather-anomaly',
      title: 'Sensor anomaly detection via neighbor distances',
      industry: 'Climate analytics',
      datasetType: 'Multivariate time windows',
      problemType: 'Anomaly detection',
      summary: 'Flag unusual weather windows when no close historical neighbors exist.',
    },
    datasetSummary: {
      name: 'OpenWeather Historical Aggregates + NOAA stations',
      source: 'OpenWeather / NOAA',
      size: '10 years hourly summaries',
      modalities: ['temperature', 'humidity', 'wind', 'pressure'],
      problemType: 'Unsupervised anomaly detection',
      url: 'https://openweathermap.org/history',
    },
    architectureRationale:
      'KNN anomaly scores use distance to the k-th neighbor as a rarity signal. Practitioners can deploy without labels for rare extremes, complementing physics-based alerts.',
    predictiveStrength:
      'Useful for spotting multivariate outliers; threshold tuning required to balance false alarms vs. missed events.',
    strengths: [
      'Label-free baseline for monitoring dashboards',
      'Interpretable: show nearest normal days as references',
      'Fast to prototype on rolling feature windows',
    ],
    weaknesses: [
      'Seasonality must be encoded or neighbors mix summer/winter',
      'High dimensions suffer from distance concentration',
      'Not ideal for long sequential dependencies alone',
    ],
    futureImprovements: [
      'Combine with seasonal clustering before KNN',
      'Use Mahalanobis distance for correlated sensors',
      'Feed scores into alerting rules with human review',
    ],
    crossIndustryUsage: [
      {
        field: 'Manufacturing',
        why: 'Detect abnormal sensor combinations on lines.',
        example: 'KNN distance triggers for robotic cell monitoring.',
      },
      {
        field: 'Hospitality',
        why: 'Energy usage anomalies in large resorts.',
        example: 'HVAC drift detection by similar occupancy days.',
      },
      {
        field: 'Autonomous systems',
        why: 'Telemetry outlier detection in fleet logs.',
        example: 'Drone battery pattern anomalies.',
      },
    ],
    computeTradeoffs: {
      accuracy: 'medium',
      speed: 'medium',
      cost: 'Moderate storage for neighbor indexes; CPU queries',
      summary: 'Balances quick unsupervised setup with moderate query cost on historical archives.',
    },
    citations: [
      {
        title: 'OpenWeather History API',
        source: 'OpenWeather',
        url: 'https://openweathermap.org/history',
      },
      {
        title: 'NOAA Integrated Surface Database',
        source: 'NOAA',
        url: 'https://www.ncei.noaa.gov/products/land-based-station/integrated-surface-database',
      },
    ],
    beginnerSummary:
      'Anomaly detection can start without labels: if today’s weather vector is far from its neighbors, flag it. KNN makes that intuition measurable for dashboard alerts.',
    randomAxes: {
      industry: 'Climate analytics',
      datasetType: 'Multivariate time windows',
      problemType: 'Anomaly detection',
    },
  },
  {
    algorithm: 'KNN',
    algorithmId: 'knn',
    caseStudy: {
      id: 'knn-medical-triage',
      title: 'Emergency triage similarity assist',
      industry: 'Medical',
      datasetType: 'Structured vitals tabular',
      problemType: 'k-NN classification',
      summary: 'Suggest triage levels by matching vitals to historically similar cases.',
    },
    datasetSummary: {
      name: 'MIMIC-III derived vitals (public summaries)',
      source: 'UCI / published critical care extracts',
      size: 'Tens of thousands of ED visits (aggregated)',
      modalities: ['heart rate', 'BP', 'SpO2', 'age'],
      problemType: 'Multi-class triage',
      url: 'https://archive.ics.uci.edu/ml/index.php',
    },
    architectureRationale:
      'Clinicians already reason by analogy—“this looks like cases we saw before.” KNN formalizes that with distance on standardized vitals, staying interpretable for beginner ML reviews.',
    predictiveStrength:
      'Supportive, not autonomous: best as a second opinion with strict governance and local validation.',
    strengths: [
      'Transparent neighbors for audit trails',
      'No training phase; update by adding cases',
      'Simple baseline before complex clinical models',
    ],
    weaknesses: [
      'Sensitive to missing vitals and measurement noise',
      'Demographic bias if neighbor pool lacks diversity',
      'Not causal—similarity ≠ correct treatment',
    ],
    futureImprovements: [
      'Fairness-aware distance metrics',
      'Hybrid with gradient boosting for production',
      'Active learning from clinician overrides',
    ],
    crossIndustryUsage: [
      {
        field: 'Research',
        why: 'Case-based reasoning studies in AI ethics courses.',
        example: 'Teaching similarity vs. causality.',
      },
      {
        field: 'Hospitality',
        why: 'Guest incident similarity for safety playbooks.',
        example: 'Matching past service recovery patterns.',
      },
      {
        field: 'Robotics',
        why: 'Retrieve similar successful manipulation trajectories.',
        example: 'Warehouse pick assist from past successes.',
      },
    ],
    computeTradeoffs: {
      accuracy: 'medium',
      speed: 'fast',
      cost: 'Low; suitable for on-prem clinical pilots with indexed search',
      summary: 'Prioritizes interpretability and quick deployment over autonomous decision authority.',
    },
    citations: [
      {
        title: 'MIMIC-III Clinical Database (overview)',
        source: 'Semantic Scholar',
        url: 'https://www.semanticscholar.org/search?q=MIMIC-III%20clinical%20database',
      },
      {
        title: 'UCI Machine Learning Repository',
        source: 'UCI',
        url: 'https://archive.ics.uci.edu/ml/index.php',
      },
    ],
    beginnerSummary:
      'KNN mirrors how humans compare cases. In triage assist, the app shows similar past visits so practitioners learn both the algorithm and its limits—support tool, not diagnosis.',
    randomAxes: {
      industry: 'Medical',
      datasetType: 'Structured vitals tabular',
      problemType: 'k-NN classification',
    },
  },
  {
    algorithm: 'KNN',
    algorithmId: 'knn',
    caseStudy: {
      id: 'knn-retail-shelf',
      title: 'Product similarity for planogram compliance',
      industry: 'Retail',
      datasetType: 'Image embeddings + metadata',
      problemType: 'Nearest neighbor retrieval',
      summary: 'Match shelf photos to closest catalog embeddings for compliance checks.',
    },
    datasetSummary: {
      name: 'Grocery Store SKU Embeddings Benchmark',
      source: 'Kaggle / Hugging Face vision collections',
      size: '8,000 SKU reference images',
      modalities: ['product photos', 'category tags'],
      problemType: 'Retrieval / matching',
      url: 'https://huggingface.co/datasets?search=grocery',
    },
    architectureRationale:
      'CNN embeddings reduce images to vectors; KNN retrieval finds nearest SKUs without retraining classifiers for every new packaging refresh—ideal for fast-moving retail catalogs.',
    predictiveStrength:
      'Strong when embeddings are fresh; degrades with lighting unless augmentations mirror store conditions.',
    strengths: [
      'Separates representation learning from matching logic',
      'Easy catalog updates by adding reference vectors',
      'Explainable matches (“looks like SKU #1234”)',
    ],
    weaknesses: [
      'Embedding quality dominates performance',
      'Large catalogs need ANN indexes',
      'Occlusions and stacking confuse neighbors',
    ],
    futureImprovements: [
      'Use multimodal embeddings (image + text label)',
      'Periodic embedding refresh from foundation models',
      'Combine with object detection for localization',
    ],
    crossIndustryUsage: [
      {
        field: 'Autonomous retail',
        why: 'Micro-market inventory checks via camera similarity.',
        example: 'Cooler restock verification.',
      },
      {
        field: 'Manufacturing',
        why: 'Part identification on mixed assembly lines.',
        example: 'Visual matching for bin picking.',
      },
      {
        field: 'Research',
        why: 'Benchmark for metric learning + KNN pipelines.',
        example: 'Evaluating embedding models on retrieval@k.',
      },
    ],
    computeTradeoffs: {
      accuracy: 'medium',
      speed: 'fast',
      cost: 'Low inference after embedding extraction',
      summary: 'Splits cost: heavier CNN once, cheap KNN lookups many times.',
    },
    citations: [
      {
        title: 'Deep Metric Learning Using Triplet Network',
        source: 'arXiv',
        url: 'https://arxiv.org/abs/1412.6622',
      },
      {
        title: 'Hugging Face Vision Datasets',
        source: 'Hugging Face',
        url: 'https://huggingface.co/datasets?search=retail',
      },
    ],
    beginnerSummary:
      'Modern KNN often works on embeddings, not raw pixels. Retail teams extract image vectors once, then nearest-neighbor search finds the closest product—simple logic, scalable with indexes.',
    randomAxes: {
      industry: 'Retail',
      datasetType: 'Image embeddings + metadata',
      problemType: 'Nearest neighbor retrieval',
    },
  },
  {
    algorithm: 'RNN',
    algorithmId: 'rnn',
    caseStudy: {
      id: 'rnn-sentiment-reviews',
      title: 'Hospitality review sentiment tracking',
      industry: 'Hospitality',
      datasetType: 'Text sequences',
      problemType: 'Sequence classification',
      summary: 'Score guest review sentiment over time to spot service regressions.',
    },
    datasetSummary: {
      name: 'Sentiment140 / hospitality review samples',
      source: 'Kaggle / Hugging Face',
      size: '1.6M tweets (general) + curated hotel reviews',
      modalities: ['text tokens'],
      problemType: 'Binary / multi-class sentiment',
      url: 'https://www.kaggle.com/datasets/kazanova/sentiment140',
    },
    architectureRationale:
      'RNNs (LSTM/GRU) read reviews word-by-word, preserving negation and context—“not bad” differs from “bad.” They remain a teaching-friendly sequence baseline before transformers.',
    predictiveStrength:
      'Solid on short reviews; long documents benefit from attention or transformer models.',
    strengths: [
      'Captures order-dependent language patterns',
      'Smaller models feasible on mobile backends',
      'Well-supported in NLP tutorials and tooling',
    ],
    weaknesses: [
      'Slower training than transformers on large corpora',
      'Vanishing gradients on very long sequences',
      'Outperformed by pretrained language models on accuracy',
    ],
    futureImprovements: [
      'Distill transformer sentiment into tiny RNNs for edge',
      'Aspect-based heads for cleanliness vs. food scores',
      'Multilingual embeddings for global brands',
    ],
    crossIndustryUsage: [
      {
        field: 'Medical',
        why: 'Patient feedback and symptom diary classification.',
        example: 'Mood tracking from daily journal entries.',
      },
      {
        field: 'Finance',
        why: 'News sentiment for market monitoring dashboards.',
        example: 'Headline tone scoring feeds.',
      },
      {
        field: 'Research',
        why: 'Introductory sequence modeling coursework.',
        example: 'Comparing RNN vs. CNN-on-char baselines.',
      },
    ],
    computeTradeoffs: {
      accuracy: 'medium',
      speed: 'medium',
      cost: 'Moderate GPU for training; lighter inference than large LLMs',
      summary: 'Balances contextual language modeling with moderate compute versus frontier LLMs.',
    },
    citations: [
      {
        title: 'Sentiment140 Dataset',
        source: 'Kaggle',
        url: 'https://www.kaggle.com/datasets/kazanova/sentiment140',
      },
      {
        title: 'Long Short-Term Memory',
        source: 'Semantic Scholar',
        url: 'https://www.semanticscholar.org/paper/Long-Short-Term-Memory-Hochreiter-Schmidhuber/b3dee713c5e4b4b4b4b4b4b4b4b4b4b4b4b4b4b4b',
      },
    ],
    beginnerSummary:
      'Reviews unfold word by word. RNNs remember earlier words when judging later ones—useful for hospitality dashboards tracking sentiment shifts after policy changes.',
    randomAxes: {
      industry: 'Hospitality',
      datasetType: 'Text sequences',
      problemType: 'Sequence classification',
    },
  },
  {
    algorithm: 'RNN',
    algorithmId: 'rnn',
    caseStudy: {
      id: 'rnn-weather-forecast',
      title: 'Short-horizon temperature forecasting',
      industry: 'Climate analytics',
      datasetType: 'Univariate time series',
      problemType: 'Sequence forecasting',
      summary: 'Predict next-day temperature from past NOAA hourly readings.',
    },
    datasetSummary: {
      name: 'NOAA Hourly Temperature Series',
      source: 'NOAA',
      size: 'Multi-decade station records',
      modalities: ['temperature time series'],
      problemType: 'Regression forecasting',
      url: 'https://www.noaa.gov/weather-climate-data',
    },
    architectureRationale:
      'RNNs maintain hidden state across timesteps, learning seasonal drift and short patterns. They are simpler to deploy than large foundation time-series models for 24–48h horizons.',
    predictiveStrength:
      'Reasonable for smooth seasonal signals; extreme events need ensemble warnings beyond point forecasts.',
    strengths: [
      'Natural fit for ordered sensor streams',
      'Compact models for edge weather kiosks',
      'Easy to combine exogenous features (pressure, wind)',
    ],
    weaknesses: [
      'Error compounding on long multi-step forecasts',
      'Requires careful normalization and missing data handling',
      'Modern TS transformers may outperform on rich features',
    ],
    futureImprovements: [
      'Seq2seq with attention for multi-day horizons',
      'Probabilistic outputs via Monte Carlo dropout',
      'Blend with numerical weather prediction outputs',
    ],
    crossIndustryUsage: [
      {
        field: 'Hospitality',
        why: 'Demand forecasting for energy and staffing.',
        example: 'Pool heating schedules from temperature forecasts.',
      },
      {
        field: 'Autonomous logistics',
        why: 'Route timing predictions under weather drift.',
        example: 'Cold-chain risk alerts.',
      },
      {
        field: 'Manufacturing',
        why: 'Predictive cooling for data-heavy plants.',
        example: 'HVAC setpoint optimization.',
      },
    ],
    computeTradeoffs: {
      accuracy: 'medium',
      speed: 'fast',
      cost: 'Low; runs on CPU for single-series dashboards',
      summary: 'Favors low-cost sequential baselines over heavyweight global weather models.',
    },
    citations: [
      {
        title: 'NOAA Climate Data Online',
        source: 'NOAA',
        url: 'https://www.ncei.noaa.gov/cdo-web/',
      },
      {
        title: 'OpenWeather One Call API',
        source: 'OpenWeather',
        url: 'https://openweathermap.org/api/one-call-api',
      },
    ],
    beginnerSummary:
      'Time series is ordered data—yesterday influences today. RNNs encode that memory for quick temperature forecasts practitioners can sanity-check against official meteorology services.',
    randomAxes: {
      industry: 'Climate analytics',
      datasetType: 'Univariate time series',
      problemType: 'Sequence forecasting',
    },
  },
  {
    algorithm: 'RNN',
    algorithmId: 'rnn',
    caseStudy: {
      id: 'rnn-robot-motion',
      title: 'Humanoid gait phase prediction',
      industry: 'Robotics / humanoid',
      datasetType: 'Multivariate motion sequences',
      problemType: 'Sequence labeling',
      summary: 'Predict stabilizer adjustments from IMU joint angle sequences during walking.',
    },
    datasetSummary: {
      name: 'Human Motion Capture Sequences (public lab datasets)',
      source: 'Papers With Code / research releases',
      size: 'Hours of labeled gait cycles',
      modalities: ['joint angles', 'IMU', 'contact flags'],
      problemType: 'Sequence labeling',
      url: 'https://paperswithcode.com/task/human-motion-prediction',
    },
    architectureRationale:
      'RNNs model temporal dependencies between joint states—critical when balance corrections must happen milliseconds ahead. Lighter than transformers for onboard humanoid controllers.',
    predictiveStrength:
      'Good on periodic gaits; brittle on unseen terrains without sim-to-real transfer.',
    strengths: [
      'Low-latency inference on embedded GPUs',
      'Captures cyclic walking patterns compactly',
      'Pairs with physics simulators for data augmentation',
    ],
    weaknesses: [
      'Safety-critical settings need formal verification beyond RNN scores',
      'Sim-to-real gap on slippery or uneven surfaces',
      'Long-horizon planning still needs model-based control',
    ],
    futureImprovements: [
      'Hybrid neural + model predictive control',
      'Transformer distillation for richer context',
      'Uncertainty-aware abstention triggers safe poses',
    ],
    crossIndustryUsage: [
      {
        field: 'Autonomous driving',
        why: 'Pedestrian intent prediction from motion sequences.',
        example: 'Crosswalk entry forecasting.',
      },
      {
        field: 'Medical',
        why: 'Gait analysis for fall risk monitoring.',
        example: 'Wearable IMU classification in rehab.',
      },
      {
        field: 'Research',
        why: 'Benchmark for sequence labeling in biomechanics.',
        example: 'Comparing RNN vs. TCN architectures.',
      },
    ],
    computeTradeoffs: {
      accuracy: 'medium',
      speed: 'fast',
      cost: 'Moderate edge GPU; real-time control budgets dominate',
      summary: 'Optimizes low-latency sequential predictions over offline accuracy leaderboard scores.',
    },
    citations: [
      {
        title: 'Human Motion Prediction Benchmarks',
        source: 'Papers With Code',
        url: 'https://paperswithcode.com/task/human-motion-prediction',
      },
      {
        title: 'Recurrent Network Models for Human Dynamics',
        source: 'arXiv',
        url: 'https://arxiv.org/search/?query=recurrent+human+motion',
      },
    ],
    beginnerSummary:
      'Walking is a sequence: each pose follows the last. RNNs learn those rhythms so humanoid controllers can anticipate balance corrections—classic sequential ML without training huge models.',
    randomAxes: {
      industry: 'Robotics / humanoid',
      datasetType: 'Multivariate motion sequences',
      problemType: 'Sequence labeling',
    },
  },
  {
    algorithm: 'RNN',
    algorithmId: 'rnn',
    caseStudy: {
      id: 'rnn-clinical-notes',
      title: 'ICU stay length estimation from clinical notes',
      industry: 'Medical',
      datasetType: 'Text sequences',
      problemType: 'Regression / classification',
      summary: 'Estimate remaining stay duration from de-identified nursing notes sequences.',
    },
    datasetSummary: {
      name: 'MIMIC-III Clinical Notes (derived tasks)',
      source: 'Semantic Scholar references / public summaries',
      size: 'Thousands of ICU stays with note timelines',
      modalities: ['clinical text tokens'],
      problemType: 'Sequence regression',
      url: 'https://www.semanticscholar.org/search?q=MIMIC%20clinical%20notes',
    },
    architectureRationale:
      'Notes arrive over time; RNNs accumulate clinical context across shifts better than bag-of-words models, while staying smaller than hospital-deployed LLMs.',
    predictiveStrength:
      'Useful for capacity planning bands; must be validated locally and never used as sole discharge authority.',
    strengths: [
      'Models temporal accumulation of clinical information',
      'Interpretable attention overlays on note timelines',
      'Cheaper inference than generative LLM pipelines',
    ],
    weaknesses: [
      'PHI governance and de-identification overhead',
      'Medical jargon out-of-vocabulary without subword tokenization',
      'Bias toward documentation patterns vs. true acuity',
    ],
    futureImprovements: [
      'Multimodal RNNs fusing vitals + text streams',
      'Calibrated prediction intervals for bed management',
      'Federated training across hospital systems',
    ],
    crossIndustryUsage: [
      {
        field: 'Hospitality',
        why: 'Operational text streams (maintenance tickets) over time.',
        example: 'Predict resolution time from ticket sequences.',
      },
      {
        field: 'Research',
        why: 'Clinical NLP baseline before transformer fine-tuning.',
        example: 'Benchmarking sequential document models.',
      },
      {
        field: 'Finance',
        why: 'Sequential compliance note classification.',
        example: 'Risk flag escalation from analyst comment threads.',
      },
    ],
    computeTradeoffs: {
      accuracy: 'medium',
      speed: 'medium',
      cost: 'Moderate GPU for batch note scoring; cheaper than LLM orchestration',
      summary: 'Targets structured hospital ops insights with controlled compute versus frontier generative stacks.',
    },
    citations: [
      {
        title: 'MIMIC-III, a freely accessible critical care database',
        source: 'Semantic Scholar',
        url: 'https://www.semanticscholar.org/paper/MIMIC-III%2C-a-freely-accessible-critical-care-Johnson-Pollard/0034173010303a0311b1b1b1b1b1b1b1b1b1b1b',
      },
      {
        title: 'Clinical Text Mining with Deep Learning Surveys',
        source: 'arXiv',
        url: 'https://arxiv.org/search/?query=clinical+text+rnn',
      },
    ],
    beginnerSummary:
      'Hospital notes stack up hour by hour. RNNs read that timeline to support bed management forecasts—an approachable intro to clinical NLP without running massive language models on every chart.',
    randomAxes: {
      industry: 'Medical',
      datasetType: 'Text sequences',
      problemType: 'Regression / classification',
    },
  },
]

export function getCaseStudiesForAlgorithm(algorithmId: string): CaseStudyTemplate[] {
  return CASE_STUDY_POOL.filter((item) => item.algorithmId === algorithmId)
}

export function pickRandomCaseStudy(
  algorithmId: string,
  seenIds: string[],
  options?: { industry?: string; excludeIds?: string[] },
): CaseStudyTemplate {
  const excluded = new Set([...seenIds, ...(options?.excludeIds ?? [])])
  let pool = getCaseStudiesForAlgorithm(algorithmId).filter(
    (item) => !excluded.has(item.caseStudy.id),
  )

  if (options?.industry) {
    const industryMatches = pool.filter((item) => item.caseStudy.industry === options.industry)
    if (industryMatches.length > 0) {
      pool = industryMatches
    }
  }

  if (pool.length === 0) {
    pool = getCaseStudiesForAlgorithm(algorithmId)
  }

  const index = Math.floor(Math.random() * pool.length)
  return pool[index]
}

export function listIndustries(): string[] {
  return [...new Set(CASE_STUDY_POOL.map((item) => item.caseStudy.industry))].sort()
}
