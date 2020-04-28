import React from 'react'
import { Col, Row } from 'react-bootstrap'
import SearchControls from './SearchControls'
import { useDispatch } from 'react-redux'
import { songPlayNowSearch } from '../controls/controlsSlice'

function SearchResult ({
  title,
  timestamp,
  author,
  botId,
  url
}) {
  const dispatch = useDispatch()
  const playSongNow = () => {
    dispatch(songPlayNowSearch(botId, encodeURIComponent(url)))
  }

  return (
    <Row
      className='searchResultRow'
      onDoubleClick={() => playSongNow()}
    >
      <Col sm={7} className='cantMarkText'>
        {title}
      </Col>
      <Col sm={3} className='cantMarkText'>
        {author}
      </Col>
      <Col sm={1} className='searchResultTimeStamp'>
        {timestamp}
      </Col>
      <Col sm={1}>
        <SearchControls
          botId={botId}
          url={encodeURIComponent(url)}
        />
      </Col>
    </Row>
  )
}

export default SearchResult