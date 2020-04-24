import React from 'react'
import { Card } from 'react-bootstrap'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { selectSong } from '../songSlice'
import CurrentControls from '../CurrentControls'
import QueuedItems from './QueuedItems'
import { selectInfo } from '../infoSlice'

export default function YoutubeCard ({ botId }) {
  const song = useSelector(selectSong)
  const info = useSelector(selectInfo)
  return (
    <>
      <Card.Title className='dashBoard_Card_Title'>
        {song?.Title}
      </Card.Title>
      <div className='dashBoard_youtube'>
        <ReactPlayer
          width='24rem'
          height='13.5rem'
          url={song?.Link}
          light
        />
      </div>
      {info?.status === 'ready' && <QueuedItems />}
      <CurrentControls botId={botId} />
    </>
  )
}
