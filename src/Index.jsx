import React, { useState, createContext, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import App from "./App";
import { Form } from "./pages/Form";
import { MyConcurso } from "./pages/MyConcurso";
import { Reporte } from "./pages/Reporte";

export const AuthContext = createContext();
export const Index = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <NotFound />,
      children: [
        {
          path: "/",
          element: <Form />,
        },
        {
          path: '/myconcurso/:id',
          element: <MyConcurso></MyConcurso>
        },
        {
          path: '/reporte',
          element: <Reporte></Reporte>
        }
      ],
    },
  ]);
  return (
    <AuthContext.Provider value={{}}>
      <RouterProvider router={routes}></RouterProvider>
    </AuthContext.Provider>
  );
};
