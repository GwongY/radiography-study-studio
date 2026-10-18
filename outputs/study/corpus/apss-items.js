/*
 * APSS1A08 Introduction to Sociology — Topics 01, 02A and 02B.
 *
 * T02A and T02B (three theoretical approaches; four modern contemporary
 * theorists) come from one combined deck, 'Topic 02A & Topic 02B.pdf',
 * registered as two SOURCE_FILES refs — soc.t02a.2026 for pp1-12, soc.t02b.2026
 * for pp13-28 — so a citation's page range says which half of the deck it
 * belongs to even though both refs resolve to the same file.
 *
 * T03–T08 have no lecture notes supplied yet and remain source gaps in
 * outputs/schedule.js (WEEK_GAPS.APSS1A08).
 */

export const APSS_ITEMS = [
  {
    id: 'apss1a08-sociological-perspective',
    subject: 'APSS1A08', unit: 'soc.t01', type: 'definition',
    title: 'Sociology and the sociological perspective',
    tags: ['sociology', 'topic 01', 'high-yield'],
    practice: [
      { type: 'typed', prompt: 'Complete the definition: sociology is the systematic study of ______.', accept: ['human society', 'society'], explanation: 'The lecture defines sociology as the systematic study of human society.' },
      { type: 'matching', prompt: 'Match each phrase to what the sociological perspective asks you to do.', pairs: [['General in the particular', 'Find broad social patterns in individual lives'], ['Strange in the familiar', 'Question what everyday life makes seem natural'], ['Society shapes thought and action', 'Look beyond a purely personal explanation']], explanation: 'All three formulations appear together in the Topic 01 definition.' },
      { type: 'mcq', prompt: 'Which answer best applies the lecture’s sociological perspective to partner selection?', options: ['Choice is entirely an expression of private taste', 'Social factors and cultural expectations guide apparently personal choices', 'Only income determines every relationship', 'Individuals have no agency at all'], answer: 1, explanation: 'The lecture uses partner selection to show that apparently personal choices are patterned by social factors; it does not say one factor determines everyone.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A friend says, “Who I date is nobody’s business but mine, so sociology has nothing to say about it.” Answer using Topic 01.', model: 'The decision is personal, but Topic 01 asks us to look for the general inside that particular choice. Age, schooling, race, ethnicity, sex, class, culture and gender roles can shape the pool of people considered suitable and the expectations brought to a relationship. Sociology studies those patterns without claiming that one pattern determines every individual choice.', rubric: ['Defines the general-in-the-particular move', 'Names at least two social factors from the lecture', 'Avoids replacing social influence with total determination'] },
    ],
    sourceRefs: [
      { ref: 'soc.t01.2026', location: 'pp2–6 partner selection, culture and gender-role opening case' },
      { ref: 'soc.t01.2026', location: 'p7 definition of sociology and the sociological perspective' },
    ],
  },
  {
    id: 'apss1a08-personal-social-education',
    subject: 'APSS1A08', unit: 'soc.t01', type: 'comparison',
    title: 'Personal explanations versus social patterns',
    tags: ['sociology', 'education', 'topic 01'],
    practice: [
      { type: 'comparison', prompt: 'Which question is sociological rather than only personal?', options: ['Why did I choose this university?', 'Which social groups have different chances of entering university, and what conditions produce the difference?', 'Which campus do I like best?', 'What did my relative advise me to do?'], answer: 1, explanation: 'The sociological question looks for a patterned difference between groups and the conditions constructing it.' },
      { type: 'typed', prompt: 'Name the three social factors the lecture explicitly lists as affecting college entry.', accept: ['age, social class, sex', 'age social class sex', 'age, class, sex'], explanation: 'Age, social class and sex.' },
    ],
    application: [
      { type: 'scenario', prompt: 'Two students say their university outcomes differ only because one “worked harder.” Reframe the claim sociologically using the lecture.', model: 'Effort may be part of each personal story, but the lecture asks us also to test patterned access: parental education and income, housing, private tutoring, school type, overseas options and the cost of enrichment. A sociological account asks how those conditions distribute opportunities before it treats the outcome as individual effort alone.', rubric: ['Keeps individual effort possible', 'Adds at least two source-named social conditions', 'Frames the answer as a pattern to investigate'] },
    ],
    sourceRefs: [{ ref: 'soc.t01.2026', location: 'pp8–12 personal perspective, global and Hong Kong education examples' }],
  },
  {
    id: 'apss1a08-global-perspective',
    subject: 'APSS1A08', unit: 'soc.t01', type: 'definition',
    title: 'The global perspective',
    tags: ['sociology', 'global perspective', 'topic 01'],
    practice: [
      { type: 'typed', prompt: 'What does the global perspective study?', accept: ['the larger world and our society’s place in it', 'the larger world and our society place in it', 'the larger world and society’s place in it'], explanation: 'It studies the larger world and our society’s place in it.' },
      { type: 'mcq', prompt: 'Which example best shows the global perspective in Topic 01?', options: ['Explaining a choice only by personality', 'Linking overseas production shifts to local employment and politics', 'Assuming every country has the same standard of living', 'Ignoring events outside Hong Kong'], answer: 1, explanation: 'The trade-war example connects production, manufacturing employment and political reactions across countries.' },
    ],
    sourceRefs: [{ ref: 'soc.t01.2026', location: 'pp13–15 global perspective, world-system groups, interconnectedness and trade-war example' }],
  },
  {
    id: 'apss1a08-research-to-change',
    subject: 'APSS1A08', unit: 'soc.t01', type: 'sequence',
    title: 'From sociological research to social change',
    tags: ['sociology', 'application', 'topic 01'],
    practice: [
      { type: 'sequence', prompt: 'Put the lecture’s four stages of applied sociology in order.', items: ['Research discovery', 'Policy recognition', 'Legal reform', 'Broader impact'], explanation: 'The Topic 01 slide presents these four numbered stages in this order.' },
      { type: 'mcq', prompt: 'What is the “broader impact” in the lecture’s final stage?', options: ['Ending all disagreement', 'Developing more active and critical social awareness', 'Replacing research with opinion', 'Keeping the finding inside the university'], answer: 1, explanation: 'The slide says understanding such research helps develop more active and critical social awareness.' },
    ],
    sourceRefs: [{ ref: 'soc.t01.2026', location: 'p16 applying the sociological perspective: research, policy, law and broader impact' }],
  },
  {
    id: 'apss1a08-marx-weber-change',
    subject: 'APSS1A08', unit: 'soc.t01', type: 'comparison',
    title: 'Marx and Weber on social change',
    tags: ['sociology', 'Marx', 'Weber', 'topic 01', 'high-yield'],
    practice: [
      { type: 'matching', prompt: 'Match each term to Topic 01.', pairs: [['Bourgeoisie', 'Capitalist class'], ['Proletariat', 'Exploited workers'], ['Marx', 'Class conflict as the engine of history'], ['Weber', 'Religious ideas as a driver of social transformation']], explanation: 'These are the contrasts the final Topic 01 slides ask students to keep separate.' },
      { type: 'mcq', prompt: 'Which statement matches the lecture’s Marxism-versus-communism distinction?', options: ['They are identical names for one political system', 'Marx designed every later communist state', 'Communism is presented as a later application of Marx’s ideas', 'Marx rejected class analysis'], answer: 2, explanation: 'The lecture says Marxism is not identical to communism and calls communism a later application of Marx’s ideas.' },
      { type: 'explain', prompt: 'What is the main contrast between Marx and Weber in these slides?', model: 'Marx’s account centres economic class conflict as the engine of historical change. Weber’s example challenges an economics-only account by showing religious beliefs and practices acting as a central force in social transformation.', rubric: ['Names class conflict for Marx', 'Names religion or ideas for Weber', 'Frames the difference as competing explanations of social change'] },
    ],
    sourceRefs: [{ ref: 'soc.t01.2026', location: 'pp17–20 Marx on class conflict and class structure; Weber on religion and social change' }],
  },

  /* ---------------- T02A: Functionalist and conflict perspectives ---------------- */
  {
    id: 'apss1a08-three-theoretical-approaches',
    subject: 'APSS1A08', unit: 'soc.t02a', type: 'definition',
    title: 'Theory versus theoretical approach',
    tags: ['sociology', 'topic 02a', 'theory'],
    practice: [
      { type: 'typed', prompt: 'Name the three major theoretical approaches T02A introduces.', accept: ['structural-functional, social-conflict, symbolic-interaction', 'structural functional, social conflict, symbolic interaction'], explanation: 'The structural-functional approach, the social-conflict approach and the symbolic-interaction approach.' },
      { type: 'mcq', prompt: 'Which statement distinguishes a theory from a theoretical approach?', options: ['A theory is broader than a theoretical approach', 'A theoretical approach is the basic image of society guiding thinking and research; a theory explains specific related facts', 'They are exactly the same thing', 'Only a theory can be tested against evidence'], answer: 1, explanation: 'T02A defines the theoretical approach as the guiding image of society, and a theory as a tested statement about how specific facts relate.' },
    ],
    sourceRefs: [{ ref: 'soc.t02a.2026', location: 'p2 theory, theoretical approach and the three major approaches' }],
  },
  {
    id: 'apss1a08-structural-functional-approach',
    subject: 'APSS1A08', unit: 'soc.t02a', type: 'comparison',
    title: 'The structural-functional approach: manifest, latent and dysfunction',
    tags: ['sociology', 'topic 02a', 'functionalism', 'high-yield'],
    practice: [
      { type: 'matching', prompt: 'Match each item to manifest or latent function, using the higher-education example.', pairs: [['Providing skills for jobs after graduation', 'Manifest function'], ['Acting as a ‘marriage broker’ for similar-background young people', 'Latent function'], ['Keeping young people out of a scarce labour market', 'Latent function'], ['The recognised, intended consequence of a social pattern', 'Definition of manifest function']], explanation: 'T02A’s higher-education slide gives one manifest function and two latent functions.' },
      { type: 'typed', prompt: 'Which sociologist compared society to the human body?', accept: ['Herbert Spencer', 'Spencer'], explanation: 'Spencer’s body analogy is named alongside Comte and Durkheim as founders of the approach.' },
      { type: 'mcq', prompt: 'Which pairing is correct?', options: ['Durkheim applied the structural-functional framework to study suicide', 'Comte introduced manifest and latent functions', 'Spencer studied globalization dysfunction', 'Weber compared society to the human body'], answer: 0, explanation: 'T02A credits Durkheim with the suicide study and Spencer with the body comparison; manifest/latent functions are not attributed to a single named theorist on this slide.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A factory relocates its production overseas. Using the structural-functional approach, name one social function and one social dysfunction this creates.', model: 'A social function: the enterprise can lower production costs, raise profits and expand into new markets, as T02A’s globalization example describes. A social dysfunction: the same move can cause job losses where production used to happen, local economic disruption and community instability. The structural-functional approach holds both readings together — the same structural change is beneficial for some parts of the system and dysfunctional for others.', rubric: ['States a social function from the source (cost, profit or market access)', 'States a social dysfunction from the source (job loss, disruption or instability)', 'Frames both as effects of the same structural change'] },
    ],
    sourceRefs: [{ ref: 'soc.t02a.2026', location: 'pp3–5 the structural-functional approach, manifest and latent functions, social dysfunction' }],
  },
  {
    id: 'apss1a08-social-conflict-key-concepts',
    subject: 'APSS1A08', unit: 'soc.t02a', type: 'definition',
    title: 'The social-conflict approach: key concepts',
    tags: ['sociology', 'topic 02a', 'conflict theory'],
    practice: [
      { type: 'mcq', prompt: 'Which approach explicitly rejects the idea that social structure promotes the operation of society as a whole?', options: ['The structural-functional approach', 'The social-conflict approach', 'The symbolic-interaction approach', 'None of them'], answer: 1, explanation: 'T02A states this rejection as a defining feature of the social-conflict approach, in direct contrast to the structural-functional approach.' },
      { type: 'typed', prompt: 'Name the five factors T02A lists as linked to a society’s unequal distribution of money, power and education.', accept: ['class, race, ethnicity, gender, age', 'class race ethnicity gender age'], explanation: 'Class, race, ethnicity, gender and age.' },
      { type: 'matching', prompt: 'Match each dominant/disadvantaged pairing T02A names.', pairs: [['Class', 'Rich vs Poor'], ['Race', 'White people vs People of colour'], ['Gender', 'Men vs Women']], explanation: 'These three pairings illustrate the dominant-versus-disadvantaged framing on the same slide.' },
    ],
    sourceRefs: [{ ref: 'soc.t02a.2026', location: 'p6 the social-conflict approach: key concepts and focus areas' }],
  },
  {
    id: 'apss1a08-social-conflict-case-studies',
    subject: 'APSS1A08', unit: 'soc.t02a', type: 'comparison',
    title: 'Social-conflict case studies: education, gender, race and Hong Kong healthcare',
    tags: ['sociology', 'topic 02a', 'conflict theory', 'high-yield'],
    practice: [
      { type: 'mcq', prompt: 'According to the education example, what does the social-conflict approach say track placement mainly reflects?', options: ['Pure individual talent', 'Social background, more than talent', 'Random assignment', 'Teacher preference alone'], answer: 1, explanation: 'T02A’s social-conflict view says track placement ‘often has less to do with talent than with social background’.' },
      { type: 'mcq', prompt: 'Which statement matches T02A’s gender-conflict theory?', options: ['Men and women hold equal representation in leadership', 'Men are considered ‘head of household’ and hold most positions of power', 'Women dominate the entertainment industry', 'There is no earnings gap for the same work'], answer: 1, explanation: 'T02A lists men as ‘head of household’ holding most positions of power, higher earnings and entertainment dominance.' },
      { type: 'explain', prompt: 'Using the Hong Kong healthcare example, explain how the social-conflict and structural-functional approaches reach different readings of the same system.', model: 'The social-conflict view says the split between cheap public care and expensive private care produces social inequality, because lower-income people cannot as easily reach good-quality treatment. The structural-functional view reads the same system differently: it provides affordable medical services to low-income families while still meeting different classes’ needs. Both approaches examine the identical public/private hospital system and reach different conclusions from it.', rubric: ['States the social-conflict reading (unequal access to quality care)', 'States the structural-functional reading (affordable care serving different classes)', 'Notes both readings apply to the same system rather than different facts'] },
    ],
    application: [
      { type: 'scenario', prompt: 'A classmate says Hong Kong’s mixed public/private hospital system is fair because everyone can get treated somewhere. Using both approaches from T02A, evaluate this claim.', model: 'The structural-functional view can support the claim: the system provides affordable medical services to low-income families and serves different classes’ needs. But the social-conflict view directly challenges ‘fair’ — it says the split leads to social inequality, because lower-income people cannot as easily access the higher-quality private care. A complete answer holds both readings of the same system rather than picking one and ignoring the other.', rubric: ['States the structural-functional reading', 'States the social-conflict reading', 'Treats both as readings of the same case, not competing facts'] },
    ],
    sourceRefs: [{ ref: 'soc.t02a.2026', location: 'pp7–10 educational system, gender-conflict theory, race-conflict theory, Hong Kong healthcare comparison' }],
  },
  {
    id: 'apss1a08-symbolic-interaction-approach',
    subject: 'APSS1A08', unit: 'soc.t02a', type: 'definition',
    title: 'The symbolic-interaction approach',
    tags: ['sociology', 'topic 02a', 'symbolic interaction'],
    practice: [
      { type: 'typed', prompt: 'Is the symbolic-interaction approach a micro-level or macro-level orientation?', accept: ['micro', 'micro-level'], explanation: 'It is explicitly described as a micro-level orientation, contrasting with the other two macro-level approaches.' },
      { type: 'mcq', prompt: 'Which example illustrates the symbolic-interaction approach in T02A?', options: ['Comparing higher-, middle- and lower-income countries', 'Studying inequality between racial categories', 'How children invent games on a school playground', 'Whether schooling benefits society as a whole'], answer: 2, explanation: 'T02A gives the playground and the homeless-pedestrian scenarios as its symbolic-interaction examples.' },
      { type: 'typed', prompt: 'According to T02A, human beings live in a world of ______, attaching meaning to virtually everything.', accept: ['symbols'], explanation: 'The symbolic-interaction approach describes human beings as living in a world of symbols.' },
    ],
    sourceRefs: [{ ref: 'soc.t02a.2026', location: 'p11 the symbolic-interaction approach' }],
  },
  {
    id: 'apss1a08-comparing-three-approaches',
    subject: 'APSS1A08', unit: 'soc.t02a', type: 'comparison',
    title: 'Comparing the three theoretical approaches',
    tags: ['sociology', 'topic 02a', 'high-yield'],
    practice: [
      { type: 'matching', prompt: 'Match each approach to its level of analysis.', pairs: [['Structural-functional', 'Macro-level'], ['Social-conflict', 'Macro-level'], ['Symbolic-interaction', 'Micro-level']], explanation: 'The comparison table gives macro-level for the first two and micro-level for symbolic-interaction.' },
      { type: 'mcq', prompt: 'Which approach asks ‘How do advantaged people protect their privileges?’', options: ['Structural-functional', 'Social-conflict', 'Symbolic-interaction', 'None of them'], answer: 1, explanation: 'This is one of the social-conflict approach’s three core questions in the comparison table.' },
      { type: 'explain', prompt: 'In one or two sentences, explain the main difference between a macro-level and a micro-level approach to society, using T02A’s own comparison.', model: 'A macro-level approach, like the structural-functional and social-conflict approaches, examines broad, society-wide structures and patterns. A micro-level approach, like symbolic-interaction, examines close-up, everyday interaction in specific situations instead.', rubric: ['Describes macro-level as broad/society-wide', 'Describes micro-level as close-up/interaction-level', 'Correctly assigns the three named approaches to the right level'] },
    ],
    sourceRefs: [{ ref: 'soc.t02a.2026', location: 'p12 comparing the three theoretical approaches' }],
  },

  /* ---------------- T02B: Modern contemporary theorists ---------------- */
  {
    id: 'apss1a08-goffman-dramaturgy',
    subject: 'APSS1A08', unit: 'soc.t02b', type: 'comparison',
    title: 'Goffman: dramaturgy, front stage and backstage',
    tags: ['sociology', 'topic 02b', 'Goffman', 'high-yield'],
    practice: [
      { type: 'matching', prompt: 'Match each Goffman term to its meaning.', pairs: [['Front stage', 'Where the performance takes place, e.g. a doctor in the operating room'], ['Backstage', 'Where people prepare for performance and behaviours not accepted elsewhere can occur'], ['Impression management', 'Calculating how others will respond to your actions']], explanation: 'These three terms define the dramaturgy framework in T02B.' },
      { type: 'mcq', prompt: 'A doctor changes out of scrubs and jokes with colleagues in the staff room before seeing patients. Which stage is this?', options: ['Front stage', 'Backstage', 'Neither', 'Both simultaneously'], answer: 1, explanation: 'The staff room, away from the patient-facing ‘personal front’, is backstage.' },
      { type: 'typed', prompt: 'What term describes individuals carefully considering how others will respond to their actions?', accept: ['impression management'], explanation: 'Goffman calls this ‘impression management’.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A student who stays quiet in lectures is very different with close friends at home. Using Goffman’s dramaturgy, explain this with front stage and backstage.', model: 'The lecture theatre is front stage: the student carries the ‘personal front’ expected of a student and behaves according to classroom norms and order. Home with close friends is backstage: preparation and relaxed behaviour that would not fit the front-stage role can happen there. Front stage and backstage are not fixed physical places — they are defined by who is watching and what is expected, which is why the same person performs differently in each setting.', rubric: ['Identifies the lecture as front stage with its expectations', 'Identifies home/friends as backstage', 'Notes the stage is defined by audience/expectation, not the physical location'] },
    ],
    sourceRefs: [{ ref: 'soc.t02b.2026', location: 'pp15–17 Goffman, dramaturgy, front stage and backstage' }],
  },
  {
    id: 'apss1a08-bourdieu-forms-of-capital',
    subject: 'APSS1A08', unit: 'soc.t02b', type: 'comparison',
    title: 'Bourdieu: forms of capital',
    tags: ['sociology', 'topic 02b', 'Bourdieu', 'high-yield'],
    practice: [
      { type: 'matching', prompt: 'Match each form of capital to its example.', pairs: [['Economic capital', 'Income, houses, cars, material goods'], ['Cultural capital', 'Language ability, taste in music, books, art'], ['Social capital', 'Connections with family and neighbours'], ['Symbolic capital', 'Gesture, posture, dressing']], explanation: 'T02B lists all four forms of capital with these examples.' },
      { type: 'mcq', prompt: 'A confident posture and tasteful dress at a job interview mainly illustrate which form of capital?', options: ['Economic', 'Cultural', 'Social', 'Symbolic'], answer: 3, explanation: 'Gesture, posture and dressing are named as symbolic capital.' },
      { type: 'typed', prompt: 'Which sociologist extended Marx’s concept of capital to non-material forms?', accept: ['Pierre Bourdieu', 'Bourdieu'], explanation: 'Pierre Bourdieu.' },
    ],
    sourceRefs: [
      { ref: 'soc.t02b.2026', location: 'p18 Bourdieu, economic and cultural capital' },
      { ref: 'soc.t02b.2026', location: 'p20 Bourdieu, social and symbolic capital' },
    ],
  },
  {
    id: 'apss1a08-bourdieu-cultural-capital-reproduction',
    subject: 'APSS1A08', unit: 'soc.t02b', type: 'sequence',
    title: 'Bourdieu: cultural capital and class reproduction',
    tags: ['sociology', 'topic 02b', 'Bourdieu'],
    practice: [
      { type: 'sequence', prompt: 'Put Bourdieu’s cultural-capital reproduction mechanism in order.', items: ['Elaborated vs restricted language code develops by social class', 'The restricted code limits academic development', 'Cultural capital transfers across generations', 'Class structures are reproduced and stratification strengthens'], explanation: 'T02B presents this as a numbered five-step sequence culminating in intergenerational stratification.' },
      { type: 'typed', prompt: 'What term describes the more developed vocabulary and sentence structure of higher-social-class children?', accept: ['elaborated language code'], explanation: 'T02B names this the ‘elaborated language code’, contrasted with the ‘restricted language code’.' },
      { type: 'mcq', prompt: 'What is the overall long-term effect Bourdieu describes?', options: ['Class differences disappear after one generation', 'Cultural and linguistic differences reproduce and strengthen class stratification across generations', 'Economic capital alone determines class', 'Language codes have no link to academic outcomes'], answer: 1, explanation: 'T02B’s final two steps are class reproduction and intergenerational stratification.' },
    ],
    sourceRefs: [{ ref: 'soc.t02b.2026', location: 'p19 Bourdieu, cultural capital and class reproduction through language codes' }],
  },
  {
    id: 'apss1a08-bourdieu-poverty-hong-kong',
    subject: 'APSS1A08', unit: 'soc.t02b', type: 'definition',
    title: 'Bourdieu’s capital in practice: extra-curricular poverty in Hong Kong',
    tags: ['sociology', 'topic 02b', 'Bourdieu', 'Hong Kong'],
    practice: [
      { type: 'typed', prompt: 'What percentage of students receive mark penalties for missing required extra-curricular activities?', accept: ['10%', '10', 'around 10%'], explanation: 'T02B states around 10%.' },
      { type: 'mcq', prompt: 'What is the main educational-inequality mechanism in this Hong Kong case?', options: ['Schools ban extra-curricular activities entirely', 'Students must pay additional fees for mandatory extra-curricular activities they may not be able to afford', 'All students receive identical extra-curricular access regardless of income', 'Academic penalties apply only to high-income students'], answer: 1, explanation: 'The case names a financial burden (mandatory fees) that some students cannot meet, followed by academic penalties for missing the activities it gates.' },
    ],
    application: [
      { type: 'scenario', prompt: 'Using Bourdieu’s forms of capital, explain why a ‘multiple intelligences’ policy requiring paid extra-curricular activities could disadvantage lower-income students even if the school treats every student the same on paper.', model: 'The policy assumes students can pay for extra-curricular activities — access depends on economic capital. Students without enough economic capital cannot join, so they lose the cultural and social capital those activities were meant to build (skills, taste, connections), and T02B’s figures show around 10% are then penalised on marks for missing them. A gap that starts as economic capital becomes an academic outcome, even though the policy applies the same rule to everyone.', rubric: ['Names economic capital as the initial barrier', 'Connects it to lost cultural/social capital opportunity', 'Explains how the mark penalty converts an economic gap into an academic outcome'] },
    ],
    sourceRefs: [{ ref: 'soc.t02b.2026', location: 'p21 Bourdieu, poverty in Hong Kong: extra-curricular activities' }],
  },
  {
    id: 'apss1a08-foucault-knowledge-power',
    subject: 'APSS1A08', unit: 'soc.t02b', type: 'definition',
    title: 'Foucault: knowledge and power',
    tags: ['sociology', 'topic 02b', 'Foucault'],
    practice: [
      { type: 'typed', prompt: 'What 1968 event influenced Foucault’s thinking on oppression?', accept: ['May 1968 Paris student protests', 'May 1968 protests', 'the Paris student protests'], explanation: 'The May 1968 Paris student protests.' },
      { type: 'mcq', prompt: 'What does Foucault mean by saying power often operates through knowledge claims?', options: ['Knowledge and power are unrelated', 'Scientific or expert knowledge can itself be a way power decides what counts as normal or true', 'Power only comes from government law', 'Knowledge always opposes power'], answer: 1, explanation: 'T02B says Foucault stresses caution because power often operates through knowledge claims, not that knowledge and power are separate.' },
    ],
    sourceRefs: [{ ref: 'soc.t02b.2026', location: 'pp22–23 Foucault, power dynamics and the relationship between knowledge and power' }],
  },
  {
    id: 'apss1a08-foucault-disciplinary-power-sexuality',
    subject: 'APSS1A08', unit: 'soc.t02b', type: 'sequence',
    title: 'Foucault: disciplinary power and the discourse of sexuality',
    tags: ['sociology', 'topic 02b', 'Foucault', 'high-yield'],
    practice: [
      { type: 'sequence', prompt: 'Order the four historical framings of sexuality in Foucault’s account.', items: ['Greek city-state: a practice, not an identity', 'Religious era: framed as sin', 'Medical period: pathologized as abnormal', 'Modern LGBT movement: a natural identity and lifestyle'], explanation: 'T02B presents these four stages in this historical order.' },
      { type: 'mcq', prompt: 'Which of the following is NOT listed as one of the ways discourses operate?', options: ['Constructing the targets', 'Classifying and ranking subjects as normal or abnormal', 'Eliminating the need for experts', 'Justifying social control'], answer: 2, explanation: 'T02B lists an INCREASED importance of experts as one of the ways discourses operate, not their elimination.' },
      { type: 'typed', prompt: 'In the Greek city-state, according to this account, homosexuality was treated as a ______ rather than an identity.', accept: ['practice'], explanation: 'T02B’s first historical stage names it a practice, not an identity.' },
    ],
    application: [
      { type: 'scenario', prompt: 'A classmate says being LGBT is ‘just a modern medical category.’ Using Foucault’s account of the discourse of sexuality, respond.', model: 'Foucault’s account traces at least four historical framings of the same behaviour: a practice in the Greek city-state, a sin in the religious era, a pathology in the medical period, and a natural identity in the modern LGBT movement. The medical framing is one historical stage among several, not a timeless truth — the modern framing later moved away from it toward the idea of a natural identity and lifestyle.', rubric: ['Names more than one historical stage', 'Notes the medical framing was one stage rather than the final truth', 'Avoids treating any single historical framing as natural or timeless'] },
    ],
    sourceRefs: [{ ref: 'soc.t02b.2026', location: 'pp24–25 Foucault, disciplinary power and the discourse of sexuality' }],
  },
  {
    id: 'apss1a08-giddens-love-history',
    subject: 'APSS1A08', unit: 'soc.t02b', type: 'sequence',
    title: 'Giddens: love and relationships through history',
    tags: ['sociology', 'topic 02b', 'Giddens'],
    practice: [
      { type: 'sequence', prompt: 'Order the three historical stages of love Giddens describes.', items: ['Pre-modern: all-encompassing sexual attraction', '18th–19th century: romance and life-long marriage', 'Modern: the pure relationship'], explanation: 'T02B presents these three stages in this order.' },
      { type: 'typed', prompt: 'Which author’s novels illustrate the 18th–19th century era of romance?', accept: ['Jane Austen'], explanation: 'Jane Austen’s novels are named as epitomising this era.' },
      { type: 'mcq', prompt: 'What characterises the ‘pure relationship’ stage?', options: ['Marriage arranged entirely by family duty', 'Emphasis on relationship quality, personal growth and reflexive questioning', 'A return to pre-modern all-encompassing attraction', 'Relationships defined only by financial security'], answer: 1, explanation: 'T02B names quality, self-actualisation, self-development and reflexive questioning as defining the pure relationship.' },
    ],
    sourceRefs: [{ ref: 'soc.t02b.2026', location: 'p26 Giddens, love and relationships through history' }],
  },
  {
    id: 'apss1a08-giddens-pure-relationship-critique',
    subject: 'APSS1A08', unit: 'soc.t02b', type: 'comparison',
    title: 'Giddens: the democratization of intimacy and its critics',
    tags: ['sociology', 'topic 02b', 'Giddens', 'high-yield'],
    practice: [
      { type: 'matching', prompt: 'Match each term to its meaning.', pairs: [['Democratization of intimacy', 'Democracy and negotiation spreading from politics into daily life'], ['The self as ‘incomplete project’', 'Something that can be created and changed, not fixed by inherited power'], ['Criticism of the pure relationship', 'Economy, ethnicity and age remain obstacles']], explanation: 'These are the three contrasts T02B’s closing Giddens slides ask students to keep separate.' },
      { type: 'mcq', prompt: 'According to the lecture, why does homosexual love illustrate the pure relationship particularly well?', options: ['It must follow a fixed traditional model', 'It need not meet marriage/fertility social-norm expectations and tends to be more democratic and negotiable', 'It is defined entirely by economic capital', 'It rejects any form of relationship negotiation'], answer: 1, explanation: 'T02B says homosexual love need not meet marriage/fertility expectations, has no typical model, and is more democratic and negotiable.' },
      { type: 'explain', prompt: 'What is the main criticism of Giddens’s ‘pure relationship’ idea, according to the lecture?', model: 'The lecture notes that factors such as economy, ethnicity and age still act as obstacles, so not everyone can equally reach a pure, democratic relationship — the ideal is not equally available to all, even if it describes a real cultural shift.', rubric: ['Names at least two of economy/ethnicity/age', 'Frames it as unequal access to the ideal', 'Distinguishes description of the ideal from the critique of it'] },
    ],
    sourceRefs: [{ ref: 'soc.t02b.2026', location: 'pp27–28 Giddens, the self, democratization of intimacy, homosexual love and criticism' }],
  },
];
