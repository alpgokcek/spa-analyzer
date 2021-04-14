import { useRef, useEffect } from 'react';

const useUnload = (fn, when) => {
  const cb = useRef(fn);

  useEffect(() => {
    const onUnload = cb.current;

    if (when) {
      window.addEventListener('beforeunload', onUnload);
    }
      
    return () => window.removeEventListener('beforeunload', onUnload);
  }, [cb, when]);
};

export default useUnload;