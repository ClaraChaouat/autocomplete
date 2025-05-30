import type { FC } from 'react'
import styles from './App.module.css'
import Autocomplete from './components/Autocomplete/Autocomplete'
import { SuggestionItem } from './types/suggestion'

const App: FC = () => {
  const handleSelect = (item: SuggestionItem) => {
    console.log('Selected:', item)
  }

  return (
    <div className={styles.appWrapper}>
      <h1 className={styles.title}>Autocomplete Demo</h1>
      <Autocomplete
        placeholder="Search countries..."
        onSelect={handleSelect}
      />
    </div>
  )
}

export default App