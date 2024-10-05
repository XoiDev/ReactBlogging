// import { Button } from "components/button";
// import { Radio } from "components/checkbox";
// import { Dropdown } from "components/dropdown";
// import { Field } from "components/field";
// import ImageUpload from "components/image/ImageUpload";
// import { Input } from "components/input";
// import { Label } from "components/label";
// import Toggle from "components/toggle/Toggle";
// import { db } from "firebase-app/firebase-config";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import useFirebaseImage from "hooks/useFirebaseImage";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import slugify from "slugify";
// import styled from "styled-components";
// import { postStatus } from "utils/constants";
// const PostAddNewStyles = styled.div``;
// const PostAddNew = () => {
//   const { control, watch, setValue, handleSubmit, getValues } = useForm({
//     mode: "onChange",
//     defaultValues: {
//       status: 2,
//       category: "",
//       title: "",
//       slug: "",
//       hot: false,
//     },
//   });

//   const watchStatus = watch("status");
//   const watchCategory = watch("category");
//   const watchHot = watch("hot")
//   const addPosthandler = async (values) => {
//     const cloneValues = { ...values }
//     cloneValues.slug = slugify(values.slug || values.title)
//     cloneValues.status = Number(values.status)
//     console.log(cloneValues);


//   }
//   const { image, progress, handleSelectImage, handleDeleteImage } = useFirebaseImage(setValue, getValues)
//   const [categories, setCategories] = useState([])
//   useEffect(() => {
//     async function getData() {
//       const colRef = collection(db, "categories")
//       const q = query(colRef, where("status", "===" ,1))
//       const querySnapshot = await getDocs(q);
//       let result = []
//       querySnapshot.forEach((doc) => {
//         result.push({
//           id: doc.id, 
//           ...doc.data
//         })
//       });
//       setCategories(result)
//     }
//     getData()
//   }, [])
//   return (
//     <PostAddNewStyles>
//       <h1 className="dashboard-heading">Add new post</h1>
//       <form onSubmit={handleSubmit(addPosthandler)}>
//         <div className="grid grid-cols-2 mb-10 gap-x-10">
//           <Field>
//             <Label>Title</Label>
//             <Input
//               control={control}
//               placeholder="Enter your title"
//               name="title"
//               required
//             ></Input>
//           </Field>
//           <Field>
//             <Label>Slug</Label>
//             <Input
//               control={control}
//               placeholder="Enter your slug"
//               name="slug"
//             ></Input>
//           </Field>
//         </div>
//         <div className="grid grid-cols-2 mb-10 gap-x-10">
//           <Field>
//             <Label>Image</Label>
//             <ImageUpload handleDeleteImage={handleDeleteImage} onChange={handleSelectImage} progress={progress} image={image}></ImageUpload>
//           </Field>
//           <Field>
//             <Label>Category</Label>
//             <Dropdown>
//             <Dropdown.List>
//               {categories.length > 0 && categories.map((item)=>(
//                   <Dropdown.Option onClick={()=>{ setValue("categoryId", item.id)}} key={item.id}>{item.name}</Dropdown.Option>
//                 ))}
//               </Dropdown.List>
//             </Dropdown>
//           </Field>
//         </div>
//         <div className="grid grid-cols-2 mb-10 gap-x-10">
//           <Field>
//             <Label>Feature Post</Label>
//             <Toggle on={watchHot === true} onClick={() => { setValue("hot", !watchHot) }}></Toggle>
//           </Field>
//           <Field>
//             <Label>Status</Label>
//             <div className="flex items-center gap-x-5">
//               <Radio name="status" control={control} checked={Number(watchStatus) === postStatus.APPROVED} value={postStatus.APPROVED}>Approved</Radio>
//               <Radio name="status" control={control} checked={Number(watchStatus) === postStatus.PENDING} value={postStatus.PENDING}>Pending</Radio>
//               <Radio name="status" control={control} checked={Number(watchStatus) === postStatus.REJECTED} value={postStatus.REJECTED}>Approved</Radio>
//             </div>
//           </Field>
//           <Field></Field>
//         </div>
//         <Button type="submit" className="mx-auto">
//           Add new post
//         </Button>
//       </form>
//     </PostAddNewStyles>
//   );
// };
// export default PostAddNew;




import useFirebaseImage from "hooks/useFirebaseImage";
import Toggle from "components/toggle/Toggle";
import slugify from "slugify";
import React, { useEffect, useState } from "react";
import ImageUpload from "components/image/ImageUpload";
import { useForm } from "react-hook-form";
import { useAuth } from "contexts/auth-context";
import { toast } from "react-toastify";
import { Radio } from "components/checkbox";
import { postStatus } from "utils/constants";
import { Label } from "components/label";
import { Input } from "components/input";
import { Field } from "components/field";
import { Dropdown } from "components/dropdown";
import { db } from "firebase-app/firebase-config";
import { Button } from "components/button";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

const PostAddNew = () => {
  const { userInfo } = useAuth();
  const { control, watch, setValue, handleSubmit, getValues, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      categoryId: "",
      hot: false,
      image: "",
    },
  });
  const watchStatus = watch("status");
  const watchHot = watch("hot");
  const {
    image,
    handleResetUpload,
    progress,
    handleSelectImage,
    handleDeleteImage,
  } = useFirebaseImage(setValue, getValues);
  const [categories, setCategories] = useState([]);
  // const [selectCategory, setSelectCategory] = useState("");
  // const [loading, setLoading] = useState(false);
  const addPostHandler = async (values) => {
    // setLoading(true);
    try {
      const cloneValues = { ...values };
      cloneValues.slug = slugify(values.slug || values.title, { lower: true });
      cloneValues.status = Number(values.status);
      const colRef = collection(db, "posts");
      await addDoc(colRef, {
        ...cloneValues,
        image,
        userId: userInfo.uid,
    
      });
      toast.success("Create new post successfully!");
      reset({
        title: "",
        slug: "",
        status: 2,
        categoryId: "",
        hot: false,
        image: "",
      });
      handleResetUpload();
  
    } catch (error) {
      // setLoading(false);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(result);
    }
    getData();
  }, []);

  useEffect(() => {
    document.title = "Monkey Blogging - Add new post";
  }, []);

  const handleClickOption = (item) => {
    setValue("categoryId", item.id);
  
  };

  return (
    <>
      <h1 className="dashboard-heading">Add new post</h1>
      <form onSubmit={handleSubmit(addPostHandler)}>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              onChange={handleSelectImage}
              handleDeleteImage={handleDeleteImage}
              className="h-[250px]"
              progress={progress}
              image={image}
            ></ImageUpload>
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select placeholder="Select the category"></Dropdown.Select>
              <Dropdown.List>
                {categories.length > 0 &&
                  categories.map((item) => (
                    <Dropdown.Option
                      key={item.id}
                      onClick={() => handleClickOption(item)}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
          </Field>
        </div>
        <div className="grid grid-cols-2 mb-10 gap-x-10">
          <Field>
            <Label>Feature post</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            ></Toggle>
          </Field>
          <Field>
            <Label>Status</Label>
            <div className="flex items-center gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.APPROVED}
                value={postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.PENDING}
                value={postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.REJECTED}
                value={postStatus.REJECTED}
              >
                Reject
              </Radio>
            </div>
          </Field>
        </div>
        <Button
          type="submit"
          className="mx-auto w-[250px]"
        >
          Add new post
        </Button>
      </form>
    </>
  );
};

export default PostAddNew;