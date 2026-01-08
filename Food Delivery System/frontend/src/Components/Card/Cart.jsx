import React from "react";
import CardItem from "./CardItem.jsx";
import { Button, Divider, Grid, Modal, TextField } from "@mui/material";
import AddressCard from "./AddressCard.jsx";
import { Card } from "@mui/material";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import Box from "@mui/material/Box";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../State/Order/action.js";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "rgba(0, 0, 0, 0.9)", // Siyah ve %90 opak
  color: "white", // Yazı rengini beyaz yapıyoruz
  border: "1px solid rgba(255, 255, 255, 0.1)", // Hafif beyaz bir çerçeve
  outline: "none",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)", // Daha belirgin bir gölge
  p: 4,
  zIndex: 10,
};



const initialValues = {
  street: "",
  country: "",
  postalCode: "",
  city: "",
};

const validationSchema = Yup.object().shape({
  street: Yup.string().required("Street address is required"),
  country: Yup.string().required("Country is required"),
  postalCode: Yup.string().required("Postal Code is required"),
  city: Yup.string().required("City address is required"),
});

const items = [1, 1];

export const Cart = () => {
  const [open, setOpen] = React.useState(false);

  const {card,auth} = useSelector(store=>store);

  const dispatch = useDispatch()

  const handleClose = () => setOpen(false);

  const createOrderUsingSelectedAddress = () => {};

  const handleOpenAddressModel = () => setOpen(true);

  const handleSubmit = (values) => {
    const data = {
      token:localStorage.getItem("token"),
      order:{
        restaurantId:card.cardItems[0].food?.restaurant.id,
        deliveryAddress:{
          fullName:auth.user?.fullName,
          street: values.street,
          city: values.city,
          postalCode: values.postalCode,
          country: values.country
        }
      }
    }
    dispatch(createOrder(data))
    console.log("Form Submitted", values);
  };

  return (
    <>
      <main className="lg:flex justify-between">
        <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
          {card.cardItems.map((item, index) => (
            <CardItem item={item} />
          ))}
          <Divider />

          <div className="billDetails px-5 text-sm">
            <p className="font-extralight py-5">Bill Details</p>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-400">
                <p>Item Total</p>
                <p>${card.card?.total}</p>
              </div>

              <div className="flex justify-between text-gray-400">
                <p>Deliver Fee</p>
                <p>$6</p>
              </div>

              <div className="flex justify-between text-gray-400">
                <p>Platform Fee</p>
                <p>$3</p>
              </div>

              <div className="flex justify-between text-gray-400">
                <p>GST And Restaurant Changes</p>
                <p>$2</p>
              </div>
              <Divider />

              <div className="flex justify-between text-gray-400">
                <p>Total</p>
                <p>${card.card?.total+11}</p>
              </div>
            </div>
          </div>
        </section>
        <Divider orientation="vertical" flexItem />

        <section className="lg:w-[70%] justify-center px-5 pb-10 lg:pb-0">
          <div>
            <h1 className="text-center font-semibold text-2xl py-10">
              {" "}
              Choose Delivery Address
            </h1>

            <div className="flex gap-5 flex-wrap justify-center">
              {[1, 1, 1].map((item, index) => (
                <AddressCard
                  key={index}
                  handleSelectAddress={createOrderUsingSelectedAddress}
                  item={item}
                  showButton={true}
                />
              ))}

              <Card className=" flex gap-5 w-64 p-5">
                <AddLocationAltIcon />

                <div className="space-y-3 text-gray-500">
                  <h1 className="font-semibold text-lg text-white">
                    Add New Address
                  </h1>
                  {
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={handleOpenAddressModel}
                    >
                      Add
                    </Button>
                  }
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="street"
                    label="Street"
                    fullWidth
                    variant="outlined"
                    error={!ErrorMessage("street")}
                    helperText={
                      <ErrorMessage name="street">
                        {(msg) => <span className="text-red-600">{msg}</span>}
                      </ErrorMessage>
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="country"
                    label="Country"
                    fullWidth
                    variant="outlined"
                    error={!ErrorMessage("country")}
                    helperText={
                      <ErrorMessage name="country">
                        {(msg) => <span className="text-red-600">{msg}</span>}
                      </ErrorMessage>
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="postalCode"
                    label="Postal Code"
                    fullWidth
                    variant="outlined"
                    error={!ErrorMessage("postalCode")}
                    helperText={
                      <ErrorMessage name="postalCode">
                        {(msg) => <span className="text-red-600">{msg}</span>}
                      </ErrorMessage>
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="city"
                    label="City"
                    fullWidth
                    variant="outlined"
                    error={!ErrorMessage("city")}
                    helperText={
                      <ErrorMessage name="city">
                        {(msg) => <span className="text-red-600">{msg}</span>}
                      </ErrorMessage>
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    color="primary"
                  >
                    Use This Address
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </>
  );
};

export default Cart;
