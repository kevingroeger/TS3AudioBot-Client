import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchApi } from '../../utils/dataAccess'

const fetchTopListData = createAsyncThunk(
  `/toplist`,
  async (botId) => {
    const response = await fetchApi(`/api/bot/use/${botId}/(/history/last/1000`)
    const filteredResponse = response.filter(element => element.PlayCount >= 5)
    const sortedResponse = sortEntriesByPlayCount(filteredResponse)
    return await sortedResponse
  }
)

const sortEntriesByPlayCount = (result) => {
  return result.sort((a, b) => {
    return b.PlayCount - a.PlayCount
  })
}

const topListSlice = createSlice({
  name: 'toplist',
  initialState: {
    status: 'init',
    toplist: []
  },
  reducers: {},
  extraReducers: {
    [fetchTopListData.pending] : state => {
      state.status = 'loading'
    },
    [fetchTopListData.fulfilled] : (state, action) => {
      if (!Array.isArray(action.payload)) {
        state.status = 'no data'
        return
      }
      state.toplist = action.payload
      state.status = 'ready'
    },
    [fetchTopListData.rejected] : state => {
      state.status = 'error'
    }
  }
})


export const getTopList = botId => async dispatch => {
  try {
    await dispatch(fetchTopListData(botId))
  } catch (e) {
    console.error(e)
  }
}

export const selectToplist = state => state.toplist

export default topListSlice.reducer