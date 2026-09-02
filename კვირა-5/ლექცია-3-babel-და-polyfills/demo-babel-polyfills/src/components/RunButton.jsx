import React from 'react'

function RunButton({ onClick, disabled }) {
  return (
    <button className="run-button" onClick={onClick} disabled={disabled}>
      {disabled ? 'გაშვებულია...' : 'მაგალითის გაშვება'}
    </button>
  )
}

export default RunButton
