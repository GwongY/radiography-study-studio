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
  },
  "vertebra c3": {
    "mesh": "Vertebra_C3",
    "vertices": 548,
    "points": [
      {
        "name": "Vertebral body",
        "vertex": 251,
        "expected": [
          -0.000244,
          0.267616,
          0.954955
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p20: labelled anatomy diagram",
          "diagramLabel": "Vertebral body"
        }
      },
      {
        "name": "Vertebral foramen",
        "vertex": 216,
        "expected": [
          -0.147832,
          -0.153813,
          -0.130375
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p20: labelled anatomy diagram",
          "diagramLabel": "Vertebral foramen"
        }
      },
      {
        "name": "Pedicle",
        "vertex": 474,
        "expected": [
          0.398602,
          0.180793,
          0.000854
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p20: labelled anatomy diagram",
          "diagramLabel": "Pedicle"
        }
      },
      {
        "name": "Transverse process",
        "vertex": 317,
        "expected": [
          1,
          -0.065555,
          0.232673
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p20: labelled anatomy diagram",
          "diagramLabel": "Transverse process"
        }
      },
      {
        "name": "Spinous process",
        "vertex": 266,
        "expected": [
          -0.010376,
          -0.44548,
          -0.954955
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p20: labelled anatomy diagram",
          "diagramLabel": "Spinous process"
        }
      },
      {
        "name": "Lamina",
        "vertex": 536,
        "expected": [
          0.095584,
          -0.196418,
          -0.585772
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p20: labelled anatomy diagram",
          "diagramLabel": "Lamina"
        }
      },
      {
        "name": "Superior articular process",
        "vertex": 440,
        "expected": [
          0.50032,
          0.282022,
          0.132206
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p20: labelled anatomy diagram",
          "diagramLabel": "Superior articular process"
        }
      }
    ],
    "primaryNames": [
      "Vertebral body",
      "Vertebral foramen",
      "Pedicle",
      "Transverse process",
      "Spinous process"
    ]
  },
  "vertebra c4": {
    "mesh": "Vertebra_C4",
    "vertices": 437,
    "points": [
      {
        "name": "Vertebral body",
        "vertex": 217,
        "expected": [
          0,
          -0.077761,
          0.891354
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p20: labelled anatomy diagram",
          "diagramLabel": "Vertebral body"
        }
      },
      {
        "name": "Vertebral foramen",
        "vertex": 164,
        "expected": [
          -0.207526,
          0.150884,
          -0.083743
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p20: labelled anatomy diagram",
          "diagramLabel": "Vertebral foramen"
        }
      },
      {
        "name": "Pedicle",
        "vertex": 352,
        "expected": [
          0.431562,
          0.064333,
          -0.027711
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p20: labelled anatomy diagram",
          "diagramLabel": "Pedicle"
        }
      },
      {
        "name": "Transverse process",
        "vertex": 237,
        "expected": [
          1,
          -0.075442,
          0.49675
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p20: labelled anatomy diagram",
          "diagramLabel": "Transverse process"
        }
      },
      {
        "name": "Spinous process",
        "vertex": 230,
        "expected": [
          0,
          -0.367596,
          -0.900143
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p20: labelled anatomy diagram",
          "diagramLabel": "Spinous process"
        }
      },
      {
        "name": "Lamina",
        "vertex": 423,
        "expected": [
          0.098392,
          -0.100713,
          -0.456587
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p20: labelled anatomy diagram",
          "diagramLabel": "Lamina"
        }
      },
      {
        "name": "Superior articular process",
        "vertex": 326,
        "expected": [
          0.520829,
          0.329998,
          0.229377
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p20: labelled anatomy diagram",
          "diagramLabel": "Superior articular process"
        }
      }
    ],
    "primaryNames": [
      "Vertebral body",
      "Vertebral foramen",
      "Pedicle",
      "Transverse process",
      "Spinous process"
    ]
  },
  "vertebra c5": {
    "mesh": "Vertebra_C5",
    "vertices": 526,
    "points": [
      {
        "name": "Vertebral body",
        "vertex": 217,
        "expected": [
          0,
          0.010865,
          0.923826
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p20: labelled anatomy diagram",
          "diagramLabel": "Vertebral body"
        }
      },
      {
        "name": "Vertebral foramen",
        "vertex": 251,
        "expected": [
          -0.0271,
          0.033327,
          -0.428022
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p20: labelled anatomy diagram",
          "diagramLabel": "Vertebral foramen"
        }
      },
      {
        "name": "Pedicle",
        "vertex": 435,
        "expected": [
          0.426069,
          0.037353,
          0.059328
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p20: labelled anatomy diagram",
          "diagramLabel": "Pedicle"
        }
      },
      {
        "name": "Transverse process",
        "vertex": 281,
        "expected": [
          1,
          -0.088868,
          0.493576
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p20: labelled anatomy diagram",
          "diagramLabel": "Transverse process"
        }
      },
      {
        "name": "Spinous process",
        "vertex": 257,
        "expected": [
          0.007691,
          -0.316936,
          -0.923093
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p20: labelled anatomy diagram",
          "diagramLabel": "Spinous process"
        }
      },
      {
        "name": "Lamina",
        "vertex": 502,
        "expected": [
          0.113163,
          -0.103153,
          -0.528031
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p20: labelled anatomy diagram",
          "diagramLabel": "Lamina"
        }
      },
      {
        "name": "Superior articular process",
        "vertex": 391,
        "expected": [
          0.608844,
          0.175299,
          0.014771
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p20: labelled anatomy diagram",
          "diagramLabel": "Superior articular process"
        }
      }
    ],
    "primaryNames": [
      "Vertebral body",
      "Vertebral foramen",
      "Pedicle",
      "Transverse process",
      "Spinous process"
    ]
  },
  "vertebra c6": {
    "mesh": "Vertebra_C6",
    "vertices": 514,
    "points": [
      {
        "name": "Vertebral body",
        "vertex": 271,
        "expected": [
          0,
          -0.050537,
          0.993042
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p20: labelled anatomy diagram",
          "diagramLabel": "Vertebral body"
        }
      },
      {
        "name": "Vertebral foramen",
        "vertex": 250,
        "expected": [
          0,
          -0.0083,
          -0.58272
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p20: labelled anatomy diagram",
          "diagramLabel": "Vertebral foramen"
        }
      },
      {
        "name": "Pedicle",
        "vertex": 458,
        "expected": [
          0.407147,
          -0.146855,
          0.01648
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p20: labelled anatomy diagram",
          "diagramLabel": "Pedicle"
        }
      },
      {
        "name": "Transverse process",
        "vertex": 277,
        "expected": [
          0.960692,
          -0.086674,
          0.560015
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p20: labelled anatomy diagram",
          "diagramLabel": "Transverse process"
        }
      },
      {
        "name": "Spinous process",
        "vertex": 256,
        "expected": [
          0,
          -0.262247,
          -1
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p20: labelled anatomy diagram",
          "diagramLabel": "Spinous process"
        }
      },
      {
        "name": "Lamina",
        "vertex": 499,
        "expected": [
          0.090335,
          -0.098514,
          -0.639119
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p20: labelled anatomy diagram",
          "diagramLabel": "Lamina"
        }
      },
      {
        "name": "Superior articular process",
        "vertex": 430,
        "expected": [
          0.485031,
          0.290566,
          0.380047
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p20: labelled anatomy diagram",
          "diagramLabel": "Superior articular process"
        }
      }
    ],
    "primaryNames": [
      "Vertebral body",
      "Vertebral foramen",
      "Pedicle",
      "Transverse process",
      "Spinous process"
    ]
  },
  "vertebra t1": {
    "mesh": "Vertebra_T1",
    "vertices": 437,
    "points": [
      {
        "name": "Transverse process",
        "vertex": 426,
        "expected": [
          1,
          0.247322,
          0.28312
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Transverse process"
        }
      },
      {
        "name": "Superior articular facet",
        "vertex": 382,
        "expected": [
          0.516068,
          0.396404,
          0.416547
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Superior articular facet"
        }
      },
      {
        "name": "Superior costal facet",
        "vertex": 317,
        "expected": [
          0.379559,
          0.33024,
          0.344523
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Superior costal facet"
        }
      },
      {
        "name": "Inferior costal facet",
        "vertex": 346,
        "expected": [
          0.388348,
          -0.274821,
          0.40141
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Inferior costal facet"
        }
      }
    ],
    "primaryNames": [
      "Transverse process",
      "Superior articular facet",
      "Superior costal facet",
      "Inferior costal facet"
    ]
  },
  "vertebra t2": {
    "mesh": "Vertebra_T2",
    "vertices": 483,
    "points": [
      {
        "name": "Transverse process",
        "vertex": 273,
        "expected": [
          1,
          0.379925,
          0.058107
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Transverse process"
        }
      },
      {
        "name": "Superior articular facet",
        "vertex": 311,
        "expected": [
          0.717124,
          0.413617,
          0.050417
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Superior articular facet"
        }
      },
      {
        "name": "Superior costal facet",
        "vertex": 415,
        "expected": [
          0.332316,
          0.387858,
          0.28959
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Superior costal facet"
        }
      },
      {
        "name": "Inferior costal facet",
        "vertex": 379,
        "expected": [
          0.385174,
          -0.303142,
          0.306925
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Inferior costal facet"
        }
      }
    ],
    "primaryNames": [
      "Transverse process",
      "Superior articular facet",
      "Superior costal facet",
      "Inferior costal facet"
    ]
  },
  "vertebra t3": {
    "mesh": "Vertebra_T3",
    "vertices": 526,
    "points": [
      {
        "name": "Transverse process",
        "vertex": 281,
        "expected": [
          0.884518,
          0.314371,
          -0.085696
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Transverse process"
        }
      },
      {
        "name": "Superior articular facet",
        "vertex": 313,
        "expected": [
          0.586505,
          0.389203,
          -0.003418
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Superior articular facet"
        }
      },
      {
        "name": "Superior costal facet",
        "vertex": 400,
        "expected": [
          0.292764,
          0.530108,
          0.325114
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Superior costal facet"
        }
      },
      {
        "name": "Inferior costal facet",
        "vertex": 408,
        "expected": [
          0.321696,
          -0.282752,
          0.25956
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Inferior costal facet"
        }
      }
    ],
    "primaryNames": [
      "Transverse process",
      "Superior articular facet",
      "Superior costal facet",
      "Inferior costal facet"
    ]
  },
  "vertebra t4": {
    "mesh": "Vertebra_T4",
    "vertices": 503,
    "points": [
      {
        "name": "Transverse process",
        "vertex": 286,
        "expected": [
          0.99414,
          0.200691,
          -0.215583
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Transverse process"
        }
      },
      {
        "name": "Superior articular facet",
        "vertex": 312,
        "expected": [
          0.699423,
          0.469648,
          -0.147221
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Superior articular facet"
        }
      },
      {
        "name": "Superior costal facet",
        "vertex": 418,
        "expected": [
          0.350993,
          0.603716,
          0.165044
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Superior costal facet"
        }
      },
      {
        "name": "Inferior costal facet",
        "vertex": 387,
        "expected": [
          0.425214,
          -0.26017,
          0.159307
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Inferior costal facet"
        }
      }
    ],
    "primaryNames": [
      "Transverse process",
      "Superior articular facet",
      "Superior costal facet",
      "Inferior costal facet"
    ]
  },
  "vertebra t5": {
    "mesh": "Vertebra_T5",
    "vertices": 484,
    "points": [
      {
        "name": "Transverse process",
        "vertex": 263,
        "expected": [
          1,
          0.306314,
          -0.382122
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Transverse process"
        }
      },
      {
        "name": "Superior articular facet",
        "vertex": 379,
        "expected": [
          0.443892,
          0.672321,
          0.018189
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Superior articular facet"
        }
      },
      {
        "name": "Superior costal facet",
        "vertex": 398,
        "expected": [
          0.366863,
          0.704551,
          0.004273
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Superior costal facet"
        }
      },
      {
        "name": "Inferior costal facet",
        "vertex": 329,
        "expected": [
          0.380779,
          -0.232918,
          0.102786
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Inferior costal facet"
        }
      }
    ],
    "primaryNames": [
      "Transverse process",
      "Superior articular facet",
      "Superior costal facet",
      "Inferior costal facet"
    ]
  },
  "vertebra t6": {
    "mesh": "Vertebra_T6",
    "vertices": 400,
    "points": [
      {
        "name": "Transverse process",
        "vertex": 372,
        "expected": [
          1,
          0.325236,
          -0.564409
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Transverse process"
        }
      },
      {
        "name": "Superior articular facet",
        "vertex": 286,
        "expected": [
          0.370769,
          0.797603,
          -0.145512
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Superior articular facet"
        }
      },
      {
        "name": "Superior costal facet",
        "vertex": 315,
        "expected": [
          0.360393,
          0.80102,
          -0.117069
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Superior costal facet"
        }
      },
      {
        "name": "Inferior costal facet",
        "vertex": 340,
        "expected": [
          0.420087,
          -0.079349,
          0.29252
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Inferior costal facet"
        }
      }
    ],
    "primaryNames": [
      "Transverse process",
      "Superior articular facet",
      "Superior costal facet",
      "Inferior costal facet"
    ]
  },
  "vertebra t7": {
    "mesh": "Vertebra_T7",
    "vertices": 628,
    "points": [
      {
        "name": "Transverse process",
        "vertex": 337,
        "expected": [
          1,
          0.243781,
          -0.50032
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Transverse process"
        }
      },
      {
        "name": "Superior articular facet",
        "vertex": 494,
        "expected": [
          0.444746,
          0.781733,
          -0.260781
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Superior articular facet"
        }
      },
      {
        "name": "Superior costal facet",
        "vertex": 415,
        "expected": [
          0.384075,
          0.506791,
          0.183844
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Superior costal facet"
        }
      },
      {
        "name": "Inferior costal facet",
        "vertex": 422,
        "expected": [
          0.359539,
          -0.106692,
          0.254677
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Inferior costal facet"
        }
      }
    ],
    "primaryNames": [
      "Transverse process",
      "Superior articular facet",
      "Superior costal facet",
      "Inferior costal facet"
    ]
  },
  "vertebra t8": {
    "mesh": "Vertebra_T8",
    "vertices": 356,
    "points": [
      {
        "name": "Transverse process",
        "vertex": 275,
        "expected": [
          0.954955,
          0.165534,
          -0.515702
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Transverse process"
        }
      },
      {
        "name": "Superior articular facet",
        "vertex": 253,
        "expected": [
          0.418378,
          0.811762,
          -0.356609
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Superior articular facet"
        }
      },
      {
        "name": "Superior costal facet",
        "vertex": 219,
        "expected": [
          0.442427,
          0.577837,
          0.447798
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Superior costal facet"
        }
      },
      {
        "name": "Inferior costal facet",
        "vertex": 240,
        "expected": [
          0.361858,
          -0.053834,
          0.178961
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Inferior costal facet"
        }
      }
    ],
    "primaryNames": [
      "Transverse process",
      "Superior articular facet",
      "Superior costal facet",
      "Inferior costal facet"
    ]
  },
  "vertebra t9": {
    "mesh": "Vertebra_T9",
    "vertices": 673,
    "points": [
      {
        "name": "Transverse process",
        "vertex": 377,
        "expected": [
          0.955687,
          0.159794,
          -0.553423
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Transverse process"
        }
      },
      {
        "name": "Superior articular facet",
        "vertex": 516,
        "expected": [
          0.470016,
          0.719198,
          -0.338176
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Superior articular facet"
        }
      },
      {
        "name": "Superior costal facet",
        "vertex": 441,
        "expected": [
          0.51326,
          0.477216,
          0.215583
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Superior costal facet"
        }
      },
      {
        "name": "Inferior costal facet",
        "vertex": 446,
        "expected": [
          0.438398,
          -0.110965,
          0.250404
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Inferior costal facet"
        }
      }
    ],
    "primaryNames": [
      "Transverse process",
      "Superior articular facet",
      "Superior costal facet",
      "Inferior costal facet"
    ]
  },
  "vertebra t10": {
    "mesh": "Vertebra_T10",
    "vertices": 684,
    "points": [
      {
        "name": "Transverse process",
        "vertex": 362,
        "expected": [
          0.968383,
          0.194221,
          -0.46025
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Transverse process"
        }
      },
      {
        "name": "Superior articular facet",
        "vertex": 512,
        "expected": [
          0.482589,
          0.694784,
          -0.296793
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Superior articular facet"
        }
      },
      {
        "name": "Superior costal facet",
        "vertex": 475,
        "expected": [
          0.468795,
          0.543902,
          0.237434
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Superior costal facet"
        }
      },
      {
        "name": "Inferior costal facet",
        "vertex": 486,
        "expected": [
          0.379803,
          -0.057252,
          0.157109
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Inferior costal facet"
        }
      }
    ],
    "primaryNames": [
      "Transverse process",
      "Superior articular facet",
      "Superior costal facet",
      "Inferior costal facet"
    ]
  },
  "vertebra t11": {
    "mesh": "Vertebra_T11",
    "vertices": 404,
    "points": [
      {
        "name": "Transverse process",
        "vertex": 358,
        "expected": [
          0.735801,
          0.212164,
          -0.454634
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Transverse process"
        }
      },
      {
        "name": "Superior articular facet",
        "vertex": 245,
        "expected": [
          0.377239,
          0.594196,
          -0.300333
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Superior articular facet"
        }
      },
      {
        "name": "Superior costal facet",
        "vertex": 227,
        "expected": [
          0.423139,
          0.50203,
          0.144536
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Superior costal facet"
        }
      },
      {
        "name": "Inferior costal facet",
        "vertex": 391,
        "expected": [
          0.322062,
          -0.082034,
          0.264321
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Inferior costal facet"
        }
      }
    ],
    "primaryNames": [
      "Transverse process",
      "Superior articular facet",
      "Superior costal facet",
      "Inferior costal facet"
    ]
  },
  "vertebra t12": {
    "mesh": "Vertebra_T12",
    "vertices": 584,
    "points": [
      {
        "name": "Transverse process",
        "vertex": 553,
        "expected": [
          0.57796,
          0.105717,
          -0.364422
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Transverse process"
        }
      },
      {
        "name": "Superior articular facet",
        "vertex": 359,
        "expected": [
          0.324259,
          0.581376,
          -0.352458
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Superior articular facet"
        }
      },
      {
        "name": "Superior costal facet",
        "vertex": 308,
        "expected": [
          0,
          0.506302,
          0.237922
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Superior costal facet"
        }
      },
      {
        "name": "Inferior costal facet",
        "vertex": 395,
        "expected": [
          0.217536,
          -0.191046,
          0.136235
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p22: labelled anatomy diagram",
          "diagramLabel": "Inferior costal facet"
        }
      }
    ],
    "primaryNames": [
      "Transverse process",
      "Superior articular facet",
      "Superior costal facet",
      "Inferior costal facet"
    ]
  },
  "vertebra l1": {
    "mesh": "Vertebra_L1",
    "vertices": 715,
    "points": [
      {
        "name": "Vertebral body",
        "vertex": 292,
        "expected": [
          0,
          0.115849,
          1
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p26: labelled anatomy diagram",
          "diagramLabel": "Vertebral body"
        }
      },
      {
        "name": "Vertebral foramen",
        "vertex": 273,
        "expected": [
          -0.101077,
          -0.023438,
          0.535234
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p26: labelled anatomy diagram",
          "diagramLabel": "Vertebral foramen"
        }
      },
      {
        "name": "Lamina",
        "vertex": 694,
        "expected": [
          0.049684,
          -0.042483,
          -0.583453
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p26: labelled anatomy diagram",
          "diagramLabel": "Lamina"
        }
      },
      {
        "name": "Articular facet",
        "vertex": 540,
        "expected": [
          0.339763,
          0.513749,
          -0.361614
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p26: labelled anatomy diagram",
          "diagramLabel": "Articular facet"
        }
      }
    ],
    "primaryNames": [
      "Vertebral body",
      "Vertebral foramen",
      "Lamina",
      "Articular facet"
    ]
  },
  "vertebra l2": {
    "mesh": "Vertebra_L2",
    "vertices": 602,
    "points": [
      {
        "name": "Vertebral body",
        "vertex": 312,
        "expected": [
          0,
          -0.049807,
          0.992553
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p26: labelled anatomy diagram",
          "diagramLabel": "Vertebral body"
        }
      },
      {
        "name": "Vertebral foramen",
        "vertex": 127,
        "expected": [
          0,
          -0.102665,
          0.702231
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p26: labelled anatomy diagram",
          "diagramLabel": "Vertebral foramen"
        }
      },
      {
        "name": "Lamina",
        "vertex": 361,
        "expected": [
          0.131718,
          -0.196905,
          -0.472945
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p26: labelled anatomy diagram",
          "diagramLabel": "Lamina"
        }
      },
      {
        "name": "Articular facet",
        "vertex": 450,
        "expected": [
          0.347087,
          0.560136,
          -0.283731
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p26: labelled anatomy diagram",
          "diagramLabel": "Articular facet"
        }
      }
    ],
    "primaryNames": [
      "Vertebral body",
      "Vertebral foramen",
      "Lamina",
      "Articular facet"
    ]
  },
  "vertebra l3": {
    "mesh": "Vertebra_L3",
    "vertices": 719,
    "points": [
      {
        "name": "Vertebral body",
        "vertex": 374,
        "expected": [
          0,
          -0.155768,
          1
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p26: labelled anatomy diagram",
          "diagramLabel": "Vertebral body"
        }
      },
      {
        "name": "Vertebral foramen",
        "vertex": 373,
        "expected": [
          0,
          -0.221807,
          0.589801
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p26: labelled anatomy diagram",
          "diagramLabel": "Vertebral foramen"
        }
      },
      {
        "name": "Lamina",
        "vertex": 690,
        "expected": [
          0.11829,
          -0.221687,
          -0.589557
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p26: labelled anatomy diagram",
          "diagramLabel": "Lamina"
        }
      },
      {
        "name": "Articular facet",
        "vertex": 503,
        "expected": [
          0.460616,
          0.507156,
          -0.327311
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p26: labelled anatomy diagram",
          "diagramLabel": "Articular facet"
        }
      }
    ],
    "primaryNames": [
      "Vertebral body",
      "Vertebral foramen",
      "Lamina",
      "Articular facet"
    ]
  },
  "vertebra l4": {
    "mesh": "Vertebra_L4",
    "vertices": 858,
    "points": [
      {
        "name": "Vertebral body",
        "vertex": 400,
        "expected": [
          0,
          0.20716,
          0.948851
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p26: labelled anatomy diagram",
          "diagramLabel": "Vertebral body"
        }
      },
      {
        "name": "Vertebral foramen",
        "vertex": 347,
        "expected": [
          -0.137944,
          0.098391,
          -0.23719
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p26: labelled anatomy diagram",
          "diagramLabel": "Vertebral foramen"
        }
      },
      {
        "name": "Lamina",
        "vertex": 807,
        "expected": [
          0.215827,
          -0.170292,
          -0.504715
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p26: labelled anatomy diagram",
          "diagramLabel": "Lamina"
        }
      },
      {
        "name": "Articular facet",
        "vertex": 595,
        "expected": [
          0.508499,
          0.439497,
          -0.295816
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p26: labelled anatomy diagram",
          "diagramLabel": "Articular facet"
        }
      }
    ],
    "primaryNames": [
      "Vertebral body",
      "Vertebral foramen",
      "Lamina",
      "Articular facet"
    ]
  },
  "vertebra l5": {
    "mesh": "Vertebra_L5",
    "vertices": 888,
    "points": [
      {
        "name": "Vertebral body",
        "vertex": 453,
        "expected": [
          0,
          0.054079,
          0.782342
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p26: labelled anatomy diagram",
          "diagramLabel": "Vertebral body"
        }
      },
      {
        "name": "Vertebral foramen",
        "vertex": 399,
        "expected": [
          -0.078616,
          0.109256,
          -0.315714
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p26: labelled anatomy diagram",
          "diagramLabel": "Vertebral foramen"
        }
      },
      {
        "name": "Lamina",
        "vertex": 851,
        "expected": [
          0.152593,
          -0.00647,
          -0.455733
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p26: labelled anatomy diagram",
          "diagramLabel": "Lamina"
        }
      },
      {
        "name": "Articular facet",
        "vertex": 585,
        "expected": [
          0.504715,
          0.456466,
          -0.178106
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p26: labelled anatomy diagram",
          "diagramLabel": "Articular facet"
        }
      }
    ],
    "primaryNames": [
      "Vertebral body",
      "Vertebral foramen",
      "Lamina",
      "Articular facet"
    ]
  },
  "atlas (c1)": {
    "mesh": "Atlas_(C1)",
    "vertices": 488,
    "points": [
      {
        "name": "Superior articular facet",
        "vertex": 391,
        "expected": [
          0.498947,
          0.180182,
          -0.039308
        ],
        "sourceRef": {
          "ref": "hss.hnt.2026",
          "location": "p19: labelled anatomy diagram",
          "diagramLabel": "Superior articular facet"
        }
      }
    ],
    "primaryNames": [
      "Superior articular facet"
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
