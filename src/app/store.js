import { configureStore } from '@reduxjs/toolkit'
import songReducer from '../features/current/songSlice'
import infoReducer from '../features/current/infoSlice'

export default configureStore({
  reducer: {
    info: infoReducer,
    song: songReducer
  }
})