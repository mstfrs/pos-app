import React, { useState } from 'react'
import { Form, Input, Button, Carousel, Checkbox, message } from 'antd';
import { Link } from 'react-router-dom';
import { AuthCarousel } from '../../components/auth/AuthCarousel';
import { useNavigate } from 'react-router-dom';


export const Login = () => {
    const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    setLoading(true)
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL+"/api/auth/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charsey=UTF-8" },
      });
      const user= await res.json()
      if (res.status === 200) {
        localStorage.setItem("posUser",JSON.stringify({
            username:user.username,
            email:user.email
        }))
        message.success("Giriş İşlemi Başarılı");
        navigate("/");
        
      }else if(res.status===400){
        message.error("Kullanıcı Bulunamadı!");
      }
      else if(res.status===403){
        message.error("Hatalı Şifre");
      }
    } catch (error) {
      message.error("Giriş Yapılamadı!");
      console.log(error);
    }
    setLoading(false)
  };
  return (
    <div className='h-screen'>
        <div className='flex justify-between h-full'>

        
        <div className='flex flex-col h-full justify-center px-20 w-full relative'> 
        <h1 className='text-center text-5xl font-bold'>LOGO</h1>
        <Form layout='vertical' onFinish={onFinish} initialValues={{
            remember:false
        }}>
            
            <Form.Item label="E-mail Adresi" name={"email"} rules={[{required:true,
            message:"E-mail Alanı Boş Bırakılamaz!",
            },]}>
                
                <Input/>
            </Form.Item>
            <Form.Item label="Şifre" name={"password"} rules={[{required:true,
            message:"Şifre Alanı Boş Bırakılamaz!",
            },]}>
                
                <Input.Password/>
            </Form.Item>
            <Form.Item name={"remember"}>
                <div className='flex justify-between items-center'>
                    <Checkbox>Remember me</Checkbox>
                    <Link>Forgot Password?</Link>
                </div>
            </Form.Item>
            
            <Form.Item   >
                
                <Button type='primary' htmlType='submit' size='large' className='w-full' loading={loading}> Giriş Yap</Button>
            </Form.Item>

        </Form>
        <div className='flex justify-center absolute left-0 bottom-10 w-full'>Henüz bir hesabınız yok mu? <Link to="/register" className='text-blue-600'>Kaydol</Link></div>
        </div>
        <div className='xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden min-w-[800px] bg-[#4086e1]  items-center'> 
        <div className='w-full '>
        <Carousel className='px-6' autoplay>
      <AuthCarousel img={"/images/responsive.svg"} title={"Responsive"} desc={"Tüm Cihaz Boyutlarıyla Uyumluluk"}/>
      <AuthCarousel img={"/images/statistic.svg"} title={"İstatistikler"} desc={"Geniş Tutulan İstatistikler"}/>
      <AuthCarousel img={"/images/customer.svg"} title={"Müşteri Memnuniyeti"} desc={"Deneyim Sonunda Üründen Memnun Müşteriler"}/>
      <AuthCarousel img={"/images/admin.svg"} title={"Yönetici Paneli"} desc={"Tek Yerden Yönetim"}/>
    </Carousel>

        </div>
        
        </div>
        </div>
    </div>
  )
}
