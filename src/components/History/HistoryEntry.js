import React from 'react'
import { Card } from 'react-bootstrap'
import ReactPlayer from 'react-player'
import Controls from '../Controls/Controls'

export default function HistoryEntry ({
  item,
  botId,
  handleToast,
}) {
  return (
    <Card
      className='youtubeCards'
      bg='dark'
      text='light'
    >
      <Card.Body>
        <Card.Title>
          {item.AudioResource.title}
        </Card.Title>
        <Card.Subtitle className='subtitlePlayCount'>
          PlayCount: {item.PlayCount}
        </Card.Subtitle>
        <div className='ytplayer'>
          {item.AudioResource.type === 'youtube' &&
            <ReactPlayer
              light
              width='16rem'
              height='9rem'
              url={`https://youtube.com/watch?v=${item.AudioResource.resid}`}
            />}
        </div>
        <Controls
          handleToast={handleToast}
          index={item.Id}
          botId={botId}
          url={`https://youtube.com/watch?v=${item.AudioResource.resid}`}
        />
      </Card.Body>
    </Card>

  )
}
