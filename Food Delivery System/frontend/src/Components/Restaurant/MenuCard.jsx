import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { categorizeIngredients } from "../Config/catogorizeIngredients";
import { useDispatch } from "react-redux";
import { addItemToCard } from "../State/Card/action";

/*const test = [
  {
    category: "Vegetable",
    ingredients: ["Tomato", "Onion", "Lettuce"],
  },
  {
    category: "Protein",
    ingredients: ["Bacon", "Extra Beef"],
  },
  {
    category: "Condiment",
    ingredients: ["Ketchup", "BBQ", "Ranch"],
  },
];*/

export const MenuCard = ({ item }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const dispatch = useDispatch()

  const handleCheckboxChange = (itemName) => {
    console.log("itemName",itemName)
    if (selectedIngredients.includes(itemName)) {
      setSelectedIngredients(
        selectedIngredients.filter((item) => item !== itemName)
      );
    } else {
      setSelectedIngredients([...selectedIngredients, itemName]);
    }
  };

  const handleAddItemToCard = (e) => {
    e.preventDefault()
    const reqData = {
      token: localStorage.getItem("token"),
      cardItem: {
        foodId: item.id,
        quantity: 1,
        ingredients: selectedIngredients,
      },
    };

    dispatch(addItemToCard(reqData))

    console.log("reqData", reqData);
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className="lg:flex items-center justify-between">
            <div className="lg:flex items-center lg:gap-5">
              <img
                className="w-[7rem] h-[7rem] object-cover"
                src={item.image[0]}
                alt=""
              />

              <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
                <p className="font-semibold text-xl">{item.name}</p>
                <p>${item.price}</p>
                <p className="text-gray-400">{item.description}</p>
              </div>
            </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleAddItemToCard}>
            <div className="flex gap-5 flex-wrap">
              {Object.keys(categorizeIngredients(item.ingredients)).map(
                (category) => (
                  <div>
                    <p>{category}</p>
                    <FormGroup>
                      {categorizeIngredients(item.ingredients)[category].map(
                        (item) => (
                          <FormControlLabel
                            key={item.id}
                            control={
                              <Checkbox
                                onChange={() => handleCheckboxChange(item.name)}
                              />
                            }
                            label={item.name}
                          />
                        )
                      )}
                    </FormGroup>
                  </div>
                )
              )}
            </div>

            <div className="pt-5">
              <Button
                variant="contained"
                disabled={false}
                type="submit"
              >
                {true ? "Add to Card" : "Out of Stock"}
              </Button>
            </div>
          </form>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default MenuCard;
