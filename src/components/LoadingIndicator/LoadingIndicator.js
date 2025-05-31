import { jsx as _jsx } from "react/jsx-runtime";
import styles from "./LoadingIndicator.module.css";
const LoadingIndicator = () =>
  _jsx("div", {
    className: styles.statusRow,
    children: _jsx("div", {
      className: styles.loadingSlot,
      children: _jsx("span", { children: "Loading..." }),
    }),
  });
export default LoadingIndicator;
