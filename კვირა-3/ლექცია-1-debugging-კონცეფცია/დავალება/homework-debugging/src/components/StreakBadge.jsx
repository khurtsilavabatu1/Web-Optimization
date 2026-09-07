import { useState, useEffect } from 'react'

function StreakBadge({ onReset }) {
  const [timeSinceLastAdd, setTimeSinceLastAdd] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('⏱ StreakBadge tick')
      setTimeSinceLastAdd(prev => prev + 1)
    }, 1000)
  }, [])

  // reset — როცა ახალი ჩვევა ემატება
  useEffect(() => {
    setTimeSinceLastAdd(0)
  }, [onReset])

  return (
    <div className="time-since-badge">
      ბოლო დამატებიდან: {timeSinceLastAdd} წამი
    </div>
  )
}

export default StreakBadge
