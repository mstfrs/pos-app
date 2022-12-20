import { Modal,Button } from "antd";
import React, { useRef } from "react";
import {useReactToPrint} from "react-to-print"

const PrintBill = ({ setIsModalOpen, isModalOpen,customer }) => {
  const componentRef=useRef()
const handlePrint=useReactToPrint({
  content:()=>componentRef.current,
})

  return (
    <Modal
      title="Fatura Yazdır"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
      width={800}
    >
      <section className="py-20 bg-black" ref={componentRef}>
        <div className="max-w-5xl mx-auto bg-white px-6">
          <article className="overflow-hidden">
            <div className="logo">
              <h2 className="text-4xl text-slate-700 font-bold my-6">LOGO</h2>
            </div>
            <div className="bill-details">
              <div className="grid sm:grid-cols-4 grid-cols-3 gap-12">
                <div className="text-md text-slate-500">
                  <p className="font-bold text-slate-700">Fatura Detayı :</p>
                  <p>{customer?.customerName}</p>
                  <p>Fake Street 123</p>
                  <p>San Javier</p>
                  <p>CA 1234</p>
                </div>
                <div className="text-md text-slate-500">
                  <p className="font-bold text-slate-700">Fatura : </p>
                  <p> The Boring Company</p>
                  <p>Tesla Street 123</p>
                  <p>Frisco</p>
                  <p>CA 0024</p>
                </div>
                <div>
                  <div className="text-md text-slate-500">
                    <p className="font-bold text-slate-700">
                      Fatura Numarası :
                    </p>
                    <p>00{Math.floor(Math.random()*100)}</p>
                  </div>
                  <div className="text-md text-slate-500 mt-2">
                    <p className="font-bold text-slate-700">Veriliş Tarihi :</p>
                    <p>{customer?.createdAt.substring(0,10)}</p>
                  </div>
                </div>
                <div className="text-md text-slate-500 sm:block hidden">
                  <div >
                    <p className="font-bold text-slate-700">Şartlar :</p>
                    <p>10 Gün</p>
                  </div>
                  <div className="text-md text-slate-500 mt-2">
                    <p className="font-bold text-slate-700">Vade :</p>
                    <p>12/12/2023</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bill-table-area mt-8">
              <table className="min-w-full divide-y divide-slate-700 overflow-hidden">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3  text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 hidden sm:table-cell"
                    >
                      Görsel{" "}
                    </th>

                    <th
                      scope="col"
                      className="py-3  text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0  sm:table-cell hidden"
                    >
                      Başlık{" "}
                    </th>
                    <th
                      scope="col"
                      colSpan={4}
                      className="py-3  text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0  sm:hidden"
                    >
                      Başlık{" "}
                    </th>

                    <th
                      scope="col"
                      className="py-3  text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 hidden sm:table-cell"
                    >
                      Fiyat{" "}
                    </th>

                    <th
                      scope="col"
                      className="py-3  text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 hidden sm:table-cell text-center"
                    >
                      Adet{" "}
                    </th>

                    <th
                      scope="col"
                      className="py-3   text-sm font-normal text-slate-700 sm:pl-6 md:pl-0  sm:table-cell text-end"
                    >
                      Toplam{" "}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    customer?.cartItems.map((item)=>(
                     
                      <tr>
                    <td className="py-4 pr-3 sm:table-cell hidden">
                      <img
                        src={item.img}
                        alt=""
                        className="w-12 h-12 object-contain "
                      />
                    </td>
                    <td className="py-4  sm:table-cell hidden">
                        <div className="flex flex-col">
                      <span className="text-slate-700 font-medium ">{item.title}</span>
                      <span className="sm:hidden inline-block text-xs">{item.price}₺</span></div>
                    </td>
                    <td className="py-4  sm:hidden" colSpan={4} >
                        <div className="flex flex-col">
                      <span className="text-slate-700 font-medium ">{item.title}</span>
                      <span className="sm:hidden inline-block text-xs">{item.price}₺</span></div>
                    </td>
                    <td className="py-4  sm:table-cell hidden">
                      <span>{item.price.toFixed(2)} ₺</span>
                    </td>
                    <td className="py-4  text-center sm:table-cell hidden">
                      <span>{item.quantity}</span>
                    </td>
                    <td className="py-4  text-end ">
                      <span>{item.price*item.quantity} ₺</span>
                    </td>
                  </tr>
                    ))
                  }
                </tbody>
                <tfoot>
                  <tr>
                    <th className="text-right pt-4 sm:table-cell hidden" colSpan={4} scope="row">
                      {" "}
                      <span className="font-normal text-slate-700">Ara Toplam</span>{" "}
                    </th>
                    <th className="text-left pt-4 sm:hidden"  colSpan={4} scope="row">
                      {" "}
                      <p className="font-normal text-slate-700">Ara Toplam</p>{" "}
                    </th>
                    <th className="text-right pt-6 font-normal text-slate-700" scope="row">
                      <span>{customer?.subTotal} ₺</span>{" "}
                    </th>
                  </tr>
                  <tr>
                  <th className="text-right pt-4 sm:table-cell hidden" colSpan={4} scope="row">
                      {" "}
                      <span className="font-normal text-slate-700">KDV %8</span>{" "}
                    </th>
                    <th className="text-left pt-4 sm:hidden" colSpan={4} scope="row">
                      {" "}
                      <p className="font-normal text-slate-700" >KDV %8</p>{" "}
                    </th>
                    <th className="text-right pt-4 font-normal text-slate-700" scope="row">
                      <span>{customer?.tax} ₺</span>{" "}
                    </th>
                  </tr>
                  <tr>
                  <th className="text-right pt-4 sm:table-cell hidden" colSpan={4} scope="row">
                      {" "}
                      <span className="font-normal text-slate-700">Genel Toplam</span>{" "}
                    </th>
                    <th className="text-left pt-4 sm:hidden" colSpan={4} scope="row">
                      {" "}
                      <p className="font-normal text-slate-700">Genel Toplam</p>{" "}
                    </th>
                    <th className="text-right pt-4 font-normal text-slate-700" scope="row">
                      <span>{customer?.totalAmount} ₺</span>{" "}
                    </th>
                  </tr>
                </tfoot>
              </table>
              <div className="py-9">
                <div className="border-t pt-9 border-slate-200">
                    <p className="text-sm font-ligth text-slate-700">Sipariş etmiş olduğunuz ürünleri aynı gün kargoya teslim etmeye gayret ediyoruz. Temini zaman alan ürünler için kargo teslim süresi ürün detayında belirtildiği gibi 3 iş günüdür. Gecikmesi muhtemel teslimat durumunda size bilgi verilecektir. </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
      <div className="flex justify-end mt-4">
        <Button type="primary" size="large" onClick={handlePrint}>Yazdır</Button>

      </div>
    </Modal>
  );
};

export default PrintBill;
