import { useEffect, useRef, useState } from 'react';

export const useTimer = (timer = 0, callback = null) => {
  const [isEnded, setIsEnded] = useState(false);
  const cb = useRef();
  cb.current = callback;

  useEffect(() => {
    if (typeof timer !== 'number') {
      return;
    }
    const t = setTimeout(() => {
      setIsEnded(true);
      cb.current?.();
    }, timer);
    return () => clearTimeout(t);
  }, [timer]);

  return typeof timer !== 'number' ? null : isEnded;
};
