import { createContext, Dispatch, SetStateAction, useContext } from 'react'

interface SearchContextType {
  search: string
  updateSearch: Dispatch<SetStateAction<string>>
}

export const SearchContext = createContext<SearchContextType>({
  search: '',
  updateSearch: () => {
    /* no-op */
  },
})

export const useSearchContext = () => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider')
  }
  return context
}
