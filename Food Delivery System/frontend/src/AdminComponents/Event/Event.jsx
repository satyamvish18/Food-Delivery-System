import { Box, Button, Grid, Modal, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../../Components/State/Restaurant/action";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
    image: "",
    location: "",
    name: "",
    startedAt: dayjs(),
    endsAt: dayjs().add(1, 'hour')
}

export const Event = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch()
  const {restaurant} = useSelector(store=>store)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formData, setFormData] = React.useState(initialValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(createEvent({data:formData, restaurantId:restaurant.usersRestaurant?.id, token:localStorage.getItem("token")}))
    setFormData(initialValues)
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date, dateType) => {
      const formattedDate = dayjs(date).format("MMMM DD, YYYY hh:mm A"); // Formatlama
      setFormData({ ...formData, [dateType]: formattedDate });
    
  };

  return (
    <div className="p-5">
      <Button onClick={handleOpen} variant="contained">
        Create New Event
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name="image"
                  label="Image"
                  variant="outlined"
                  fullWidth
                  value={formData.image}
                  onChange={handleFormChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="location"
                  label="Location"
                  variant="outlined"
                  fullWidth
                  value={formData.location}
                  onChange={handleFormChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={formData.name}
                  onChange={handleFormChange}
                />
              </Grid>

              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Start Date and Time"
                    value={formData.startedAt}
                    onChange={(newData) => handleDateChange(newData, "startedAt")}
                    inputFormat="MM/DD/YYYY hh:mm A"
                    sx={{ width: "100%" }}                    
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="End Date and Time"
                    value={formData.endsAt}
                    onChange={(newData) => handleDateChange(newData, "endsAt")}
                    inputFormat="MM/DD/YYYY hh:mm A"
                    sx={{ width: "100%" }}                    
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Event;
