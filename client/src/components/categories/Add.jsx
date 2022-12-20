import React from "react";
import { Modal, Form, Input, Button ,message} from "antd";

export const Add = ({ isAddModalOpen, setIsAddModalOpen,categories,setCategories }) => {
    const [form] = Form.useForm();
    
    const onFinish = (values) => {
        try {
          fetch(process.env.REACT_APP_SERVER_URL+"/api/category/add-category", {
            method: "POST",
            body: JSON.stringify(values),
            headers: { "Content-type": "application/json; charsey=UTF-8" },
          });
          message.success("Kategori başarıyla eklendi");
          form.resetFields();
          setCategories([...categories,{_id:Math.random(),title:values.title

          }])
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <div>
      <Modal
        title="Yeni Kategori Ekle"
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item
            name="title"
            label="Kategori Ekle"
            rules={[{ required: true, message: "Kategori alan boş geçilemez" }]}
          >
            <Input />
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
