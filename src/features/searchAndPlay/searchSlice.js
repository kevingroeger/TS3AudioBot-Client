import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const remote = window.require('electron').remote
const yts = remote.require('yt-search')

const searchSongs = createAsyncThunk(
  `/search/song`,
  async (searchValue) => {
    const results = await yts({ query: searchValue, category: 'music' })
    return results.videos
  }
)

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    status: 'init',
    searchResults: []
  },
  reducers: {
  },
  extraReducers: {
    [searchSongs.pending] : state => {
      state.status = 'loading'
    },
    [searchSongs.fulfilled] : (state, action) => {
      if (action.payload) {
        state.searchResults = action.payload
        state.status = 'ready'
        return
      }
      state.status = 'error'
    },
    [searchSongs.rejected] : state => {
      state.status = 'error'
    }
  }
})

export const searchSongsByValue = (searchValue) => async dispatch => {
  try {
    await dispatch(searchSongs(searchValue))
  } catch (e) {
    console.error(e)
  }
}


export const selectSearchStatus = state => state.search.status
export const selectSearchResults = state => state.search.searchResults

export default searchSlice.reducer