import React, { useState } from "react";
import Header from "../components/header/Header";
import Categories from "../components/categories/Categories";
import Products from "../components/products/Products";
import { CartTotals } from "../components/cart/CartTotals";
import { useEffect } from "react";
import { Spin } from "antd";


const Home = () => {
  const [products, setProducts] = useState();
  const [categories, setCategories] = useState();
  const [filtered, setFiltered] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL+"/api/category/get-all");
        const data = await res.json();
        data &&
          setCategories(
            data.map((item) => {
              return { ...item, value: item.title };
            })
          );
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);
  
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL+"/api/product/get-all");
        const data = await res.json();

        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);
  return (
    <>
      <Header setSearch={setSearch}/>
      {products && categories ?(
        <div className="home px-6 flex md:flex-row flex-col justify-between  gap-10 md:pb-0 pb-24 h-screen">
        <div className="categories overflow-auto max-h-[calc(100vh_-_112px)] md:pb-10 -pb-0 md:mr-0 -mr-[20px]">
          <Categories categories={categories} setCategories={setCategories} setFiltered={setFiltered} products={products}/>
        </div>
        <div className="products flex-[8] overflow-y-auto max-h-[calc(100vh_-_12px)] pb-10">
          <Products search={search} categories={categories} filtered={filtered} setProducts={setProducts}products={products}/>
        </div>
        <div className="cart-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[24px] border pb-10">
          <CartTotals />
        </div>
      </div>
      ):<Spin size="large" className="absolute flex justify-center top-1/2 w-screen h-screen "/>}
    </>
  );
};

export default Home;
