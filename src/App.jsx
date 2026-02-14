import { createBrowserRouter, RouterProvider } from "react-router";
import { Login } from "./pages/Login";
import Register from "./pages/Register";
import store, { persistedStore } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistedStore}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </>
  );
};
export default App;
