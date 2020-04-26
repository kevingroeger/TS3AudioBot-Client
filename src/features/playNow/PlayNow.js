import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  addToQueueAction,
  playNowAction,
  selectPlayNowStatus
} from './playNowSlice'
import { getInfoData } from '../current/infoSlice'
import { getSongData } from '../current/songSlice'

export default function PlayNow ({ botId }) {
  const status = useSelector(selectPlayNowStatus)
  const dispatch = useDispatch()
  const [playNowLink, setPlayNowLink] = useState('')

  useEffect(() => {
    if (status === 'ready') {
      dispatch(getInfoData(botId))
      dispatch(getSongData(botId))
    }
  }, [status])


  const handleChangeLink = (event) => {
    setPlayNowLink(event.target.value)
  }

  const playNow = () => {
    dispatch(playNowAction(botId, playNowLink))
  }

  const addToQueue = () => {
    dispatch(addToQueueAction(botId, playNowLink))
  }

  return (
    <div className='playNow'>
      <h4>Play Now</h4>
      <div className='playNowMenu'>
        <input
          type='text'
          placeholder='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
          onChange={handleChangeLink}
        />
        <Button
          disabled={playNowLink === ''}
          variant='outline-light'
          onClick={() => playNow()}
        >
          Play Now
        </Button>
        <Button
          disabled={playNowLink === ''}
          variant='outline-light'
          onClick={() => addToQueue()}
        >
          Add
        </Button>
      </div>
    </div>
  )
}
