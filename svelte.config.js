// Adapter-static with a fallback to index.html for SPA mode
// See: https://svelte.dev/docs/kit/single-page-apps
import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const isGitHubPages = process.env.DEPLOY_TARGET === "gh-pages";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      fallback: "index.html",
    }),
    paths: {
      base: isGitHubPages ? "/switch-games" : "",
    },
  },
};

export default config;
