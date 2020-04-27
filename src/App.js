import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { HashRouter as Router, Switch, Route, NavLink } from 'react-router-dom'
import { Button, Navbar } from 'react-bootstrap'
import BotMenu from './features/botmenu/BotMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faRobot, faWindowClose, faWindowMinimize } from '@fortawesome/free-solid-svg-icons'
import Settings from './components/Settings'
const { app } = window.require('electron').remote
const remote = window.require('electron').remote
const config = window.require('electron-json-config')
const botArray = config.get('bots', window.Configs.botArray)
const savedBackground = config.get('background', window.Configs.savedBackground)

export default function App () {
  const [background, setBackground] = useState(savedBackground)

  const handleBackgroundChange = (color) => {
    setBackground(color)
  }

  return (
    <Router>
      <Navbar
        bg='dark'
        variant='dark'
        className='NavBarSticky1'
      >
        {Array.isArray(botArray) && botArray.map((bot, i) => {
          return (
            <NavLink
              key={i}
              to={`/bot/${bot.id}`}
              className='NavLink'
              activeClassName='NavLinkActive'
            >
              <FontAwesomeIcon icon={faRobot} />
              {' '}{bot.name}
            </NavLink>)
        })
        }
        <NavLink
          to='/'
          exact
          strict
          className='NavLinkCog'
          activeClassName='NavLinkActive'
        >
          <FontAwesomeIcon icon={faCog}/>
        </NavLink>
      </Navbar>
      <Navbar
        bg='dark'
        variant='dark'
        className='NavBarSticky2'
      >
        <div className='controlWindow'>
          <Button
            size='sm'
            variant='dark'
            className='minimizeWindow'
            onClick={() => {
              remote.getCurrentWindow().minimize()
            }}
          >
            <FontAwesomeIcon icon={faWindowMinimize} />
          </Button>
          <Button
            size='sm'
            variant='dark'
            className='closeWindow'
            onClick={() => app.quit()}
          >
            <FontAwesomeIcon icon={faWindowClose} />
          </Button>
        </div>
      </Navbar>
      <Switch>
        <>
          <div className='background'>
            <Route exact strict path='/'>
              <Settings
                handleBackgroundChange={handleBackgroundChange}
                background={background}
              />
            </Route>
            <Route exact path='/bot/:botId'>
              <BotMenu />
            </Route>
          </div>
        </>
      </Switch>
    </Router>
  )
}
