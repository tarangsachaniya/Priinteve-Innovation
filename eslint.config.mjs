import next from "eslint-config-next";

const config = [...next, { ignores: ["legacy-static/**", ".next/**"] }];

export default config;
