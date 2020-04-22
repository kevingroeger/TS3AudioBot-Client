import React, { useEffect, useState } from 'react'
import Current from './Current'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { fetchApi } from '../../utils/dataAccess'
import { Toast } from 'react-bootstrap'
import PlayNow from './PlayNow'

export default function DashBoard ({
  botId,
  handleStatus,
  handleToast
}) {
  const [info, setInfo] = useState([])
  const [song, setSong] = useState([])
  const [showTimer, setShowTimer] = useState(false)

  useEffect(() => {
    getData()
      .catch(e => console.error(e))
  }, [])

  useEffect(() => {
    console.log('trigger')
    handleReload()
      .catch(e => console.error(e))
  }, [botId])

  const getData = async () => {
    handleStatus('loading')
    const infoData = await fetchInfo()
    setInfo(infoData)
    const songData = await fetchSong()
    setSong(songData)
    handleStatus('loaded')
  }

  const fetchInfo = () => {
    return fetchApi(`/api/bot/use/${botId}/(/info`)
  }

  const fetchSong = () => {
    return fetchApi(`/api/bot/use/${botId}/(/song`)
  }

  const handleReload = async () => {
    getData()
      .catch(e => console.error(e))
  }

  return (
    <>
      <div className='toastcontainer'>
        <Toast
          show={showTimer}
          onClose={() => setShowTimer(false)}
        >
          <Toast.Header>
            <FontAwesomeIcon
              icon={faInfoCircle}
              size={'sm'}
            />
            {'  '}Automatic Reload
          </Toast.Header>
          <Toast.Body>
            Reloading shortly
          </Toast.Body>
        </Toast>
      </div>
      <div className='dashBoard'>
        <Current
          song={song}
          botId={botId}
          info={info}
          handleReload={handleReload}
        />
        <div
          className='reloadIconDiv'
          onClick={handleReload}
        >
          <FontAwesomeIcon
            className='reloadIcon'
            icon={faSyncAlt}
          />
        </div>
      </div>
      <PlayNow
        botId={botId}
        handleStatus={handleStatus}
        handleToast={handleToast}
        handleReload={handleReload}
      />
    </>
  )
}
