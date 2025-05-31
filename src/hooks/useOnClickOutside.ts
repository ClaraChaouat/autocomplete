import { useEffect } from "react";
import type { RefObject } from "react";

export function useOnClickOutside(
  ref: RefObject<HTMLDivElement | null>,
  handler: () => void
) {
  useEffect(() => {
    const handleOutsideEvent = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
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
