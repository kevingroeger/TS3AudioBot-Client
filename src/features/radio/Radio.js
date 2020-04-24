import React from 'react'
import { Card, Image } from 'react-bootstrap'
import Controls from '../../components/Controls/Controls'
import { radioArray } from '../../utils/radio'

export default function Radio ({ botId }) {
  return (
    <>
      <div className='radioMenu'>
        {radioArray.map((item, i) => {
          return (
            <Card
              key={i}
              bg={'dark'}
              text={'light'}
              className='transparency'
            >
              <Image
                height={200}
                width={200}
                src={item.src}
                roundedCircle
              />
              <p>{item.name}</p>
              <Controls
                radioUrl={item.url}
                botId={botId}
              />
            </Card>
          )}
        )}
      </div>
    </>
  )
}
