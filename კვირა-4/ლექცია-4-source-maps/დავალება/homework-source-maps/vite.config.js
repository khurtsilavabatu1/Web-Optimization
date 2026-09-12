import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // ======================================================
    // SOURCE MAP — ამ პარამეტრს დავალების განმავლობაში 3-ჯერ შეცვლით
    // ======================================================
    //   sourcemap: false      → .map ფაილი არ იქმნება, stack trace წაუკითხავია (ნაწილი 2)
    //   sourcemap: true       → .map ფაილი + sourceMappingURL კომენტარი (ნაწილი 3)
    //   sourcemap: 'hidden'   → .map ფაილი, sourceMappingURL კომენტარის გარეშე (ნაწილი 6)
    // ======================================================
    sourcemap: false,

    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false, // console.log-ებს დავტოვებთ დებაგისთვის
      },
    },
  },
})
