import { Badge, Input } from "antd";
import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./index.css";

const Header = ({setSearch}) => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const {pathname}=useLocation();
  const logOut = () => {
    if (window.confirm("Çıkış yapmak istediğinize emin misiniz?")) {
      localStorage.removeItem("posUser");
      navigate("/login");
    }
  };
  return (
    <div className="border-b mb-6">
      <header className="header py-4 px-6  flex  justify-between items-center gap-10">
        <div className="logo">
          <Link to="/">
            <h2 className="text-2xl font-bold md:text-4xl">LOGO</h2>
          </Link>
        </div>
        <div className="header-search flex-1 flex justify-center">
          <Input
            size="large"
            placeholder="Ürün Ara"
            prefix={<SearchOutlined />}
            className="rounded-full max-w-[800px]"
            onClick={()=>{
              pathname !== "/" && navigate("/")
            }}
            onChange={(e)=>setSearch(e.target.value.toLowerCase())}
          />
        </div>
        <div className="menu-links  ">
          <Link
            to={"/"}
            className={`menu-link flex flex-col hover:text-[#40a9ff] transition-all ${
              pathname==="/" && "active"
            }`}
          >
            <HomeOutlined className="text-xl md:text-2xl" />
            <span className="md:text-xs text-[10px]">Ana Sayfa</span>{" "}
          </Link>
          <Badge
            count={cart.cartItems.length}
            offset={[0, 6]}
            className="hidden md:flex"
          >
            <Link to={"/cart"} className={`menu-link ${
              pathname==="/cart" && "active"
            }`}>
              <ShoppingCartOutlined className="text-xl md:text-2xl" />
              <span className="md:text-xs text-[10px]">Sepet</span>{" "}
            </Link>
          </Badge>
          <Link to={"/bills"} className={`menu-link ${
              pathname==="/bills" && "active"
            }`}>
            <CopyOutlined className="text-xl md:text-2xl" />
            <span className="md:text-xs text-[10px]">Fatura</span>{" "}
          </Link>
          <Link to={"/customers"} className={`menu-link ${
              pathname==="/customers" && "active"
            }`}>
            <UserOutlined className="text-xl md:text-2xl" />
            <span className="md:text-xs text-[10px]">Müşteriler</span>{" "}
          </Link>
          <Link to={"/statistic"} className={`menu-link ${
              pathname==="/statistic" && "active"
            }`}>
            <BarChartOutlined className="text-xl md:text-2xl" />
            <span className="md:text-xs text-[10px]">İstatistikler</span>{" "}
          </Link>
          <div onClick={logOut}><Link className={`menu-link `} >
            <LogoutOutlined className="text-xl md:text-2xl" />
            <span className="md:text-xs text-[10px]" >Çıkış</span>{" "}
          </Link></div>
          
        </div>
        <Badge count={cart.cartItems.length} offset={[0, 6]} className="md:hidden flex">
          <Link to={"/"} className={`menu-link ${
              pathname==="/cart" && "active"
            }`}>
            <ShoppingCartOutlined className="text-2xl " />
            <span className="md:text-xs text-[10px]">Sepet</span>{" "}
          </Link>
        </Badge>
      </header>
    </div>
  );
};

export default Header;
