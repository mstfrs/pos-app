import { Button, message } from "antd";
import React from "react";
import {
  ClearOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteCart, increase, decrease,reset } from "../../redux/cartSlice";
import { useNavigate } from 'react-router-dom';

export const CartTotals = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate=useNavigate()
  return (
    <div className="cart h-full max-h-[calc(100vh_-_90px)] flex flex-col">
      <h2 className="bg-blue-600 text-center text-white font-bold tracking-wide py-4">
        Sepetteki Ürünler
      </h2>
      <ul className="cart-items px-2 flex flex-col gap-y-3 py-2 overflow-y-auto">
        {cart.cartItems.length > 0
          ? cart.cartItems.map((item) => (
              <li className="cart-item flex justify-between" key={item._id}>
                <div className="flex items-center">
                  <img
                    src={item.img}
                    alt=""
                    className="w-16 h-16 object-cover"
                    onClick={() => {dispatch(deleteCart(item))
                      message.success("Ürün Sepetten Silindi")}}
                  />
                  <div className="flex flex-col ml-2">
                    <b>{item.title}</b>
                    <span>
                      {item.price}₺ X {item.quantity}
                    </span>
                  </div>
                </div>
                <div className="flex items-center ">
                  <Button
                    type="primary"
                    icon={<PlusCircleOutlined />}
                    size="small"
                    className="w-full  flex items-center justify-center !rounded-full"
                    onClick={() => dispatch(increase(item))}
                  />
                  <span className="font-bold w-6 inline-block text-center">{item.quantity}</span>
                  <Button
                    type="primary"
                    icon={<MinusCircleOutlined />}
                    size="small"
                    onClick={() =>{
                      if (item.quantity===1) {
                        if (window.confirm("Ürün Silinsin mi?")) {
                          dispatch(decrease(item))
                          message.success("Ürün Sepetten Silindi")
                        }
                      }
                      if (item.quantity>1) {
                        dispatch(decrease(item))
                        
                      }
                    } }
                    className="w-full  flex items-center justify-center !rounded-full"
                  />
                </div>
              </li>
            )).reverse()
          : "Sepette hiç ürün yok..."}
      </ul>
      <div className="cart-totals mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>Ara Toplam</b>
            <span>{cart.total>0? cart.total.toFixed(2):0}₺</span>
          </div>
          <div className="flex justify-between p-2">
            <b>KDV %{cart.tax}</b>
            <span className="text-red-700">
              {(cart.total * cart.tax) / 100>0 ? `+ ${((cart.total*cart.tax)/100).toFixed(2)}`:0}₺
            </span>
          </div>
        </div>
        <div className="mt-4 border-b">
          <div className="flex justify-between p-2">
            <b className="text-lg text-green-500">Genel Toplam</b>
            <span className="text-xl">
              {cart.total + (cart.total * cart.tax) / 100>0?(cart.total + (cart.total * cart.tax) / 100).toFixed(2):0}₺
            </span>
          </div>
        </div>
        <div className="py-4 px-2">
          <Button type="primary" size="large" className="w-full mt-2"
          disabled={cart.cartItems.length===0}
          onClick={()=>navigate("/cart")}>
            Sipariş Oluştur
          </Button>
          <Button
            type="primary"
            icon={<ClearOutlined />}
            size="large"
            danger
            disabled={cart.cartItems.length===0}
            className="w-full mt-2 flex items-center justify-center"
            onClick={()=>{
              if (window.confirm("Emin misiniz?")) {
                dispatch(reset())
                message.success("Sepet Başarıyla Temizlendi")
              }
            }}
          >
            Temizle
          </Button>
        </div>
      </div>
    </div>
  );
};
