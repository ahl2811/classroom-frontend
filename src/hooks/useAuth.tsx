import { useContext } from 'react';
import { store } from '../store/store';

export default function useAuth() {
  const {
    state: {
      userState: { user },
    },
  } = useContext(store);
  const Authorization = { headers: { 'x-token': user?.token || '' } };
  return { Authorization };
}
