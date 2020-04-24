import React, { useState } from 'react'
import { withRouter, useParams } from 'react-router-dom'
import { Tab, Tabs } from 'react-bootstrap'
import DashBoard from '../dashBoard/DashBoard'
import LoadingBar from './LoadingBar'
import Playlists from '../playlist/Playlist'
import Radio from '../radio/Radio'
import History from '../history/History'

function BotMenu () {
  let { botId } = useParams()
  const [activeTab, setActiveTab] = useState('dashBoard')

  return (
    <>
      <LoadingBar />
      <Tabs
        activeKey={activeTab}
        onSelect={(tab) => {setActiveTab(tab)}}
        mountOnEnter
      >
        <Tab
          eventKey='dashBoard'
          title='Dashboard'
        >
          <DashBoard botId={botId} />
        </Tab>
        <Tab
          eventKey='PlayList'
          title='Playlist'
        >
          <Playlists botId={botId} />
        </Tab>
        <Tab
          eventKey='radio'
          title='Radio'
        >
          <Radio botId={botId} />
        </Tab>
        <Tab
          eventKey='topList'
          title='Toplist'
        >

        </Tab>
        <Tab
          eventKey='history'
          title='History'
        >
          <History botId={botId} />
        </Tab>
      </Tabs>
    </>
  )
}

export default withRouter(BotMenu)
