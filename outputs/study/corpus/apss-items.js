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
    lesson: {
      explanation: 'Sociology is the systematic study of human society. Its characteristic point of view is the sociological perspective: seeing the general in the particular and the strange in the familiar, looking for general patterns in the behaviour of particular people, and asking how society shapes what people think and do. The lecture opens with partner selection to make that move visible. Love can feel entirely personal, yet age, schooling, race, ethnicity, sex and social class guide whom people select, while culture and gender roles shape what different people expect from a partner.',
      keyFacts: [
        'Sociology = the systematic study of human society.',
        'Sociological perspective: see the general in the particular and the strange in the familiar.',
        'Look for general patterns in the behaviour of particular people.',
        'Ask how society shapes what people think and do.',
        'Partner selection is guided by social factors including age, schooling, race, ethnicity, sex and social class.',
      ],
      examples: ['The lecture contrasts partner expectations across income groups, then asks how Hong Kong culture, property and family gender roles shape those expectations.'],
    },
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
    lesson: {
      explanation: 'A personal explanation begins with an individual decision or family story: choosing PolyU for a professional degree, missing another university, or following relatives’ advice. A sociological explanation does not erase those experiences; it places them inside patterned access to education. Topic 01 names age, social class and sex as factors affecting entry to college, then uses Hong Kong research to connect university participation with parental education, housing and family income. Its wider examples contrast the limited local-university access of underprivileged students with affluent students’ greater ability to study abroad or buy enrichment opportunities.',
      keyFacts: [
        'Personal explanations focus on individual choice and family influence.',
        'Sociological inquiry asks which social factors construct the pattern around those choices.',
        'The lecture names age, social class and sex as factors affecting the chance of entering college.',
        'Hong Kong examples connect educational opportunity with parental education, housing and family income.',
        'Unequal access also appears in overseas study and summer enrichment opportunities.',
      ],
      examples: ['“I chose PolyU for a professional degree” is a personal account; asking who is able to reach tertiary education and why is the sociological account.'],
    },
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
    lesson: {
      explanation: 'The global perspective studies the larger world and a society’s place in it. The position of a society in the world system affects everyone within it. Topic 01 groups countries by overall standard of living into higher-, middle- and lower-income countries, then explains why the comparison matters: geographical location shapes lives, electronic technology connects cities and cultures, higher-income countries influence language, music and technology, corporations make and market goods worldwide, and financial and employment changes cross borders. Its trade-war example links production moving between countries to manufacturing employment and political responses.',
      keyFacts: [
        'Global perspective = study of the larger world and our society’s place in it.',
        'A society’s position in the world system affects people inside that society.',
        'The lecture distinguishes higher-, middle- and lower-income country groups by overall standard of living.',
        'Technology, culture, trade, finance and employment connect events across societies.',
        'What happens elsewhere can change everyday opportunities at home.',
      ],
      examples: ['K-pop’s influence in Hong Kong illustrates cultural connection; the trade-war case illustrates economic connection.'],
    },
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
    lesson: {
      explanation: 'Topic 01 presents sociological work as a four-step path from evidence to change. Research first discovers a patterned inequality. Policy makers then recognise the issue, legal reform changes enforceable rights, and the broader impact includes a more active and critical social awareness. The lecture’s worked case is Lenore Weitzman’s finding of a substantial post-divorce income decline among women, followed by state recognition, stronger marital-property and child-support rules, and wider public understanding.',
      keyFacts: ['Research discovery → policy recognition → legal reform → broader impact.', 'The worked example begins with post-divorce income inequality.', 'The final impact is not only a law; it also includes more critical social awareness.'],
      examples: ['Weitzman’s research is used as the lecture’s concrete example of the four-step sequence.'],
    },
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
    lesson: {
      explanation: 'Karl Marx treats class conflict as the engine of human history. Topic 01 divides the class structure into the bourgeoisie, the capitalist class, and the proletariat, the exploited workers. Workers become conscious of their conditions, unite against their oppressors and, through revolution, establish a classless society. The lecture also separates Marxism from communism: it says Marx did not design the later political system called communism. Max Weber is introduced through a contrast over religion. Against an explanation that makes economics the sole driver, Weber places religious beliefs and practices at the centre of a case of social transformation, showing that ideas can reshape economic and social structures.',
      keyFacts: [
        'Marx: class conflict is the engine of human history.',
        'Bourgeoisie = capitalist class; proletariat = exploited workers.',
        'Class consciousness and struggle lead, in Marx’s account, towards revolution and a classless society.',
        'The lecture distinguishes Marxism from the later political system called communism.',
        'Weber’s contrast shows religion and ideas can drive social change rather than economics alone.',
      ],
      examples: ['The Weber slide contrasts a traditional religious emphasis on institutional membership with religion acting as a force that transforms economic and social life.'],
    },
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
    lesson: {
      explanation: 'A theory is a statement of how and why specific facts are related; it explains social behaviour in the real world and is tested by gathering evidence with social research methods. A theoretical approach is broader: the basic image of society that guides thinking and research. T02A works with three major theoretical approaches — the structural-functional approach, the social-conflict approach and the symbolic-interaction approach — each giving a different basic image of what society is and how to study it.',
      keyFacts: [
        'Theory = a statement of how and why specific facts are related, explaining social behaviour and tested against evidence.',
        'Theoretical approach = the basic image of society that guides thinking and research.',
        'Three major theoretical approaches: structural-functional, social-conflict, symbolic-interaction.',
      ],
    },
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
    lesson: {
      explanation: 'The structural-functional approach frames society as a complex system of interconnected parts working together to promote stability and social order. Stable patterns of social behaviour (social structure) form society’s framework, and each part serves functions that contribute to how society operates — a framework developed by Comte, Spencer and Durkheim, with Spencer comparing society to the human body and Durkheim applying it to study suicide. The approach distinguishes manifest functions, the recognised and intended consequences of a social pattern, from latent functions, its unrecognised and unintended consequences. In the higher-education example, the manifest function is giving young people the skills to work after graduation; latent functions include acting as a ‘marriage broker’ for young people of similar background, and — where jobs are scarce — keeping large numbers of young people out of the labour market. Not every effect is beneficial: T02A’s globalization example sets social functions (lower production costs, higher profits, new markets) against social dysfunctions (job losses as production moves overseas, local economic disruption, community instability).',
      keyFacts: [
        'Structural-functional approach: society as an interconnected system of parts promoting stability and social order.',
        'Social structure = stable patterns of social behaviour forming society’s framework; each part serves functions that keep society operating.',
        'Developed by Comte, Spencer and Durkheim — Spencer compared society to the human body, Durkheim studied suicide with the framework.',
        'Manifest functions = recognised, intended consequences; latent functions = unrecognised, unintended consequences.',
        'Higher-education example: manifest = job skills; latent = a ‘marriage broker’ effect, and keeping young people out of a scarce labour market.',
        'Social dysfunction: globalization brings functions (lower costs, higher profits, new markets) alongside dysfunctions (job losses, local disruption, community instability).',
      ],
    },
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
    lesson: {
      explanation: 'The social-conflict approach is a framework for building theory that sees society as an arena of inequality generating conflict and change. It rejects the idea that social structure promotes the operation of society as a whole, focusing instead on how social patterns benefit some people while hurting others. T02A lists class, race, ethnicity, gender and age as the factors it investigates in a society’s unequal distribution of money, power and education, and frames the resulting conflict as ongoing struggle between dominant and disadvantaged categories of people: rich versus poor, white people versus people of colour, men versus women.',
      keyFacts: [
        'Social-conflict approach: society as an arena of inequality that generates conflict and change.',
        'Rejects the idea that social structure promotes the operation of society as a whole.',
        'Focuses on how social patterns benefit some people while hurting others.',
        'Investigates how class, race, ethnicity, gender and age link to unequal distribution of money, power and education.',
        'Frames conflict as ongoing struggle between dominant and disadvantaged categories: rich vs poor, white people vs people of colour, men vs women.',
      ],
    },
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
    lesson: {
      explanation: 'T02A applies the social-conflict approach through four worked cases. In education, the structural-functional view says schooling benefits everyone by fitting students to their ability and academic results; the social-conflict view says track placement often has less to do with talent than with social background — rich students reach higher tracks and, through them, university and high-income careers, while poor children end up in lower tracks without the resources to prepare for university, and later take lower-income jobs. Gender-conflict theory (feminist theory) examines inequality and conflict between women and men: men are considered ‘head of household’, hold most positions of power, earn more and dominate the entertainment industry, while women more often hold a secondary household role, are less represented in leadership, earn less for the same work and are underrepresented in entertainment. Race-conflict theory studies inequality and conflict between racial and ethnic categories: white people hold social advantages over people of colour — higher incomes, more schooling, better health — while the approach also points out the contributions people of colour have made to society’s development. Hong Kong’s mixed hospital system supplies a local case: the social-conflict view says the split between cheaper, lower-quality public care and more expensive, higher-quality private care leads to inequality, since lower-income people cannot as easily access good medical treatment; the structural-functional view says the same system still provides affordable services meeting the needs of different classes.',
      keyFacts: [
        'Education: structural-functional says schooling benefits everyone by fitting ability; social-conflict says track placement reflects social background, not just talent.',
        'Gender-conflict (feminist) theory: men hold more power, higher earnings and entertainment dominance; women hold more secondary roles, less leadership representation, lower same-work earnings and entertainment underrepresentation.',
        'Race-conflict theory: white people hold social advantages (income, schooling, health) over people of colour, while people of colour’s contributions to society are also recognised.',
        'Hong Kong healthcare: social-conflict view says the public/private split produces unequal access to good treatment; structural-functional view says it still serves different classes’ needs affordably.',
      ],
    },
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
    lesson: {
      explanation: 'The symbolic-interaction approach is a micro-level orientation, contrasting with the macro-level focus of the structural-functional and social-conflict approaches. Where those approaches examine broad social structures, symbolic interactionism provides a close-up focus on social interaction in specific situations. It sees society as the product of everyday interactions between individuals: human beings live in a world of symbols, attaching meaning to virtually everything. T02A illustrates this with two everyday scenarios: how children invent games on a school playground, and how pedestrians respond to homeless people they pass on the street.',
      keyFacts: [
        'Symbolic-interaction approach = a micro-level orientation, contrasting with the macro-level structural-functional and social-conflict approaches.',
        'Provides a close-up focus on social interaction in specific situations, rather than broad social structures.',
        'Sees society as the product of everyday interactions; people live in a world of symbols, attaching meaning to almost everything.',
        'Lecture examples: children inventing games on a school playground; pedestrians responding to homeless people on the street.',
      ],
    },
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
    lesson: {
      explanation: 'T02A closes with a comparison table across all three approaches. Structural-functional is macro-level: it pictures society as a stable system of interrelated parts where members generally agree about what is morally right and wrong, and it asks how society is held together, how its major parts link, and what each part does to help society work. Social-conflict is also macro-level: it pictures society as a system of inequality based on class, gender, race and similar divisions that benefits some categories of people and harms others, with inequality causing the conflicts that lead to social change, and it asks how society divides people, how advantaged people protect their privileges, and how disadvantaged people challenge the system. Symbolic-interaction is micro-level: it pictures society as an ongoing process in which people interact in countless settings through symbolic communication, so the reality people experience is variable and changing, and it asks how people experience society, how people shape society, and how behaviour and meaning change from person to person and from one situation to another.',
      keyFacts: [
        'Structural-functional: macro-level; a stable system of interrelated parts with general moral agreement; asks how society holds together and what each part does.',
        'Social-conflict: macro-level; a system of inequality that benefits some and harms others, with inequality driving conflict and change; asks how society divides people and how privilege is protected or challenged.',
        'Symbolic-interaction: micro-level; an ongoing process built from symbolic communication in countless settings, with a variable, changing reality; asks how people experience and shape society.',
      ],
    },
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
    lesson: {
      explanation: 'Erving Goffman, a Canadian-American sociologist, viewed social interaction through dramaturgy — the metaphor of theatrical performance. People are calculative, strategic actors who perform consciously in social situations, engaging in ‘impression management’ by carefully considering how others will respond to their actions; if life is like a show, every interaction becomes a performance where people strategically present themselves. Front stage is where the performance takes place: it sets up expectations, carries a ‘personal front’ — items the audience expects performers to carry with them, such as doctors in the operating room or lawyers in court — and behaviour there is shaped by social norm and order, so a successful social actor knows what to do in different places and situations. Backstage is where people prepare for the front-stage performance, and where behaviours not accepted by others or society can occur. Front stage and backstage are not fixed places: when someone visits your home, it shifts from a backstage to a front stage. The audience realises actors perform differently at the two stages but usually does not challenge the reliability of others’ front-stage behaviour, and will often ignore an actor doing something not quite suitable for the front stage.',
      keyFacts: [
        'Erving Goffman: Canadian-American sociologist; dramaturgy = viewing social interaction through the metaphor of theatrical performance.',
        'People are calculative, strategic actors engaging in ‘impression management’ — considering how others will respond.',
        'Front stage = where performance happens, sets expectations, carries a ‘personal front’ (e.g. doctors in the operating room, lawyers in court); behaviour shaped by social norm and order.',
        'Backstage = where people prepare for front-stage performance, and where socially unaccepted behaviour can occur.',
        'Front stage and backstage are not fixed places — e.g. a home shifts from backstage to front stage when a visitor arrives.',
        'The audience knows actors behave differently at the two stages but usually does not challenge front-stage reliability, and often ignores minor front-stage lapses.',
      ],
    },
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
    lesson: {
      explanation: 'Pierre Bourdieu, a French sociologist, extended Marx’s concept of capital to emphasise non-material forms. Economic capital is physical resources that can be directly transformed into money, including income, houses, cars and material goods. Cultural capital is internalised cultural background, knowledge and skills, shown through language abilities, behaviours and taste in music, books and artwork. Social capital is constructed by social relationships — connections and interactions between individuals, including family members and neighbours — and a cohesive community and family create social capital. Symbolic capital shows up in gesture, posture and dressing. Bourdieu’s framework demonstrates how these different forms of capital interact and influence a person’s social position.',
      keyFacts: [
        'Bourdieu extended Marx’s concept of capital to include non-material forms.',
        'Economic capital = physical resources directly transformable to money (income, houses, cars, material goods).',
        'Cultural capital = internalised cultural background, knowledge and skills — shown in language ability, behaviours and taste (music, books, art).',
        'Social capital = built from social relationships and connections (e.g. family, neighbours); a cohesive community/family creates social capital.',
        'Symbolic capital = gesture, posture and dressing.',
        'These forms of capital interact and together influence a person’s social position.',
      ],
    },
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
    lesson: {
      explanation: 'Bourdieu traces how cultural capital reproduces class across generations. Children from higher social classes develop an ‘elaborated language code’, while lower-class children develop a ‘restricted language code’ — the two differ in vocabulary and sentence structure. The restricted language code creates limitations in thinking and academic development for teenagers from lower social classes. Cultural capital then passes from one generation to the next through these educational and linguistic advantages, and the resulting differences help maintain existing class structures. The cycle reinforces and strengthens social stratification across generations.',
      keyFacts: [
        'Higher-class children develop an ‘elaborated language code’; lower-class children develop a ‘restricted language code’ (different vocabulary and sentence structure).',
        'The restricted language code limits thinking and academic development for lower-class teenagers.',
        'Cultural capital transfers across generations through educational and linguistic advantage.',
        'These educational/linguistic differences help maintain (reproduce) existing class structures.',
        'This is a self-reinforcing cycle: each generation’s pattern strengthens the class stratification of the next.',
      ],
    },
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
    lesson: {
      explanation: 'T02B grounds Bourdieu’s capital theory in a Hong Kong case. Half of teenagers’ schools implement a ‘multiple intelligences’ policy that assumes students can join extra-curricular activities. Forty percent of affected students are unable to complete the required extra-curricular activities, and thirty percent of teenagers report their academic results were negatively affected; around ten percent of students receive mark penalties for missing required activities. The mechanism has two parts: a financial burden, because students must pay additional fees for mandatory extra-curricular activities, and academic penalties for missing them — together an educational inequality, since limited access to extra-curricular activities affects overall academic performance.',
      keyFacts: [
        '50% of teenagers’ schools implement a ‘multiple intelligences’ policy affecting students.',
        '40% of affected students are unable to complete required extra-curricular activities.',
        '30% of teenagers report their academic results were negatively affected.',
        'Around 10% of students receive mark penalties for missing required activities.',
        'Financial burden (fees for mandatory activities) plus academic penalties combine into an educational inequality tied to limited access.',
      ],
    },
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
    lesson: {
      explanation: 'Michel Foucault, a French philosopher and social theorist, studied power dynamics and oppression. He was influenced by the May 1968 Paris student protests against various forms of oppression in sexuality, gender and education, and his work focuses on explaining the root causes of oppression and examining how power operates in society. Foucault critically rethinks the relationship between knowledge and power: he does not completely reject scientific knowledge, but stresses the importance of being cautious, because power often operates through knowledge claims. He challenges social conventions and norms by analysing how power operates — for example, asking how sexuality becomes a ‘problem’, and how it became a medical problem (when homosexual love was previously treated as a disease) before later becoming de-medicalized.',
      keyFacts: [
        'Michel Foucault: French philosopher and social theorist who studied power dynamics and oppression.',
        'Influenced by the May 1968 Paris student protests against oppression in sexuality, gender and education.',
        'His work explains the root causes of oppression and examines how power operates in society.',
        'Foucault does not completely reject scientific knowledge, but stresses caution, because power often operates through knowledge claims.',
        'Worked example: how sexuality became a medical ‘problem’ (homosexual love once treated as a disease) and later became de-medicalized.',
      ],
    },
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
    lesson: {
      explanation: 'Foucault treats knowledge as a form of disciplinary power: a form of social control that shapes society’s understanding and behaviour through scientific and institutional authority. Scientific disciplines shape dominant ideas through state institutions, family structures, hospitals and therapeutic practices, determining what can be said, by whom, and how. The understanding of sexuality has transformed through different power structures across history: in the Greek city-state, homosexuality was a practice, not an identity; the religious era framed it as sin; the medical period pathologized it as abnormal; the modern LGBT movement treats it as a natural identity and lifestyle. Sexuality is part of the social order and everyday life rather than purely an individual choice: it is built into institutions (state law, medical clinics, hospitals, family), cultural apparatus (mass media, advertising, the educational system) and the texture of everyday life (norms, customs). Discourses work by constructing their targets, classifying and ranking subjects as normal or abnormal, framing understanding through internalisation, justifying social control, and increasing the importance of experts and expert knowledge.',
      keyFacts: [
        'Knowledge functions as disciplinary power: social control shaping understanding/behaviour through scientific and institutional authority.',
        'Scientific disciplines shape dominant ideas through state institutions, family, hospitals and therapeutic practices — determining what can be said, by whom and how.',
        'The discourse of sexuality shifted through four historical stages: Greek city-state (a practice, not an identity) → religious era (sin) → medical period (pathologized as abnormal) → modern LGBT movement (a natural identity and lifestyle).',
        'Sexuality is presented as part of social order, not pure individual choice — built into institutions (law, medicine, family), cultural apparatus (media, advertising, education) and everyday norms/customs.',
        'Discourses work by constructing targets, classifying/ranking subjects (normal vs abnormal), framing understanding through internalisation, justifying social control, and increasing the importance of experts.',
      ],
    },
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
    lesson: {
      explanation: 'Anthony Giddens traces how love and relationships evolved across historical periods. In the pre-modern era, love was characterised by all-encompassing sexual attraction with the potential to disrupt social order — a break with routine and duty. In the 18th and 19th centuries, romance emerged, epitomised in works like Jane Austen’s novels: life-long marriage coupled with parenthood, with life-course trajectories serving as a potential avenue for controlling the future and as a form of psychological security. In modern societies, the ‘pure relationship’ emerges, emphasising relationship quality and personal growth — a focus on the nature and quality of the relationship, centred on self-actualisation and self-development, and characterised by reflexive questioning such as ‘is everything all right?’',
      keyFacts: [
        'Pre-modern era: love = all-encompassing sexual attraction, potentially disruptive to social order, a break from routine and duty.',
        '18th–19th century: romance (e.g. Jane Austen’s novels) — life-long marriage plus parenthood, a way to control the future and a form of psychological security.',
        'Modern societies: the ‘pure relationship’ — emphasis on relationship quality and personal growth, self-actualisation, and reflexive questioning of whether the relationship is ‘all right’.',
      ],
    },
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
    lesson: {
      explanation: 'Since the 20th century, ‘the self’ is no longer directed only by inherent social, cultural and economic power — Giddens treats it as an ‘incomplete project’ that can be created and changed. The concept of ‘democracy’ and ‘negotiation’ has spread from politics into daily life: equality, democracy and negotiation become important elements of a close relationship, a ‘democratization of intimacy’. In the pure relationship, maintaining the relationship depends on satisfying needs. Homosexual love illustrates this: it need not meet the expectations of social norms such as marriage and fertility, has no ‘typical model’ to follow, and tends toward a more democratic and negotiable relationship — more independent finances, shared housework, and more ‘open’ relationships such as the ‘love triangle’. Giddens’s own idea is also criticised: economy, ethnicity and age remain obstacles that still prevent people from reaching a fully pure and democratic relationship.',
      keyFacts: [
        'Since the 20th century, ‘the self’ is treated as an ‘incomplete project’ that can be created and changed, not fixed by inherited social/cultural/economic power.',
        '‘Democratization of intimacy’: democracy and negotiation spread from politics into daily life, making equality and negotiation central to close relationships.',
        'Unlike earlier eras’ external duties, the pure relationship’s own survival rests on whether it keeps satisfying both partners’ needs.',
        'Homosexual love illustrates the pure relationship: no obligation to meet marriage/fertility norms, no ‘typical model’, more independent finances, shared housework and more ‘open’ relationships.',
        'Criticism: economy, ethnicity and age remain obstacles preventing people from reaching a fully pure, democratic relationship.',
      ],
    },
    practice: [
      { type: 'matching', prompt: 'Match each term to its meaning.', pairs: [['Democratization of intimacy', 'Democracy and negotiation spreading from politics into daily life'], ['The self as ‘incomplete project’', 'Something that can be created and changed, not fixed by inherited power'], ['Criticism of the pure relationship', 'Economy, ethnicity and age remain obstacles']], explanation: 'These are the three contrasts T02B’s closing Giddens slides ask students to keep separate.' },
      { type: 'mcq', prompt: 'According to the lecture, why does homosexual love illustrate the pure relationship particularly well?', options: ['It must follow a fixed traditional model', 'It need not meet marriage/fertility social-norm expectations and tends to be more democratic and negotiable', 'It is defined entirely by economic capital', 'It rejects any form of relationship negotiation'], answer: 1, explanation: 'T02B says homosexual love need not meet marriage/fertility expectations, has no typical model, and is more democratic and negotiable.' },
      { type: 'explain', prompt: 'What is the main criticism of Giddens’s ‘pure relationship’ idea, according to the lecture?', model: 'The lecture notes that factors such as economy, ethnicity and age still act as obstacles, so not everyone can equally reach a pure, democratic relationship — the ideal is not equally available to all, even if it describes a real cultural shift.', rubric: ['Names at least two of economy/ethnicity/age', 'Frames it as unequal access to the ideal', 'Distinguishes description of the ideal from the critique of it'] },
    ],
    sourceRefs: [{ ref: 'soc.t02b.2026', location: 'pp27–28 Giddens, the self, democratization of intimacy, homosexual love and criticism' }],
  },
];
