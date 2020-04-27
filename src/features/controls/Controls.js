import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  listAddToQueue,
  listPlayNow,
  radioPlayNow,
  selectControlStatus,
  songAddToQueue,
  songPlayNow
} from './controlsSlice'

export default function Controls ({
  url,
  botId,
  listId,
  index,
  isTopList,
  radioUrl
}) {
  const dispatch = useDispatch()
  const status = useSelector(selectControlStatus)
  const [isSong, setIsSong] = useState(true)
  const [isRadio, setIsRadio] = useState(false)

  useEffect(() => {
    if (!url) {
      setIsSong(false)
    }
    if (radioUrl) {
      setIsRadio(true)
    }
  }, [])

  const addSongToPlayList = () => {
    dispatch(songAddToQueue(botId, index))
  }
  const playSongNow = () => {
    dispatch(songPlayNow(botId, index))
  }
  const playPlaylistNow = () => {
    dispatch(listPlayNow(botId, listId))
  }
  const addPlayListToPlaylist = () => {
    dispatch(listAddToQueue(botId, listId))
  }
  const playRadioNow = () => {
    dispatch(radioPlayNow(botId, radioUrl))
  }

  return (
    <div
      className={
        isTopList
          ? 'card_controls_toplist'
          : isRadio
          ? 'card_controls_radio'
          : 'card_controls'
      }
    >
      <OverlayTrigger
        placement='top'
        overlay={
          <Tooltip id='1'>
            Play this{isSong ? ' song' : isRadio ? ' radio' : ' playlist'}
          </Tooltip>
        }
      >
        {status === 'loading'
          ? <FontAwesomeIcon icon={faSpinner} spin />
          : (
            <FontAwesomeIcon
              icon={faPlay}
              onClick={
                isSong
                  ? playSongNow
                  : isRadio
                  ? playRadioNow
                  : playPlaylistNow
              }
            />)}
      </OverlayTrigger>
      {!isRadio &&
      <OverlayTrigger
        placement='top'
        overlay={
          <Tooltip id='2'>
            Add this{isSong ? ' song ' : ' playlist '}to the list
          </Tooltip>
        }
      >{status === 'loading'
        ? <FontAwesomeIcon icon={faSpinner} spin />
        : (
          <FontAwesomeIcon
            icon={faPlus}
            onClick={
              isSong ? addSongToPlayList : addPlayListToPlaylist
            }
          />)}
      </OverlayTrigger>}
    </div>
  )
}
