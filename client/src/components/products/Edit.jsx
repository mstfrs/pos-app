import { useState, useEffect } from "react";
import { Form, Input, message, Modal, Select, Table } from "antd";
import { Button } from "antd";

export const Edit = () => {
  const [products, setProducts] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editigItem, setEditigItem] = useState({});
  const [categories, setCategories] = useState([]);
  const [form] = Form.useForm();
  console.log(editigItem);
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

  const onFinish = (values) => {
    try {
      fetch(process.env.REACT_APP_SERVER_URL+"/api/product/update-product", {
        method: "PUT",
        body: JSON.stringify({ ...values, productId: editigItem._id }),
        headers: { "Content-type": "application/json; charsey=UTF-8" },
      });
      message.success("Ürün başarıyla güncellendi");
      setProducts(
        products.map((item) => {
          return item;
        })
      );
    } catch (error) {
      message.error("Ürün güncellenemedi");
      console.log(error);
    }
  };

  const deleteProduct = (id) => {
    if (window.confirm("Emin misiniz?")) {
      try {
        fetch(process.env.REACT_APP_SERVER_URL+"/api/product/delete-product", {
          method: "DELETE",
          body: JSON.stringify({ productId: id }),
          headers: { "Content-type": "application/json; charsey=UTF-8" },
        });
        message.success("Ürün başarıyla silindi");
        setProducts(products.filter((item) => item._id !== id));
      } catch (error) {
        message.error("Ürün silinemedi");
        console.log(error);
      }
    }
  };

  const columns = [
    {
      title: "Ürün Adı",
      dataIndex: "title",
      width: "8%",
    },
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      width: "4%",
      render: (_, record) => {
        return (
          <img className="h-20 w-full object-cover" src={record.img} alt="" />
        );
      },
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      width: "8%",
    },
    {
      title: "Kategori",
      dataIndex: "category",
      width: "8%",
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "10%",
      render: (_, record) => {
        return (
          <div>
            <Button
              type="link"
              className="pl-0"
              onClick={() => {
                setIsEditModalOpen(true);
                setEditigItem(record);
              }}
            >
              Düzenle
            </Button>
            <Button
              type="link"
              danger
              onClick={() => deleteProduct(record._id)}
            >
              Sil
            </Button>
            ;
          </div>
        );
      },
    },
  ];
  return (
    <>
      <Table
        bordered
        dataSource={products}
        columns={columns}
        rowKey={"_id"}
        scroll={{
          x: 1000,
          y: 600,
        }}
      ></Table>
      <Modal
        title="Yeni Ürün Ekle"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          form={form}
          initialValues={editigItem}
        >
          <Form.Item
            name="title"
            label="Ürün Adı"
            rules={[
              { required: true, message: "Ürün adı alanı boş geçilemez" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="img"
            label="Ürün Görseli"
            rules={[
              { required: true, message: "Ürün Görseli alanı boş geçilemez" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Ürün Fiyatı"
            rules={[
              { required: true, message: "Ürün Fiyatı alanı boş geçilemez" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Kategori Adı"
            rules={[
              { required: true, message: "Kategori alanı boş geçilemez" },
            ]}
          >
            <Select
              showSearch
              placeholder="Kategori Seçiniz"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.title ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={categories}
            />
          </Form.Item>
          <Form.Item className="flex justify-end mb-0">
            <Button type="primary" htmlType="submit" size="xl">
              Ekle
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
