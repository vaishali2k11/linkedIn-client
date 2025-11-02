import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import "./App.css";

import { LandingPage } from "./pages/LandingPage/LandingPage";
import { Feeds } from "./pages/Feeds/Feeds";
import { Resume } from "./pages/Resume/Resume";
import { Messages } from "./pages/Messages/Messages";
import { Profile } from "./pages/Profile/Profile";
import { MyNetwork } from "./pages/MyNetwork/MyNetwork";
import SignUp from "./pages/SingUp/SingUp";
import { SignIn } from "./pages/SignIn/SignIn";
import { AllActivities } from "./pages/AllActivities/AllActivities";
import { SingleActivity } from "./pages/SingleActivity/SingleActivity";
import { Notifications } from "./pages/Notifications/Notifications";

import { Navbar1 } from "./components/NavbarV1/Navbar1";
import { Navbar2 } from "./components/NavbarV2/Navbar2";
import { Footer } from "./components/Footer/Footer";

function App() {
  const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin"));

  const handleChangeLoginValue = (value) => {
    setIsLogin(value);
  }

  return (
    <>
      <div className="bg-gray-100 w-full box-border">
        {isLogin ? <Navbar2 /> : <Navbar1 />}
        <Routes>
          <Route path="/" element={isLogin ? <Navigate to={'/feeds'} /> : <LandingPage handleChangeLoginValue={handleChangeLoginValue} />} />
          <Route path="/signUp" element={isLogin ? <Navigate to={'/feeds'} /> : <SignUp handleChangeLoginValue={handleChangeLoginValue} />} />
          <Route path="/signIn" element={isLogin ? <Navigate to={'/feeds'} /> : <SignIn handleChangeLoginValue={handleChangeLoginValue} />} />
          <Route path="/feeds" element={<Feeds />} />
          <Route path="/my-network" element={<MyNetwork />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/notification" element={<Notifications />} />

          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/profile/:id/activities" element={<AllActivities />} />
          <Route
            path="/profile/:id/activities/:postId"
            element={<SingleActivity />}
          />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
