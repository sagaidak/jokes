import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { State, Jokes, Search, Categories } from '../../../reducers'
import { Dispatch } from "redux";
import { fetchCategories, fetchRandomJoke, fetchJokesByText, searchValueChange, fetchJokeByCategory, makeFav, removeFav, selectCategory } from '../../../actions';
import { JokeResponse } from '../../../services/chucknorris-api';
import './main.scss'
import Spinner from '../../spinner/spinner';
import Joke from '../../joke/joke'

type Props = {
  jokes: Jokes,
  search: Search,
  categories: Categories,
  fetchCategories: () => void,
  fetchJokesByText: (text: string) => void,
  searchValueChange: (text: string) => void,
  fetchRandomJoke: () => void,
  fetchJokeByCategory: (cat: string) => void,
  makeFav: (joke: JokeResponse) => void,
  removeFav: (id: string) => void,
  selectCategory: (cat: string) => void
}

type Variants = 'random' | 'byCategory' | 'search'

const Main = (props: Props) => {
  const { jokes, search, categories } = props
  const { 
    fetchCategories, 
    fetchJokesByText, 
    searchValueChange, 
    fetchRandomJoke, 
    fetchJokeByCategory,
    makeFav,
    removeFav,
    selectCategory
  } = props
  const [ variant, setVariant ] = useState<Variants>('random')
  const [ showMenu, setShowMenu ] = useState(false)
  const favIds = jokes.favourites.map((x: JokeResponse) => x.id)

  useEffect(() => {
    let localFavs: JokeResponse[] = JSON.parse(window.localStorage.getItem('favs') as string) || []

    if (localFavs && localFavs.length > 0) {
      localFavs.map((x: JokeResponse) => makeFav(x))
    }

    fetchCategories()
  }, [fetchCategories, makeFav])

  const handleFetch = () => {
    switch (variant) {
      case 'random': {
        fetchRandomJoke()
        break
      }
      case 'byCategory': {
        fetchJokeByCategory(categories.selected)
        break
      }
      case 'search': {
        fetchJokesByText(search.value)
        break
      }
    }
  }

  const handleFav = (joke: JokeResponse, mode: string ) => {
    let localFavs: JokeResponse[] = []
    const parsed = JSON.parse(window.localStorage.getItem('favs') as string)
    if (parsed && parsed.length > 0) localFavs = parsed

    if (mode === 'remove') {
      removeFav(joke.id)

      const idx = localFavs.findIndex((x: JokeResponse) => x.id === joke.id)
      if (idx !== -1) window.localStorage.setItem('favs', JSON.stringify([
        ...localFavs.slice(0, idx),
        ...localFavs.slice(idx + 1)
      ]))
    } else {
      makeFav(joke)

      window.localStorage.setItem('favs', JSON.stringify([
        ...localFavs,
        joke
      ]))
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return <div className="jokes_wrapper">
    <div className="row_block">
      <div className="main_block">
        <div className="msi">
          <span>MSI 2020</span>
          <div className="fav_menu" onClick={() => setShowMenu(!showMenu)}>Favourite</div>
        </div>
        <h2>Hey!</h2>
        <h3>Let’s try to find a joke for you:</h3>
        <form onSubmit={handleSubmit}>
        <div className="variants">
          <div className={`variant ${variant === 'random' ? 'selected' : ''}`} onClick={() => setVariant('random')}>Random</div>
          <div className={`variant ${variant === 'byCategory' ? 'selected' : ''}`} onClick={() => setVariant('byCategory')}>From Categories</div>
          {
            variant === 'byCategory' && categories.value.map((x: string) => <div 
              className={`category ${categories.selected === x ? 'selected' : ''}`} 
              key={x} 
              onClick={() => selectCategory(x)}>
                {x}
              </div>)
          }
          <div className={`variant ${variant === 'search' ? 'selected' : ''}`} onClick={() => setVariant('search')}>Search</div>
          {
            variant === 'search' &&
              <input value={search.value} onChange={(e) => searchValueChange(e.currentTarget.value)} placeholder="Free text search..." />
          }
        </div>
        <button type="submit" onClick={handleFetch}>Get a joke</button>
        </form>
        <div className="jokes">
        { jokes.isLoading && <Spinner /> }
        {
          jokes.value.map((x: JokeResponse) => <Joke key={x.id} joke={x} favIds={favIds} handleFav={handleFav} />)
        }
        </div>
      </div>
      <div className={`fav_block ${showMenu ? 'open' : ''}`}>
        
        <div className="head">
          <h2>Favourite</h2>
          <div className="fav_menu" onClick={() => setShowMenu(!showMenu)}>Favourite</div>
        </div>
        
        <div className="jokes">
        { 
          jokes.favourites.map((x: JokeResponse) => <Joke key={x.id} joke={x} favIds={favIds} handleFav={handleFav} />)
        }
        </div>
      </div>
    </div>
  </div>
}

const mapStateToProps = (state: State) => {
  return {
    jokes: state.jokes,
    search: state.search,
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetchCategories: fetchCategories(dispatch),
    fetchRandomJoke: fetchRandomJoke(dispatch),
    fetchJokesByText: (text: string) => fetchJokesByText(dispatch, text),
    searchValueChange: (text: string) => dispatch(searchValueChange(text)),
    fetchJokeByCategory: (cat: string) => fetchJokeByCategory(dispatch, cat),
    makeFav: (joke: JokeResponse) => dispatch(makeFav(joke)),
    removeFav: (id: string) => dispatch(removeFav(id)),
    selectCategory: (cat: string) => dispatch(selectCategory(cat))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)