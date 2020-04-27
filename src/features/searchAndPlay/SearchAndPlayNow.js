import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import SearchResult from './SearchResult'
import { useDispatch, useSelector } from 'react-redux'
import {
  searchSongsByValue,
  selectSearchResults,
  selectSearchStatus
} from './searchSlice'
import { ClipLoader } from 'react-spinners'

function SearchAndPlayNow ({ botId }) {
  const [searchValue, setSearchValue] = useState('')
  const searchStatus = useSelector(selectSearchStatus)
  const searchResults = useSelector(selectSearchResults)
  const dispatch = useDispatch()

  const handleChange = (event) => {
    setSearchValue(event.target.value)
  }

  const handleSearch = async () => {
    dispatch(searchSongsByValue(searchValue))
  }

  return (
    <div className='searchAndPlayDiv'>
      <form>
        <input
          type="text"
          value={searchValue}
          onChange={handleChange}
        />
        <Button
          size={'sm'}
          onClick={() => {
            if (searchValue !== '' && searchValue !== null && typeof searchValue !== undefined) {
              handleSearch()
                .catch(e => console.error(e))
            }}}
          type='submit'
          className='searchAndPlayButton'
        >
          Search
        </Button>
      </form>
      <div className='somemargintop'>
        {searchStatus === 'loading' &&
        <div className='loadingDiv'>
          <ClipLoader
            color='#fff'
            size={100}
          />
        </div>
        }
        {searchStatus === 'ready' &&
        searchResults.map((item, i) => {
          return (
            <SearchResult
              key={i}
              botId={botId}
              title={item.title}
              timestamp={item.timestamp}
              author={item.author.name}
              url={item.url}
            />)
        })}
      </div>
    </div>
  )
}

export default SearchAndPlayNow