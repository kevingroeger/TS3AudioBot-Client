import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectHistory, getLastTwelveHistoryEntries } from './historySlice'
import HistoryEntry from './HistoryEntry'

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

  return (
    <>
      <div className='history'>
        <div className='historyEntries'>
          {historyData.status === 'ready' && historyData.history.map((item, i) => {
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
    </>
  )
}
