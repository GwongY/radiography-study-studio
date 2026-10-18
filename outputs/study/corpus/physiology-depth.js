/*
 * ABCT2326 depth lessons. These split the mechanism-heavy respiratory and
 * digestive lectures into readable units; the original teaching decks remain
 * the notes and every item below points back to its exact slide range.
 */

export const PHYS_DEPTH_ITEMS = [
    {
    "id": "abct2326-resp-ventilation-mechanics",
    "subject": "ABCT2326",
    "unit": "phys.resp",
    "type": "sequence",
    "title": "Ventilation mechanics, compliance and respiratory muscles",
    "tags": [
      "respiratory",
      "mechanism",
      "high-yield",
      "ventilation",
      "boyles-law",
      "compliance",
      "muscles"
    ],
    "priorKnowledge": {
      "level": "dse-bio",
      "covers": "part",
      "dsePart": "core",
      "syllabusRef": { "ref": "edb.bio", "location": "Elective V(c) \"Regulation of gas content in blood\" — mechanism of breathing." },
      sources: [
        {
          "ref": "phys.3",
          "location": "p18 \"Boyle’s Law\""
        },
        {
          "ref": "phys.3",
          "location": "p21 \"Pulmonary ventilation\""
        },
        {
          "ref": "phys.3",
          "location": "p26 \"Compliance\""
        },
        {
          "ref": "phys.3",
          "location": "p28 \"operate the respiratory pump\""
        },
        {
          "ref": "phys.3",
          "location": "p29 \"Muscles used in inhalation\""
        },
        {
          "ref": "phys.3",
          "location": "p31 \"Muscles used in exhalation\""
        }
      ]
    },
    "practice": [
      {
        "type": "sequence",
        "prompt": "Order the biophysical and physiological events that produce quiet inspiration, starting from phrenic nerve firing.",
        "items": [
          "Phrenic and intercostal motor nerves discharge action potentials",
          "Diaphragm contracts downward and external intercostal muscles elevate ribs",
          "Thoracic cavity volume expands, lowering intrapleural pressure from -4 to -6 mmHg",
          "Lungs expand outward, decreasing intrapulmonary pressure from 0 to -1 mmHg",
          "Air flows down pressure gradient into lungs until intrapulmonary pressure reaches 0 mmHg"
        ],
        "explanation": "Inspiration proceeds: neural firing → muscle contraction → thoracic volume expansion → pressure drop → air inflow down gradient."
      },
      {
        "type": "matching",
        "prompt": "Match each breathing phase or condition with the primary respiratory muscles recruited.",
        "pairs": [
          [
            "Quiet inhalation (eupnea)",
            "Diaphragm (75%) and external intercostal muscles (25%)"
          ],
          [
            "Quiet exhalation",
            "No muscle contraction (passive elastic recoil of lungs and chest wall)"
          ],
          [
            "Forced inhalation (hyperpnea)",
            "Accessory muscles: sternocleidomastoid, scalenes, pectoralis minor"
          ],
          [
            "Forced exhalation",
            "Internal intercostals, transversus thoracis, and rectus abdominis"
          ]
        ],
        "explanation": "Quiet inspiration uses diaphragm/externals; quiet expiration is passive; forced inspiration uses accessory neck/chest muscles; forced expiration uses internal intercostals/abdominals."
      },
      {
        "type": "mcq",
        "prompt": "According to Boyle’s law, what directly causes air to rush into the lungs during inspiration?",
        "options": [
          "An increase in thoracic cavity volume decreases intrapulmonary pressure below atmospheric pressure.",
          "Contraction of the abdominal muscles compresses the diaphragm into the chest.",
          "Pulmonary surfactant actively forces alveolar walls to expand outward.",
          "Alveolar PO2 increases above systemic arterial PO2."
        ],
        "answer": 0,
        "explanation": "Boyle’s law dictates that increasing volume lowers gas pressure; expanding the thoracic cage lowers intrapulmonary pressure to -1 mmHg, drawing air in."
      },
      {
        "type": "typed",
        "prompt": "Approximately what percentage of normal air movement during quiet resting inspiration is produced by contraction of the diaphragm?",
        "accept": [
          "75%",
          "75 percent",
          "75",
          "about 75%"
        ],
        "explanation": "Contraction and downward flattening of the diaphragm accounts for roughly 75% of air movement during normal quiet resting breathing."
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A 24-year-old male sustains a stab wound to the left anterior chest wall. He presents with acute severe dyspnea, left-sided pleuritic chest pain, and hyperresonance to percussion with absent breath sounds over the entire left hemithorax. Upright chest radiography confirms a large left pneumothorax with complete collapse of the left lung. Explain why the left lung collapsed immediately when atmospheric air entered the pleural space, and describe the normal physiological mechanism that keeps the lungs inflated against the chest wall.",
        "model": "Normally, the lungs and thoracic cage are held in close apposition by the pleural fluid in the pleural cavity. The lungs possess natural inward elastic recoil (due to elastic connective tissue and alveolar surface tension) tending to pull the lungs inward, while the thoracic cage has outward elastic recoil tending to spring outward. These opposing elastic vectors create a subatmospheric (negative) intrapleural pressure (-4 to -6 mmHg) in the sealed pleural space. This negative intrapleural pressure exerts a continuous outward transpulmonary distending pressure that counteracts inward lung recoil, keeping the alveoli inflated. When the stab wound perforates the parietal pleura, the seal is broken. Atmospheric air (0 mmHg) rushes into the pleural space down its pressure gradient until intrapleural pressure equals atmospheric pressure (0 mmHg). The transpulmonary pressure gradient is abolished; unopposed by negative intrapleural pressure, the left lung elastic recoil causes immediate complete atelectasis (collapse).",
        "rubric": [
          "Identifies that opposing elastic recoils normally create a subatmospheric (-4 to -6 mmHg) intrapleural pressure",
          "Explains that negative intrapleural pressure generates transpulmonary distending pressure that holds lungs inflated",
          "Explains that atmospheric entry into the pleural cavity abolishes transpulmonary pressure, allowing unopposed elastic recoil collapse"
        ]
      }
    ],
    "commonMistakes": [
      "Believing normal quiet exhalation requires active contraction of internal intercostal muscles, when it is entirely passive due to elastic recoil.",
      "Assuming intrapleural pressure is positive during normal quiet breathing; intrapleural pressure remains subatmospheric (-4 to -6 mmHg) throughout the entire normal resting respiratory cycle.",
      "Confusing high compliance with stiff lungs; high compliance means the lungs stretch easily, whereas low compliance means lungs are stiff."
    ],
    "sourceRefs": [
      {
        "ref": "phys.3",
        "location": "p18 \"Boyle’s Law\""
      },
      {
        "ref": "phys.3",
        "location": "p20 \"Pressure and airflow to the lungs\""
      },
      {
        "ref": "phys.3",
        "location": "p21 \"Pulmonary ventilation\""
      },
      {
        "ref": "phys.3",
        "location": "p24 \"Inhalation.\""
      },
      {
        "ref": "phys.3",
        "location": "p25 \"Exhalation.\""
      },
      {
        "ref": "phys.3",
        "location": "p26 \"Compliance\""
      },
      {
        "ref": "phys.3",
        "location": "p28 \"operate the respiratory pump\""
      },
      {
        "ref": "phys.3",
        "location": "p29 \"Muscles used in inhalation\""
      },
      {
        "ref": "phys.3",
        "location": "p31 \"Muscles used in exhalation\""
      }
    ]
  },
    {
    "id": "abct2326-resp-lung-volumes",
    "subject": "ABCT2326",
    "unit": "phys.resp",
    "type": "definition",
    "title": "Respiratory rate, volumes and capacities",
    "tags": [
      "respiratory",
      "measurements",
      "high-yield",
      "spirometry",
      "lung-volumes",
      "capacities",
      "vital-capacity"
    ],
    "practice": [
      {
        "type": "sequence",
        "prompt": "Order the four primary non-overlapping pulmonary volumes from largest to smallest typical volume in an adult male.",
        "items": [
          "Inspiratory reserve volume (IRV ~3,300 mL)",
          "Residual volume (RV ~1,200 mL)",
          "Expiratory reserve volume (ERV ~1,000 mL)",
          "Resting tidal volume (TV ~500 mL)"
        ],
        "explanation": "In adult males: IRV (~3,300 mL) > RV (~1,200 mL) > ERV (~1,000 mL) > TV (~500 mL)."
      },
      {
        "type": "matching",
        "prompt": "Match each pulmonary capacity with its defining mathematical volume formula.",
        "pairs": [
          [
            "Vital capacity (VC)",
            "TV + IRV + ERV"
          ],
          [
            "Inspiratory capacity (IC)",
            "TV + IRV"
          ],
          [
            "Functional residual capacity (FRC)",
            "ERV + RV"
          ],
          [
            "Total lung capacity (TLC)",
            "VC + RV (or TV + IRV + ERV + RV)"
          ]
        ],
        "explanation": "VC sums TV, IRV, and ERV; IC sums TV and IRV; FRC sums ERV and RV; TLC sums all four volumes."
      },
      {
        "type": "mcq",
        "prompt": "Why is it impossible to measure Residual Volume (RV) or Functional Residual Capacity (FRC) using a conventional water-seal or flow-sensor spirometer alone?",
        "options": [
          "Residual volume cannot be voluntarily exhaled into the spirometer mouthpiece.",
          "The atmospheric pressure inside the spirometer destroys alveolar surfactant.",
          "Residual volume exists only in the anatomical dead space of the trachea.",
          "Spirometers can only measure gases that contain carbon monoxide."
        ],
        "answer": 0,
        "explanation": "Because residual volume remains trapped inside the lungs and thoracic cage even after maximal forced expiration, it cannot be exhaled into a spirometer; it requires plethysmography or gas dilution."
      },
      {
        "type": "typed",
        "prompt": "If a patient has a Tidal Volume of 500 mL, an IRV of 2,800 mL, and an ERV of 1,100 mL, what is this patient Vital Capacity (VC) in mL?",
        "accept": [
          "4400 mL",
          "4400",
          "4,400 mL",
          "4,400"
        ],
        "explanation": "Vital Capacity is calculated as TV + IRV + ERV: 500 mL + 2,800 mL + 1,100 mL = 4,400 mL."
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A 58-year-old former factory worker undergoes diagnostic pulmonary function testing (PFT) for progressive exertion-related breathlessness. Spirometry reveals: Tidal Volume 450 mL, Vital Capacity 2,100 mL (predicted 4,500 mL, 47%), and Total Lung Capacity 2,900 mL (predicted 5,800 mL, 50%). The FEV1/FVC ratio is 84% (predicted >75%). High-resolution chest CT reveals extensive subpleural reticular opacities and honeycombing consistent with pulmonary asbestosis. Classify the pattern of pulmonary disease (obstructive vs restrictive), explain why lung volumes are decreased, and explain why the FEV1/FVC ratio is preserved.",
        "model": "The patient presents with a classic restrictive ventilatory defect. In restrictive lung disease: (1) Inhalation of asbestos fibers causes chronic fibrotic scarring and collagen deposition throughout the pulmonary interstitium. This markedly reduces lung compliance (stiff lungs). (2) Because the stiff lungs cannot expand against normal transpulmonary pressures, all volume compartments—including Vital Capacity (VC 47%) and Total Lung Capacity (TLC 50%)—are profoundly decreased. (3) However, there is no airway obstruction; the conducting bronchi and bronchioles remain patent, and increased radial traction from fibrotic parenchymal tissue actually holds small airways open during exhalation. Consequently, the patient can expel their reduced vital capacity rapidly and without resistance, preserving a normal or elevated FEV1/FVC ratio (84%).",
        "rubric": [
          "Classifies the condition as a restrictive ventilatory defect secondary to pulmonary fibrosis/asbestosis",
          "Explains that interstitial fibrosis reduces lung compliance, restricting expansion and shrinking all lung volumes (VC and TLC)",
          "Explains that absence of airway obstruction and increased radial traction preserve normal airflow speed and a normal/elevated FEV1/FVC ratio"
        ]
      }
    ],
    "commonMistakes": [
      "Assuming vital capacity includes residual volume, forgetting that vital capacity measures only air that can be voluntarily moved in and out of the lungs.",
      "Confusing minute ventilation with alveolar ventilation, failing to subtract the 150 mL of anatomical dead space from each breath when calculating effective gas exchange.",
      "Thinking that patients with restrictive lung disease have low FEV1/FVC ratios; low FEV1/FVC (<70%) is the hallmark of obstructive disease, whereas restrictive disease preserves a normal or high ratio (>75–80%)."
    ],
    "sourceRefs": [
      {
        "ref": "phys.3",
        "location": "p32 \"Respiratory rates\""
      },
      {
        "ref": "phys.3",
        "location": "p34 \"Four pulmonary volumes\""
      },
      {
        "ref": "phys.3",
        "location": "p36 \"Pulmonary Volumes and Capacities\""
      },
      {
        "ref": "phys.3",
        "location": "p37 \"Resting tidal volume\""
      },
      {
        "ref": "phys.3",
        "location": "p38 \"Inspiratory capacity\""
      },
      {
        "ref": "phys.3",
        "location": "p39 \"Volumes are decreased\""
      }
    ]
  },
    {
    "id": "abct2326-resp-oxygen-transport",
    "subject": "ABCT2326",
    "unit": "phys.resp",
    "type": "sequence",
    "title": "Partial pressures, haemoglobin and oxygen unloading",
    "tags": [
      "respiratory",
      "gas transport",
      "mechanism",
      "high-yield",
      "oxygen",
      "hemoglobin",
      "bohr-effect"
    ],
    "priorKnowledge": {
      "level": "dse-bio",
      "covers": "part",
      "dsePart": "core",
      "syllabusRef": { "ref": "edb.bio", "location": "Elective V(c) — \"Transport of respiratory gases: oxygen dissociation curve of haemoglobin\"." },
      sources: [
        {
          "ref": "phys.3",
          "location": "p40 \"Gas exchange\""
        },
        {
          "ref": "phys.3",
          "location": "p41 \"Blood arriving in pulmonary arteries has:\""
        },
        {
          "ref": "phys.3",
          "location": "p45 \"Oxygen transport\""
        },
        {
          "ref": "phys.3",
          "location": "p47 \"Oxygen–hemoglobin saturation curve\""
        },
        {
          "ref": "phys.3",
          "location": "p50 \"Bohr effect\""
        },
        {
          "ref": "phys.3",
          "location": "p52 \"Normal blood pH range\""
        }
      ]
    },
    "practice": [
      {
        "type": "matching",
        "prompt": "Match each physiological state with its corresponding impact on the oxygen-hemoglobin dissociation curve.",
        "pairs": [
          [
            "Active skeletal muscle (acidic pH, ↑PCO2, ↑Temp)",
            "Shifts curve to the RIGHT, facilitating oxygen unloading"
          ],
          [
            "Pulmonary capillary bed (alkaline pH, ↓PCO2, cooler)",
            "Shifts curve to the LEFT, enhancing oxygen loading"
          ],
          [
            "P50 under normal physiological conditions",
            "Partial pressure of 26.6 mmHg at 50% saturation"
          ],
          [
            "Mixed venous reserve at rest (PO2 40 mmHg)",
            "Hemoglobin remains approximately 75% saturated"
          ]
        ],
        "explanation": "Active muscle causes a rightward shift; pulmonary conditions cause a leftward shift; normal P50 is 26.6 mmHg; mixed venous saturation is ~75%."
      },
      {
        "type": "sequence",
        "prompt": "Order the partial pressure changes experienced by oxygen as it travels from atmospheric air to actively metabolizing mitochondria.",
        "items": [
          "Dry atmospheric air (PO2 ~159 mmHg)",
          "Alveolar air in the lungs (PO2 ~100 mmHg)",
          "Systemic arterial blood leaving the left ventricle (PO2 ~95–100 mmHg)",
          "Systemic capillary blood after tissue exchange (PO2 ~40 mmHg)",
          "Intracellular cytosol and mitochondria of exercising myocytes (PO2 <15 mmHg)"
        ],
        "explanation": "Oxygen cascades down a continuous partial pressure gradient: 159 mmHg (air) → 100 mmHg (alveoli) → 95 mmHg (artery) → 40 mmHg (vein) → <15 mmHg (cell)."
      },
      {
        "type": "mcq",
        "prompt": "What is the primary physiological benefit of the flat plateau region of the oxygen-hemoglobin dissociation curve between 60 and 100 mmHg?",
        "options": [
          "It provides a safety margin allowing arterial blood to remain >90% saturated even if alveolar PO2 falls moderately.",
          "It causes hemoglobin to immediately release 100% of its oxygen inside pulmonary veins.",
          "It prevents carbon dioxide from converting into bicarbonate ions.",
          "It accelerates the enzymatic action of carbonic anhydrase."
        ],
        "answer": 0,
        "explanation": "The flat plateau ensures that even if alveolar PO2 drops from 100 mmHg to 60 mmHg (e.g. at high altitude or with pulmonary disease), hemoglobin still remains 90% saturated."
      },
      {
        "type": "typed",
        "prompt": "What term describes the physiological phenomenon where an increase in carbon dioxide and hydrogen ion concentration lowers hemoglobin affinity for oxygen?",
        "accept": [
          "Bohr effect",
          "the Bohr effect",
          "Bohr Effect",
          "Bohr"
        ],
        "explanation": "The Bohr effect describes the rightward shift of the oxygen-hemoglobin dissociation curve induced by elevated PCO2 and lower pH (increased H+)."
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A 32-year-old male is trapped in an enclosed garage with a running combustion engine and is pulled out unconscious. In the emergency department, his skin is cherry-red, his respiratory rate is 26/min, and he is comatose. Pulse oximetry shows 99% saturation, and arterial blood gas analysis reveals a PaO2 of 98 mmHg. Co-oximetry reveals a carboxyhemoglobin level of 48%. Explain why pulse oximetry and PaO2 were deceptively normal despite lethal cellular hypoxia, and analyze the two distinct biophysical mechanisms by which carbon monoxide impairs oxygen transport and tissue delivery.",
        "model": "Carbon monoxide (CO) poisoning produces catastrophic tissue hypoxia via two distinct mechanisms: (1) Carbon monoxide binds to the ferrous heme iron of hemoglobin with an affinity approximately 200 to 250 times greater than oxygen, forming carboxyhemoglobin (CO-Hb). At a level of 48%, nearly half of all oxygen-binding sites are occupied by CO, drastically reducing the blood total oxygen-carrying capacity. (2) When CO binds to one or two heme sites on the hemoglobin tetramer, it induces an allosteric conformational shift that locks the remaining heme sites into the high-affinity relaxed (R) state. This causes a severe leftward shift of the oxygen-hemoglobin dissociation curve. Consequently, the remaining bound oxygen cannot be unloaded in peripheral capillaries, starving systemic tissues of oxygen. PaO2 is completely normal (98 mmHg) because PaO2 measures only dissolved oxygen gas in plasma, which is unaffected by CO binding. Routine two-wavelength pulse oximeters cannot distinguish carboxyhemoglobin from oxyhemoglobin, falsely registering CO-Hb as 99% saturated.",
        "rubric": [
          "Explains that PaO2 reflects dissolved plasma oxygen, which remains normal despite massive hemoglobin poisoning",
          "Explains that CO binds heme with 200-fold higher affinity, occupying binding sites and crippling oxygen-carrying capacity",
          "Explains that CO shifts the remaining dissociation curve to the left, preventing oxygen unloading in tissues"
        ]
      }
    ],
    "commonMistakes": [
      "Assuming hemoglobin saturation drops to 0% in systemic veins after delivering oxygen to tissues, forgetting that venous blood remains ~75% saturated at rest (venous reserve).",
      "Confusing the Bohr effect with the Haldane effect; the Bohr effect describes the effect of CO2/H+ on O2 release, whereas the Haldane effect describes the effect of O2 on CO2 loading/unloading.",
      "Believing standard pulse oximetry accurately reflects oxygenation during carbon monoxide poisoning, unaware that pulse oximeters misread carboxyhemoglobin as oxyhemoglobin."
    ],
    "sourceRefs": [
      {
        "ref": "phys.3",
        "location": "p40 \"Gas exchange\""
      },
      {
        "ref": "phys.3",
        "location": "p41 \"Blood arriving in pulmonary arteries has:\""
      },
      {
        "ref": "phys.3",
        "location": "p45 \"Oxygen transport\""
      },
      {
        "ref": "phys.3",
        "location": "p47 \"Oxygen–hemoglobin saturation curve\""
      },
      {
        "ref": "phys.3",
        "location": "p50 \"Bohr effect\""
      },
      {
        "ref": "phys.3",
        "location": "p52 \"Normal blood pH range\""
      },
      {
        "ref": "phys.3",
        "location": "p54 \"Normal blood temperature\""
      }
    ]
  },
    {
    "id": "abct2326-resp-carbon-dioxide-control",
    "subject": "ABCT2326",
    "unit": "phys.resp",
    "type": "sequence",
    "title": "Carbon dioxide transport and feedback control of breathing",
    "tags": [
      "respiratory",
      "gas transport",
      "homeostasis",
      "high-yield",
      "carbon-dioxide",
      "chemoreceptors",
      "brainstem"
    ],
    "priorKnowledge": {
      "level": "dse-bio",
      "covers": "part",
      "dsePart": "elective-hp",
      "syllabusRef": { "ref": "edb.bio", "location": "Elective V(c) — \"Carbon dioxide transport in blood\" and \"Control of respiration: nervous and chemical control\"." },
      sources: [
        {
          "ref": "phys.3",
          "location": "p55 \"Carbon dioxide gas transport\""
        },
        {
          "ref": "phys.3",
          "location": "p56 \"70 percent is transported as carbonic acid\""
        },
        {
          "ref": "phys.3",
          "location": "p57 \"23 percent is bound to amino groups of globular proteins\""
        },
        {
          "ref": "phys.3",
          "location": "p59 \"The respiratory centers of the brain\""
        },
        {
          "ref": "phys.3",
          "location": "p62 \"apneustic and pneumotaxic\""
        },
        {
          "ref": "phys.3",
          "location": "p63 \"Respiratory centers of the medulla oblongata\""
        },
        {
          "ref": "phys.3",
          "location": "p68 \"Chemoreceptor reflexes\""
        },
        {
          "ref": "phys.3",
          "location": "p71 \"Central chemoreceptors that monitor cerebrospinal fluid\""
        },
        {
          "ref": "phys.3",
          "location": "p73 \"Homeostasis of Arterial P\""
        }
      ]
    },
    "practice": [
      {
        "type": "sequence",
        "prompt": "Order the physiological events that occur in response to acute arterial hypercapnia (PCO2 rising from 40 to 52 mmHg).",
        "items": [
          "Arterial PCO2 rises, and lipophilic CO2 diffuses across the blood-brain barrier into cerebrospinal fluid (CSF)",
          "Carbonic anhydrase hydrates CO2 in CSF, generating H+ ions that sharply lower CSF pH",
          "Hydrogen ions directly stimulate central chemoreceptors on the ventrolateral medulla",
          "Chemoreceptors signal the DRG and VRG to increase rate and depth of respiration (hyperventilation)",
          "Excess CO2 is blown off in expired air, restoring arterial PCO2 back to the 40 mmHg homeostatic setpoint"
        ],
        "explanation": "Hypercapnia proceeds: CO2 crosses BBB → CSF pH drops → central chemoreceptors fire → respiratory centers stimulate hyperventilation → PCO2 normalizes."
      },
      {
        "type": "matching",
        "prompt": "Match each respiratory brainstem nucleus or physiological reflex with its definitive functional role.",
        "pairs": [
          [
            "Dorsal Respiratory Group (DRG)",
            "Medullary center setting the intrinsic rhythmic pace of quiet resting inspiration"
          ],
          [
            "Ventral Respiratory Group (VRG)",
            "Medullary center recruited during forced breathing to drive active exhalation and accessory muscles"
          ],
          [
            "Pneumotaxic center",
            "Pontine center that inhibits inspiration, regulating tidal volume and respiratory rate"
          ],
          [
            "Chloride shift (Hamburger phenomenon)",
            "Exchange of plasma Cl- for erythrocyte HCO3- to maintain electroneutrality"
          ]
        ],
        "explanation": "DRG controls quiet inspiration; VRG controls forced breathing; pneumotaxic center terminates inspiration; chloride shift balances bicarbonate transport."
      },
      {
        "type": "mcq",
        "prompt": "What physiological enzyme catalyzes the critical step in erythrocytes responsible for 70% of carbon dioxide transport in human blood?",
        "options": [
          "Carbonic anhydrase",
          "Angiotensin-converting enzyme",
          "Lactate dehydrogenase",
          "Ribulose bisphosphate carboxylase"
        ],
        "answer": 0,
        "explanation": "Carbonic anhydrase in erythrocytes catalyzes the reversible reaction CO2 + H2O ⇌ H2CO3, allowing 70% of carbon dioxide to be transported as bicarbonate."
      },
      {
        "type": "typed",
        "prompt": "What ion enters the erythrocyte in reciprocal exchange for bicarbonate leaving the cell during the chloride shift?",
        "accept": [
          "chloride",
          "chloride ion",
          "Cl-",
          "Cl"
        ],
        "explanation": "Chloride ions (Cl-) enter the red blood cell via the Band 3 anion exchanger to maintain electroneutrality as bicarbonate exits into plasma."
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A 19-year-old college student presents to the student health clinic in a state of severe anxiety following an emotional crisis. She is hyperventilating at 32 breaths per minute. She complains of tingling around her lips (perioral numbness), dizzy lightheadedness, and bilateral involuntary painful flexor spasms of her wrists and fingers (carpopedal spasm/Trousseau sign). Arterial blood gas analysis reveals: PaO2 112 mmHg, PaCO2 20 mmHg, and pH 7.58. Explain the physiological link between acute hyperventilation, arterial PCO2, cerebral blood flow, and the acute neuromuscular irritability (tetany).",
        "model": "The patient is experiencing acute hyperventilation syndrome leading to acute uncompensated respiratory alkalosis. (1) Tachypneic hyperventilation blows off carbon dioxide at a rate far exceeding metabolic production, plummeting arterial PaCO2 from 40 mmHg to 20 mmHg (profound hypocapnia). This shifts the carbonic acid equilibrium leftward (H+ + HCO3- → H2O + CO2), consuming protons and driving arterial pH up to 7.58. (2) Cerebral arterioles are exquisitely sensitive to local PCO2: severe hypocapnia induces intense cerebral arteriolar vasoconstriction, reducing cerebral blood flow by up to 30–40%, causing acute cerebral ischemia that presents as lightheadedness and dizziness. (3) In alkalotic plasma, hydrogen ions dissociate from plasma albumins; the resulting unmasked negative charges on albumin bind circulating free ionized calcium (Ca2+). The sharp drop in ionized calcium (hypocalcemia) destabilizes neuronal and muscle membrane potentials, lowering the electrical threshold of voltage-gated sodium channels. Peripheral motor and sensory nerves spontaneously discharge repetitive action potentials, producing perioral paresthesias and involuntary sustained muscular contractions (carpopedal spasm and tetany).",
        "rubric": [
          "Identifies that hyperventilation causes hypocapnia (PaCO2 20 mmHg) and acute respiratory alkalosis (pH 7.58)",
          "Explains that hypocapnia causes cerebral vasoconstriction, reducing perfusion and causing dizziness",
          "Explains that alkalosis promotes calcium binding to albumin, causing acute hypocalcemia and neuromuscular tetany"
        ]
      }
    ],
    "commonMistakes": [
      "Believing carbon dioxide competes with oxygen for the same heme binding site on hemoglobin; CO2 binds to globin amino groups (carbaminohemoglobin), while oxygen binds to the heme iron.",
      "Assuming the apneustic center turns off inhalation, when the apneustic center actually stimulates inspiration and the pneumotaxic center switches it off.",
      "Thinking that the chloride shift moves chloride out of red blood cells in systemic tissues, when chloride shifts into red blood cells in systemic capillaries and out in pulmonary capillaries."
    ],
    "sourceRefs": [
      {
        "ref": "phys.3",
        "location": "p55 \"Carbon dioxide gas transport\""
      },
      {
        "ref": "phys.3",
        "location": "p56 \"70 percent is transported as carbonic acid\""
      },
      {
        "ref": "phys.3",
        "location": "p57 \"23 percent is bound to amino groups of globular proteins\""
      },
      {
        "ref": "phys.3",
        "location": "p59 \"The respiratory centers of the brain\""
      },
      {
        "ref": "phys.3",
        "location": "p62 \"apneustic and pneumotaxic\""
      },
      {
        "ref": "phys.3",
        "location": "p63 \"Respiratory centers of the medulla oblongata\""
      },
      {
        "ref": "phys.3",
        "location": "p64 \"Dorsal respiratory group\""
      },
      {
        "ref": "phys.3",
        "location": "p66 \"Interactions between VRG and DRG\""
      },
      {
        "ref": "phys.3",
        "location": "p68 \"Chemoreceptor reflexes\""
      },
      {
        "ref": "phys.3",
        "location": "p71 \"Central chemoreceptors that monitor cerebrospinal fluid\""
      },
      {
        "ref": "phys.3",
        "location": "p73 \"Homeostasis of Arterial P\""
      }
    ]
  },
  {
  "id": "abct2326-digestive-wall-motility",
  "subject": "ABCT2326",
  "unit": "phys.dig",
  "type": "sequence",
  "title": "Digestive wall layers, peristalsis, and neural regulation",
  "tags": [
    "digestive",
    "motility",
    "mechanism",
    "high-yield",
    "peristalsis",
    "enteric-nervous-system"
  ],
  "priorKnowledge": {
    "level": "dse-bio",
    "covers": "part",
    "dsePart": "core",
    "syllabusRef": { "ref": "edb.bio", "location": "Compulsory III(b) \"Essential life processes in animals\" — \"Nutrition in humans\": peristalsis and general structure of the digestive tract." },
    sources: [
      {
        "ref": "phys.4",
        "location": "p10 \"Is the inner lining of digestive tract\""
      },
      {
        "ref": "phys.4",
        "location": "p11 \"Is a layer of dense irregular connective tissue\""
      },
      {
        "ref": "phys.4",
        "location": "p12 \"Is dominated by smooth muscle cells\""
      },
      {
        "ref": "phys.4",
        "location": "p12 \"Outer binding and protective layer\""
      },
      {
        "ref": "phys.4",
        "location": "p13 \"Movement of Digestive Materials\""
      },
      {
        "ref": "phys.4",
        "location": "p15 \"Local Factors\""
      },
      {
        "ref": "phys.4",
        "location": "p16 \"Neural Mechanisms\""
      },
      {
        "ref": "phys.4",
        "location": "p17 \"Short reflexes\""
      },
      {
        "ref": "phys.4",
        "location": "p18 \"Hormonal Mechanisms\""
      }
    ]
  },
  "practice": [
    {
      "type": "sequence",
      "prompt": "Order the concentric tissue layers of the gastrointestinal tract wall from the luminal surface outward to the peritoneal cavity.",
      "items": [
        "Mucosa (epithelium, lamina propria, muscularis mucosae)",
        "Submucosa (dense irregular connective tissue)",
        "Muscularis externa (circular and longitudinal smooth muscle)",
        "Serosa (visceral peritoneum)"
      ],
      "explanation": "From deep (luminal) to superficial: Mucosa contacts the lumen, followed by the vascular Submucosa, the contractile Muscularis externa, and the outer protective Serosa."
    },
    {
      "type": "matching",
      "prompt": "Match each gastrointestinal plexus or regulatory mechanism with its anatomical location and primary physiological role.",
      "pairs": [
        [
          "Submucosal (Meissner’s) plexus",
          "Situated in submucosa; regulates glandular secretion and submucosal blood flow"
        ],
        [
          "Myenteric (Auerbach’s) plexus",
          "Situated between circular and longitudinal muscle layers; coordinates gastrointestinal motility"
        ],
        [
          "Short enteric reflexes",
          "Sensory-to-motor loops processed entirely within ENS without central nervous system input"
        ],
        [
          "Long autonomic reflexes",
          "Afferent signals relayed to CNS with parasympathetic outflow stimulating gut activity"
        ]
      ],
      "explanation": "Submucosal plexus controls secretions; myenteric plexus controls motility; short reflexes are purely ENS; long reflexes route through the CNS."
    },
    {
      "type": "mcq",
      "prompt": "Which pattern of muscular contraction moves a digestive bolus forward along the esophagus and intestine by contracting circular smooth muscle behind the bolus while relaxing circular muscle ahead of it?",
      "options": [
        "Peristalsis",
        "Segmentation",
        "Haustral churning",
        "Mass movement"
      ],
      "answer": 0,
      "explanation": "Peristalsis is the propulsive wave created by circular contraction behind the bolus coupled with receptive relaxation and longitudinal shortening ahead."
    },
    {
      "type": "typed",
      "prompt": "Between which two specific smooth muscle layers of the muscularis externa does the myenteric (Auerbach’s) nerve plexus reside?",
      "accept": [
        "circular and longitudinal",
        "circular and longitudinal muscle",
        "circular and longitudinal smooth muscle",
        "inner circular and outer longitudinal",
        "inner circular and outer longitudinal muscle"
      ],
      "explanation": "The myenteric plexus is sandwiched between the inner circular and outer longitudinal layers of the muscularis externa."
    }
  ],
  "application": [
    {
      "type": "scenario",
      "prompt": "A 24-year-old male with severe cervical spinal cord transection at level C5 is stabilized in the neuro-intensive care unit. Despite complete interruption of somatic motor pathways and somatic sensation below the neck, his gastrointestinal tract continues to exhibit coordinated peristaltic contractions, digest enteral feedings, and propel chyme through his small intestine. Explain the neuroanatomical basis for autonomous gut motility in the absence of spinal communication, and distinguish between short and long digestive reflexes.",
      "model": "The gastrointestinal tract possesses an intrinsic, autonomous nervous network known as the enteric nervous system (ENS), which contains over 100 million neurons organized into the submucosal (Meissner’s) and myenteric (Auerbach’s) plexuses. The ENS can operate as an independent local integration center via short reflexes. In a short reflex, sensory chemoreceptors and mechanoreceptors in the gut mucosa detect luminal distension and chemical composition; their afferent signals synapse directly onto enteric interneurons, which subsequently activate motor neurons within the myenteric plexus to contract circular muscle behind the bolus and relax muscle ahead. Because short reflexes are entirely self-contained within the gut wall and require no synaptic relay through the spinal cord or brain, peristalsis and baseline secretion continue normally despite complete cervical cord transection. In contrast, long reflexes involve visceral afferents ascending to the CNS (chiefly via the vagus nerve and spinal cord) and autonomic efferents modulating digestive rate; while spinal transection impairs voluntary defecation and sacral parasympathetic reflexes, baseline mesenteric peristalsis remains intact.",
      "rubric": [
        "Identifies the intrinsic Enteric Nervous System (ENS) and its myenteric/submucosal plexuses as the autonomous driver of motility",
        "Explains that short reflexes operate entirely within the gut wall without requiring spinal cord or CNS connectivity",
        "Contrasts short local reflexes with long CNS-mediated reflexes, noting that cord transection spares intrinsic peristalsis"
      ]
    }
  ],
  "commonMistakes": [
    "Confusing the submucosal plexus (secretory/glandular control) with the myenteric plexus (muscular motility control).",
    "Believing segmentation moves chyme forward along the intestine, when segmentation is purely stationary mixing and churning.",
    "Assuming the gastrointestinal tract is completely paralyzed after spinal cord injury, overlooking the independent motor capabilities of the enteric nervous system."
  ],
  "sourceRefs": [
    {
      "ref": "phys.4",
      "location": "p10 \"Is the inner lining of digestive tract\""
    },
    {
      "ref": "phys.4",
      "location": "p11 \"Is a layer of dense irregular connective tissue\""
    },
    {
      "ref": "phys.4",
      "location": "p12 \"Is dominated by smooth muscle cells\""
    },
    {
      "ref": "phys.4",
      "location": "p12 \"Outer binding and protective layer\""
    },
    {
      "ref": "phys.4",
      "location": "p13 \"Movement of Digestive Materials\""
    },
    {
      "ref": "phys.4",
      "location": "p15 \"Local Factors\""
    },
    {
      "ref": "phys.4",
      "location": "p16 \"Neural Mechanisms\""
    },
    {
      "ref": "phys.4",
      "location": "p17 \"Short reflexes\""
    },
    {
      "ref": "phys.4",
      "location": "p18 \"Hormonal Mechanisms\""
    }
  ]
},
  {
  "id": "abct2326-digestive-stomach-control",
  "subject": "ABCT2326",
  "unit": "phys.dig",
  "type": "sequence",
  "title": "Gastric histology, acid secretion, and the three phases of gastric control",
  "tags": [
    "digestive",
    "stomach",
    "mechanism",
    "high-yield",
    "gastric-acid",
    "parietal-cells",
    "phases-of-secretion"
  ],
  "priorKnowledge": {
    "level": "dse-bio",
    "covers": "part",
    "dsePart": "core",
    "syllabusRef": { "ref": "edb.bio", "location": "Compulsory III(b) \"Essential life processes in animals\" — \"Nutrition in humans\": digestion in the stomach, roles of gastric juice and hydrochloric acid." },
    sources: [
      {
        "ref": "phys.4",
        "location": "p22 \"Major Functions of the\""
      },
      {
        "ref": "phys.4",
        "location": "p24 \"Gastric Glands\""
      },
      {
        "ref": "phys.4",
        "location": "p27 \"Parietal Cells\""
      },
      {
        "ref": "phys.4",
        "location": "p31 \"Production of acid and enzymes by the gastric mucosa can be:\""
      },
      {
        "ref": "phys.4",
        "location": "p33 \"GASTRIC PHASE\""
      },
      {
        "ref": "phys.4",
        "location": "p34 \"INTESTINAL PHASE\""
      }
    ]
  },
  "practice": [
    {
      "type": "sequence",
      "prompt": "Order the three chronological phases of gastric activity from the sensory perception of food through to duodenal emptying.",
      "items": [
        "Cephalic phase (vagal parasympathetic stimulation anticipating food)",
        "Gastric phase (distension and gastrin release driving acid and churning)",
        "Intestinal phase (enterogastric reflex and duodenal hormones braking the stomach)"
      ],
      "explanation": "Cephalic precedes ingestion; gastric responds to gastric filling; intestinal provides negative feedback as chyme leaves for the duodenum."
    },
    {
      "type": "matching",
      "prompt": "Match each gastric gland cell type with its primary secretion and physiological role.",
      "pairs": [
        [
          "Parietal cell",
          "Secretes hydrochloric acid (HCl) for protein denaturation and intrinsic factor for B12 uptake"
        ],
        [
          "Chief cell",
          "Secretes inactive pepsinogen zymogen converted by acid into proteolytic pepsin"
        ],
        [
          "G cell",
          "Enteroendocrine cell releasing gastrin to stimulate acid secretion and gastric motility"
        ],
        [
          "Mucous neck cell",
          "Secretes alkaline bicarbonate-rich mucus shielding mucosal lining from autodigestion"
        ]
      ],
      "explanation": "Parietal cells secrete HCl and intrinsic factor; chief cells secrete pepsinogen; G cells secrete gastrin; mucous neck cells protect the epithelium."
    },
    {
      "type": "mcq",
      "prompt": "What physiological phenomenon accounts for the transient increase in systemic venous blood pH (the \"alkaline tide\") observed shortly after consuming a large meal?",
      "options": [
        "Basolateral exchange of bicarbonate ions into the bloodstream as parietal cells pump hydrogen ions into the lumen",
        "Massive exocytosis of bicarbonate buffers by duodenal Brunner glands into the abdominal aorta",
        "Hyperventilation triggered by gastric distension blowing off excess arterial carbon dioxide",
        "Inhibition of renal tubular proton excretion caused by circulating gastrin"
      ],
      "answer": 0,
      "explanation": "During gastric acid production, for every H+ pumped into the stomach lumen by the H+/K+ ATPase, a HCO3- ion is transported across the basolateral membrane into the capillary blood, elevating systemic venous pH."
    },
    {
      "type": "typed",
      "prompt": "Which indispensable glycoprotein secreted by gastric parietal cells is required for the intestinal absorption of dietary vitamin B12 in the ileum?",
      "accept": [
        "intrinsic factor",
        "Intrinsic factor",
        "Intrinsic Factor"
      ],
      "explanation": "Intrinsic factor binds cobalamin (vitamin B12) in the intestine, allowing receptor-mediated endocytosis in the terminal ileum."
    }
  ],
  "application": [
    {
      "type": "scenario",
      "prompt": "A 55-year-old female presents with severe fatigue, burning tongue (glossitis), lower extremity paresthesias, and unsteady gait. Complete blood count shows macrocytic (megaloblastic) anemia, and anti-intrinsic factor autoantibodies are detected. Endoscopy demonstrates diffuse mucosal atrophy of the gastric fundus and body. Diagnose the disease, identify which gastric cell type has been depleted, and explain the pathophysiological cascade linking stomach histology to her neurological symptoms.",
      "model": "The patient has pernicious anemia secondary to autoimmune atrophic gastritis. The autoimmune process selectively targets and destroys gastric parietal (oxyntic) cells in the fundus and body of the stomach. Parietal cells synthesize and secrete intrinsic factor, an indispensable transport glycoprotein. Without intrinsic factor, dietary vitamin B12 (cobalamin) cannot form the protective B12-intrinsic factor complex required for receptor-mediated endocytosis by cubilin receptors in the terminal ileum. Vitamin B12 is an essential cofactor for two vital enzymatic reactions: methionine synthase (converting homocysteine to methionine, required for thymidine and DNA synthesis) and methylmalonyl-CoA mutase (converting methylmalonyl-CoA to succinyl-CoA). Impaired DNA synthesis arrests erythroblast maturation, causing macrocytic megaloblastic anemia. Furthermore, defective succinyl-CoA synthesis leads to the accumulation of abnormal fatty acids that become incorporated into neuronal membranes, causing subacute combined degeneration of the spinal cord (posterior and lateral columns), manifesting as peripheral neuropathy, paresthesias, and sensory ataxia.",
      "rubric": [
        "Diagnoses pernicious anemia / autoimmune atrophic gastritis causing destruction of gastric parietal cells",
        "Explains the loss of intrinsic factor resulting in failure of vitamin B12 absorption in the terminal ileum",
        "Connects B12 deficiency to megaloblastic anemia (impaired DNA synthesis) and neurological symptoms (demyelination/spinal cord degeneration)"
      ]
    }
  ],
  "commonMistakes": [
    "Believing chief cells secrete active pepsin directly; chief cells synthesize inactive pepsinogen, which requires acidic cleavage to become active pepsin.",
    "Assuming the stomach absorbs most ingested nutrients; the stomach absorbs virtually no carbohydrates or amino acids, performing preliminary digestion while absorption is left to the small intestine.",
    "Thinking the intestinal phase speeds up stomach emptying, when it actually acts as an essential inhibitory brake to prevent duodenal acid overload."
  ],
  "sourceRefs": [
    {
      "ref": "phys.4",
      "location": "p22 \"Major Functions of the\""
    },
    {
      "ref": "phys.4",
      "location": "p24 \"Gastric Glands\""
    },
    {
      "ref": "phys.4",
      "location": "p27 \"Parietal Cells\""
    },
    {
      "ref": "phys.4",
      "location": "p28 \"Stomach performs preliminary digestion of proteins by pepsin\""
    },
    {
      "ref": "phys.4",
      "location": "p31 \"Production of acid and enzymes by the gastric mucosa can be:\""
    },
    {
      "ref": "phys.4",
      "location": "p33 \"GASTRIC PHASE\""
    },
    {
      "ref": "phys.4",
      "location": "p34 \"INTESTINAL PHASE\""
    }
  ]
},
  {
  "id": "abct2326-digestive-small-intestine-accessory",
  "subject": "ABCT2326",
  "unit": "phys.dig",
  "type": "matching",
  "title": "Small intestinal segments, pancreatic enzymes, liver lobules, and bile",
  "tags": [
    "digestive",
    "absorption",
    "mechanism",
    "high-yield",
    "small-intestine",
    "pancreas",
    "liver",
    "bile"
  ],
  "priorKnowledge": {
    "level": "dse-bio",
    "covers": "part",
    "dsePart": "core",
    "syllabusRef": { "ref": "edb.bio", "location": "Compulsory III(b) \"Essential life processes in animals\" — \"Nutrition in humans\": digestion in small intestine, functions of liver and pancreas, absorption in villi." },
    sources: [
      {
        "ref": "phys.4",
        "location": "p35 \"Plays key role in digestion and absorption of nutrients\""
      },
      {
        "ref": "phys.4",
        "location": "p37 \"The segment of small intestine closest to stomach\""
      },
      {
        "ref": "phys.4",
        "location": "p38 \"Is the middle segment of small intestine\""
      },
      {
        "ref": "phys.4",
        "location": "p38 \"The final segment of small intestine\""
      },
      {
        "ref": "phys.4",
        "location": "p39 \"Brush border enzymes\""
      },
      {
        "ref": "phys.4",
        "location": "p40 \"Enteropeptidase\""
      },
      {
        "ref": "phys.4",
        "location": "p44 \"Pancreatic Alpha-Amylase\""
      },
      {
        "ref": "phys.4",
        "location": "p51 \"Releases bile into duodenum, but only under stimulation of intestinal hormone cholecystokinin\""
      }
    ]
  },
  "practice": [
    {
      "type": "matching",
      "prompt": "Match each small intestinal segment with its primary anatomical and physiological role.",
      "pairs": [
        [
          "Duodenum",
          "C-shaped segment receiving chyme and neutralizing gastric acid with alkaline secretions"
        ],
        [
          "Jejunum",
          "Middle segment with tall villi where the vast majority of nutrient absorption occurs"
        ],
        [
          "Ileum",
          "Distal segment absorbing bile salts and vitamin B12, ending at the ileocecal valve"
        ],
        [
          "Central lacteal",
          "Blind-ended lymphatic capillary within a villus absorbing large lipid chylomicrons"
        ]
      ],
      "explanation": "Duodenum neutralizes acid; jejunum executes bulk absorption; ileum absorbs bile salts/B12; lacteals absorb chylomicrons."
    },
    {
      "type": "sequence",
      "prompt": "Order the activation cascade of pancreatic proteolytic enzymes initiated by duodenal brush border enteropeptidase.",
      "items": [
        "Enteropeptidase on duodenal brush border encounters pancreatic juice",
        "Trypsinogen is cleaved into active trypsin",
        "Active trypsin cleaves chymotrypsinogen into active chymotrypsin",
        "Active trypsin cleaves procarboxypeptidase into active carboxypeptidase"
      ],
      "explanation": "Enteropeptidase triggers the entire proteolytic cascade by first activating trypsinogen to trypsin, which subsequently cleaves all other pancreatic proenzymes."
    },
    {
      "type": "mcq",
      "prompt": "What is the precise biophysical mechanism by which bile salts enhance dietary lipid digestion in the small intestine?",
      "options": [
        "They chemically hydrolyze triglyceride ester bonds into glycerol and free fatty acids.",
        "They act as amphipathic detergents that emulsify large lipid droplets into micro-droplets, expanding accessible surface area.",
        "They activate procarboxypeptidase within the duodenal lumen into active carboxypeptidase.",
        "They lower luminal pH to 2.0 to activate lingual and gastric lipases."
      ],
      "answer": 1,
      "explanation": "Bile salts contain no digestive enzymes; their amphipathic properties allow them to emulsify large lipid globules into tiny emulsion droplets, increasing surface area for pancreatic lipase."
    },
    {
      "type": "typed",
      "prompt": "Which brush-border enzyme anchored to the duodenal microvilli is responsible for cleaving inactive pancreatic trypsinogen into active trypsin?",
      "accept": [
        "enteropeptidase",
        "Enteropeptidase",
        "enterokinase",
        "Enterokinase"
      ],
      "explanation": "Enteropeptidase (formerly enterokinase) is the brush-border enzyme that activates trypsinogen."
    }
  ],
  "application": [
    {
      "type": "scenario",
      "prompt": "A 42-year-old female presents to the emergency room with severe, epigastric pain that radiates to her back, accompanied by persistent vomiting. Serum amylase and lipase levels are elevated fivefold above the upper reference limit. Right upper quadrant ultrasound demonstrates multiple gallstones in the gallbladder, with one stone wedged firmly in the hepatopancreatic ampulla (ampulla of Vater). Explain how an impacted gallstone causes acute pancreatitis, identify the specific enzyme cascade that becomes prematurely activated, and analyze why pancreatic autodigestion ensues.",
      "model": "The hepatopancreatic ampulla (ampulla of Vater) is the shared anatomical confluence where the common bile duct and the main pancreatic duct merge before emptying into the duodenum through the hepatopancreatic sphincter. When a gallstone lodges within this common channel, it obstructs outflow from the pancreatic duct. Exocrine pancreatic acinar cells continue to synthesize digestive proenzymes and bicarbonate, causing severe ductal hypertension and backpressure. Elevated ductal pressure disrupts acinar cell zymogen granules, causing intracellular colocalization of digestive proenzymes with lysosomal hydrolases (such as cathepsin B). Cathepsin B cleaves trypsinogen into active trypsin within the pancreatic parenchyma. Once formed inside acinar cells, active trypsin overwhelms local endogenous protease inhibitors (pancreatic secretory trypsin inhibitor, SPINK1) and autocatalytically activates other zymogens (chymotrypsinogen, proelastase, procarboxypeptidase, and phospholipase A2). These active enzymes break down cellular proteins, elastase dissolves vascular walls causing hemorrhage, and lipase/phospholipase digest surrounding adipose tissue (enzymatic fat necrosis), resulting in acute necrotizing pancreatitis.",
      "rubric": [
        "Identifies that a stone in the hepatopancreatic ampulla obstructs the main pancreatic duct and causes outflow failure",
        "Explains that ductal hypertension causes premature intracellular activation of trypsinogen to trypsin",
        "Describes how active trypsin triggers an enzymatic cascade (elastase, phospholipase) that autodigests pancreatic parenchyma and vessels"
      ]
    }
  ],
  "commonMistakes": [
    "Calling bile an enzyme or assuming bile digests fat chemically, when bile salts are amphipathic emulsifiers that break fat down only mechanically/physically.",
    "Assuming absorbed fats enter the mesenteric veins alongside sugars and amino acids; long-chain fats are packaged into chylomicrons and enter central lacteals of the lymphatic system.",
    "Thinking trypsin is secreted in its active form by the pancreas; it is secreted as inactive trypsinogen and requires brush border enteropeptidase to become active."
  ],
  "sourceRefs": [
    {
      "ref": "phys.4",
      "location": "p35 \"Plays key role in digestion and absorption of nutrients\""
    },
    {
      "ref": "phys.4",
      "location": "p37 \"The segment of small intestine closest to stomach\""
    },
    {
      "ref": "phys.4",
      "location": "p38 \"Is the middle segment of small intestine\""
    },
    {
      "ref": "phys.4",
      "location": "p38 \"The final segment of small intestine\""
    },
    {
      "ref": "phys.4",
      "location": "p39 \"Brush border enzymes\""
    },
    {
      "ref": "phys.4",
      "location": "p40 \"Enteropeptidase\""
    },
    {
      "ref": "phys.4",
      "location": "p42 \"Pancreatic\""
    },
    {
      "ref": "phys.4",
      "location": "p44 \"Pancreatic Alpha-Amylase\""
    },
    {
      "ref": "phys.4",
      "location": "p45 \"Performs essential metabolic and synthetic functions\""
    },
    {
      "ref": "phys.4",
      "location": "p48 \"Dietary lipids are not water soluble\""
    },
    {
      "ref": "phys.4",
      "location": "p51 \"Releases bile into duodenum, but only under stimulation of intestinal hormone cholecystokinin\""
    }
  ]
},
  {
  "id": "abct2326-digestive-hormones-colon",
  "subject": "ABCT2326",
  "unit": "phys.dig",
  "type": "matching",
  "title": "Duodenal hormones, large intestinal physiology, and fluid balance",
  "tags": [
    "digestive",
    "hormones",
    "absorption",
    "high-yield",
    "large-intestine",
    "fluid-balance",
    "water-absorption"
  ],
  "priorKnowledge": {
    "level": "dse-bio",
    "covers": "part",
    "dsePart": "core",
    "syllabusRef": { "ref": "edb.bio", "location": "Compulsory III(b) \"Essential life processes in animals\" — \"Nutrition in humans\": absorption of water, role of the large intestine, egestion." },
    sources: [
      {
        "ref": "phys.4",
        "location": "p53 \"Coordinate activities of digestive glands\""
      },
      {
        "ref": "phys.4",
        "location": "p55 \"Intestinal tract secretes peptide hormones with multiple effects\""
      },
      {
        "ref": "phys.4",
        "location": "p56 \"Hormones of Duodenal\""
      },
      {
        "ref": "phys.4",
        "location": "p57 \"Is secreted by G cells in duodenum\""
      },
      {
        "ref": "phys.4",
        "location": "p58 \"Gastric Inhibitory Peptide (GIP)\""
      },
      {
        "ref": "phys.4",
        "location": "p59 \"Vasoactive Intestinal Peptide (VIP)\""
      },
      {
        "ref": "phys.4",
        "location": "p61 \"Four Regions of the Colon\""
      },
      {
        "ref": "phys.4",
        "location": "p64 \"Reabsorption of water\""
      }
    ]
  },
  "practice": [
    {
      "type": "matching",
      "prompt": "Match each duodenal peptide hormone with its primary trigger and physiological action.",
      "pairs": [
        [
          "Secretin",
          "Triggered by acidic chyme; stimulates pancreatic and biliary bicarbonate secretion"
        ],
        [
          "Cholecystokinin (CCK)",
          "Triggered by lipids and proteins; stimulates gallbladder contraction and pancreatic enzymes"
        ],
        [
          "Gastric Inhibitory Peptide (GIP)",
          "Triggered by glucose and lipids; stimulates beta-cell insulin release and slows stomach"
        ],
        [
          "Vasoactive Intestinal Peptide (VIP)",
          "Stimulates intestinal fluid secretion, dilates regional capillaries, and inhibits gastric acid"
        ]
      ],
      "explanation": "Secretin drives bicarbonate; CCK drives enzymes and bile ejection; GIP drives insulin; VIP dilates capillaries and boosts intestinal secretion."
    },
    {
      "type": "sequence",
      "prompt": "Order the four anatomical regions of the colon through which fecal material travels from the cecum to the rectum.",
      "items": [
        "Ascending colon",
        "Transverse colon",
        "Descending colon",
        "Sigmoid colon"
      ],
      "explanation": "Contents move superiorly through the ascending colon, horizontally across the transverse colon, inferiorly down the descending colon, and through the S-shaped sigmoid colon to the rectum."
    },
    {
      "type": "mcq",
      "prompt": "Which vitamin essential for the hepatic synthesis of blood clotting factors (II, VII, IX, and X) is produced by commensal bacteria in the large intestine and absorbed across the colonic mucosa?",
      "options": [
        "Vitamin K",
        "Vitamin C",
        "Vitamin D",
        "Vitamin B12"
      ],
      "answer": 0,
      "explanation": "Colonic bacteria synthesize vitamin K, which is absorbed across the large intestinal epithelium and utilized by the liver for clotting factor synthesis."
    },
    {
      "type": "typed",
      "prompt": "Approximately how many milliliters of water are normally eliminated in solid feces each day out of the 9,000 mL entering the digestive tract?",
      "accept": [
        "150",
        "150 mL",
        "150 ml",
        "150 milliliters",
        "150 millilitres"
      ],
      "explanation": "Approximately 150 mL of water is lost in feces each day, with the remaining 8,850 mL reabsorbed by the small and large intestines."
    }
  ],
  "application": [
    {
      "type": "scenario",
      "prompt": "A 28-year-old traveler returns from an endemic region with explosive, watery, odorless diarrhea (\"rice-water stools\") producing up to 1 liter of fluid loss per hour, accompanied by profound dehydration, hypokalemia, and metabolic acidosis. Stool culture confirms Vibrio cholerae. Analyze the cellular mechanism of cholera toxin on enterocyte transport, explain why the large intestine fails to prevent diarrhea, and explain the physiological rationale for treating him with an oral rehydration solution (ORS) containing glucose and sodium.",
      "model": "Vibrio cholerae produces cholera toxin, an A-B subunit enterotoxin. The A1 subunit catalyzes the ADP-ribosylation of the G-alpha-s regulatory protein in small intestinal crypt enterocytes, locking G-alpha-s in an irreversibly active state. This causes persistent activation of adenylate cyclase and an uncontrolled elevation of intracellular cyclic AMP (cAMP). Elevated cAMP phosphorylates and opens the cystic fibrosis transmembrane conductance regulator (CFTR) apical chloride channels, causing massive active efflux of Cl- into the intestinal lumen. Sodium and water follow passively along the electrical and osmotic gradients. While the colon possesses substantial fluid absorptive capacity (~1,200 mL to a maximum of 4–5 liters per day), the small intestine pours out 10 to 20 liters of fluid daily, completely overwhelming colonic reabsorptive capacity and resulting in life-threatening watery diarrhea. Oral Rehydration Solution (ORS) is effective because it exploits the intact sodium-glucose cotransporter 1 (SGLT-1) on villus enterocytes, which operates independently of cAMP. Ingesting an equimolar solution of glucose and sodium drives secondary active cotransport of Na+ and glucose into enterocytes; the resulting transcellular osmotic gradient draws water out of the intestinal lumen back into circulation, effectively arresting dehydration.",
      "rubric": [
        "Describes cholera toxin-induced ADP-ribosylation of G-alpha-s, constitutive cAMP generation, and massive CFTR chloride/water secretion",
        "Explains that small intestinal secretion (10–20 L/day) vastly exceeds the maximum fluid reabsorptive capacity of the colon",
        "Explains that ORS utilizes the cAMP-independent SGLT-1 cotransporter to restore sodium, glucose, and osmotic water absorption"
      ]
    }
  ],
  "commonMistakes": [
    "Believing water is actively pumped across the intestinal epithelium; water transport is completely passive, moving along osmotic gradients established by ion transport.",
    "Assuming the colon is responsible for absorbing the majority of dietary water; the small intestine reabsorbs ~8,000 mL while the colon reabsorbs ~1,200 mL.",
    "Confusing Secretin (triggered by acid, stimulates bicarbonate) with CCK (triggered by fat/protein, stimulates enzymes and bile)."
  ],
  "sourceRefs": [
    {
      "ref": "phys.4",
      "location": "p53 \"Coordinate activities of digestive glands\""
    },
    {
      "ref": "phys.4",
      "location": "p55 \"Intestinal tract secretes peptide hormones with multiple effects\""
    },
    {
      "ref": "phys.4",
      "location": "p56 \"Hormones of Duodenal\""
    },
    {
      "ref": "phys.4",
      "location": "p57 \"Is secreted by G cells in duodenum\""
    },
    {
      "ref": "phys.4",
      "location": "p58 \"Gastric Inhibitory Peptide (GIP)\""
    },
    {
      "ref": "phys.4",
      "location": "p59 \"Vasoactive Intestinal Peptide (VIP)\""
    },
    {
      "ref": "phys.4",
      "location": "p61 \"Four Regions of the Colon\""
    },
    {
      "ref": "phys.4",
      "location": "p63 \"Forms last part of digestive tract\""
    },
    {
      "ref": "phys.4",
      "location": "p64 \"Reabsorption of water\""
    }
  ]
},
];
