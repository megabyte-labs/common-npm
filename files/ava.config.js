export default {
  failFast: true,
  files: ["!diff", "!test", "!build/module/**", "**/*.spec.ts"],
  ignoredByWatcher: ["diff", "test"],
  timeout: "60s",
  typescript: {
    rewritePaths: {
      "src/": "build/main/",
    },
  },
};
