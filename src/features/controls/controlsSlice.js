import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchApi } from '../../utils/dataAccess'

const fetchSongPlayNow = createAsyncThunk(
  `/controls/song/now`,
  async ({botId, index}) => {
    return await fetchApi(`/api/bot/use/${botId}/(/history/play/${index}`)
  }
)

const fetchSongAddToQueue = createAsyncThunk(
  `/controls/song/queue`,
  async ({botId, index}) => {
    return await fetchApi(`/api/bot/use/${botId}/(/history/add/${index}`)
  }
)

const fetchListPlayNow = createAsyncThunk(
  `/controls/list/now`,
  async ({botId, listId}) => {
    return await fetchApi(`/api/bot/use/${botId}/(/list/play/${listId}`)
  }
)

const fetchListAddToQueue = createAsyncThunk(
  `/controls/list/queue`,
  async ({botId, listId}) => {
    return await fetchApi(`/api/bot/use/${botId}/(/list/queue/${listId}`)
  }
)

const fetchRadioPlayNow = createAsyncThunk(
  `/controls/radio/now`,
  async ({botId, radioUrl}) => {
    return await fetchApi(`/api/bot/use/${botId}/(/play/${encodeURIComponent(radioUrl)}`)
  }
)

export const controlsSlice = createSlice({
  name: 'controls',
  initialState: {
    status: 'init'
  },
  reducers: {
  },
  extraReducers: {
    [fetchSongPlayNow.pending] : state => {
      state.status = 'loading'
    },
    [fetchSongPlayNow.fulfilled] : (state, action) => {
      if (action.payload === 204) {
        state.status = 'ready'
        return
      }
      state.status = 'error'
    },
    [fetchSongPlayNow.rejected] : state => {
      state.status = 'error'
    },
    [fetchSongAddToQueue.pending] : state => {
      state.status = 'loading'
    },
    [fetchSongAddToQueue.fulfilled] : (state, action) => {
      if (action.payload === 204) {
        state.status = 'ready'
        return
      }
      state.status = 'error'
    },
    [fetchSongAddToQueue.rejected] : state => {
      state.status = 'error'
    },
    [fetchListPlayNow.pending] : state => {
      state.status = 'loading'
    },
    [fetchListPlayNow.fulfilled] : (state, action) => {
      if (action.payload === 204) {
        state.status = 'ready'
        return
      }
      state.status = 'error'
    },
    [fetchListPlayNow.rejected] : state => {
      state.status = 'error'
    },
    [fetchSongPlayNow.pending] : state => {
      state.status = 'loading'
    },
    [fetchSongPlayNow.fulfilled] : (state, action) => {
      if (action.payload === 204) {
        state.status = 'ready'
        return
      }
      state.status = 'error'
    },
    [fetchSongPlayNow.rejected] : state => {
      state.status = 'error'
    },
    [fetchListAddToQueue.pending] : state => {
      state.status = 'loading'
    },
    [fetchListAddToQueue.fulfilled] : (state, action) => {
      if (action.payload === 204) {
        state.status = 'ready'
        return
      }
      state.status = 'error'
    },
    [fetchListAddToQueue.rejected] : state => {
      state.status = 'error'
    },
  }
})

export const songPlayNow = (botId, index) => async dispatch => {
  try {
    await dispatch(fetchSongPlayNow({botId, index}))
  } catch (e) {
    console.error(e)
  }
}

export const songAddToQueue = (botId, index) => async dispatch => {
  try {
    await dispatch(fetchSongAddToQueue({botId, index}))
  } catch (e) {
    console.error(e)
  }
}

export const radioPlayNow = (botId, radioUrl) => async dispatch => {
  try {
    await dispatch(fetchRadioPlayNow({botId, radioUrl}))
  } catch (e) {
    console.error(e)
  }
}

export const listAddToQueue = (botId, listId) => async dispatch => {
  try {
    await dispatch(fetchListAddToQueue({botId, listId}))
  } catch (e) {
    console.error(e)
  }
}

export const listPlayNow = (botId, listId) => async dispatch => {
  try {
    await dispatch(fetchListPlayNow({botId, listId}))
  } catch (e) {
    console.error(e)
  }
}

export const selectControlStatus = state => state.controls.status

export default controlsSlice.reducer