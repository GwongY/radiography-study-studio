/* Bone landmarks — curated on the shipped skeleton by work/build-bone-landmarks.mjs.
 * Course citations establish names; mesh-local markers are app-authored annotations.
 * No inferred landmarks on unmapped bones. Changed geometry fails the runtime signature.
 */
export const BONE_LANDMARK_MODEL_HASH = 'd7d08a44b1020f1096dcc6364068eac6ba672986e98c992597878034b17b7040';
export const BONE_LANDMARKS = {
  "femur": {
    "mesh": "Femurl",
    "vertices": 519,
    "points": [
      {
        "name": "Head",
        "vertex": 512,
        "expected": [
          0.127689,
          0.892209,
          0.047853
        ],
        "sourceRef": {
          "ref": "hss.ll.2026",
          "location": "p16: \"Head of femur\""
        },
        "alternates": [
          {
            "vertex": 513,
            "expected": [
              0.119144,
              0.938841,
              0.105472
            ]
          }
        ]
      },
      {
        "name": "Neck",
        "vertex": 458,
        "expected": [
          0.045534,
          0.832881,
          0.003418
        ],
        "sourceRef": {
          "ref": "hss.ll.2026",
          "location": "p7: labelled anatomy diagram",
          "diagramLabel": "Neck"
        },
        "alternates": [
          {
            "vertex": 461,
            "expected": [
              0.062014,
              0.820429,
              0.13477
            ]
          }
        ]
      },
      {
        "name": "Greater trochanter",
        "vertex": 60,
        "expected": [
          -0.233039,
          0.843379,
          0.003662
        ],
        "sourceRef": {
          "ref": "hss.ll.2026",
          "location": "p7: labelled anatomy diagram",
          "diagramLabel": "Greater trochanter"
        },
        "alternates": [
          {
            "vertex": 128,
            "expected": [
              -0.175787,
              0.854488,
              0.097659
            ]
          }
        ]
      },
      {
        "name": "Lesser trochanter",
        "vertex": 345,
        "expected": [
          -0.008423,
          0.60799,
          -0.05005
        ],
        "sourceRef": {
          "ref": "hss.ll.2026",
          "location": "p7: labelled anatomy diagram",
          "diagramLabel": "Lesser trochanter"
        }
      },
      {
        "name": "Medial condyle",
        "vertex": 215,
        "expected": [
          0.117924,
          -0.940916,
          0.088992
        ],
        "sourceRef": {
          "ref": "hss.ll.2026",
          "location": "p7: labelled anatomy diagram",
          "diagramLabel": "Medial condyle"
        },
        "alternates": [
          {
            "vertex": 268,
            "expected": [
              0.127812,
              -0.895871,
              -0.131352
            ]
          }
        ]
      },
      {
        "name": "Lateral condyle",
        "vertex": 20,
        "expected": [
          -0.062136,
          -0.945677,
          0.064577
        ],
        "sourceRef": {
          "ref": "hss.ll.2026",
          "location": "p7: labelled anatomy diagram",
          "diagramLabel": "Lateral condyle"
        },
        "alternates": [
          {
            "vertex": 13,
            "expected": [
              -0.091678,
              -0.889523,
              -0.133183
            ]
          }
        ]
      },
      {
        "name": "Shaft",
        "vertex": 228,
        "expected": [
          -0.028687,
          0.044435,
          0.014527
        ],
        "sourceRef": {
          "ref": "hss.ll.2026",
          "location": "p7: labelled anatomy diagram",
          "diagramLabel": "Shaft"
        }
      },
      {
        "name": "Patellar surface",
        "vertex": 73,
        "expected": [
          -0.017945,
          -0.918943,
          0.089602
        ],
        "sourceRef": {
          "ref": "hss.ll.2026",
          "location": "p7: labelled anatomy diagram",
          "diagramLabel": "Patellar surface"
        }
      },
      {
        "name": "Medial epicondyle",
        "vertex": 419,
        "expected": [
          0.18482,
          -0.794305,
          0.042726
        ],
        "sourceRef": {
          "ref": "hss.ll.2026",
          "location": "p7: labelled anatomy diagram",
          "diagramLabel": "Medial epicondyle"
        }
      },
      {
        "name": "Lateral epicondyle",
        "vertex": 24,
        "expected": [
          -0.09534,
          -0.847285,
          0.005127
        ],
        "sourceRef": {
          "ref": "hss.ll.2026",
          "location": "p7: labelled anatomy diagram",
          "diagramLabel": "Lateral epicondyle"
        }
      }
    ],
    "primaryNames": [
      "Head",
      "Neck",
      "Greater trochanter",
      "Lesser trochanter",
      "Patellar surface"
    ]
  },
  "hip bone": {
    "mesh": "Hip_bonel",
    "vertices": 728,
    "points": [
      {
        "name": "Iliac crest",
        "vertex": 703,
        "expected": [
          -0.187506,
          0.949095,
          -0.21778
        ],
        "sourceRef": {
          "ref": "hss.ll.2026",
          "location": "p5: \"Iliac crest\""
        }
      },
      {
        "name": "Ilium",
        "vertex": 620,
        "expected": [
          -0.308512,
          0.652425,
          0.03882
        ],
        "sourceRef": {
          "ref": "hss.ll.2026",
          "location": "p6: \"Ilium\""
        }
      },
      {
        "name": "Ischium",
        "vertex": 13,
        "expected": [
          0.041139,
          -0.885006,
          -0.302408
        ],
        "sourceRef": {
          "ref": "hss.ll.2026",
          "location": "p6: \"Ischium\""
        }
      },
      {
        "name": "Pubis",
        "vertex": 62,
        "expected": [
          0.520218,
          -0.702109,
          0.490158
        ],
        "sourceRef": {
          "ref": "hss.ll.2026",
          "location": "p6: \"Pubis\""
        }
      },
      {
        "name": "Acetabulum",
        "vertex": 374,
        "expected": [
          -0.28959,
          -0.186407,
          0.004761
        ],
        "sourceRef": {
          "ref": "hss.ll.2026",
          "location": "p6: labelled anatomy diagram",
          "diagramLabel": "Acetabulum"
        }
      },
      {
        "name": "Ischial spine",
        "vertex": 378,
        "expected": [
          0.218757,
          -0.309122,
          -0.330851
        ],
        "sourceRef": {
          "ref": "hss.ll.2026",
          "location": "p6: labelled anatomy diagram",
          "diagramLabel": "Ischial spine"
        }
      },
      {
        "name": "Ischial tuberosity",
        "vertex": 14,
        "expected": [
          0.016724,
          -0.88757,
          -0.245857
        ],
        "sourceRef": {
          "ref": "hss.ll.2026",
          "location": "p6: labelled anatomy diagram",
          "diagramLabel": "Ischial tuberosity"
        }
      },
      {
        "name": "Obturator foramen",
        "vertex": 229,
        "expected": [
          0.152959,
          -0.518632,
          0.118046
        ],
        "sourceRef": {
          "ref": "hss.ll.2026",
          "location": "p6: labelled anatomy diagram",
          "diagramLabel": "Obturator foramen"
        }
      }
    ],
    "primaryNames": [
      "Iliac crest",
      "Ilium",
      "Acetabulum",
      "Ischial tuberosity",
      "Obturator foramen"
    ]
  },
  "humerus": {
    "mesh": "Humerusl",
    "vertices": 495,
    "points": [
      {
        "name": "Head",
        "vertex": 406,
        "expected": [
          0.132572,
          0.915524,
          -0.104373
        ],
        "sourceRef": {
          "ref": "hss.ul.2026",
          "location": "p7: \"Head of humerus\""
        },
        "alternates": [
          {
            "vertex": 354,
            "expected": [
              0.148686,
              0.888302,
              0.157598
            ]
          }
        ]
      },
      {
        "name": "Surgical neck",
        "vertex": 317,
        "expected": [
          0.057863,
          0.682089,
          -0.057253
        ],
        "sourceRef": {
          "ref": "hss.ul.2026",
          "location": "p6: labelled anatomy diagram",
          "diagramLabel": "Surgical neck"
        },
        "alternates": [
          {
            "vertex": 319,
            "expected": [
              0.111942,
              0.691488,
              0.08301
            ]
          }
        ]
      },
      {
        "name": "Shaft",
        "vertex": 259,
        "expected": [
          -0.03357,
          0.074831,
          -0.109378
        ],
        "sourceRef": {
          "ref": "hss.ul.2026",
          "location": "p6: \"Shaft\""
        },
        "alternates": [
          {
            "vertex": 191,
            "expected": [
              -0.057985,
              0.119144,
              0.04358
            ]
          }
        ]
      },
      {
        "name": "Medial epicondyle",
        "vertex": 221,
        "expected": [
          0.039918,
          -0.872921,
          -0.011475
        ],
        "sourceRef": {
          "ref": "hss.ul.2026",
          "location": "p6: \"M & l epicondyles\""
        }
      },
      {
        "name": "Lateral epicondyle",
        "vertex": 12,
        "expected": [
          -0.328532,
          -0.840815,
          -0.102786
        ],
        "sourceRef": {
          "ref": "hss.ul.2026",
          "location": "p6: \"M & l epicondyles\""
        },
        "alternates": [
          {
            "vertex": 16,
            "expected": [
              -0.314737,
              -0.859127,
              -0.012085
            ]
          }
        ]
      },
      {
        "name": "Anatomical neck",
        "vertex": 351,
        "expected": [
          0.107913,
          0.872555,
          0.106815
        ],
        "sourceRef": {
          "ref": "hss.ul.2026",
          "location": "p6: labelled anatomy diagram",
          "diagramLabel": "Anatomical neck"
        }
      },
      {
        "name": "Greater tubercle",
        "vertex": 307,
        "expected": [
          0.019898,
          0.922971,
          -0.028565
        ],
        "sourceRef": {
          "ref": "hss.ul.2026",
          "location": "p6: labelled anatomy diagram",
          "diagramLabel": "Greater tubercle"
        }
      },
      {
        "name": "Lesser tubercle",
        "vertex": 343,
        "expected": [
          0.114627,
          0.839351,
          0.109134
        ],
        "sourceRef": {
          "ref": "hss.ul.2026",
          "location": "p6: labelled anatomy diagram",
          "diagramLabel": "Lesser tubercle"
        }
      },
      {
        "name": "Deltoid tuberosity",
        "vertex": 191,
        "expected": [
          -0.057985,
          0.119144,
          0.04358
        ],
        "sourceRef": {
          "ref": "hss.ul.2026",
          "location": "p6: labelled anatomy diagram",
          "diagramLabel": "Deltoid tuberosity"
        }
      },
      {
        "name": "Olecranon fossa",
        "vertex": 43,
        "expected": [
          -0.238533,
          -0.804438,
          -0.060915
        ],
        "sourceRef": {
          "ref": "hss.ul.2026",
          "location": "p6: labelled anatomy diagram",
          "diagramLabel": "Olecranon fossa"
        }
      },
      {
        "name": "Capitulum",
        "vertex": 11,
        "expected": [
          -0.272744,
          -0.895749,
          0.002319
        ],
        "sourceRef": {
          "ref": "hss.ul.2026",
          "location": "p6: labelled anatomy diagram",
          "diagramLabel": "Capitulum"
        }
      },
      {
        "name": "Trochlea",
        "vertex": 58,
        "expected": [
          -0.180914,
          -0.927244,
          0.004761
        ],
        "sourceRef": {
          "ref": "hss.ul.2026",
          "location": "p6: labelled anatomy diagram",
          "diagramLabel": "Trochlea"
        }
      }
    ],
    "primaryNames": [
      "Head",
      "Surgical neck",
      "Greater tubercle",
      "Deltoid tuberosity",
      "Olecranon fossa"
    ]
  },
  "scapula": {
    "mesh": "Scapulal",
    "vertices": 946,
    "points": [
      {
        "name": "Acromion",
        "vertex": 895,
        "expected": [
          -0.623737,
          0.828242,
          0.067141
        ],
        "sourceRef": {
          "ref": "hss.ul.2026",
          "location": "p4: labelled anatomy diagram",
          "diagramLabel": "Acromion"
        }
      },
      {
        "name": "Coracoid process",
        "vertex": 644,
        "expected": [
          -0.261879,
          0.795525,
          0.582965
        ],
        "sourceRef": {
          "ref": "hss.ul.2026",
          "location": "p4: labelled anatomy diagram",
          "diagramLabel": "Coracoid process"
        }
      },
      {
        "name": "Glenoid cavity",
        "vertex": 942,
        "expected": [
          -0.466598,
          0.335613,
          0.20191
        ],
        "sourceRef": {
          "ref": "hss.ul.2026",
          "location": "p4: labelled anatomy diagram",
          "diagramLabel": "Glenoid cavity"
        }
      },
      {
        "name": "Subscapular fossa",
        "vertex": 226,
        "expected": [
          0.169317,
          0.088259,
          -0.304971
        ],
        "sourceRef": {
          "ref": "hss.ul.2026",
          "location": "p4: labelled anatomy diagram",
          "diagramLabel": "Subscapular fossa"
        }
      },
      {
        "name": "Supraspinous fossa",
        "vertex": 178,
        "expected": [
          0.091067,
          0.666707,
          -0.416181
        ],
        "sourceRef": {
          "ref": "hss.ul.2026",
          "location": "p19: \"Supraspinous fossa\""
        }
      },
      {
        "name": "Infraspinous fossa",
        "vertex": 245,
        "expected": [
          0.222907,
          -0.120975,
          -0.436445
        ],
        "sourceRef": {
          "ref": "hss.ul.2026",
          "location": "p19: \"Infraspinous fossa\""
        }
      }
    ],
    "primaryNames": [
      "Acromion",
      "Coracoid process",
      "Glenoid cavity",
      "Subscapular fossa",
      "Supraspinous fossa"
    ]
  },
  "tibia": {
    "mesh": "Tibial",
    "vertices": 316,
    "points": [
      {
        "name": "Medial condyle",
        "vertex": 115,
        "expected": [
          0.081301,
          0.973876,
          -0.016968
        ],
        "sourceRef": {
          "ref": "hss.ll.2026",
          "location": "p9: \"Medial tibial condyle\""
        }
      },
      {
        "name": "Lateral condyle",
        "vertex": 299,
        "expected": [
          -0.17188,
          0.990722,
          0.028565
        ],
        "sourceRef": {
          "ref": "hss.ll.2026",
          "location": "p9: \"Lateral tibial condyle\""
        }
      },
      {
        "name": "Medial malleolus",
        "vertex": 22,
        "expected": [
          0.142705,
          -0.979492,
          0.004395
        ],
        "sourceRef": {
          "ref": "hss.ll.2026",
          "location": "p10: \"Medial malleolus\""
        }
      }
    ],
    "primaryNames": [
      "Medial condyle",
      "Lateral condyle",
      "Medial malleolus"
    ]
  },
  "fibula": {
    "mesh": "Fibulal",
    "vertices": 176,
    "points": [
      {
        "name": "Lateral malleolus",
        "vertex": 75,
        "expected": [
          0.018189,
          -0.973388,
          0.003174
        ],
        "sourceRef": {
          "ref": "hss.ll.2026",
          "location": "p10: \"Lateral malleolus\""
        }
      }
    ],
    "primaryNames": [
      "Lateral malleolus"
    ]
  },
  "radius": {
    "mesh": "Radiusl",
    "vertices": 171,
    "points": [
      {
        "name": "Head",
        "vertex": 159,
        "expected": [
          0.210089,
          0.9729,
          -0.119022
        ],
        "sourceRef": {
          "ref": "hss.ul.2026",
          "location": "p8: labelled anatomy diagram",
          "diagramLabel": "Head of radius"
        }
      },
      {
        "name": "Neck",
        "vertex": 150,
        "expected": [
          0.194464,
          0.876949,
          -0.127812
        ],
        "sourceRef": {
          "ref": "hss.ul.2026",
          "location": "p8: labelled anatomy diagram",
          "diagramLabel": "Neck of radius"
        },
        "alternates": [
          {
            "vertex": 106,
            "expected": [
              0.182379,
              0.856685,
              -0.237678
            ]
          }
        ]
      }
    ],
    "primaryNames": [
      "Head",
      "Neck"
    ]
  },
  "ulna": {
    "mesh": "Ulnal",
    "vertices": 186,
    "points": [
      {
        "name": "Trochlear notch",
        "vertex": 145,
        "expected": [
          0.079226,
          0.820552,
          -0.120853
        ],
        "sourceRef": {
          "ref": "hss.ul.2026",
          "location": "p8: labelled anatomy diagram",
          "diagramLabel": "Trochlear notch"
        }
      },
      {
        "name": "Olecranon",
        "vertex": 100,
        "expected": [
          0.113285,
          0.983154,
          -0.178106
        ],
        "sourceRef": {
          "ref": "hss.ul.2026",
          "location": "p8: labelled anatomy diagram",
          "diagramLabel": "Olecranon"
        }
      }
    ],
    "primaryNames": [
      "Trochlear notch",
      "Olecranon"
    ]
  },
  "occipital bone": {
    "mesh": "Occipital_bone",
    "vertices": 1596,
    "points": [
      {
        "name": "Foramen magnum",
        "vertex": 692,
        "expected": [
          0.000122,
          -0.706869,
          0.684652
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p19: \"Foramen magnum\""
        }
      },
      {
        "name": "Occipital condyle",
        "vertex": 1279,
        "expected": [
          0.357219,
          -0.830684,
          0.562212
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p19: labelled anatomy diagram",
          "diagramLabel": "Occipital condyle"
        }
      },
      {
        "name": "Lambdoid suture",
        "vertex": 1122,
        "expected": [
          0.541215,
          0.479538,
          -0.812006
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p6: labelled anatomy diagram",
          "diagramLabel": "Lambdoid suture"
        }
      },
      {
        "name": "Lambda",
        "vertex": 781,
        "expected": [
          0.024415,
          0.843502,
          -0.835933
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p6: labelled anatomy diagram",
          "diagramLabel": "Lambda"
        }
      }
    ],
    "primaryNames": [
      "Foramen magnum",
      "Occipital condyle",
      "Lambdoid suture",
      "Lambda"
    ]
  },
  "clavicle": {
    "mesh": "Claviclel",
    "vertices": 337,
    "points": [
      {
        "name": "Sternal end",
        "vertex": 321,
        "expected": [
          0.916868,
          0.042115,
          0.618976
        ],
        "sourceRef": {
          "ref": "hss.ul.2026",
          "location": "p4: labelled anatomy diagram",
          "diagramLabel": "Sternal end"
        }
      },
      {
        "name": "Acromial end",
        "vertex": 27,
        "expected": [
          -0.876095,
          0.044069,
          -0.607135
        ],
        "sourceRef": {
          "ref": "hss.ul.2026",
          "location": "p4: labelled anatomy diagram",
          "diagramLabel": "Acromial end"
        }
      }
    ],
    "primaryNames": [
      "Sternal end",
      "Acromial end"
    ]
  },
  "manubrium of sternum": {
    "mesh": "Manubrium_of_sternum",
    "vertices": 598,
    "points": [
      {
        "name": "Jugular notch",
        "vertex": 310,
        "expected": [
          0.053957,
          0.691365,
          -0.654988
        ],
        "sourceRef": {
          "ref": "hss.ul.2026",
          "location": "p4: labelled anatomy diagram",
          "diagramLabel": "Jugular notch"
        }
      },
      {
        "name": "Clavicular notch",
        "vertex": 533,
        "expected": [
          0.791131,
          0.551224,
          -0.51558
        ],
        "sourceRef": {
          "ref": "hss.ul.2026",
          "location": "p4: labelled anatomy diagram",
          "diagramLabel": "Clavicular notch"
        }
      },
      {
        "name": "Manubriosternal joint",
        "vertex": 246,
        "expected": [
          -0.045167,
          -0.805537,
          0.764397
        ],
        "sourceRef": {
          "ref": "hss.ul.2026",
          "location": "p4: labelled anatomy diagram",
          "diagramLabel": "Manubriosternal joint"
        }
      }
    ],
    "primaryNames": [
      "Jugular notch",
      "Clavicular notch",
      "Manubriosternal joint"
    ]
  },
  "body of sternum": {
    "mesh": "Body_of_sternum",
    "vertices": 891,
    "points": [
      {
        "name": "Costal notches",
        "vertex": 549,
        "expected": [
          0.324381,
          0.169927,
          0.03882
        ],
        "sourceRef": {
          "ref": "hss.ul.2026",
          "location": "p4: labelled anatomy diagram",
          "diagramLabel": "Costal notches"
        }
      },
      {
        "name": "Xiphisternal joint",
        "vertex": 448,
        "expected": [
          0,
          -0.961547,
          0.313028
        ],
        "sourceRef": {
          "ref": "hss.ul.2026",
          "location": "p4: labelled anatomy diagram",
          "diagramLabel": "Xiphisternal joint"
        }
      }
    ],
    "primaryNames": [
      "Costal notches",
      "Xiphisternal joint"
    ]
  },
  "xiphoid process": {
    "mesh": "Xiphoid_process",
    "vertices": 204,
    "points": [
      {
        "name": "Xiphisternal joint",
        "vertex": 85,
        "expected": [
          0,
          0.854978,
          0.497116
        ],
        "sourceRef": {
          "ref": "hss.ul.2026",
          "location": "p4: labelled anatomy diagram",
          "diagramLabel": "Xiphisternal joint"
        }
      }
    ],
    "primaryNames": [
      "Xiphisternal joint"
    ]
  },
  "frontal bone": {
    "mesh": "Frontal_bone",
    "vertices": 1656,
    "points": [
      {
        "name": "Supraorbital notch",
        "vertex": 1197,
        "expected": [
          0.461348,
          -0.366497,
          0.493576
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p8: labelled anatomy diagram",
          "diagramLabel": "Supraorbital notch"
        }
      },
      {
        "name": "Coronal suture",
        "vertex": 1560,
        "expected": [
          0.760735,
          0.500077,
          -0.38554
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p6: labelled anatomy diagram",
          "diagramLabel": "Coronal suture"
        }
      },
      {
        "name": "Bregma",
        "vertex": 707,
        "expected": [
          -0.004273,
          0.871821,
          -0.479537
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p6: labelled anatomy diagram",
          "diagramLabel": "Bregma"
        }
      },
      {
        "name": "Frontal sinus",
        "part": "sinus of frontal bone",
        "inside": true,
        "sourceRef": {
          "ref": "hss.msk.2026",
          "location": "p11: \"Frontal sinus\""
        }
      }
    ],
    "primaryNames": [
      "Supraorbital notch",
      "Coronal suture",
      "Bregma",
      "Frontal sinus"
    ]
  },
  "parietal bone": {
    "mesh": "Parietal_bonel",
    "vertices": 1320,
    "points": [
      {
        "name": "Coronal suture",
        "vertex": 721,
        "expected": [
          0.123661,
          0.412396,
          0.773797
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p6: labelled anatomy diagram",
          "diagramLabel": "Coronal suture"
        }
      },
      {
        "name": "Sagittal suture",
        "vertex": 154,
        "expected": [
          -0.473556,
          0.72921,
          -0.008423
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p6: labelled anatomy diagram",
          "diagramLabel": "Sagittal suture"
        }
      },
      {
        "name": "Lambdoid suture",
        "vertex": 786,
        "expected": [
          -0.025147,
          -0.180181,
          -0.968505
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p6: labelled anatomy diagram",
          "diagramLabel": "Lambdoid suture"
        }
      },
      {
        "name": "Squamous suture",
        "vertex": 1297,
        "expected": [
          0.525834,
          -0.432295,
          0.241585
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p6: labelled anatomy diagram",
          "diagramLabel": "Squamous suture"
        }
      },
      {
        "name": "Bregma",
        "vertex": 43,
        "expected": [
          -0.453902,
          0.666219,
          0.72103
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p6: labelled anatomy diagram",
          "diagramLabel": "Bregma"
        }
      },
      {
        "name": "Lambda",
        "vertex": 369,
        "expected": [
          -0.443525,
          0.086183,
          -0.927122
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p6: labelled anatomy diagram",
          "diagramLabel": "Lambda"
        }
      },
      {
        "name": "Pterion",
        "vertex": 983,
        "expected": [
          0.246712,
          -0.390301,
          0.853389
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p6: labelled anatomy diagram",
          "diagramLabel": "Pterion"
        }
      },
      {
        "name": "Asterion",
        "vertex": 1104,
        "expected": [
          0.315714,
          -0.772453,
          -0.346233
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p6: labelled anatomy diagram",
          "diagramLabel": "Asterion"
        }
      },
      {
        "name": "Parietomastoid suture",
        "vertex": 1171,
        "expected": [
          0.379681,
          -0.764031,
          -0.214728
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p6: labelled anatomy diagram",
          "diagramLabel": "Parietomastoid suture"
        }
      }
    ],
    "variants": [
      {
        "mesh": "Parietal_boner",
        "vertices": 1347,
        "points": [
          {
            "name": "Coronal suture",
            "vertex": 525,
            "expected": [
              -0.130985,
              0.412031,
              0.799799
            ],
            "sourceRef": {
              "ref": "hss.hnt.2026",
              "location": "p6: labelled anatomy diagram",
              "diagramLabel": "Coronal suture"
            }
          },
          {
            "name": "Sagittal suture",
            "vertex": 1198,
            "expected": [
              0.489181,
              0.751701,
              0.023316
            ],
            "sourceRef": {
              "ref": "hss.hnt.2026",
              "location": "p6: labelled anatomy diagram",
              "diagramLabel": "Sagittal suture"
            }
          },
          {
            "name": "Lambdoid suture",
            "vertex": 673,
            "expected": [
              0.048708,
              -0.185431,
              -0.975585
            ],
            "sourceRef": {
              "ref": "hss.hnt.2026",
              "location": "p6: labelled anatomy diagram",
              "diagramLabel": "Lambdoid suture"
            }
          },
          {
            "name": "Squamous suture",
            "vertex": 19,
            "expected": [
              -0.541581,
              -0.425214,
              0.261269
            ],
            "sourceRef": {
              "ref": "hss.hnt.2026",
              "location": "p6: labelled anatomy diagram",
              "diagramLabel": "Squamous suture"
            }
          },
          {
            "name": "Bregma",
            "vertex": 1147,
            "expected": [
              0.483322,
              0.67745,
              0.768303
            ],
            "sourceRef": {
              "ref": "hss.hnt.2026",
              "location": "p6: labelled anatomy diagram",
              "diagramLabel": "Bregma"
            }
          },
          {
            "name": "Lambda",
            "vertex": 1016,
            "expected": [
              0.470748,
              0.086428,
              -0.93054
            ],
            "sourceRef": {
              "ref": "hss.hnt.2026",
              "location": "p6: labelled anatomy diagram",
              "diagramLabel": "Lambda"
            }
          },
          {
            "name": "Pterion",
            "vertex": 372,
            "expected": [
              -0.262978,
              -0.396282,
              0.8905
            ],
            "sourceRef": {
              "ref": "hss.hnt.2026",
              "location": "p6: labelled anatomy diagram",
              "diagramLabel": "Pterion"
            }
          },
          {
            "name": "Asterion",
            "vertex": 322,
            "expected": [
              -0.331584,
              -0.808465,
              -0.336467
            ],
            "sourceRef": {
              "ref": "hss.hnt.2026",
              "location": "p6: labelled anatomy diagram",
              "diagramLabel": "Asterion"
            }
          },
          {
            "name": "Parietomastoid suture",
            "vertex": 223,
            "expected": [
              -0.380169,
              -0.784173,
              -0.19422
            ],
            "sourceRef": {
              "ref": "hss.hnt.2026",
              "location": "p6: labelled anatomy diagram",
              "diagramLabel": "Parietomastoid suture"
            }
          }
        ]
      }
    ],
    "primaryNames": [
      "Coronal suture",
      "Sagittal suture",
      "Lambdoid suture",
      "Squamous suture",
      "Bregma"
    ]
  },
  "temporal bone": {
    "mesh": "Temporal_bonel",
    "vertices": 2371,
    "points": [
      {
        "name": "Mastoid process",
        "vertex": 492,
        "expected": [
          -0.110477,
          -0.49321,
          -0.576739
        ],
        "sourceRef": {
          "ref": "hss.msk.2026",
          "location": "p10: \"Mastoid process of the temporal bones\""
        }
      },
      {
        "name": "Styloid process",
        "vertex": 625,
        "expected": [
          0.039796,
          -0.74923,
          0.074709
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p4: labelled anatomy diagram",
          "diagramLabel": "Styloid process"
        }
      },
      {
        "name": "Internal acoustic meatus",
        "vertex": 1079,
        "expected": [
          0.350749,
          -0.226204,
          -0.218879
        ],
        "sourceRef": {
          "ref": "hss.msk.2026",
          "location": "p11: \"Internal acoustic meatus\""
        }
      },
      {
        "name": "Mandibular fossa",
        "vertex": 341,
        "expected": [
          -0.199713,
          -0.351726,
          0.082156
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p11: \"Mandibular fossa\""
        }
      },
      {
        "name": "Squamous suture",
        "vertex": 783,
        "expected": [
          -0.575884,
          0.628986,
          -0.068606
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p6: labelled anatomy diagram",
          "diagramLabel": "Squamous suture"
        }
      },
      {
        "name": "Occipitotemporal suture",
        "vertex": 330,
        "expected": [
          -0.24781,
          0.070924,
          -0.983276
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p6: labelled anatomy diagram",
          "diagramLabel": "Occipitotemporal suture"
        }
      }
    ],
    "primaryNames": [
      "Mastoid process",
      "Styloid process",
      "Internal acoustic meatus",
      "Mandibular fossa",
      "Squamous suture"
    ]
  },
  "sphenoid bone": {
    "mesh": "Sphenoid_bone",
    "vertices": 1573,
    "points": [
      {
        "name": "Optic canal",
        "vertex": 404,
        "expected": [
          0.204108,
          0.370037,
          -0.000488
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p8: labelled anatomy diagram",
          "diagramLabel": "Optic canal"
        }
      },
      {
        "name": "Superior orbital fissure",
        "vertex": 377,
        "expected": [
          0.531449,
          0.273964,
          0.173467
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p8: labelled anatomy diagram",
          "diagramLabel": "Superior orbital fissure"
        }
      },
      {
        "name": "Sphenoidal sinus",
        "part": "sinus of sphenoid bone",
        "inside": true,
        "sourceRef": {
          "ref": "hss.msk.2026",
          "location": "p11: \"Sphenoidal sinus\""
        }
      }
    ],
    "primaryNames": [
      "Optic canal",
      "Superior orbital fissure",
      "Sphenoidal sinus"
    ]
  },
  "maxilla": {
    "mesh": "Maxillal",
    "vertices": 1070,
    "points": [
      {
        "name": "Infraorbital foramen",
        "vertex": 70,
        "expected": [
          -0.211554,
          -0.046266,
          0.130985
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p8: labelled anatomy diagram",
          "diagramLabel": "Infraorbital foramen"
        }
      }
    ],
    "primaryNames": [
      "Infraorbital foramen"
    ]
  },
  "mandible": {
    "mesh": "Mandible",
    "vertices": 1942,
    "points": [
      {
        "name": "Ramus",
        "vertex": 675,
        "expected": [
          0.80163,
          -0.006225,
          -0.557329
        ],
        "sourceRef": {
          "ref": "hss.msk.2026",
          "location": "p10: \"Ramus of the mandible\""
        }
      },
      {
        "name": "Mandibular condyle",
        "vertex": 578,
        "expected": [
          0.905026,
          0.723959,
          -0.611896
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p11: \"Condyle of mandible\""
        }
      }
    ],
    "primaryNames": [
      "Ramus",
      "Mandibular condyle"
    ]
  },
  "axis (c2)": {
    "mesh": "Axis_(C2)",
    "vertices": 524,
    "points": [
      {
        "name": "Odontoid process",
        "vertex": 241,
        "expected": [
          0,
          0.795892,
          0.702597
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p19: labelled anatomy diagram",
          "diagramLabel": "Odontoid process"
        }
      }
    ],
    "primaryNames": [
      "Odontoid process"
    ]
  }
};

export function boneLandmarkKey(name, side) {
  let value=String(name||'').replace(/_/g,' ').toLowerCase().trim();
  value=value.replace(/ \d+$/,''); // three.js disambiguates Frontal_bone_1
  if(side&&!BONE_LANDMARKS[value]) value=value.replace(/[lr]$/,'').trim();
  return value;
}
export function surfaceLandmarks(key, count, positionAt) {
  const spec=BONE_LANDMARKS[key];
  if(!spec)return [];
  for(const candidate of [spec,...(spec.variants||[])]) {
    if(candidate.vertices!==count)continue;
    const points=candidate.points.filter(p=>Number.isInteger(p.vertex));
    if(points.every(p=>[p,...(p.alternates||[])].every(a=>a.vertex<count&&a.expected.every((x,i)=>Math.abs(x-positionAt(a.vertex)[i])<0.0001))))return points;
  }
  return [];
}
