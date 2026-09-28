/**
 * show-bundles.mjs
 *
 * აჩვენებს, რა წარმოქმნა `npm run build`-მა: modern vs legacy ბანდლები,
 * მათი ზომები და index.html-ში როგორ ერთვება თითოეული.
 *
 * გაშვება:  npm run build && npm run bundles
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { gzipSync } from 'node:zlib'

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)))
const DIST = join(ROOT, 'dist')

if (!existsSync(DIST)) {
  console.error('❌ dist/ არ არსებობს — ჯერ გაუშვი `npm run build`')
  process.exit(1)
}

const kb = (n) => (n / 1024).toFixed(1).padStart(8) + ' kB'

const files = readdirSync(join(DIST, 'assets'))
  .filter((f) => f.endsWith('.js'))
  .map((f) => {
    const buf = readFileSync(join(DIST, 'assets', f))
    return { name: f, size: buf.length, gzip: gzipSync(buf).length }
  })

// @babel/standalone მხოლოდ ამ დემოს საჩვენებელი ინსტრუმენტია (lazy chunk) —
// ზომების შედარებაში მას არ ვრთავთ, თორემ 3 MB-ით ყველაფერს ჩაახშობს.
const isBabel = (f) => f.name.includes('babel-')
const demoOnly = files.filter(isBabel)
const app = files.filter((f) => !isBabel(f))

const legacy = app.filter((f) => f.name.includes('-legacy-'))
const modern = app.filter((f) => !f.name.includes('-legacy-'))

const printGroup = (title, group) => {
  console.log('\n' + title)
  for (const f of group.sort((a, b) => b.size - a.size)) {
    console.log(`   ${f.name.padEnd(36)} ${kb(f.size)}  │ gzip: ${kb(f.gzip)}`)
  }
  const total = group.reduce((s, f) => s + f.size, 0)
  const totalGz = group.reduce((s, f) => s + f.gzip, 0)
  console.log(`   ${'ჯამი'.padEnd(36)} ${kb(total)}  │ gzip: ${kb(totalGz)}`)
  return { total, totalGz }
}

const m = printGroup('📦 MODERN  — <script type="module">  (თანამედროვე ბრაუზერები)', modern)
const l = printGroup('🕰️  LEGACY  — <script nomodule>       (ძველი ბრაუზერები)', legacy)

if (legacy.length === 0) {
  console.log('\n⚠️  legacy ბანდლი არ შექმნილა — შეამოწმე @vitejs/plugin-legacy vite.config.js-ში\n')
  process.exit(0)
}

console.log('\n📊 legacy ბანდლი modern-ზე %s%%-ით %s-ია (gzip)',
  Math.abs(((l.totalGz - m.totalGz) / m.totalGz) * 100).toFixed(1),
  l.totalGz > m.totalGz ? 'დიდი' : 'პატარა')
console.log('   ➜ მომხმარებელი მხოლოდ ერთ კომპლექტს ჩამოტვირთავს, არა ორივეს.')

if (demoOnly.length > 0) {
  const gz = demoOnly.reduce((s, f) => s + f.gzip, 0)
  console.log('\n🔬 დემოს საკუთარი დანამატი (@babel/standalone, lazy chunk): %s gzip',
    kb(gz).trim())
  console.log('   ეს ჩვეულებრივ პროექტში არ გჭირდება — Babel build-დროს მუშაობს,')
  console.log('   არა ბრაუზერში. აქ მხოლოდ იმიტომ, რომ ტრანსპილაცია ცოცხლად ვაჩვენოთ.')
}

// index.html-ში როგორ ერთვება
const html = readFileSync(join(DIST, 'index.html'), 'utf8')
const tags = html.match(/<script[^>]*>/g) ?? []
console.log('\n🔖 index.html-ის <script> თეგები:')
for (const t of tags) {
  const kind = t.includes('nomodule') ? 'nomodule → ძველი' : t.includes('type="module"') ? 'module   → ახალი' : 'inline   → SystemJS loader'
  console.log(`   ${kind}   ${t.slice(0, 96)}`)
}
console.log()
