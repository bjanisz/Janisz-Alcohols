import React, { useEffect, useState } from "react";
import { MainContainer, CreateContainer } from "./components";
import { ShoppingBagContext } from './context/ShoppingBagContext';
import { Route, Routes } from "react-router-dom";

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Dashboard } from "./pages/Dashboard/Dashboard";

import { AnimatePresence } from "framer-motion";
import { useStateValue } from "./context/StateProvider";
import { getAllWhiskyItems } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";

const App = () => {
  const [products, setProducts] = useState();

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <ShoppingBagContext.Provider value={{test: 'abc'}}>
        <Header />
     

 
        <main className="mt-16 md:mt-24 sm:mt-20 md:px16 py-4 w-full">
          <Routes>
            <Route path="/*" element={<Dashboard />} />
            {/* <Route path="/createItem" element={<CreateContainer />} /> */}
          </Routes>
        </main>
            <Footer />
            </ShoppingBagContext.Provider>
      </div>
    </AnimatePresence>
  );
};

export default App;