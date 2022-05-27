import adapter from '@sveltejs/adapter-netlify';
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],

  kit: {
    adapter: adapter(),

    // hydrate the <div id="svelte"> element in src/app.html
    vite: () => ({
      server: {
        open: true,
        proxy: {
          "/api": {
            target: "http://localhost:3333",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, "/api/v1"),
          },
        },
      },
    }),
  },
};

export default config;
