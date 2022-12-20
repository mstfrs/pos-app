import { Card, Form, Input, Modal, Select } from 'antd'
import React from 'react'
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import { reset } from '../../redux/cartSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CartBill = ({setIsModalOpen,isModalOpen}) => {
  const cart=useSelector((state)=>state.cart)
  const dispatch=useDispatch();
  const navigate=useNavigate()

    const onFinish =async (values) => {
        try {
          const res= await fetch(process.env.REACT_APP_SERVER_URL+"/api/bills/add-bill",{
            method:"POST",
            body:JSON.stringify({
              ...values,
              cartItems:cart.cartItems,
              subTotal:cart.total,
              tax:((cart.total*cart.tax)/100).toFixed(2),
              totalAmount:(cart.total+(cart.total*cart.tax)/100).toFixed(2)
            }),
            headers:{"Content-type":"application/json; charset=UTF-8"}
          })
          if (res.status===200) {
            message.success("Fatura Başarıyla Oluşturuldu")
            dispatch(reset())
            setIsModalOpen(false)
            navigate("/bills")
          }
        } catch (error) {
          message.error("Fatura Oluşturulamadı")
          console.log(error)
        }
      };
  return (
    <Modal title="Fatura Oluştur" open={isModalOpen} footer={false} onCancel={()=>setIsModalOpen(false)}>
        <Form layout={"vertical"} onFinish={onFinish}>
            <Form.Item label="Müşteri Adı" name={"customerName"} rules={[
              {
                required: true,
                message: 'Müşteri adını boş bırakamazsınız',
              },
            ]}>
                <Input placeholder="Müşteri Adını Yazınız"/>
            </Form.Item>
            <Form.Item label="Tel No" name={"customerPhoneNumber"} rules={[
              {
                required: true,
                message: 'Telefon Numarasını boş bırakamazsınız',
              },
            ]}>
                <Input type='phone' placeholder='Ödeme Yöntemini Seçiniz' maxLength={11}/>
            </Form.Item>
            <Form.Item label="Ödeme Yöntemi"  name={"paymentMode"} rules={[
              {
                required: true,
                message: 'Bir Ödeme Yöntemi seçmelisiniz',
              },
            ]}>
            <Select placeholder="Ödeme Yöntemi Seçiniz">
            <Select.Option value="Nakit">Nakit</Select.Option>
            <Select.Option value="Kredi Kartı">Kredi Kartı</Select.Option>
          </Select>
            </Form.Item>
            <Card className="">
            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span>{cart.total>0? cart.total.toFixed(2):0}₺</span>
            </div>
            <div className="flex justify-between my-2">
              <span>KDV Toplam %8</span>
              <span className="text-red-600">{(cart.total * cart.tax) / 100>0 ? `+ ${((cart.total*cart.tax)/100).toFixed(2)}`:0}₺</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Genel Toplam</span>
              <span className="font-bold">{cart.total + (cart.total * cart.tax) / 100>0?(cart.total + (cart.total * cart.tax) / 100).toFixed(2):0}₺</span>
            </div>
            <div className='flex justify-end' >
            <Button
              type="primary"
              htmlType='submit'
              className="mt-4 "
              size="middle"
              disabled={cart.cartItems.length===0}
            >
              Sipariş Oluştur
            </Button>
            </div>
            
          </Card>
        </Form>
      </Modal>
        
  )
}

export default CartBill