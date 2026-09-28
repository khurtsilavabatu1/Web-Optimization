// PostCSS კონფიგურაცია — Vite ავტომატურად აღმოაჩენს ამ ფაილს
// და ყველა CSS-ს გაატარებს ამ plugin-ებში (dev-შიც და build-შიც).
//
// Autoprefixer vendor prefix-ებს ამატებს ავტომატურად. რომელ prefix-ებს —
// ამას წყვეტს package.json-ის "browserslist" ველი (და არა თვითონ Autoprefixer).
import autoprefixer from 'autoprefixer'

export default {
  plugins: [autoprefixer()],
}
