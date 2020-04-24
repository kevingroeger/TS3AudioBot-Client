import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchApi } from '../../utils/dataAccess'

const fetchSongData = createAsyncThunk(
  `/song`,
  async (botId) => {
    return await fetchApi(`/api/bot/use/${botId}/(/song`)
  }
)

const playOrPause = createAsyncThunk(
  `/song/pause`,
  async (botId) => {
    return await fetchApi(`/api/bot/use/${botId}/(/pause`)
  }
)

const nextSong = createAsyncThunk(
  `/song/next`,
  async (botId) => {
    return await fetchApi(`/api/bot/use/${botId}/(/next`)
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
    [playOrPause.pending] : state => {
      state.status = 'control'
    },
    [playOrPause.fulfilled] : (state, action) => {
      if (action.payload === 204) {
        state.status = 'ready'
      }
      state.status = 'error'
    },
    [playOrPause.rejected] : state => {
      state.status = 'error'
    },
    [nextSong.pending] : state => {
      state.status = 'control'
    },
    [nextSong.fulfilled] : (state, action) => {
      if (action.payload === 204) {
        state.status = 'ready'
      }
      state.status = 'error'
    },
    [nextSong.rejected] : state => {
      state.status = 'error'
    }
  }
})

export const getSongData = botId => async dispatch => {
  try {
    await dispatch(fetchSongData(botId))
  } catch (e) {
    console.error(e)
  }
}

export const playOrPauseAction = botId => async dispatch => {
  try {
    await dispatch(playOrPause(botId))
  } catch (e) {
    console.error(e)
  }
}

export const nextSongAction = botId => async dispatch => {
  try {
    await dispatch(nextSong(botId))
  } catch (e) {
    console.error(e)
  }
}

export const selectSong = state => state.song

export default songSlice.reducer