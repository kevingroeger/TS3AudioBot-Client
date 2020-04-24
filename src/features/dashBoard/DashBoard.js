import React from 'react'
import Current from '../current/Current'
import PlayNow from '../../components/Dash/PlayNow'

export default function DashBoard ({
  botId,
  handleStatus,
  handleToast
}) {
  return (
    <>
      <div className='dashBoard'>
        <Current
          botId={botId}
        />
      </div>
      <PlayNow
        botId={botId}
        handleStatus={handleStatus}
        handleToast={handleToast}
      />
    </>
  )
}
