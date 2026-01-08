import {CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "./Theme/DarkTheme";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "./Components/State/Auth/Action";
import { findCard } from "./Components/State/Card/action";
import {Routers} from "./Routes/Routers"
import { getRestaurantByUserId } from "./Components/State/Restaurant/action";


function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("token");
  const {auth} = useSelector(store=>store);

  useEffect(()=> {
    dispatch(getUserProfile(auth.token || jwt));
    dispatch(findCard(jwt))
  },[auth.token])

  useEffect(()=>{
    dispatch(getRestaurantByUserId(auth.token || jwt));
    
  },[auth.user])
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        {/*<Navbar />*/}
        {/*<Home/>*/}
        {/*<RestaurantDetails/>*/}
        {/*<Cart/>*/}
        {/*<Profile/>*/}
        {/*<Auth/>*/}
        <Routers/>
      </ThemeProvider>
    </div>
  );
}

export default App;
