import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const plugin = path.join(root, "plugins", "matt-pocock-engineering-skills");
const expected = [
  "ask-matt","code-review","codebase-design","diagnosing-bugs","domain-modeling",
  "grill-with-docs","implement","improve-codebase-architecture","prototype","research",
  "resolving-merge-conflicts","setup-matt-pocock-skills","tdd","to-spec","to-tickets",
  "triage","wayfinder","wizard","grill-me","grilling","handoff","teach",
  "to-questionnaire","wait-what","writing-for-agents"
].sort();
const failures = [];
const pass = (condition, message) => { if (!condition) failures.push(message); };
const read = (p) => fs.readFileSync(p, "utf8");

const manifestPath = path.join(plugin, "plugin.json");
const compatPath = path.join(plugin, ".codex-plugin", "plugin.json");
pass(fs.existsSync(manifestPath), "Missing portable plugin.json");
pass(fs.existsSync(compatPath), "Missing .codex-plugin/plugin.json");
const manifest = JSON.parse(read(manifestPath));
const compat = JSON.parse(read(compatPath));
pass(manifest.$schema === "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json", "Wrong portable schema");
pass(manifest.name === "matt-pocock-engineering-skills", "Wrong plugin name");
pass(/^\d+\.\d+\.\d+$/.test(manifest.version), "Version is not semantic");
pass(Boolean(manifest.description), "Missing plugin description");
pass(Boolean(manifest.author && manifest.author.name), "Missing author.name");
const oi = manifest.extensions && manifest.extensions["com.openai"];
const ui = oi && oi.interface;
pass(Boolean(ui), "Missing extensions.com.openai.interface");
pass(ui && ui.displayName === "Matt Pocock Engineering Skills", "Wrong display name");
pass(ui && ui.displayName.length <= 30, "Display name exceeds 30 characters");
pass(ui && ui.shortDescription.length <= 30, "Short description exceeds 30 characters");
pass(ui && ui.developerName === manifest.author.name, "Developer and author names differ");
pass(ui && ui.category === "Developer Tools", "Wrong category");
pass(Array.isArray(ui && ui.capabilities) && ui.capabilities.length <= 20, "Invalid capabilities");
pass(Array.isArray(ui && ui.defaultPrompt) && ui.defaultPrompt.length <= 3, "Invalid default prompts");
for (const prompt of (ui && ui.defaultPrompt) || []) pass(prompt.length <= 128, "Starter prompt exceeds 128 characters");
for (const asset of [ui && ui.logo, ui && ui.composerIcon]) {
  pass(typeof asset === "string" && asset.startsWith("./assets/"), "Invalid asset path");
  if (asset) pass(fs.existsSync(path.join(plugin, asset)), "Missing asset " + asset);
}
pass(compat.name === manifest.name && compat.version === manifest.version, "Compatibility manifest identity differs");
pass(compat.skills === "./skills/", "Compatibility skills path is wrong");

const skillsRoot = path.join(plugin, "skills");
const actual = fs.readdirSync(skillsRoot, {withFileTypes:true}).filter(x => x.isDirectory()).map(x => x.name).sort();
pass(JSON.stringify(actual) === JSON.stringify(expected), "Expected exactly 25 formal skill directories");

const seen = new Set();
for (const name of expected) {
  const dir = path.join(skillsRoot, name);
  const skillPath = path.join(dir, "SKILL.md");
  const agentPath = path.join(dir, "agents", "openai.yaml");
  pass(fs.existsSync(skillPath), name + ": missing SKILL.md");
  pass(fs.existsSync(agentPath), name + ": missing agents/openai.yaml");
  if (!fs.existsSync(skillPath)) continue;
  const text = read(skillPath);
  const fm = text.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n([\s\S]*)$/);
  pass(Boolean(fm), name + ": invalid front matter");
  if (!fm) continue;
  const skillName = (fm[1].match(/^name:\s*["']?([^"'\r\n]+)["']?\s*$/m) || [])[1];
  const description = (fm[1].match(/^description:\s*(.+)$/m) || [])[1];
  pass(skillName === name, name + ": name does not match directory");
  pass(!seen.has(skillName), name + ": duplicate skill name");
  seen.add(skillName);
  pass(Boolean(description && description.trim()), name + ": missing description");
  pass(!description || description.trim().length <= 1024, name + ": description exceeds 1024 characters");
  pass(Boolean(fm[2].trim()), name + ": empty instruction body");
  pass(!/^disable-model-invocation:/m.test(fm[1]), name + ": Claude disable-model-invocation remains");
  pass(!/^argument-hint:/m.test(fm[1]), name + ": Claude argument-hint remains");
  pass((manifest.name + ":" + name).length <= 64, name + ": combined identity exceeds 64 characters");
  if (fs.existsSync(agentPath)) {
    const yaml = read(agentPath);
    pass(/^interface:\s*$/m.test(yaml), name + ": missing agent interface");
    pass(/^\s+display_name:\s*.+$/m.test(yaml), name + ": missing display_name");
    pass(/^\s+short_description:\s*.+$/m.test(yaml), name + ": missing short_description");
  }
  for (const match of text.matchAll(/\]\(([^)]+)\)/g)) {
    const target = match[1].split("#")[0].trim();
    if (!target || target.startsWith("#") || /^[a-z][a-z0-9+.-]*:/i.test(target) || target === "link") continue;
    pass(fs.existsSync(path.resolve(dir, target)), name + ": missing linked file " + target);
  }
}
const marketplace = JSON.parse(read(path.join(root, ".agents", "plugins", "marketplace.json")));
pass(marketplace.plugins.length === 1, "Marketplace must contain one plugin");
pass(marketplace.plugins[0].name === manifest.name, "Marketplace plugin name differs");
pass(marketplace.plugins[0].source.path === "./plugins/matt-pocock-engineering-skills", "Marketplace path differs");
pass(!fs.existsSync(path.join(plugin, ".app.json")), "Skills-only plugin must not include .app.json");
pass(!fs.existsSync(path.join(plugin, ".mcp.json")), "Skills-only plugin must not include .mcp.json");
pass(!fs.existsSync(path.join(plugin, "mcp.json")), "Skills-only plugin must not include mcp.json");

if (failures.length) {
  console.error("Validation failed:");
  for (const failure of failures) console.error("- " + failure);
  process.exit(1);
}
console.log("PASS: Matt Pocock Engineering Skills 1.0.0");
console.log("PASS: 25/25 skills");
console.log("PASS: portable manifest, compatibility manifest, assets, marketplace, links, metadata");
