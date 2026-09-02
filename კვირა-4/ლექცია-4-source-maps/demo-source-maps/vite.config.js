import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // ======================================================
    // SOURCE MAP CONFIGURATION
    // ======================================================
    // ეს არის მთავარი პარამეტრი, რომელიც განსაზღვრავს
    // როგორ გენერირდება source maps production build-ში.
    //
    // შესაძლო ვარიანტები:
    //
    // 1. sourcemap: true
    //    ✅ ქმნის სრულფასოვან .js.map ფაილებს
    //    ✅ ბრაუზერი ავტომატურად ტვირთავს და აჩვენებს ორიგინალ კოდს
    //    ✅ DevTools-ში ხედავთ .jsx/.js ფაილებს სრულად
    //    ⚠️  .map ფაილები ხელმისაწვდომია ნებისმიერი მომხმარებლისთვის
    //
    // 2. sourcemap: false
    //    ❌ source maps არ ქმნის
    //    ❌ DevTools-ში მხოლოდ minified კოდი ჩანს
    //    ❌ stack trace-ები წაუკითხავი და უსარგებლოა
    //    ✅ უსაფრთხო, რადგან source არ იხილება
    //
    // 3. sourcemap: 'hidden'
    //    ✅ ქმნის .js.map ფაილებს
    //    ❌ არ ემატება sourceMappingURL კომენტარი
    //    ❌ ბრაუზერი ავტომატურად ვერ იპოვის .map ფაილს
    //    ✅ შეგიძლიათ ხელით ატვირთოთ error tracking სერვისში (Sentry)
    //
    // რეკომენდაცია:
    // - development: true (ნაგულისხმევად ჩართულია dev mode-ში)
    // - staging: true ან 'hidden'
    // - production: 'hidden' (უსაფრთხოება + error tracking)
    // ======================================================

    sourcemap: false,  // 👈 ეს გამოცადეთ 4 სავარჯიშოში

    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // console.log-ები დავტოვოთ დემოსთვის
      },
    },
  },
})
