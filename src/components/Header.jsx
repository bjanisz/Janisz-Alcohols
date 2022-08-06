import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { MdShoppingBag, MdAddCircle } from "react-icons/md";
import { GrLogout } from "react-icons/gr";
import { motion } from "framer-motion";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";

import Logo from "../img/logo.jpg";
import Avatar from "../img/avatar.jpg";
import { ShoppingBagContext } from '../context/ShoppingBagContext'
export const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [currentUser, setCurrentUser] = useState();
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
  const [numberOfProductsInShoppingBag] = useState(JSON.parse(localStorage.getItem("shoppingBagProducts")));

  // const test = JSON.parse(localStorage.getItem("shoppingBagProducts"))

  const testrtet = useContext(ShoppingBagContext);
  console.log('tetetetete', testrtet)


  const login = async () => {
    if (!currentUser) {
      const {
        user: { providerData },
      } = await signInWithPopup(firebaseAuth, provider);

      localStorage.setItem("user", JSON.stringify(providerData[0]));

      setCurrentUser(providerData[0]);
      setIsUserMenuVisible(true);
    }
  };

  const logout = () => {
    localStorage.clear();

    setIsUserMenuVisible(false);
    setCurrentUser(null);
  };

  useEffect(() => {
    console.log('testrtet', testrtet)
  }, [testrtet])

  return (
    <header className="fixed z-50 w-screen bg-slate-700 p-3 px-4 md:p-6 md:px-16 border-b-solid border-b-2 border-b-yellow-600">
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} alt="logo" className="w-24 object-cover rounded-md" />
          <p className="text-yellow-600 text-xl font-bold text-justify align-middle">
            Janisz Alcohols
          </p>
        </Link>

        <div className="flex items-center gap-10">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8"
          >
            <li className="text-base cursor-pointer text-yellow-600 hover:text-white duration-100 transition-all ease-in-out">
              Home
            </li>
            <li className="text-base cursor-pointer text-yellow-600 hover:text-white duration-100 transition-all ease-in-out">
              Menu
            </li>
            <li className="text-base cursor-pointer text-yellow-600 hover:text-white duration-100 transition-all ease-in-out">
              Contact
            </li>
          </motion.ul>

          <div
            className="relative flex items-center justify-center"
            onClick={() => console.log("open shopping bag")}
          >
            <MdShoppingBag
              className="text-yellow-600 text-2xl cursor-pointer"
              alt="bag"
            />
            {numberOfProductsInShoppingBag && (
              <div className="absolute -top-5 -right-2 w-6 h-6 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="textxs text-white font-semibold">
                  {numberOfProductsInShoppingBag.length}
                </p>
              </div>
            )}
          </div>

          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={currentUser ? currentUser.photoURL : Avatar}
              alt="userProfile"
              className="w-12 min-w-[48px] h-12 min-h-[48px] drop-shadow-2xl rounded-xl cursor-pointer"
              onClick={login}
            />
            {isUserMenuVisible && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 1, scale: 1 }}
                className="w-60 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-14 right-0 px-4 py-2"
              >
                {currentUser && (
                  <Link to={"/createItem"}>
                    <p className="m-2 p-2 flex justify-between items-center gap-3 cursor-pointer hover:bg-slate-200 transiton-all duration-100 ease-in-out text-textColor text-base">
                      Add new Item <MdAddCircle alt="addCircle" />
                    </p>
                  </Link>
                )}
                <p
                  className="m-2 p-2 rounded-md flex justify-between items-center gap-3 cursor-pointer hover:bg-slate-200 transiton-all duration-100 ease-in-out text-textColor text-base bg-slate-300"
                  onClick={logout}
                >
                  Logout <GrLogout alt="logout" />{" "}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
