import React from 'react'
import SearchAndPlayNow from '../searchAndPlay/SearchAndPlayNow'

export default function DashBoard ({ botId }) {
  return (
    <>
      <SearchAndPlayNow botId={botId}/>
    </>
  )
}
