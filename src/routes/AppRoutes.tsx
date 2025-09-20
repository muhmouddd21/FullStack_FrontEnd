import {  UserLayout } from "@layouts/index";
import { Error,  Login, Logout, Register,Profile, TasksDashBoard } from "@pages/index";


import { createBrowserRouter, RouterProvider } from "react-router-dom";


const router = createBrowserRouter([

 // --- Group 1
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path:"/logout",
        element:<Logout />
    },

// --- Group 2
    {
        path: "/", 
        element: (

                <UserLayout />
        ),
        errorElement: <Error />,
        children: [
            {
                index: true, 
                element: <Profile />,
            },
            {
                path:'tasks',
                element:<TasksDashBoard />
            },
            // {
            //     path:'todo',
            //     element: <TodoDetails />,
            // }
        ],
    },
]);

function AppRouter() {

return <RouterProvider router={router} />;
  
}

export default AppRouter