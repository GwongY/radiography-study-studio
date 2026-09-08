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
      "dsePart": "elective-hp",
      "syllabusRef": {
        "ref": "edb.bio",
        "location": "Elective V(c) \"Regulation of gas content in blood\" — mechanism of breathing."
      },
      "beyond": [
        {
          "t": "Boyle’s law: pressure is inversely proportional to volume (P = 1/V).",
          "src": {
            "ref": "phys.3",
            "location": "p18 \"Boyle’s Law\""
          }
        },
        {
          "t": "Airflow direction is governed by pressure gradients between atmosphere and intrapulmonary space.",
          "src": {
            "ref": "phys.3",
            "location": "p20 \"Pressure and airflow to the lungs\""
          }
        },
        {
          "t": "Pulmonary ventilation causes thoracic volume changes that create transpulmonary pressure gradients.",
          "src": {
            "ref": "phys.3",
            "location": "p21 \"Pulmonary ventilation\""
          }
        },
        {
          "t": "Inhalation mechanics: elevation of rib cage and contraction of diaphragm increase thoracic cavity size, lowering intrapulmonary pressure.",
          "src": {
            "ref": "phys.3",
            "location": "p24 \"Inhalation.\""
          }
        },
        {
          "t": "Exhalation mechanics: relaxation of diaphragm and elastic recoil decrease thoracic cavity size, raising intrapulmonary pressure.",
          "src": {
            "ref": "phys.3",
            "location": "p25 \"Exhalation.\""
          }
        },
        {
          "t": "Lung compliance as an indicator of expandability: low compliance requires greater muscular force.",
          "src": {
            "ref": "phys.3",
            "location": "p26 \"Compliance\""
          }
        },
        {
          "t": "Cyclical changes in intrapleural pressure operate the respiratory pump, aiding systemic venous return to the heart.",
          "src": {
            "ref": "phys.3",
            "location": "p28 \"operate the respiratory pump\""
          }
        },
        {
          "t": "Diaphragm contraction draws air into lungs, responsible for 75 percent of normal resting air movement.",
          "src": {
            "ref": "phys.3",
            "location": "p29 \"Muscles used in inhalation\""
          }
        },
        {
          "t": "Muscles of active exhalation: internal intercostals, transversus thoracis, and abdominal muscles.",
          "src": {
            "ref": "phys.3",
            "location": "p31 \"Muscles used in exhalation\""
          }
        }
      ]
    },
    "lesson": {
      "explanation": "Pulmonary ventilation (breathing) is the physical movement of air into and out of the bronchial tree and alveoli, driven by cyclical transpulmonary pressure gradients established between the atmosphere and the intrapulmonary space. The biophysical foundation of ventilation is Boyle's Law, which states that at a constant temperature, the pressure (P) of a fixed mass of gas is inversely proportional to its volume (V), expressed mathematically as P = 1/V (or P1V1 = P2V2). Expanding a closed container decreases its internal gas pressure; compressing the container increases its internal pressure. Because gas flows down pressure gradients from areas of higher pressure to areas of lower pressure, creating a pressure difference between the atmosphere (Patm = 760 mmHg at sea level, treated as 0 mmHg relative reference) and the alveolar spaces (intrapulmonary or intra-alveolar pressure, Palv) drives bulk airflow. During quiet resting inhalation (eupnea), inspiration is an active muscular process. The primary muscle of inspiration is the dome-shaped diaphragm, innervated by the phrenic nerves (C3–C5). When stimulated, the muscular fibers of the diaphragm contract and flatten downward toward the abdominal cavity, responsible for approximately 75% of total air movement during normal quiet breathing. Concurrently, the external intercostal muscles contract, elevating the ribs and moving the sternum anteriorly (analogous to the handle of a bucket and pump-handle actions), contributing the remaining ~25% of resting volume expansion. This expansion increases both the vertical, anteroposterior, and transverse dimensions of the thoracic cavity. Because the visceral pleura lining the lungs is held tightly against the parietal pleura lining the thoracic cage by a thin film of serous pleural fluid, thoracic expansion lowers intrapleural pressure (Pip) from its resting subatmospheric level of -4 mmHg down to approximately -6 mmHg. This increased negative intrapleural pressure pulls the compliant lung parenchyma outward, expanding alveolar volume. According to Boyle's law, alveolar expansion drops intrapulmonary pressure (Palv) from 0 mmHg to -1 mmHg relative to atmosphere. Driven by this 1 mmHg pressure gradient, roughly 500 mL of ambient air (resting tidal volume) flows into the bronchial tree until Palv equilibrates with Patm. In contrast, quiet exhalation is entirely passive, requiring no active muscular contraction. When phrenic and intercostal motor neurons cease firing, the diaphragm and external intercostals relax. The stretched elastic fibers within the lung parenchyma, alveolar septa, and chest wall undergo passive elastic recoil, assisted by the inward pull of alveolar surface tension. This compresses thoracic volume, which according to Boyle's law elevates intrapulmonary pressure to +1 mmHg relative to atmosphere, driving air out of the lungs until Palv returns to 0 mmHg. During forced ventilation (hyperpnea, such as during strenuous exercise or severe respiratory distress), accessory muscles are actively recruited: forced inspiration recruits the sternocleidomastoid, scalene muscles, and pectoralis minor to vigorously elevate the upper rib cage; forced expiration recruits the internal intercostal muscles, transversus thoracis, and abdominal wall musculature (rectus abdominis, external/internal obliques, transversus abdominis), which forcibly compress the abdominal viscera and push the relaxed diaphragm upward while depressing the ribs to accelerate exhalation. The ease with which the lungs expand under a given transpulmonary pressure is termed lung compliance (ΔV/ΔP). High compliance means the lungs expand easily with minimal muscular effort; low compliance requires immense muscular force to generate large pressure swings to inhale, as seen in pulmonary fibrosis or surfactant deficiency. Furthermore, the cyclical swings in intrapleural pressure operate the respiratory thoracoabdominal pump, which compresses the inferior vena cava during inspiration and enhances venous return to the right atrium.",
      "plain": "Breathing works by changing the volume of your chest to create pressure differences, following Boyle's law (expanding a container drops its pressure; squeezing it increases pressure). Air always flows from high pressure to low pressure. When you inhale, your diaphragm contracts and flattens (doing 75% of the work) while your external intercostal muscles lift your ribs. This expands your chest cavity, dropping pressure inside your lungs below atmospheric pressure (-1 mmHg), so outside air rushes in. Normal quiet exhalation is completely passive: the muscles simply relax, and the natural elasticity of your lungs squeezes the air back out (+1 mmHg). During heavy exercise or asthma attacks, you use extra accessory muscles (neck muscles for forced inhalation; abdominal and internal intercostal muscles to forcefully squeeze air out). Compliance measures how easily the lungs stretch; stiff lungs with low compliance make breathing exhausting.",
      "keyFacts": [
        "Boyle's law dictates that gas pressure is inversely proportional to volume: P = 1/V.",
        "Air flows down pressure gradients from higher pressure to lower pressure.",
        "Quiet inhalation is an active process; the diaphragm is responsible for ~75% of resting air movement.",
        "External intercostal muscles elevate the ribs, contributing ~25% of quiet inspiratory volume expansion.",
        "Thoracic expansion drops intrapulmonary pressure to -1 mmHg, drawing ~500 mL of tidal air into lungs.",
        "Quiet exhalation is passive, driven by elastic recoil of lung parenchyma and surface tension.",
        "Passive recoil increases intrapulmonary pressure to +1 mmHg, pushing air out until pressures equilibrate.",
        "Intrapleural pressure is normally subatmospheric (-4 to -6 mmHg), keeping the lungs inflated.",
        "Forced exhalation actively recruits internal intercostals, transversus thoracis, and abdominal wall muscles.",
        "Lung compliance reflects expandability; low compliance requires greater muscular work to inhale."
      ],
      "prerequisites": [],
      "examples": [
        "In tension pneumothorax, penetrating chest trauma breaches the parietal pleura, allowing atmospheric air into the intrapleural space; loss of the normal subatmospheric intrapleural pressure (-4 mmHg) causes immediate elastic recoil collapse of the ipsilateral lung (atelectasis) and shifts mediastinal structures away from the affected side.",
        "In idiopathic pulmonary fibrosis, excessive collagen deposition throughout the alveolar interstitium stiffens the lung parenchyma, drastically reducing lung compliance; patients must generate immense negative intrapleural pressures (-15 to -20 mmHg) just to inhale a modest tidal volume, presenting with severe dyspnea and rapid shallow breathing."
      ]
    },
    "memory": {
      "chunking": "Ventilation Mechanics: Boyle's Law (Volume up → Pressure down → Inhale) → Diaphragm (75% driver, C3-5 phrenic) → Passive Recoil (Exhale is free at rest) → Forced Breathing (Abdominals squeeze down).",
      "comparison": "Quiet vs Forced Exhalation: Quiet exhalation is 100% passive (elastic recoil only); Forced exhalation is active (internal intercostals + abdominal muscles push diaphragm up).",
      "visualCue": "Picture a syringe: pulling back the plunger increases chamber volume and drops pressure, sucking liquid in; pushing the plunger in increases pressure and squirts liquid out.",
      "teachBack": "State Boyle's law and walk through the pressure and volume changes that occur during one quiet respiratory cycle, specifying the exact numerical values for intrapulmonary pressure."
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
    "skills": [
      "Apply Boyle’s law to calculate theoretical pressure and volume shifts during respiratory cycles.",
      "Differentiate between quiet eupneic breathing and forced hyperpneic breathing based on muscle recruitment and pressure curves."
    ],
    "selfCheck": "From memory: recite Boyle’s law formula, state the intrapulmonary pressure values during quiet inspiration and expiration, and name the muscles of forced expiration.",
    "visuals": [
      {
        "fig": "ventilationMechanics"
      },
      {
        "fig": "respiratoryTractAnatomy"
      },
      {
        "gen": true
      }
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
    "priorKnowledge": {
      "level": "dse-bio",
      "covers": "part",
      "dsePart": "elective-hp",
      "syllabusRef": {
        "ref": "edb.bio",
        "location": "Elective V(c) — \"Measurement of lung volumes: tidal volume, vital capacity\"."
      },
      "beyond": [
        {
          "t": "Respiratory rate and respiratory minute volume: minute ventilation equals respiratory rate multiplied by tidal volume.",
          "src": {
            "ref": "phys.3",
            "location": "p32 \"Respiratory rates\""
          }
        },
        {
          "t": "Total lung volume partitioned into four non-overlapping pulmonary volumes: TV, IRV, ERV, and RV.",
          "src": {
            "ref": "phys.3",
            "location": "p34 \"Four pulmonary volumes\""
          }
        },
        {
          "t": "Pulmonary capacities: composite measurements formed by combining two or more volumes (VC, IC, FRC, TLC).",
          "src": {
            "ref": "phys.3",
            "location": "p36 \"Pulmonary Volumes and Capacities\""
          }
        },
        {
          "t": "Resting tidal volume (TV) averages approximately 500 mL in both adult males and females.",
          "src": {
            "ref": "phys.3",
            "location": "p37 \"Resting tidal volume\""
          }
        },
        {
          "t": "Inspiratory capacity (IC) equals tidal volume plus inspiratory reserve volume (IC = TV + IRV).",
          "src": {
            "ref": "phys.3",
            "location": "p38 \"Inspiratory capacity\""
          }
        },
        {
          "t": "Distinguishing obstructive versus restrictive lung diseases: volumes are decreased in restrictive disease, while airflow rates are impaired in obstructive disease.",
          "src": {
            "ref": "phys.3",
            "location": "p39 \"Volumes are decreased\""
          }
        }
      ]
    },
    "lesson": {
      "explanation": "Clinical assessment of pulmonary function relies on spirometric measurement of pulmonary volumes and lung capacities, which provide diagnostic differentiation between normal physiology, obstructive ventilatory defects, and restrictive disorders. A healthy resting adult breathes at a resting respiratory rate (f) of approximately 12 to 18 breaths per minute. The total volume of air displaced into and out of the respiratory tract each minute is the respiratory minute volume (VE), calculated as VE = f × TV (e.g., 12 breaths/min × 500 mL = 6,000 mL/min or 6.0 L/min). However, because roughly 150 mL of each tidal breath remains within the non-gas-exchanging conducting airways (anatomical dead space, VD), actual alveolar ventilation (VA)—the volume of fresh air reaching the alveoli each minute—is calculated as VA = f × (TV - VD) (e.g., 12 × [500 - 150] = 4,200 mL/min). Total lung capacity is structurally divided into four primary, non-overlapping pulmonary volumes: (1) Resting Tidal Volume (TV or VT): the volume of air inhaled or exhaled in a single normal quiet respiratory cycle, averaging ~500 mL in healthy adult males and females. (2) Inspiratory Reserve Volume (IRV): the maximum additional volume of air that can be forcibly inhaled above the resting tidal volume peak, averaging ~3,300 mL in adult males (~1,900 mL in females). (3) Expiratory Reserve Volume (ERV): the maximum additional volume of air that can be forcibly exhaled after completing a normal resting tidal expiration, averaging ~1,000–1,200 mL in males (~700 mL in females). (4) Residual Volume (RV): the volume of air that remains in the lungs even after a maximal, exhaustive forced expiration, averaging ~1,200 mL in males (~1,100 mL in females). Residual volume cannot be exhaled under voluntary effort; it serves the critical physiological purpose of preventing alveolar collapse (atelectasis) and maintaining continuous pulmonary capillary gas exchange between breaths. Because the residual volume cannot be expelled into a spirometer, RV (and any capacity containing it) cannot be measured by standard water-displacement or flow-sensor spirometry and requires specialized techniques such as body plethysmography or helium gas dilution. Combining two or more of these four primary volumes defines the four lung capacities: (1) Inspiratory Capacity (IC): the maximum volume of air that can be inhaled following a quiet resting expiration (IC = TV + IRV; ~3,800 mL in males, ~2,400 mL in females). (2) Functional Residual Capacity (FRC): the volume of air remaining in the lungs at the end of a normal quiet tidal expiration, representing the resting equilibrium point between inward lung recoil and outward chest wall spring (FRC = ERV + RV; ~2,200–2,400 mL in males, ~1,800 mL in females). (3) Vital Capacity (VC): the maximum volume of air that can be exhaled following a maximal, deepest inspiration (VC = TV + IRV + ERV; ~4,800 mL in males, ~3,100 mL in females). (4) Total Lung Capacity (TLC): the total volume of air contained within the lungs following maximal inhalation (TLC = VC + RV = TV + IRV + ERV + RV; ~6,000 mL in males, ~4,200 mL in females). In pulmonary medicine, spirometric profiles distinguish obstructive pulmonary diseases (such as asthma, chronic bronchitis, and emphysema) from restrictive disorders (such as pulmonary fibrosis and severe scoliosis). In obstructive diseases, expiration is impaired by increased airway resistance, leading to dynamic hyperinflation and air trapping; while lung volumes are essentially normal or increased (elevated RV, FRC, and TLC), the rate of forced airflow (such as FEV1 and the FEV1/FVC ratio < 70%) is severely reduced. In restrictive diseases, the lung tissue is stiff or chest wall expansion is mechanically restricted; all pulmonary volumes and capacities (VC, FRC, TLC) are markedly decreased, but forced expiration airflow rates remain relatively preserved.",
      "plain": "Spirometry measures lung air volumes to test how well your lungs work. A normal adult breathes 12–18 times a minute, moving about 500 mL of air per quiet breath (Tidal Volume, TV). Four basic non-overlapping volumes make up total lung capacity: Tidal Volume (TV ~500 mL), Inspiratory Reserve Volume (IRV, extra air you can inhale ~3,300 mL), Expiratory Reserve Volume (ERV, extra air you can blow out ~1,000 mL), and Residual Volume (RV ~1,200 mL, air trapped inside that stops lungs from collapsing and cannot be exhaled). Adding volumes together creates capacities: Vital Capacity (VC = TV + IRV + ERV) is the maximum breath you can blow out (~4,800 mL); Total Lung Capacity (TLC = VC + RV) is all the air the lungs can hold (~6,000 mL). In restrictive diseases like lung fibrosis, all lung volumes are shrunk down; in obstructive diseases like asthma or emphysema, air gets trapped, increasing residual volume while slowing down exhalation speed.",
      "keyFacts": [
        "Resting respiratory rate is 12–18 breaths/min; respiratory minute volume equals rate × tidal volume.",
        "Alveolar ventilation accounts for ~150 mL of anatomical dead space: VA = f × (TV - VD).",
        "Tidal volume (TV) averages ~500 mL during quiet breathing in both males and females.",
        "Inspiratory reserve volume (IRV) averages ~3,300 mL in males (~1,900 mL in females).",
        "Expiratory reserve volume (ERV) averages ~1,000–1,200 mL in males (~700 mL in females).",
        "Residual volume (RV) averages ~1,200 mL and cannot be voluntarily exhaled or measured by routine spirometry.",
        "Vital capacity (VC) is the maximum exhaled volume after maximal inhalation: VC = TV + IRV + ERV (~4,800 mL).",
        "Inspiratory capacity (IC) equals TV + IRV (~3,800 mL in males).",
        "Functional residual capacity (FRC) is the air left after quiet expiration: FRC = ERV + RV (~2,300 mL).",
        "Total lung capacity (TLC) equals VC + RV (~6,000 mL in males); restrictive diseases reduce all lung volumes."
      ],
      "prerequisites": [],
      "examples": [
        "In severe pulmonary emphysema (an obstructive disease), destruction of alveolar elastic tissue reduces lung recoil, causing premature small airway collapse during expiration; air is trapped in the lungs, increasing Residual Volume (RV) from 1.2 L to 3.0 L and expanding Total Lung Capacity (TLC) with a characteristic barrel chest deformity.",
        "In idiopathic pulmonary fibrosis (a restrictive disorder), fibrotic scarring prevents lung expansion; spirometry demonstrates proportional reductions in all volumes: Vital Capacity drops from 4.8 L to 2.2 L and TLC drops from 6.0 L to 3.1 L, while the FEV1/FVC ratio remains normal or elevated (>80%)."
      ]
    },
    "memory": {
      "chunking": "Four Non-Overlapping Volumes: TV (500 mL) → IRV (3300 mL) → ERV (1000 mL) → RV (1200 mL). Capacities are Sums: VC = TV+IRV+ERV; IC = TV+IRV; FRC = ERV+RV; TLC = All Four.",
      "comparison": "Obstructive vs Restrictive: Obstructive has difficulty getting air OUT (flow rate drops, RV & TLC expand from air trapping); Restrictive has difficulty getting air IN (volumes are decreased, stiff lungs shrink TLC).",
      "visualCue": "Picture a spirogram line: gentle resting waves of 500 mL (TV); giant upward mountain (IRV); dip below the baseline (ERV); and the invisible basement floor below the tracing that you can never touch (RV).",
      "teachBack": "Define all four pulmonary volumes, write down the equations for Vital Capacity and Total Lung Capacity, and explain why standard spirometry cannot measure Residual Volume."
    },
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
    "skills": [
      "Calculate all four composite pulmonary capacities from given primary volume measurements.",
      "Interpret spirometric pulmonary function reports to differentiate obstructive from restrictive ventilatory patterns."
    ],
    "selfCheck": "From memory: recite the four primary volumes and their typical values, write down the formula for alveolar ventilation, and contrast the volume changes in obstructive versus restrictive lung disease.",
    "visuals": [
      {
        "fig": "spirometryLungVolumes"
      },
      {
        "fig": "ventilationMechanics"
      },
      {
        "gen": true
      }
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
      "dsePart": "elective-hp",
      "syllabusRef": {
        "ref": "edb.bio",
        "location": "Elective V(c) — \"Transport of respiratory gases: oxygen dissociation curve of haemoglobin\"."
      },
      "beyond": [
        {
          "t": "Gas exchange across the respiratory membrane driven by partial pressure gradients between alveolar air and capillary blood.",
          "src": {
            "ref": "phys.3",
            "location": "p40 \"Gas exchange\""
          }
        },
        {
          "t": "Partial pressure baseline: blood arriving in pulmonary arteries has low PO2 (40 mmHg) and high PCO2 (45 mmHg).",
          "src": {
            "ref": "phys.3",
            "location": "p41 \"Blood arriving in pulmonary arteries has:\""
          }
        },
        {
          "t": "Oxygen binds reversibly to iron ions in the center of hemoglobin heme subunits.",
          "src": {
            "ref": "phys.3",
            "location": "p45 \"Oxygen transport\""
          }
        },
        {
          "t": "The oxygen–hemoglobin saturation curve relates percent hemoglobin saturation to partial pressure of oxygen (PO2).",
          "src": {
            "ref": "phys.3",
            "location": "p47 \"Oxygen–hemoglobin saturation curve\""
          }
        },
        {
          "t": "The Bohr effect: lower pH and higher PCO2 shift the saturation curve to the right, promoting oxygen release.",
          "src": {
            "ref": "phys.3",
            "location": "p50 \"Bohr effect\""
          }
        },
        {
          "t": "The saturation curve is standardized for normal blood pH range (7.35–7.45) and normal temperature (38°C).",
          "src": {
            "ref": "phys.3",
            "location": "p52 \"Normal blood pH range\""
          },
          "supp": {
            "ref": "phys.3",
            "location": "p54 \"Normal blood temperature\""
          }
        }
      ]
    },
    "lesson": {
      "explanation": "Oxygen uptake in pulmonary capillaries and delivery to systemic tissues is governed by partial pressure gradients across biological membranes and the allosteric binding kinetics of hemoglobin. According to Dalton's Law of partial pressures, the total pressure of a gas mixture equals the sum of the partial pressures of its individual components (Ptotal = PO2 + PCO2 + PN2 + PH2O). At sea level (barometric pressure 760 mmHg), inspired humidified air entering the alveoli equilibrates with existing residual gas and ongoing capillary diffusion, establishing stable alveolar partial pressures of PO2 ≈ 100 mmHg and PCO2 ≈ 40 mmHg. Deoxygenated systemic venous blood returning from peripheral tissues enters the pulmonary arterial circulation with PO2 ≈ 40 mmHg and PCO2 ≈ 45 mmHg. In pulmonary capillaries, the 60 mmHg partial pressure gradient drives rapid O2 diffusion across the respiratory membrane into blood plasma, while the 5 mmHg reverse gradient drives CO2 into the alveoli. Oxygen has low physical solubility in aqueous fluids (Henry's Law constant = 0.003 mL O2 / 100 mL blood / mmHg PO2); consequently, dissolved oxygen in plasma accounts for only ~1.5% of total blood oxygen content (~0.3 mL O2 / 100 mL arterial blood). The remaining 98.5% is transported in chemical combination with hemoglobin inside erythrocytes. Each erythrocyte is packed with ~280 million tetrameric hemoglobin molecules. A hemoglobin molecule contains four globular polypeptide chains (two alpha and two beta chains in adult HbA), each conjugated to a porphyrin ring containing a central ferrous iron ion (Fe2+). Each Fe2+ can bind one molecule of O2 in a reversible, oxygenation reaction (Hb + 4 O2 ⇌ Hb(O2)4). Hemoglobin saturation is the percentage of available heme binding sites occupied by oxygen. Due to positive allosteric cooperativity—where O2 binding to one heme induces quaternary conformational transitions that increase the affinity of neighboring heme units—the oxygen-hemoglobin dissociation curve assumes an S-shaped (sigmoidal) profile. The curve is standardized for resting physiological parameters: arterial pH 7.35–7.45 and core temperature ~38°C. The upper portion of the curve forms a flat plateau extending from PO2 of 60 to 100 mmHg: in this range, hemoglobin saturation remains above 90% (97.5% at 100 mmHg, 90% at 60 mmHg). This plateau provides an essential physiological buffer: moderate reductions in alveolar PO2 (such as at moderate altitude or in mild pulmonary disease) cause minimal reduction in total arterial oxygen content. Conversely, below 60 mmHg—and especially between 20 and 40 mmHg—the curve steepens sharply. In resting systemic capillary beds, tissue PO2 is ~40 mmHg; hemoglobin saturation drops from 97.5% to ~75%, releasing roughly 22%–25% of its bound oxygen to supply resting cellular respiration (~5 mL O2 / 100 mL blood) while leaving a substantial venous reserve (~15 mL O2 / 100 mL blood). In actively metabolizing tissues (such as contracting skeletal muscle), PO2 drops to 15–20 mmHg, and the steep slope triggers the unloading of an additional 50%–60% of bound oxygen. The position of the dissociation curve is dynamically regulated by local tissue microenvironments. Under the Bohr effect, elevated PCO2 and increased hydrogen ion concentration ([H+], decreased pH) weaken the ionic bonds stabilizing the relaxed state of hemoglobin, shifting the curve to the right. A rightward shift increases P50 (the PO2 required for 50% saturation, normally 26.6 mmHg) and decreases hemoglobin's affinity for oxygen, compelling it to offload significantly more oxygen at any given tissue PO2. Elevated tissue temperature (such as in working muscle or febrile states) and increased erythrocyte 2,3-bisphosphoglycerate (2,3-BPG) also shift the curve to the right. Conversely, in the lungs where PCO2 drops, pH rises to 7.45, and temperature is lower, the curve shifts to the left, increasing oxygen affinity to maximize capillary loading.",
      "plain": "Oxygen moves from alveoli into blood down a pressure gradient: alveolar PO2 is 100 mmHg while incoming deoxygenated blood is only 40 mmHg. Because oxygen dissolves poorly in liquid plasma (only 1.5% is dissolved), 98.5% is carried bound to iron atoms in hemoglobin inside red blood cells. Hemoglobin binding is cooperative, creating an S-shaped curve: the top is flat (so blood easily reaches 98% saturation in the lungs even if you are at high altitude), while the middle is steep (so when blood reaches tissues where PO2 is 40 mmHg, hemoglobin drops off its oxygen). Under the Bohr effect, active muscles produce carbon dioxide, acid, and heat, shifting the curve to the right so hemoglobin dumps off even more oxygen right where it is needed most. In the cool, low-CO2 lungs, the curve shifts left to grab oxygen tightly.",
      "keyFacts": [
        "External gas exchange is driven by partial pressure gradients: alveolar PO2 is 100 mmHg; arriving blood PO2 is 40 mmHg.",
        "Over 98.5% of oxygen is transported bound to Fe2+ in hemoglobin; only 1.5% is dissolved in plasma.",
        "Each hemoglobin tetramer binds up to four O2 molecules with positive allosteric cooperativity.",
        "Positive cooperativity imparts a sigmoidal (S-shaped) geometry to the oxygen-hemoglobin dissociation curve.",
        "The flat plateau of the curve (PO2 60–100 mmHg) ensures >90% arterial hemoglobin saturation.",
        "The steep slope (PO2 20–40 mmHg) enables extensive oxygen unloading in peripheral tissue capillary beds.",
        "Resting venous blood (PO2 40 mmHg) remains ~75% saturated, preserving a large venous oxygen reserve.",
        "The Bohr effect: decreased pH (acidosis) and elevated PCO2 shift the dissociation curve to the right.",
        "A rightward shift decreases oxygen affinity and increases P50, promoting tissue oxygen release.",
        "Elevated temperature and increased 2,3-BPG also shift the curve rightward to assist working muscles."
      ],
      "prerequisites": [],
      "examples": [
        "During sprinting, quadriceps muscle PO2 drops to 15 mmHg, intracellular temperature rises to 40°C, and local lactic acid lowers capillary pH to 7.1. These synergistic changes shift the oxygen-hemoglobin curve heavily to the right (Bohr effect), driving hemoglobin saturation down from 75% to less than 15%, liberating nearly all bound oxygen to fuel muscular ATP generation.",
        "In severe hypothermia (core body temperature dropping below 32°C), the oxygen-hemoglobin curve shifts markedly to the left. Although hemoglobin binds oxygen avidly in the lungs, it refuses to release oxygen in systemic tissues, producing cellular tissue hypoxia despite bright red, oxygen-saturated venous blood."
      ]
    },
    "memory": {
      "chunking": "Oxygen Carriage Rules: 98.5% Hemoglobin (Heme Fe2+) + 1.5% Plasma Solution → S-Shaped Curve (Plateau for Lungs, Steep for Tissues) → Bohr Right-Shift (CADET: CO2, Acid, 2,3-DPG, Exercise, Temp).",
      "comparison": "Left Shift vs Right Shift: Left shift means Locked/Tight affinity (Lungs, low temp, alkaline pH); Right shift means Released affinity (Running muscles, high temp, acidic pH).",
      "visualCue": "Picture hemoglobin as a smart delivery truck: it keeps all its packages locked tight on the high-speed highway (plateau in lungs), but as soon as it enters the hot, smoky industrial district (acidic exercising muscle), all four doors spring open automatically.",
      "teachBack": "Draw the oxygen-hemoglobin curve, label the resting arterial and mixed venous points, and explain what happens to P50 when blood pH drops from 7.4 to 7.2."
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
    "skills": [
      "Plot and interpret oxygen-hemoglobin equilibrium curves and calculate oxygen delivery at rest versus maximal exercise.",
      "Differentiate between hypoxemic, anemic, stagnant (ischemic), and histotoxic hypoxia based on PaO2 and SaO2 profiles."
    ],
    "selfCheck": "From memory: state the PO2 and PCO2 values for alveolar air versus mixed venous blood, explain the allosteric cooperativity of hemoglobin, and define the Bohr effect.",
    "visuals": [
      {
        "fig": "oxyhemoglobinCurve"
      },
      {
        "fig": "alveolarMicroarchitecture"
      },
      {
        "gen": true
      }
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
      "syllabusRef": {
        "ref": "edb.bio",
        "location": "Elective V(c) — \"Carbon dioxide transport in blood\" and \"Control of respiration: nervous and chemical control\"."
      },
      "beyond": [
        {
          "t": "Three pathways of carbon dioxide transport: dissolved gas in plasma (7%), carbaminohemoglobin (23%), and bicarbonate ions (70%).",
          "src": {
            "ref": "phys.3",
            "location": "p55 \"Carbon dioxide gas transport\""
          }
        },
        {
          "t": "Bicarbonate formation: 70 percent is transported as carbonic acid/bicarbonate catalyzed by erythrocyte carbonic anhydrase.",
          "src": {
            "ref": "phys.3",
            "location": "p56 \"70 percent is transported as carbonic acid\""
          }
        },
        {
          "t": "Carbamino binding: 23 percent binds directly to amino groups of globin polypeptide chains in hemoglobin.",
          "src": {
            "ref": "phys.3",
            "location": "p57 \"23 percent is bound to amino groups of globular proteins\""
          }
        },
        {
          "t": "Neural control of respiration: involuntary respiratory centers in the medulla oblongata and pons, subject to cortical voluntary modulation.",
          "src": {
            "ref": "phys.3",
            "location": "p59 \"The respiratory centers of the brain\""
          }
        },
        {
          "t": "Pontine respiratory centers: apneustic center promotes inhalation; pneumotaxic center limits inspiration and coordinates smooth transitions.",
          "src": {
            "ref": "phys.3",
            "location": "p62 \"apneustic and pneumotaxic\""
          }
        },
        {
          "t": "Medullary respiratory centers: Dorsal Respiratory Group (DRG) sets quiet inspiratory pace; Ventral Respiratory Group (VRG) controls forced breathing.",
          "src": {
            "ref": "phys.3",
            "location": "p63 \"Respiratory centers of the medulla oblongata\""
          },
          "supp": {
            "ref": "phys.3",
            "location": "p64 \"Dorsal respiratory group\""
          }
        },
        {
          "t": "Chemoreceptor reflex arcs: glossopharyngeal nerve (CN IX) from carotid bodies, vagus nerve (CN X) from aortic bodies.",
          "src": {
            "ref": "phys.3",
            "location": "p68 \"Chemoreceptor reflexes\""
          }
        },
        {
          "t": "Central chemoreceptors on the ventrolateral medulla monitor cerebrospinal fluid, directly responding to PCO2 and H+ ions.",
          "src": {
            "ref": "phys.3",
            "location": "p71 \"Central chemoreceptors that monitor cerebrospinal fluid\""
          }
        },
        {
          "t": "Homeostasis of arterial PCO2: negative feedback loops adjusting minute ventilation to maintain arterial PCO2 tightly at 40 mmHg.",
          "src": {
            "ref": "phys.3",
            "location": "p73 \"Homeostasis of Arterial P\""
          }
        }
      ]
    },
    "lesson": {
      "explanation": "Carbon dioxide (CO2) is generated continuously as an end-product of aerobic cellular respiration in peripheral tissues. Under resting conditions, peripheral cells produce approximately 200 mL of CO2 each minute. CO2 diffuses out of cells across interstitial fluid and capillary endothelium into the blood, where it is transported to the lungs via three simultaneous biochemical mechanisms: (1) Dissolved CO2 in physical solution in plasma: approximately 7% of transported CO2 remains physically dissolved as gas molecules; although CO2 is 20 times more soluble in water than oxygen, this represents a modest fraction. (2) Carbamino compounds: approximately 23% of CO2 diffuses into erythrocytes and binds reversibly to uncharged terminal amino groups (-NH2) of the globin protein chains, forming carbaminohemoglobin (Hb + CO2 ⇌ HbCO2). Crucially, CO2 does not bind to the iron-containing heme sites, meaning oxygen and carbon dioxide bind at completely different molecular domains of hemoglobin. Carbamino binding is strongly enhanced by deoxygenation: under the Haldane effect, when hemoglobin offloads oxygen in systemic tissues, deoxygenated hemoglobin exhibits a higher affinity for CO2, facilitating CO2 pickup; in the lungs, oxygen binding displaces CO2 from globin chains. (3) Bicarbonate ions (HCO3-): the dominant mechanism, accounting for approximately 70% of total CO2 transport. CO2 diffuses into erythrocytes where the zinc-containing metalloenzyme carbonic anhydrase rapidly catalyzes the reversible hydration of CO2 and water into carbonic acid: CO2 + H2O ⇌ H2CO3. Carbonic acid instantly dissociates into a hydrogen ion and a bicarbonate ion: H2CO3 ⇌ H+ + HCO3-. To prevent intracellular acidosis, the liberated H+ ions are buffered by deoxygenated hemoglobin (Hb serves as an excellent buffer for protons, which simultaneously triggers the Bohr effect to release O2). As intracellular bicarbonate accumulates inside the erythrocyte, it is transported out into plasma down its concentration gradient via an anion exchanger protein (Band 3 / AE1) in exchange for an incoming extracellular chloride ion (Cl-); this electroneutral reciprocal exchange is known as the chloride shift (Hamburger phenomenon). In pulmonary capillaries, the entire reaction runs in reverse: chloride shifts back out, bicarbonate enters the erythrocyte, carbonic anhydrase converts H2CO3 back into CO2 and H2O, and CO2 diffuses across the respiratory membrane to be exhaled. Regulation of pulmonary ventilation is coordinated by brainstem neural networks operating as an automatic negative feedback control system. In the medulla oblongata, the Dorsal Respiratory Group (DRG) contains inspiratory neurons that fire in rhythmic cycles to stimulate the phrenic and external intercostal nerves, generating normal quiet inspiration (eupnea); the Ventral Respiratory Group (VRG) contains both inspiratory and expiratory neurons that remain largely inactive during quiet breathing but are recruited during hyperpnea to stimulate accessory muscles for forced inhalation and active exhalation. In the pons, two paired centers modulate medullary activity: the apneustic center provides continuous stimulatory input to the DRG to prolong inhalation, while the pneumotaxic center cyclically inhibits the apneustic center and DRG, switching off inspiration to regulate breath depth and respiratory rate. Chemical control of breathing is primarily governed by arterial PCO2 homeostasis (target PaCO2 = 40 mmHg). Central chemoreceptors on the ventrolateral medulla provide 75%–85% of resting ventilatory drive; lipophilic CO2 crosses the blood-brain barrier into cerebrospinal fluid, generating H+ ions that directly stimulate central chemoreceptors. Peripheral chemoreceptors in the carotid bodies (CN IX) and aortic bodies (CN X) monitor arterial PCO2, arterial pH, and severe arterial hypoxemia (PaO2 < 60 mmHg). When arterial PCO2 rises (hypercapnia, PCO2 > 40 mmHg), both central and peripheral chemoreceptors fire vigorously, signaling the medullary respiratory centers to increase the rate and depth of breathing (hyperventilation), blowing off excess CO2 until arterial PCO2 returns to 40 mmHg.",
      "plain": "Carbon dioxide produced by working cells is carried in blood in three ways: 7% dissolved in plasma, 23% bound to hemoglobin (carbaminohemoglobin), and 70% converted into bicarbonate ions (HCO3-) by the enzyme carbonic anhydrase inside red blood cells. As bicarbonate leaves red blood cells into plasma, chloride moves in to keep electrical balance (the chloride shift). In the lungs, this entire process reverses so you can exhale the CO2. Your breathing rhythm is controlled by the medulla oblongata (DRG sets quiet breathing; VRG handles forced breathing) and the pons (apneustic and pneumotaxic centers fine-tune breath length). The main chemical driver of breathing is CO2: when arterial PCO2 rises above 40 mmHg, CO2 enters the brain fluid, turns into acid (H+), and stimulates central chemoreceptors to make you breathe faster and deeper until CO2 drops back to normal.",
      "keyFacts": [
        "Carbon dioxide is transported in three forms: 7% dissolved in plasma, 23% as carbaminohemoglobin, and 70% as bicarbonate.",
        "Carbaminohemoglobin forms when CO2 binds to globin amino groups, not to the iron heme sites.",
        "The Haldane effect: deoxygenation of hemoglobin increases its affinity for CO2.",
        "Erythrocyte carbonic anhydrase catalyzes the reversible hydration of CO2 into carbonic acid (H2CO3).",
        "The chloride shift: bicarbonate exits erythrocytes into plasma in exchange for incoming chloride ions (Cl-).",
        "The Dorsal Respiratory Group (DRG) in the medulla sets the basic rhythm of quiet inspiration.",
        "The Ventral Respiratory Group (VRG) is recruited during forced breathing for accessory muscle contraction.",
        "Pontine centers (apneustic and pneumotaxic) modulate breath depth and smooth the transition between inspiration and expiration.",
        "Central chemoreceptors on the ventrolateral medulla respond to CSF [H+] derived from arterial PCO2.",
        "Negative feedback tightly regulates arterial PCO2 at 40 mmHg; hypercapnia triggers hyperventilation."
      ],
      "prerequisites": [],
      "examples": [
        "During an acute panic attack, psychogenic hyperventilation blows off carbon dioxide, driving arterial PCO2 down to 22 mmHg (hypocapnia and acute respiratory alkalosis). Reduced blood CO2 causes cerebral vasoconstriction, producing lightheadedness, while acute alkalosis lowers ionized calcium, precipitating carpopedal spasms (tetany).",
        "When an individual holds their breath (voluntary apnea), cellular metabolism continues adding CO2 to blood, raising arterial PCO2 above 50 mmHg (hypercapnia). The resulting severe acidosis in the CSF stimulates central medullary chemoreceptors so powerfully that the involuntary respiratory drive overrides voluntary cortical inhibition, forcing the individual to gasp and resume breathing."
      ]
    },
    "memory": {
      "chunking": "CO2 Transport & Control Triad: Three Transport Forms (70% Bicarbonate, 23% Carbamino, 7% Dissolved) → Chloride Shift (HCO3- out, Cl- in) → Brainstem Hierarchy (DRG rhythm, Pons timing, Medullary central chemoreceptor setpoint at 40 mmHg).",
      "comparison": "Bohr vs Haldane Effect: Bohr effect is about O2 release (CO2/H+ causes Hb to drop O2); Haldane effect is about CO2 pickup (O2 loss causes Hb to grab CO2).",
      "visualCue": "Picture a revolving door on a red blood cell: for every bicarbonate ion (HCO3-) that slips out into the plasma, a chloride ion (Cl-) must slip through in the opposite direction to keep the charge balanced.",
      "teachBack": "Write out the complete carbonic anhydrase equation, explain the mechanism of the chloride shift, and describe how central chemoreceptors restore homeostasis when arterial PCO2 climbs to 50 mmHg."
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
    "skills": [
      "Trace the complete biochemical pathway of CO2 hydration, chloride shift, and reverse pulmonary unloading.",
      "Differentiate the anatomical locations and physiological functions of medullary (DRG, VRG) and pontine (apneustic, pneumotaxic) respiratory control centers."
    ],
    "selfCheck": "From memory: recite the three modes of CO2 transport with percentages, explain the chloride shift, and distinguish the DRG from the VRG.",
    "visuals": [
      {
        "fig": "ventilationMechanics"
      },
      {
        "fig": "oxyhemoglobinCurve"
      },
      {
        "gen": true
      }
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
    id: 'abct2326-digestive-wall-motility', subject: 'ABCT2326', unit: 'phys.dig', type: 'sequence',
    title: 'Digestive wall, peristalsis and neural control', tags: ['digestive', 'motility', 'mechanism', 'high-yield'],
    lesson: {
      explanation: 'Most of the digestive tract has four layers. The mucosa contacts the lumen and contains epithelium, lamina propria and muscularis mucosae. The submucosa contains connective tissue, vessels, glands and the submucosal plexus. The muscularis externa usually has inner circular and outer longitudinal smooth muscle with the myenteric plexus between them. The serosa is the outer covering. Peristalsis moves a bolus by contraction of circular muscle behind it and relaxation ahead, while longitudinal muscle shortens the segment. Local enteric reflexes can coordinate secretion and movement without the CNS: sensory receptors feed interneurons in the plexuses, which activate motor neurons to smooth muscle or glands. Long reflexes pass through the CNS; parasympathetic input generally prepares and stimulates digestion, whereas sympathetic input inhibits gastrointestinal activity.',
      keyFacts: ['Layers inward to outward: mucosa, submucosa, muscularis externa, serosa.', 'Submucosal plexus chiefly regulates secretion and local conditions.', 'Myenteric plexus lies in muscularis externa and chiefly regulates motility.', 'Peristalsis contracts behind and relaxes ahead of the bolus.', 'Short reflexes stay within the enteric nervous system; long reflexes involve the CNS.', 'Parasympathetic activity promotes digestion; sympathetic activity inhibits it.'], prerequisites: ['abct2326-digestive-pathway'], examples: [],
    },
    memory: { location: 'Submucosal plexus sits by glands; myenteric plexus sits by muscle.' },
    practice: [{ type: 'sequence', prompt: 'Order the digestive tract wall from the lumen outward.', items: ['Mucosa', 'Submucosa', 'Muscularis externa', 'Serosa'], explanation: 'This four-layer plan repeats through most of the tract.' }, { type: 'explain', prompt: 'How does peristalsis move a bolus forward?', model: 'Circular muscle contracts behind the bolus and relaxes ahead while longitudinal muscle shortens the receiving segment, creating a moving pressure wave.', rubric: ['Contraction behind', 'Relaxation ahead', 'Mentions longitudinal shortening or pressure wave'] }],
    commonMistakes: ['Swapping the submucosal and myenteric plexuses.'], skills: ['Locate the plexus beside the function it controls.'], selfCheck: 'Draw the four wall layers and place both plexuses, then narrate one peristaltic wave.',
    sourceRefs: [{ ref: 'phys.4', location: 'Slides 7–19 digestive wall layers, peristalsis, short and long reflexes' }],
  },
  {
    id: 'abct2326-digestive-stomach-control', subject: 'ABCT2326', unit: 'phys.dig', type: 'sequence',
    title: 'Stomach secretions and the three phases of gastric control', tags: ['digestive', 'stomach', 'mechanism', 'high-yield'],
    lesson: {
      explanation: 'Gastric glands contain mucous cells, parietal cells, chief cells and enteroendocrine cells. Parietal cells secrete hydrochloric acid and intrinsic factor. Chief cells release inactive pepsinogen, which HCl converts to proteolytic pepsin in the lumen. G cells release gastrin, while D cells release somatostatin that inhibits gastrin. Acid is generated when carbonic anhydrase forms carbonic acid inside the parietal cell; H⁺ is pumped into the gland lumen, bicarbonate exits to blood in exchange for chloride—the post-meal alkaline tide—and chloride then diffuses into the lumen to form HCl. Gastric activity has three phases. The cephalic phase begins with sight, smell, taste or thought of food through vagal stimulation. The gastric phase begins with stomach distension, higher pH and peptides, driving local reflexes and gastrin. The intestinal phase begins when chyme enters the duodenum; low pH, lipids and carbohydrates trigger the enterogastric reflex plus secretin, CCK and GIP to inhibit gastric secretion and emptying.',
      keyFacts: ['Parietal: HCl and intrinsic factor.', 'Chief: pepsinogen; HCl activates it to pepsin.', 'G cell: gastrin; D cell: somatostatin inhibits gastrin.', 'Bicarbonate leaves the parietal cell for blood as the alkaline tide while chloride enters.', 'Cephalic phase anticipates food; gastric phase responds to food in stomach; intestinal phase slows the stomach when chyme reaches duodenum.', 'The stomach begins protein digestion but absorbs little nutrient.'], prerequisites: ['abct2326-digestive-wall-motility'], examples: [],
    },
    memory: { sequence: 'Think it, fill it, brake it: cephalic, gastric, intestinal.' },
    practice: [{ type: 'matching', prompt: 'Match each gastric cell to its secretion.', pairs: [['Parietal cell', 'HCl and intrinsic factor'], ['Chief cell', 'Pepsinogen'], ['G cell', 'Gastrin'], ['D cell', 'Somatostatin']], explanation: 'The cell names identify the control map for gastric secretion.' }, { type: 'sequence', prompt: 'Order the phases of gastric control.', items: ['Cephalic phase', 'Gastric phase', 'Intestinal phase'], explanation: 'Anticipation precedes stomach filling; duodenal feedback follows.' }],
    commonMistakes: ['Saying chief cells secrete active pepsin; they secrete inactive pepsinogen.'], skills: ['Link each phase to the compartment currently sensing food.'], selfCheck: 'Name four gastric cell types and trace HCl production and the three control phases.',
    sourceRefs: [{ ref: 'phys.4', location: 'Slides 20–34 oral processing, stomach cells, HCl production and three phases of gastric control' }],
  },
  {
    id: 'abct2326-digestive-small-intestine-accessory', subject: 'ABCT2326', unit: 'phys.dig', type: 'matching',
    title: 'Small intestine, pancreas, liver and bile', tags: ['digestive', 'absorption', 'mechanism', 'high-yield'],
    lesson: {
      explanation: 'About 90% of nutrient absorption occurs in the small intestine. The duodenum receives acidic chyme plus pancreatic and hepatic secretions and neutralises the acid; the jejunum performs most chemical digestion and nutrient absorption; the ileum ends at the ileocaecal valve. Villi contain blood capillaries for water-soluble nutrients and a central lacteal for absorbed lipids. Brush-border enzymes sit on microvilli; enteropeptidase activates pancreatic trypsinogen. Pancreatic acini and ducts are exocrine and provide juice containing amylase, lipase, nucleases and proteolytic proenzymes; pancreatic islets are endocrine and release insulin and glucagon to blood. The liver regulates blood composition, nutrients, wastes, storage and drug inactivation and produces bile. Bile salts emulsify large lipid droplets into smaller droplets, increasing surface area for pancreatic lipase; bile does not enzymatically digest fat. The gallbladder stores and concentrates bile. Duodenal CCK contracts the gallbladder and relaxes the hepatopancreatic sphincter so bile enters the duodenum.',
      keyFacts: ['Duodenum receives and neutralises; jejunum digests and absorbs; ileum ends at ileocaecal valve.', 'Villus capillaries receive water-soluble nutrients; lacteals receive lipids.', 'Enteropeptidase activates trypsinogen.', 'Pancreatic acini are exocrine; islets are endocrine.', 'Bile emulsifies fat, increasing lipase-accessible surface area; it is not an enzyme.', 'Gallbladder stores/concentrates bile; CCK contracts it and relaxes the hepatopancreatic sphincter.'], prerequisites: ['abct2326-digestive-stomach-control'], examples: [],
    },
    memory: { comparison: 'Bile makes droplets smaller; lipase makes molecules smaller.' },
    practice: [{ type: 'matching', prompt: 'Match each small-intestinal segment to its main lecture role.', pairs: [['Duodenum', 'Receives chyme and neutralises acid'], ['Jejunum', 'Most chemical digestion and nutrient absorption'], ['Ileum', 'Ends at the ileocaecal valve']], explanation: 'The three segments divide reception, absorption and final delivery.' }, { type: 'explain', prompt: 'Why does emulsification improve fat digestion if bile is not an enzyme?', model: 'Bile salts divide large lipid drops into many small droplets, greatly increasing surface area exposed to pancreatic lipase, which performs the chemical hydrolysis.', rubric: ['Smaller droplets', 'Greater surface area', 'Lipase performs digestion'] }],
    commonMistakes: ['Calling bile a lipase or digestive enzyme.'], skills: ['Separate mechanical preparation by bile from chemical bond-breaking by lipase.'], selfCheck: 'Trace chyme through the three small-intestinal segments and explain how pancreas, liver and gallbladder assist.',
    sourceRefs: [{ ref: 'phys.4', location: 'Slides 35–52 small intestine, villi, pancreatic enzymes, liver, bile and gallbladder control' }],
  },
  {
    id: 'abct2326-digestive-hormones-colon', subject: 'ABCT2326', unit: 'phys.dig', type: 'matching',
    title: 'Duodenal hormones, large-intestinal functions and water balance', tags: ['digestive', 'hormones', 'absorption', 'high-yield'],
    lesson: {
      explanation: 'Duodenal hormones coordinate secretion and absorption. Gastrin responds to incompletely digested proteins and increases stomach motility, acid and enzyme production. Secretin responds when chyme reaches the duodenum, especially acid, and increases bile and bicarbonate-rich buffer secretion by liver and pancreas. GIP is released when fats and carbohydrates enter the small intestine and promotes insulin release while inhibiting gastric activity. CCK responds to lipids and partly digested proteins, increases pancreatic enzyme secretion, contracts the gallbladder and relaxes the hepatopancreatic sphincter. VIP increases intestinal gland secretion, dilates local capillaries and inhibits gastric acid; enterocrinin stimulates duodenal mucin. The large intestine reabsorbs water and bile salts, absorbs bacterial vitamins K, biotin and B5, compacts and stores faeces. Water itself is not actively transported; it follows osmotic gradients created chiefly by solute movement. Of roughly 9 L entering the tract daily from intake and secretions, about 7.8 L is reclaimed in small intestine, 1.25 L in colon and about 150 mL is lost in faeces.',
      keyFacts: ['Gastrin stimulates stomach motility, acid and enzymes.', 'Secretin stimulates bile and bicarbonate buffers.', 'GIP responds to fat/carbohydrate and promotes insulin while inhibiting stomach activity.', 'CCK stimulates pancreatic enzymes and bile ejection.', 'VIP increases intestinal secretion and blood flow while inhibiting gastric acid.', 'Colon: water/bile-salt reabsorption, bacterial vitamins, compaction and storage.', 'Water follows osmotic gradients; about 9 L enters daily and about 150 mL leaves in faeces.'], prerequisites: ['abct2326-digestive-small-intestine-accessory'], examples: [],
    },
    memory: { comparison: 'Secretin handles acid with buffer; CCK handles fat with enzymes and bile.' },
    practice: [{ type: 'matching', prompt: 'Match each duodenal hormone to its leading action.', pairs: [['Secretin', 'Increase bile and bicarbonate-rich buffers'], ['CCK', 'Pancreatic enzymes plus gallbladder contraction'], ['GIP', 'Insulin release and gastric inhibition'], ['VIP', 'Intestinal secretion and capillary dilation']], explanation: 'Each hormone coordinates the next organ needed for the arriving chyme.' }, { type: 'typed', prompt: 'Approximately how much water is lost in faeces each day in the lecture balance diagram?', accept: ['150 ml', '150 mL/day', '0.15 l', '150 millilitres'], explanation: 'About 150 mL, after small intestine and colon reclaim most of the roughly 9 L entering the tract.' }],
    commonMistakes: ['Saying water is actively pumped across the gut wall; solutes are transported and water follows osmotically.'], skills: ['Use the arriving nutrient to predict the hormone and organ response.'], selfCheck: 'Match the six intestinal hormones to triggers/actions and explain the 9 L water balance.',
    sourceRefs: [{ ref: 'phys.4', location: 'Slides 53–69 neural and hormonal coordination, large intestine, digestion and water reabsorption' }],
  },
];
