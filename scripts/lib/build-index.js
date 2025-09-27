// scripts/lib/build-index.js

import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";
import matter from "gray-matter";

import { createUrl } from "./create-url.js";

/**
 * 扫描文档目录，生成内容索引数组
 * @param {string} docsDir - 文档根目录（绝对路径）
 * @param {Object} config - 包含 userName, repoName, branch 等信息
 * @returns {Promise<Array>} 索引数据数组
 */
export async function buildIndex(docsDir, config) {
    const { userName, repoName, branch } = config;
    const result = [];

    async function walk(dir, base = docsDir) {
        const entries = await readdir(dir, { withFileTypes: true });

        for (const ent of entries) {
            const full = join(dir, ent.name);

            if (ent.isDirectory()) {
                await walk(full, base);
                continue;
            }

            if (!ent.name.endsWith(".md") || ent.name === "index.json") continue;

            const slug = relative(base, full).replace(/\.md$/, "").replace(/\\/g, "/");
            const filePath = `documents/${slug}.md`;

            const link = createUrl({ userName, repoName, branch, path: filePath });
            const raw = await readFile(full, "utf8");
            const { data } = matter(raw);

            result.push({
                slug,
                title: data.title ?? ent.name.replace(/\.md$/, ""),
                date: data.date ?? "",
                description: data.description ?? "",
                tags: [].concat(data.tags ?? []),
                link,
            });
        }
    }

    await walk(docsDir);
    return result.sort((a, b) => (b.date || "0").localeCompare(a.date || "0"));
}
