import "./style.css";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Add } from "./Add";
import { Edit } from "./Edit";


const Categories = ({ categories,setCategories,setFiltered,products }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("Tümü")
  

  const showModal = () => {
    setIsAddModalOpen(true);
  };
  useEffect(() => {
    if (categoryTitle==="Tümü") {
      setFiltered(products)
    }else{
      setFiltered(products.filter((item)=>item.category===categoryTitle))
    }
   
    
  }, [products,setFiltered,categoryTitle])
  

  

  return (
    <ul className="flex md:flex-col flex-row gap-6 text-lg">
      {categories.map((item) => (
        <li className={`card-item ${item.title===categoryTitle && "!bg-pink-700"}`} key={item._id} onClick={()=>setCategoryTitle(item.title)}>
          <span>{item.title}</span>
        </li>
      ))}

      <li
        className="card-item !bg-purple-800 hover:opacity-90"
        onClick={showModal}
      >
        <PlusOutlined className="md:text-2xlg" />
      </li>
      <li
        className="card-item !bg-orange-800 hover:opacity-90"
        onClick={()=>setIsEditModalOpen(true) }
      >
        <EditOutlined className="md:text-2xlg" />
      </li>
      <Add categories={categories} setCategories={setCategories} isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen}/>
      <Edit categories={categories} setCategories={setCategories} isEditModalOpen={isEditModalOpen} setIsEditModalOpen={setIsEditModalOpen} />
    </ul>
  );
};

export default Categories;
