import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../../Components/State/Restaurant/action";

export const CreateCategoryForm = () => {

  const {restaurant} = useSelector(store=>store)
  const dispatch = useDispatch()

    const [formData,setFormData] = useState({categoryName:"",restaurantId:""})

  const handleSubmit = () => {
    const data ={
        name : formData.categoryName,
        restaurantId:{
            id:2

        }
    }

    dispatch(createCategory({reqData:data, token:localStorage.getItem("token")}))
    console.log(data)
  };

  const handleInputChange=(e)=>{
    e.preventDefault();
    const {name,value} =e.target
    setFormData({
        ...formData,[name]:value
    })
  }
  return (
    <div className="">
      <div className="p-5">
        <h1 className="text-gray-400 text-center text-xl pb-10">
          Create Category
        </h1>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="categoryName"
            name="categoryName"
            label="Category Name"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.categoryName}
          ></TextField>

          <Button variant="contained" type="submit" >Create</Button>
        </form>
      </div>
    </div>
  );
};

export default CreateCategoryForm;
