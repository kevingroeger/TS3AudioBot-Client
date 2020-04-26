import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectHistory, getLastTwelveHistoryEntries } from './historySlice'
import HistoryEntry from './HistoryEntry'
import LoadingBar from '../botmenu/LoadingBar'

export default function History ({ botId }) {
  const historyData = useSelector(selectHistory)
  const dispatch = useDispatch()

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    loadData()
  }, [botId])

  const loadData = () => {
    dispatch(getLastTwelveHistoryEntries(botId))
  }

  if (historyData.status === 'init' || historyData.status === 'loading') {
    return <LoadingBar />
  }

  if (historyData.status === 'no data') {
    return <h5>No Data</h5>
  }

  if (historyData.status === 'ready') {
    return (
      <div className='history'>
        <div className='historyEntries'>
          {historyData.history.map((item, i) => {
            return (
              <HistoryEntry
                key={`history_${i}`}
                botId={botId}
                item={item}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

