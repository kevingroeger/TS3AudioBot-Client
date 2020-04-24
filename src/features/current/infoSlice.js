import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchApi } from '../../utils/dataAccess'

const fetchInfoData = createAsyncThunk(
  `/info`,
  async (botId) => {
    return await fetchApi(`/api/bot/use/${botId}/(/info`)
  }
)

export const infoSlice = createSlice({
  name: 'info',
  initialState: {
    status: 'init',
    Link: '',
    Items: [],
  },
  reducers: {
  },
  extraReducers: {
    [fetchInfoData.pending] : state => {
      state.status = 'loading'
    },
    [fetchInfoData.fulfilled] : (state, action) => {
      if (!Array.isArray(action.payload.Items)) {
        state.status = 'no data'
        return
      }
      state.Items = action.payload.Items
      state.status = 'ready'
    },
    [fetchInfoData.rejected] : state => {
      state.status = 'error'
    }
  }
})

export const getInfoData = botId => async dispatch => {
  try {
    await dispatch(fetchInfoData(botId))
  } catch (e) {
    console.error(e)
  }
}

export const selectInfo = state => state.info

export default infoSlice.reducer