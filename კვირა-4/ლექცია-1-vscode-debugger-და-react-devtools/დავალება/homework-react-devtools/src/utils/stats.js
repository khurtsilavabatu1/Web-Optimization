// ===== ბიბლიოთეკის სტატისტიკა =====

// „audio fingerprint"-ის სიმულირებული გამოთვლა — მძიმე სინქრონული სამუშაო
// (მანქანის მიხედვით ~20-40 მილიწამი). განზრახ ძვირია: Profiler-ის Ranked view-ში
// მკაფიოდ უნდა დაინახოთ, რომელი კომპონენტი ჭამს რენდერის დროს.
export const HEAVY_ITERATIONS = 500_000

export function computeLibraryStats(tracks, playlist) {
  let fingerprint = 0
  for (let i = 0; i < HEAVY_ITERATIONS; i++) {
    fingerprint += Math.abs(Math.sin(i) * Math.cos(i / 3))
  }

  const totalSeconds = tracks.reduce((sum, track) => sum + track.duration, 0)
  const totalPlays = tracks.reduce((sum, track) => sum + track.plays, 0)

  const playsByGenre = {}
  tracks.forEach(track => {
    playsByGenre[track.genre] = (playsByGenre[track.genre] || 0) + track.plays
  })
  const ranked = Object.entries(playsByGenre).sort((a, b) => b[1] - a[1])

  return {
    averageSeconds: tracks.length ? Math.round(totalSeconds / tracks.length) : 0,
    totalPlays,
    topGenre: ranked.length ? ranked[0][0] : '—',
    playlistShare: tracks.length ? Math.round((playlist.length / tracks.length) * 100) : 0,
    fingerprint: Math.round(fingerprint),
  }
}
