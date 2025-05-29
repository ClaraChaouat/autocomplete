import type { SuggestionItem } from './types'
import type { FC } from 'react'
import Autocomplete from './components/Autocomplete'
import styles from './App.module.css'

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