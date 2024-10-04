import { createBrowserRouter } from "react-router-dom";
import { Home, Login } from "../pages";
import PrivateRoute from "./PrivateRoute";

const routes = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/",
        element: <PrivateRoute component={<Home />} />,
    }
]);

export default routes;