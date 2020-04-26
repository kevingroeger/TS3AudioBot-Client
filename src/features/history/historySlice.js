import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchApi } from '../../utils/dataAccess'
import { songSlice } from '../current/songSlice'

const fetchHistoryData = createAsyncThunk(
  `/history`,
  async (botId) => {
    return await fetchApi(`/api/bot/use/${botId}/(/history/last/12`)
  }
)

const historySlice = createSlice({
  name: 'history',
  initialState: {
    status: 'init',
    history: []
  },
  reducers: {

  },
  extraReducers: {
    [fetchHistoryData.pending] : state => {
      state.status = 'loading'
    },
    [fetchHistoryData.fulfilled] : (state, action) => {
      if (!Array.isArray(action.payload)) {
        state.status = 'no data'
        return
      }
      state.history = action.payload
      state.status = 'ready'
    },
    [fetchHistoryData.rejected] : state => {
      state.status = 'error'
    }
  }
})


export const getLastTwelveHistoryEntries = botId => async dispatch => {
  try {
    await dispatch(fetchHistoryData(botId))
  } catch (e) {
    console.error(e)
  }
}

export const selectHistory = state => state.history

export default historySlice.reducer