import { defineConfig } from "vite";

import dts from "vite-plugin-dts";

import { resolve } from "path";

export default defineConfig({
    plugins: [dts()],
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
