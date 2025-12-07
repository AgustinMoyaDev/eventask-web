import { createContext, Dispatch, SetStateAction, useContext } from 'react'

type SearchContextType = {
  search: string
  updateSearch: Dispatch<SetStateAction<string>>
}

export const SearchContext = createContext<SearchContextType>({
  search: '',
  updateSearch: () => {},
})

export const useSearchContext = () => {
  const context = useContext(SearchContext)
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider')
  }
  return context
}
