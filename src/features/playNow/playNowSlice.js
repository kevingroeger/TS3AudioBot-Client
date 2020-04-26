import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchApi } from '../../utils/dataAccess'

const fetchPlayNow = createAsyncThunk(
  `/play/now`,
  async ({botId, link}) => {
    return await fetchApi(`/api/bot/use/${botId}/(/play/${encodeURIComponent(link)}`)
  }
)

const fetchAddToQueue = createAsyncThunk(
  `/play/queue`,
  async ({botId, link}) => {
    return await fetchApi(`/api/bot/use/${botId}/(/add/${encodeURIComponent(link)}`)
  }
)

export const playNowSlice = createSlice({
  name: 'play',
  initialState: {
    status: 'init'
  },
  reducers: {
  },
  extraReducers: {
    [fetchPlayNow.pending] : state => {
      state.status = 'loading'
    },
    [fetchPlayNow.fulfilled] : (state, action) => {
      if (action.payload === 204) {
        state.status = 'ready'
        return
      }
      state.status = 'error'
    },
    [fetchPlayNow.rejected] : state => {
      state.status = 'error'
    },
    [fetchAddToQueue.pending] : state => {
      state.status = 'loading'
    },
    [fetchAddToQueue.fulfilled] : (state, action) => {
      if (action.payload === 204) {
        state.status = 'ready'
        return
      }
      state.status = 'error'
    },
    [fetchAddToQueue.rejected] : state => {
      state.status = 'error'
    }
  }
})

export const playNowAction = (botId, link) => async dispatch => {
  try {
    await dispatch(fetchPlayNow({botId, link}))
  } catch (e) {
    console.error(e)
  }
}

export const addToQueueAction = (botId, link) => async dispatch => {
  try {
    await dispatch(fetchAddToQueue({botId, link}))
  } catch (e) {
    console.error(e)
  }
}

export const selectPlayNowStatus = state => state.playNow.status

export default playNowSlice.reducer