import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { fetchApi } from '../../utils/dataAccess'

export default function PlayNow ({
  botId,
  handleReload,
  handleToast
}) {
  const [playNowLink, setPlayNowLink] = useState('')
  const playNowAction = () => {
    playNow().catch(e => console.error(e))
  }

  const playNow = () => {
    const response = fetchApi(`/api/bot/use/${botId}/(/play/${encodeURIComponent(playNowLink)}`)
    handleReload()
    return response
  }
  const addToQueueAction = () => {
    addToQueue().catch(e => console.error(e))
  }

  const addToQueue = () => {
    const response = fetchApi(`/api/bot/use/${botId}/(/add/${encodeURIComponent(playNowLink)}`)
    handleReload()
    return response
  }

  const handleChangeLink = (event) => {
    setPlayNowLink(event.target.value)
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
          onClick={() => {
            handleToast('ok', 'play')
            playNowAction()
          }}
        >
          Play Now
        </Button>
        <Button
          disabled={playNowLink === ''}
          variant='outline-light'
          onClick={() => {
            handleToast('ok', 'add')
            addToQueueAction()
          }}
        >
          Add
        </Button>
      </div>
    </div>
  )
}
