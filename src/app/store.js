import { configureStore } from '@reduxjs/toolkit'
import songReducer from '../features/current/songSlice'
import infoReducer from '../features/current/infoSlice'
import playlistReducer from '../features/playlist/playlistSlice'

export default configureStore({
  reducer: {
    info: infoReducer,
    song: songReducer,
    playlist: playlistReducer,
  }
})