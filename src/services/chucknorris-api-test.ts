// https://api.chucknorris.io/

/*
GET https://api.chucknorris.io/jokes/random

Retrieve a random chuck joke in JSON format.
*/
export type JokeResponse = {
  categories: string[],
  created_at: string,
  icon_url: string,
  id: string,
  updated_at: string,
  url: string,
  value: string
}

/* 
GET https://api.chucknorris.io/jokes/categories

Retrieve a list of available categories.
*/

export type CategoriesListResponse = string[]

/* 
GET https://api.chucknorris.io/jokes/random?category={category}

Retrieve a random chuck norris joke from a given category.
*/

export type RandomJokeByCategoryQuery = {
  category: string
}

export type RandomJokeByCategoryResponse = JokeResponse

/* 
GET https://api.chucknorris.io/jokes/search?query={query}

Free text search.  
*/

export type JokesByTextQuery = {
  query: string
}

export type JokesByTextResponse = {
  total: number,
  result: JokeResponse[]
}

export default class ChukNorrisApiTestService {
  
  categories: CategoriesListResponse = ['category1', 'category2']

  randomJokeByCategory: RandomJokeByCategoryResponse = {
    categories: ['cat'],
    created_at: 'created someday',
    icon_url: 'icon url',
    id: 'random by cat id',
    updated_at: 'udated someday',
    url: 'random url',
    value: 'joke value'
  }

  randomJoke: JokeResponse = this.randomJokeByCategory

  jokesByText: JokesByTextResponse = {
    result: [this.randomJokeByCategory],
    total: 17
  }

  getRandomJoke(): Promise<JokeResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.randomJoke)
      }, 700)
    })
  }

  getCategoriesList(): Promise<CategoriesListResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.categories)
      }, 700)
    })
  }

  getRandomJokeByCategory(query: RandomJokeByCategoryQuery): Promise<RandomJokeByCategoryResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.randomJokeByCategory)
      }, 700)
    })
  }

  getJokesByText(query: JokesByTextQuery): Promise<JokesByTextResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.jokesByText)
      }, 700)
    })
  }
}