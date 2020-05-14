import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import PlaylistModal from './PlaylistModal'
import { useDispatch, useSelector } from 'react-redux'
import { getPlaylistData, selectPlaylists } from './playlistSlice'
import ListPlaylists from './ListPlaylists'

export default function Playlist ({ botId }) {
  const playLists = useSelector(selectPlaylists)
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    dispatch(getPlaylistData(botId))
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
        variant='outline-light'
        className='createNewPlaylistButton'
        onClick={handleShowModal}
        size={'sm'}
      >
        New Playlist <FontAwesomeIcon icon={faPlusCircle} />
      </Button>
      {playLists.status === 'ready' && (
        <ListPlaylists botId={botId} />
      )}
    </div>
  )
}
