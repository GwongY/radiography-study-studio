/*
 * ABCT2326 · Week 7 leaves — reproduction.
 *
 * Read off Lecture 6 reproduction slides (phys.l6.2026), pages 2–60.
 * One row per unit the slides teach (part, cell, substance, process, group).
 * Row kinds and fields: outputs/revision/leaves.js. Rules: outputs/revision/rules.js.
 * Recipe: docs/superpowers/plans/2026-10-19-physiology-revise.md (Recipe P).
 */
const L6 = 'phys.l6.2026';

export const SOURCES = {
  [L6]: 'Lecture 6 reproductive system slides',
};

export const ROWS = [
  /* ---------------- Spermatogenesis & Testis (p3-5, 8, 10-11, 15) ---------------- */
  { k: 'part', id: 'p7_seminiferous', l: 'Seminiferous tubules', parent: 'p_spermato', w: 7, line: 'begins at outermost cell layer in seminiferous tubules', src: [L6, 4, 10] },
  { k: 'cell', id: 'p7_spermatogonia', l: 'Spermatogonia', parent: 'p_spermato', w: 7, line: 'stem cells that divide by mitosis to produce daughter cells', src: [L6, 4] },
  { k: 'cell', id: 'p7_primary_spermatocyte', l: 'Primary spermatocytes', match: 'primary spermatocyte', parent: 'p_spermato', w: 7, line: 'begin meiosis and form secondary spermatocytes', src: [L6, 5, 4] },
  { k: 'cell', id: 'p7_secondary_spermatocytes', l: 'Secondary spermatocytes', parent: 'p_spermato', w: 7, line: 'finish meiosis I to form immature gametes', src: [L6, 5] },
  { k: 'cell', id: 'p7_spermatids', l: 'Spermatids', parent: 'p_spermato', w: 7, line: 'finish meiosis II and differentiate into spermatozoa', src: [L6, 5, 3] },
  { k: 'cell', id: 'p7_spermatozoa', l: 'Spermatozoa', parent: 'p_spermato', w: 7, line: 'lose contact with tubule wall and enter fluid in lumen', src: [L6, 5, 8] },
  { k: 'part', id: 'p7_sperm_head', l: 'Head', parent: 'p7_spermatozoa', w: 7, line: 'five micrometre head containing nucleus and acrosome', src: [L6, 8] },
  { k: 'part', id: 'p7_acrosome', l: 'Acrosome', parent: 'p7_spermatozoa', w: 7, line: 'cap containing enzymes that allow sperm to digest into oocyte', src: [L6, 8, 41] },
  { k: 'part', id: 'p7_middle_piece', l: 'Middle piece', match: 'Middle piece', parent: 'p7_spermatozoa', w: 7, line: 'five micrometre section containing mitochondrial spiral', src: [L6, 8] },
  { k: 'part', id: 'p7_sperm_tail', l: 'Tail', parent: 'p7_spermatozoa', w: 7, line: 'flagellum with fibrous sheath providing whip-like motility', src: [L6, 8, 40] },
  { k: 'cell', id: 'p7_sertoli', l: 'Sertoli cells', match: 'Sertoli cells', parent: 'p_spermato', w: 7, line: 'surround stem cells and support developing spermatocytes and spermatids', src: [L6, 10, 3, 11, 15], makes: { p7_abp: 'synthesize androgen-binding protein', p7_inhibin: 'synthesize inhibin' } },
  { k: 'substance', id: 'p7_abp', l: 'Androgen-binding protein', match: 'androgen-binding protein', parent: 'p7_sertoli', w: 7, line: 'binds onto testosterone to increase the concentration of testosterone', src: [L6, 11], acts: { p7_testosterone: 'binds and concentrates testosterone' } },
  { k: 'substance', id: 'p7_inhibin', l: 'Inhibin', parent: 'p7_sertoli', w: 7, line: 'stimulates the pituitary gland to inhibit the secretion of FSH', src: [L6, 11], acts: { p7_fsh: 'inhibits pituitary secretion of FSH' } },
  { k: 'cell', id: 'p7_leydig', l: 'Leydig cells', match: 'Leydig cells', parent: 'p_spermato', w: 7, line: 'interstitial cells that secrete testosterone after stimulation by LH', src: [L6, 15, 3], makes: { p7_testosterone: 'secretes testosterone after stimulation by LH' } },

  /* ---------------- Gonadotropin secretion (p12, 15, 32, 33, 35) ---------------- */
  { k: 'substance', id: 'p7_fsh', l: 'FSH', parent: 'p_gonadotropin', w: 7, line: 'enhances spermatogenesis through Sertoli cells and initiates follicular phase', src: [L6, 15, 11, 32, 33], acts: { p7_sertoli: 'stimulates Sertoli cells to make ABP', p7_follicular: 'initiates follicular phase' } },
  { k: 'substance', id: 'p7_lh', l: 'LH', parent: 'p_gonadotropin', w: 7, line: 'stimulates Leydig cells to secrete testosterone and triggers ovulation', src: [L6, 15, 32, 33, 35], acts: { p7_leydig: 'stimulates Leydig cells to secrete testosterone', p7_ovulation: 'triggers ovulation through LH surge' } },

  /* ---------------- Testosterone actions (p13-15) ---------------- */
  { k: 'substance', id: 'p7_testosterone', l: 'Testosterone', parent: 'p_testosterone', w: 7, line: 'required to stimulate meiosis and early spermatid maturation', src: [L6, 15, 13, 14], acts: { p7_primary_spermatocyte: 'stimulates meiosis and early spermatid maturation' } },
  { k: 'group', id: 'p7_sec_sex_char', l: 'Secondary Sexual Characteristics', match: 'Secondary Sexual Characteristics', parent: 'p_testosterone', w: 7, line: 'growth and maintenance of penis and secondary sexual organs', src: [L6, 14] },
  { k: 'group', id: 'p7_anabolic_effects', l: 'Anabolic Effects', match: 'Anabolic Effects', parent: 'p_testosterone', w: 7, line: 'protein synthesis and muscle growth and growth of bones', src: [L6, 14] },

  /* ---------------- Male accessory sex organs & sperm movement (p16-18) ---------------- */
  { k: 'part', id: 'p7_rete_testis', l: 'Rete testis', match: 'rete testis', parent: 'p_male_acc', w: 7, line: 'network of ducts receiving sperm from seminiferous tubules', src: [L6, 16] },
  { k: 'part', id: 'p7_efferent_ductules', l: 'Efferent ductules', match: 'efferent ductules', parent: 'p_male_acc', w: 7, line: 'passageway conducting sperm from rete testis to epididymis', src: [L6, 16] },
  { k: 'part', id: 'p7_epididymis', l: 'Epididymis', match: 'epididymis', parent: 'p_male_acc', w: 7, line: 'the site of sperm maturation and storage', src: [L6, 16, 10] },
  { k: 'part', id: 'p7_ductus_deferens', l: 'Ductus deferens', match: 'ductus deferens', parent: 'p_male_acc', w: 7, line: 'conducts spermatozoa from the epididymis toward ejaculatory duct', src: [L6, 16] },
  { k: 'part', id: 'p7_ejaculatory_duct', l: 'Ejaculatory duct', match: 'ejaculatory duct', parent: 'p_male_acc', w: 7, line: 'short duct delivering spermatozoa into the urethra', src: [L6, 16] },
  { k: 'part', id: 'p7_urethra_male', l: 'Urethra', match: 'urethra', parent: 'p_male_acc', w: 7, line: 'conduit for emission and forceful expulsion of semen', src: [L6, 16, 18] },
  { k: 'part', id: 'p7_seminal_vesicle', l: 'Seminal vesicle', match: 'seminal vesicle', parent: 'p_male_acc', w: 7, line: 'gland adding fluid with fructose for sperm energy', src: [L6, 17, 18], makes: { p7_seminal_fluid: 'adds seminal fluid containing fructose' } },
  { k: 'substance', id: 'p7_seminal_fluid', l: 'Seminal fluid', match: 'Seminal fluid', parent: 'p_male_acc', w: 7, line: 'contains fructose providing energy for sperm motility', src: [L6, 17] },
  { k: 'part', id: 'p7_prostate', l: 'Prostate gland', match: 'prostate gland', parent: 'p_male_acc', w: 7, line: 'gland adding fluid with citric acid, calcium and coagulation proteins', src: [L6, 17], makes: { p7_prostate_fluid: 'adds prostate fluid' } },
  { k: 'substance', id: 'p7_prostate_fluid', l: 'Prostate fluid', match: 'Prostate fluid', parent: 'p_male_acc', w: 7, line: 'contains citric acid, calcium, and coagulation proteins', src: [L6, 17] },
  { k: 'substance', id: 'p7_semen', l: 'Semen', match: 'semen', parent: 'p_male_acc', w: 7, line: 'fluid mixture of sperm and secretions from accessory glands', src: [L6, 17, 18] },
  { k: 'process', id: 'p7_emission', l: 'Emission', match: 'Emission', parent: 'p_male_acc', w: 7, line: 'movement of semen into the urethra under sympathetic control', src: [L6, 18], next: { p7_ejaculation: 'leads to forceful expulsion of semen' } },
  { k: 'process', id: 'p7_ejaculation', l: 'Ejaculation', match: 'Ejaculation', parent: 'p_male_acc', w: 7, line: 'forceful expulsion of semen from urethra involving smooth muscle contraction', src: [L6, 18, 16] },

  /* ---------------- Female reproductive organs (p20-22) ---------------- */
  { k: 'part', id: 'p7_ovary', l: 'Ovary', match: 'Ovary', parent: 'p_female', w: 7, line: 'female gonad containing follicles that release ovum at ovulation', src: [L6, 20, 22, 24, 27] },
  { k: 'part', id: 'p7_uterine_tube', l: 'Uterine tube', match: 'Uterine tube', parent: 'p_female', w: 7, line: 'duct connecting ovary to uterus where fertilization occurs', src: [L6, 20] },
  { k: 'part', id: 'p7_vagina', l: 'Vagina', match: 'Vagina', parent: 'p_female', w: 7, line: 'elastic muscular canal extending from cervix to external genitalia', src: [L6, 20] },
  { k: 'part', id: 'p7_cervix', l: 'Cervix', match: 'Cervix', parent: 'p_female', w: 7, line: 'inferior portion of uterus that dilates during delivery', src: [L6, 20, 55, 56] },

  /* ---------------- Uterus & uterine wall layers (p20-21, 37-38) ---------------- */
  { k: 'part', id: 'p7_perimetrium', l: 'Perimetrium', match: 'Perimetrium', parent: 'p_uterus', w: 7, line: 'outer serosa layer of the uterine wall', src: [L6, 20] },
  { k: 'part', id: 'p7_myometrium', l: 'Myometrium', match: 'Myometrium', parent: 'p_uterus', w: 7, line: 'middle smooth muscle layer whose contractions eject foetus at birth', src: [L6, 20, 49, 56] },
  { k: 'part', id: 'p7_endometrium', l: 'Endometrium', match: 'Endometrium', parent: 'p_uterus', w: 7, line: 'inner glandular mucosal layer that supports embryo and breaks down during menstruation', src: [L6, 20, 37, 38, 47, 48, 56] },

  /* ---------------- Ovarian cycle: follicles, phases & hormones (p24, 27, 29-37) ---------------- */
  { k: 'part', id: 'p7_primordial', l: 'Primordial follicles', match: 'Primordial follicles', parent: 'p_ovarian', w: 7, line: 'resting follicles present in ovary before monthly recruitment', src: [L6, 27] },
  { k: 'part', id: 'p7_primary_follicle', l: 'Primary follicle', match: 'Primary follicle', parent: 'p_ovarian', w: 7, line: 'one gets bigger each month while others degenerate', src: [L6, 27, 24] },
  { k: 'part', id: 'p7_secondary_follicle', l: 'Secondary follicle', match: 'Secondary follicle', parent: 'p_ovarian', w: 7, line: 'developing follicle with multiple layers and fluid accumulation', src: [L6, 27, 31] },
  { k: 'part', id: 'p7_graafian', l: 'Graafian follicle', match: 'Graafian follicle', parent: 'p_ovarian', w: 7, line: 'mature follicle that bulges out of ovary wall before rupture', src: [L6, 31, 32, 33] },
  { k: 'cell', id: 'p7_secondary_oocyte', l: 'Secondary oocyte', match: 'Secondary oocyte', parent: 'p_ovarian', w: 7, line: 'gamete released at ovulation arrested until fertilization', src: [L6, 27, 33] },
  { k: 'part', id: 'p7_corona_radiata', l: 'Corona radiata', match: 'Corona radiata', parent: 'p7_secondary_oocyte', w: 7, line: 'granulosa cells surrounding the secondary oocyte during ovulation', src: [L6, 27] },
  { k: 'part', id: 'p7_corpus_luteum', l: 'Corpus luteum', match: 'Corpus luteum', parent: 'p_ovarian', w: 7, line: 'secretes both estrogen and progesterone to maintain endometrium', src: [L6, 29, 27, 35, 37, 48], makes: { p7_estrogen: 'secretes estrogen', p7_progesterone: 'secretes progesterone' } },
  { k: 'part', id: 'p7_corpus_albicans', l: 'Corpus albicans', match: 'Corpus albicans', parent: 'p_ovarian', w: 7, line: 'scar tissue formed upon degeneration of corpus luteum', src: [L6, 27] },
  { k: 'process', id: 'p7_follicular', l: 'Follicular phase', match: 'Follicular phase', parent: 'p_ovarian', w: 7, line: 'characterized by increasing levels of estrogen production reaching a high', src: [L6, 30, 31, 32], next: { p7_ovulation: 'leads to ovulation' } },
  { k: 'process', id: 'p7_ovulation', l: 'Ovulation', match: 'Ovulation', parent: 'p_ovarian', w: 7, line: 'rupture of Graafian follicle releasing secondary oocyte into cavity', src: [L6, 30, 33, 24, 27], next: { p7_luteal: 'leads to luteal phase' } },
  { k: 'process', id: 'p7_luteal', l: 'Luteal phase', match: 'Luteal phase', parent: 'p_ovarian', w: 7, line: 'LH stimulates ruptured follicle to become a corpus luteum', src: [L6, 30, 35, 36, 37], next: { p_menstrual: 'leads to menstruation if no fertilization' } },
  { k: 'substance', id: 'p7_estrogen', l: 'Estrogen', match: 'estrogen', parent: 'p_ovarian', w: 7, line: 'stimulates hypothalamus to release more GnRH triggering LH surge', src: [L6, 29, 31, 32, 35, 36, 37, 48, 56], acts: { p7_lh: 'triggers LH surge from anterior pituitary' } },
  { k: 'substance', id: 'p7_progesterone', l: 'Progesterone', match: 'progesterone', parent: 'p_ovarian', w: 7, line: 'peaks one week after ovulation to maintain endometrium and prevent further ovulation', src: [L6, 29, 35, 36, 37, 48], acts: { p7_follicular: 'feeds back to inhibit LH and FSH secretion and shut down follicle development' } },

  /* ---------------- Menstrual cycle (p38-39) ---------------- */
  { k: 'process', id: 'p7_menstrual_phase', l: 'Menstrual phase', match: 'MENSTRUAL PHASE', parent: 'p_menstrual', w: 7, line: 'blood vessels in endometrium constrict and uterus layers break down', src: [L6, 38] },
  { k: 'substance', id: 'p7_prostaglandins', l: 'Prostaglandins', match: 'prostaglandin', parent: 'p_menstrual', w: 7, line: 'causes uterine smooth muscles to contract during menstruation and labor', src: [L6, 38, 56], acts: { p7_myometrium: 'stimulates smooth muscle contractions' } },

  /* ---------------- Fertilization (p40-45) ---------------- */
  { k: 'process', id: 'p7_capacitation', l: 'Capacitation', match: 'Capacitation', parent: 'p_fert', w: 7, line: 'sperm movement becomes more whip-like and membrane changes to fuse', src: [L6, 40], next: { p7_acrosome_reaction: 'leads to acrosome reaction upon contact with zona pellucida' } },
  { k: 'process', id: 'p7_acrosome_reaction', l: 'Acrosome reaction', match: 'Acrosome Reaction', parent: 'p_fert', w: 7, line: 'association with zona pellucida stimulates release of acrosomal enzymes', src: [L6, 43], next: { p7_cortical_ca: 'leads to calcium activation when sperm enters oocyte' } },
  { k: 'part', id: 'p7_zona_pellucida', l: 'Zona pellucida', match: 'zona pellucida', parent: 'p_fert', w: 7, line: 'extracellular coat whose association stimulates release of acrosomal enzymes', src: [L6, 41, 46] },
  { k: 'process', id: 'p7_cortical_ca', l: 'Calcium activation', match: 'Ca2+', parent: 'p_fert', w: 7, line: 'calcium prevents polyspermy and activates oocyte to finish meiosis', src: [L6, 44], links: { p7_zygote: 'leads to formation of diploid zygote' } },
  { k: 'cell', id: 'p7_zygote', l: 'Zygote', match: 'zygote', parent: 'p_fert', w: 7, line: 'diploid cell formed when chromosomes join twelve hours after entry', src: [L6, 45] },

  /* ---------------- Cleavage & Implantation (p46-48) ---------------- */
  { k: 'process', id: 'p7_cleavage', l: 'Cleavage', match: 'Cleavage', parent: 'p_implant', w: 7, line: 'series of cell divisions producing blastomeres from zygote', src: [L6, 46], links: { p7_morula: 'leads to morula formation' } },
  { k: 'part', id: 'p7_morula', l: 'Morula', match: 'morula', parent: 'p_implant', w: 7, line: 'solid ball of cells resulting from early cleavage divisions', src: [L6, 46] },
  { k: 'part', id: 'p7_blastocyst', l: 'Blastocyst', match: 'Blastocyst', parent: 'p_implant', w: 7, line: 'hollow ball with trophoblast outer layer and inner cell mass', src: [L6, 46, 47, 48] },
  { k: 'part', id: 'p7_trophoblast', l: 'Trophoblast', match: 'Trophoblast', parent: 'p7_blastocyst', w: 7, line: 'outer layer secreting enzymes to eat into endometrium during implantation', src: [L6, 46, 47, 49, 53], makes: { p7_hcg: 'releases chorionic gonadotropin' } },
  { k: 'part', id: 'p7_cellular_trophoblast', l: 'Cellular trophoblast', match: 'Cellular trophoblast', parent: 'p7_trophoblast', w: 7, line: 'inner cellular layer of trophoblast during early implantation', src: [L6, 47] },
  { k: 'part', id: 'p7_syncytial_trophoblast', l: 'Syncytial trophoblast', match: 'Syncytial trophoblast', parent: 'p7_trophoblast', w: 7, line: 'multinucleated outer layer eroding endometrial capillary and forming lacunae', src: [L6, 47] },
  { k: 'part', id: 'p7_inner_cell_mass', l: 'Inner cell mass', match: 'Inner cell mass', parent: 'p7_blastocyst', w: 7, line: 'cluster of cells in blastocyst that differentiates into embryo', src: [L6, 46] },
  { k: 'part', id: 'p7_amniotic_cavity', l: 'Amniotic cavity', match: 'Amniotic cavity', parent: 'p_implant', w: 7, line: 'chamber that appears within inner cell mass during implantation', src: [L6, 47, 50] },
  { k: 'substance', id: 'p7_hcg', l: 'Chorionic gonadotropin', match: 'chorionic gonadotropin', parent: 'p_implant', w: 7, line: 'hormone keeping corpus luteum alive to release estrogen and progesterone', src: [L6, 48], acts: { p7_corpus_luteum: 'keeps corpus luteum alive' } },

  /* ---------------- Extraembryonic membranes & Placenta (p49-54) ---------------- */
  { k: 'part', id: 'p7_chorion', l: 'Chorion', match: 'Chorion', parent: 'p_placenta', w: 7, line: 'outer extraembryonic membrane forming fetal component of placenta', src: [L6, 50] },
  { k: 'part', id: 'p7_chorionic_villi', l: 'Chorionic villi', match: 'Chorionic villi', parent: 'p_placenta', w: 7, line: 'contain fetal blood vessels around which maternal blood flows', src: [L6, 49, 53] },
  { k: 'part', id: 'p7_amnion', l: 'Amnion', match: 'Amnion', parent: 'p_placenta', w: 7, line: 'membrane expanding greatly to fill uterine cavity and enclose fluid', src: [L6, 50, 53] },
  { k: 'part', id: 'p7_yolk_sac', l: 'Yolk sac', match: 'Yolk sac', parent: 'p_placenta', w: 7, line: 'membrane whose stalk fuses with body stalk into umbilical stalk', src: [L6, 49] },
  { k: 'part', id: 'p7_allantois', l: 'Allantois', match: 'allantois', parent: 'p_placenta', w: 7, line: 'endodermal sac whose remnants are contained within umbilical cord', src: [L6, 50] },
  { k: 'part', id: 'p7_decidua_basalis', l: 'Decidua basalis', match: 'Decidua basalis', parent: 'p_placenta', w: 7, line: 'maternal portion of endometrium underlying implanted embryo', src: [L6, 49, 50] },
  { k: 'part', id: 'p7_decidua_capsularis', l: 'Decidua capsularis', match: 'Decidua capsularis', parent: 'p_placenta', w: 7, line: 'portion of endometrium covering the expanding embryo and trophoblast', src: [L6, 49, 50] },
  { k: 'part', id: 'p7_decidua_parietalis', l: 'Decidua parietalis', match: 'Decidua parietalis', parent: 'p_placenta', w: 7, line: 'endometrium lining the remainder of the uterine cavity', src: [L6, 49, 50] },
  { k: 'part', id: 'p7_umbilical_cord', l: 'Umbilical cord', match: 'Umbilical cord', parent: 'p_placenta', w: 7, line: 'connects fetus to placenta containing blood vessels and stalk remnants', src: [L6, 50, 54, 53, 55] },
  { k: 'part', id: 'p7_umbilical_arteries', l: 'Umbilical arteries', match: 'Umbilical arteries', parent: 'p7_umbilical_cord', w: 7, line: 'deliver fetal blood to placental vessels for exchange', src: [L6, 51, 53] },
  { k: 'part', id: 'p7_umbilical_vein', l: 'Umbilical vein', match: 'Umbilical vein', parent: 'p7_umbilical_cord', w: 7, line: 'returns oxygenated and nutrient-rich blood from placenta to fetus', src: [L6, 51, 53] },

  /* ---------------- Parturition & Labor (p55-59) ---------------- */
  { k: 'substance', id: 'p7_oxytocin', l: 'Oxytocin', match: 'oxytocin', parent: 'p_parturition', w: 7, line: 'stimulates myometrium smooth muscle contractions and prostaglandin release', src: [L6, 56], acts: { p7_myometrium: 'stimulates smooth muscle contractions in labor' } },
  { k: 'substance', id: 'p7_relaxin', l: 'Relaxin', match: 'Relaxin', parent: 'p_parturition', w: 7, line: 'relaxes pelvic articulations and dilates the cervix during delivery', src: [L6, 56] },
  { k: 'process', id: 'p7_labor', l: 'Labor contractions', match: 'Labor contractions', parent: 'p_parturition', w: 7, line: 'positive feedback contractions that get stronger until delivery is completed', src: [L6, 56], next: { p7_dilation_stage: 'leads to dilation stage' } },
  { k: 'process', id: 'p7_dilation_stage', l: 'Dilation stage', match: 'Dilation Stage', parent: 'p_parturition', w: 7, line: 'first stage of labor where cervix dilates and amniotic membrane ruptures', src: [L6, 57], next: { p7_expulsion_stage: 'leads to expulsion stage' } },
  { k: 'process', id: 'p7_expulsion_stage', l: 'Expulsion stage', match: 'Expulsion Stage', parent: 'p_parturition', w: 7, line: 'second stage of labor where fetus is pushed out through cervix', src: [L6, 58], next: { p7_placental_stage: 'leads to placental stage' } },
  { k: 'process', id: 'p7_placental_stage', l: 'Placental stage', match: 'Placental Stage', parent: 'p_parturition', w: 7, line: 'third stage of labor where placenta is expelled out', src: [L6, 59] },
];
