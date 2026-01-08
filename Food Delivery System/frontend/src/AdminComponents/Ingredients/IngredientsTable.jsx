import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  IconButton,
  Modal,
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
import CreateIngredientForm from "./CreateIngredientForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getIngredientOfRestaurant,
  updateStockOfIngredients,
} from "../../Components/State/Ingredients/action";

const orders = [1, 1, 1, 1, 1];
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "rgba(0, 0, 0, 0.9)",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const IngredientsTable = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const jwt = localStorage.getItem("token");

  const dispatch = useDispatch();
  const { restaurant, ingredient } = useSelector((store) => store);

  useEffect(() => {
    dispatch(
      getIngredientOfRestaurant({
        id: restaurant.usersRestaurant.id,
        token: jwt,
      })
    );
  }, []);

  const handleUpdateStock = (id) => {
    dispatch(updateStockOfIngredients({ token: jwt, id }));
  };
  return (
    <Box>
      <Card className="mt-1">
        <CardHeader
          title={"Ingredients"}
          sx={{ pt: 2, alignItems: "center" }}
          action={
            <IconButton onClick={handleOpen} aria-label="settings">
              <CreateIcon />
            </IconButton>
          }
        />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">name</TableCell>
                <TableCell align="left">category</TableCell>
                <TableCell align="left">Avalibility</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredient.ingredients.map((item) => (
                <TableRow
                  key={item.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{item.id}</TableCell>
                  <TableCell align="left">{item.name}</TableCell>
                  <TableCell align="left">{item.category.name}</TableCell>
                  <TableCell align="left">
                    <Button
                      onClick={() => handleUpdateStock(item.id)}
                      sx={{
                        backgroundColor: item.inStoke ? "green" : "red",
                        color: "white",
                        "&:hover": {
                          backgroundColor: item.inStoke
                            ? "darkgreen"
                            : "darkred",
                        },
                      }}
                    >
                      {item.inStoke ? "in_Stock" : "out_of_stock"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateIngredientForm />
        </Box>
      </Modal>
    </Box>
  );
};

export default IngredientsTable;
