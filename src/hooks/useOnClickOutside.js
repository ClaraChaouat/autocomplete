import { useEffect } from "react";
export function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const handleOutsideEvent = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    };
    document.addEventListener("mousedown", handleOutsideEvent);
    document.addEventListener("touchstart", handleOutsideEvent);
    return () => {
      document.removeEventListener("mousedown", handleOutsideEvent);
      document.removeEventListener("touchstart", handleOutsideEvent);
    };
  }, [ref, handler]);
}
