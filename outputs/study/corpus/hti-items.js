/*
 * HTI17103, drawn from the HTI17101 Exploring Radiography set — the study
 * items for the radiation-science strand.
 *
 * Split out of study-data.js in phase 2026-09-01. outputs/study-data.js is
 * the barrel every importer still uses; nothing imports this file directly
 * except its siblings.
 */

/* ------------------------------------------------------------------ *
 * Study items — HTI17103 (from the HTI17101 Exploring Radiography set)
 * ------------------------------------------------------------------ */

export const HTI_ITEMS = [
  {
    "id": "hti17103-what-is-radiography",
    "subject": "HTI17103",
    "unit": "hti.subject",
    "type": "definition",
    "title": "What radiography is, and who does what",
    "tags": [
      "profession",
      "high-yield"
    ],
    "practice": [
      {
        "type": "matching",
        "prompt": "Match each hospital radiation professional to their official defined duty.",
        "pairs": [
          [
            "Radiographer",
            "Takes the radiographs"
          ],
          [
            "Radiotherapist",
            "Plans and switches the beam on for treatments"
          ],
          [
            "Radiologist",
            "Interprets radiographic images (medical doctor)"
          ],
          [
            "Medical Physicist",
            "Calibrates and measures the radiation dose of instruments"
          ],
          [
            "Radiation chemist / pharmacist",
            "Prepares the nuclear medicine (radiopharmaceuticals)"
          ],
          [
            "Radio-oncologist",
            "Diagnoses and addresses therapeutic planning for cancer patients"
          ]
        ],
        "explanation": "These are the six distinct professional roles defined in the opening lecture on hospital radiation staff.",
        "src": {
          "ref": "hti.w1.2026",
          "location": "p10 \"Who are working with radiation in hospitals?\""
        }
      },
      {
        "type": "mcq",
        "prompt": "The X-ray tube anode target is engineered from a refractory mixture of which two metals?",
        "options": [
          "Copper and aluminium",
          "Tungsten and rhenium",
          "Lead and bismuth",
          "Titanium and molybdenum"
        ],
        "answer": 1,
        "explanation": "The electron stream strikes a target composed of a mixture of tungsten and rhenium, providing thermal durability and characteristic X-ray emission.",
        "src": {
          "ref": "hti.w1.2026",
          "location": "p5 \"Target is made of a mixture of Tungsten and Rhenium\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Which application uses ionizing radiation purely for biological decontamination WITHOUT generating any image?",
        "options": [
          "Airport baggage screening",
          "Industrial customs cargo inspection",
          "Industrial sterilization",
          "Fluoroscopic swallow examination"
        ],
        "answer": 2,
        "explanation": "Industrial sterilization uses ionizing radiation to kill microbes without producing an image; security, cargo, and fluoroscopy all produce images.",
        "src": {
          "ref": "hti.w1.2026",
          "location": "p7 \"Industrial sterilization\""
        }
      },
      {
        "type": "typed",
        "prompt": "Which hospital specialist is primarily tasked with calibrating and measuring the radiation dose delivered by clinical instruments?",
        "accept": [
          "medical physicist",
          "Medical physicist",
          "Medical Physicist",
          "physicist"
        ],
        "explanation": "The medical physicist is responsible for dose calibration, machine output verification, and radiation measurement.",
        "src": {
          "ref": "hti.w1.2026",
          "location": "p10 \"Medical Physicist – who calibrates and measures the radiation dose\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A first-year student asks why radiographers must study both human anatomy and radiation physics if modern digital equipment operates with preset exposure buttons. Using the lecture’s \"science of everything\" framework, explain the essential practical questions each subject answers in the clinical imaging room.",
        "model": "The lecture explains that radiography is not merely pushing buttons but a \"science of everything.\" Anatomy answers the fundamental clinical questions of \"where to apply\" the radiation beam and \"what is expected to see\" on the resulting image—allowing the radiographer to accurately align central rays to anatomical landmarks, position the patient, and evaluate image quality. Physics answers \"how to protect from ionizing radiation\" (applying ALARA, collimation, and shielding) and explains the mechanism of image formation (electron acceleration, tungsten-rhenium target bombardment, and differential tissue attenuation). Without anatomy, positioning fails; without physics, radiation safety and technical image optimization cannot be maintained.",
        "rubric": [
          "Connects anatomy to \"where to apply\" beam alignment and \"what is expected to see\" on radiographs",
          "Connects physics to radiation protection mechanisms and X-ray beam formation",
          "Explicitly refutes the \"just pushing buttons\" fallacy using the lecture framework"
        ]
      }
    ],
    "commonMistakes": [
      "Treating radiographer and radiologist as interchangeable terms: radiographers acquire radiographs; radiologists are specialist medical physicians who interpret them.",
      "Assuming all ionizing radiation applications produce images: industrial sterilization uses radiation without producing any image.",
      "Believing pure tungsten is used for all X-ray targets: the lecture explicitly specifies a mixture of tungsten and rhenium."
    ],
    "sourceRefs": [
      {
        "ref": "hti.w1.2026",
        "location": "p3 \"What is Radiography?\""
      },
      {
        "ref": "hti.w1.2026",
        "location": "p5 \"Electron stream strikes the “target” that emits characteristic rays\""
      },
      {
        "ref": "hti.w1.2026",
        "location": "p5 \"Target is made of a mixture of Tungsten and Rhenium\""
      },
      {
        "ref": "hti.w1.2026",
        "location": "p6 \"When will a radiographic image be needed?\""
      },
      {
        "ref": "hti.w1.2026",
        "location": "p7 \"Industrial sterilization\""
      },
      {
        "ref": "hti.w1.2026",
        "location": "p8 \"Radiology is a science of everything\""
      },
      {
        "ref": "hti.w1.2026",
        "location": "p10 \"Who are working with radiation in hospitals?\""
      },
      {
        "ref": "hti.w1.2026",
        "location": "p10 \"Radiographer – who takes the radiographs\""
      },
      {
        "ref": "hti.w1.2026",
        "location": "p10 \"Radiotherapist – who plans and switches the beam on for treatments\""
      },
      {
        "ref": "hti.w1.2026",
        "location": "p10 \"Medical Physicist – who calibrates and measures the radiation dose\""
      },
      {
        "ref": "hti.w1.2026",
        "location": "p10 \"Radiation chemist/pharmacist – who prepares the nuclear medicine\""
      },
      {
        "ref": "hti.w1.2026",
        "location": "p10 \"Radiologist – who interprets radiographic images\""
      },
      {
        "ref": "hti.w1.2026",
        "location": "p10 \"Radio-oncologist – who diagnoses and address the therapeutic\""
      },
      {
        "ref": "hti.w1b",
        "location": "p3 \"What is Radiography?\""
      },
      {
        "ref": "hti.w1b",
        "location": "p5 \"Electron stream strikes the “target” that emits characteristic rays\""
      },
      {
        "ref": "hti.w1b",
        "location": "p8 \"Radiology is a science of everything\""
      },
      {
        "ref": "hti.w1b",
        "location": "p9 \"Who is working with radiation in hospitals?\""
      }
    ]
  },
  {
    "id": "hti17103-ionizing-vs-nonionizing",
    "subject": "HTI17103",
    "unit": "hti.modalities",
    "type": "comparison",
    "title": "Ionizing vs non-ionizing modalities",
    "tags": [
      "modalities",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "By physical definition in the lecture, what specific atomic event distinguishes ionizing from non-ionizing radiation?",
        "options": [
          "The capacity to free outer-shell electrons from atoms",
          "The emission of audible acoustic vibrations through tissue",
          "The mechanical heating of cellular water molecules",
          "The deflection of magnetic dipoles in an external field"
        ],
        "answer": 0,
        "explanation": "Ionization is strictly defined in the lecture as the physical ability to free outer-shell electrons from neutral atoms.",
        "src": {
          "ref": "hti.w2",
          "location": "p5 \"The ability to free outer shell electrons\""
        }
      },
      {
        "type": "matching",
        "prompt": "Match each diagnostic modality to its syllabus radiation classification.",
        "pairs": [
          [
            "Computed Tomography (CT)",
            "Ionizing Radiation"
          ],
          [
            "Mammography",
            "Ionizing Radiation"
          ],
          [
            "Magnetic Resonance Imaging (MRI)",
            "Non-ionizing Radiation"
          ],
          [
            "Ultrasonography (US)",
            "Non-ionizing Radiation"
          ]
        ],
        "explanation": "CT and mammography use ionizing X-radiation; MRI (RF/magnetic) and ultrasound (mechanical sound waves) are non-ionizing.",
        "src": {
          "ref": "hti.w2",
          "location": "p3 \"Imaging Modalities\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Which radiofrequency operating parameter is cited in the lecture as an urban myth regarding microwave ovens?",
        "options": [
          "2,450 MHz (12.2 cm wavelength)",
          "900 MHz (33.3 cm wavelength)",
          "1,800 MHz (16.6 cm wavelength)",
          "2,600 MHz (11.5 cm wavelength)"
        ],
        "answer": 0,
        "explanation": "The lecture explicitly identifies microwave ovens operating at 2,450 MHz (12.2 cm wavelength) as a non-ionizing urban myth.",
        "src": {
          "ref": "hti.w2",
          "location": "p5 \"Microwave oven: 2,450 MHz (12.2 cm in wavelength)\""
        }
      },
      {
        "type": "cloze",
        "prompt": "Non-ionizing electromagnetic exposure is quantified in units such as ______ and Tesla, whereas ionizing absorbed and equivalent doses are measured in ______, gray (Gy), and sievert (Sv).",
        "accept": [
          "W/kg; J/kg",
          "W/kg, J/kg",
          "W/kg and J/kg",
          "watts per kilogram; joules per kilogram"
        ],
        "explanation": "The lecture contrasts non-ionizing units (W/kg; Tesla) with ionizing units (J/kg, Gy, Sv).",
        "src": {
          "ref": "hti.w2",
          "location": "p5 \"The difference in units (W/kg; Tesla vs. J/kg, Gy, Sv)\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A patient expresses anxiety that an upcoming MRI brain examination will expose them to dangerous radiation like a microwave oven or cell phone. How should the radiographer clarify the physics using the lecture framework?",
        "model": "The radiographer explains that MRI, microwave ovens (2,450 MHz), and cell phones (900/1800/2600 MHz) all operate in the non-ionizing electromagnetic spectrum, lacking the physical capacity to free outer-shell electrons or damage DNA. Furthermore, MRI uses non-ionizing radiofrequency (6–340 MHz) and magnetic fields (measured in Tesla) rather than ionizing X-ray doses (measured in gray and sievert).",
        "rubric": [
          "Applies the definition of non-ionizing radiation (inability to free outer-shell electrons)",
          "Identifies cell phones and microwaves as non-ionizing radiofrequency sources from the lecture",
          "Contrasts MRI magnetic/RF units (Tesla, W/kg) with ionizing radiation dose units (Gy, Sv)"
        ]
      }
    ],
    "commonMistakes": [
      "Assuming that high macroscopic electrical wattage or large equipment size equates to ionizing capability.",
      "Classifying MRI or ultrasound under ionizing radiation simply because they are housed within hospital radiology departments.",
      "Confusing the units of radiofrequency specific absorption rate (W/kg) with absorbed ionizing radiation dose (Gy = J/kg)."
    ],
    "sourceRefs": [
      {
        "ref": "hti.w2.2025",
        "location": "p2 \"Ionizing Radiation Non-ionizing Radiation\""
      },
      {
        "ref": "hti.w2.2025",
        "location": "p5 \"Imaging Modalities\""
      },
      {
        "ref": "hti.w2",
        "location": "p3 \"Imaging Modalities\""
      },
      {
        "ref": "hti.w2",
        "location": "p3 \"Ionizing Radiation Non-ionizing Radiation\""
      },
      {
        "ref": "hti.w2",
        "location": "p3 \"• General X-ray • Magnetic\""
      },
      {
        "ref": "hti.w2",
        "location": "p3 \"• Fluoroscopy/Angiography Resonance Imaging\""
      },
      {
        "ref": "hti.w2",
        "location": "p3 \"• Mammography • Ultrasonography\""
      },
      {
        "ref": "hti.w2",
        "location": "p3 \"• Computed Tomography\""
      },
      {
        "ref": "hti.w2",
        "location": "p3 \"• Radionuclide Imaging\""
      },
      {
        "ref": "hti.w2",
        "location": "p5 \"Ionizing vs. non-ionizing Radiation\""
      },
      {
        "ref": "hti.w2",
        "location": "p5 \"The ability to free outer shell electrons\""
      },
      {
        "ref": "hti.w2",
        "location": "p5 \"Ultraviolet (high energy)\""
      },
      {
        "ref": "hti.w2",
        "location": "p5 \"(Characteristic) X-ray\""
      },
      {
        "ref": "hti.w2",
        "location": "p5 \"Electron Beams\""
      },
      {
        "ref": "hti.w2",
        "location": "p5 \"Radioisotopes\""
      },
      {
        "ref": "hti.w2",
        "location": "p5 \"Microwave oven: 2,450 MHz (12.2 cm in wavelength)\""
      },
      {
        "ref": "hti.w2",
        "location": "p5 \"Cell phones: 900, 1,800, and 2,600 MHz\""
      },
      {
        "ref": "hti.w2",
        "location": "p5 \"The difference in units (W/kg; Tesla vs. J/kg, Gy, Sv)\""
      },
      {
        "ref": "hti.w2",
        "location": "p49 \"MRI - summary\""
      },
      {
        "ref": "hti.w2",
        "location": "p49 \"Water (hydrogen) molecules\""
      },
      {
        "ref": "hti.w2",
        "location": "p49 \"Non-ionizing radiation\""
      }
    ]
  },
  {
    "id": "hti17103-modality-detail",
    "subject": "HTI17103",
    "unit": "hti.modalities",
    "type": "definition",
    "title": "Modality detail — X-ray, fluoroscopy, CT and nuclear medicine",
    "tags": [
      "modalities"
    ],
    "practice": [
      {
        "type": "sequence",
        "prompt": "Arrange the traditional photographic film darkroom processing steps in their verified historical order.",
        "items": [
          "Developing",
          "Fixation",
          "Washing",
          "Drying"
        ],
        "explanation": "The lecture specifies the mandatory sequence: Developing -> Fixation -> Washing -> Drying.",
        "src": {
          "ref": "hti.w2",
          "location": "p10 \"Developing -> Fixation -> Washing -> Drying\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Which technological advancement distinguishes Direct Digital Radiography (DDR) from Computed Radiography (CR)?",
        "options": [
          "DDR uses flat-panel detectors requiring no external cassette readers",
          "DDR relies on chemical darkroom wet-tank processing",
          "DDR requires mechanical phosphor plate digitizers",
          "DDR cannot connect to hospital PACS networks"
        ],
        "answer": 0,
        "explanation": "The lecture highlights that DDR requires no readers, saves time, and uses no physical films, though it is expensive.",
        "src": {
          "ref": "hti.w2",
          "location": "p13 \"No readers, time-saving, no physical films\""
        }
      },
      {
        "type": "matching",
        "prompt": "Match each diagnostic radionuclide to its physical emission and nuclear imaging technique from the lecture syllabus.",
        "pairs": [
          [
            "Technetium-99m (6.02 h)",
            "Gamma emitter, SPECT"
          ],
          [
            "Fluorine-18 (109.75 min)",
            "Positron emitter, PET"
          ],
          [
            "Iodine-123 (13 h)",
            "Gamma emitter, SPECT"
          ],
          [
            "Carbon-11 (20.33 min)",
            "Positron emitter, PET"
          ]
        ],
        "explanation": "From the lecture table: 99mTc and 123I emit gamma rays for SPECT; 18F and 11C emit positrons for PET.",
        "src": {
          "ref": "hti.w2",
          "location": "p36 \"Commonly Used Radionuclides for Imaging and Therapy\""
        }
      },
      {
        "type": "typed",
        "prompt": "What full clinical system name does the abbreviation PACS stand for?",
        "accept": [
          "picture archiving and communication system",
          "picture archiving & communication system",
          "Picture Archiving and Communication System"
        ],
        "explanation": "PACS stands for Picture Archiving and Communication System, introduced with digital radiography.",
        "src": {
          "ref": "hti.w2",
          "location": "p12 \"Compatible to PACS\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A hospital radiology service is planning to upgrade its diagnostic infrastructure. Explain why the department would choose a combination of CT and PET (PET-CT) rather than a standalone planar gamma camera for complex cancer staging.",
        "model": "PET provides highly quantitative molecular imaging of metabolic bio-distribution using essential positron-emitting tracers (such as 18F-FDG), while CT provides rapid 360-degree anatomical cross-sections with multiplanar reconstruction. Combining them in a PET-CT scanner allows simultaneous metabolic detection and precise anatomical localization, along with essential CT-based attenuation calculation and reconstruction, surpassing the 2D spatial resolution and semi-quantitative limits of a planar gamma camera.",
        "rubric": [
          "Identifies PET as quantitative molecular/metabolic imaging using positron emitters",
          "Identifies CT as providing 360-degree multiplanar anatomical slices",
          "Explains that hybrid PET-CT enables anatomical localization and attenuation calculation/reconstruction"
        ]
      }
    ],
    "commonMistakes": [
      "Confusing Computed Radiography (CR, which still uses physical cassettes and readers) with Direct Digital Radiography (DDR, which uses no readers).",
      "Assuming that PET and SPECT use identical radioisotopes, overlooking that PET requires positron emitters with very short half-lives and medical cyclotrons.",
      "Reversing the order of wet darkroom processing stages (e.g. putting fixation before developing)."
    ],
    "sourceRefs": [
      {
        "ref": "hti.w2.2025",
        "location": "p8 \"General (routine) X-ray\""
      },
      {
        "ref": "hti.w2.2025",
        "location": "p10 \"Computed Radiography (CR)\""
      },
      {
        "ref": "hti.w2.2025",
        "location": "p11 \"Direct Digital Radiography (DR)\""
      },
      {
        "ref": "hti.w2.2025",
        "location": "p16 \"Fluoroscopy and contrast enhancement\""
      },
      {
        "ref": "hti.w2.2025",
        "location": "p19 \"Computed Tomography\""
      },
      {
        "ref": "hti.w2.2025",
        "location": "p29 \"Magnetic Resonance Imaging\""
      },
      {
        "ref": "hti.w2.2025",
        "location": "p37 \"Ultrasound (US) imaging\""
      },
      {
        "ref": "hti.w2.2025",
        "location": "p8 \"General (routine) X-ray\""
      },
      {
        "ref": "hti.w2.2025",
        "location": "p10 \"Computed Radiography (CR)\""
      },
      {
        "ref": "hti.w2.2025",
        "location": "p11 \"Direct Digital Radiography (DR)\""
      },
      {
        "ref": "hti.w2.2025",
        "location": "p16 \"Fluoroscopy and contrast enhancement\""
      },
      {
        "ref": "hti.w2.2025",
        "location": "p19 \"Computed Tomography\""
      },
      {
        "ref": "hti.w2.2025",
        "location": "p29 \"Magnetic Resonance Imaging\""
      },
      {
        "ref": "hti.w2.2025",
        "location": "p37 \"Ultrasound (US) imaging\""
      },
      {
        "ref": "hti.w2",
        "location": "p6 \"Discovery of X-ray\""
      },
      {
        "ref": "hti.w2",
        "location": "p6 \"Discovered by Wilheim Conrad Roentgen in 1895.\""
      },
      {
        "ref": "hti.w2",
        "location": "p6 \"The 1st Nobel Prize\""
      },
      {
        "ref": "hti.w2",
        "location": "p7 \"Thomas Edison (1847-1931)\""
      },
      {
        "ref": "hti.w2",
        "location": "p7 \"Invented X-ray fluoroscopy in 1896\""
      },
      {
        "ref": "hti.w2",
        "location": "p9 \"General (routine) X-ray\""
      },
      {
        "ref": "hti.w2",
        "location": "p9 \"Moveable X-ray tube\""
      },
      {
        "ref": "hti.w2",
        "location": "p9 \"Standing Bucky\""
      },
      {
        "ref": "hti.w2",
        "location": "p9 \"Patient couch/bed\""
      },
      {
        "ref": "hti.w2",
        "location": "p10 \"General (routine) X-ray – the films\""
      },
      {
        "ref": "hti.w2",
        "location": "p10 \"Developing -> Fixation -> Washing -> Drying\""
      },
      {
        "ref": "hti.w2",
        "location": "p11 \"General (routine) X-ray – the old ways\""
      },
      {
        "ref": "hti.w2",
        "location": "p12 \"General X-ray – the cassettes\""
      },
      {
        "ref": "hti.w2",
        "location": "p12 \"Computed Radiography\""
      },
      {
        "ref": "hti.w2",
        "location": "p12 \"Been applied since 1980s\""
      },
      {
        "ref": "hti.w2",
        "location": "p12 \"Need readers\""
      },
      {
        "ref": "hti.w2",
        "location": "p12 \"Compatible to PACS\""
      },
      {
        "ref": "hti.w2",
        "location": "p13 \"Direct Digital Radiography\""
      },
      {
        "ref": "hti.w2",
        "location": "p13 \"No readers, time-saving, no physical films\""
      },
      {
        "ref": "hti.w2",
        "location": "p13 \"Expensive\""
      },
      {
        "ref": "hti.w2",
        "location": "p18 \"Fluoroscopy and contrast enhancement\""
      },
      {
        "ref": "hti.w2",
        "location": "p18 \"Real-time monitoring\""
      },
      {
        "ref": "hti.w2",
        "location": "p18 \"Intraoperative applicable\""
      },
      {
        "ref": "hti.w2",
        "location": "p18 \"Angiography\""
      },
      {
        "ref": "hti.w2",
        "location": "p18 \"Stent installation\""
      },
      {
        "ref": "hti.w2",
        "location": "p18 \"Bone cement\""
      },
      {
        "ref": "hti.w2",
        "location": "p20 \"Fluoroscopy – contrast agents\""
      },
      {
        "ref": "hti.w2",
        "location": "p20 \"Barium sulfate (BaSO ) solution\""
      },
      {
        "ref": "hti.w2",
        "location": "p20 \"Ionic contrast agents vs. non-ionic contrast agents\""
      },
      {
        "ref": "hti.w2",
        "location": "p28 \"Computed Tomography\""
      },
      {
        "ref": "hti.w2",
        "location": "p28 \"Radiologists always need 2 views, how about a 360⁰-view?\""
      },
      {
        "ref": "hti.w2",
        "location": "p30 \"Computed Tomography – the spiral accelerates\""
      },
      {
        "ref": "hti.w2",
        "location": "p32 \"Multiplaner reconstruction 3D angiographic reconstruction\""
      },
      {
        "ref": "hti.w2",
        "location": "p33 \"From slices to reconstructed angiography and eventually a simulated heart model\""
      },
      {
        "ref": "hti.w2",
        "location": "p35 \"Radiopharmaceuticals – the bait\""
      },
      {
        "ref": "hti.w2",
        "location": "p35 \"A radioisotope (the siren)\""
      },
      {
        "ref": "hti.w2",
        "location": "p35 \"The non-invasive visualization of bio-distribution\""
      },
      {
        "ref": "hti.w2",
        "location": "p36 \"Commonly Used Radionuclides for Imaging and Therapy\""
      },
      {
        "ref": "hti.w2",
        "location": "p36 \"Carbon-11 20.33 min positron PET\""
      },
      {
        "ref": "hti.w2",
        "location": "p36 \"Nitrogen-13 9.97 min positron PET\""
      },
      {
        "ref": "hti.w2",
        "location": "p36 \"Oxygen-15 2.04 min positron PET\""
      },
      {
        "ref": "hti.w2",
        "location": "p36 \"Fluorine-18 109.75 min positron PET\""
      },
      {
        "ref": "hti.w2",
        "location": "p36 \"Technetium-99m 6.02 hours gamma SPECT\""
      },
      {
        "ref": "hti.w2",
        "location": "p36 \"Iodine-123 13 hours gamma SPECT\""
      },
      {
        "ref": "hti.w2",
        "location": "p37 \"99mTc-MDP (Bone scan)\""
      },
      {
        "ref": "hti.w2",
        "location": "p38 \"201Tl (Cardiac scan) 99mTc-DTPA (Renal function scan)\""
      },
      {
        "ref": "hti.w2",
        "location": "p40 \"Positron Emission Tomography (PET)\""
      },
      {
        "ref": "hti.w2",
        "location": "p40 \"Mostly combined with CT – attenuation calculation and\""
      },
      {
        "ref": "hti.w2",
        "location": "p41 \"PET or SPECT?\""
      },
      {
        "ref": "hti.w2",
        "location": "p41 \"Less quantitative • More quantitative\""
      },
      {
        "ref": "hti.w2",
        "location": "p41 \"Longer half-lives • Very short half-lives\""
      },
      {
        "ref": "hti.w2",
        "location": "p41 \"Less expensive • Expensive\""
      },
      {
        "ref": "hti.w2",
        "location": "p41 \"Cyclotron required\""
      },
      {
        "ref": "hti.w2",
        "location": "p41 \"Robotic handling\""
      }
    ]
  },
  {
    id: 'hti17103-radioprotection',
    subject: 'HTI17103', unit: 'hti.protect', type: 'definition',
    title: 'Radioprotective measures and dose limits',
    tags: ['radioprotection', 'dose-limits', 'alara', 'high-yield'],
    practice: [
      {
        type: 'sequence',
        prompt: 'List the four fundamental radioprotective measures in the standard order presented in the lecture.',
        items: ['Time', 'Distance', 'Shielding', 'Decay'],
        explanation: 'The four measures are: Time (minimize exposure duration), Distance (inverse square law), Shielding (lead barriers), and Decay (radioisotope half-life).',
        src: { ref: 'hti.w6', location: 'p11 "Radioprotective measures"' },
      },
      {
        type: 'typed',
        prompt: 'What core radiation protection philosophy does the acronym ALARA represent?',
        accept: ['as low as reasonably achievable', 'As low as reasonably achievable', 'As Low As Reasonably Achievable'],
        explanation: 'ALARA stands for "as low as reasonably achievable", the guiding principle balancing radiation dose against diagnostic benefit.',
        src: { ref: 'hti.w6', location: 'p16 "As low as reasonably achievable"' },
      },
      {
        type: 'mcq',
        prompt: 'Under ICRP Publication 103, what is the annual effective dose limit for an occupational radiology worker averaged over five consecutive years?',
        options: [
          '20 mSv/year (with a maximum of 50 mSv in any single year)',
          '50 mSv/year (with a maximum of 100 mSv in any single year)',
          '1 mSv/year',
          '5 mSv/year',
        ],
        answer: 0,
        explanation: 'ICRP 103 sets the occupational limit at 20 mSv/year averaged over 5 consecutive years, not to exceed 50 mSv in any single year.',
        src: { ref: 'hti.w6', location: 'p10 "20 mSv/year in an average of consecutive 5 years"' },
      },
      {
        type: 'mcq',
        prompt: 'What is the annual dose limit for a member of the general public according to ICRP Publication 103?',
        options: ['1 mSv in a year', '5 mSv in a year', '20 mSv in a year', '0.5 mSv in a year'],
        answer: 0,
        explanation: 'The public dose limit established by ICRP Publication 103 is 1 mSv in a year.',
        src: { ref: 'hti.w6', location: 'p10 "1 mSv in a year"' },
      },
      {
        type: 'matching',
        prompt: 'Match each radiation effect or parameter to its clinical radiobiological classification.',
        pairs: [
          ['Deterministic effect', 'Has threshold dose; severity increases with dose'],
          ['Stochastic effect', 'No known threshold; probability increases with dose'],
          ['TLD detection range', '0.05 mSv – 10 Sv'],
          ['Medical needs share', 'Over 90% in artificial radiation'],
        ],
        explanation: 'Deterministic effects exhibit dose thresholds; stochastic effects govern probabilistic risks (cancer); TLDs measure 0.05 mSv to 10 Sv.',
        src: { ref: 'hti.w6', location: 'p4 "Deterministic effect"' },
      },
      {
        type: 'mcq',
        prompt: 'Why is a thermoluminescent dosimeter (TLD) considered not feasible for detecting acute accidental radiation exposures?',
        options: [
          'It cannot provide immediate, real-time exposure readings because it requires thermal processing in a laboratory',
          'It has an upper measurement threshold of only 1 mSv',
          'It only detects non-ionizing ultraviolet radiation',
          'It degrades completely when exposed to diagnostic X-rays',
        ],
        answer: 0,
        explanation: 'TLDs store absorbed dose in crystal traps and must be heated in a laboratory reader to emit light, making them unsuitable for real-time accidental alerts.',
        src: { ref: 'hti.w6', location: 'p3 "Not feasible for accidental exposure"' },
      },
    ],
    application: [
      {
        type: 'scenario',
        prompt: 'A student radiographer observing a long fluoroscopy examination in theatre asks why the team cannot rely on radioactive "decay" to reduce their radiation dose while in the operating room. Explain why decay does not apply to an X-ray unit, and specify which radioprotective measures must be used instead.',
        model: 'Decay applies strictly to unsealed or sealed radioactive isotopes that emit radiation spontaneously through physical half-lives and cannot be switched off. In contrast, an X-ray tube generates photons electronically only while electrical current flows; the moment exposure terminates, radiation ceases immediately. Therefore, decay is irrelevant for diagnostic X-ray units. To protect personnel during fluoroscopy, the team must employ the other three measures: Time (minimize pedal beam-on fluoroscopy duration), Distance (maximize distance from patient and tube to leverage the inverse square law), and Shielding (wear lead aprons, thyroid shields, lead glasses, and position table-suspended lead drapes).',
        rubric: [
          'Explains that decay applies only to radioactive isotopes with physical half-lives, not electronically generated X-rays that cease instantly when beam-off',
          'Identifies the three operative radioprotective measures: Time, Distance, and Shielding',
          'Describes specific clinical implementations for each measure (e.g. minimizing fluoroscopy screening time, standing back via inverse square law, wearing lead aprons)',
        ],
      },
    ],
    commonMistakes: [
      'Omitting "Decay" when reciting protective measures (thinking there are only time, distance, and shielding).',
      'Confusing the 20 mSv 5-year average with the 50 mSv single-year limit for occupational workers.',
      'Believing TLD badges sound an audible alarm during accidental radiation leaks (they require delayed laboratory thermal readout).',
      'Confusing deterministic effects (which have a threshold dose, e.g. skin burn) with stochastic effects (no threshold, e.g. radiation-induced cancer).',
    ],
    sourceRefs: [
      { ref: 'hti.w6', location: 'p3 "thermoluminescent dosimeter (TLD) is a great tool"' },
      { ref: 'hti.w6', location: 'p3 "Detection range of TLD: 0.05 mSv – 10 Sv"' },
      { ref: 'hti.w6', location: 'p3 "Not feasible for accidental exposure"' },
      { ref: 'hti.w6', location: 'p4 "Deterministic effect"' },
      { ref: 'hti.w6', location: 'p4 "Stochastic effect"' },
      { ref: 'hti.w6', location: 'p6 "Medical needs (over 90% in artificial radiation)"' },
      { ref: 'hti.w6', location: 'p6 "Only 15% belong to artificial radiation"' },
      { ref: 'hti.w6', location: 'p10 "Dose limit for radiology workers:"' },
      { ref: 'hti.w6', location: 'p10 "20 mSv/year in an average of consecutive 5 years"' },
      { ref: 'hti.w6', location: 'p10 "50 mSv for every single year"' },
      { ref: 'hti.w6', location: 'p10 "1 mSv limit is set if pregnancy is declared"' },
      { ref: 'hti.w6', location: 'p10 "Dose limit for public:"' },
      { ref: 'hti.w6', location: 'p10 "1 mSv in a year"' },
      { ref: 'hti.w6', location: 'p10 "ICRP Publication 103"' },
      { ref: 'hti.w6', location: 'p11 "Radioprotective measures"' },
      { ref: 'hti.w6', location: 'p11 "Time"' },
      { ref: 'hti.w6', location: 'p11 "Inverse square law"' },
      { ref: 'hti.w6', location: 'p11 "Shielding"' },
      { ref: 'hti.w6', location: 'p11 "Decay"' },
      { ref: 'hti.w6', location: 'p11 "Half-life – physical, biological, and effective half-lives"' },
      { ref: 'hti.w6', location: 'p16 "As low as reasonably achievable"' },
    ],
  },
  {
    id: 'hti17103-radiation-therapy',
    subject: 'HTI17103', unit: 'hti.rt', type: 'sequence',
    title: 'The radiation therapy pathway',
    tags: ['radiation-therapy', 'clinical-pathway', 'high-yield'],
    practice: [
      {
        type: 'sequence',
        prompt: 'Order the four clinical stages of the RT planning and delivery pathway from initial positioning to delivery.',
        items: [
          'Determine treatment position and construct personalized immobilization devices',
          'Simulation — acquire medical images and simulate real setup',
          'RT treatment planning — contour OARs, design beam angles, and calculate dose',
          'Radiotherapy treatment — daily fractions on a specified linac',
        ],
        explanation: 'The clinical pathway advances strictly in four steps: immobilization position -> CT/MRI simulation -> computerized planning -> daily treatment delivery.',
        src: { ref: 'hti.w3', location: 'p12 "RT PLANNING SESSION STEP 1: DETERMINE TREATMENT POSITION"' },
      },
      {
        type: 'matching',
        prompt: 'Match each RT planning task to the professional responsible according to the lecture.',
        pairs: [
          ['Delineate tumour volume on every slice', 'Clinical oncologist'],
          ['Contour organs at risk (OARs) on every slice', 'Radiation therapist'],
          ['Dose calculation and linac parameter derivation', 'Radiation therapist / Dosimetrist'],
          ['Treatment setup and daily beam delivery at linac', 'Stationed radiation therapists (2–3 staff)'],
        ],
        explanation: 'Oncologists delineate target tumours; radiation therapists contour surrounding OARs, conduct treatment planning/dose calculation, and deliver treatment at the linac.',
        src: { ref: 'hti.w3', location: 'p18 "Identify and contour all the OARs in proximity to the tumour in EVERY slice"' },
      },
      {
        type: 'mcq',
        prompt: 'What are the four fundamental considerations when constructing personalized immobilization devices in Step 1?',
        options: [
          'Patient comfort, treatment accuracy, planning feasibility, and reproducibility',
          'Cost reduction, speed of fabrication, radio-opacity, and disposable materials',
          'High attenuation, rigid bone fixation, general anesthesia, and darkroom storage',
          'Patient weight loss, tumour shrinkage, beam energy, and gantry clearance',
        ],
        answer: 0,
        explanation: 'Slide 12 specifically lists: patient comfort, treatment accuracy, feasibility in terms of planning, and reproducibility.',
        src: { ref: 'hti.w3', location: 'p12 "Patient comfort, treatment accuracy, feasibility in terms of planning, reproducibility"' },
      },
      {
        type: 'mcq',
        prompt: 'In the Hong Kong healthcare system, how many radiotherapy centres operate across the public and private sectors combined?',
        options: [
          '12 centres (6 public HA hospitals and 6 private hospitals)',
          '8 centres (4 public HA hospitals and 4 private hospitals)',
          '16 centres (10 public HA hospitals and 6 private hospitals)',
          '6 centres (public HA hospitals only)',
        ],
        answer: 0,
        explanation: 'Hong Kong has 12 RT centres: six public Hospital Authority hospitals and six private hospitals, served by ~420 registered therapists.',
        src: { ref: 'hti.w3', location: 'p8 "Total 12 RT Centres in HK"' },
      },
      {
        type: 'typed',
        prompt: 'What was the previous historical professional job title for a radiation therapist in Hong Kong?',
        accept: ['therapeutic radiographer', 'Therapeutic radiographer'],
        explanation: 'In Hong Kong, the historical title was therapeutic radiographer before transitioning to radiation therapist.',
        src: { ref: 'hti.w3', location: 'p2 "Previously: Therapeutic radiographer"' },
      },
      {
        type: 'mcq',
        prompt: 'What is the standard treatment fraction schedule for a patient undergoing curative external beam radiotherapy on a medical linac?',
        options: [
          'Usually daily, 5 days/week for 3–6 weeks',
          'Once weekly for 12–16 weeks',
          'Twice daily, 7 days/week for 1 week',
          'Once a month for 6 months',
        ],
        answer: 0,
        explanation: 'Standard external beam fraction regimens require daily attendance 5 days per week over a period of 3 to 6 weeks.',
        src: { ref: 'hti.w3', location: 'p32 "Usually daily, 5 days/week for 3-6 weeks"' },
      },
    ],
    application: [
      {
        type: 'scenario',
        prompt: 'A junior radiography student asks why simulation CT imaging cannot be performed immediately when the patient enters the RT department, prior to fabricating an immobilization device. Explain the sequential rationale citing the four immobilization criteria and target/OAR contouring requirements.',
        model: 'Treatment planning images are useless unless they capture the patient in the exact, repeatable position used during daily linac irradiation. Step 1 (determine position and immobilize) must precede Step 2 (simulation) because reproducibility is the primary foundation of radiotherapy accuracy: without a personalized immobilization device (thermoplastic mask, vacuum bag), the patient cannot maintain the required posture or reproduce it across 3–6 weeks of treatment. Furthermore, because the oncologist and radiation therapist contour tumours and organs at risk (OARs) slice-by-slice directly on the simulation CT images to compute beam geometry and dose distribution in Step 3, the simulation scan must reflect the final immobilised treatment geometry.',
        rubric: [
          'Explains why immobilization must precede imaging (reproducibility across daily treatment fractions)',
          'Links the simulation CT images directly to slice-by-slice tumour and OAR contouring for dose calculation',
          'References the essential immobilization criteria (comfort, accuracy, feasibility, reproducibility)',
        ],
      },
    ],
    commonMistakes: [
      'Assuming all cancer patients are automatically referred to Clinical Oncology (referrals occur only when oncological management is indicated).',
      'Thinking simulation occurs before immobilization; immobilization positioning must always be established first to ensure reproducible imaging.',
      'Confusing the roles in planning: the oncologist delineates the tumour volume, whereas the radiation therapist contours organs at risk (OARs) and performs dose calculation.',
      'Assuming the USA job titles are identical to Hong Kong: the US uses "radiologic technologist" and separate specialized "dosimetrists".',
    ],
    sourceRefs: [
      { ref: 'hti.w3', location: 'p2 "Previously: Therapeutic radiographer"' },
      { ref: 'hti.w3', location: 'p2 "Specialist in treatment planning & dose calculation"' },
      { ref: 'hti.w3', location: 'p3 "Six public hospitals in HK providing RT & Oncology services"' },
      { ref: 'hti.w3', location: 'p8 "Total 12 RT Centres in HK"' },
      { ref: 'hti.w3', location: 'p8 "Radiation Therapists in HK: ~420"' },
      { ref: 'hti.w3', location: 'p10 "Not all patients with cancers will be referred to Clinical Oncology"' },
      { ref: 'hti.w3', location: 'p11 "First time to meet radiation therapists"' },
      { ref: 'hti.w3', location: 'p12 "Construction of personized immobilization devices"' },
      { ref: 'hti.w3', location: 'p12 "Patient comfort, treatment accuracy, feasibility in terms of planning, reproducibility"' },
      { ref: 'hti.w3', location: 'p14 "Acquire medical images for treatment planning & simulate real treatment setup"' },
      { ref: 'hti.w3', location: 'p15 "Tumour: High Dose"' },
      { ref: 'hti.w3', location: 'p15 "Organ-at-risk: Minimal dose"' },
      { ref: 'hti.w3', location: 'p18 "Identify and contour all the OARs in proximity to the tumour in EVERY slice"' },
      { ref: 'hti.w3', location: 'p22 "Radiation therapist conducts treatment planning based on the CT/MRI images"' },
      { ref: 'hti.w3', location: 'p26 "The entire package will be double/triple-checked by radiation therapists"' },
      { ref: 'hti.w3', location: 'p32 "Usually daily, 5 days/week for 3-6 weeks"' },
      { ref: 'hti.w3', location: 'p32 "Radiation therapists (usually 2-3 staff) are stationed in the LINAC"' },
      { ref: 'hti.w3', location: 'p41 "Accurate record of each radiation beam delivered to the patient each day"' },
    ],
  },
  {
    "id": "hti17103-department-and-request",
    "subject": "HTI17103",
    "unit": "hti.roleext",
    "type": "definition",
    "title": "Inside a radiology department: staffing and the request form",
    "tags": [
      "role extension",
      "clinical-practice",
      "high-yield"
    ],
    "practice": [
      {
        "type": "mcq",
        "prompt": "Across the Hospital Authority in Hong Kong, how many Clinical Oncology Centers provide radiation therapy services?",
        "options": [
          "4",
          "6",
          "12",
          "16"
        ],
        "answer": 1,
        "explanation": "There are 6 Clinical Oncology Centers (RT) in public HA hospitals, alongside 39 Departments of Radiology and 16 A&E services.",
        "src": {
          "ref": "hti.w5",
          "location": "p3 \"6 Clinical Oncology Centers (RT)\""
        }
      },
      {
        "type": "matching",
        "prompt": "Match each hospital radiology team member to their designated primary responsibility.",
        "pairs": [
          [
            "First radiographer",
            "Patient handling and anatomical positioning"
          ],
          [
            "Second radiographer",
            "Panel controlling and triggering beam exposure"
          ],
          [
            "Patient care assistant (PCA)",
            "Patient preparation and changing/gowning"
          ],
          [
            "Departmental nurse",
            "Support for CT, MRI, and A&E interventional care"
          ]
        ],
        "explanation": "Teamwork in radiology delegates specific duties between paired radiographers, PCAs, and nursing staff.",
        "src": {
          "ref": "hti.w5",
          "location": "p5 \"Team work is a must\""
        }
      },
      {
        "type": "typed",
        "prompt": "In the lecture worked example of an X-ray request form, what specific examination and projections were requested?",
        "accept": [
          "CXR (PA + Lat)",
          "CXR PA + Lat",
          "CXR PA and Lat",
          "chest x-ray pa and lateral",
          "chest x-ray (pa + lat)"
        ],
        "explanation": "The order form requested CXR (PA + Lat), representing a chest X-ray in posteroanterior and lateral projections.",
        "src": {
          "ref": "hti.w5",
          "location": "p7 \"CXR (PA + Lat)\""
        }
      },
      {
        "type": "mcq",
        "prompt": "Why must the radiographer verify the \"LMP\" field on the order form for female patients of reproductive age prior to pelvic or abdominal radiography?",
        "options": [
          "To calculate the necessary intravenous contrast agent dose",
          "To ensure the patient has maintained proper dietary fasting",
          "To avoid irradiating an early unsuspected pregnancy during organogenesis",
          "To determine whether direct digital radiography can be utilized"
        ],
        "answer": 2,
        "explanation": "LMP (Last Menstrual Period) verification is required to avoid fetal irradiation in pregnant patients, fulfilling radiation safety requirements.",
        "src": {
          "ref": "hti.w5",
          "location": "p7 \"Read the order form\""
        }
      }
    ],
    "application": [
      {
        "type": "scenario",
        "prompt": "A junior radiographer receives an order form that lists only \"CXR\" under Examination Requested, leaving the Clinical Information, Diagnosis, and LMP fields completely blank. Explain why the radiographer must pause and obtain this missing information before taking the exposure.",
        "model": "A radiographic request form is not just an equipment requisition; it is a clinical and legal consultation document. First, clinical information and provisional diagnosis (\"what is expected to see\") determine the appropriate projections (e.g. an erect PA view for pneumothorax/fluid levels vs an AP supine view if the patient is bedbound) and assist the radiographer in judging whether the pathology is adequately demonstrated. Second, without clinical history, transport requirements cannot be anticipated safely. Third, and most critically, omitting the LMP in a female of childbearing age violates radiation safety protocols, risking unintended irradiation of a conceptus. The radiographer must contact the referring doctor to obtain clinical history and confirm pregnancy status before exposing.",
        "rubric": [
          "Explains how clinical information/diagnosis dictates projection selection and image critique",
          "Highlights the radiation protection risk of omitted LMP verification for early pregnancy",
          "Recognizes the order form as a legal medical document that requires completion before irradiation"
        ]
      }
    ],
    "commonMistakes": [
      "Reading only the \"Examination Requested\" line while completely ignoring clinical notes, diagnosis, and allergy status.",
      "Assuming all 39 radiology departments in HA provide cancer radiation therapy (only 6 Clinical Oncology Centers provide radiotherapy; the 39 departments provide diagnostic medical imaging).",
      "Failing to verify LMP verbally with female patients before abdominal or lumbar spine imaging."
    ],
    "sourceRefs": [
      {
        "ref": "hti.w5",
        "location": "p3 \"Hospital authority\""
      },
      {
        "ref": "hti.w5",
        "location": "p3 \"7 Clusters\""
      },
      {
        "ref": "hti.w5",
        "location": "p3 \"39 Department of Radiology (MI)\""
      },
      {
        "ref": "hti.w5",
        "location": "p3 \"16 A&E Radiology Service\""
      },
      {
        "ref": "hti.w5",
        "location": "p3 \"6 Clinical Oncology Centers (RT)\""
      },
      {
        "ref": "hti.w5",
        "location": "p3 \"About 800 diagnostic radiographers\""
      },
      {
        "ref": "hti.w5",
        "location": "p3 \"About 180-200 Radiotherapists\""
      },
      {
        "ref": "hti.w5",
        "location": "p4 \"General manpower arrangement in hospitals\""
      },
      {
        "ref": "hti.w5",
        "location": "p4 \"29 radiologists\""
      },
      {
        "ref": "hti.w5",
        "location": "p4 \"84 radiographers\""
      },
      {
        "ref": "hti.w5",
        "location": "p4 \"16 nurses / patient-care assistants\""
      },
      {
        "ref": "hti.w5",
        "location": "p5 \"Team work is a must\""
      },
      {
        "ref": "hti.w5",
        "location": "p5 \"A pair of radiographer\""
      },
      {
        "ref": "hti.w5",
        "location": "p5 \"Patient handling\""
      },
      {
        "ref": "hti.w5",
        "location": "p5 \"Panel controlling\""
      },
      {
        "ref": "hti.w5",
        "location": "p5 \"Patient care assistant (PCA)\""
      },
      {
        "ref": "hti.w5",
        "location": "p5 \"Nurse (CT, MRI, and A&E)\""
      },
      {
        "ref": "hti.w5",
        "location": "p7 \"Read the order form\""
      },
      {
        "ref": "hti.w5",
        "location": "p7 \"CXR (PA + Lat)\""
      },
      {
        "ref": "hti.w5",
        "location": "p7 \"Cough x 2/12. SOB\""
      },
      {
        "ref": "hti.w5",
        "location": "p7 \"Chest infection\""
      }
    ]
  },
  {
    id: 'hti17103-modality-choice',
    subject: 'HTI17103', unit: 'hti.modalities', type: 'comparison',
    title: 'Structural against functional, and how a modality gets chosen',
    tags: ['modalities', 'structural-vs-functional', 'clinical-selection', 'high-yield'],
    practice: [
      {
        type: 'matching',
        prompt: 'Match each imaging modality to whether it provides structural imaging, functional imaging, or both according to the lecture.',
        pairs: [
          ['General (Routine) X-ray', 'Structural Imaging – indicating anatomical changes'],
          ['Nuclear medicine imaging', 'Functional Imaging - indicating physiological changes'],
          ['Magnetic Resonance Imaging', 'Both — listed under structural AND functional'],
          ['Ultrasound Imaging', 'Structural Imaging – indicating anatomical changes'],
        ],
        explanation: 'Structural imaging reveals anatomical changes, functional imaging reveals physiological changes, and MRI is uniquely listed in both categories.',
        src: { ref: 'hti.w1.2026', location: 'p16 "Structural Imaging – indicating anatomical changes"' },
      },
      {
        type: 'mcq',
        prompt: 'Which of the following is classified under the Department of Radiotherapy rather than Diagnostic Radiology?',
        options: [
          'Brachytherapy',
          'Vascular Interventional Imaging',
          'Computed Tomography',
          'Ultrasound Imaging',
        ],
        answer: 0,
        explanation: 'Brachytherapy, LINAC, 3D-CRT, IMRT, IGRT, and heavy ion/proton therapy belong to the Department of Radiotherapy.',
        src: { ref: 'hti.w1.2026', location: 'p15 "Brachytherapy"' },
      },
      {
        type: 'typed',
        prompt: 'What are the three fundamental clinical grounds that determine why a certain imaging modality is chosen?',
        accept: [
          'structure-of-interest, disease-dependent, patient condition',
          'structure of interest, disease, patient condition',
          'structure of interest, disease dependent, patient condition',
          'structure-of-interest, disease-dependent and patient condition',
        ],
        explanation: 'Modality selection is governed by: structure-of-interest, disease-dependent pathology, and patient condition.',
        src: { ref: 'hti.w1.2026', location: 'p17 "Why is certain modality chosen?"' },
      },
      {
        type: 'mcq',
        prompt: 'Which radiological sign or disease characteristic is listed in the lecture as an example of a disease-dependent selection ground?',
        options: [
          'Tumor heterogeneity, air/fluid level, and fat pad signs',
          'Patient financial status and insurance category',
          'Room temperature and scanner manufacturing year',
          'Film developer tank replenisher volume',
        ],
        answer: 0,
        explanation: 'Slide 17 specifically lists tumor heterogeneity, air/fluid levels, and fat pad signs as disease-dependent considerations.',
        src: { ref: 'hti.w1.2026', location: 'p17 "Tumor heterogeneity"' },
      },
      {
        type: 'sequence',
        prompt: 'Order the radiographer\'s clinical contributions from patient greeting and setup to diagnostic delivery.',
        items: [
          'To calmly communicate and comfort patients for preparation',
          'To precisely position patients and set the imaging parameters',
          "To safeguard patients' welfare, such as radiation dose and safety measures",
          'To be cautious through entire medical interventions',
          'To provide informative images for diagnosis',
        ],
        explanation: 'Radiographers prepare and comfort patients, set positions and parameters, safeguard welfare and radiation dose, maintain procedural caution, and produce diagnostic images.',
        src: { ref: 'hti.w1.2026', location: 'p16 "How Radiographers contribute to Diagnosis"' },
      },
      {
        type: 'mcq',
        prompt: 'Why is MRI categorized as both structural and functional imaging in the clinical curriculum?',
        options: [
          'Because the same scanner can be configured to image static anatomical structures or dynamic physiological processes (perfusion, metabolism)',
          'Because MRI uses ionizing gamma rays and non-ionizing sound waves simultaneously',
          'Because MRI was invented by radiologists and radiation therapists jointly',
          'Because MRI can only be operated inside an operating room',
        ],
        answer: 0,
        explanation: 'Structural vs functional reflects the diagnostic inquiry and sequence: MRI provides high-contrast soft-tissue anatomy as well as functional physiological data.',
        src: { ref: 'hti.w1.2026', location: 'p16 "Functional Imaging - indicating physiological changes"' },
      },
    ],
    application: [
      {
        type: 'scenario',
        prompt: 'An emergency department clinician requests an MRI for an acute trauma patient who is hypotensive, combative, and potentially has metallic foreign bodies in the orbits. Applying the three lecture grounds for modality choice (structure-of-interest, disease-dependent, patient condition), explain why immediate MRI is contraindicated and what alternative modality should be selected.',
        model: 'Modality selection requires balancing all three criteria: (1) Structure-of-interest: while soft tissues and brain parenchyma are well imaged by MRI, bony skull fractures and acute hemorrhages are rapidly demonstrated on CT. (2) Disease-dependent: acute intracranial hemorrhage and facial fractures require rapid evaluation without patient motion artifacts. (3) Patient condition: this is the overriding factor—the patient is hemodynamically unstable, combative, and carries a suspected metallic ocular foreign body (an absolute MRI contraindication due to ferromagnetic deflection). Therefore, emergent non-contrast CT is the correct modality choice: CT is rapid (seconds), compatible with life-support monitoring, safe with metal, and definitively evaluates acute hemorrhage and bone injury.',
        rubric: [
          'Applies the three criteria: structure-of-interest, disease-dependent, and patient condition',
          'Identifies patient instability and metallic foreign body as critical contraindications to MRI',
          'Justifies CT as the appropriate alternative modality based on speed, safety, and acute pathology evaluation',
        ],
      },
    ],
    commonMistakes: [
      'Classifying structural vs functional as a hardware machine division rather than an information/question category (which leaves MRI unclassifiable).',
      'Confusing radiotherapy modalities (LINAC, 3D-CRT, IMRT, brachytherapy) with diagnostic modalities.',
      'Selecting modalities solely based on "newest or most expensive technology" rather than structure, disease, and patient condition.',
      'Overlooking patient condition contraindications (e.g. pacemakers for MRI, renal failure for iodinated CT contrast, instability in prolonged scanning).',
    ],
    sourceRefs: [
      { ref: 'hti.w2.2025', location: 'p38 "Benefits Limitations"' },
      { ref: 'hti.w2.2025', location: 'p41 "Name the modalities"' },
      { ref: 'hti.w1.2026', location: 'p15 "How many modalities are applied in hospitals?"' },
      { ref: 'hti.w1.2026', location: 'p15 "Department of Diagnostic Radiology / Radiography"' },
      { ref: 'hti.w1.2026', location: 'p15 "General (Routine) X-ray"' },
      { ref: 'hti.w1.2026', location: 'p15 "Vascular Interventional Imaging"' },
      { ref: 'hti.w1.2026', location: 'p15 "Computed Tomography"' },
      { ref: 'hti.w1.2026', location: 'p15 "Magnetic Resonance Imaging"' },
      { ref: 'hti.w1.2026', location: 'p15 "Ultrasound Imaging"' },
      { ref: 'hti.w1.2026', location: 'p15 "Nuclear medicine imaging"' },
      { ref: 'hti.w1.2026', location: 'p15 "Department of Radiotherapy"' },
      { ref: 'hti.w1.2026', location: 'p15 "Linear Accelerator (LINAC)"' },
      { ref: 'hti.w1.2026', location: 'p15 "3D conformational radiotherapy (3D-CRT)"' },
      { ref: 'hti.w1.2026', location: 'p15 "Intensity-modulated radiotherapy (IMRT)"' },
      { ref: 'hti.w1.2026', location: 'p15 "Image-guided radiotherapy (IGRT)"' },
      { ref: 'hti.w1.2026', location: 'p15 "Brachytherapy"' },
      { ref: 'hti.w1.2026', location: 'p15 "Heavy ion / Proton therapy"' },
      { ref: 'hti.w1.2026', location: 'p16 "How Radiographers contribute to Diagnosis"' },
      { ref: 'hti.w1.2026', location: 'p16 "To calmly communicate and comfort patients for preparation"' },
      { ref: 'hti.w1.2026', location: 'p16 "To precisely position patients and set the imaging parameters"' },
      { ref: 'hti.w1.2026', location: "p16 \"To safeguard patients' welfare, such as radiation dose and safety measures\"" },
      { ref: 'hti.w1.2026', location: 'p16 "To be cautious through entire medical interventions"' },
      { ref: 'hti.w1.2026', location: 'p16 "To provide informative images for diagnosis"' },
      { ref: 'hti.w1.2026', location: 'p16 "Structural Imaging – indicating anatomical changes"' },
      { ref: 'hti.w1.2026', location: 'p16 "Functional Imaging - indicating physiological changes"' },
      { ref: 'hti.w1.2026', location: 'p17 "Why is certain modality chosen?"' },
      { ref: 'hti.w1.2026', location: 'p17 "Structure-of-interest"' },
      { ref: 'hti.w1.2026', location: 'p17 "Bones"' },
      { ref: 'hti.w1.2026', location: 'p17 "Soft tissues"' },
      { ref: 'hti.w1.2026', location: 'p17 "Biochemical activities"' },
      { ref: 'hti.w1.2026', location: 'p17 "Disease-dependent"' },
      { ref: 'hti.w1.2026', location: 'p17 "Tumor heterogeneity"' },
      { ref: 'hti.w1.2026', location: 'p17 "Air/fluid level"' },
      { ref: 'hti.w1.2026', location: 'p17 "Fat pad signs"' },
      { ref: 'hti.w1.2026', location: 'p17 "Patient condition"' },
    ],
  },
  {
    id: 'hti17103-linac-physics-components',
    subject: 'HTI17103', unit: 'hti.rt', type: 'concept',
    title: 'Linear accelerator: physics, microwave RF, and treatment head',
    tags: ['radiation-therapy', 'linac', 'physics', 'high-yield'],
    practice: [
      { type: 'mcq', prompt: 'Which microwave source functions as an oscillator and is typically used in low-energy linacs?', options: ['Klystron', 'Magnetron', 'Betatron', 'Cyclotron'], answer: 1,
        explanation: 'A magnetron is a microwave oscillator (2–5 MW peak power) used in low-energy linacs. A klystron is an amplifier (~7 MW) used in high-energy machines.',
        src: { ref: 'hti.linac2', location: 'p11 "Used in low energy machines"' } },
      { type: 'mcq', prompt: 'How do megavoltage linac beams differ fundamentally from cobalt-60 teletherapy units?', options: ['They have much lower dose rate', 'No permanent source of radiation exists', 'They cause much higher bone absorption', 'They require a radioactive source exchange every 5 years'], answer: 1,
        explanation: 'A linac generates radiation electronically by accelerating electrons; unlike cobalt-60 units, no permanent source of radiation exists when power is switched off.',
        src: { ref: 'hti.linac1', location: 'p6 "No permanent source of radiation exist"' } },
      { type: 'mcq', prompt: 'What is the main clinical advantage of a 270-degree achromatic bending magnet over a 90-degree magnet?', options: ['Smaller treatment head size', 'Stable output and field uniformity', 'Lower isocentre height', 'Lower machine cost'], answer: 1,
        explanation: 'A 270-degree bending system provides achromatic focus, giving stable energy output and beam uniformity. A 90-degree magnet gives a smaller head and lower isocentre.',
        src: { ref: 'hti.linac2', location: 'p15 "stable output & field uniformity"' } },
      { type: 'typed', prompt: 'Electrons emerge from the electron gun filament at approximately what fraction of the speed of light?', accept: ['0.4c', '0.4 c', '0.4 times the speed of light', '0.4'],
        explanation: 'Electrons are ejected from the gun cathode filament at about 0.4c, then accelerated up to 0.9c in the waveguide.',
        src: { ref: 'hti.linac2', location: 'p13 "Electron eject at ~ 0.4c"' } },
      { type: 'matching', prompt: 'Match each linac component to its primary function.',
        pairs: [['Magnetron', 'Microwave oscillator (low-energy machines)'], ['Klystron', 'Microwave amplifier (high-energy machines)'], ['Ion pump', 'Maintains waveguide vacuum (10^-7 torr)'], ['Flattening filter', 'Evens forward-peaked photon profile across 80% FWHM']],
        explanation: 'These are the core components of the linac microwave generation and beam delivery chain.',
        src: { ref: 'hti.linac2', location: 'p12 "Used in high energy"' } },
      { type: 'sequence', prompt: 'Order the linac beam path in photon treatment mode from generation to patient.',
        items: ['Electron gun cathode', 'Accelerating waveguide', 'Bending magnet', 'Tungsten X-ray target', 'Primary collimator', 'Flattening filter', 'Dual ionization chambers'],
        explanation: 'Electrons accelerate from gun through waveguide, bend 270 degrees into the tungsten target, and photons pass through primary collimator, flattening filter, and monitoring chambers.',
        src: { ref: 'hti.linac2', location: 'p13 "Electron accelerate from 0.4 to 0.9c"' } },
    ],
    application: [
      { type: 'scenario', prompt: 'Explain why megavoltage linear accelerator beams are preferred over orthovoltage X-rays for deep-seated pelvic tumours, citing bone absorption and beam stability factors from the lecture.',
        model: 'Megavoltage linac beams provide two decisive physical advantages: (1) Low bone absorption — at megavoltage energies, Compton scattering predominates over photoelectric absorption, preventing severe bone dose and necrosis in the pelvic girdle; (2) Skin-sparing and penetration — high energy yields maximum dose (Dmax) beneath the skin surface, delivering tumour dose while sparing skin. In high-energy machines, a 270° bending magnet and dual ionization chambers further guarantee stable energy output and uniform beam flatless across the treated volume.',
        rubric: ['Identifies low bone absorption due to Compton scattering predominance', 'Contrasts with orthovoltage/photoelectric bone absorption', 'Mentions beam flatness/energy stability from bending magnet/monitoring'] },
    ],
    commonMistakes: [
      'Confusing magnetron (oscillator) with klystron (amplifier).',
      'Believing a linac contains radioactive cobalt or caesium pellets that must be stored safely when power is off.',
      'Thinking the flattening filter is used during electron beam therapy (it is only used for photon beams; electron beams use scattering foils).',
    ],
    sourceRefs: [
      { ref: 'hti.linac1', location: 'p6 "1953 first 4MV machine was made"' },
      { ref: 'hti.linac1', location: 'p6 "Used Radar technique : Magnetron microwave source"' },
      { ref: 'hti.linac1', location: 'p6 "No permanent source of radiation exist"' },
      { ref: 'hti.linac1', location: 'p6 "Low bone absorption"' },
      { ref: 'hti.linac2', location: 'p11 "Used in low energy machines"' },
      { ref: 'hti.linac2', location: 'p12 "Used in high energy"' },
      { ref: 'hti.linac2', location: 'p13 "Electron eject at ~ 0.4c"' },
      { ref: 'hti.linac2', location: 'p13 "Electron accelerate from 0.4 to 0.9c"' },
      { ref: 'hti.linac2', location: 'p15 "smaller treatment head, low isocentre"' },
      { ref: 'hti.linac2', location: 'p15 "stable output & field uniformity"' },
      { ref: 'hti.linac2', location: 'p31 "Flattening Region : 80% of FWHM"' },
      { ref: 'hti.linac2', location: 'p31 "Over flattening @ Dmax manifest"' },
    ],
  },
  {
    id: 'hti17103-linac-accessories-protection',
    subject: 'HTI17103', unit: 'hti.rt', type: 'concept',
    title: 'Linac accessories: Cerrobend, wedges, MLCs, and bunker maze shielding',
    tags: ['radiation-therapy', 'linac', 'accessories', 'protection', 'high-yield'],
    practice: [
      { type: 'mcq', prompt: 'What is the primary operational advantage of dynamic wedges over physical metal wedges?', options: ['They increase photon energy', 'They provide larger field sizes (30 cm vs 15–20 cm) without requiring staff to enter the room', 'They eliminate all collimator transmission', 'They reduce treatment machine cost'], answer: 1,
        explanation: 'Dynamic wedges achieve up to 30 cm field width (vs 15–20 cm for physical wedges) and are driven by moving jaws during treatment, eliminating staff room entry.',
        src: { ref: 'hti.linac4', location: 'p17 "Larger field size (30 cm width vs. 15-20 cm for physical wedge)"' } },
      { type: 'mcq', prompt: 'At what beam energy threshold do photonuclear reactions begin producing hazardous photoneutrons in the linac head?', options: ['Above 4 MV', 'Above 6 MV', 'Above 10 MV', 'Above 25 MV'], answer: 2,
        explanation: 'Above 10 MV, photonuclear reactions produce neutron radiation, requiring specialized maze shielding and door design.',
        src: { ref: 'hti.linac4', location: 'p51 "Neutron radiation ( Energy > 10 MV)"' } },
      { type: 'typed', prompt: 'What is the low melting point of Cerrobend (Lipowitz metal) in degrees Celsius?', accept: ['70', '70°C', '70 degrees C', '70 C', '70 degrees'],
        explanation: 'Cerrobend melts at approximately 70°C, enabling rapid casting of custom shielding blocks.',
        src: { ref: 'hti.linac4', location: 'p4 "Low melting point (70oC)"' } },
      { type: 'matching', prompt: 'Match each linac accessory/parameter to its specification.',
        pairs: [['Cerrobend block', 'Melting point 70°C (~25 lbs weight)'], ['Lower jaws', 'Transmission under 0.5%'], ['Varian MLC leaf', 'Speed ~3 cm/s and transmission ~1.8%'], ['Bunker maze (5 m)', 'Reduces secondary radiation to one-tenth']],
        explanation: 'These numbers govern linac beam shaping and shielding performance.',
        src: { ref: 'hti.linac4', location: 'p8 "Lower Jaws, transmission <0.5%"' } },
      { type: 'mcq', prompt: 'Why were manual Cerrobend field blocks largely superseded by multileaf collimators in modern radiotherapy?', options: ['Cerrobend does not attenuate megavoltage X-rays', 'Blocks are heavy (~25 lbs), slow to fabricate (1–2 days), and pose dropping hazards', 'Cerrobend blocks melt during beam delivery', 'Jaws cannot move when blocks are in place'], answer: 1,
        explanation: 'Custom blocks weigh ~25 lbs, pose dropping hazards to patients and staff, and require 1–2 days to fabricate, whereas computer-controlled MLCs reshape in seconds.',
        src: { ref: 'hti.linac4', location: 'p5 "Block weigh ~25 lbs, heavy to handle and danger to drop on"' } },
    ],
    application: [
      { type: 'scenario', prompt: 'A radiotherapy department is designing a new treatment bunker for an 18 MV dual-energy linear accelerator. What radiation hazards emerge above 10 MV that are absent at 6 MV, and how does the room maze design address entrance safety?',
        model: 'Above 10 MV, photonuclear reactions (gamma, n) occur in high-Z linac head components (target, flattening filter, jaws), generating photoneutron contamination and induced radioactivity. Fast neutrons have a high radiation weighting factor. A 5 m long maze entrance scatters neutrons and secondary capture gamma rays multiple times along walls, reducing radiation reaching the bunker entrance to one-tenth. This enables the use of a lighter, motor-driven door with borated polyethylene and lead rather than an impractical multi-ton direct shield door.',
        rubric: ['Identifies photonuclear reactions and photoneutron production above 10 MV', 'Explains the 5 m maze design reducing radiation tenfold through multiple wall scatters', 'Contrasts with lower energies (6 MV) where photoneutrons do not occur'] },
    ],
    commonMistakes: [
      'Thinking Cerrobend melts at normal room temperatures or boiling water (it melts at 70°C).',
      'Assuming linac jaws transmit 5% (jaws transmit <0.5%; MLC leaves transmit ~1.8%).',
      'Believing neutron shielding is required for 6 MV linac bunkers (photonuclear reactions only become significant above 10 MV).',
    ],
    sourceRefs: [
      { ref: 'hti.linac4', location: 'p3 "7cm thick with 2cm Al at the"' },
      { ref: 'hti.linac4', location: 'p4 "Low melting point (70oC)"' },
      { ref: 'hti.linac4', location: 'p5 "Block weigh ~25 lbs, heavy to handle and danger to drop on"' },
      { ref: 'hti.linac4', location: 'p8 "Lower Jaws, transmission <0.5%"' },
      { ref: 'hti.linac4', location: 'p17 "Larger field size (30 cm width vs. 15-20 cm for physical wedge)"' },
      { ref: 'hti.linac4', location: 'p17 "no need to enter the treatment room to mount/dismount wedges"' },
      { ref: 'hti.linac4', location: 'p36 "Maximum leaf speed - approx. 3cm/sec on Varian MLC"' },
      { ref: 'hti.linac4', location: 'p51 "Neutron radiation ( Energy > 10 MV)"' },
      { ref: 'hti.linac4', location: 'p54 "i.e.a 5m long maze reduce"' },
    ],
  },
  {
    id: 'hti17103-linac-electrons-rapidarc',
    subject: 'HTI17103', unit: 'hti.rt', type: 'concept',
    title: 'Linac electron therapy and RapidArc volumetric modulated arc delivery',
    tags: ['radiation-therapy', 'linac', 'electrons', 'rapidarc', 'high-yield'],
    practice: [
      { type: 'mcq', prompt: 'According to NACP protocols, how is mean electron beam energy (E) related to the 50% depth-dose level (d50)?', options: ['E = 1.5 x d50', 'E = 2.33 x d50', 'E = 3.0 x d50', 'E = 5.0 x d50'], answer: 1,
        explanation: 'Under NACP protocols, mean electron energy at the surface is calculated as E = 2.33 x d50.',
        src: { ref: 'hti.linac3', location: 'p4 "NACP E = 2.33 x d50 (Dose)"' } },
      { type: 'mcq', prompt: 'What is the maximum gantry rotation speed during RapidArc (VMAT) delivery?', options: ['3 deg/s', '6 deg/s', '12 deg/s', '18 deg/s'], answer: 1,
        explanation: 'RapidArc restricts gantry rotation speed to a maximum of 6 deg/s.',
        src: { ref: 'hti.linac3', location: 'p29 "Gantry speed ( 6 deg/s)"' } },
      { type: 'mcq', prompt: 'How does treatment time compare between RapidArc and conventional static IMRT for nasopharyngeal carcinoma (NPC)?', options: ['RapidArc is slower (~30 min vs 15 min)', 'RapidArc is about 3 minutes vs 12–20 minutes for IMRT', 'Both take exactly 10 minutes', 'RapidArc takes 12–20 minutes vs 3 minutes for IMRT'], answer: 1,
        explanation: 'RapidArc reduces NPC treatment time dramatically to ~3 minutes compared with 12–20 minutes for static-field IMRT.',
        src: { ref: 'hti.linac3', location: 'p37 "Less tx time : RA :3 min vs IMRT:12-20 min"' } },
      { type: 'typed', prompt: 'How many control points are used in RapidArc Progressive Resolution Optimization Level 5?', accept: ['177', '177 CP', '177 control points'],
        explanation: 'Level 5 PRO optimization uses 177 control points across the arc.',
        src: { ref: 'hti.linac3', location: 'p31 "Level 5 :177 CP"' } },
      { type: 'matching', prompt: 'Match each RapidArc linac specification to its numerical limit.',
        pairs: [['Max gantry speed', '6 deg/s'], ['Max MLC leaf speed', '3.0 cm/s'], ['Max dose rate', '600 MU/s'], ['MLC leaf count', '120 Leafs']],
        explanation: 'These parameters define the mechanical limits of RapidArc dynamic delivery.',
        src: { ref: 'hti.linac3', location: 'p29 "MLC speed ( 3.0cm/s)"' } },
      { type: 'sequence', prompt: 'Arrange the Progressive Resolution Optimization stages in order of increasing control points.',
        items: ['Level 1 (10 CP)', 'Level 2', 'Level 3', 'Level 4', 'Level 5 (177 CP)'],
        explanation: 'PRO starts coarse at Level 1 (10 CP) and refines progressively to Level 5 (177 CP).',
        src: { ref: 'hti.linac3', location: 'p31 "Level 1 : 10 CP"' } },
    ],
    application: [
      { type: 'scenario', prompt: 'Compare the clinical and physical delivery differences between conventional static IMRT and RapidArc (VMAT) for a patient with nasopharyngeal carcinoma, referencing beam motion, delivery time, monitor units, and patient motion.',
        model: 'In static IMRT, the linac delivers fixed beam angles step-and-shoot or sliding window, requiring 12–20 minutes and over 2000 monitor units (MU). This long delivery time increases the risk of intrafraction patient movement and internal organ displacement. RapidArc delivers radiation continuously in single or dual 360° arcs while dynamically varying gantry speed (up to 6 deg/s), MLC leaf positions (up to 3.0 cm/s), and dose rate (up to 600 MU/s). For NPC, RapidArc reduces total monitor units to under 700 MU and shortens treatment time to ~3 minutes. This drastically improves patient comfort, minimizes intrafraction movement, and lowers whole-body scatter dose from head leakage.',
        rubric: ['Identifies dynamic simultaneous variation of gantry speed, MLC speed, and dose rate', 'Cites NPC monitor unit reduction (<700 MU vs >2000 MU)', 'Cites delivery time reduction (~3 min vs 12–20 min) and reduced intrafraction patient motion'] },
    ],
    commonMistakes: [
      'Thinking electron beams use flattening filters (electrons use scattering foils; flattening filters are for photon beams).',
      'Assuming RapidArc increases monitor units (it decreases MUs from >2000 to <700 for NPC).',
      'Confusing NACP electron dose formula (2.33 x d50) with photon depth dose rules.',
    ],
    sourceRefs: [
      { ref: 'hti.linac3', location: 'p5 "NACP E = 2.33 x d50 (Dose)"' },
      { ref: 'hti.linac3', location: 'p6 "3-10MeV ~ 3%"' },
      { ref: 'hti.linac3', location: 'p6 "10-25MeV ~ 5%"' },
      { ref: 'hti.linac3', location: 'p7 "2 Types of scattering foil"' },
      { ref: 'hti.linac3', location: 'p11 "Pb thickness(cm)= Electron energy"' },
      { ref: 'hti.linac3', location: 'p11 "Al filter added to filter X-ray (88KV)"' },
      { ref: 'hti.linac3', location: 'p12 "d80 ~ Energy (MeV)"' },
      { ref: 'hti.linac3', location: 'p14 "Multileafs Collimator ( 120 Leafs )"' },
      { ref: 'hti.linac3', location: 'p29 "implemented since April 2009"' },
      { ref: 'hti.linac3', location: 'p29 "Gantry speed ( 6 deg/s)"' },
      { ref: 'hti.linac3', location: 'p29 "MLC speed ( 3.0cm/s)"' },
      { ref: 'hti.linac3', location: 'p29 "Max Dose-rate ( 600MU/s)"' },
      { ref: 'hti.linac3', location: 'p31 "Level 1 : 10 CP"' },
      { ref: 'hti.linac3', location: 'p31 "Level 5 :177 CP"' },
      { ref: 'hti.linac3', location: 'p33 "X-jaw < 17cm"' },
      { ref: 'hti.linac3', location: 'p37 "Less MU : NPC - RA :<700 vs IMRT:>2000"' },
      { ref: 'hti.linac3', location: 'p37 "Less tx time : RA :3 min vs IMRT:12-20 min"' },
    ],
  },
  {
    id: 'hti17103-arc-radiation-therapy-vmat-tomo',
    subject: 'HTI17103', unit: 'hti.rt', type: 'concept',
    title: 'Evolution of radiotherapy: 2D, 3D-CRT, static IMRT, and rotational arc therapy (VMAT & Tomotherapy)',
    tags: ['radiation-therapy', 'vmat', 'tomotherapy', 'imrt', 'high-yield'],
    practice: [
      { type: 'mcq', prompt: 'What distinguishes conventional static IMRT from rotational arc therapy (such as VMAT and Tomotherapy)?', options: ['IMRT uses electron beams while arc therapy uses protons', 'Static IMRT uses gantry angles that do not rotate while the beam is on, whereas arc therapy delivers continuously during rotation', 'Static IMRT does not use multileaf collimators', 'Arc therapy cannot modulate beam intensity'], answer: 1,
        explanation: 'In conventional static IMRT, beams are delivered from fixed gantry angles that do not rotate while the beam is active. Arc therapy rotates continuously around the patient during beam delivery.',
        src: { ref: 'hti.arc.deck', location: 'p1 "that do not rotate while the beam is on"' } },
      { type: 'mcq', prompt: 'What is a major radiobiological and clinical concern associated with the increased monitor units and low-dose scatter bath of static IMRT?', options: ['Immediate skin desquamation', 'A potential increased risk of secondary malignancy', 'Excessive bone mineralization', 'Complete loss of tumor control'], answer: 1,
        explanation: 'Static IMRT can increase total body integral dose and scatter, leading to concerns over a potential increased risk of secondary malignancy.',
        src: { ref: 'hti.arc.deck', location: 'p1 "a potential increased risk of secondary malignancy"' } },
      { type: 'mcq', prompt: 'How does rotational arc therapy address the prolonged delivery times of complex static IMRT plans (such as lung SBRT taking up to 45 min)?', options: ['By omitting patient immobilization', 'By incorporating rotation of the beam relative to the patient to deliver treatment in minutes', 'By halving the total prescribed tumor dose', 'By using diagnostic X-ray tubes'], answer: 1,
        explanation: 'Rotational arc therapy rotates the beam relative to the patient during delivery, slashing delivery times from up to 45 minutes down to a fraction thereof.',
        src: { ref: 'hti.arc.deck', location: 'p2 "rotation of the beam relative to"' } },
      { type: 'typed', prompt: 'What imaging technology historically ushered in three-dimensional conformal radiotherapy (3D-CRT)?', accept: ['CT', 'CT scan', 'CT scanning', 'computed tomography'],
        explanation: 'The introduction of computed tomography (CT) scanning provided 3D volumetric anatomy for conformal planning.',
        src: { ref: 'hti.arc.deck', location: 'p1 "The advent of CT scanning for radiotherapy planning ushered in"' } },
      { type: 'matching', prompt: 'Match each radiotherapy modality to its defining delivery characteristic.',
        pairs: [['2D Radiotherapy', 'relying on planar anatomical landmarks'], ['3D-CRT', 'CT scanning ushered in volumetric planning'], ['Static IMRT', 'beamlets from angles that do not rotate while the beam is on'], ['Arc Therapy', 'incorporates rotation of the beam relative to the patient']],
        explanation: 'These pairings trace the technical evolution of external beam radiotherapy.',
        src: { ref: 'hti.arc.deck', location: 'p1 "dimensional radiotherapy was the standard of care, relying on"' } },
      { type: 'sequence', prompt: 'Order the four clinical radiotherapy eras chronologically by their introduction.',
        items: ['2D conventional radiotherapy (planar landmarks)', '3D Conformal Radiotherapy (CT scanning)', 'Static Intensity-Modulated Radiotherapy (IMRT)', 'Rotational Arc Therapy (VMAT / Tomotherapy)'],
        explanation: 'Radiotherapy evolved from planar 2D to 3D-CRT, then static IMRT, and currently rotational arc therapy.',
        src: { ref: 'hti.arc.deck', location: 'p1 "dimensional radiotherapy was the standard of care, relying on"' } },
    ],
    application: [
      { type: 'scenario', prompt: 'Discuss the clinical trade-offs between static-field IMRT and rotational arc therapy (VMAT) for a high-dose stereotactic treatment, explaining why delivery speed and integral dose matter.',
        model: 'Static-field IMRT subdivides beams into beamlets to conform dose tightly to tumors, but delivering high hypofractionated doses (e.g. 60 Gy in 3 fractions) across multiple fixed angles can take up to 45 minutes of beam-on and couch time. Prolonged treatments cause patient fatigue and increase intrafraction tumor motion. Additionally, high monitor units increase head leakage and total body integral dose, presenting a potential risk of secondary malignancies. Rotational arc therapy (VMAT) rotates continuously around the patient while dynamically shaping the beam and varying dose rate. This condenses delivery to minutes, drastically reduces intrafraction organ motion, lowers monitor units, and optimizes the low-dose wash.',
        rubric: ['Explains static IMRT delivery time issues (up to 45 min) and patient motion risk', 'Identifies potential secondary malignancy risk from higher integral dose / monitor units', 'Explains continuous rotation and speed advantages of rotational arc therapy'] },
    ],
    commonMistakes: [
      'Assuming 3D-CRT modulates beamlet intensities (3D-CRT delivers uniform beam intensities; IMRT modulates beamlets).',
      'Thinking static IMRT rotates during irradiation (static IMRT delivers from fixed gantry angles).',
      'Believing arc therapy increases total treatment time (it dramatically decreases delivery time from ~45 min to ~3 min).',
    ],
    sourceRefs: [
      { ref: 'hti.arc.deck', location: 'p1 "dimensional radiotherapy was the standard of care, relying on"' },
      { ref: 'hti.arc.deck', location: 'p1 "The advent of CT scanning for radiotherapy planning ushered in"' },
      { ref: 'hti.arc.deck', location: 'p1 "IMRT divides each large radiation beam into numerous"' },
      { ref: 'hti.arc.deck', location: 'p1 "that do not rotate while the beam is on"' },
      { ref: 'hti.arc.deck', location: 'p1 "IMRT generally requires more beams than"' },
      { ref: 'hti.arc.deck', location: 'p1 "IMRT can also allow for dose escalation"' },
      { ref: 'hti.arc.deck', location: 'p1 "complex and take longer to deliver, prolonging the time that a"' },
      { ref: 'hti.arc.deck', location: 'p1 "IMRT can result in increased integral dose"' },
      { ref: 'hti.arc.deck', location: 'p1 "a potential increased risk of secondary malignancy"' },
      { ref: 'hti.arc.deck', location: 'p1 "as X-rays or CT scans) immediately before or during treatment"' },
      { ref: 'hti.arc.deck', location: 'p2 "more than the conventional 2 Gy per day"' },
      { ref: 'hti.arc.deck', location: 'p2 "three fractions of 20 Gy are commonly employed"' },
      { ref: 'hti.arc.deck', location: 'p2 "up to 45 min to deliver"' },
      { ref: 'hti.arc.deck', location: 'p2 "rotation of the beam relative to"' },
    ],
  },
  {
    id: 'hti17103-sbrt-sirt-hepatocellular-carcinoma',
    subject: 'HTI17103', unit: 'hti.rt', type: 'concept',
    title: 'Liver SBRT and selective internal radiation therapy (SIRT) for hepatocellular carcinoma',
    tags: ['radiation-therapy', 'sbrt', 'sirt', 'liver', 'high-yield'],
    practice: [
      { type: 'mcq', prompt: 'In liver stereotactic body radiation therapy (SBRT), why are radio-opaque fiducial markers usually implanted in surrounding non-neoplastic liver rather than within the hepatocellular carcinoma itself?', options: ['Tumor markers cannot be seen on kV imaging', 'Because of concern about hepatocellular carcinoma high vascularization and cirrhosis-related coagulation impairment', 'Markers migrate faster in healthy liver tissue', 'To increase the physical density of the normal liver'], answer: 1,
        explanation: 'Due to tumor hypervascularity and underlying cirrhotic coagulopathy, fiducials are placed in surrounding non-neoplastic liver to prevent major hemorrhage.',
        src: { ref: 'hti.sbrt.hcc', location: 'p4 "surrounding non-neoplastic liver."' } },
      { type: 'mcq', prompt: 'What clinical presentation defines "classic" radiation-induced liver disease (RILD)?', options: ['Jaundice and portal vein thrombosis', 'Anicteric ascites and alkaline phosphatase elevation associated with veno-occlusive disease', 'Isolated hyperbilirubinemia with normal enzymes', 'Immediate fulminant hepatic necrosis within 24 hours'], answer: 1,
        explanation: 'Classic RILD is defined by anicteric ascites and elevated alkaline phosphatase resulting from hepatic veno-occlusive disease.',
        src: { ref: 'hti.sbrt.hcc', location: 'p2 "anicteric ascites and alkaline phosphatase elevation"' } },
      { type: 'mcq', prompt: 'Which radioisotope is most widely used in selective internal radiation therapy (SIRT / radioembolization) due to its 2.7-day half-life and ~3 mm tissue penetration without requiring prolonged radiation isolation?', options: ['Iodine-131 (131I)', 'Yttrium-90 (90Y)', 'Cobalt-60 (60Co)', 'Cesium-137 (137Cs)'], answer: 1,
        explanation: 'Yttrium-90 (90Y) is a pure beta emitter with a physical half-life of 2.7 days and average tissue penetration of ~3 mm, avoiding the 7–10 day isolation required for 131I.',
        src: { ref: 'hti.sbrt.hcc', location: 'p6 "90 Y"' } },
      { type: 'typed', prompt: 'How far can diaphragm and liver respiratory motion extend cranio-caudally in hepatocellular carcinoma stereotactic body radiation therapy?', accept: ['3 cm', 'up to 3 cm', '3cm', 'as much as 3 cm'],
        explanation: 'Diaphragm and liver respiratory motion can reach up to 3 cm cranio-caudally, demanding stringent motion management.',
        src: { ref: 'hti.sbrt.hcc', location: 'p3 "3 cm cranio-caudally."' } },
      { type: 'matching', prompt: 'Match each liver radiation therapy modality to its delivery pathway and primary physical attribute.',
        pairs: [['Liver SBRT', 'conformal external beam radiation technique using large fractions'], ['SIRT Radioembolization', 'injection of radioisotopes, usually delivered to liver tumors via the hepatic artery'], ['Yttrium-90 (90Y)', 'half-life 2.7 d and tissue penetration 3 mm'], ['Classic RILD', 'anicteric ascites and alkaline phosphatase elevation']],
        explanation: 'These pairings distinguish the physics, delivery, and toxicity of liver radiation therapy modalities.',
        src: { ref: 'hti.sbrt.hcc', location: 'p1 "Stereotactic body radiotherapy is a conformal external beam radiation technique"' } },
      { type: 'sequence', prompt: 'Order the clinical and procedural steps of liver stereotactic body radiation therapy (SBRT) delivery.',
        items: ['Evaluation of underlying cirrhosis (Child-Pugh score) and normal tissue tolerances', 'Implantation of radio-opaque fiducials in surrounding non-neoplastic liver', '4D CT planning simulation assessing up to 3 cm cranio-caudal liver excursion', 'Hypofractionated external beam treatment delivery (e.g. 3–6 fractions) under image guidance'],
        explanation: 'SBRT follows baseline organ evaluation, fiducial placement in non-neoplastic liver, 4D respiratory motion simulation, and guided hypofractionated beam delivery.',
        src: { ref: 'hti.sbrt.hcc', location: 'p3 "3 cm cranio-caudally."' } },
    ],
    application: [
      { type: 'scenario', prompt: 'A patient with unresectable hepatocellular carcinoma and underlying cirrhosis is evaluated for radiation therapy. Compare the rationale and safety considerations for choosing between stereotactic body radiation therapy (SBRT) versus selective internal radiation therapy (SIRT / radioembolization).',
        model: 'SBRT is ideal for well-demarcated, focal HCC lesions (typically 1–3 lesions). It uses conformal external beam hypofractionation (e.g. 30–54 Gy in 3–6 fractions). Because the liver moves up to 3 cm cranio-caudally during breathing, 4D motion management is essential, and tracking fiducials are placed in surrounding non-neoplastic liver to prevent bleeding from hypervascular tumors. SBRT planning must respect critical organ constraints (e.g. 30 Gy in 6 fractions to bowel/stomach) and limit mean liver dose to avoid classic RILD (anicteric ascites, ALP elevation) or non-classic RILD. Conversely, SIRT is preferred for larger or diffuse, multifocal tumors where external beam conformal fields cannot spare sufficient functional liver reserve. SIRT delivers 90Y microspheres via the hepatic artery, selectively irradiating tumor tissue (which derives >80% of blood supply arterially) while sparing portal-supplied normal liver. However, whole-liver SIRT is strictly avoided in Child-Pugh B cirrhosis to avoid fatal liver failure.',
        rubric: ['Contrasts focal external hypofractionation (SBRT) with intra-arterial radioembolization (SIRT)', 'Explains motion management (up to 3 cm cranio-caudal) and fiducial safety rationale', 'Describes classic and non-classic RILD and the Child-Pugh B caution for whole-liver SIRT'] },
    ],
    commonMistakes: [
      'Assuming fiducials are implanted inside the tumor core (they are placed in non-neoplastic liver to prevent haemorrhage in coagulopathic cirrhosis).',
      'Confusing classic RILD (anicteric ascites, alkaline phosphatase elevation) with acute hepatitis (marked jaundice and transaminitis).',
      'Believing 90Y requires prolonged inpatient isolation (it is a beta emitter with ~3 mm penetration and 2.7 d half-life; 131I Lipiodol requires 7–10 days isolation).',
    ],
    sourceRefs: [
      { ref: 'hti.sbrt.hcc', location: 'p1 "Stereotactic body radiotherapy is a conformal external beam radiation technique"' },
      { ref: 'hti.sbrt.hcc', location: 'p1 "injection of radioisotopes, usually delivered to liver tumors via the hepatic artery."' },
      { ref: 'hti.sbrt.hcc', location: 'p2 "Classic radiation-induced liver disease (RILD)"' },
      { ref: 'hti.sbrt.hcc', location: 'p2 "anicteric ascites and alkaline phosphatase elevation"' },
      { ref: 'hti.sbrt.hcc', location: 'p2 "Non-classic RILD is char-"' },
      { ref: 'hti.sbrt.hcc', location: 'p3 "3 cm cranio-caudally."' },
      { ref: 'hti.sbrt.hcc', location: 'p4 "surrounding non-neoplastic liver."' },
      { ref: 'hti.sbrt.hcc', location: 'p6 "131 I"' },
      { ref: 'hti.sbrt.hcc', location: 'p6 "90 Y"' },
      { ref: 'hti.sbrt.hcc', location: 'p8 "only therapy that can deliver high doses of radiation to diffuse"' },
      { ref: 'hti.sbrt.hcc', location: 'p8 "avoided in Child-Pugh B patients."' },
    ],
  },
];

// Retained ID for Course integration; administrative content is not a quiz lesson.
export const HTI_COURSE_LOGISTICS = [
  {
    id: 'hti17103-subject-2026',
    subject: 'HTI17103', unit: 'hti.subject', type: 'definition',
    title: 'The 2026 subject — eight sessions, two halves, two marks',
    tags: ['foundation', 'high-yield'],
    practice: [
      { type: 'mcq', prompt: 'How are the marks split in HTI17103?', options: ['Worksheet 100%', 'Worksheet 50%, seminar presentation 50%', 'Written exam 60%, coursework 40%', 'Seminar 100%'], answer: 1,
        explanation: 'Two halves, 50% each: the worksheet and the seminar presentation. There is no written examination.',
        src: { ref: 'hti.sched.2026', location: 'p1 "Worksheet"' } },
      { type: 'mcq', prompt: 'Which part of the subject carries the most contact hours?', options: ['Lectures', 'Seminar presentation', 'Clinical observation', 'They are equal'], answer: 2,
        explanation: 'Clinical observation is 12 hours of the 26; lectures are 10 and the seminar presentation 4.',
        src: { ref: 'hti.sched.2026', location: 'p1 "Clinical Observation: 12 Hours"' } },
      { type: 'cloze', prompt: 'Each group presents for ______ minutes, followed by ______ minutes of Q&A.', accept: ['10; 5', '10, 5', 'ten; five', '10 and 5'],
        explanation: '10 minutes of presentation and 5 minutes of Q&A, and everyone in the group must speak.',
        src: { ref: 'hti.sched.2026', location: 'p1 "Each group will present the given topic for 10 minutes"' } },
      { type: 'typed', prompt: 'How many contact hours does this 2-credit subject carry in total?', accept: ['26', '26 hours', 'twenty-six'],
        explanation: '26 — a subtotal of lecture 10, seminar 4 and clinical observation 12.',
        src: { ref: 'hti.sched.2026', location: 'p1 "This is a 2-credit subject with a subtotal of 26 contact hours required"' } },
      { type: 'sequence', prompt: 'Order the first five taught topics as the 2026 schedule runs them.', items: ['About this subject; Radiographer-to-be', 'Medical Imaging Modalities and Instruments', 'Radiotherapist-to-be', 'Basic Radiation Protection', 'MI vs. RT — Grand Prix of Streams'],
        explanation: 'The set introduces each stream, then the protection that applies to both, then compares them.',
        src: { ref: 'hti.sched.2026', location: 'p1 "Grand Prix of Streams"' } },
    ],
    application: [
      { type: 'scenario', prompt: 'Both assessments are group- or submission-based and there is no examination. What does that change about how you should prepare, compared with a subject marked by a closed-book test?',
        model: 'Nothing is recalled under time pressure, so memorising for retrieval buys very little here. Both halves reward preparation done in advance and in company: the worksheet is submitted to a deadline through a portal, so the risk is administrative — missing the deadline costs the whole 50%. The seminar is a group presentation where everyone must speak, so the risk is distributed — an unprepared member costs marks that are partly yours. The preparation that matters is scheduling and coordination rather than revision.',
        rubric: ['Notes there is no timed recall', 'Identifies the deadline as the worksheet risk', 'Identifies the speak-everyone rule as a shared risk'] },
    ],
    commonMistakes: [
      'Treating the Observation Day as optional extra; it is 12 of the 26 contact hours.',
      'Assuming a written examination exists — the assessment is worksheet plus seminar, nothing else.',
      'Letting one group member present the whole seminar; the schedule requires everyone to speak.',
    ],
    sourceRefs: [
      { ref: 'hti.sched.2026', location: 'p1 "This is a 2-credit subject with a subtotal of 26 contact hours required"' },
      { ref: 'hti.sched.2026', location: 'p1 "Worksheet"' },
      { ref: 'hti.sched.2026', location: 'p1 "Grand Prix of Streams"' },
    ],
  },
];

/*
 * Radiograph image questions — schema for later use, not live data.
 *
 * A radiograph question is a normal STUDY_ITEM (any subject/unit) whose
 * `practice` entries carry an extra `image` field: a filename resolved
 * against outputs/assets/xray/. No new item type is needed — `mcq` and
 * `typed` questions both support it as-is, and dimensionFor() already
 * routes any question with an `image` field to the 'location' mastery
 * dimension.
 *
 * Add real cases only once you have a licensed image file AND a genuine
 * sourceRefs entry pointing at a file that exists in the supplied source
 * folders — see outputs/assets/xray/README.md and the project rule at the
 * top of this file. Do not invent positioning notes, landmark facts or
 * mnemonics. The supplied HTI17103/HTI17101 materials only establish "PA"
 * and "Lat" as projection terms so far (see the
 * 'hti17103-department-and-request' item above) — a real case's prompt and
 * explanation text must stay inside what the cited source actually says.
 *
 * Example shape (illustrative only — do not add this object to STUDY_ITEMS):
 *
 * {
 *   id: 'hti17103-cxr-pa-example',
 *   subject: 'HTI17103', unit: 'hti.modalities', type: 'mcq',
 *   title: 'Reading a CXR PA radiograph',
 *   practice: [
 *     { type: 'mcq', image: 'cxr-pa-001.jpg',
 *       prompt: 'Which projection is shown here?',
 *       options: ['PA', 'Lat', 'AP', 'Oblique'], answer: 0,
 *       explanation: '...cite exactly what the source says...' },
 *   ],
 *   sourceRefs: [{ ref: 'hti.w2', location: '...' }],
 * }
 */
