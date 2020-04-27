import React from 'react'
import { useSelector } from 'react-redux'
import { selectInfo } from '../infoSlice'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

export default function QueuedItems () {
  const info = useSelector(selectInfo)
  return (
    <>
      {info?.Items[0]?.AudioType === 'youtube' && (
        <OverlayTrigger
          overlay={
            <Tooltip id='queue_tooltip'>
              <ol>
                {info.Items.map((item, i) => {
                  return (
                    <li
                      className='queueItem'
                      key={i}
                    >
                      {item?.Title}
                    </li>
                  )
                })}
              </ol>
            </Tooltip>
          }
        >
          <div className='songsInQueue'>
            Songs in Queue: {
            info.Items.length === 3
              ? '3+'
              : info.Items.length
          }
          </div>
        </OverlayTrigger>
      )}
    </>
  )
}
