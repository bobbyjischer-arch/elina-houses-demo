# Elina demo implementation plan
Spec: ../specs/2026-10-04-elina-demo.md
Global constraints: new isolated repo only; public demo approved; no subagents per developer; no real form sends; only public facts/assets.

### Task 1: Domain and source assets
Files: domain.js, projects.js, tests/domain.test.js, assets/images.json.
Interfaces: filterProjects(projects,type), toggleSelection(ids,id,validIds,max), readSelection(serialized,validIds,max), validateRequest(values), escapeHTML(text).
1. Write tests for filters, bounded toggle, corrupted/unknown storage, request validation and HTML escaping, with stub implementations. Run npm test; Expected: assertions fail due to missing behavior.
2. Implement functions, load truthful project fixtures and optimized real assets. Run npm test; Expected: all pass.
3. Commit domain/assets. Evidence recorded in ledger.

### Task 2: User interface
Files: index.html, styles.css, app.js, icons.js, tests/browser.cjs.
Interfaces consume Task 1 data and helpers; hashes #/, #/catalog, #/project/:id, #/compare, #/saved, #/about, #/request, #/sources.
1. Write browser tests for actual filtering, detail, lightbox, compare/reload, saved, multi-step form, no transport and mobile. Run against placeholder; Expected: first visible-page assertion fails.
2. Implement UI and responsive CSS. Run whole unit/browser suites; Expected: all pass.
3. Capture and inspect desktop/mobile screenshots, detail/catalog/form/compare states. Fix significant issues with regression tests. Commit.

### Task 3: Review and publish
Files: README.md, source notes, GitHub Pages workflow, verification record.
1. Self-review source/runtime against spec, because developer forbids unrequested subagents. Run whole tests; Expected: no failures.
2. Create new public repository and push raw text files via GitHub MCP. Verify commit and file retrieval.
3. Publish free preview via raw.githack commit URL; GitHub Pages optional requires administrative setting absent from MCP. Verify live GET and browser rendering, be explicit about third-party preview confirmation. Existing repositories remain untouched.
4. Final handoff: live URL, source repo, features and demo limitations.

Review focus: private-data persistence/transport, current-inventory misrepresentation, accessibility focus, mobile overflow, unknown routes/storage, public image rights, free preview limitations.
