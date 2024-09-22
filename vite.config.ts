import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";

const config: UserConfig = {
  plugins: [sveltekit()],
  server: {
    open: true,
    host: true,
    port: 3000,
    proxy: {
      "/api": {
        target: "http://finsense-api:3333",
        rewrite: (path) => path.replace(/^\/api/, "/"),
      },
    },
  },
};

export default config;
