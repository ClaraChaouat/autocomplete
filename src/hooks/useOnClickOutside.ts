import { useEffect } from "react";
import type { RefObject } from "react";

export function useOnClickOutside(
  ref: RefObject<HTMLDivElement | null>,
  handler: () => void,
) {
  useEffect(() => {
    const handleOutsideEvent = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleOutsideEvent);
    return () => document.removeEventListener("mousedown", handleOutsideEvent);
  }, [ref, handler]);
}
