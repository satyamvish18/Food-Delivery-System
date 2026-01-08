import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export const EventCard = () => {
  return (
    <div>
      <Card sx={{ width: 345 }}>
        {" "}
        {/* Kartın genişliğini ayarla ve ortala */}
        <CardMedia
          component="img" /* Görselin tam görünmesi için */
          sx={{ height: 345 }} /* Yüksekliği orantılı ayarla */
          image="https://cdn.pixabay.com/photo/2017/03/30/15/47/churros-2188871_1280.jpg"
          alt="Fast Food"
        />
        <CardContent>
          <Typography variant="h5" component="div">
            Fast Food
          </Typography>

          <Typography variant="body2" component="div">
            50% off on your first order
          </Typography>

          <Typography>
            <div className="py-2 space-y-2">
              <p>{"Turkey"}</p>
              <p className="text-sm text-green-600">January</p>
              <p className="text-sm text-red-500">January 18, 2024 12:00 AM</p>
            </div>
          </Typography>
        </CardContent>
        {false && (
          <CardActions>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        )}
      </Card>
    </div>
  );
};

export default EventCard;
