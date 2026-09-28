/**
 * show-prefixes.mjs
 *
 * აჩვენებს, ზუსტად რა vendor prefix-ებს ამატებს Autoprefixer ამ პროექტის
 * CSS-ს — package.json-ის "browserslist"-ის მიხედვით.
 *
 * გაშვება:  npm run prefixes
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import browserslist from 'browserslist'

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)))
const SRC = join(ROOT, 'src')

/** რეკურსიულად აგროვებს ყველა .css ფაილს */
function collectCss(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry)
    return statSync(full).isDirectory()
      ? collectCss(full)
      : entry.endsWith('.css')
        ? [full]
        : []
  })
}

const targets = browserslist()
console.log('\n🎯 Browserslist (package.json-იდან) — სულ %d ბრაუზერი:', targets.length)
console.log('   ' + targets.slice(0, 12).join(', ') + (targets.length > 12 ? ', …' : ''))

let totalAdded = 0

for (const file of collectCss(SRC).sort()) {
  const source = readFileSync(file, 'utf8')
  const result = await postcss([autoprefixer()]).process(source, { from: file })

  // ვპოულობთ ხაზებს, რომლებიც output-შია და input-ში არ იყო
  const before = new Set(source.split('\n').map((l) => l.trim()))
  const added = result.css
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => /^-(webkit|moz|ms|o)-/.test(l) || /^position: -webkit-sticky/.test(l))
    .filter((l) => !before.has(l))

  if (added.length === 0) continue

  totalAdded += added.length
  console.log('\n📄 %s  (+%d)', relative(ROOT, file), added.length)
  for (const line of [...new Set(added)]) console.log('   + ' + line)
}

console.log(
  totalAdded === 0
    ? '\n✅ prefix-ები არ დამატებულა — ან CSS-ს არ სჭირდება, ან browserslist ძალიან ვიწროა.\n'
    : `\n✅ Autoprefixer-მა სულ ${totalAdded} prefix-ის ხაზი დაამატა.\n   შეცვალე package.json-ის "browserslist" და ხელახლა გაუშვი — რიცხვი შეიცვლება.\n`,
)
