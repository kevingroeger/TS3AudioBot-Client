import React from 'react'
import Controls from '../controls/Controls'
import { Col, Row } from 'react-bootstrap'

function ToplistEntry ({ botId, item, id: i }) {
  return (
    <Row className='searchResultRow'>
      <Col sm={5} className='firstcol'>
        {item.AudioResource.title}
      </Col>
      <Col sm={4}>
        PlayCount: {item.PlayCount}
      </Col>
      <Col sm={3}>
        <Controls
          botId={botId}
          index={item.Id}
          isTopList
          url={`https://youtube.com/watch?v=${item.AudioResource.resid}`}
        />
      </Col>
    </Row>
  )
}

export default ToplistEntry