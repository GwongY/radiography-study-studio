# Previous owner-only hosting

The owner returned to public GitHub Pages on 2026-10-03. The repository is public
again and pushes to master verify and deploy outputs/ automatically to
https://gwongy.github.io/radiography-study-studio/.
The Sites deployment below remains a separate snapshot; do not publish future
edits there unless the owner explicitly requests it.

Published and confirmed succeeded on 2026-10-03. Its address, project and
deployment identifiers are kept locally in ignored `.sites-private/`, not here:
this repository is public.

Email updates now run as a weekly briefing pushed to the private pack repository
(see CLAUDE.md, "Git / deploy"). The earlier server-based mail prototype is
retired in ignored `work/.retired-private-mail/`; nothing imports or deploys it.

GitHub `GwongY/radiography-study-studio` was temporarily private and its public
Pages site removed, before the owner's explicit request to restore both.

Its access policy allows only the owner, with zero external
visitors and no groups. It uses ChatGPT sign-in; no connected Gmail access or
workspace plugins are enabled. It serves the existing static PWA, including all
study modules/models, without a PC server or Google Cloud application.

The managed source checkout is `.sites-private/` (ignored by the original repo).
Its `.openai/hosting.json` retains the exact project identity and `static.directory`
is `dist`. Source was pushed at commit
(see `.sites-private/`) using the native Site workflow. The
deployment (Explore starts closed,
cache v182).

For an explicitly requested update to this old Site, use the Sites hosting skill
and this SAME project.
Open/synchronise that checkout first, port the authorised app changes into dist,
preserve index.html as the app redirect, then run the Site
workflow and private deployment. Do not create a duplicate Site. On this Windows
host, prepend `C:\Program Files\Git\bin` to PATH for the process and set
`TAR_OPTIONS=--force-local` so the official packaging helper supports drive paths.
Keep archives outside the managed source checkout and credentials in stdin only.

Study progress and private question packs remain in each browser's existing
databases. A new origin does not automatically receive old progress. Export from
the old installed PWA and import through More (search more/settings/about) in the
new app. Keep the old installation until the new progress is verified. Downloaded
offline content on an authorised device cannot be remotely revoked by changing
server access; device locking remains the protection for those copies.
