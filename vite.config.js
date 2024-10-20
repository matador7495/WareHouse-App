import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const paths = ["src", "assets", "components", "configs", "layouts", "pages", "router", "services", "utils"];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      ...paths.reduce(
        (acc, path) => ({
          ...acc,
          [path]: `/${path === "src" ? path : "src/" + path}`,
        }),
        ""
      ),
    },
  },
});
