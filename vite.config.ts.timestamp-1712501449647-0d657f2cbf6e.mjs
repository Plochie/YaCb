// vite.config.ts
import { defineConfig } from "file:///C:/Users/Plochie/Desktop/DO_SOMETHING/yacb/yacb-app/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Plochie/Desktop/DO_SOMETHING/yacb/yacb-app/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { vanillaExtractPlugin } from "file:///C:/Users/Plochie/Desktop/DO_SOMETHING/yacb/yacb-app/node_modules/@vanilla-extract/vite-plugin/dist/vanilla-extract-vite-plugin.cjs.js";
import { nodePolyfills } from "file:///C:/Users/Plochie/Desktop/DO_SOMETHING/yacb/yacb-app/node_modules/vite-plugin-node-polyfills/dist/index.js";
var vite_config_default = defineConfig(async () => ({
  plugins: [
    react(),
    vanillaExtractPlugin({ identifiers: "debug" }),
    nodePolyfills()
  ],
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  // prevent vite from obscuring rust errors
  clearScreen: false,
  // tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true
  },
  // to make use of `TAURI_DEBUG` and other env variables
  // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
  envPrefix: ["VITE_", "TAURI_"],
  build: {
    // Tauri supports es2021
    target: process.env.TAURI_PLATFORM === "windows" ? "chrome105" : "safari13",
    // don't minify for debug builds
    minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_DEBUG
  },
  resolve: {
    alias: {
      "app-src": "/src",
      "app-components": "/src/components",
      "app-config": "/src/config",
      "app-store": "/src/store"
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxQbG9jaGllXFxcXERlc2t0b3BcXFxcRE9fU09NRVRISU5HXFxcXHlhY2JcXFxceWFjYi1hcHBcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFBsb2NoaWVcXFxcRGVza3RvcFxcXFxET19TT01FVEhJTkdcXFxceWFjYlxcXFx5YWNiLWFwcFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvUGxvY2hpZS9EZXNrdG9wL0RPX1NPTUVUSElORy95YWNiL3lhY2ItYXBwL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCB7IHZhbmlsbGFFeHRyYWN0UGx1Z2luIH0gZnJvbSAnQHZhbmlsbGEtZXh0cmFjdC92aXRlLXBsdWdpbic7XHJcbmltcG9ydCB7IG5vZGVQb2x5ZmlsbHMgfSBmcm9tICd2aXRlLXBsdWdpbi1ub2RlLXBvbHlmaWxscyc7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoYXN5bmMgKCkgPT4gKHtcclxuXHRwbHVnaW5zOiBbXHJcblx0XHRyZWFjdCgpLFxyXG5cdFx0dmFuaWxsYUV4dHJhY3RQbHVnaW4oeyBpZGVudGlmaWVyczogJ2RlYnVnJyB9KSxcclxuXHRcdG5vZGVQb2x5ZmlsbHMoKSxcclxuXHRdLFxyXG5cclxuXHQvLyBWaXRlIG9wdGlvbnMgdGFpbG9yZWQgZm9yIFRhdXJpIGRldmVsb3BtZW50IGFuZCBvbmx5IGFwcGxpZWQgaW4gYHRhdXJpIGRldmAgb3IgYHRhdXJpIGJ1aWxkYFxyXG5cdC8vIHByZXZlbnQgdml0ZSBmcm9tIG9ic2N1cmluZyBydXN0IGVycm9yc1xyXG5cdGNsZWFyU2NyZWVuOiBmYWxzZSxcclxuXHQvLyB0YXVyaSBleHBlY3RzIGEgZml4ZWQgcG9ydCwgZmFpbCBpZiB0aGF0IHBvcnQgaXMgbm90IGF2YWlsYWJsZVxyXG5cdHNlcnZlcjoge1xyXG5cdFx0cG9ydDogMTQyMCxcclxuXHRcdHN0cmljdFBvcnQ6IHRydWUsXHJcblx0fSxcclxuXHQvLyB0byBtYWtlIHVzZSBvZiBgVEFVUklfREVCVUdgIGFuZCBvdGhlciBlbnYgdmFyaWFibGVzXHJcblx0Ly8gaHR0cHM6Ly90YXVyaS5zdHVkaW8vdjEvYXBpL2NvbmZpZyNidWlsZGNvbmZpZy5iZWZvcmVkZXZjb21tYW5kXHJcblx0ZW52UHJlZml4OiBbJ1ZJVEVfJywgJ1RBVVJJXyddLFxyXG5cdGJ1aWxkOiB7XHJcblx0XHQvLyBUYXVyaSBzdXBwb3J0cyBlczIwMjFcclxuXHRcdHRhcmdldDogcHJvY2Vzcy5lbnYuVEFVUklfUExBVEZPUk0gPT09ICd3aW5kb3dzJyA/ICdjaHJvbWUxMDUnIDogJ3NhZmFyaTEzJyxcclxuXHRcdC8vIGRvbid0IG1pbmlmeSBmb3IgZGVidWcgYnVpbGRzXHJcblx0XHRtaW5pZnk6ICFwcm9jZXNzLmVudi5UQVVSSV9ERUJVRyA/ICdlc2J1aWxkJyA6IGZhbHNlLFxyXG5cdFx0Ly8gcHJvZHVjZSBzb3VyY2VtYXBzIGZvciBkZWJ1ZyBidWlsZHNcclxuXHRcdHNvdXJjZW1hcDogISFwcm9jZXNzLmVudi5UQVVSSV9ERUJVRyxcclxuXHR9LFxyXG5cdHJlc29sdmU6IHtcclxuXHRcdGFsaWFzOiB7XHJcblx0XHRcdCdhcHAtc3JjJzogJy9zcmMnLFxyXG5cdFx0XHQnYXBwLWNvbXBvbmVudHMnOiAnL3NyYy9jb21wb25lbnRzJyxcclxuXHRcdFx0J2FwcC1jb25maWcnOiAnL3NyYy9jb25maWcnLFxyXG5cdFx0XHQnYXBwLXN0b3JlJzogJy9zcmMvc3RvcmUnLFxyXG5cdFx0fSxcclxuXHR9LFxyXG59KSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeVYsU0FBUyxvQkFBb0I7QUFDdFgsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsNEJBQTRCO0FBQ3JDLFNBQVMscUJBQXFCO0FBRzlCLElBQU8sc0JBQVEsYUFBYSxhQUFhO0FBQUEsRUFDeEMsU0FBUztBQUFBLElBQ1IsTUFBTTtBQUFBLElBQ04scUJBQXFCLEVBQUUsYUFBYSxRQUFRLENBQUM7QUFBQSxJQUM3QyxjQUFjO0FBQUEsRUFDZjtBQUFBO0FBQUE7QUFBQSxFQUlBLGFBQWE7QUFBQTtBQUFBLEVBRWIsUUFBUTtBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLEVBQ2I7QUFBQTtBQUFBO0FBQUEsRUFHQSxXQUFXLENBQUMsU0FBUyxRQUFRO0FBQUEsRUFDN0IsT0FBTztBQUFBO0FBQUEsSUFFTixRQUFRLFFBQVEsSUFBSSxtQkFBbUIsWUFBWSxjQUFjO0FBQUE7QUFBQSxJQUVqRSxRQUFRLENBQUMsUUFBUSxJQUFJLGNBQWMsWUFBWTtBQUFBO0FBQUEsSUFFL0MsV0FBVyxDQUFDLENBQUMsUUFBUSxJQUFJO0FBQUEsRUFDMUI7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNSLE9BQU87QUFBQSxNQUNOLFdBQVc7QUFBQSxNQUNYLGtCQUFrQjtBQUFBLE1BQ2xCLGNBQWM7QUFBQSxNQUNkLGFBQWE7QUFBQSxJQUNkO0FBQUEsRUFDRDtBQUNELEVBQUU7IiwKICAibmFtZXMiOiBbXQp9Cg==
