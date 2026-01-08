import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import { createIngredientCategory } from "../../Components/State/Ingredients/action";
import { useDispatch, useSelector } from "react-redux";
export const CreateIngredientCategoryForm = () => {

  
  const [formData, setFormData] = useState({
    name: "",
  });

  const dispatch = useDispatch()
  const jwt = localStorage.getItem("token")
  const {restaurant} = useSelector(store=>store);

const handleSubmit = (e) => {
  e.preventDefault()
  const data ={name:formData.name, restaurantId:restaurant.usersRestaurant.id}
  dispatch(createIngredientCategory({ data, token: jwt }));
  console.log(formData);
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <div className="">
      <div className="p-5">
        <h1 className="text-gray-400 text-center text-xl pb-10">
          Create Ingredient Category
        </h1>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.name}
          ></TextField>

          <Button variant="contained" type="submit">
            Create
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateIngredientCategoryForm;
