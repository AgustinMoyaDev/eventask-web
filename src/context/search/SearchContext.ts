import { createContext, useContext } from 'react'

interface SearchContextType {
  search: string
  setSearch: (value: string) => void
}

export const SearchContext = createContext<SearchContextType | null>(null)

export const useSearch = () => {
  const context = useContext(SearchContext)

  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider')
  }

  return context
}
