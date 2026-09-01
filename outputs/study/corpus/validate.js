/*
 * Validation — every question must have a resolvable answer and every claim a
 * source that exists. validateCorpus() must stay at zero failures.
 *
 * Split out of study-data.js in phase 2026-09-01. outputs/study-data.js is
 * the barrel every importer still uses; nothing imports this file directly
 * except its siblings.
 */
import { SOURCE_FILES, PRIOR_KNOWLEDGE, DSE_PARTS } from './schema.js';
import { REVEAL_MODES, STRUCTURE_SETS, JOINT_MOVEMENTS } from './structures.js';
import { STUDY_ITEMS, questionsOf } from './corpus.js';

/* ------------------------------------------------------------------ *
 * Validation — every question must have a resolvable answer and an
 * explanation. The coverage report surfaces anything that fails.
 * ------------------------------------------------------------------ */

export function validateQuestion(q) {
  const problems = [];
  /* explain/scenario questions carry their explanation as the model answer. */
  const rationale = q.explanation || (q.type === 'explain' || q.type === 'scenario' ? q.model : '');
  if (!rationale || !String(rationale).trim()) problems.push('no explanation');
  switch (q.type) {
    case 'mcq':
    case 'comparison':
      if (!Array.isArray(q.options) || q.options.length < 2) problems.push('needs at least two options');
      if (typeof q.answer !== 'number' || q.answer < 0 || (q.options && q.answer >= q.options.length)) problems.push('answer index out of range');
      break;
    case 'typed':
    case 'cloze':
    case 'landmark':
      if (!Array.isArray(q.accept) || !q.accept.length || q.accept.some((a) => !String(a).trim())) problems.push('no accepted answers');
      break;
    case 'sequence':
      if (!Array.isArray(q.items) || q.items.length < 2) problems.push('needs at least two sequence items');
      break;
    case 'matching':
      if (!Array.isArray(q.pairs) || !q.pairs.length || q.pairs.some((p) => !Array.isArray(p) || p.length !== 2 || !p[0] || !p[1])) problems.push('malformed pairs');
      break;
    case 'diagram':
      if (!Array.isArray(q.labels) || q.labels.length < 2) problems.push('needs at least two labels');
      if (!q.diagram) problems.push('no diagram key');
      break;
    case 'explain':
    case 'scenario':
      if (!q.model || !String(q.model).trim()) problems.push('no model answer');
      if (!Array.isArray(q.rubric) || !q.rubric.length) problems.push('no rubric');
      break;
    case 'id3d':
    case 'laterality':
      if (!q.boneId) problems.push('no bone reference');
      break;
    case 'movement': {
      const mv = JOINT_MOVEMENTS[q.movementId];
      if (!mv) problems.push(`unknown movement "${q.movementId}"`);
      else {
        if (!Array.isArray(mv.moves) || !mv.moves.length) problems.push('movement has no meshes to move');
        if (!mv.pivot || !mv.pivot.mesh) problems.push('movement has no pivot mesh');
        if (!mv.axis || (!mv.axis.vector && !(mv.axis.from && mv.axis.to))) problems.push('movement has no resolvable axis');
        if (!Array.isArray(mv.range) || mv.range.length !== 2 || mv.range[0] >= mv.range[1]) problems.push('movement range is not a valid [min,max]');
      }
      break;
    }
    case 'structure': {
      const set = STRUCTURE_SETS[q.setId];
      if (!set) problems.push(`unknown structure set "${q.setId}"`);
      else if (!Array.isArray(set.members) || set.members.length < 2) problems.push('structure set needs at least two members');
      else if (set.members.some((mem) => !mem.mesh || !mem.label)) problems.push('structure set member missing mesh or label');
      if (q.reveal && !REVEAL_MODES.some((r) => r.id === q.reveal)) problems.push(`unknown reveal mode "${q.reveal}"`);
      break;
    }
    default:
      problems.push(`unknown question type "${q.type}"`);
  }
  if (!q.prompt || !String(q.prompt).trim()) problems.push('no prompt');
  return problems;
}

export function validateCorpus() {
  const failures = [];
  for (const item of STUDY_ITEMS) {
    if (!item.sourceRefs || !item.sourceRefs.length) failures.push({ itemId: item.id, qid: null, problems: ['no source reference'] });
    if (!item.lesson || !item.lesson.explanation) failures.push({ itemId: item.id, qid: null, problems: ['no teaching explanation'] });
    if (!item.practice || !item.practice.length) failures.push({ itemId: item.id, qid: null, problems: ['no practice questions'] });
    if (item.priorKnowledge) {
      const problems = [];
      if (!PRIOR_KNOWLEDGE[item.priorKnowledge.level]) problems.push('unknown prior-knowledge level');
      if (!['most', 'part'].includes(item.priorKnowledge.covers)) problems.push('prior knowledge needs covers: most | part');
      if (!DSE_PARTS[item.priorKnowledge.dsePart || 'core']) problems.push('unknown dsePart ' + item.priorKnowledge.dsePart);
      if (!item.priorKnowledge.syllabusRef) problems.push('prior knowledge with no syllabus reference');
      const beyond = item.priorKnowledge.beyond || [];
      if (!beyond.length) problems.push('prior knowledge with nothing listed beyond it');
      /* An item that opens on Practise with no question would open on nothing. */
      if (!item.practice || !item.practice.length) problems.push('prior-knowledge item has no practice questions to verify with');
      for (const [i, b] of beyond.entries()) {
        const line = typeof b === 'string' ? { t: b, src: null } : b;
        if (!line.t) problems.push('beyond line ' + (i + 1) + ' has no text');
        if (!line.src || !line.src.ref) problems.push('beyond line ' + (i + 1) + ' cites no source');
        else if (!SOURCE_FILES[line.src.ref]) problems.push('beyond line ' + (i + 1) + ' cites unknown source ' + line.src.ref);
        else if (!line.src.location) problems.push('beyond line ' + (i + 1) + ' cites no slide');
      }
      if (problems.length) failures.push({ itemId: item.id, qid: null, problems });
    }
    for (const q of questionsOf(item)) {
      const problems = validateQuestion(q);
      if (problems.length) failures.push({ itemId: item.id, qid: q.qid, problems });
    }
  }
  return failures;
}

/* Application questions live outside `practice` but still need a model + rubric. */
export function validateApplications() {
  const failures = [];
  for (const item of STUDY_ITEMS) {
    for (const [i, a] of (item.application || []).entries()) {
      const problems = [];
      if (!a.prompt) problems.push('no prompt');
      if (!a.model) problems.push('no model answer');
      if (!Array.isArray(a.rubric) || !a.rubric.length) problems.push('no rubric');
      if (problems.length) failures.push({ itemId: item.id, qid: `${item.id}!app${i}`, problems });
    }
  }
  return failures;
}
