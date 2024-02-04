import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
      components: "/src/components",
      pages: "/src/Pages",
      assets: "/src/assets",
      features: "/src/features",
      hooks: "/src/hooks",
      utils: "/src/utils",
    },
  },
});
