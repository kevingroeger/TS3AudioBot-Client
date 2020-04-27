import React from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { selectSong } from '../songSlice'

export default function YoutubeCard () {
  const song = useSelector(selectSong)
  return (
    <>
      <ReactPlayer
        width='5rem'
        height='3rem'
        url={song?.Link}
        light
        playIcon={<div />}
      />
      <div className='playMenuTitle'>
        {song?.Title}
      </div>
    </>
  )
}
