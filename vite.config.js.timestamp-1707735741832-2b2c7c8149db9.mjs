// vite.config.js
import { defineConfig } from "file:///home/nusrat/Documents/blog-app-react/node_modules/vite/dist/node/index.js";
import react from "file:///home/nusrat/Documents/blog-app-react/node_modules/@vitejs/plugin-react-swc/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: "/src",
      components: "/src/components",
      pages: "/src/Pages",
      assets: "/src/assets",
      features: "/src/features",
      hooks: "/src/hooks",
      utils: "/src/utils"
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/_variables.scss";
          @import "./src/styles/_colors.scss";
          `
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9udXNyYXQvRG9jdW1lbnRzL2Jsb2ctYXBwLXJlYWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9udXNyYXQvRG9jdW1lbnRzL2Jsb2ctYXBwLXJlYWN0L3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL251c3JhdC9Eb2N1bWVudHMvYmxvZy1hcHAtcmVhY3Qvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBzcmM6IFwiL3NyY1wiLFxuICAgICAgY29tcG9uZW50czogXCIvc3JjL2NvbXBvbmVudHNcIixcbiAgICAgIHBhZ2VzOiBcIi9zcmMvUGFnZXNcIixcbiAgICAgIGFzc2V0czogXCIvc3JjL2Fzc2V0c1wiLFxuICAgICAgZmVhdHVyZXM6IFwiL3NyYy9mZWF0dXJlc1wiLFxuICAgICAgaG9va3M6IFwiL3NyYy9ob29rc1wiLFxuICAgICAgdXRpbHM6IFwiL3NyYy91dGlsc1wiLFxuICAgIH0sXG4gIH0sXG4gIGNzczoge1xuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcbiAgICAgIHNjc3M6IHtcbiAgICAgICAgYWRkaXRpb25hbERhdGE6IGBAaW1wb3J0IFwiLi9zcmMvc3R5bGVzL192YXJpYWJsZXMuc2Nzc1wiO1xuICAgICAgICAgIEBpbXBvcnQgXCIuL3NyYy9zdHlsZXMvX2NvbG9ycy5zY3NzXCI7XG4gICAgICAgICAgYCxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpUyxTQUFTLG9CQUFvQjtBQUM5VCxPQUFPLFdBQVc7QUFHbEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUs7QUFBQSxNQUNMLFlBQVk7QUFBQSxNQUNaLE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLE9BQU87QUFBQSxNQUNQLE9BQU87QUFBQSxJQUNUO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gscUJBQXFCO0FBQUEsTUFDbkIsTUFBTTtBQUFBLFFBQ0osZ0JBQWdCO0FBQUE7QUFBQTtBQUFBLE1BR2xCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
