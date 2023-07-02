import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactRefresh from "@vitejs/plugin-react-refresh";

export default defineConfig({
  plugins: [react(), reactRefresh()],
  resolve: {
    alias: {
      "react-router-dom": "react-router-dom",
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080", // Update with your server API URL
        changeOrigin: true,
      },
    },
  },
});
