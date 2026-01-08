import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardHeader,
  Chip,
  IconButton,
} from "@mui/material";
import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CreateIcon from "@mui/icons-material/Create";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFood,
  findMenuItemsByRestaurantId,
  getMenuItemsByRestaurantId,
} from "../../Components/State/Menu/action";

const orders = [1, 1, 1, 1, 1];
export const MenuTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { restaurant, ingredient, menu } = useSelector((store) => store);

  useEffect(() => {
    dispatch(
      findMenuItemsByRestaurantId({
        restaurantId: restaurant.usersRestaurant.id,
        token: localStorage.getItem("token"),
      })
    );
  }, []);

  const handleDeleteFood=(foodId)=>{
    dispatch(deleteFood({foodId,token:localStorage.getItem("token")}))

  }

  return (
    <Box>
      <Card className="mt-1">
        <CardHeader
          title={"All Menu Items"}
          sx={{ pt: 2, alignItems: "center" }}
          action={
            <IconButton
              onClick={() => navigate("/admin/restaurant/add-menu")}
              aria-label="settings"
            >
              <CreateIcon />
            </IconButton>
          }
        />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Image</TableCell>
                <TableCell align="right">title</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Ingredients</TableCell>
                <TableCell align="right">Avalibility</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menu.menuItems.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">
                    <Avatar src={item.image[0]}> </Avatar>
                  </TableCell>
                  <TableCell align="right">{item.name}</TableCell>
                  <TableCell align="right">${item.price}</TableCell>
                  <TableCell align="right">
                    {item.ingredients.map((ingredient) => (
                      <Chip label={ingredient.name} />
                    ))}
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{
                      color: item.available ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {item.available ? "IN_STOCK" : "OUT_OF_STOCK"}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton  onClick={()=> handleDeleteFood(item.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default MenuTable;
