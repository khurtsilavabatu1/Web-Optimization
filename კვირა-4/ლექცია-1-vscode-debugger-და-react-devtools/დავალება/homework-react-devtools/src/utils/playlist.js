// ===== პლეილისტის დამხმარე ფუნქციები =====

/**
 * წამებს გარდაქმნის "მ:წწ" ფორმატში.
 * გამოიყენება როგორც ცალკეული ტრეკისთვის, ისე პლეილისტის ჯამური დროისთვის.
 */
export function formatDuration(totalSeconds) {
  const minutes = Math.round(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${minutes}:${seconds}`
}

/** პლეილისტის ჯამური ხანგრძლივობა წამებში */
export function totalPlaylistSeconds(playlist) {
  return playlist.reduce((sum, item) => sum + item.duration, 0)
}

/** პლეილისტში ტრეკების ჯამური რაოდენობა (გამეორებების ჩათვლით) */
export function totalPlaylistTracks(playlist) {
  return playlist.reduce((sum, item) => sum + item.count, 0)
}
