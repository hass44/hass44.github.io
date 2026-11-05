const CASES = {
  "ailitho": {
    "track": "Track 01 / LLM systems",
    "title": "aiLITHO at KLA",
    "lead": "Built tools, document ingestion, and evaluation for a production platform that lets KLA engineers query semiconductor manufacturing data in plain language. Rebuilt 66 knowledge modules with all search metadata preserved and delivered CI with 478 passing unit tests.",
    "sections": [
      [
        "Problem",
        [
          "Engineers needed answers from manufacturing data and expert knowledge without going through a specialist each time, and answers about production tools have to be right."
        ]
      ],
      [
        "What I built",
        [
          "A multimodal ingestion pipeline that turns manuals, PDFs, slides, images and expert-interview recordings into searchable, RAG-ready knowledge.",
          "Rebuilt all <b>66</b> domain knowledge modules reproducibly with <b>100%</b> of search metadata kept, guarded by retrieval regression tests.",
          "Integrated a self-hosted <b>Gemma 4</b> mixture-of-experts model (131k context, vLLM) and contributed to fine-tuning.",
          "A deterministic time tool, so agents turn \"last 13 hours\" into exact query ranges instead of guessing."
        ]
      ],
      [
        "Measuring it",
        [
          "LLM evaluation with MLflow and LLM-as-judge; trace analysis traced evaluation cost (~662k input tokens per question) to oversized tool responses, and I recommended bounding them.",
          "Docker and Azure DevOps CI with <b>478</b> unit tests passing."
        ]
      ]
    ],
    "tech": "LangGraph · LangChain · RAG · vLLM · Gemma 4 · MLflow · Docker · Azure DevOps"
  },
  "cdsem": {
    "track": "Track 02 / Industrial ML",
    "title": "Wafer defect detection",
    "lead": "Replaced manual CD-SEM image checks with a convolutional-autoencoder defect detector deployed with Micron Technology. Took it from prototype through 15+ releases and added defect categorization to explain likely causes.",
    "sections": [
      [
        "What I built",
        [
          "The detector itself, taken from prototype to product over <b>15+ releases</b>.",
          "A defect-categorization module that groups flagged images by likely root cause, so engineers get a reason and not just a score.",
          "A root-cause tool linking recurring wafer-map patterns to specific tools and process steps (PCA, autoencoders, SHAP) with interactive Plotly reports."
        ]
      ],
      [
        "Keeping it honest",
        [
          "Caught inflated accuracy from leakage between wafer lots and switched to lot-held-out cross-validation.",
          "Cut peak memory by ~42 GB on a 4,632-wafer dataset by removing unneeded SHAP computations."
        ]
      ]
    ],
    "tech": "PyTorch · convolutional autoencoders · Optuna · PCA · SHAP · Plotly · CUDA"
  },
  "surgical": {
    "track": "Track 03 / Computer vision",
    "title": "Surgical video retrieval",
    "lead": "Built a system that identifies the source video and timestamp of a surgical frame with 98% top-1 accuracy and sub-second lookup across 80 surgery videos. Tested robustness with 8,000 queries per perturbation.",
    "sections": [
      [
        "Result",
        [
          "<b>98% top-1 accuracy</b> with sub-second lookup."
        ]
      ],
      [
        "How",
        [
          "Benchmarked general vs surgical foundation-model encoders and three FAISS index types.",
          "Stress-tested robustness on <b>8,000 queries</b> per perturbation."
        ]
      ],
      [
        "Follow-up",
        [
          "Reproduced the SurgLaVi narration-as-supervision pretraining from scratch over 94,094 clip-caption pairs (SurgCLIP, MedSigLIP, DINOv2 + LoRA); an MS-TCN on the frozen features raised phase F1 from 12% to 44.4%."
        ]
      ]
    ],
    "tech": "OpenCLIP · FAISS · DINOv2 · LoRA · MS-TCN",
    "link": [
      "Code on GitLab",
      "https://gitlab.com/nct_tso_students/kptp/query-by-image-video-retrieval"
    ]
  },
  "thesis": {
    "track": "Track 04 / LLM research",
    "title": "Diffusion vs autoregressive code",
    "lead": "Showed when diffusion models outperform autoregressive models at repairing code: with edit locations and fix lengths supplied, diffusion repaired 55.2% of 310 bugs versus 34.5% for AR infilling. Without given lengths, AR led by 11 points; the comparison used the same training data and compute.",
    "sections": [
      [
        "Setup",
        [
          "Adapted Qwen2.5-Coder-7B twice (4.5×10²⁰ FLOPs each) on multi-node H100 clusters."
        ]
      ],
      [
        "Finding",
        [
          "Diffusion's advantage depends on the information it is given, not the paradigm. Given edit locations and fix lengths, the diffusion model repaired <b>55.2%</b> of 310 real multi-location bugs against <b>34.5%</b> for AR infilling.",
          "Without given lengths, AR led by 11 points.",
          "Six hybrid designs, each against a matched AR control: most gains disappear under fair controls; shared weights cut serving memory by 14%."
        ]
      ],
      [
        "Status",
        [
          "Workshop paper in preparation, targeting LLM4Code @ ICSE 2027."
        ]
      ]
    ],
    "tech": "Qwen2.5-Coder · masked diffusion · FSDP · Slurm · H100"
  }
};
const DEX = [
  [
    "aiLITHO agent platform",
    [
      "LLM systems",
      "Industry"
    ],
    "Built tools, document ingestion, and evaluation for a production platform that lets KLA engineers query semiconductor manufacturing data in plain language. Rebuilt 66 knowledge modules with all search metadata preserved and delivered CI with 478 passing unit tests.",
    [
      [
        "Knowledge modules",
        "66"
      ],
      [
        "Unit tests",
        "478"
      ]
    ],
    "LangGraph · RAG · vLLM · MLflow"
  ],
  [
    "Wafer defect detector",
    [
      "Anomaly detection",
      "Industry"
    ],
    "Replaced manual CD-SEM image checks with a convolutional-autoencoder defect detector deployed with Micron Technology. Took it from prototype through 15+ releases and added defect categorization to explain likely causes.",
    [
      [
        "Releases",
        "15+"
      ],
      [
        "Partner",
        "Micron"
      ]
    ],
    "PyTorch · autoencoders · Optuna"
  ],
  [
    "Wafer-map root cause",
    [
      "Analytics",
      "Industry"
    ],
    "Built a root-cause analysis tool that links recurring wafer-map patterns to manufacturing tools and process steps, and cut peak memory use by about 42 GB. Lot-held-out validation exposed data leakage, so the findings are reported as descriptive rather than predictive.",
    [
      [
        "Wafers",
        "4,632"
      ],
      [
        "Peak memory cut",
        "~42 GB"
      ]
    ],
    "PCA · SHAP · Plotly · 70 tests"
  ],
  [
    "Diffusion vs AR for code",
    [
      "LLM research",
      "Thesis"
    ],
    "Showed when diffusion models outperform autoregressive models at repairing code: with edit locations and fix lengths supplied, diffusion repaired 55.2% of 310 bugs versus 34.5% for AR infilling. Without given lengths, AR led by 11 points; the comparison used the same training data and compute.",
    [
      [
        "Diffusion repair",
        "55.2%"
      ],
      [
        "AR infilling",
        "34.5%"
      ]
    ],
    "Qwen2.5-Coder-7B · H100 · FSDP"
  ],
  [
    "Surgical frame retrieval",
    [
      "Computer vision",
      "Medical"
    ],
    "Built a system that identifies the source video and timestamp of a surgical frame with 98% top-1 accuracy and sub-second lookup across 80 surgery videos. Tested robustness with 8,000 queries per perturbation.",
    [
      [
        "Top-1 accuracy",
        "98%"
      ],
      [
        "Queries per perturbation",
        "8,000"
      ]
    ],
    "OpenCLIP · FAISS"
  ],
  [
    "Surgical video-language pretraining",
    [
      "Representation learning",
      "Medical"
    ],
    "Reproduced SurgLaVi's narration-as-supervision pretraining from scratch over 94,094 clip-caption pairs from about 1,100 surgical videos. 64,962 filtered clips beat all 94,094 on zero-shot Cholec80 phase recognition, and an MS-TCN on the frozen features raised phase F1 from 12% to 44.4%.",
    [
      [
        "Clip-caption pairs",
        "94,094"
      ],
      [
        "Phase F1 (MS-TCN)",
        "12% → 44.4%"
      ]
    ],
    "SurgCLIP · MedSigLIP · DINOv2 + LoRA"
  ],
  [
    "MaxViT-Swin-UNet",
    [
      "Segmentation",
      "Medical"
    ],
    "Designed a lymphocyte segmentation model that outperformed UNet, Swin-UNet, and MaxViT baselines on LYSTO, LYON'19, and Lizard. Delivered it to pathologists through a web app.",
    [
      [
        "Benchmarks",
        "LYSTO, LYON'19, Lizard"
      ],
      [
        "Result",
        "state of the art"
      ]
    ],
    "PyTorch · transformers · U-Net"
  ],
  [
    "Energy price forecasting",
    [
      "Time series",
      "Industry"
    ],
    "Built day-ahead electricity-price forecasting models for the German market and delivered dashboards that made the forecasts usable by non-technical decision-makers. Owned the pipeline from data collection and feature engineering to model evaluation, comparing four model families.",
    [
      [
        "Model families",
        "4"
      ],
      [
        "Market",
        "Germany"
      ]
    ],
    "ARIMA · Prophet · XGBoost · N-BEATS"
  ],
  [
    "TestForge",
    [
      "LLM systems",
      "Open source"
    ],
    "Built an agent that writes and repairs pytest suites for untested Python code, achieving a 92.9% mutant kill rate across 16 real-world modules. Deployed it as a FastAPI service with Docker-sandboxed test execution.",
    [
      [
        "Mutant kill rate",
        "92.9%"
      ],
      [
        "Modules",
        "16"
      ]
    ],
    "LangGraph · FastAPI · Docker",
    "https://github.com/hass44/testforge"
  ],
  [
    "FirstSignal",
    [
      "RAG",
      "Hackathon"
    ],
    "Built and deployed a venture-diligence backend that turns documents, repositories, and web sources into searchable evidence. Answers retain claim-level sources, flag contradictions, and abstain when the evidence is insufficient.",
    [
      [
        "Team",
        "3"
      ],
      [
        "Status",
        "live"
      ]
    ],
    "FastAPI · pgvector · LangGraph",
    "https://firstsignal.up.railway.app/"
  ]
];
