import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { nextSongAction, playOrPauseAction, selectSong } from './songSlice'

export default function CurrentControls ({ botId }) {
  const song = useSelector(selectSong)
  const dispatch = useDispatch()

  const pause = () => {
    dispatch(playOrPauseAction(botId))
  }

  const prev = () => {
    dispatch(nextSongAction(botId))
  }

  const next = () => {
    dispatch(nextSongAction(botId))
  }

  return (
    <>
      <div onClick={() => prev()}>
        <FontAwesomeIcon
          icon={faBackward}
        />
      </div>
      <div onClick={() => pause()}>
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
      <div onClick={next}>
        <FontAwesomeIcon
          icon={faForward}
        />
      </div>
    </>
  )
}
