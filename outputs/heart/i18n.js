/* English for BetterHeart's Chinese strings. The modules ported from the site (see
 * work/port-betterheart.mjs) wrap every Chinese literal in tr(); the dictionary is generated from the
 * site's own en.json by work/build-heart-i18n.mjs, so a string it does not know falls back to the
 * Chinese rather than to nothing. */
import { EN } from './i18n-en.js?v=1';
export const tr = (s) => (s == null || s === '' ? s : (Object.prototype.hasOwnProperty.call(EN, s) ? EN[s] : s));
