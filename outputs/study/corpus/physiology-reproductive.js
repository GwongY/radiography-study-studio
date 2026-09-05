/*
 * ABCT2326 Lecture 6 — Reproductive System.
 *
 * The 2026 course overview keeps Reproductive System in the ten-topic
 * syllabus, but its current lecture has not been supplied. A readable older
 * official ABCT2326 lecture covers the same stated outcomes and is used here.
 */

export const PHYS_REPRODUCTIVE = [
  {
    id: 'abct2326-repro-male-regulation',
    subject: 'ABCT2326', unit: 'phys.repro', type: 'sequence',
    title: 'Spermatogenesis, hormonal control and sperm transport',
    tags: ['reproductive', 'male', 'hormones', 'high-yield'],
    lesson: {
      explanation: 'Each testis contains Leydig cells, spermatogenic cells and Sertoli cells. Leydig cells produce sex hormones, spermatogenic cells form sperm, and Sertoli cells provide mechanical and nutritional support. Spermatogenesis begins with spermatogonia at the outer part of a seminiferous tubule; primary spermatocytes enter meiosis, secondary spermatocytes form spermatids, and spermatids differentiate into spermatozoa that enter the lumen. Hormonal control joins two routes. LH stimulates Leydig cells to secrete testosterone, which supports meiosis and early spermatid maturation. FSH acts through Sertoli cells, stimulating androgen-binding protein so testosterone is concentrated where sperm develop; Sertoli cells also produce inhibin, which inhibits FSH. Sperm travel from seminiferous tubules through rete testis and efferent ductules to the epididymis for maturation and storage, then during ejaculation through ductus deferens, ejaculatory duct and urethra.',
      keyFacts: [
        'Leydig cells: sex hormones; spermatogenic cells: sperm; Sertoli cells: mechanical and nutritional support.',
        'Spermatogonia → primary spermatocytes → secondary spermatocytes → spermatids → spermatozoa.',
        'LH → Leydig cells → testosterone.',
        'FSH → Sertoli cells → androgen-binding protein → concentrated testosterone around developing sperm.',
        'Inhibin feeds back to inhibit FSH.',
        'Seminiferous tubules → rete testis → efferent ductules → epididymis → ductus deferens → ejaculatory duct → urethra.',
        'Epididymis is the site of sperm maturation and storage.',
      ],
      prerequisites: ['abct2326-cell-division', 'abct2326-endocrine-delivery'], examples: [],
    },
    practice: [
      { type: 'matching', prompt: 'Match each testicular cell or hormone to its role.', pairs: [['Leydig cell', 'Produces testosterone after LH stimulation'], ['Sertoli cell', 'Supports developing sperm and makes ABP'], ['Spermatogenic cell', 'Forms sperm'], ['Inhibin', 'Inhibits FSH']], explanation: 'These roles are grouped across the testis and hormonal-control slides.' },
      { type: 'sequence', prompt: 'Order the cell stages of spermatogenesis.', items: ['Spermatogonium', 'Primary spermatocyte', 'Secondary spermatocyte', 'Spermatid', 'Spermatozoon'], explanation: 'The lecture follows these stages from the seminiferous-tubule wall towards the lumen.' },
      { type: 'sequence', prompt: 'Order the route of sperm from its site of production to the urethra.', items: ['Seminiferous tubules', 'Rete testis', 'Efferent ductules', 'Epididymis', 'Ductus deferens', 'Ejaculatory duct', 'Urethra'], explanation: 'The sperm-movement slide gives this route in two connected sequences.' },
    ],
    application: [
      { type: 'scenario', prompt: 'LH secretion falls while FSH remains normal. Use the lecture’s control map to predict the direct problem for spermatogenesis.', model: 'Reduced LH means less stimulation of Leydig cells and therefore less testosterone. Because testosterone is required for meiosis and early spermatid maturation, spermatogenesis is impaired even though FSH can still stimulate Sertoli cells and androgen-binding protein.', rubric: ['Links LH to Leydig cells', 'Predicts reduced testosterone', 'Links testosterone to meiosis or early spermatid maturation'] },
    ],
    sourceRefs: [{ ref: 'phys.6.pdf', location: 'pp4–18 testicular cells, spermatogenesis, Sertoli products, LH/FSH control and sperm route' }],
  },
  {
    id: 'abct2326-repro-ovarian-menstrual-cycle',
    subject: 'ABCT2326', unit: 'phys.repro', type: 'sequence',
    title: 'Ovarian cycle and menstrual regulation',
    tags: ['reproductive', 'ovarian cycle', 'menstrual cycle', 'hormones', 'high-yield'],
    lesson: {
      explanation: 'The ovarian cycle has three phases: follicular phase, ovulation and luteal phase. During the follicular phase, FSH drives follicle development and increases follicular sensitivity to FSH. Rising oestrogen helps induce LH receptors in the Graafian follicle and stimulates more GnRH; the resulting LH surge starts about 24 hours before ovulation and causes the follicle to rupture and release the secondary oocyte. After ovulation, LH converts the ruptured follicle into a corpus luteum, which secretes oestrogen and progesterone. Their high levels inhibit pituitary FSH and LH, preventing another follicle from developing while fertilization remains possible. If fertilization does not occur, the corpus luteum degenerates, oestrogen and progesterone fall, endometrial vessels constrict and the endometrium breaks down. Uterine prostaglandins drive smooth-muscle contraction during menstruation.',
      keyFacts: [
        'Ovarian cycle: follicular phase → ovulation → luteal phase.',
        'Follicular phase is initiated by FSH; rising oestrogen contributes to the LH surge.',
        'LH surge begins about 24 hours before ovulation and triggers release of the secondary oocyte.',
        'LH turns the ruptured follicle into a corpus luteum.',
        'Corpus luteum secretes oestrogen and progesterone.',
        'High oestrogen and progesterone inhibit FSH and LH during the luteal phase.',
        'Without fertilization: corpus luteum degenerates → ovarian hormones fall → endometrium breaks down → menstruation.',
      ],
      prerequisites: ['abct2326-repro-male-regulation', 'abct2326-feedback-loops'], examples: [],
    },
    practice: [
      { type: 'sequence', prompt: 'Order the phases of the ovarian cycle.', items: ['Follicular phase', 'Ovulation', 'Luteal phase'], explanation: 'The lecture explicitly divides ovarian changes into these three phases.' },
      { type: 'matching', prompt: 'Match each event to its main hormonal signal.', pairs: [['Follicle development', 'FSH'], ['Ovulation', 'LH surge'], ['Corpus luteum formation', 'LH'], ['Endometrial maintenance after ovulation', 'Oestrogen and progesterone']], explanation: 'The follicular, ovulation and luteal slides connect these signals to these events.' },
      { type: 'sequence', prompt: 'Order the no-fertilization route into menstruation.', items: ['Corpus luteum degenerates', 'Oestrogen and progesterone fall', 'Endometrial vessels constrict', 'Endometrium breaks down and is shed'], explanation: 'The menstrual-phase slide gives this causal chain.' },
    ],
    application: [
      { type: 'scenario', prompt: 'Why do high oestrogen and progesterone after ovulation reduce the chance of a second ovulation in the same cycle?', model: 'They feed back on the pituitary and inhibit FSH and LH. That shuts down further follicle development long enough for the released secondary oocyte to have a chance to be fertilized.', rubric: ['Names negative feedback on pituitary', 'Names inhibition of FSH and LH', 'Connects it to suppressing further follicle development'] },
    ],
    sourceRefs: [{ ref: 'phys.6.pdf', location: 'pp24–42 female tract, ovarian phases, ovulation, corpus luteum and menstrual phase' }],
  },
  {
    id: 'abct2326-repro-fertilization-implantation',
    subject: 'ABCT2326', unit: 'phys.repro', type: 'sequence',
    title: 'Fertilization, cleavage and implantation',
    tags: ['reproductive', 'fertilization', 'implantation', 'high-yield'],
    lesson: {
      explanation: 'Freshly ejaculated sperm are initially unable or poorly able to fertilize. Several hours in contact with secretions of the female tract change the sperm membrane in a process called capacitation. Fertilization usually occurs in a uterine or fallopian tube. Contact between the acrosome cap and zona pellucida releases acrosomal enzymes that permit entry into the oocyte. Sperm entry releases calcium from the oocyte’s endoplasmic reticulum; the calcium response prevents additional sperm entry and activates the oocyte to complete meiosis as a haploid ovum. About twelve hours later, the nuclear envelopes disappear and the chromosomes join into a diploid zygote. Cleavage produces two- and four-cell stages, a morula and then a blastocyst. Around day 6 it hatches, and during days 7–10 it implants in the uterine wall. The implanting blastocyst releases chorionic gonadotropin, which acts like LH to maintain the corpus luteum and continued oestrogen and progesterone secretion, keeping the endometrium thick and vascular.',
      keyFacts: [
        'Capacitation = physiological maturation of the sperm membrane in the female tract.',
        'Fertilization usually occurs in the uterine/fallopian tube.',
        'Acrosome–zona pellucida contact releases acrosomal enzymes.',
        'Oocyte calcium release blocks additional sperm and triggers completion of meiosis.',
        'Chromosomes join to form a diploid zygote about twelve hours after sperm entry.',
        'Zygote → cleavage stages → morula → blastocyst → hatching → implantation.',
        'Blastocyst chorionic gonadotropin acts like LH to preserve the corpus luteum and endometrium.',
      ],
      prerequisites: ['abct2326-repro-ovarian-menstrual-cycle'], examples: [],
    },
    practice: [
      { type: 'sequence', prompt: 'Order the developmental stages from fertilization to implantation.', items: ['Fertilization', 'Two-cell stage', 'Four-cell stage', 'Morula', 'Blastocyst', 'Hatching', 'Implantation'], explanation: 'The lecture’s day 0–10 figure presents this progression.' },
      { type: 'mcq', prompt: 'What are the two effects of calcium release after sperm entry named in the lecture?', options: ['Starts menstruation and dilates the cervix', 'Prevents other sperm entering and activates completion of meiosis', 'Forms the placenta and umbilical cord', 'Creates the acrosome and zona pellucida'], answer: 1, explanation: 'The calcium response blocks additional sperm and activates the oocyte to finish meiosis.' },
      { type: 'explain', prompt: 'Why does chorionic gonadotropin help implantation continue?', model: 'It acts like LH and keeps the corpus luteum alive. The corpus luteum therefore continues releasing oestrogen and progesterone, which keep the endometrium thick and increase its vascularization for the blastocyst.', rubric: ['Links chorionic gonadotropin to LH-like action', 'Maintains the corpus luteum', 'Maintains a thick vascular endometrium'] },
    ],
    sourceRefs: [{ ref: 'phys.6.pdf', location: 'pp44–53 capacitation, fertilization, cleavage, blastocyst and implantation' }],
  },
  {
    id: 'abct2326-repro-placenta-parturition',
    subject: 'ABCT2326', unit: 'phys.repro', type: 'comparison',
    title: 'Placental exchange and the three stages of birth',
    tags: ['reproductive', 'pregnancy', 'placenta', 'parturition'],
    lesson: {
      explanation: 'Fetal blood reaches placental vessels through the umbilical arteries and returns to the fetus through the umbilical vein. Maternal blood also reaches the placenta, but maternal and fetal blood do not mix directly; molecules cross placental tissues. Oxygen and nutrients diffuse from maternal blood to fetal blood, while carbon dioxide and wastes move from fetal blood to maternal blood. Parturition is driven by strong uterine contractions and proceeds through three named stages. In dilation, the cervix opens and the fetus shifts into the cervical canal; late in the stage the amniochorionic membrane may rupture. In expulsion, increasingly frequent contractions drive the fetus through the open cervix and birth occurs. In the placental stage, uterine contraction tears the placental attachments and ejects the placenta or afterbirth, while contraction of uterine vessels limits blood loss.',
      keyFacts: [
        'Umbilical arteries: fetus → placenta; umbilical vein: placenta → fetus.',
        'Maternal and fetal blood do not mix directly.',
        'Oxygen and nutrients: maternal → fetal; carbon dioxide and wastes: fetal → maternal.',
        'Parturition stages: dilation → expulsion → placental stage.',
        'Dilation opens the cervix; expulsion delivers the infant; placental stage ejects the afterbirth.',
        'Uterine-vessel contraction restricts blood loss after placental separation.',
      ],
      prerequisites: ['abct2326-repro-fertilization-implantation'], examples: [],
    },
    practice: [
      { type: 'matching', prompt: 'Match each placental vessel or substance to its direction.', pairs: [['Umbilical arteries', 'Fetus to placenta'], ['Umbilical vein', 'Placenta to fetus'], ['Oxygen and nutrients', 'Maternal blood to fetal blood'], ['Carbon dioxide and wastes', 'Fetal blood to maternal blood']], explanation: 'The placental-exchange slides state these directions.' },
      { type: 'sequence', prompt: 'Order the stages of parturition.', items: ['Dilation stage', 'Expulsion stage', 'Placental stage'], explanation: 'The lecture numbers them in this order.' },
      { type: 'mcq', prompt: 'What ends the placental stage?', options: ['Ovulation', 'Ejection of the placenta or afterbirth', 'Formation of the blastocyst', 'The LH surge'], answer: 1, explanation: 'The placental stage ends with ejection of the placenta, also called the afterbirth.' },
    ],
    sourceRefs: [{ ref: 'phys.6.pdf', location: 'pp56–59 placental blood flow and molecular exchange' }, { ref: 'phys.6.pdf', location: 'pp61–66 parturition and its dilation, expulsion and placental stages' }],
  },
];
