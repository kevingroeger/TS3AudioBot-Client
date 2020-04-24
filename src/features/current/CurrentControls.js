import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faForward } from '@fortawesome/free-solid-svg-icons'
import { fetchApi } from '../../utils/dataAccess'
import { useSelector } from 'react-redux'
import { selectSong } from './songSlice'

export default function CurrentControls ({ botId }) {
  const song = useSelector(selectSong)

  const pause = () => {
    fetchApi(`/api/bot/use/${botId}/(/pause`)
      .catch(e => console.error(e))
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
          {song?.Paused
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
