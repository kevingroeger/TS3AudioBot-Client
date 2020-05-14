import React, { useState } from 'react'
import { Alert, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faTrash } from '@fortawesome/free-solid-svg-icons'
import { fetchApi } from '../utils/dataAccess'
const config = window.require('electron-json-config')

export default function Settings () {
  const [url, setUrl] = useState(config.get('baseUrl', window.Configs.baseUrl))
  const [bots, setBots] = useState(JSON.stringify(config.get('bots', window.Configs.botArray)))
  const [apiKey, setApiKey] = useState(config.get('apiKey', window.Configs.apiKey))
  const [fetchError, setFetchError] = useState(false)

  const handleSave = () => {
    config.set('bots', JSON.parse(bots))
    config.set('baseUrl', url)
    config.set('apiKey', apiKey)
    window.location.reload()
  }

  const reloadConfig = () => {
    config.purge()
    config.set('bots', config.get('bots', window.Configs.botArray))
    config.set('baseUrl', config.get('baseUrl', window.Configs.baseUrl))
    config.set('apiKey', config.get('apiKey', window.Configs.apiKey))
    window.location.reload(true)
  }

  const handleChangeBots = (event) => {
    event.preventDefault()
    setBots(event.target.value)
  }

  const handleChangeUrl = (event) => {
    event.preventDefault()
    setUrl(event.target.value)
  }

  const handleChangeApiKey = (event) => {
    event.preventDefault()
    setApiKey(event.target.value)
  }

  const getBotConfig = async () => {
    try {
      const result = await fetchApi('/api/bot/list')
      const newArray = []
      result.forEach(item => {
        let newObj = {}
        newObj.name = item.Name
        newObj.id = item.Id
        newArray.push(newObj)
      })
      setBots(JSON.stringify(newArray))
    } catch (e) {
      setFetchError(true)
    }
  }

  return (
    <>
      <div className='settingsHl'>
        <h4>Configuration</h4>
        <p
          className='versionheader'
        >
          v_1.0.1
        </p>
        {fetchError && (
          <Alert
            variant='danger'
            dismissible
            onClose={() => setFetchError(false)}
          >
            Something went wrong! <br/>
            Please try saving your Base URL first.
          </Alert>)}
        <div className='baseUrl'>
          <h5>Base URL</h5>
          <input
            type='text'
            onChange={handleChangeUrl}
            value={url}
          />
        </div>
        <div className='bots'>
          <h5>Bot Config</h5>
          <input
            type='text'
            onChange={handleChangeBots}
            value={bots}
          />
          <OverlayTrigger
            placement='right'
            overlay={
              <Tooltip id='tooltip_fetch'>
                Click here to automatically set the Bot Config.
                You might have to save your Base URL first.
              </Tooltip>
            }
          >
            <FontAwesomeIcon
              className='somemarginleft'
              icon={faDownload}
              onClick={() => getBotConfig()}
            />
          </OverlayTrigger>
        </div>
        <div className='bots'>
          <h5>API Key</h5>
          <input
            type='text'
            onChange={handleChangeApiKey}
            placeholder='Optional, you might not need this.'
            value={apiKey}
          />
        </div>
        <OverlayTrigger
          placement='right'
          overlay={
            <Tooltip id='tooltip_save'>
              Permanently saves the configuration.
            </Tooltip>
          }
        >
          <Button
            onClick={() => handleSave()}
            variant='outline-light'
            size={'sm'}
            className='somemargintop customButton'
          >
            Save
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          overlay={
            <Tooltip id='tooltip_delete'>
              Deletes the current configuration
            </Tooltip>
          }
        >
          <FontAwesomeIcon
            className='trashCan'
            icon={faTrash}
            onClick={() => reloadConfig()}
          />
        </OverlayTrigger>
      </div>
    </>
  )
}
