import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    // @vitejs/plugin-react შიგნით Babel-ს იყენებს (Fast Refresh + JSX transform).
    // ეს ავტომატურია — babel.config.json-ს კი default-ად *არ* კითხულობს.
    react(),

    // @vitejs/plugin-legacy — სწორედ ეს არის @babel/preset-env + core-js Vite-ში.
    // build-ზე ორ ბანდლს აწარმოებს:
    //   • modern  → <script type="module">   — თანამედროვე ბრაუზერებისთვის
    //   • legacy  → <script nomodule>        — ძველებისთვის, SystemJS-ით
    // dev-ში საერთოდ არ ერთვება (build-only plugin-ია).
    legacy({
      // რომელი ბრაუზერები ჩაითვალოს „ძველად" — legacy ბანდლი მათთვის შეიქმნება
      targets: ['defaults', 'not IE 11'],

      // polyfill-ები, რომლებიც თვითონ ბანდლს სჭირდება (core-js-იდან).
      // 'usage' რეჟიმში მხოლოდ რეალურად გამოყენებული API-ები ჩაიდება.
      renderLegacyChunks: true,

      // modern ბანდლისთვისაც დაამატებს რამდენიმე polyfill-ს — ეს ის API-ებია,
      // რომლებსაც ES-modules-ის მხარდამჭერი ძველი ბრაუზერებიც ვერ იცნობენ
      // (მაგ. Safari 14-ის Array.prototype.at).
      modernPolyfills: true,
    }),
  ],

  build: {
    // @babel/standalone ~3 MB-ია და განზრახ ცალკე lazy chunk-ად გამოდის
    // (TranspilationDemo-ს dynamic import-ით). გაფრთხილება აქ მოსალოდნელია.
    chunkSizeWarningLimit: 3500,
  },
})
