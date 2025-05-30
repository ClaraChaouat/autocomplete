import type { FC } from "react";
import styles from "./App.module.css";
import CountrySelect from "./features/CountrySelected";

const App: FC = () => {
  return (
    <div className={styles.appWrapper}>
      <h1 className={styles.title}>Autocomplete Demo</h1>
      <CountrySelect />
    </div>
  );
};

export default App;
