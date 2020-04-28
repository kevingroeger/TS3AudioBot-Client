import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  getInfoData
} from './infoSlice'

import {
  selectSong,
  selectTimer,
  getSongData
} from './songSlice'

import YoutubeCard from './Content/YoutubeCard'
import NoContentCard from './Content/NoContentCard'
import MediaCard from './Content/MediaCard'
import CurrentControls from './CurrentControls'
import { Col } from 'react-bootstrap'
import QueuedItems from './Content/QueuedItems'
import { useInterval } from '../../utils/customHooks'

export default function Current ({ botId }) {
  const song = useSelector(selectSong)
  const delay = useSelector(selectTimer)
  const dispatch = useDispatch()

  useEffect(() => {
    loadData()
  }, [])

  useInterval(() => {
    loadData()
  }, (!isNaN(delay) && delay > 0) ? delay * 1000 : 30000)
  // if no timer is set, reload after 30 sec

  useEffect(() => {
    loadData()
  }, [botId])

  const loadData = () => {
    dispatch(getInfoData(botId))
    dispatch(getSongData(botId))
  }

  return (
    <div className='playMenu'>
      <Col sm={5} className='playMenuShow'>
        {(song.status === 'ready' || song.status === 'control')
          ? (song.AudioType === 'youtube'
            ? <YoutubeCard botId={botId} />
            : <MediaCard botId={botId} />)
          : <NoContentCard />
        }
      </Col>
      <Col sm={5} className='playMenuControls' >
        <CurrentControls botId={botId} />
      </Col>
      <Col sm={2} className='playMenuQueued' >
        <QueuedItems />
      </Col>
    </div>
  )
}
