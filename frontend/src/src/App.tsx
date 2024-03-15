/*
 * Copyright (c) 2024. HackQC24.
 *  Author: Alpha Oumar
 *  Version: 1.0
 */

import HomePage from "./pages/HomePage.tsx";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ListPage from "./pages/ListPage.tsx";
import Layout from "./pages/Layout.tsx";
import SinglePage from "./pages/singlePage";
import ProfilePage from "./pages/ProfilePage.tsx";
import Contact from "./components/Contact.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "./redux/store.ts";
import {useEffect} from "react";
import {getAuthUser} from "./redux/thunks/authThunk.ts";

function App()
{
  const dispatch = useAppDispatch()
  const {user}:any = useSelector((state:RootState) => state.auth)
  console.log(user)
  useEffect(() =>
  {
    dispatch(getAuthUser())
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children:[
        {
          path:"/",
          element:<HomePage/>
        },
        {
          path:"/list",
          element:<ListPage />
        },
        {
          path:"/:id",
          element:<SinglePage/>
        },
        {
          path:"/profile",
          element:<ProfilePage/>
        },
        {
          path:"/contact",
          element:<Contact/>
        },
        {
          path:"/signin",
          element:<Login/>
        },
        {
          path:"/register",
          element:<Register/>
        },
      ]
    }
  ]);

  return (

    <RouterProvider router={router}/>
  );
}

export default App;
