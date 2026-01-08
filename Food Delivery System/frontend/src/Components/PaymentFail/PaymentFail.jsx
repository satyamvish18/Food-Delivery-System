import React from "react"
import ErrorIcon from '@mui/icons-material/Error';
import { green, red } from "@mui/material/colors";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const PaymentFail = () => {
    const navigate = useNavigate()
    return(
        <div className="min-h-screen px-5">
            <div className="flex flex-col items-center justify-center h-[90vh]">
                <div className="box w-full lg:w-1/4 flex flex-col items-center rounded-md">

                <ErrorIcon sx={{fontSize:"5rem", color:red[500]}}/>
                <h1 className="py-5 text-2xl font-semibold">Payment Error</h1>
                <p className="text-center text-red-500">Ooppss, Something went wrong!!</p>
                <p className="py-2 text-center text-gray-400 text-lg">Try again</p>
                <Button onClick={()=>navigate("/")} variant="contained" className="py-5" sx={{margin:"1rem 0rem"}}>
                    Go To Home
                </Button>

                </div>

            </div>
            
        </div>
    )
}

export default PaymentFail