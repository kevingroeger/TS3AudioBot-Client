import React from 'react'
import { Col, Row } from 'react-bootstrap'
import SearchControls from './SearchControls'

function SearchResult ({
  title,
  timestamp,
  author,
  botId,
  url
}) {
  return (
    <Row className='searchResultRow'>
      <Col sm={7}>
        {title}
      </Col>
      <Col sm={3}>
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