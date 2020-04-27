import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Controls from '../controls/Controls'

export default function HistoryEntry ({
  item,
  botId,
}) {
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
          index={item.Id}
          botId={botId}
          url={`https://youtube.com/watch?v=${item.AudioResource.resid}`}
        />
      </Col>
    </Row>
  )
}
