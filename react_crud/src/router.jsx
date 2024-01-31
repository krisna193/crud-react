import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from './views/Login.jsx';
import Signup from './views/Signup.jsx';
import NotFound from "./views/NotFound.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import Dashboard from "./views/Dashboard.jsx";
import Users from "./views/Users";
import UserForm from "./views/UserForm.jsx";
import Foto from "./views/Fotos.jsx";
import FotoForm from "./views/FotoForm.jsx";


const router = createBrowserRouter([
{
    path: '/',
    element: <DefaultLayout/>,
    children: [
        {
            path: '/',
            element: <Navigate to="/users"/>
        },
        {
            path: '/users',
            element: <Users/>
        },
        {
            path: '/users/new',
            element: <UserForm key="userCreate"/>
        },
        {
            path: '/users/:id',
            element: <UserForm key="userUpdate"/>
        },
        {
            path: '/foto/new',
            element: <FotoForm key="fotoCreate"/>
        },
        {
            path: '/foto/:id',
            element: <FotoForm key="fotoUpdate"/>
        },
        {
            path: '/dashboard',
            element: <Dashboard/>
        },
        {
            path: '/foto',
            element: <Foto/>
        }
]
},
{
    path: '/',
    element: <GuestLayout/>,
    children: [
        {
            path: '/login',
            element: <Login/>
        },
        {
            path: '/signup',
            element: <Signup/>
        },
    ]
},
{
    path: '*',
    element: <NotFound/>
},
])
export default router;