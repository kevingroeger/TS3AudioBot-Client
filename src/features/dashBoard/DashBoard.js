import React from 'react'
import Current from '../current/Current'
import PlayNow from '../playNow/PlayNow'

export default function DashBoard ({ botId }) {
  return (
    <>
      <div className='dashBoard'>
        <Current botId={botId} />
      </div>
      <PlayNow botId={botId} />
    </>
  )
}
