import { useState, useEffect, useRef } from "react";

export default function useComponentVisible(initialValue: boolean) {
  const [visible, setVisible] = useState(initialValue);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  useEffect(
    function () {
      document.addEventListener("click", handleClickOutside, true);

      return () => {
        document.removeEventListener("click", handleClickOutside, true);
      };
    },
    [ref]
  );

  return { ref, visible, setVisible };
}
