import React from 'react'
import logo from '../assets/chag-magic-logo.jpg'
import './ChadMagicOrbit.scss'

const DEFAULT_ITEMS = [
  { color: '#e8e8e0' },
  { color: '#5b9bd5' },
  { color: '#5a5a5a' },
  { color: '#e05252' },
  { color: '#4caf50' },
]

const OUTER_R = 94
const INNER_R = 76
const SPAN    = 56
const PERIOD_SLOW = 32
const PERIOD_FAST = 3 

function xy(angleDeg, r) {
  const rad = angleDeg * Math.PI / 180
  return [+(100 + r * Math.sin(rad)).toFixed(2), +(100 - r * Math.cos(rad)).toFixed(2)]
}

function arcPath(centerDeg) {
  const a1 = centerDeg - SPAN / 2
  const a2 = centerDeg + SPAN / 2
  const [ox1, oy1] = xy(a1, OUTER_R)
  const [ox2, oy2] = xy(a2, OUTER_R)
  const [ix2, iy2] = xy(a2, INNER_R)
  const [ix1, iy1] = xy(a1, INNER_R)
  return `M ${ox1} ${oy1} A ${OUTER_R} ${OUTER_R} 0 0 1 ${ox2} ${oy2} L ${ix2} ${iy2} A ${INNER_R} ${INNER_R} 0 0 0 ${ix1} ${iy1} Z`
}

/**
 * props:
 *   items    — array of { color } segments (defaults to MTG colour pie)
 *   logoSrc  — image src (defaults to the Chag Magic logo)
 *   showRing — whether to render the spinning colour ring (default true)
 *   spinning — whether the ring animation is running (default true)
 *   fast     — true for a faster rotation, false for slow (default false)
 *   size     — diameter in px for the scene (default 220)
 */
export default function ChadMagicOrbit({ items = DEFAULT_ITEMS, logoSrc = logo, showRing = true, spinning = true, fast = false, size = 220 }) {
  const anglePer = 360 / items.length
  const period = fast ? PERIOD_FAST : PERIOD_SLOW

  return (
    <div className="cmo-root">
      <div
        className="cmo-scene"
        style={{
          '--orbit-play-state':  spinning ? 'running' : 'paused',
          '--orbit-period':      `${period}s`,
          '--orbit-align-delay': `${-period / 4}s`,
          width:  size,
          height: size,
        }}
      >
        <div className="cmo-logo-wrapper">
          <img src={logoSrc} alt="Chag Magic" className="cmo-logo-img" />
          {showRing && (
            <svg className="cmo-logo-segs" viewBox="0 0 200 200" aria-hidden="true">
              <defs>
                <mask id="cmo-ring-mask">
                  <circle cx="100" cy="100" r={OUTER_R} fill="white" />
                  <circle cx="100" cy="100" r={INNER_R} fill="black" />
                </mask>
              </defs>
              <rect x="0" y="0" width="200" height="200" fill="black" mask="url(#cmo-ring-mask)" />
              <g className="cmo-segs-group">
                {items.map((item, i) => (
                  <path
                    key={i}
                    d={arcPath(i * anglePer)}
                    fill={item.color}
                    className="cmo-seg"
                  />
                ))}
              </g>
            </svg>
          )}
        </div>
      </div>
    </div>
  )
}
