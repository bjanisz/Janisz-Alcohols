import React, { useEffect } from "react";
import { Header, MainContainer, CreateContainer, Footer } from "./components";

import { Route, Routes } from "react-router-dom";

import { AnimatePresence } from "framer-motion";
import { useStateValue } from "./context/StateProvider";
import { getAllWhiskyItems } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";

const App = () => {
  const [{ whiskyItems }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllWhiskyItems().then((data) => {
      dispatch({
        type: actionType.SET_WHISKY_ITEMS,
        whiskyItems: data,
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />

        <main className="mt-16 md:mt-24 sm:mt-20 md:px16 py-4 w-full">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AnimatePresence>
  );
};

export default App;
