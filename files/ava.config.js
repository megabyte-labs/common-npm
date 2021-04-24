export default {
  failFast: true,
  files: ["!diff", "!test", "!build/module/**"],
  ignoredByWatcher: ["diff", "test"],
  timeout: "60s",
  typescript: {
    rewritePaths: {
      "src/": "build/main/",
    },
  },
};
