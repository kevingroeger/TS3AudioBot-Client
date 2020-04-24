import React, { useState } from 'react'
import { Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { selectInfo } from '../infoSlice'

export default function QueuedItems () {
  const [queueState, setQueueState] = useState(false)
  const info = useSelector(selectInfo)
  return (
    <>
      {info?.Items[0].AudioType === 'youtube' && (
        <Card.Body>
          Songs in Queue: {
          info.Items.length === 3
            ? '3 or more'
            : info.Items.length
        }{' '}
          <FontAwesomeIcon
            onClick={() => setQueueState(!queueState)}
            icon={queueState ? faMinusCircle : faPlusCircle}
          />
          {queueState &&
          info.Items.map((item, i) => {
            return (
              <p
                className='queueItem'
                key={i}
              >
                {item?.Title}
              </p>
            )
          })}
        </Card.Body>
      )}
    </>
  )
}
