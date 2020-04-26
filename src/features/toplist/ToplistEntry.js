import React from 'react'
import Controls from '../controls/Controls'

function ToplistEntry ({ botId, item, id: i }) {
  return (
    <div
      className={
        i % 2 === 0
          ? 'toplistLight'
          : 'toplistDark'
      }
    >
      <p className='topListEntryTitle'>
        <strong>Title:</strong>{' '}
        {item.AudioResource.title}
      </p>
      <p className='topListEntryPlayCount'><strong>PlayCount:</strong> {item.PlayCount}</p>
      <Controls
        botId={botId}
        index={item.Id}
        isTopList
        url={`https://youtube.com/watch?v=${item.AudioResource.resid}`}
      />
    </div>
  )
}

export default ToplistEntry