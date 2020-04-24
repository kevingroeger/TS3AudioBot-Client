import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faForward } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { nextSongAction, playOrPauseAction, selectSong } from './songSlice'

export default function CurrentControls ({ botId }) {
  const song = useSelector(selectSong)
  const dispatch = useDispatch()

  const pause = () => {
    dispatch(playOrPauseAction(botId))
  }

  const next = () => {
    dispatch(nextSongAction(botId))
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
