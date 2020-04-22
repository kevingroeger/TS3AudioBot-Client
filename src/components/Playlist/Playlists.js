import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import Controls from '../Controls/Controls'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import PlaylistModal from './PlaylistModal'
import { fetchApi } from '../../utils/dataAccess'

export default function Playlists ({ botId }) {
  const [showModal, setShowModal] = useState(false)
  const [playLists, setPlayLists] = useState([])

  useEffect(() => {
    initPlaylists()
      .catch(e => console.error(e))
  }, [])

  const initPlaylists = async () => {
    const playListData = await fetchPlaylists()
    setPlayLists(playListData)
  }

  const fetchPlaylists = () => {
    return fetchApi(`/api/bot/use/${botId}/(/list/list`)
  }


  const handleShowModal = () => {
    setShowModal(true)
  }

  const handleHideModal = () => {
    setShowModal(false)
  }

  return (
    <div className='playlistInfo'>
      <PlaylistModal
        botId={botId}
        show={showModal}
        handleClose={handleHideModal}
      />
      <Button
        className='createNewPlaylistButton'
        variant='dark'
        onClick={handleShowModal}
      >
        New Playlist <FontAwesomeIcon icon={faPlusCircle} />
      </Button>
      <div className='playlist_list'>
        {Array.isArray(playLists) && playLists.length > 0 ? playLists.map((item, i) => {
          return (
            <Card
              className='singlePlaylist'
              key={`playlist_${i}`}
            >
              <Card.Title>Name: {item.Title}</Card.Title>
              <Card.Subtitle><p>Id: {item.Id}</p></Card.Subtitle>
              <Card.Body>Songs: {item.SongCount}</Card.Body>
              <Controls
                botId={botId}
                listId={item.Id}
              />
            </Card>)
        }) : (
          <div className='singlePlaylist'>
            No Playlists
          </div>
        )}
      </div>
    </div>
  )
}
