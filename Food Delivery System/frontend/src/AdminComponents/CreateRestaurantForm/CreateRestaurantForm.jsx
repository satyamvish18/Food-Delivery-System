import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CloseIcon from "@mui/icons-material/Close";
import { uploadImageToCloudinary } from "../Util/UploadToCloudinary";
import { useDispatch } from "react-redux";
import { createRestaurant } from "../../Components/State/Restaurant/action";

const initialValues = {
  name: "",
  description: "",
  foodType: "",
  street: "",
  city: "",
  country: "",
  postalCode: "",
  email: "",
  phone: "",
  twitter: "",
  instagram: "",
  openingHours: "Mon - Sun: 9:00 AM - 9:00 PM",
  images: [],
};
export const CreateRestaurantForm = () => {
  const [uploadImage, setUploadImage] = useState(false);

  const dispatch = useDispatch()
  const jwt = localStorage.getItem("token")

 /* const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setUploadImage(true);
    const image =await uploadImageToCloudinary(file);
    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadImage(false)
  };*/

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return; // Eğer dosya seçilmezse çık
    e.target.value = ""; // Input'u sıfırla
  
    setUploadImage(true); // Yükleme işlemini başlat
  
    try {
      const image = await uploadImageToCloudinary(file);
      
      // Resim başarıyla yüklendikten sonra formik içindeki images alanını güncelle
      formik.setFieldValue("images", [...formik.values.images, image]);
    } catch (error) {
      console.error("Resim yükleme hatası:", error);
    }
  
    setUploadImage(false); // Yükleme işlemi tamamlandı
  };
  

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const data = {
        name: values.name,
        description: values.description,
        foodType: values.foodType,
        address: {
          street: values.street,
          city: values.city,
          country: values.country,
          postalCode: values.postalCode,
        },

        contactInformation: {
          email: values.email,
          phone: values.phone,
          twitter: values.twitter,
          instagram: values.instagram,
        },
        openingHours: values.openingHours,
        images: values.images,
      };
      console.log("data:  ", data);

      dispatch(createRestaurant({data, token:jwt}))
    },
  });

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1); // splice ile elemanı diziden kaldır
    formik.setFieldValue("images", updatedImages); // formik'e güncellenmiş diziyi set et
  };
  
  return (
    <div className="py-10 px-5 lg:flex items-center justify-center min-h-screen">
      <div className="lg:max-w-4xl">
        <h1 className="font-bold text-2xl py-2">Add New Restaurant</h1>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <Grid container spacing={2}>
            <Grid className="flex flex-wrap gap-5" item xs={12}>
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />

              <label className="relative" htmlFor="fileInput">
                <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-400">
                  <AddPhotoAlternateIcon className="text-white" />
                </span>

                {uploadImage && (
                  <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center ">
                    <CircularProgress />
                  </div>
                )}
              </label>

              <div className="flex flex-wrap gap-2">
                {formik.values.images.map((image, index) => (
                  <div className="relative">
                    <img
                      className="w-24 h-24 object-cover"
                      key={index}
                      src={image}
                      alt=""
                    />
                    <IconButton
                      onClick={() => handleRemoveImage(index)}
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        outline: "none",
                      }}
                    >
                      <CloseIcon sx={{ fontSize: "1rem" }} />
                    </IconButton>
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.name}
              ></TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.description}
              ></TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                id="foodType"
                name="foodType"
                label="Food Type"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.foodType}
              ></TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                id="openingHours"
                name="openingHours"
                label="Opening Hours"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.openingHours}
              ></TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="street"
                name="street"
                label="Street"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.street}
              ></TextField>
            </Grid>

            <Grid item xs={4}>
              <TextField
                fullWidth
                id="city"
                name="city"
                label="City"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.city}
              ></TextField>
            </Grid>

            <Grid item xs={4}>
              <TextField
                fullWidth
                id="country"
                name="country"
                label="Country"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.country}
              ></TextField>
            </Grid>

            <Grid item xs={4}>
              <TextField
                fullWidth
                id="postalCode"
                name="postalCode"
                label="Postal Code"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.postalCode}
              ></TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.email}
              ></TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                id="phone"
                name="phone"
                label="Phone"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.phone}
              ></TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                id="instagram"
                name="instagram"
                label="Instagram"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.instagram}
              ></TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                id="twitter"
                name="twitter"
                label="Twitter"
                variant="outlined"
                onChange={formik.handleChange}
                value={formik.values.twitter}
              ></TextField>
            </Grid>
          </Grid>

          <Button variant="contained" color="primary" type="submit">
            Create Restaurant
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateRestaurantForm;
