import { createAsyncThunk, createSlice, unwrapResult } from '@reduxjs/toolkit'
import { fetchApi } from '../../utils/dataAccess'

const fetchSongData = createAsyncThunk(
  `/song`,
  async (botId) => {
    return await fetchApi(`/api/bot/use/${botId}/(/song`)
  }
)

export const songSlice = createSlice({
  name: 'song',
  initialState: {
    status: 'init',
    Title: '',
    Timer: 0,
    Paused: false,
    Link: '',
    AudioType: ''
  },
  reducers: {
  },
  extraReducers: {
    [fetchSongData.pending] : state => {
      state.status = 'loading'
    },
    [fetchSongData.fulfilled] : (state, action) => {
      if (!action.payload.Title) {
        state.status = 'no data'
        return
      }
      state.Title = action.payload.Title
      state.Timer = action.payload.Length - action.payload.Position
      state.Paused = action.payload.Paused
      state.Link = action.payload.Link
      state.AudioType = action.payload.AudioType
      state.status = 'ready'
    },
    [fetchSongData.rejected] : state => {
      state.status = 'error'
    }
  }
})

export const getSongData = botId => async dispatch => {
  try {
    await dispatch(fetchSongData(botId))
    console.log('success fetching songData')
  } catch (e) {

  }
}

export const selectSong = state => state.song

export default songSlice.reducer