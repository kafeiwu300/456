import { useState } from 'react';

function useToggle(initValue = false) {
  const [state, setState] = useState(initValue);
  return {
    state,
    toggle() {
      setState(!state);
    },
    setState,
  };
}

export default useToggle;
