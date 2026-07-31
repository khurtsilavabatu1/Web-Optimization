import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    react(),

    // ═══ COMPRESSION PLUGINS ═══
    // build-ის დროს .gz და .br ფაილებს შექმნის dist/-ში
    // სერვერი ამ წინასწარ-შეკუმშულ ფაილებს პირდაპირ გაგზავნის

    // Gzip compression
    // compression({
    //   algorithm: "gzip",
    //   ext: ".gz",
    // }),

    // // Brotli compression
    // compression({
    //   algorithm: "brotliCompress",
    //   ext: ".br",
    // }),
  ],

  build: {
    // ═══ MINIFICATION ═══
    // სცადეთ სამივე ვარიანტი და შეადარეთ:
    //   'esbuild' — default, ძალიან სწრაფი (Go-ზე დაწერილი)
    //   'terser'  — უფრო აგრესიული შეკუმშვა, მაგრამ ნელი
    //   false     — minification გამორთულია (readable კოდი)
    minify: "esbuild",

    // ═══ SOURCE MAPS ═══
    // სცადეთ სამივე და ნახეთ DevTools → Sources tab:
    //   true     — .map იქმნება, ბრაუზერი ხედავს ორიგინალ ფაილებს
    //   'hidden' — .map იქმნება, მაგრამ ბრაუზერი ავტომატურად არ ტვირთავს
    //   false    — .map არ იქმნება საერთოდ
    sourcemap: true,
  },

  server: {
    port: 3000,
    open: true,
  },
});
