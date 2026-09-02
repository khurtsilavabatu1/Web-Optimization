import { useState, useEffect } from 'react'

function ViewportInfo() {
  const [viewport, setViewport] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    breakpoint: ''
  })

  useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      let breakpoint = ''

      if (width < 576) {
        breakpoint = 'Mobile'
      } else if (width < 768) {
        breakpoint = 'Tablet (Small)'
      } else if (width < 992) {
        breakpoint = 'Tablet'
      } else if (width < 1200) {
        breakpoint = 'Desktop'
      } else {
        breakpoint = 'Large Desktop'
      }

      setViewport({ width, height, breakpoint })
    }

    updateViewport()
    window.addEventListener('resize', updateViewport)

    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  return (
    <div className="viewport-info">
      <div className="viewport-item">
        <strong>Width:</strong> {viewport.width}px
      </div>
      <div className="viewport-item">
        <strong>Height:</strong> {viewport.height}px
      </div>
      <div className="viewport-item viewport-breakpoint">
        <strong>Breakpoint:</strong> {viewport.breakpoint}
      </div>
    </div>
  )
}

export default ViewportInfo
