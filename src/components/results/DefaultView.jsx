import React, { useState, useRef, useEffect } from 'react';
import { observer } from 'mobx-react';
import { pricesStore } from '../../store/PricesStore';
import ChadMagicOrbit from '../ChadMagicOrbit';
import geminiGamesLogo from '../../assets/gemini_games_logo.png';
import './result.scss';

const DefaultView = observer(() => {
  const [exiting, setExiting]           = useState(false)
  const [exitTransform, setExitTransform] = useState(null)
  const orbitWrapRef = useRef(null)

  useEffect(() => {
    if (pricesStore.sellersLoadingCount === 0 || exiting) return

    const loadingEl = document.querySelector('.loading-doughnut')
    const wrapEl    = orbitWrapRef.current
    if (!loadingEl || !wrapEl) return

    const wrapRect   = wrapEl.getBoundingClientRect()
    const targetRect = loadingEl.getBoundingClientRect()

    const dx    = (targetRect.left + targetRect.width  / 2) - (wrapRect.left + wrapRect.width  / 2)
    const dy    = (targetRect.top  + targetRect.height / 2) - (wrapRect.top  + wrapRect.height / 2)
    const scale = 80 / 220

    document.body.classList.add('orbit-animating')
    setExiting(true)

    // double rAF ensures the browser paints the element at its start position
    // before applying the transition, so the animation actually fires
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setExitTransform(`translate(${dx}px, ${dy}px) scale(${scale})`)
      })
    })
  }, [pricesStore.sellersLoadingCount, exiting])

  useEffect(() => {
    return () => document.body.classList.remove('orbit-animating')
  }, [])

  function handleTransitionEnd() {
    document.body.classList.remove('orbit-animating')
  }

  return (
    <div className={`default-view${exiting ? ' default-view--exiting' : ''}`}>
      <h2 className="default-view__text">Compare the Magic<br />is a proud friend of</h2>
      <div
        ref={orbitWrapRef}
        className="default-view__orbit-wrap"
        style={exitTransform ? {
          transform:  exitTransform,
          transition: 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)',
        } : undefined}
        onTransitionEnd={handleTransitionEnd}
      >
        <ChadMagicOrbit fast={exiting} />
      </div>
      <h2 className="default-view__text default-view__and">and</h2>
      <a
        href="https://geminigames.uk/"
        target="_blank"
        rel="noopener noreferrer"
        className="default-view__gemini-link"
        aria-label="Visit the Gemini Games website"
      >
        <img src={geminiGamesLogo} alt="Gemini Games" className="default-view__gemini-logo" />
      </a>
    </div>
  )
})

export default DefaultView;
