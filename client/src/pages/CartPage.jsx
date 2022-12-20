import { Button, Card, Input, message,  Popconfirm, Space, Table } from "antd";
import React, { useRef, useState } from "react";
import CartBill from "../components/cart/CartBill";
import Header from "../components/header/Header";

import { useSelector } from "react-redux";
import { MinusCircleOutlined, PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { decrease, deleteCart, increase } from "../redux/cartSlice";
import Highlighter from 'react-highlight-words';

const CartPage = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  
  const showModal = () => {
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      width: "125px",
      key: "img",
      render: (text) => {
        return <img src={text} alt="" className="w-full h-20 object-cover" />;
      },
    },
    {
      title: "Ürün Adı",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps('title'),
    },
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
      ...getColumnSearchProps('category'),
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      key: "price",
      render: (text) => {
        return <span>{text.toFixed(2)} ₺</span>;
      },
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Ürün Adeti",
      dataIndex: "quantity",
      key: "quantity",
      render: (text,record) => {
        return(
        <div className="flex items-center">
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            size="small"
            className="w-full  flex items-center justify-center !rounded-full"
            onClick={() => dispatch(increase(record))}
          />
          <span className="font-bold w-6 inline-block text-center">
            {record.quantity}
          </span>
          <Button
            type="primary"
            icon={<MinusCircleOutlined />}
            size="small"
            onClick={() => {
              if (record.quantity === 1) {
                if (window.confirm("Ürün Silinsin mi?")) {
                  dispatch(decrease(record));
                  message.success("Ürün Sepetten Silindi");
                }
              }
              if (record.quantity > 1) {
                dispatch(decrease(record));
              }
            }}
            className="w-full  flex items-center justify-center !rounded-full"
          />
        </div>)
      },
    },
    {
      title: "Toplam Fiyat",
      
      render: (text,record) => {
        return <span>{record.quantity*record.price.toFixed(2)} ₺</span>;
      },
    },
    {
      title: "Actions",
      
      render: (_,record) => {
        return (
          <Popconfirm
          title="Silmek için emin misiniz?"
          onConfirm={() => {dispatch(deleteCart(record))
            message.success("Ürün Sepetten Silindi")}}
            okText="Evet"
            cancelText="Hayır">
            <Button type="link" danger > Sil</Button>
          </Popconfirm>
        ) 
      },
    },
  ];
  return (
    <div>
      <Header />
      <div className="px-6">
        <Table
          dataSource={cart.cartItems}
          columns={columns}
          bordered
          pagination={false}
          scroll={{
            x:1200,
            y:300,
          }}
        />
        ;
        <div className="cart-total flex justify-end mt-4 ">
          <Card className="w-72">
            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span>{cart.total>0? cart.total.toFixed(2):0}₺</span>
            </div>
            <div className="flex justify-between my-2">
              <span>KDV Toplam %8</span>
              <span className="text-red-600">{(cart.total * cart.tax) / 100>0 ? `+ ${((cart.total*cart.tax)/100).toFixed(2)}`:0}₺</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Ara Toplam</span>
              <span className="font-bold">{cart.total + (cart.total * cart.tax) / 100>0?(cart.total + (cart.total * cart.tax) / 100).toFixed(2):0}₺</span>
            </div>
            <Button
              type="primary"
              onClick={showModal}
              className="mt-4 w-full"
              size="large"
              disabled={cart.cartItems.length===0}
            >
              Sipariş Oluştur
            </Button>
          </Card>
        </div>
      </div>
      <CartBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default CartPage;
