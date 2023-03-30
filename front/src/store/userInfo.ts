import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

const usePersistedRecoilState = (key: string, defaultState: any) => {
  const [state, setState] = useRecoilState(defaultState);

  useEffect(() => {
    const item = window.localStorage.getItem(key);
    if (item) {
      setState(JSON.parse(item));
    }
  }, [key, setState]);

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

export default usePersistedRecoilState;
