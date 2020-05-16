import React from 'react'
import { JokeResponse } from '../../services/chucknorris-api'

type JokeProps = {
  joke: JokeResponse
  favIds: string[]
  handleFav: (joke: JokeResponse, mode: 'add' | 'remove') => void
}

const Joke = (props: JokeProps) => {
  const { joke, favIds, handleFav } = props
  const date =  new Date()
  const updated = new Date(joke.updated_at)
  const hours = Math.floor((Number(date) - Number(updated)) / 1000 / 60 / 60)

  return <div className="joke">
      <div className="joke_content">
      {
        favIds.includes(joke.id)
          ? <div className="heart selected" onClick={() => handleFav(joke, 'remove')}></div>
          : <div className="heart" onClick={() => handleFav(joke, 'add')}></div>
      }
      
      <div className="link">ID: <a rel="noopener noreferrer" target="_blank" href={joke.url}>{joke.id}</a></div>
      
      <div className="text">{joke.value}</div>
      <div className="info">
        <div className="update">Last update: <b>{hours} hours ago</b></div>
        { joke.categories.length > 0 && <div className="category">{joke.categories[0]}</div> }
      </div>
    </div>
  </div>
}

export default Joke