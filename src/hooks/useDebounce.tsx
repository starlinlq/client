import React, { useEffect } from "react";
import { useState } from "react";

const useDebouce = (delay: number, value: string) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    function () {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay]
  );

  return debouncedValue;
};

export default useDebouce;
