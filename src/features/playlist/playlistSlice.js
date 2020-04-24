import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchApi } from '../../utils/dataAccess'

const fetchPlaylistData = createAsyncThunk(
  `/playlist`,
  async (botId) => {

    return await fetchApi(`/api/bot/use/${botId}/(/list/list`)
  }
)

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState: {
    status: 'init',
    playlists: []
  },
  reducers: {
  },
  extraReducers: {
    [fetchPlaylistData.pending] : state => {
      state.status = 'loading'
    },
    [fetchPlaylistData.fulfilled] : (state, action) => {
      if (!action.payload) {
        state.status = 'no data'
        return
      }
      state.playlists = action.payload
      state.status = 'ready'
    },
    [fetchPlaylistData.rejected] : state => {
      state.status = 'error'
    }
  }
})

export const getPlaylistData = botId => async dispatch => {
  try {
    await dispatch(fetchPlaylistData(botId))
  } catch (e) {
    console.error(e)
  }
}

export const selectPlaylists = state => state.playlist

export default playlistSlice.reducer