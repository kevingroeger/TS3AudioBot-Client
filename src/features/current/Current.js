import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import {
  getInfoData
} from './infoSlice'

import {
  selectSong,
  getSongData
} from './songSlice'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import YoutubeCard from './Content/YoutubeCard'
import NoContentCard from './Content/NoContentCard'
import MediaCard from './Content/MediaCard'

export default function Current ({ botId }) {
  const song = useSelector(selectSong)
  const dispatch = useDispatch()

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    loadData()
  }, [botId])

  const loadData = () => {
    dispatch(getInfoData(botId))
    dispatch(getSongData(botId))
  }

  return (
    <>
      <div
        className='reloadIconDiv'
        onClick={loadData}
      >
        <FontAwesomeIcon
          className='reloadIcon'
          icon={faSyncAlt}
        />
      </div>
      <Card
        className='dashBoard_Card'
        bg='dark'
        text='light'
      >
        {(song.status === 'ready' || song.status === 'control')
          ? (song.AudioType === 'youtube'
            ? <YoutubeCard botId={botId} />
            : <MediaCard botId={botId} />)
          : <NoContentCard />
        }
      </Card>
    </>
  )
}
