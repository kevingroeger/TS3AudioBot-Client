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
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function SearchAndPlayNow ({ botId }) {
  const [searchValue, setSearchValue] = useState('')
  const searchStatus = useSelector(selectSearchStatus)
  const searchResults = useSelector(selectSearchResults)
  const dispatch = useDispatch()

  const handleChange = (event) => {
    event.preventDefault()
    setSearchValue(event.target.value)
  }

  const handleSearch = (event) => {
    event.preventDefault()
    dispatch(searchSongsByValue(searchValue))
  }

  return (
    <div className='searchAndPlayDiv'>
      <form
        className='form_pos'
        onSubmit={handleSearch}
      >
        <input
          type="text"
          value={searchValue}
          onChange={handleChange}
        />
        <FontAwesomeIcon
          icon={faTimes}
          className='searchValueCross'
          onClick={() => setSearchValue('')}
        />
        <Button
          size='sm'
          type='submit'
          className='customButton'
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
