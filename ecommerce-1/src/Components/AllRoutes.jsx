import React from "react";
import { Routes, Route } from "react-router";
import { Card } from "../Pages/Card";
import { HomePage } from "../Pages/HomePage";
import { Login } from "../Pages/Login";
import { Product } from "../Pages/Product";
import { Products } from "../Pages/Products";

export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/card" element={<Card />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};
