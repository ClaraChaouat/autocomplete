import type { FC } from 'react'
import Autocomplete from './components/Autocomplete'
import type { SuggestionItem } from './types'

const App: FC = () => {
  const handleSelect = (item: SuggestionItem) => {
    console.log('Selected:', item)
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Autocomplete Demo</h1>
      <Autocomplete
        placeholder="Search programming languages..."
        onSelect={handleSelect}
      />
    </div>
  )
}

export default App