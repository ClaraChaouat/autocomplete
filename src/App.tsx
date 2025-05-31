import type { FC } from "react";
import styles from "./App.module.css";
import CountrySelect from "./features/CountrySelected";

const App: FC = () => {
  return (
    <div className={styles.appWrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Onboarding information </h1>
        <CountrySelect />
      </div>
    </div>
  );
};

export default App;
