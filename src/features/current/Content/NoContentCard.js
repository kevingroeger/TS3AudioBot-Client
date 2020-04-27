import React from 'react'
import ReactPlayer from 'react-player'

export default function NoContentCard () {
  return (
    <>
      <ReactPlayer
        width='5rem'
        height='3rem'
        light
        playIcon={<div />}
      />
      <div className='playMenuTitle'>
        None
      </div>
    </>
  )
}
