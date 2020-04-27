import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import songReducer from '../features/current/songSlice'
import infoReducer from '../features/current/infoSlice'
import playlistReducer from '../features/playlist/playlistSlice'
import historyReducer from '../features/history/historySlice'
import toplistReducer from '../features/toplist/toplistSlice'
import playNowReducer from '../features/playNow/playNowSlice'
import controlsReducer from '../features/controls/controlsSlice'
import searchReducer from '../features/searchAndPlay/searchSlice'

export default configureStore({
  reducer: {
    info: infoReducer,
    song: songReducer,
    playlist: playlistReducer,
    history: historyReducer,
    toplist: toplistReducer,
    playNow: playNowReducer,
    controls: controlsReducer,
    search: searchReducer
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
})