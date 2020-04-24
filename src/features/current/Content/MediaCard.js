import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { selectSong } from '../songSlice'
import CurrentControls from '../CurrentControls'
import { selectInfo } from '../infoSlice'
import QueuedItems from './QueuedItems'

export default function YoutubeCard ({ botId }) {
  const [radioStation, setRadioStation] = useState('not identified')
  const song = useSelector(selectSong)
  const info = useSelector(selectInfo)

  useEffect(() => {
    setRadioStation(getRadioName(song.Link))
  }, [])


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
        return 'not identified'
    }
  }
  return (
    <>
      <Card.Title className='dashBoard_Card_Title'>
        {song?.Title}
      </Card.Title>
      <p className='radioTitle'>
        {radioStation !== 'not identified'
          ? radioStation
          : 'Media'
        }
      </p>
      {info?.status === 'ready' && <QueuedItems />}
      <CurrentControls botId={botId} />
    </>
  )
}
