import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import {  useState } from "react";
import { Add } from "./Add";
import ProductItem from "./ProductItem";
import {useNavigate} from "react-router-dom"


const Products = ({categories,filtered,products,setProducts,search}) => {
 
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate=useNavigate()


  return (
    <div className="products-wrapper grid grid-cols-card gap-4">
      {filtered
      .filter((product)=>product.title.toLowerCase().includes(search))
      .map((item) => (
        <ProductItem item={item} key={item._id} />
      ))}
      <div className="product-item border hover:shadow-lg cursor-pointer transition-all select-none hover:opacity-90 flex bg-purple-800 justify-center items-center min-h-[180px]">
      <PlusOutlined className="text-white md:text-2xl" onClick={()=>setIsAddModalOpen(true)}/>
      
    </div>
      <div className="product-item border hover:shadow-lg cursor-pointer transition-all select-none hover:opacity-90 flex bg-orange-800 justify-center items-center min-h-[180px]" onClick={()=>navigate("/products")}>
       <EditOutlined className="text-white md:text-2xl" />
      
    </div>
    <Add  categories={categories} isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen}
    setProducts={setProducts}
    products={products}/>
    </div>
  );
};

export default Products;
