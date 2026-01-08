import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
} from "@mui/material";
import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useDispatch, useSelector } from "react-redux";
import { updateRestaurantStatus } from "../../Components/State/Restaurant/action";
export const RestaurantDetails = () => {
  const { restaurant } = useSelector((store) => store);

  const dispatch = useDispatch();
  
  const handleRestaurantStatus = () => {
    dispatch(
      updateRestaurantStatus({
        restaurantId: restaurant.usersRestaurant.id,
        token: localStorage.getItem("token"),
      })
    );
  };
  return (
    <div className="lg:px-20 px-5">
      <div className="py-5 flex justify-center items-center gap-5">
        <h1 className="text-2xl lg:text-7xl text-center font-bold p-5">
          {restaurant.usersRestaurant?.name}
        </h1>

        <div>
          <Button
            color={!restaurant.usersRestaurant?.open ? "primary" : "error"}
            size="large"
            className="py-[1rem] px-[2rem]"
            variant="contained"
            onClick={handleRestaurantStatus}
          >
            {restaurant.usersRestaurant?.open ? "close" : "open"}
          </Button>
        </div>
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={<span className="text-gray-300">Restaurant</span>}
            />
            <CardContent>
              <div className="space-y-4 text-gray-200">
                <div className="flex ">
                  <p className="w-48">Owner</p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.owner.fullName}
                  </p>
                </div>

                <div className="flex ">
                  <p className="w-48">Food Type</p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.foodType}
                  </p>
                </div>

                <div className="flex ">
                  <p className="w-48">Opening Hours</p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.openingHours}
                  </p>
                </div>

                <div className="flex ">
                  <p className="w-48">Status</p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.open ? (
                      <span className="px-5 py-2 rounded-full bg-green-400 text-gray-900">
                        Open
                      </span>
                    ) : (
                      <span className="px-5 py-2 rounded-full bg-red-400 text-gray-900">
                        Closed
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader
              title={<span className="text-gray-300">Address</span>}
            />
            <CardContent>
              <div className="space-y-4 text-gray-200">
                <div className="flex ">
                  <p className="w-48">Country</p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.address.country}
                  </p>
                </div>

                <div className="flex ">
                  <p className="w-48">City</p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.address.city}
                  </p>
                </div>

                <div className="flex ">
                  <p className="w-48">Postal Code</p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.address.postalCode}
                  </p>
                </div>

                <div className="flex ">
                  <p className="w-48">Street</p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.address.street}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Card>
            <CardHeader
              title={<span className="text-gray-300">Contact</span>}
            />
            <CardContent>
              <div className="space-y-4 text-gray-200">
                <div className="flex ">
                  <p className="w-48">Email</p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.contactInformation?.email}
                  </p>
                </div>

                <div className="flex ">
                  <p className="w-48">Mobile</p>
                  <p className="text-gray-400">
                    <span className="pr-5">-</span>
                    {restaurant.usersRestaurant?.contactInformation?.phone}
                  </p>
                </div>

                <div className="flex ">
                  <p className="w-48">Social</p>
                  <p className="text-gray-400">
                    <div className="flex text-gray-400 items-center pb-3 gap-2">
                      <span className="pr-5">-</span>
                      <a
                        href={
                          restaurant.usersRestaurant.contactInformation
                            ?.instagram
                        }
                      >
                        <InstagramIcon sx={{ fontSize: "3rem" }} />
                      </a>
                      <a
                        href={
                          restaurant.usersRestaurant.contactInformation?.twitter
                        }
                      >
                        <XIcon sx={{ fontSize: "3rem" }} />
                      </a>

                      <a href="/">
                        <LinkedInIcon sx={{ fontSize: "3rem" }} />
                      </a>
                    </div>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default RestaurantDetails;
