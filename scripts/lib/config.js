// scripts/lib/config.js

export const CONFIG = {
    // GitHub 信息
    userName: "RealMaybe",
    repoName: "RealMaybe",
    branch: "main",

    // 路径配置
    docsDir: "documents", // 相对根目录
    outDir: "data",
    outFile: "data/index.json",

    // 特殊条目配置
    specialEntries: {
        self: {
            slug: "self",
            title: "Document Index",
            description: "This JSON file contains all document metadata.",
            type: "system",
            path: "data/index.json",
        },
        update: {
            slug: "update",
            title: "Update Log",
            description: "Changelog of content updates.",
            type: "meta",
            path: "update.md",
        },
    },
};
