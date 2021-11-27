import { useContext } from "react";
import { store } from "../store";

const useUserContext = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(store);
  return { user, dispatch };
};

export default useUserContext;
