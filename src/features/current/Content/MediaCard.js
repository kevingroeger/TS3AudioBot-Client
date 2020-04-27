import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectSong } from '../songSlice'

export default function MediaCard () {
  const [radioStation, setRadioStation] = useState('not identified')
  const song = useSelector(selectSong)

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
      <div>
        {radioStation !== 'not identified'
          ? 'Radio ' + radioStation
          : 'Media'
        }
      </div>
      <div>
        {song?.Title}
      </div>
    </>
  )
}
