import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { fetchApi } from '../../utils/dataAccess'

export default function Controls ({
  url,
  botId,
  listId,
  index,
  isTopList,
  radioUrl,
  handleToast
}) {
  const [isSong, setIsSong] = useState(true)
  const [isRadio, setIsRadio] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!url) {
      setIsSong(false)
    }
    if (radioUrl) {
      setIsRadio(true)
    }
  }, [])

  const addSongToPlayList = () => {
    setLoading(true)
    songAddToQueue()
      .then((res) => handleToast(res, 'add'))
      .catch(e => console.error(e))
    setLoading(false)
  }

  const songAddToQueue = () => {
    return fetchApi(`/api/bot/use/${botId}/(/history/add/${index}`)
  }

  const playSongNow = () => {
    setLoading(true)
    songPlayNow()
      .then((res) => handleToast(res, 'play'))
      .catch(e => console.error(e))
    setLoading(false)
  }

  const songPlayNow = () => {
    return fetchApi(`/api/bot/use/${botId}/(/history/play/${index}`)
  }
  const playRadioNow = () => {
    setLoading(true)
    radioPlayNow()
      .then((res) => handleToast(res, 'play'))
      .catch(e => console.error(e))
    setLoading(false)
  }

  const radioPlayNow = () => {
    return fetchApi(`/api/bot/use/${botId}/(/play/${encodeURIComponent(radioUrl)}`)
  }

  const addPlayListToPlaylist = () => {
    setLoading(true)
    listAddToQueue()
      .then((res) => handleToast(res, 'add'))
      .catch(e => console.error(e))
    setLoading(false)
  }

  const listAddToQueue = () => {
    return fetchApi(`/api/bot/use/${botId}/(/list/queue/${listId}`)
  }

  const playPlaylistNow = () => {
    setLoading(true)
    listPlayNow()
      .then((res) => handleToast(res, 'play'))
      .catch(e => console.error(e))
    setLoading(false)
  }

  const listPlayNow = () => {
    return fetchApi(`/api/bot/use/${botId}/(/list/play/${listId}`)
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
        {loading
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
        >{loading
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
