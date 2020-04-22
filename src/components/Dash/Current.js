import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { Card } from 'react-bootstrap'
import ReactPlayer from 'react-player'
import CurrentControls from '../Controls/CurrentControls'

export default function Current ({
  info,
  botId,
  song,
  handleReload
}) {
  const [queueState, setQueueState] = useState(false)

  const handleTriggerQueue = () => {
    setQueueState(!queueState)
  }

  const getRadioName = (link) => {
    switch (link) {
      case 'https://scdn.nrjaudio.fm/de/33003/mp3_128.mp3?origine=wlan&cdn_path=adswizz_lbs10&adws_out_b1':
        return 'NRJ'
      case 'http://mp3.topfm.c.nmdn.net/ps-topfm/livestream.mp3':
        return 'TopFM'
      case 'http://streams.radiobob.de/bob-national/mp3-128/streams.radiobob.de':
        return 'Bob'
      case 'http://streams.egofm.de/egoFM-hq':
        return 'EgoFM'
      case 'https://swr-edge-2035-fra-lg-cdn.cast.addradio.de/swr/swr3/live/mp3/128/stream.mp3':
        return 'SWR3'
      default:
        return ''
    }
  }

  return (
    <Card
      className='dashBoard_Card'
      bg='dark'
      text='light'
    >
      {(Array.isArray(info.Items)
        && info.Items.length > 0
        && song !== []
        && song !== 'none'
      )
        ? (
          <>
            <Card.Title className='dashBoard_Card_Title'>
              {song.Title ?? info.Items[0].Title}
            </Card.Title>
            <div className='dashBoard_youtube'>
              {info.Items[0].AudioType === 'youtube' &&
              (
                <ReactPlayer
                  width='24rem'
                  height='13.5rem'
                  url={song.Link ?? info.Items[0].Link}
                  light
                />
              )}
              {info.Items[0].AudioType === 'media' &&
              (
                <>
                  <p className='radioTitle'>
                    Radio {getRadioName(info.Items[0].Link)}
                  </p>
                </>
              )}
            </div>
            {info.Items[0].AudioType === 'youtube' &&
            (
              <Card.Body>
                Songs in Queue: {
                info.Items.length === 3
                  ? '3 or more'
                  : info.Items.length
              }{' '}
                <FontAwesomeIcon
                  onClick={handleTriggerQueue}
                  icon={queueState ? faMinusCircle : faPlusCircle}
                />
                {queueState &&
                info.Items.map((item, i) => {
                  return (
                    <p
                      className='queueItem'
                      key={i}
                    >
                      {item.Title}
                    </p>
                  )
                })}
              </Card.Body>)}
            <CurrentControls
              handleReload={handleReload}
              botId={botId}
            />
          </>)
        : (
          <>
            <Card.Title>
              No song is currently playing.
            </Card.Title>
          </>)}
    </Card>
  )
}
