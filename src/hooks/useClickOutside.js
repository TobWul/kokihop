import { useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useClickOutside(ref, clickOutsideHandler) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        clickOutsideHandler && clickOutsideHandler();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, clickOutsideHandler]);
}

export default useClickOutside;
