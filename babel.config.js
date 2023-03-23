module.exports = {
  presets: ["next/babel"],
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@components": "./components",
          "@styles": "./styles",
          "@utils": "./utils",
          "@contexts": "./contexts",
          "@api": "./api",
          "@interfaces": "./interfaces",
          "@pages": "./pages",
          "@test-utils": "./test-utils",
        },
      },
    ],
  ],
};
