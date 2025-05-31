import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./App.module.css";
import CountrySelect from "./features/CountrySelected";
const App = () => {
  return _jsx("div", {
    className: styles.appWrapper,
    children: _jsxs("div", {
      className: styles.card,
      children: [
        _jsx("h1", {
          className: styles.title,
          children: "Onboarding information ",
        }),
        _jsx(CountrySelect, {}),
      ],
    }),
  });
};
export default App;
