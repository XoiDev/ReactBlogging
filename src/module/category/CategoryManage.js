import { ActionDelete, ActionEdit, ActionView } from "components/action";
import { LabelStatus } from "components/label";
import { Table } from "components/table";
import { db } from "firebase-app/firebase-config";
import { collection, deleteDoc, doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { categoryStatus } from "utils/constants";
import Swal from 'sweetalert2'
import { Button } from "components/button";
import DashboardHeading from "module/dashboard/DashboardHeading";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

const CategoryManage = () => {
    const navigate = useNavigate()
    const [categoryList, setCategoryList] = useState([]);
    const [filter, setFilter] = useState("")
    const inputRef = useRef(null)
    useEffect(()=>{
        const colRef = collection(db, "categories") 
        const newRef = filter
      ? query(
          colRef,
          where("name", ">=", filter),
          where("name", "<=", filter + "utf8")
        )
      : colRef;
        onSnapshot(newRef, snapshot =>{
            let result = []
            snapshot.forEach((doc)=>{
                result.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setCategoryList(result)
        })
    },[filter])
    // console.log(categoryList);
    const handleDeleteCategory =  async (docId)=>{
        console.log(docId);
        const singleDoc = doc(db, "categories" , docId)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then( async (result) => {
            if (result.isConfirmed) {
                await deleteDoc(singleDoc)
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
        
    }
    const handleInputFilter = debounce((e) => {
        setFilter(e.target.value);
      }, 500);
  return (
    <div>
      <DashboardHeading
        title="Categories"
        desc="Manage your category"
      >
         <Button kind="ghost" height="60px" to="/manage/add-category">
          Create category
        </Button>
      </DashboardHeading>
      <div className="flex justify-end mb-10">
        <input
          type="text"
          placeholder="Search category..."
          className="px-5 py-4 border border-gray-300 rounded-lg outline-none"
          onChange={handleInputFilter}
        />
      </div>
      <Table>
        <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {categoryList.length > 0 && categoryList.map((category)=>(
                    <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td><span className="italic text-gray-400">{category.slug}</span></td>
                    <td>
                    {category.status === categoryStatus.APPROVED && (<LabelStatus type="success">Approved</LabelStatus>) }
                    {category.status === categoryStatus.UNAPPROVED && (<LabelStatus type="warning">Unapproved</LabelStatus>)}
                    </td>
                    <td>
                        <div className="flex items-center gap-x-5">
                            <ActionView></ActionView>
                            <ActionEdit onClick={()=> navigate(`/manage/update-category?id=${category.id}`)}></ActionEdit>
                            <ActionDelete onClick={()=> {handleDeleteCategory(category.id)}}></ActionDelete>
                        </div>
                    </td>
                </tr>
            ))}
                
        </tbody>
      </Table>
    </div>
  );
};

export default CategoryManage;