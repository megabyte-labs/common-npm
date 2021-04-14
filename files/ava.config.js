export default {
  failFast: true,
  files: ["!diff", "!test", "!build/module/**"],
  ignoredByWatcher: ["diff", "test"],
  sources: ["build/main/**/*.js"],
  timeout: "60s",
  typescript: {
    rewritePaths: {
      "src/": "build/main/",
    },
  },
};
