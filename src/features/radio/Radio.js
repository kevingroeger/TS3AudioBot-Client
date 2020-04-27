import React from 'react'
import { Card, Col, Image, Row } from 'react-bootstrap'
import Controls from '../controls/Controls'
import { radioArray } from '../../utils/radio'

export default function Radio ({ botId }) {
  return (
    <>
      <div className='radioMenu'>
        {radioArray.map((item, i) => {
          return (
            <Row className='searchResultRow'>
              <Col sm={8} className={'firstcol'}>
                {item.name}
              </Col>
              <Col sm={4}>
                <Controls
                  radioUrl={item.url}
                  botId={botId}
                />
              </Col>
            </Row>
          )}
        )}
      </div>
    </>
  )
}
