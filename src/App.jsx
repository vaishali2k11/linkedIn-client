import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

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
  const [count, setCount] = useState(0);

  const isLogin = true;

  return (
    <>
      <div className="bg-gray-100 w-full box-border">
        {isLogin ? <Navbar2 /> : <Navbar1 />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
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
