import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faForward } from '@fortawesome/free-solid-svg-icons'
import { fetchApi } from '../../utils/dataAccess'

export default function CurrentControls ({
  botId,
  handleReload
}) {
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    getPauseState()
  }, [])

  const pause = () => {
    fetchApi(`/api/bot/use/${botId}/(/pause`)
      .catch(e => console.error(e))
    getPauseState()
  }

  const getPauseState = () => {
    fetchApi(`/api/bot/use/${botId}/(/song`)
      .then(res => {
        if (res.status !== 422) {
          setIsPaused(res.Paused)
          handleReload()
        }
      })
  }

  const next = () => {
    fetchApi(`/api/bot/use/${botId}/(/next`)
      .catch(e => console.error(e))
  }

  return (
    <div className='stickToBottom'>
      <div className='card_controls_current'>
        <div
          className='card_controls_current_playpause'
          onClick={() => pause()}
        >
          {isPaused
            ? (
              <FontAwesomeIcon
                icon={faPlay}
              />)
            : (
              <FontAwesomeIcon
                icon={faPause}
              />)}
        </div>
        <div
          className='card_controls_current_next'
          onClick={next}
        >
          <FontAwesomeIcon
            icon={faForward}
          />
        </div>
      </div>
    </div>
  )
}
