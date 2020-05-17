import reducer from '../reducers'
import { 
  SEARCH_VALUE_CHANGE, 
  SELECT_CATEGORY,
  CATEGORIES_REQUEST,
  CATEGORIES_SUCCESS,
  RANDOM_JOKE_REQUEST,
  RANDOM_JOKE_SUCCESS,
  JOKE_BY_CATEGORY_REQUEST,
  JOKE_BY_CATEGORY_SUCCESS,
  JOKES_BY_TEXT_REQUEST,
  JOKES_BY_TEXT_SUCCESS,
  MAKE_FAV,
  REMOVE_FAV
} from '../actions'

const initialState = {
  categories: {
    value: [],
    selected: '',
    isLoading: false
  },
  jokes: {
    value: [],
    favourites: [],
    isLoading: false
  },
  search: {
    value: ''
  }
}

const joke = {
  categories: ['cat'],
  created_at: 'created someday',
  icon_url: 'icon url',
  id: 'random by cat id',
  updated_at: 'udated someday',
  url: 'random url',
  value: 'joke value'
}

const joke2 = {
  categories: ['cat2'],
  created_at: 'created someday2',
  icon_url: 'icon url2',
  id: 'random by cat id2',
  updated_at: 'udated someday2',
  url: 'random url2',
  value: 'joke value2'
}

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      initialState
    )
  })

  it('should handle SEARCH_VALUE_CHANGE', () => {
    expect(
      reducer(initialState, {
        type: SEARCH_VALUE_CHANGE,
        payload: 'Run the tests'
      })
    ).toEqual(
      {
        categories: {
          value: [],
          selected: '',
          isLoading: false
        },
        jokes: {
          value: [],
          favourites: [],
          isLoading: false
        },
        search: {
          value: 'Run the tests'
        }
      }
    )
  })

  it('should handle SELECT_CATEGORY', () => {
    expect(
      reducer(initialState, {
        type: SELECT_CATEGORY,
        payload: 'Run the tests'
      })
    ).toEqual(
      {
        categories: {
          value: [],
          selected: 'Run the tests',
          isLoading: false
        },
        jokes: {
          value: [],
          favourites: [],
          isLoading: false
        },
        search: {
          value: ''
        }
      }
    )
  })

  it('should handle CATEGORIES_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: CATEGORIES_REQUEST
      })
    ).toEqual(
      {
        categories: {
          value: [],
          selected: '',
          isLoading: true
        },
        jokes: {
          value: [],
          favourites: [],
          isLoading: false
        },
        search: {
          value: ''
        }
      }
    )
  })

  it('should handle CATEGORIES_SUCCESS', () => {
    expect(
      reducer(initialState, {
        type: CATEGORIES_SUCCESS,
        payload: ['cat1', 'cat2']
      })
    ).toEqual(
      {
        categories: {
          value: ['cat1', 'cat2'],
          selected: '',
          isLoading: false
        },
        jokes: {
          value: [],
          favourites: [],
          isLoading: false
        },
        search: {
          value: ''
        }
      }
    )
  })

  it('should handle RANDOM_JOKE_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: RANDOM_JOKE_REQUEST
      })
    ).toEqual(
      {
        categories: {
          value: [],
          selected: '',
          isLoading: false
        },
        jokes: {
          value: [],
          favourites: [],
          isLoading: true
        },
        search: {
          value: ''
        }
      }
    )
  })

  it('should handle RANDOM_JOKE_SUCCESS', () => {
    expect(
      reducer(initialState, {
        type: RANDOM_JOKE_SUCCESS,
        payload: joke
      })
    ).toEqual(
      {
        categories: {
          value: [],
          selected: '',
          isLoading: false
        },
        jokes: {
          value: [joke],
          favourites: [],
          isLoading: false
        },
        search: {
          value: ''
        }
      }
    )
  })

  it('should handle JOKE_BY_CATEGORY_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: JOKE_BY_CATEGORY_REQUEST
      })
    ).toEqual(
      {
        categories: {
          value: [],
          selected: '',
          isLoading: false
        },
        jokes: {
          value: [],
          favourites: [],
          isLoading: true
        },
        search: {
          value: ''
        }
      }
    )
  })

  it('should handle JOKE_BY_CATEGORY_SUCCESS', () => {
    expect(
      reducer(initialState, {
        type: JOKE_BY_CATEGORY_SUCCESS,
        payload: joke
      })
    ).toEqual(
      {
        categories: {
          value: [],
          selected: '',
          isLoading: false
        },
        jokes: {
          value: [joke],
          favourites: [],
          isLoading: false
        },
        search: {
          value: ''
        }
      }
    )
  })

  it('should handle JOKES_BY_TEXT_REQUEST', () => {
    expect(
      reducer(initialState, {
        type: JOKES_BY_TEXT_REQUEST
      })
    ).toEqual(
      {
        categories: {
          value: [],
          selected: '',
          isLoading: false
        },
        jokes: {
          value: [],
          favourites: [],
          isLoading: true
        },
        search: {
          value: ''
        }
      }
    )
  })

  it('should handle JOKES_BY_TEXT_SUCCESS', () => {
    expect(
      reducer(initialState, {
        type: JOKES_BY_TEXT_SUCCESS,
        payload: { result: [joke, joke2] }
      })
    ).toEqual(
      {
        categories: {
          value: [],
          selected: '',
          isLoading: false
        },
        jokes: {
          value: [joke, joke2],
          favourites: [],
          isLoading: false
        },
        search: {
          value: ''
        }
      }
    )
  })

  it('should handle MAKE_FAV', () => {
    expect(
      reducer(initialState, {
        type: MAKE_FAV,
        payload: joke
      })
    ).toEqual(
      {
        categories: {
          value: [],
          selected: '',
          isLoading: false
        },
        jokes: {
          value: [],
          favourites: [joke],
          isLoading: false
        },
        search: {
          value: ''
        }
      }
    )
  })

  it('should handle REMOVE_FAV', () => {
    expect(
      reducer({
        categories: {
          value: [],
          selected: '',
          isLoading: false
        },
        jokes: {
          value: [],
          favourites: [joke, joke2],
          isLoading: false
        },
        search: {
          value: ''
        }
      }, {
        type: REMOVE_FAV,
        payload: 'random by cat id'
      })
    ).toEqual(
      {
        categories: {
          value: [],
          selected: '',
          isLoading: false
        },
        jokes: {
          value: [],
          favourites: [joke2],
          isLoading: false
        },
        search: {
          value: ''
        }
      }
    )
  })

})