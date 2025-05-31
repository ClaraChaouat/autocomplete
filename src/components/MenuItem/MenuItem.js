import { jsx as _jsx } from "react/jsx-runtime";
import { memo } from "react";
const MenuItem = ({ item, isActive, onClick, children, className }) =>
  _jsx("li", {
    id: `option-${item.id}`,
    role: "option",
    "aria-selected": isActive,
    className: className,
    onClick: onClick,
    children: children || item.name,
  });
export default memo(MenuItem);
