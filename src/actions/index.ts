import { Dispatch } from "redux";
import ChuckApi, { CategoriesListResponse, JokeResponse, JokesByTextResponse } from "../services/chucknorris-api";

const chuckApi = new ChuckApi()

export const CATEGORIES_REQUEST = 'CATEGORIES_REQUEST'
export const CATEGORIES_SUCCESS = 'CATEGORIES_SUCCESS'
export const RANDOM_JOKE_REQUEST = 'RANDOM_JOKE_REQUEST'
export const RANDOM_JOKE_SUCCESS = 'RANDOM_JOKE_SUCCESS'
export const JOKE_BY_CATEGORY_REQUEST = 'JOKE_BY_CATEGORY_REQUEST'
export const JOKE_BY_CATEGORY_SUCCESS = 'JOKE_BY_CATEGORY_SUCCESS'
export const JOKES_BY_TEXT_REQUEST = 'JOKES_BY_TEXT_REQUEST'
export const JOKES_BY_TEXT_SUCCESS = 'JOKES_BY_TEXT_SUCCESS'
export const SEARCH_VALUE_CHANGE = 'SEARCH_VALUE_CHANGE'
export const SELECT_JOKE_BY_ID = 'SELECT_JOKE_BY_ID'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const MAKE_FAV = 'MAKE_FAV'
export const REMOVE_FAV = 'REMOVE_FAV'

interface CategoriesRequestAction {
  type: typeof CATEGORIES_REQUEST
}

interface CategoriesLoadedAction {
  type: typeof CATEGORIES_SUCCESS,
  payload: CategoriesListResponse
}

interface RandomJokeRequestAction {
  type: typeof RANDOM_JOKE_REQUEST
}

interface RandomJokeLoadedAction {
  type: typeof RANDOM_JOKE_SUCCESS,
  payload: JokeResponse
}

interface JokeByCategoryRequestAction {
  type: typeof JOKE_BY_CATEGORY_REQUEST
}

interface JokeByCategoryLoadedAction {
  type: typeof JOKE_BY_CATEGORY_SUCCESS,
  payload: JokeResponse
}

interface JokesByTextRequestAction {
  type: typeof JOKES_BY_TEXT_REQUEST
}

interface JokesByTextLoadedAction {
  type: typeof JOKES_BY_TEXT_SUCCESS,
  payload: JokesByTextResponse
}

interface SearchValueChange {
  type: typeof SEARCH_VALUE_CHANGE,
  payload: string
}

interface SelectCategory {
  type: typeof SELECT_CATEGORY,
  payload: string
}

interface MakeFav {
  type: typeof MAKE_FAV,
  payload: JokeResponse
}

interface RemoveFav {
  type: typeof REMOVE_FAV,
  payload: string
}

export type ActionTypes = 
    CategoriesRequestAction
  | CategoriesLoadedAction
  | RandomJokeRequestAction
  | RandomJokeLoadedAction
  | JokeByCategoryRequestAction
  | JokeByCategoryLoadedAction
  | JokesByTextRequestAction
  | JokesByTextLoadedAction
  | SearchValueChange
  | SelectCategory
  | MakeFav
  | RemoveFav

export const makeFav = (joke: JokeResponse) => {
  return {
    type: MAKE_FAV,
    payload: joke
  }
}

export const removeFav = (id: string) => {
  return {
    type: REMOVE_FAV,
    payload: id
  }
}

export const selectCategory = (data: string) => {
  return {
    type: SELECT_CATEGORY,
    payload: data
  }
}

export const searchValueChange = (value: string) => {
  return {
    type: SEARCH_VALUE_CHANGE,
    payload: value
  }
}

const categoriesRequested = () => {
  return {
    type: CATEGORIES_REQUEST
  }
}

const categoriesLoaded = (data: CategoriesListResponse) => {
  return {
    type: CATEGORIES_SUCCESS,
    payload: data
  }
}

export const fetchCategories = (dispatch: Dispatch) => () => {
  dispatch(categoriesRequested())

  chuckApi.getCategoriesList()
    .then((data: CategoriesListResponse) => {
      dispatch(categoriesLoaded(data))
    })
    .catch((err: any) => console.log(err));
}

const randomJokeRequested = () => {
  return {
    type: RANDOM_JOKE_REQUEST
  }
}

const randomJokeLoaded = (data: JokeResponse) => {
  return {
    type: RANDOM_JOKE_SUCCESS,
    payload: data
  }
}

export const fetchRandomJoke = (dispatch: Dispatch) => () => {
  dispatch(randomJokeRequested())

  chuckApi.getRandomJoke()
    .then((data: JokeResponse) => {
      dispatch(randomJokeLoaded(data))
    })
    .catch((err: any) => console.log(err))
}

const jokeByCategoryRequested = () => {
  return {
    type: JOKE_BY_CATEGORY_REQUEST
  }
}

const jokeByCategoryLoaded = (data: JokeResponse) => {
  return {
    type: JOKE_BY_CATEGORY_SUCCESS,
    payload: data
  }
}

export const fetchJokeByCategory = (dispatch: Dispatch, cat: string) => {
  dispatch(jokeByCategoryRequested())
  const query = {
    category: cat
  }
  chuckApi.getRandomJokeByCategory(query)
    .then((data: JokeResponse) => {
      dispatch(jokeByCategoryLoaded(data))
    })
    .catch((err: any) => console.log(err))
}

const jokesByTextRequest = () => {
  return {
    type: JOKES_BY_TEXT_REQUEST
  }
}

const jokesByTextLoaded = (data: JokesByTextResponse) => {
  return {
    type: JOKES_BY_TEXT_SUCCESS,
    payload: data
  }
}

export const fetchJokesByText = (dispatch: Dispatch, text: string) => {
  dispatch(jokesByTextRequest())
  const query = {
    query: text
  }
  chuckApi.getJokesByText(query)
    .then((data: JokesByTextResponse) => {
      dispatch(jokesByTextLoaded(data))
    })
    .catch((err: any) => console.log(err))
}