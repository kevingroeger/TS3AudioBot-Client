import React, { useState } from 'react'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Alert, Button } from 'react-bootstrap'
import { BarLoader } from 'react-spinners'
import { fetchApi } from '../../utils/dataAccess'
const config = window.require('electron-json-config')
const savedBackground = config.get('background', window.Configs.savedBackground)

export default function PlaylistModal ({
  handleClose,
  show,
  botId
}) {
  const [url, setUrl] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState('init')

  const showHideClassName = show ? 'modal display-block' : 'modal display-none'

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleCloseAndReset = () => {
    setStatus('init')
    setUrl('')
    setName('')
    handleClose()
  }

  const handleSubmit = () => {
    setStatus('loading')
    submitData()
      .then((res) => {
        res.Title
          ? setStatus('success')
          : setStatus('failed')
      })
      .catch(() => setStatus('failed'))
  }

  const submitData = () => {
    return fetchApi(`/api/bot/use/${botId}/(/list/import/${name}/${encodeURIComponent(url)}`)
  }

  return (
    <div className={showHideClassName}>
      <div className='modal-main'>
        <FontAwesomeIcon
          className='topright'
          icon={faTimes}
          onClick={handleCloseAndReset}
        />

        {status === 'init' && (
          <div className='modalContents'>
            <label>Name</label>
            <input
              type='text'
              value={name}
              onChange={handleNameChange}
              placeholder='The name cannot include whitespaces'
            />
            <label>Url</label>
            <input
              type='text'
              value={url}
              onChange={handleUrlChange}
              placeholder={'https://www.youtube.com/watch?v=IIwiM777OzQ&list=PLRBp0Fe2GpgkDkEB_DuBqPuS5O3iIDQ2N'}
            />
            <Button
              className='customButton'
              variant='success'
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>)}

        {status === 'loading' && (
          <BarLoader
            loading
            color='#7A94FF'
            width='100%'
            height='5'
          />
        )}

        {status === 'success' && (
          <Alert
            variant='success'
          >
            Playlist erstellt
          </Alert>
        )}

        {status === 'failed' && (
          <Alert
            variant='danger'
          >
            Playlist konnte nicht erstellt werden
          </Alert>
        )}
      </div>
    </div>
  )
}
