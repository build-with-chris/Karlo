import coreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
  ...coreWebVitals,
  {
    ignores: [".next/**", "out/**", "build/**", "node_modules/**"],
  },
];

export default config;
