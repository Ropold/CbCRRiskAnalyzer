import './App.css'
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Welcome from "./components/Welcome.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import {useEffect, useState} from "react";
import NotFound from "./components/NotFound.tsx";
import axios from "axios";
import CbCR from "./components/CbCR.tsx";

export default function App() {
    const [user, setUser] = useState<string>("anonymousUser");

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

    useEffect(() => {
        getUser();
    }, []);

  return (
    <>
      <Navbar user={user} getUser={getUser}/>
      <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Welcome />}/>
              <Route element={<ProtectedRoute user={user}/>}>
                  <Route path="/cbcr" element={<CbCR />} />
              </Route>
      </Routes>
    </>
  )
}

