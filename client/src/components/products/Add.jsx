import React from "react";
import { Modal, Form, Input, Button, message, Select } from "antd";

export const Add = ({
  isAddModalOpen,
  setIsAddModalOpen,
  categories,
  setCategories,
  setProducts,
  products
}) => {
  const [form] = Form.useForm();
  

  const onFinish = (values) => {
    try {
      fetch(process.env.REACT_APP_SERVER_URL+"/api/product/add-product", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charsey=UTF-8" },
      });
      message.success("Ürün başarıyla eklendi");
      form.resetFields();
      setProducts([
        ...products,
        { ...values,_id: Math.random(), price: Number(values.price) },
      ]);
      setIsAddModalOpen(false)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Modal
        title="Yeni Ürün Ekle"
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
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
    </div>
  );
};
