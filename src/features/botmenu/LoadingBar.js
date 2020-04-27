import React from 'react'
import { BarLoader } from 'react-spinners'
import { useSelector } from 'react-redux'
import { selectSong } from '../current/songSlice'

export default function LoadingBar () {
  const song = useSelector(selectSong)
  return (
    <div className='loadingBar'>
      {(song?.status === 'init' || song?.status === 'loading') && (
        <BarLoader
          loading
          color='#7A94FF'
          width='100%'
          height='5px'
        />
      )}
    </div>
  )
}