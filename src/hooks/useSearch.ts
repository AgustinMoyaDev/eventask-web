import { useContext, useRef, useState } from 'react'

import { SearchContext } from '../context/search/SearchContext'

export function useSearch() {
  const searchContext = useContext(SearchContext)
  if (!searchContext) {
    throw new Error('SearchContext must be used within a SearchProvider')
  }

  const { search, updateSearch } = searchContext
  const [error, setError] = useState<string | null>('')
  const isFirstInput = useRef(true)

  return { isFirstInput, search, updateSearch, error, setError }
}
