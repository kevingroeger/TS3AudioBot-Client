import React, { useEffect, useState } from 'react'
import HistoryEntry from './HistoryEntry'
import { fetchApi } from '../../utils/dataAccess'

export default function History ({
  botId,
  status,
  handleToast,
}) {
  const [history, setHistory] = useState([])

  useEffect(() => {
    initHistory()
      .catch(e => console.error(e))
  }, [])

  const initHistory = async () => {
    const historyData = await fetchHistory()
    setHistory(historyData)
  }

  const fetchHistory = () => {
    return fetchApi(`/api/bot/use/${botId}/(/history/last/12`)
  }


  return (
    <>
      <div className='history'>
        <div className='historyEntries'>
          {status === 'loaded' && Array.isArray(history) && history.map((item, i) => {
            return (
              <HistoryEntry
                handleToast={handleToast}
                key={`history_${i}`}
                botId={botId}
                item={item}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}
