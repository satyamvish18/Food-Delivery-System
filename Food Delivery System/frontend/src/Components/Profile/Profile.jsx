import React, { useState } from "react"
import ProfileNav from "./ProfileNav"
import { Route, Routes } from "react-router-dom"
import UserProfile from "./UserProfile"
import Orders from "./Orders"
import Address from "./Address"
import Favorites from "./Favorites"
import Events from "./Events"
import Notifications from "./Notifications"
import Payments from "./Payments"


export const Profile = () => {

    const [openSidebar,setOpenSidebar] = useState(false)
    return(
        <div className="lg:flex justify-between">
            <div className="sticky h-[80vh] lg:w-[20%]">
                <ProfileNav open={openSidebar}/>

            </div>
            
            <div className="lg:w-[80%]">
                <Routes>
                    <Route path="/" element={<UserProfile/>}/>
                    <Route path="/orders" element={<Orders/>}/>
                    <Route path="/address" element={<Address/>}/>
                    <Route path="/favorites" element={<Favorites/>}/>
                    <Route path="/events" element={<Events/>}/>
                    <Route path="/notifications" element={<Notifications/>}/>
                    <Route path="/payments" element={<Payments/>}/>

                </Routes>

            </div>

        </div>
    )
}

export default Profile