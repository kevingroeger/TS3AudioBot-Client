import React, { useEffect, useState } from 'react'
import Controls from '../Controls/Controls'
import { fetchApi } from '../../utils/dataAccess'

export default function TopList ({ botId, handleToast }) {
  const [history, setHistory] = useState([])

  useEffect(() => {
    (async () => {
      const result = await getTopSongs()
      const sortedArray = await sortEntriesByPlayCount(result)
      setHistory(sortedArray.filter(item => item.PlayCount >= 5))
    })()
  }, [])

  const getTopSongs = () => {
    return fetchApi(`/api/bot/use/0/(/history/last/1000`)
  }

  const sortEntriesByPlayCount = (result) => {
    return result.sort((a, b) => {
      return b.PlayCount - a.PlayCount
    })
  }

  return (
    <>
      <div className='topList'>
        {history && Array.isArray(history) && history.map((item, i) => {
          return (
            <div
              key={i}
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
                handleToast={handleToast}
                botId={botId}
                index={item.Id}
                isTopList
                url={`https://youtube.com/watch?v=${item.AudioResource.resid}`}
              />
            </div>
          )
        })}
      </div>
    </>
  )
}
