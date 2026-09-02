import { useState, useEffect } from 'react'

function TimerBadge({ onReset }) {
  const [timeSinceLastAdd, setTimeSinceLastAdd] = useState(0)

  // BUG #1: Missing useEffect Cleanup
  // setInterval აგრძელებს მუშაობას component unmount-ის შემდეგაც
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSinceLastAdd(prev => prev + 1)
    }, 1000)
     return () => clearInterval(interval)
    // cleanup function აკლია!
  }, [])

  // reset როცა ახალი დავალება ემატება
  useEffect(() => {
    setTimeSinceLastAdd(0)
  }, [onReset])

  return (
    <div className="time-since-badge">
      ბოლო დამატებიდან: {timeSinceLastAdd} წამი
    </div>
  )
}

export default TimerBadge
