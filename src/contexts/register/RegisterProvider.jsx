import { useReducer } from "react";
import { registerContext as RegisterContext } from "./registerContext";

const RegisterProvider = ({ children }) => {
  const initialState = {
    user: {},
  };

  const [state, dispatch] = useReducer((prevState, action) => {
    switch (action.type) {
      case "REGISTER":
        return {
          ...prevState,
          user: action.payload,
        };

      default:
        return prevState;
    }
  }, initialState);

  return (
    <RegisterContext.Provider value={{ state, dispatch }}>
      {children}
    </RegisterContext.Provider>
  );
};

export default RegisterProvider;
