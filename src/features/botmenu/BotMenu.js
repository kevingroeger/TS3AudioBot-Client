import React, { useEffect, useState } from 'react'
import { withRouter, useParams } from 'react-router-dom'
import { Col, Nav, Row, Tab } from 'react-bootstrap'
import DashBoard from '../dashBoard/DashBoard'
import Playlists from '../playlist/Playlist'
import Radio from '../radio/Radio'
import History from '../history/History'
import Toplist from '../toplist/Toplist'
import { useDispatch, useSelector } from 'react-redux'
import { getSongData } from '../current/songSlice'
import Current from '../current/Current'
import { selectControlStatus } from '../controls/controlsSlice'
import { getInfoData } from '../current/infoSlice'

function BotMenu () {
  let { botId } = useParams()
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('dashBoard')
  const status = useSelector(selectControlStatus)

  useEffect(() => {
    if (status === 'ready') {
      loadData()
    }
  }, [status])

  const loadData = () => {
    dispatch(getInfoData(botId))
    dispatch(getSongData(botId))
  }

  const handleTab = (tab) => {
    setActiveTab(tab)
  }

  return (
    <>
      <Tab.Container
        activeKey={activeTab}
        onSelect={(tab) => handleTab(tab)}
        id='tabs_botmenu'
      >
        <Row>
          <Col sm={3} className='tabsMenu'>
            <Nav
              variant="pills"
              className="flex-column customTabs"
            >
              <Nav.Item>
                <Nav.Link
                  eventKey='dashBoard'
                >
                  Dashboard
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey='PlayList'
                >
                  Playlist
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey='radio'
                >
                  Radio
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey='topList'
                >
                  Toplist
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey='history'
                >
                  History
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey='dashBoard'>
                <DashBoard botId={botId} />
              </Tab.Pane>
              <Tab.Pane eventKey="PlayList">
                <Playlists botId={botId} />
              </Tab.Pane>
              <Tab.Pane eventKey="radio">
                <Radio botId={botId} />
              </Tab.Pane>
              <Tab.Pane eventKey="topList">
                <Toplist botId={botId} />
              </Tab.Pane>
              <Tab.Pane eventKey="history">
                <History botId={botId} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      <Current botId={botId} />
    </>
  )
}

export default withRouter(BotMenu)
