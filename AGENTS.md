# Radiography Study Studio — agent guide

The working guide for this repo is **[CLAUDE.md](CLAUDE.md)**. Read it first.
Everything an agent needs is there: where each behaviour lives, the hard rules
(source traceability, no build step, the SW SHELL rule), and the
after-every-edit verifier list.

This file exists only because `AGENTS.md` is the name several tools look for.

It is deliberately a pointer rather than a copy. It started as a byte-for-byte
duplicate of CLAUDE.md — 148 identical lines — and that is the failure mode
worth avoiding: the guide changes most weeks, a copy does not announce when it
falls behind, and the tool that read the stale half is confidently wrong with
no way to tell. One file, one truth.
