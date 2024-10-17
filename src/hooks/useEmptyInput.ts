import { useEffect, useRef, useState } from 'react';

// Hook para chequear si se ingreso 1 caracter en el input y validar si el input esta vacio
export function useEmptyInput(value: string) {
  const [errorState, setErrorState] = useState(false);
  const isFirstInputRef = useRef(true);

  useEffect(() => {
    if (isFirstInputRef.current) {
      isFirstInputRef.current = value === '';
      return;
    }
    if (value === '') {
      setErrorState(true);
    } else {
      setErrorState(false);
    }
  }, [value]);

  return errorState;
}
