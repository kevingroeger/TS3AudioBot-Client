import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Tab, Tabs, Toast } from 'react-bootstrap'
import { BarLoader } from 'react-spinners'
import Playlists from './Playlist/Playlists'
import TopList from './History/TopList'
import Radio from './Radio'
import History from './History/History'
import DashBoard from '../features/dashBoard/DashBoard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

function BotMenu (props) {
  const [status, setStatus] = useState('init')
  const [activeTab, setActiveTab] = useState('dashBoard')
  const [showToast, setShowToast] = useState(false)
  const [toastText, setToastText] = useState('')

  const botId = props.match.params.id

  const handleStatus = (newStatus) => {
    setStatus(newStatus)
  }

  const handleToast = (res, playOrAdd) => {
    if (res === 'ok') {
      if (playOrAdd === 'play') {
        setToastText('Playing now')
        setShowToast(true)
      } else if (playOrAdd === 'add') {
        setToastText('Added to queue')
        setShowToast(true)
      }
    }
  }

  return (
    <>
      {status === 'loading' && (
        <BarLoader
          loading
          color='#7A94FF'
          width='100%'
          height='5px'
        />
      )}
      <div className='toastcontainer'>
        <Toast
          show={showToast}
          autohide
          onClose={() => setShowToast(false)}
        >
          <Toast.Header
            closeButton={false}
          >
            <FontAwesomeIcon
              icon={faInfoCircle}
              size={'sm'}
            />
            {' '}Info
          </Toast.Header>
          <Toast.Body>
            {toastText}
          </Toast.Body>
        </Toast>
      </div>
      <Tabs
        activeKey={activeTab}
        onSelect={(tab) => {setActiveTab(tab)}}
        mountOnEnter
      >
        <Tab
          eventKey='dashBoard'
          title='Dashboard'
        >
          <DashBoard
            activeTab={activeTab}
            handleToast={handleToast}
            botId={botId}
            status={status}
            handleStatus={handleStatus}
          />
        </Tab>
        <Tab
          eventKey='PlayList'
          title='Playlist'
        >
          <Playlists
            handleStatus={handleStatus}
            botId={botId}
          />
        </Tab>
        <Tab
          eventKey='radio'
          title='Radio'
        >
          <Radio
            handleToast={handleToast}
            handleStatus={handleStatus}
            botId={botId}
          />
        </Tab>
        <Tab
          eventKey='topList'
          title='Toplist'
        >
          <TopList
            handleToast={handleToast}
            handleStatus={handleStatus}
            botId={botId}
          />
        </Tab>
        <Tab
          eventKey='history'
          title='History'
        >
          <History
            handleToast={handleToast}
            handleStatus={handleStatus}
            botId={botId}
            status={status}
          />
        </Tab>
      </Tabs>
    </>
  )
}

export default withRouter(BotMenu)
