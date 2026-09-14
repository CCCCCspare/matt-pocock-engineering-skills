# Validation report

Plugin: Matt Pocock Engineering Skills
Version: 1.0.0
Source commit: 3cca18b368ae95cdbdebbff572ccafa662551015

## Structural validation

- PASS: Portable root plugin.json exists and uses the Agent Plugins 1.0.0 schema.
- PASS: Codex compatibility manifest exists at .codex-plugin/plugin.json.
- PASS: Plugin name, version, description, author, interface, category, capabilities, prompts, and asset paths are present.
- PASS: Display name is 30 characters; short description is within the final-directory limit.
- PASS: skills contains exactly 25 immediate child directories.
- PASS: Every skill contains SKILL.md and agents/openai.yaml.
- PASS: Skill names are unique and match their directory names.
- PASS: Every skill has non-empty name, description, and instruction body.
- PASS: OpenAI agent metadata has interface.display_name and interface.short_description.
- PASS: Relative files referenced by each SKILL.md are present.
- PASS: Plugin-skill combined identities are at most 64 characters.
- PASS: Claude-only front-matter fields were removed and invocation policy was preserved in agents/openai.yaml.
- PASS: Marketplace entry points to the packaged plugin.
- PASS: No deprecated, in-progress, misc, test, example, MCP, app, or screenshot configuration is bundled.
- PASS: MIT license and upstream attribution are included.

## Automated check

The same structural checks run in GitHub Actions through scripts/validate-plugin.mjs.

## Remaining account-level checks

- NOT RUN: OpenAI submission-portal safety/security scan. It requires the owner to upload or submit the package while signed in.
- NOT RUN: ChatGPT account installation. It requires the owner to select Install in a supported Plugins interface.
- NOT CLAIMED: Public-directory approval. Packaging and GitHub publication do not grant approval automatically.
