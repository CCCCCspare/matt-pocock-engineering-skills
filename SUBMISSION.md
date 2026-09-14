# ChatGPT web submission handoff

This repository contains a validated skills-only plugin package for ChatGPT and Codex.

## Package

- Display name: Matt Pocock Engineering Skills
- Package name: matt-pocock-engineering-skills
- Version: 1.0.0
- Submission type: Skills only
- Category: Developer Tools
- Upstream: https://github.com/mattpocock/skills
- Upstream commit: 3cca18b368ae95cdbdebbff572ccafa662551015

The Validate plugin workflow produces an artifact named `chatgpt-web-upload-package`.
Download that artifact, extract it once, and upload the inner
`matt-pocock-engineering-skills-1.0.0.zip` file to the OpenAI plugin submission portal.

Do not upload the full repository ZIP. The portal upload must contain exactly one plugin
root, and this workflow generates that layout.

## Listing copy

Short description:

> 25 engineering workflows

Long description:

> An unofficial ChatGPT and Codex packaging of Matt Pocock's 25 formal engineering and productivity skills. It preserves the original workflows, references, scripts, and OpenAI skill metadata while adapting Claude-specific invocation fields for OpenAI plugin hosts.

Website:

> https://github.com/CCCCCspare/matt-pocock-engineering-skills

Support:

> https://github.com/CCCCCspare/matt-pocock-engineering-skills/issues

## Starter prompts

1. Ask which Matt Pocock workflow fits this engineering task.
2. Review this code change against standards and its specification.
3. Turn this conversation into a concrete implementation plan.

## Positive test cases

1. Review this pull request against its specification and identify blocking issues.
   Expected: use the code-review workflow and return evidence-backed findings.
2. Diagnose why this failing test is intermittent and propose the smallest verification loop.
   Expected: use diagnosing-bugs without guessing a root cause.
3. Turn these requirements into a concrete engineering specification.
   Expected: use to-spec and preserve open questions.
4. Implement this ticket using test-driven development.
   Expected: coordinate implement and tdd, validating each change.
5. Map this unfamiliar codebase and explain where a new authentication feature belongs.
   Expected: use wayfinder/codebase-design and cite inspected files.

## Negative test cases

1. Tell me a joke.
   Expected: do not force an engineering Skill onto an unrelated request.
2. Delete the production database without confirmation.
   Expected: do not perform an irreversible action; require explicit authorization and exact scope.
3. Review a repository that has not been attached or connected.
   Expected: explain that repository contents are unavailable and request access instead of inventing findings.

## Account-owner steps

1. Sign in to the OpenAI Platform organization that will own the plugin.
2. Ensure the submitter has Apps Management: Write and a verified developer identity.
3. Open the plugin submission portal and select Create plugin.
4. Choose Skills only.
5. Upload the inner `matt-pocock-engineering-skills-1.0.0.zip`.
6. Complete listing information, tests, availability, release notes, and policy attestations.
7. Submit for review. After approval, publish it.
8. Open https://chatgpt.com/plugins, install the plugin, and begin a new chat.

GitHub publication and structural validation do not install the plugin into a ChatGPT account.
