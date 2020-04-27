import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Controls from '../controls/Controls'
import { useSelector } from 'react-redux'
import { selectPlaylists } from './playlistSlice'

export default function Listplaylists ({ botId }) {
  const playlists = useSelector(selectPlaylists)
  return (
    <div className='playlist_list'>
      {Array.isArray(playlists.playlists) && playlists.playlists.length > 0 ? playlists.playlists.map((item, i) => {
        return (
          <Row className='searchResultRow'>
            <Col sm={5} className='firstcol'>
              {item.Title}
            </Col>
            <Col sm={4}>
              Songs: {item.SongCount}
            </Col>
            <Col sm={3}>
              <Controls
                botId={botId}
                listId={item.Id}
              />
            </Col>
          </Row>)
      }) : (
        <div className='singlePlaylist'>
          No Playlists
        </div>
      )}
    </div>
  )
}
