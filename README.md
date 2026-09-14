# Matt Pocock Engineering Skills

Unofficial ChatGPT/Codex-compatible packaging of the 25 formal skills from Matt Pocock's Skills for Real Engineers repository.

## Contents

- One skills-only plugin: Matt Pocock Engineering Skills
- 25 immediate child skill directories
- Original references, scripts, and agents/openai.yaml metadata
- Portable Agent Plugins manifest plus Codex compatibility manifest
- Repository marketplace for local or Git-backed installation
- Automated structural validation through GitHub Actions

## Source

Upstream: https://github.com/mattpocock/skills
Pinned commit: 3cca18b368ae95cdbdebbff572ccafa662551015
Upstream package version observed: 1.2.3

Only skills under upstream skills/engineering and skills/productivity are included. deprecated, in-progress, misc, tests, examples, and repository-only material are excluded.

## Marketplace layout

The marketplace catalog is at .agents/plugins/marketplace.json. The plugin package is at plugins/matt-pocock-engineering-skills.

For a local Codex/ChatGPT desktop marketplace:

1. Add this repository as a marketplace source.
2. Refresh or restart the desktop app.
3. Open Plugins, select CCCCCspare Personal Plugins, and install Matt Pocock Engineering Skills.

ChatGPT account and workspace availability depends on plan, product surface, and administrator settings. Repository publication does not itself install the plugin into a ChatGPT account.

## Validation

GitHub Actions runs scripts/validate-plugin.mjs. See VALIDATION.md for the checked rules and status.

## Attribution

The upstream work is Copyright Matt Pocock and licensed under the MIT License. This repository is an unofficial compatibility package maintained by CCCCCspare and is not represented as an official Matt Pocock or OpenAI release.
