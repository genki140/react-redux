import { useLayoutEffect, useRef } from 'react';

export default function usePrevious<T>(value: T, initial: T) {
  const ref = useRef<T>(initial);
  useLayoutEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
