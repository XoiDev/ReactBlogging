import { Button } from "components/button";
import { Radio } from "components/checkbox";
import { Field, FieldCheckboxes } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import DashboardHeading from "drafts/DashboardHeading";
import { db } from "firebase-app/firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import slugify from "slugify";
import { categoryStatus } from "utils/constants";


const CategoryAddNew = () => {
  const {
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting, isValid },
    handleSubmit
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
      createdAt : new Date()
    }
  });

  const handleAddNewCategory = async (values)=>{
    if(!isValid) return;
    const newValues = {...values} 
    newValues.slug = slugify(newValues.name || newValues.slug, {lower: true})
    console.log(values);

    newValues.status = Number(newValues.status)
    const colRef = collection(db , "categories")
    try {
      await addDoc(colRef , {
        ...newValues, 
        createdAt : serverTimestamp()
      });
      toast.success("create new category succesfully!")
    } catch (error) {
      toast.error(error.message)
    }
      finally{
        reset({
          name: "",
          slug: "",
          status: 1,
          createdAt : new Date()
        })
      }
  }

  const watchStatus = watch("status")
  return (
    <div>
      <DashboardHeading
        title="New category"
        desc="Add new category"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddNewCategory)}>
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio value={categoryStatus.APPROVED} checked={Number(watchStatus) === categoryStatus.APPROVED} name="status" control={control} >
                Approved
              </Radio>
              <Radio value={categoryStatus.UNAPPROVED} checked={Number(watchStatus) === categoryStatus.UNAPPROVED} name="status" control={control}>
                Unapproved
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button isLoading={isSubmitting} disabled={isSubmitting} type="submit" kind="primary" className="w-[200px] mx-auto">
          Add new category
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;