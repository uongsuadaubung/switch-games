/**
 * bump-version.mjs
 * Đồng bộ phiên bản ở cả 2 file:
 *   - package.json
 *   - neutralino.config.json
 *
 * Dùng: node scripts/bump-version.mjs <version>
 * Ví dụ: node scripts/bump-version.mjs 2026.10.07.1
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

// ── Helpers ──────────────────────────────────────────────────────────────────

function readText(rel) {
  return readFileSync(resolve(ROOT, rel), "utf8");
}

function writeText(rel, content) {
  writeFileSync(resolve(ROOT, rel), content, "utf8");
}

// ── Main ─────────────────────────────────────────────────────────────────────

const newVersion = process.argv[2];

if (!newVersion || !/^\d+(\.\d+)+$/.test(newVersion)) {
  console.log("\nLỗi: Vui lòng cung cấp số phiên bản hợp lệ (ví dụ: 2026.03.20 hoặc 1.0.0)");
  console.log("Ví dụ: node scripts/bump-version.mjs 2026.03.20\n");
  process.exit(1);
}

// 1. Lấy version cũ từ package.json (chủ yếu để log)
const pkg = JSON.parse(readText("package.json"));
const oldVersion = pkg.version;

console.log(`\n📦 Cập nhật phiên bản: ${oldVersion} → ${newVersion}\n`);

// 2. package.json
pkg.version = newVersion;
writeText("package.json", JSON.stringify(pkg, null, 2) + "\n");
console.log("  ✅ package.json");

// 3. neutralino.config.json
const neuPath = "neutralino.config.json";
if (existsSync(resolve(ROOT, neuPath))) {
  const neuConf = JSON.parse(readText(neuPath));
  neuConf.version = newVersion;
  writeText(neuPath, JSON.stringify(neuConf, null, 2) + "\n");
  console.log("  ✅ neutralino.config.json");
}

// 4. Run npm install to update package-lock.json
console.log("\n  🔄 Đang chạy npm install để cập nhật package-lock.json...");
try {
  execSync("npm install", { stdio: "inherit", cwd: ROOT });
  console.log("  ✅ package-lock.json");
} catch (error) {
  console.error("  ❌ Lỗi khi chạy npm install:", error.message);
  process.exit(1);
}

console.log(`\n🎉 Xong! Version mới: ${newVersion}`);
console.log(`\nBước tiếp theo:`);
console.log(`  git add package.json package-lock.json neutralino.config.json`);
console.log(`  git commit -m "chore: bump version to ${newVersion}"`);
console.log(`  git push`);
console.log(`  → Tạo Release v${newVersion} trên GitHub để trigger CI build\n`);
