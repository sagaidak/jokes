import debounce from "lodash.debounce"

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

export default class ChukNorrisApiService {

  baseUrl = 'https://api.chucknorris.io/jokes'

  fetchData = async (URI: string) => {
    const res = await fetch(`${this.baseUrl}${URI}`)
    
    if (!res.ok) {
      throw new Error(`Could not fetch ${URI}` +
        `, received ${res.status}`)
    }
    return await res.json();
  }
  
  getRandomJoke = debounce(async () => {
    return await this.fetchData('/random')
  }, 1000, {leading: true})

  getCategoriesList = async () => {
    return await this.fetchData('/categories')
  }

  getRandomJokeByCategory = debounce(async (query: RandomJokeByCategoryQuery) => {
    return await this.fetchData(`/random?category=${query.category}`)
  }, 1000, {leading: true})

  getJokesByText = debounce(async (query: JokesByTextQuery) => {
    return await this.fetchData(`/search?query=${query.query}`)
  }, 1000, {leading: true})
}