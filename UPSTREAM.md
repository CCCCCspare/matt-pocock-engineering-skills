# Upstream source

- Repository: https://github.com/mattpocock/skills
- Commit: 3cca18b368ae95cdbdebbff572ccafa662551015
- Upstream package version: 1.2.3
- Retrieved: 2026-09-14
- Included roots: skills/engineering and skills/productivity
- Excluded roots: deprecated, in-progress, misc

Compatibility changes are intentionally narrow:

1. Flattened the two formal category folders into immediate children of the plugin's skills directory.
2. Removed Claude-only disable-model-invocation and argument-hint front matter.
3. Preserved equivalent OpenAI invocation policy in agents/openai.yaml.
4. Converted Skill tool and slash-command wording to bundled-skill wording.
5. Preferred AGENTS.md over CLAUDE.md when both are possible.
6. Added OpenAI default prompts for handoff and teach.
