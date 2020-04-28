import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTopList, selectToplist } from './toplistSlice'
import LoadingBar from '../botmenu/LoadingBar'
import ToplistEntry from './ToplistEntry'

export default function Toplist ({ botId }) {
  const toplistData = useSelector(selectToplist)
  const dispatch = useDispatch()

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    loadData()
  }, [botId])

  const loadData = () => {
    dispatch(getTopList(botId))
  }

  if (toplistData.status === 'init' || toplistData.status === 'loading') {
    return <LoadingBar />
  }

  if (toplistData.status === 'no data') {
    return <h5>No Data</h5>
  }

  if (toplistData.status === 'ready') {
    return (
      <div className='topList'>
        {toplistData && toplistData.toplist.map((item, i) => {
          return (
            <ToplistEntry
              botId={botId}
              item={item}
              id={i}
              key={i}
            />
          )
        })}
      </div>
    )
  }
}
