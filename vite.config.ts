import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), dts()],
    build: {
        lib: {
            entry: resolve(__dirname, "packages/index.ts"),
            name: "jotaish",
            formats: ["es", "umd"],
            fileName: (format: string) => `jotaish.${format}.js`,
        },
        rollupOptions: {
            external: ["jotai"],
            output: {
                globals: {
                    jotai: "jotai",
                },
            },
        },
    },
});
