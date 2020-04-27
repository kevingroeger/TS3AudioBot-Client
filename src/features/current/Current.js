import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  getInfoData
} from './infoSlice'

import {
  selectSong,
  getSongData
} from './songSlice'

import YoutubeCard from './Content/YoutubeCard'
import NoContentCard from './Content/NoContentCard'
import MediaCard from './Content/MediaCard'
import CurrentControls from './CurrentControls'
import { Col } from 'react-bootstrap'

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
    <div className='playMenu'>
      <Col sm={5} className='playMenuShow'>
        {(song.status === 'ready' || song.status === 'control')
          ? (song.AudioType === 'youtube'
            ? <YoutubeCard botId={botId} />
            : <MediaCard botId={botId} />)
          : <NoContentCard />
        }
      </Col>
      <Col sm={7} className='playMenuControls' >
        <CurrentControls botId={botId} />
      </Col>
    </div>
  )
}
