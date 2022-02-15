import React, { useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import AdminPage from "./pages/admin";
import Alcohols from "./pages/alcohols";
import Drinks from "./pages/drinks";
import GlobalContext from "./context/globalContext";
import Home from "./pages/home";
import Mixers from "./pages/mixers";
import ResponsiveAppBar from "./components/responsiveNav";
import Signin from "./pages/signin";
import CssBaseline from "@mui/material/CssBaseline";

import api from "./api/api";

function App() {
  const [global, setGlobal] = useLocalStorage("global", {});
  const [alcohols, setAlcohols] = useState([]);
  const [mixers, setMixers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(async () => {
    if (!global || !global.user) {
      navigate("/signin");
    } else {
      const initialAlcohols = await api.getAlcohols();
      const initialMixers = await api.getMixers();
      setMixers(initialMixers);
      setAlcohols(initialAlcohols);
    }
  }, [global]);

  const updateMixer = (index, updatedMixer) => {
    const updated = mixers.map((mixer, i) => {
      return i === index ? updatedMixer : mixer;
    });

    setMixers(updated);
  };

  const updateAlcohol = (index, updatedAlcohol) => {
    const updated = alcohols.map((alcohol, i) => {
      return i === index ? updatedAlcohol : alcohol;
    });

    setAlcohols(updated);
  };

  const deleteAlcohol = (id) => {
    const updated = alcohols.map((alcohol, i) => {
      return i === index ? alcohols.splice(index, 1) : alcohol;
    });
  };

  return (
    <>
      <CssBaseline />
      <GlobalContext.Provider value={{ global, setGlobal }}>
        <ResponsiveAppBar />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                alcohols={alcohols}
                mixers={mixers}
                setLoading={setLoading}
              />
            }
          />
          <Route
            path="/alcohols"
            element={
              <Alcohols
                alcohols={alcohols}
                setAlcohols={setAlcohols}
                updateAlcohol={updateAlcohol}
                setLoading={setLoading}
                deleteAlcohol={deleteAlcohol}
              />
            }
          />
          <Route
            path="/mixers"
            element={
              <Mixers
                mixers={mixers}
                setMixers={setMixers}
                loading={loading}
                updateMixer={updateMixer}
              />
            }
          />
          <Route
            path="/drinks"
            element={
              <Drinks
                alcohols={alcohols}
                setAlcohols={setAlcohols}
                mixers={mixers}
                setMixers={setMixers}
                updateMixer={updateMixer}
                updateAlcohol={updateAlcohol}
              />
            }
          />
          <Route path="/signin" element={<Signin />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </GlobalContext.Provider>
    </>
  );
}

export default App;
