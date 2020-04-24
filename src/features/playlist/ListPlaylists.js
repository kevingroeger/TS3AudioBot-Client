import React from 'react'
import { Card } from 'react-bootstrap'
import Controls from '../../components/Controls/Controls'
import { useSelector } from 'react-redux'
import { selectPlaylists } from './playlistSlice'

export default function Listplaylists ({ botId }) {
  const playlists = useSelector(selectPlaylists)
  return (
    <div className='playlist_list'>
      {Array.isArray(playlists.playlists) && playlists.playlists.length > 0 ? playlists.playlists.map((item, i) => {
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
  )
}
