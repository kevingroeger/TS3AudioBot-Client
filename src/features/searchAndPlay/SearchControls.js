import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectControlStatus,
  songAddToQueueSearch,
  songPlayNowSearch,
} from '../controls/controlsSlice'

export default function SearchControls ({ url, botId }) {
  const dispatch = useDispatch()
  const controlStatus = useSelector(selectControlStatus)

  const addSongToPlayList = () => {
    dispatch(songAddToQueueSearch(botId, url))
  }
  const playSongNow = () => {
    dispatch(songPlayNowSearch(botId, url))
  }

  return (
    <div className='searchControls'>
      <OverlayTrigger
        placement='top'
        overlay={
          <Tooltip id='1'>
            Play this song now
          </Tooltip>
        }
      >
        {controlStatus === 'loading'
          ? <FontAwesomeIcon icon={faSpinner} spin />
          : (
            <FontAwesomeIcon
              icon={faPlay}
              onClick={playSongNow}
            />)}
      </OverlayTrigger>
      <OverlayTrigger
        placement='top'
        overlay={
          <Tooltip id='2'>
            Add this song to the list
          </Tooltip>
        }
      >{controlStatus === 'loading'
        ? <FontAwesomeIcon icon={faSpinner} spin />
        : (
          <FontAwesomeIcon
            icon={faPlus}
            onClick={addSongToPlayList}
          />)}
      </OverlayTrigger>
    </div>
  )
}
