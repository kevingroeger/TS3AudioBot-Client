import React, { useState } from 'react'
import { withRouter, useParams } from 'react-router-dom'
import { Tab, Tabs } from 'react-bootstrap'
import DashBoard from '../dashBoard/DashBoard'
import LoadingBar from './LoadingBar'
import Playlists from '../playlist/Playlist'
import Radio from '../radio/Radio'
import History from '../history/History'
import Toplist from '../toplist/Toplist'
import { useDispatch } from 'react-redux'
import { getSongData } from '../current/songSlice'
import { getLastTwelveHistoryEntries } from '../history/historySlice'

function BotMenu () {
  let { botId } = useParams()
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('dashBoard')

  const handleTab = (tab) => {
    // TODO: rewrite to extensive switch
    if (tab === 'dashBoard') {
      dispatch(getSongData(botId))
    }
    if (tab === 'history') {
      dispatch(getLastTwelveHistoryEntries(botId))
    }
    setActiveTab(tab)
  }

  return (
    <>
      <LoadingBar />
      <Tabs
        activeKey={activeTab}
        onSelect={(tab) => handleTab(tab)}
        mountOnEnter
        id='tabs_botmenu'
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
          <Toplist botId={botId} />
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
