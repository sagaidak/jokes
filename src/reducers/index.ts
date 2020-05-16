import { ActionTypes, CATEGORIES_REQUEST, CATEGORIES_SUCCESS, RANDOM_JOKE_REQUEST, RANDOM_JOKE_SUCCESS, JOKE_BY_CATEGORY_REQUEST, JOKE_BY_CATEGORY_SUCCESS, JOKES_BY_TEXT_REQUEST, JOKES_BY_TEXT_SUCCESS, SEARCH_VALUE_CHANGE, SELECT_CATEGORY, MAKE_FAV, REMOVE_FAV } from "../actions";
import { JokeResponse, CategoriesListResponse } from '../services/chucknorris-api'


const initialState = {
  categories: {
    value: [] as CategoriesListResponse,
    selected: '',
    isLoading: false
  },
  jokes: {
    value: [] as JokeResponse[],
    favourites: [] as JokeResponse[],
    isLoading: false
  },
  search: {
    value: ''
  }
};

export type State = typeof initialState
export type Jokes = typeof initialState.jokes
export type Categories = typeof initialState.categories
export type Search = typeof initialState.search

const reducer = (state = initialState, action: ActionTypes) => {
  console.log('action', action)
  switch (action.type) {
    case SEARCH_VALUE_CHANGE: {
      return {
        ...state, search: {
          ...state.search,
          value: action.payload
        }
      }
    }
    case SELECT_CATEGORY: {
      return {
        ...state, categories: {
          ...state.categories,
          selected: action.payload
        }
      }
    }
    case CATEGORIES_REQUEST: {
      return {
        ...state, categories: {
          ...state.categories,
          isLoading: true
        }
      }
    }
    case CATEGORIES_SUCCESS: {
      return {
        ...state, categories: {
          ...state.categories,
          value: action.payload,
          isLoading: false
        }
      }
    }
    case RANDOM_JOKE_REQUEST: {
      return {
        ...state, jokes: {
          ...state.jokes,
          isLoading: true
        }
      }
    }
    case RANDOM_JOKE_SUCCESS: {
      return {
        ...state, jokes: {
          ...state.jokes,
          value: [
            action.payload
          ],
          isLoading: false
        }
      }
    }
    case JOKE_BY_CATEGORY_REQUEST: {
      return {
        ...state, jokes: {
          ...state.jokes,
          isLoading: true
        }
      }
    }
    case JOKE_BY_CATEGORY_SUCCESS: {
      return {
        ...state, jokes: {
          ...state.jokes,
          value: [
            action.payload
          ],
          isLoading: false
        }
      }
    }
    case JOKES_BY_TEXT_REQUEST: {
      return {
        ...state, jokes: {
          ...state.jokes,
          isLoading: true
        }
      }
    }
    case JOKES_BY_TEXT_SUCCESS: {
      return {
        ...state, jokes: {
          ...state.jokes,
          value: action.payload.result,
          isLoading: false
        }
      }
    }
    case MAKE_FAV: {
      return {
        ...state, jokes: {
          ...state.jokes,
          favourites: [
            ...state.jokes.favourites,
            action.payload
          ]
        }
      }
    }
    case REMOVE_FAV: {
      const idx = state.jokes.favourites.findIndex((x: JokeResponse) => x.id === action.payload)
      if (idx === -1) return state
      return {
        ...state, jokes: {
          ...state.jokes,
          favourites: [
            ...state.jokes.favourites.slice(0, idx),
            ...state.jokes.favourites.slice(idx + 1),
          ]
        }
      }
    }
    default:
      return state
  }
};

export default reducer