import React, { useState, useEffect } from "react";

/**
 * It is used to get the height of the viewport.
 * The hook is used in the ViolatorList component.
 * When the list items are overflow the innerHeight, scrollbar is displayed.
 *
 * @returns
 */

const getWindowSize = () => {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getWindowSize);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return windowSize;
};

export default useWindowSize;
