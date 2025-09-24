import './App.css'
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Welcome from "./components/Welcome.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import {useEffect, useState} from "react";
import NotFound from "./components/NotFound.tsx";
import axios from "axios";
import CbCR from "./components/CbCR.tsx";
import {DefaultUser, type UserModel} from "./components/models/UserModel.ts";
import Profile from "./components/Profile.tsx";

export default function App() {
    const [user, setUser] = useState<string>("anonymousUser");
    const [userDetails, setUserDetails] = useState<UserModel | null>(DefaultUser);

    function getUser() {
        axios.get("/api/users/me")
            .then((response) => {
                setUser(response.data.toString());
            })
            .catch((error) => {
                console.error(error);
                setUser("anonymousUser");
            });
    }

    function getUserDetails() {
        axios.get("/api/users/me/details")
            .then((response) => {
                setUserDetails(response.data as UserModel);
            })
            .catch((error) => {
                console.error(error);
                setUserDetails(null);
            });
    }

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if(user !== "anonymousUser"){
            getUserDetails();
        }
    }, [user]);

  return (
    <>
      <Navbar user={user} getUser={getUser}/>
      <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Welcome />}/>
              <Route element={<ProtectedRoute user={user}/>}>
                  <Route path="/cbcr" element={<CbCR />} />
                  <Route path="/profile" element={<Profile user={user} userDetails={userDetails} />} />
              </Route>
      </Routes>
    </>
  )
}

